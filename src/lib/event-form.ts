import type { CalendarEventPayload, EventExtendedProps, RecurrenceFrequency } from '../types';
import { formatForInput, reformatInput } from './datetime';
import { buildRrule, parseRrule } from './recurrence';

/** Der Zustand des Termin-Formulars als reine Daten.
 *
 * Bewusst ohne Bezug zur Karte: So laesst sich das Fuellen, Leeren und
 * Auslesen des Formulars unabhaengig vom Rendern betrachten.
 */
export interface EventFormState {
  showModal: boolean;
  editMode: boolean;
  confirmDelete: boolean;
  isAllDay: boolean;
  currentEventId: string;
  currentRecurrenceId: string;
  currentRrule: string;
  newEventTitle: string;
  newEventCalendar: string;
  newEventStart: string;
  newEventEnd: string;
  newEventRecurrence: RecurrenceFrequency;
  newEventUntil: string;
}

/** Geschlossenes, leeres Formular. */
export function emptyForm(): EventFormState {
  return {
    showModal: false,
    editMode: false,
    confirmDelete: false,
    isAllDay: false,
    currentEventId: '',
    currentRecurrenceId: '',
    currentRrule: '',
    newEventTitle: '',
    newEventCalendar: '',
    newEventStart: '',
    newEventEnd: '',
    newEventRecurrence: '',
    newEventUntil: '',
  };
}

/** Formular fuer einen neuen Termin im angegebenen Zeitraum. */
export function formForNewEvent(
  start: Date,
  end: Date,
  allDay: boolean,
  calendar: string,
): EventFormState {
  return {
    ...emptyForm(),
    showModal: true,
    isAllDay: allDay,
    newEventCalendar: calendar,
    newEventStart: formatForInput(start, allDay),
    newEventEnd: formatForInput(end, allDay),
  };
}

/** Ein angeklickter Termin, so weit das Formular ihn braucht.
 *
 * Bewusst schmaler als FullCalendars EventApi: Die Kompaktansicht zeichnet
 * ohne FullCalendar und hat nur diese Felder. Ein EventApi passt darauf.
 */
export interface ClickedEvent {
  id?: string;
  title: string;
  start: Date | null;
  end: Date | null;
  allDay: boolean;
  extendedProps: EventExtendedProps;
}

/** Formular fuer einen bestehenden Termin. */
export function formForExistingEvent(event: ClickedEvent): EventFormState {
  const props = event.extendedProps;
  const recurrence = parseRrule(props.rrule);

  return {
    ...emptyForm(),
    showModal: true,
    editMode: true,
    isAllDay: event.allDay,
    currentEventId: props.uid || (event.id ?? ''),
    currentRecurrenceId: props.recurrenceId,
    currentRrule: props.rrule,
    newEventTitle: event.title,
    newEventCalendar: props.entityId,
    newEventStart: formatForInput(event.start, event.allDay),
    newEventEnd: formatForInput(event.end ?? event.start, event.allDay),
    newEventRecurrence: recurrence.frequency,
    newEventUntil: recurrence.until,
  };
}

/** Umschalten zwischen Datum und Datum mit Uhrzeit, ohne den Tag zu verlieren. */
export function withAllDay(form: EventFormState, checked: boolean): Partial<EventFormState> {
  if (checked === form.isAllDay) return {};
  return {
    isAllDay: checked,
    newEventStart: reformatInput(form.newEventStart, checked),
    newEventEnd: reformatInput(form.newEventEnd, checked),
  };
}

/** Haeufigkeit setzen; ohne Wiederholung faellt auch das Ende weg. */
export function withFrequency(value: string): Partial<EventFormState> {
  const frequency = value as RecurrenceFrequency;
  return frequency
    ? { newEventRecurrence: frequency }
    : { newEventRecurrence: '', newEventUntil: '' };
}

/** Was zum Speichern fehlt, oder null wenn alles da ist. */
export function missingField(form: EventFormState): string | null {
  if (!form.newEventTitle.trim()) return 'Bitte einen Titel eingeben.';
  if (!form.newEventCalendar) return 'Bitte einen Kalender auswählen.';
  if (!form.newEventStart || !form.newEventEnd) return 'Bitte Start und Ende angeben.';
  return null;
}

/** Nutzlast fuer die Kalender-Schnittstelle. */
export function toPayload(form: EventFormState): CalendarEventPayload {
  const payload: CalendarEventPayload = {
    summary: form.newEventTitle.trim(),
    dtstart: form.newEventStart,
    dtend: form.newEventEnd,
  };
  const rrule = buildRrule(form.newEventRecurrence, form.newEventUntil);
  if (rrule) payload.rrule = rrule;
  return payload;
}

/** Reichweite einer Aenderung an einem Serientermin. */
export function recurrenceScope(form: EventFormState): Record<string, string> {
  if (!form.currentRecurrenceId) return {};
  return {
    recurrence_id: form.currentRecurrenceId,
    recurrence_range: 'THISANDFUTURE',
  };
}
