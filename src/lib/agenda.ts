import type { AgendaDay, AgendaEntry, HassCalendarEvent } from '../types';

/** Baut aus Kalenderterminen die Tagesliste der Uebersicht. */

const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

/** Mitternacht des Tages, auf dem der Zeitpunkt liegt. */
export function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

/** Beschriftung eines Tages: heute und morgen bekommen Namen. */
export function dayLabel(date: Date, today: Date): string {
  const abstand = Math.round(
    (startOfDay(date).getTime() - startOfDay(today).getTime()) / 86_400_000,
  );
  if (abstand === 0) return 'Heute';
  if (abstand === 1) return 'Morgen';
  return WEEKDAYS[date.getDay()];
}

/** Ein Termin aus der Schnittstelle als Eintrag der Uebersicht. */
export function toEntry(
  event: HassCalendarEvent,
  color: string,
  calendarName: string,
): AgendaEntry {
  const allDay = !event.start.dateTime;
  return {
    uid: event.uid ?? `${calendarName}-${event.summary}-${event.start.date ?? ''}`,
    summary: event.summary,
    location: event.location ?? undefined,
    color,
    calendarName,
    allDay,
    start: new Date(event.start.dateTime ?? `${event.start.date}T00:00:00`),
    end: new Date(event.end.dateTime ?? `${event.end.date}T00:00:00`),
  };
}

/** Verteilt die Termine auf die naechsten Tage.
 *
 * Ein mehrtaegiger Termin taucht an jedem betroffenen Tag auf - sonst waere
 * er nach dem ersten Tag unsichtbar, obwohl er noch laeuft.
 */
export function groupByDay(
  entries: AgendaEntry[],
  days: number,
  today: Date = new Date(),
): AgendaDay[] {
  const result: AgendaDay[] = [];

  for (let offset = 0; offset < days; offset++) {
    const date = startOfDay(today);
    date.setDate(date.getDate() + offset);
    const next = new Date(date);
    next.setDate(next.getDate() + 1);

    const desTages = entries
      .filter((entry) => entry.start < next && entry.end > date)
      .sort(byStart);

    result.push({ date, label: dayLabel(date, today), entries: desTages });
  }

  return result;
}

/** Ganztaegige zuerst, danach nach Uhrzeit. */
function byStart(a: AgendaEntry, b: AgendaEntry): number {
  if (a.allDay !== b.allDay) return a.allDay ? -1 : 1;
  return a.start.getTime() - b.start.getTime();
}

/** Zeitspanne eines Termins als Text. */
export function timeLabel(entry: AgendaEntry, day: Date): string {
  if (entry.allDay) return 'Ganztägig';

  const zeit = (date: Date): string =>
    date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

  // Bei einem mehrtaegigen Termin ist die Uhrzeit des ersten Tages gemeint,
  // an den Folgetagen laeuft er durch.
  const beginntHeute = startOfDay(entry.start).getTime() === day.getTime();
  const endetHeute = startOfDay(entry.end).getTime() === day.getTime();

  if (beginntHeute && endetHeute) return `${zeit(entry.start)} – ${zeit(entry.end)}`;
  if (beginntHeute) return `ab ${zeit(entry.start)}`;
  if (endetHeute) return `bis ${zeit(entry.end)}`;
  return 'Ganztägig';
}
