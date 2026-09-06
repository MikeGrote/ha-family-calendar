import type { EventInput } from '@fullcalendar/core';

import type { EventExtendedProps, HassCalendarEvent } from '../types';

/** Uebersetzt Termine von Home Assistant nach FullCalendar. */

export const DEFAULT_COLOR = '#0078d4';

/** Ein Termin aus der Kalender-Schnittstelle als FullCalendar-Eintrag. */
export function toEventInput(
  event: HassCalendarEvent,
  entityId: string,
  color: string = DEFAULT_COLOR,
): EventInput {
  const extendedProps: EventExtendedProps = {
    entityId,
    uid: event.uid ?? '',
    recurrenceId: event.recurrence_id ?? '',
    rrule: event.rrule ?? '',
  };

  return {
    // Alle Instanzen einer Serie tragen dieselbe uid. FullCalendar fasst
    // Termine mit gleicher Kennung zu einer Gruppe zusammen und verschiebt
    // sie gemeinsam - bei einer Serie, von der nur dieser und die
    // folgenden Termine geaendert werden sollen, waere das falsch.
    id: event.recurrence_id ? `${event.uid ?? ''}::${event.recurrence_id}` : event.uid,
    title: event.summary,
    start: event.start.dateTime ?? event.start.date,
    end: event.end.dateTime ?? event.end.date,
    backgroundColor: color,
    borderColor: color,
    // Ohne Uhrzeit im Startfeld ist der Termin ganztaegig.
    allDay: !event.start.dateTime,
    extendedProps,
  };
}

/** Nur die Termine der eingeschalteten Kalender. */
export function filterByCalendars(events: EventInput[], active: string[]): EventInput[] {
  return events.filter((event) =>
    active.includes((event.extendedProps as EventExtendedProps).entityId),
  );
}
