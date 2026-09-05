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
import { createEvent, deleteEvent, updateEvent } from './lib/calendar-api';
import { formatForApi } from './lib/datetime';
import {
  type EventFormState,
  emptyForm,
  formForExistingEvent,
  formForNewEvent,
  missingField,
  recurrenceScope,
  toPayload,
  withAllDay,
  withFrequency,
} from './lib/event-form';
import { DEFAULT_COLOR } from './lib/event-mapping';
import { EventLoader } from './lib/event-loader';
import { calendarStyles } from './styles/index';
import { renderEventDialog } from './templates/event-dialog';
import { renderHeader } from './templates/header';
import type {
  CalendarConfig,
  CalendarEventPayload,
  EventExtendedProps,

} from './types';

const DEFAULT_DEBOUNCE_MS = 500;
/** Zeitpunkte nach dem Aufbau, zu denen die Groesse nachgemessen wird (ms). */
const INITIAL_SIZE_CHECKS = [0, 250, 1000, 2500];

@customElement('family-calendar')
export class FamilyCalendar extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: CalendarConfig;

  @state() private activeCalendars: string[] = [];
  @state() private isCompact = false;

  @state() private form: EventFormState = emptyForm();

  @query('#calendar') private calendarEl!: HTMLElement;

  private calendar: Calendar | null = null;
  private readonly loader = new EventLoader({
    hass: () => this.hass,
    config: () => this.config,
    calendar: () => this.calendar,
    activeCalendars: () => this.activeCalendars,
    onError: (message, entityId) => this.notify(`${this.friendlyName(entityId)}: ${message}`),
  });
  private resizeObserver?: ResizeObserver;

  setConfig(config: CalendarConfig): void {
    if (!config.entities?.length) {
      throw new Error('Bitte mindestens eine Kalender-Entität angeben!');
    }
    this.config = config;
    this.activeCalendars = [...config.entities];
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
          entities: this.config?.entities ?? [],
          activeCalendars: this.activeCalendars,
          isCompact: this.isCompact,
          colorOf: (id) => this.config.colors?.[id] ?? DEFAULT_COLOR,
          nameOf: (id) => this.friendlyName(id),
          onNavigate: (path) => this.navigate(path),
          onToggleCalendar: (id) => this.toggleCalendar(id),
          onToggleCompact: () => this.toggleCompact(),
          onNewEvent: () => this.openNewEvent(),
        })}
        <div id="calendar"></div>
        ${this.form.showModal ? this.renderDialog() : ''}
      </ha-card>
    `;
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
      entities: this.config.entities,
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
  }

  /** Nachladen anstossen, entprellt. */
  private refresh(): void {
    this.loader.scheduleFetch(this.config?.refreshDebounceMs ?? DEFAULT_DEBOUNCE_MS);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.loader.dispose();
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    this.calendar?.destroy();
    this.calendar = null;
  }

  /** Aendert sich nur, wenn einer der konfigurierten Kalender sich meldet. */

  // ------------------------------------------------------------------- Daten

  // -------------------------------------------------------------- Bedienung

  private toggleCompact(): void {
    this.isCompact = !this.isCompact;
    this.calendar?.changeView(this.isCompact ? 'dayGridWeek' : 'timeGridWeek');
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
    this.form = formForNewEvent(start, end, false, this.config.entities[0] ?? '');
  }

  private handleDateSelect(info: DateSelectArg): void {
    info.view.calendar.unselect();
    this.form = formForNewEvent(info.start, info.end, info.allDay, this.config.entities[0] ?? '');
  }

  private handleEventClick(info: EventClickArg): void {
    this.form = formForExistingEvent(info.event);
  }

  // ------------------------------------------------------------- Schreiben

  private async saveEvent(): Promise<void> {
    const fehlt = missingField(this.form);
    if (fehlt) return this.notify(fehlt);

    const form = this.form;
    try {
      if (form.editMode && form.currentEventId) {
        await updateEvent(
          this.hass,
          form.newEventCalendar,
          form.currentEventId,
          toPayload(form),
          recurrenceScope(form),
        );
      } else {
        await createEvent(this.hass, form.newEventCalendar, toPayload(form));
      }
      this.form = emptyForm();
      this.refresh();
    } catch (err) {
      console.error('Family Calendar: Speichern fehlgeschlagen', err);
      this.notify(`Termin konnte nicht gespeichert werden: ${this.errorText(err)}`);
    }
  }

  private async deleteEvent(): Promise<void> {
    const form = this.form;
    try {
      await deleteEvent(this.hass, form.newEventCalendar, form.currentEventId, recurrenceScope(form));
      this.form = emptyForm();
      this.refresh();
    } catch (err) {
      console.error('Family Calendar: Löschen fehlgeschlagen', err);
      this.notify(`Termin konnte nicht gelöscht werden: ${this.errorText(err)}`);
      this.form = { ...this.form, confirmDelete: false };
    }
  }

  /** Termin wurde gezogen oder in der Dauer geaendert. */
  private async handleEventMoved(info: EventDropArg | EventResizeDoneArg): Promise<void> {
    const event = info.event;
    const props = event.extendedProps as EventExtendedProps;

    if (!props.uid) {
      info.revert();
      this.notify('Dieser Termin hat keine Kennung und lässt sich nicht verschieben.');
      return;
    }

    const payload: CalendarEventPayload = {
      summary: event.title,
      dtstart: formatForApi(event.start, event.allDay),
      dtend: formatForApi(event.end ?? event.start, event.allDay),
    };

    try {
      // Beim Ziehen wird genau diese Instanz verschoben, nicht die ganze
      // Serie - deshalb ohne recurrence_range.
      const scope: Record<string, string> = props.recurrenceId
        ? { recurrence_id: props.recurrenceId }
        : {};
      await updateEvent(this.hass, props.entityId, props.uid, payload, scope);
      this.refresh();
    } catch (err) {
      // Ohne revert() bliebe der Termin optisch an der neuen Stelle stehen,
      // obwohl der Server ihn nicht uebernommen hat.
      info.revert();
      console.error('Family Calendar: Verschieben fehlgeschlagen', err);
      this.notify(`Termin konnte nicht verschoben werden: ${this.errorText(err)}`);
    }
  }

  /** Reichweite einer Aenderung an einem Serientermin. */

  // ------------------------------------------------------------------ Helfer

  private friendlyName(entityId: string): string {
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
