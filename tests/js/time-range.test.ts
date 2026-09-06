import type { EventInput } from '@fullcalendar/core';
import { describe, expect, it } from 'vitest';

import {
  SLOT_MAX_FALLBACK,
  SLOT_MIN_FALLBACK,
  slotRangeFor,
} from '../../src/lib/time-range';

/** Die Wochenansicht zeigt nur die belegten Stunden. Rutscht die Untergrenze
 *  über die Obergrenze, rendert FullCalendar ein leeres Raster - der Nutzer
 *  sieht dann eine Woche ohne Termine, obwohl welche da sind. */

const MO = new Date('2026-06-01T00:00:00');
const NAECHSTER_MO = new Date('2026-06-08T00:00:00');

function termin(start: string, end: string, allDay = false): EventInput {
  return { start, end, allDay };
}

/** Minuten seit Mitternacht aus "HH:MM:SS". */
function minuten(wert: string): number {
  const [h, m] = wert.split(':').map(Number);
  return h * 60 + m;
}

describe('slotRangeFor', () => {
  it('nimmt den Rückfallbereich, wenn nichts stattfindet', () => {
    expect(slotRangeFor([], MO, NAECHSTER_MO)).toEqual({
      min: SLOT_MIN_FALLBACK,
      max: SLOT_MAX_FALLBACK,
    });
  });

  it('lässt ganztägige Termine außer Betracht', () => {
    // Ganztägige stehen im eigenen Streifen über dem Raster und sagen
    // nichts darüber aus, welche Stunden gebraucht werden.
    const events = [termin('2026-06-02T00:00:00', '2026-06-03T00:00:00', true)];
    expect(slotRangeFor(events, MO, NAECHSTER_MO)).toEqual({
      min: SLOT_MIN_FALLBACK,
      max: SLOT_MAX_FALLBACK,
    });
  });

  it('legt eine Stunde Luft um den belegten Bereich', () => {
    const events = [termin('2026-06-02T09:00:00', '2026-06-02T10:30:00')];
    expect(slotRangeFor(events, MO, NAECHSTER_MO)).toEqual({
      min: '08:00:00',
      max: '11:30:00',
    });
  });

  it('spannt über den frühesten Beginn und das späteste Ende der Woche', () => {
    const events = [
      termin('2026-06-02T09:00:00', '2026-06-02T10:00:00'),
      termin('2026-06-04T07:15:00', '2026-06-04T08:00:00'),
      termin('2026-06-05T16:00:00', '2026-06-05T19:45:00'),
    ];
    expect(slotRangeFor(events, MO, NAECHSTER_MO)).toEqual({
      min: '06:15:00',
      max: '20:45:00',
    });
  });

  it('schneidet die Luft an Mitternacht ab, statt in den Vortag zu laufen', () => {
    const events = [termin('2026-06-02T00:15:00', '2026-06-02T00:45:00')];
    const bereich = slotRangeFor(events, MO, NAECHSTER_MO);
    expect(bereich.min).toBe('00:00:00');
    expect(bereich.max).toBe('01:45:00');
  });

  it('schneidet die Luft am Tagesende ab', () => {
    const events = [termin('2026-06-02T22:00:00', '2026-06-02T23:30:00')];
    expect(slotRangeFor(events, MO, NAECHSTER_MO)).toEqual({
      min: '21:00:00',
      max: '24:00:00',
    });
  });

  it('zeigt den ganzen Tag, wenn ein Termin über Mitternacht läuft', () => {
    // Sonst stünde die Untergrenze bei 21:00 und die Obergrenze bei 02:00 -
    // ein Bereich, den FullCalendar leer zeichnet.
    const events = [termin('2026-06-02T22:00:00', '2026-06-03T01:00:00')];
    expect(slotRangeFor(events, MO, NAECHSTER_MO)).toEqual({
      min: '00:00:00',
      max: '24:00:00',
    });
  });

  it('kippt auch dann nicht, wenn ein Termin genau um Mitternacht endet', () => {
    const events = [termin('2026-06-02T20:00:00', '2026-06-03T00:00:00')];
    const bereich = slotRangeFor(events, MO, NAECHSTER_MO);
    expect(minuten(bereich.min)).toBeLessThan(minuten(bereich.max));
  });

  it('lässt Termine außerhalb des sichtbaren Fensters außer Betracht', () => {
    // Die Karte lädt einen größeren Zeitraum als die Woche, die gerade zu
    // sehen ist. Ein Termin aus der Vorwoche darf das Raster nicht dehnen.
    const events = [
      termin('2026-05-26T04:00:00', '2026-05-26T05:00:00'),
      termin('2026-06-02T09:00:00', '2026-06-02T10:00:00'),
      termin('2026-06-15T23:00:00', '2026-06-15T23:30:00'),
    ];
    expect(slotRangeFor(events, MO, NAECHSTER_MO)).toEqual({
      min: '08:00:00',
      max: '11:00:00',
    });
  });

  it('berücksichtigt einen Termin, der in das Fenster hineinragt', () => {
    // Beginn vor dem Fenster, Ende darin - er ist sichtbar und zählt.
    const events = [termin('2026-05-31T23:00:00', '2026-06-01T02:00:00')];
    const bereich = slotRangeFor(events, MO, NAECHSTER_MO);
    expect(minuten(bereich.min)).toBeLessThan(minuten(bereich.max));
    expect(bereich).toEqual({ min: '00:00:00', max: '24:00:00' });
  });

  it('liefert für jede Belegung eine gültige Ordnung', () => {
    // Streuprobe über den Tag: Untergrenze muss immer unter der Obergrenze
    // liegen, sonst bleibt das Raster leer.
    for (let stunde = 0; stunde < 24; stunde++) {
      const start = `2026-06-02T${String(stunde).padStart(2, '0')}:00:00`;
      const ende = new Date(new Date(start).getTime() + 90 * 60_000);
      const bereich = slotRangeFor(
        [termin(start, ende.toISOString())],
        MO,
        NAECHSTER_MO,
      );
      expect(minuten(bereich.min)).toBeLessThan(minuten(bereich.max));
    }
  });
});
