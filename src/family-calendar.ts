import type {
  Calendar,
  DateSelectArg,
  DatesSetArg,
  EventClickArg,
  EventDropArg,
} from '@fullcalendar/core';
import type { EventResizeDoneArg } from '@fullcalendar/interaction';
import type { HomeAssistant } from 'custom-card-helpers';
import { html, LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { createCalendar } from './lib/calendar-setup';
import {
  type ActionContext,
  deleteFormEvent,
  moveEvent,
  saveFormEvent,
} from './lib/event-actions';
import {
  type ClickedEvent,
  type EventFormState,
  emptyForm,
  formForExistingEvent,
  formForNewEvent,
  missingField,
  withAllDay,
  withFrequency,
} from './lib/event-form';
import { CompactView } from './lib/compact-view';
import { colorMap, effectiveCalendars } from './lib/effective-config';
import { EventLoader } from './lib/event-loader';
import { DEFAULT_COLOR } from './lib/event-mapping';
import type { AppSettings } from './lib/settings-api';
import { SettingsListener } from './lib/settings-listener';
import { calendarStyles } from './styles/index';
import { renderCompact } from './templates/compact';
import { renderEventDialog } from './templates/event-dialog';
import { renderHeader } from './templates/header';
import type { CalendarConfig } from './types';

const DEFAULT_DEBOUNCE_MS = 500;
/** Zeitpunkte nach dem Aufbau, zu denen die Groesse nachgemessen wird (ms). */
const INITIAL_SIZE_CHECKS = [0, 250, 1000, 2500];

@customElement('family-calendar')
export class FamilyCalendar extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: CalendarConfig;

  @state() private activeCalendars: string[] = [];
  @state() private isCompact = false;
  /** Zaehlt hoch, wenn sich die Einstellungen aendern. Gelesen wird der
   *  Wert nirgends - er ist nur das Signal an Lit, neu zu zeichnen; der
   *  Stand selbst liegt im Zuhoerer. */
  @state() private settingsRevision = 0;

  private readonly einstellungen = new SettingsListener('Family Calendar', (settings) =>
    this.applySettings(settings),
  );
  /** Woran erkannt wird, dass sich die Kalender geaendert haben. Ohne den
   *  Vergleich wuerde jede beliebige Einstellung die Filterknoepfe
   *  zuruecksetzen, die jemand gerade von Hand gesetzt hat. */
  private letzteKalender = '';

  @state() private form: EventFormState = emptyForm();

  @query('#calendar') private calendarEl!: HTMLElement;
  @query('.compact-body') private compactBodyEl?: HTMLElement;

  private calendar: Calendar | null = null;
  private readonly loader = new EventLoader({
    hass: () => this.hass,
    config: () => this.effectiveConfig,
    calendar: () => this.calendar,
    activeCalendars: () => this.activeCalendars,
    onError: (message, entityId) => this.notify(`${this.friendlyName(entityId)}: ${message}`),
    onVisibleChanged: () => this.requestUpdate(),
  });
  private readonly compact = new CompactView(() => this.requestUpdate());
  private resizeObserver?: ResizeObserver;

  setConfig(config: CalendarConfig): void {
    if (!config.entities?.length) {
      throw new Error('Bitte mindestens eine Kalender-Entität angeben!');
    }
    this.config = config;
    this.activeCalendars = [...config.entities];
  }

  /** Die Kalender, wie der Einstellungsbereich sie vorgibt - ersatzweise
   *  wie sie im Dashboard stehen. */
  private get kalender() {
    return effectiveCalendars(this.config, this.einstellungen.settings.calendars);
  }

  private get effectiveConfig(): CalendarConfig {
    const kalender = this.kalender;
    return { ...this.config, entities: kalender.map((k) => k.entityId), colors: colorMap(kalender) };
  }

  /** Uebernimmt geaenderte Kalender, ohne die Auswahl im Betrieb zu stoeren. */
  private applySettings(settings: AppSettings): void {
    this.settingsRevision++;

    const kennung = JSON.stringify(this.kalender.map((k) => [k.entityId, k.active]));
    if (kennung !== this.letzteKalender) {
      const ersteRunde = this.letzteKalender === '';
      this.letzteKalender = kennung;
      this.activeCalendars = this.kalender.filter((k) => k.active).map((k) => k.entityId);
      // Beim ersten Mal auch die Startansicht - danach entscheidet der Knopf.
      if (ersteRunde) this.isCompact = settings.calendars.startCompact;
      this.loader.applyFilters();
    }
  }

  getCardSize(): number {
    return 10;
  }

  // ---------------------------------------------------------------- Anzeige

  render(): TemplateResult {
    return html`
      <ha-card>
        ${renderHeader({
          links: this.config?.links ?? [],
          entities: this.kalender.map((k) => k.entityId),
          activeCalendars: this.activeCalendars,
          isCompact: this.isCompact,
          colorOf: (id) => this.kalender.find((k) => k.entityId === id)?.color ?? DEFAULT_COLOR,
          nameOf: (id) => this.friendlyName(id),
          onNavigate: (path) => this.navigate(path),
          onToggleCalendar: (id) => this.toggleCalendar(id),
          onToggleCompact: () => this.toggleCompact(),
          onNewEvent: () => this.openNewEvent(),
        })}
        <div id="calendar" ?hidden=${this.isCompact}></div>
        ${this.isCompact ? this.renderCompactView() : ''}
        ${this.form.showModal ? this.renderDialog() : ''}
      </ha-card>
    `;
  }

  /** Die Woche gestaucht: Termine massstabsgetreu, leere Zeit gerafft.
   *
   * FullCalendar bleibt dabei im Hintergrund bestehen. Es fuehrt weiter
   * den sichtbaren Zeitraum und laedt nach; nur gezeichnet wird hier
   * selbst, weil sein Raster die Zeit zwingend gleichmaessig auftraegt.
   */
  private renderCompactView(): TemplateResult {
    const view = this.calendar?.view;

    return renderCompact({
      week: this.compact.week(this.loader.visibleEvents(), view?.activeStart ?? new Date()),
      title: view?.title ?? '',
      loading: !this.loader.hasLoaded,
      onEvent: (event) => {
        this.form = formForExistingEvent(event);
      },
      onPrev: () => this.calendar?.prev(),
      onNext: () => this.calendar?.next(),
      onToday: () => this.calendar?.today(),
    });
  }

  private renderDialog(): TemplateResult {
    const form = this.form;
    const patch = (changes: Partial<EventFormState>): void => {
      this.form = { ...this.form, ...changes };
    };

    return renderEventDialog({
      editMode: form.editMode,
      isSeries: form.currentRrule !== '',
      confirmDelete: form.confirmDelete,
      isAllDay: form.isAllDay,
      title: form.newEventTitle,
      calendar: form.newEventCalendar,
      start: form.newEventStart,
      end: form.newEventEnd,
      frequency: form.newEventRecurrence,
      until: form.newEventUntil,
      entities: this.kalender.map((k) => k.entityId),
      nameOf: (id) => this.friendlyName(id),
      onTitle: (value) => patch({ newEventTitle: value }),
      onCalendar: (value) => patch({ newEventCalendar: value }),
      onAllDay: (value) => patch(withAllDay(form, value)),
      onStart: (value) => patch({ newEventStart: value }),
      onEnd: (value) => patch({ newEventEnd: value }),
      onFrequency: (value) => patch(withFrequency(value)),
      onUntil: (value) => patch({ newEventUntil: value }),
      onConfirmDelete: () => patch({ confirmDelete: true }),
      onDelete: () => void this.deleteEvent(),
      onCancel: () => (this.form = emptyForm()),
      onSave: () => void this.saveEvent(),
    });
  }

  /** Wechselt die Ansicht, ohne die Seite neu zu laden. */
  private navigate(path: string): void {
    history.pushState(null, '', path);
    window.dispatchEvent(new CustomEvent('location-changed', { bubbles: true, composed: true }));
  }

  // ------------------------------------------------------------ Lebenszyklus

  firstUpdated(): void {
    void this.einstellungen.start(this.hass);
    if (!this.calendarEl) return;

    this.calendar = createCalendar(this.calendarEl, {
      onSelect: (info: DateSelectArg) => this.handleDateSelect(info),
      onEventClick: (info: EventClickArg) => this.handleEventClick(info),
      onEventMoved: (info: EventDropArg | EventResizeDoneArg) => void this.handleEventMoved(info),
      onDatesSet: (arg: DatesSetArg) => {
        this.loader.adjustTimeRange(arg.start, arg.end);
        this.refresh();
      },
    });

    // FullCalendar berechnet die Spaltenbreiten nur beim Rendern und beim
    // Fenster-Resize. Aendert sich die Containerbreite aus einem anderen
    // Grund - Kiosk-Mode blendet die Sidebar aus, ein Panel klappt auf -
    // bleiben die Spalten stehen und das Raster faellt in sich zusammen.
    this.resizeObserver = new ResizeObserver(() => this.loader.scheduleResize());
    this.resizeObserver.observe(this.calendarEl);

    // Der Beobachter deckt spaetere Aenderungen ab, nicht aber die waehrend
    // des ersten Aufbaus. updateSize() ist idempotent und guenstig.
    for (const delay of INITIAL_SIZE_CHECKS) {
      window.setTimeout(() => this.calendar?.updateSize(), delay);
    }
  }

  updated(changedProps: PropertyValues): void {
    if (changedProps.has('hass') && this.loader.hasRelevantChange()) {
      this.refresh();
    }
    this.compact.watch(this.isCompact ? this.compactBodyEl : undefined);
  }

  /** Nachladen anstossen, entprellt. */
  private refresh(): void {
    this.loader.scheduleFetch(this.config?.refreshDebounceMs ?? DEFAULT_DEBOUNCE_MS);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.loader.dispose();
    this.einstellungen.stop();
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    this.compact.dispose();
    this.calendar?.destroy();
    this.calendar = null;
  }

  /** Aendert sich nur, wenn einer der konfigurierten Kalender sich meldet. */

  // ------------------------------------------------------------------- Daten

  // -------------------------------------------------------------- Bedienung

  private toggleCompact(): void {
    this.isCompact = !this.isCompact;
    // FullCalendar bleibt auf der Wochenansicht: Es liefert weiterhin den
    // sichtbaren Zeitraum und den Titel, auch wenn es verborgen ist.
    if (!this.isCompact) this.calendar?.updateSize();
  }

  private toggleCalendar(entityId: string): void {
    this.activeCalendars = this.activeCalendars.includes(entityId)
      ? this.activeCalendars.filter((id) => id !== entityId)
      : [...this.activeCalendars, entityId];
    this.loader.applyFilters();
  }

  /** Neuer Termin ueber den Knopf.
   *
   * Auf einem Touchscreen ist das Aufziehen im Raster muehsam: Es verlangt
   * einen langen Druck, und daneben gegriffen packt man einen bestehenden
   * Termin. Der Knopf ist der verlaessliche Weg.
   */
  /** Neuer Termin ueber den Knopf.
   *
   * Auf einem Touchscreen ist das Aufziehen im Raster muehsam: Es verlangt
   * einen langen Druck, und daneben gegriffen packt man einen bestehenden
   * Termin. Der Knopf ist der verlaessliche Weg.
   */
  private openNewEvent(): void {
    const start = new Date();
    start.setMinutes(0, 0, 0);
    start.setHours(start.getHours() + 1);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    this.form = formForNewEvent(start, end, false, this.kalender[0]?.entityId ?? '');
  }

  private handleDateSelect(info: DateSelectArg): void {
    info.view.calendar.unselect();
    this.form = formForNewEvent(
      info.start,
      info.end,
      info.allDay,
      this.kalender[0]?.entityId ?? '',
    );
  }

  private handleEventClick(info: EventClickArg): void {
    // FullCalendar typisiert extendedProps als offenes Woerterbuch; was
    // wirklich drinsteht, legt toEventInput fest.
    this.form = formForExistingEvent(info.event as unknown as ClickedEvent);
  }

  // ------------------------------------------------------------- Schreiben

  private actions(): ActionContext {
    return {
      hass: this.hass,
      notify: (message) => this.notify(message),
      errorText: (err) => this.errorText(err),
    };
  }

  private async saveEvent(): Promise<void> {
    const fehlt = missingField(this.form);
    if (fehlt) return this.notify(fehlt);

    if (await saveFormEvent(this.actions(), this.form)) {
      this.form = emptyForm();
      this.refresh();
    }
  }

  private async deleteEvent(): Promise<void> {
    if (await deleteFormEvent(this.actions(), this.form)) {
      this.form = emptyForm();
      this.refresh();
    } else {
      this.form = { ...this.form, confirmDelete: false };
    }
  }

  private async handleEventMoved(info: EventDropArg | EventResizeDoneArg): Promise<void> {
    if (await moveEvent(this.actions(), info)) this.refresh();
  }

  // ------------------------------------------------------------------ Helfer

  private friendlyName(entityId: string): string {
    const eigener = this.kalender.find((k) => k.entityId === entityId)?.name;
    if (eigener) return eigener;
    return this.hass?.states[entityId]?.attributes?.friendly_name ?? entityId;
  }

  private errorText(err: unknown): string {
    if (err instanceof Error) return err.message;
    if (typeof err === 'object' && err !== null && 'message' in err) {
      return String((err).message);
    }
    return 'Unbekannter Fehler';
  }

  /** Meldung als Home-Assistant-Toast statt als Browser-alert(). */
  private notify(message: string): void {
    this.dispatchEvent(
      new CustomEvent('hass-notification', {
        detail: { message },
        bubbles: true,
        composed: true,
      }),
    );
  }

  static styles = calendarStyles;
}

declare global {
  interface HTMLElementTagNameMap {
    'family-calendar': FamilyCalendar;
  }
  interface Window {
    customCards?: {
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }[];
  }
}

// Macht die Karte im Lovelace-Kartenauswahldialog sichtbar.
window.customCards = window.customCards ?? [];
window.customCards.push({
  type: 'family-calendar',
  name: 'Family Calendar',
  description: 'Wochen- und Monatsansicht über mehrere Kalender, mit Anlegen und Bearbeiten.',
  preview: false,
});
