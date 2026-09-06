import type { EventInput } from '@fullcalendar/core';

import { minutesToTime } from './datetime';

/** Sichtbarer Zeitbereich der Wochenansicht.
 *
 * Statt starr von 0 bis 24 Uhr zeigt das Raster nur die Stunden, in denen
 * tatsaechlich etwas stattfindet - mit einer Stunde Luft davor und danach.
 */

export const SLOT_MIN_FALLBACK = '06:00:00';
export const SLOT_MAX_FALLBACK = '22:00:00';

const PADDING_MINUTES = 60;
const DAY_MINUTES = 24 * 60;

export interface SlotRange {
  min: string;
  max: string;
}

/** Liegen Beginn und Ende auf verschiedenen Kalendertagen? */
function ueberMitternacht(start: Date, end: Date): boolean {
  return (
    start.getFullYear() !== end.getFullYear() ||
    start.getMonth() !== end.getMonth() ||
    start.getDate() !== end.getDate()
  );
}

/** Ermittelt den Zeitbereich fuer die Termine im sichtbaren Fenster. */
export function slotRangeFor(
  events: EventInput[],
  viewStart: Date,
  viewEnd: Date,
): SlotRange {
  const timed = events.filter((event) => {
    if (event.allDay) return false;
    const start = new Date(event.start as string);
    const end = new Date(event.end as string);
    return end > viewStart && start < viewEnd;
  });

  if (timed.length === 0) {
    return { min: SLOT_MIN_FALLBACK, max: SLOT_MAX_FALLBACK };
  }

  let earliest = DAY_MINUTES;
  let latest = 0;
  for (const event of timed) {
    const start = new Date(event.start as string);
    const end = new Date(event.end as string);

    if (ueberMitternacht(start, end)) {
      // Ein Termin ueber Mitternacht endet nach der Uhr vor seinem Beginn.
      // Ohne Sonderfall waere die Obergrenze kleiner als die Untergrenze
      // und das Raster bliebe leer. Er beruehrt beide Tagesenden, also
      // zeigt das Raster den ganzen Tag.
      earliest = 0;
      latest = DAY_MINUTES;
      continue;
    }

    earliest = Math.min(earliest, start.getHours() * 60 + start.getMinutes());
    latest = Math.max(latest, end.getHours() * 60 + end.getMinutes());
  }

  return {
    min: minutesToTime(Math.max(0, earliest - PADDING_MINUTES)),
    max: minutesToTime(Math.min(DAY_MINUTES, latest + PADDING_MINUTES)),
  };
}
