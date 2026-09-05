import {
  Calendar,
  type DateSelectArg,
  type DatesSetArg,
  type EventClickArg,
  type EventDropArg,
  type EventInput,
} from '@fullcalendar/core';
import type { EventResizeDoneArg } from '@fullcalendar/interaction';
import deLocale from '@fullcalendar/core/locales/de';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import type { HomeAssistant } from 'custom-card-helpers';
import { css, html, LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { calendarStyles } from './styles';
import type {
  CalendarConfig,
  CardLink,
  CalendarEventPayload,
  EventExtendedProps,
  HassCalendarEvent,
  RecurrenceFrequency,
} from './types';

const DEFAULT_COLOR = '#0078d4';
const DEFAULT_DEBOUNCE_MS = 500;
const SLOT_MIN_FALLBACK = '06:00:00';
const SLOT_MAX_FALLBACK = '22:00:00';
/** Puffer in Tagen, der ueber den sichtbaren Bereich hinaus geladen wird. */
const FETCH_BUFFER_DAYS = 7;
/** Zeitpunkte nach dem Aufbau, zu denen die Groesse nachgemessen wird (ms). */
const INITIAL_SIZE_CHECKS = [0, 250, 1000, 2500];

@customElement('family-calendar')
export class FamilyCalendar extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: CalendarConfig;

  @state() private activeCalendars: string[] = [];
  @state() private isCompact = false;

  @state() private showModal = false;
  @state() private editMode = false;
  @state() private confirmDelete = false;
  @state() private isAllDay = false;
  @state() private currentEventId = '';
  @state() private currentRecurrenceId = '';
  @state() private newEventTitle = '';
  @state() private newEventCalendar = '';
  @state() private newEventStart = '';
  @state() private newEventEnd = '';
  @state() private newEventRecurrence: RecurrenceFrequency = '';
  @state() private currentRrule = '';

  @query('#calendar') private calendarEl!: HTMLElement;

  private calendar: Calendar | null = null;
  private allFetchedEvents: EventInput[] = [];
  private visibleEvents: EventInput[] = [];
  /** Signatur der beobachteten Kalender-Entities beim letzten Fetch. */
  private lastEntitySignature = '';
  private refreshTimer?: number;
  private resizeObserver?: ResizeObserver;
  private resizeTimer?: number;

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

  // ---------------------------------------------------------------- Rendering

  render(): TemplateResult {
    return html`
      <ha-card>
        <div class="header">
          <div class="filters">
            ${this.config?.links?.map((link) => this.renderLink(link))}
            ${this.config?.entities?.map((entityId) => this.renderFilterChip(entityId))}
            <div style="flex: 1"></div>
            <button
              class="filter-chip ${this.isCompact ? 'active' : ''}"
              style="--chip-color: #666"
              @click=${() => this.toggleCompact()}
            >
              <span class="dot"></span>
              Kompakt
            </button>
          </div>
        </div>
        <div id="calendar"></div>
        ${this.renderModal()}
      </ha-card>
    `;
  }

  /** Kleine Symbolschaltflaeche, etwa zu einer anderen Ansicht. */
  private renderLink(link: CardLink): TemplateResult {
    return html`
      <button
        class="link-button"
        title=${link.name ?? link.path}
        aria-label=${link.name ?? link.path}
        @click=${() => this.navigate(link.path)}
      >
        <ha-icon .icon=${link.icon}></ha-icon>
      </button>
    `;
  }

  /** Wechselt die Ansicht, ohne die Seite neu zu laden. */
  private navigate(path: string): void {
    history.pushState(null, '', path);
    window.dispatchEvent(
      new CustomEvent('location-changed', { bubbles: true, composed: true }),
    );
  }

  private renderFilterChip(entityId: string): TemplateResult {
    const color = this.config.colors?.[entityId] ?? DEFAULT_COLOR;
    const isActive = this.activeCalendars.includes(entityId);
    return html`
      <button
        class="filter-chip ${isActive ? 'active' : ''}"
        style="--chip-color: ${color}"
        @click=${() => this.toggleCalendar(entityId)}
      >
        <span class="dot"></span>
        ${this.friendlyName(entityId)}
      </button>
    `;
  }

  private renderModal(): TemplateResult {
    if (!this.showModal) return html``;

    const dateType = this.isAllDay ? 'date' : 'datetime-local';

    return html`
      <div class="modal-overlay" @click=${() => this.closeModal()}>
        <div class="modal-content" @click=${(e: Event) => e.stopPropagation()}>
          <h3>${this.editMode ? 'Termin bearbeiten' : 'Neuer Termin'}</h3>

          <div class="form-group">
            <label>Titel</label>
            <input
              type="text"
              .value=${this.newEventTitle}
              @input=${(e: Event) => (this.newEventTitle = (e.target as HTMLInputElement).value)}
              placeholder="Termin Titel"
              autofocus
            />
          </div>

          <div class="form-group">
            <label>Kalender</label>
            ${this.editMode
              ? // Beim Bearbeiten ist der Kalender ohnehin gesperrt. Als
                // Auswahlliste zeigte er den ersten Eintrag statt des echten
                // Werts, weil das Feld gesetzt wird, bevor die Optionen stehen.
                html`<p class="readonly-value">${this.friendlyName(this.newEventCalendar)}</p>`
              : html`
                  <select
                    .value=${this.newEventCalendar}
                    @change=${(e: Event) =>
                      (this.newEventCalendar = (e.target as HTMLSelectElement).value)}
                  >
                    ${this.config.entities.map(
                      (entityId) =>
                        html`<option value=${entityId}>${this.friendlyName(entityId)}</option>`,
                    )}
                  </select>
                `}
          </div>

          <div class="form-group form-group--inline">
            <label>
              <input
                type="checkbox"
                .checked=${this.isAllDay}
                @change=${(e: Event) => this.toggleAllDay((e.target as HTMLInputElement).checked)}
              />
              Ganztägig
            </label>
          </div>

          <div class="form-group">
            <label>Von</label>
            <input
              type=${dateType}
              .value=${this.newEventStart}
              @input=${(e: Event) => (this.newEventStart = (e.target as HTMLInputElement).value)}
            />
          </div>

          <div class="form-group">
            <label>Bis</label>
            <input
              type=${dateType}
              .value=${this.newEventEnd}
              @input=${(e: Event) => (this.newEventEnd = (e.target as HTMLInputElement).value)}
            />
          </div>

          <div class="form-group">
            <label>Wiederholung</label>
            ${this.editMode
              ? html`<p class="readonly-value">${describeRecurrence(this.currentRrule)}</p>`
              : html`
                  <select
                    .value=${this.newEventRecurrence}
                    @change=${(e: Event) =>
                      (this.newEventRecurrence = (e.target as HTMLSelectElement)
                        .value as RecurrenceFrequency)}
                  >
                    <option value="">Keine</option>
                    <option value="DAILY">Täglich</option>
                    <option value="WEEKLY">Wöchentlich</option>
                    <option value="MONTHLY">Monatlich</option>
                    <option value="YEARLY">Jährlich</option>
                  </select>
                `}
          </div>

          <div class="modal-actions">
            ${this.editMode ? this.renderDeleteButton() : ''}
            <button class="btn-cancel" @click=${() => this.closeModal()}>Abbrechen</button>
            <button class="btn-save" @click=${() => void this.saveEvent()}>
              ${this.editMode ? 'Aktualisieren' : 'Speichern'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /** Zweistufiges Loeschen statt confirm(): erst Klick, dann Bestaetigung. */
  private renderDeleteButton(): TemplateResult {
    if (!this.confirmDelete) {
      return html`
        <button class="btn-delete" @click=${() => (this.confirmDelete = true)}>Löschen</button>
      `;
    }
    return html`
      <button class="btn-delete btn-delete--confirm" @click=${() => void this.deleteEvent()}>
        Wirklich löschen?
      </button>
    `;
  }

  // ------------------------------------------------------------- Lebenszyklus

  firstUpdated(): void {
    if (!this.calendarEl) return;

    this.calendar = new Calendar(this.calendarEl, {
      plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      locale: deLocale,
      selectable: true,
      selectMirror: true,
      editable: true,
      eventDurationEditable: true,
      eventDrop: (info: EventDropArg) => void this.handleEventMoved(info),
      eventResize: (info: EventResizeDoneArg) => void this.handleEventMoved(info),
      select: (info: DateSelectArg) => this.handleDateSelect(info),
      eventClick: (info: EventClickArg) => this.handleEventClick(info),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,dayGridMonth',
      },
      height: '85vh',
      allDaySlot: true,
      slotMinTime: SLOT_MIN_FALLBACK,
      slotMaxTime: SLOT_MAX_FALLBACK,
      slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
      eventTimeFormat: { hour: '2-digit', minute: '2-digit', meridiem: false },
      datesSet: (arg: DatesSetArg) => {
        this.adjustTimeRange(arg.start, arg.end);
        this.scheduleFetch();
      },
      events: [],
    });
    this.calendar.render();

    // FullCalendar berechnet sein Raster nur beim Rendern und beim
    // Fenster-Resize. Aendert sich die Containerbreite aus einem anderen
    // Grund - etwa weil Kiosk-Mode die Sidebar entfernt - bleiben die
    // Spaltenbreiten stehen und das Raster faellt zusammen.
    // FullCalendar berechnet die Spaltenbreiten nur beim Rendern und beim
    // Fenster-Resize. Aendert sich die Containerbreite aus einem anderen
    // Grund - Kiosk-Mode blendet die Sidebar aus, ein Panel klappt auf -
    // bleiben die Spalten stehen und das Raster faellt in sich zusammen.
    this.resizeObserver = new ResizeObserver(() => this.scheduleResize());
    this.resizeObserver.observe(this.calendarEl);

    // Der Beobachter deckt spaetere Aenderungen ab, nicht aber die, die
    // waehrend des ersten Aufbaus passieren. Deshalb zusaetzlich ein paar
    // Nachmessungen. updateSize() ist idempotent und guenstig.
    for (const delay of INITIAL_SIZE_CHECKS) {
      window.setTimeout(() => this.calendar?.updateSize(), delay);
    }
  }

  private scheduleResize(): void {
    if (this.resizeTimer !== undefined) clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => {
      this.resizeTimer = undefined;
      this.calendar?.updateSize();
    }, 100);
  }

  updated(changedProps: PropertyValues): void {
    if (!changedProps.has('hass')) return;

    // hass wird bei JEDER Zustandsaenderung im System neu zugewiesen. Ohne
    // diesen Vergleich wuerde die Karte dutzende Male pro Minute alle
    // Kalender neu laden.
    const signature = this.entitySignature();
    if (signature === this.lastEntitySignature) return;
    this.lastEntitySignature = signature;
    this.scheduleFetch();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clearRefreshTimer();
    if (this.resizeTimer !== undefined) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = undefined;
    }
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    this.calendar?.destroy();
    this.calendar = null;
  }

  /** Aendert sich nur, wenn einer der konfigurierten Kalender sich meldet. */
  private entitySignature(): string {
    if (!this.hass || !this.config?.entities) return '';
    return this.config.entities
      .map((id) => this.hass.states[id]?.last_updated ?? 'missing')
      .join('|');
  }

  private scheduleFetch(): void {
    this.clearRefreshTimer();
    const delay = this.config?.refreshDebounceMs ?? DEFAULT_DEBOUNCE_MS;
    this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = undefined;
      void this.fetchEvents();
    }, delay);
  }

  private clearRefreshTimer(): void {
    if (this.refreshTimer !== undefined) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = undefined;
    }
  }

  // ------------------------------------------------------------------- Daten

  private async fetchEvents(): Promise<void> {
    if (!this.hass || !this.config || !this.calendar) return;

    const { start, end } = this.fetchWindow();
    const collected: EventInput[] = [];

    for (const entityId of this.config.entities) {
      try {
        const events = await this.hass.callApi<HassCalendarEvent[]>(
          'GET',
          `calendars/${entityId}?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`,
        );
        collected.push(...events.map((event) => this.toEventInput(event, entityId)));
      } catch (err) {
        console.error('Family Calendar: Laden fehlgeschlagen für', entityId, err);
        this.notify(`Kalender ${this.friendlyName(entityId)} konnte nicht geladen werden.`);
      }
    }

    this.allFetchedEvents = collected;
    this.applyFilters();
  }

  private fetchWindow(): { start: string; end: string } {
    const view = this.calendar?.view;
    const start = view ? new Date(view.activeStart) : new Date();
    const end = view ? new Date(view.activeEnd) : new Date();
    if (!view) end.setDate(end.getDate() + 14);
    start.setDate(start.getDate() - FETCH_BUFFER_DAYS);
    end.setDate(end.getDate() + FETCH_BUFFER_DAYS);
    return { start: start.toISOString(), end: end.toISOString() };
  }

  private toEventInput(event: HassCalendarEvent, entityId: string): EventInput {
    const color = this.config.colors?.[entityId] ?? DEFAULT_COLOR;
    const extendedProps: EventExtendedProps = {
      entityId,
      uid: event.uid ?? '',
      recurrenceId: event.recurrence_id ?? '',
      rrule: event.rrule ?? '',
    };
    return {
      id: event.uid,
      title: event.summary,
      start: event.start.dateTime ?? event.start.date,
      end: event.end.dateTime ?? event.end.date,
      backgroundColor: color,
      borderColor: color,
      allDay: !event.start.dateTime,
      extendedProps,
    };
  }

  private applyFilters(): void {
    if (!this.calendar) return;

    this.visibleEvents = this.allFetchedEvents.filter((event) =>
      this.activeCalendars.includes((event.extendedProps as EventExtendedProps).entityId),
    );

    // removeAllEvents() laesst die Event-Sources stehen - ohne das hier
    // sammeln sich bei jedem Refresh neue Sources an.
    this.calendar.removeAllEventSources();
    this.calendar.addEventSource(this.visibleEvents);

    const view = this.calendar.view;
    this.adjustTimeRange(view.activeStart, view.activeEnd);
    this.calendar.updateSize();
  }

  // -------------------------------------------------------------- Interaktion

  private toggleCompact(): void {
    this.isCompact = !this.isCompact;
    this.calendar?.changeView(this.isCompact ? 'dayGridWeek' : 'timeGridWeek');
  }

  private toggleCalendar(entityId: string): void {
    this.activeCalendars = this.activeCalendars.includes(entityId)
      ? this.activeCalendars.filter((id) => id !== entityId)
      : [...this.activeCalendars, entityId];
    this.applyFilters();
  }

  private toggleAllDay(checked: boolean): void {
    if (checked === this.isAllDay) return;
    this.isAllDay = checked;
    // Format der beiden Felder umstellen, ohne das gewaehlte Datum zu verlieren.
    this.newEventStart = this.reformat(this.newEventStart, checked);
    this.newEventEnd = this.reformat(this.newEventEnd, checked);
  }

  private handleDateSelect(info: DateSelectArg): void {
    info.view.calendar.unselect();
    this.isAllDay = info.allDay;
    this.newEventStart = this.formatForInput(info.start, info.allDay);
    this.newEventEnd = this.formatForInput(info.end, info.allDay);
    this.newEventTitle = '';
    this.newEventCalendar = this.config.entities[0] ?? '';
    this.newEventRecurrence = '';
    this.currentRrule = '';
    this.editMode = false;
    this.confirmDelete = false;
    this.showModal = true;
  }

  private handleEventClick(info: EventClickArg): void {
    const event = info.event;
    const props = event.extendedProps as EventExtendedProps;

    this.editMode = true;
    this.confirmDelete = false;
    this.isAllDay = event.allDay;
    this.currentEventId = props.uid || (event.id ?? '');
    this.currentRecurrenceId = props.recurrenceId;
    this.newEventTitle = event.title;
    this.newEventCalendar = props.entityId;
    this.newEventStart = this.formatForInput(event.start, event.allDay);
    this.newEventEnd = this.formatForInput(event.end ?? event.start, event.allDay);
    this.currentRrule = props.rrule;
    this.newEventRecurrence = '';
    this.showModal = true;
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
      dtstart: this.formatForApi(event.start, event.allDay),
      dtend: this.formatForApi(event.end ?? event.start, event.allDay),
    };

    try {
      await this.hass.callWS({
        type: 'calendar/event/update',
        entity_id: props.entityId,
        uid: props.uid,
        // Beim Ziehen wird genau diese Instanz verschoben, nicht die ganze
        // Serie - deshalb ohne recurrence_range.
        ...(props.recurrenceId ? { recurrence_id: props.recurrenceId } : {}),
        event: payload,
      });
      this.scheduleFetch();
    } catch (err) {
      // Ohne revert() bliebe der Termin optisch an der neuen Stelle stehen,
      // obwohl der Server ihn nicht uebernommen hat.
      info.revert();
      console.error('Family Calendar: Verschieben fehlgeschlagen', err);
      this.notify(`Termin konnte nicht verschoben werden: ${this.errorText(err)}`);
    }
  }

  /** Zeitangabe fuer die Kalender-Schnittstelle: lokal, ohne Zeitzone. */
  private formatForApi(date: Date | null, allDay: boolean): string {
    if (!date) return '';
    const local = new Date(date);
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    const iso = local.toISOString();
    return allDay ? iso.slice(0, 10) : iso.slice(0, 19);
  }

  private closeModal(): void {
    this.showModal = false;
    this.editMode = false;
    this.confirmDelete = false;
    this.isAllDay = false;
    this.currentEventId = '';
    this.currentRecurrenceId = '';
    this.newEventTitle = '';
    this.newEventCalendar = '';
    this.newEventStart = '';
    this.newEventEnd = '';
    this.newEventRecurrence = '';
    this.currentRrule = '';
  }

  private async saveEvent(): Promise<void> {
    if (!this.newEventTitle.trim()) return this.notify('Bitte einen Titel eingeben.');
    if (!this.newEventCalendar) return this.notify('Bitte einen Kalender auswählen.');
    if (!this.newEventStart || !this.newEventEnd) return this.notify('Bitte Start und Ende angeben.');

    const event: CalendarEventPayload = {
      summary: this.newEventTitle.trim(),
      dtstart: this.newEventStart,
      dtend: this.newEventEnd,
    };
    if (this.newEventRecurrence && !this.editMode) {
      event.rrule = `FREQ=${this.newEventRecurrence}`;
    }

    try {
      if (this.editMode && this.currentEventId) {
        await this.hass.callWS({
          type: 'calendar/event/update',
          entity_id: this.newEventCalendar,
          uid: this.currentEventId,
          ...this.recurrenceScope(),
          event,
        });
      } else {
        await this.hass.callWS({
          type: 'calendar/event/create',
          entity_id: this.newEventCalendar,
          event,
        });
      }
      this.closeModal();
      this.scheduleFetch();
    } catch (err) {
      console.error('Family Calendar: Speichern fehlgeschlagen', err);
      this.notify(`Termin konnte nicht gespeichert werden: ${this.errorText(err)}`);
    }
  }

  private async deleteEvent(): Promise<void> {
    try {
      // calendar/event/delete kommt aus Home Assistant Core - dafuer wird
      // keine eigene Integration gebraucht.
      await this.hass.callWS({
        type: 'calendar/event/delete',
        entity_id: this.newEventCalendar,
        uid: this.currentEventId,
        ...this.recurrenceScope(),
      });
      this.closeModal();
      this.scheduleFetch();
    } catch (err) {
      console.error('Family Calendar: Löschen fehlgeschlagen', err);
      this.notify(`Termin konnte nicht gelöscht werden: ${this.errorText(err)}`);
      this.confirmDelete = false;
    }
  }

  /** Nur mitschicken, wenn es sich wirklich um eine Serieninstanz handelt. */
  private recurrenceScope(): Record<string, string> {
    if (!this.currentRecurrenceId) return {};
    return {
      recurrence_id: this.currentRecurrenceId,
      recurrence_range: 'THISANDFUTURE',
    };
  }

  // ------------------------------------------------------------------ Zeiten

  private adjustTimeRange(viewStart: Date, viewEnd: Date): void {
    if (!this.calendar || this.calendar.view.type !== 'timeGridWeek') return;

    const timed = this.visibleEvents.filter((event) => {
      if (event.allDay) return false;
      const start = new Date(event.start as string);
      const end = new Date(event.end as string);
      return end > viewStart && start < viewEnd;
    });

    if (timed.length === 0) {
      this.calendar.setOption('slotMinTime', SLOT_MIN_FALLBACK);
      this.calendar.setOption('slotMaxTime', SLOT_MAX_FALLBACK);
      return;
    }

    let min = 24 * 60;
    let max = 0;
    for (const event of timed) {
      const start = new Date(event.start as string);
      const end = new Date(event.end as string);
      min = Math.min(min, start.getHours() * 60 + start.getMinutes());
      max = Math.max(max, end.getHours() * 60 + end.getMinutes());
    }

    this.calendar.setOption('slotMinTime', this.toTimeString(Math.max(0, min - 60)));
    this.calendar.setOption('slotMaxTime', this.toTimeString(Math.min(24 * 60, max + 60)));
  }

  private toTimeString(minutes: number): string {
    const h = String(Math.floor(minutes / 60)).padStart(2, '0');
    const m = String(minutes % 60).padStart(2, '0');
    return `${h}:${m}:00`;
  }

  /** Datum fuer <input type="date"> bzw. <input type="datetime-local">. */
  private formatForInput(date: Date | null, allDay: boolean): string {
    if (!date) return '';
    const local = new Date(date);
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    const iso = local.toISOString();
    return allDay ? iso.slice(0, 10) : iso.slice(0, 16);
  }

  private reformat(value: string, toAllDay: boolean): string {
    if (!value) return '';
    return toAllDay ? value.slice(0, 10) : `${value.slice(0, 10)}T09:00`;
  }

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

  static styles = [
    calendarStyles,
    css`
      .readonly-value {
        margin: 0;
        padding: 10px 0;
        color: var(--text-primary);
        font-size: 1rem;
      }
      .link-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        padding: 0;
        border: none;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.55);
        color: var(--text-secondary);
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
      }
      .link-button:hover {
        background: rgba(255, 255, 255, 0.9);
        color: var(--text-primary);
      }
      .link-button ha-icon {
        --mdc-icon-size: 20px;
      }
      .form-group--inline label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }
      .form-group--inline input[type='checkbox'] {
        width: auto;
        margin: 0;
      }
      .btn-delete {
        background-color: #d93025;
        color: white;
        margin-right: auto;
      }
      .btn-delete--confirm {
        background-color: #8c1d16;
      }
    `,
  ];
}

const FREQUENCY_LABELS: Record<string, string> = {
  DAILY: 'Täglich',
  WEEKLY: 'Wöchentlich',
  MONTHLY: 'Monatlich',
  YEARLY: 'Jährlich',
};

/** Macht aus einer Wiederholungsregel einen lesbaren Satz. */
function describeRecurrence(rrule: string): string {
  if (!rrule) return 'Keine';

  const frequency = /FREQ=([A-Z]+)/.exec(rrule)?.[1] ?? '';
  const label = FREQUENCY_LABELS[frequency];
  // Unbekannte oder zusammengesetzte Regeln lieber roh zeigen als falsch
  // zusammenfassen - "Keine" waere hier die schlechteste Antwort.
  if (!label) return rrule;

  const until = /UNTIL=(\d{4})(\d{2})(\d{2})/.exec(rrule);
  if (until) {
    const [, year, month, day] = until;
    return `${label}, bis ${day}.${month}.${year}`;
  }

  const count = /COUNT=(\d+)/.exec(rrule)?.[1];
  if (count) return `${label}, ${count}-mal`;

  return label;
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
