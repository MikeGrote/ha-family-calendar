import type { EventInput } from '@fullcalendar/core';
import { describe, expect, it } from 'vitest';

import { DEFAULT_COLOR, filterByCalendars, toEventInput } from '../../src/lib/event-mapping';
import type { EventExtendedProps, HassCalendarEvent } from '../../src/types';

/** Alles, was die Karte über einen Termin weiß, kommt durch diese
 *  Übersetzung. Was hier verlorengeht, fehlt später beim Speichern - und
 *  zwar ohne Fehlermeldung, weil die Schnittstelle das Feld einfach
 *  weglässt statt zu widersprechen. */

const zeitTermin: HassCalendarEvent = {
  summary: 'Zahnarzt',
  uid: 'abc123',
  start: { dateTime: '2026-06-02T09:00:00+02:00' },
  end: { dateTime: '2026-06-02T10:00:00+02:00' },
};

const ganztagTermin: HassCalendarEvent = {
  summary: 'Urlaub',
  uid: 'def456',
  start: { date: '2026-07-06' },
  end: { date: '2026-07-13' },
};

function props(event: EventInput): EventExtendedProps {
  return event.extendedProps as EventExtendedProps;
}

describe('toEventInput', () => {
  it('übernimmt Titel und Zeiten eines Termins mit Uhrzeit', () => {
    const abgebildet = toEventInput(zeitTermin, 'calendar.mike');
    expect(abgebildet.title).toBe('Zahnarzt');
    expect(abgebildet.start).toBe('2026-06-02T09:00:00+02:00');
    expect(abgebildet.end).toBe('2026-06-02T10:00:00+02:00');
    expect(abgebildet.allDay).toBe(false);
  });

  it('erkennt ganztägig am fehlenden Uhrzeitfeld', () => {
    // Home Assistant unterscheidet die beiden Arten nur dadurch, ob
    // dateTime oder date gesetzt ist.
    const abgebildet = toEventInput(ganztagTermin, 'calendar.familie');
    expect(abgebildet.allDay).toBe(true);
    expect(abgebildet.start).toBe('2026-07-06');
    expect(abgebildet.end).toBe('2026-07-13');
  });

  it('behält beim ganztägigen Termin das ausschließende Ende', () => {
    // Der 13.07. ist der erste Tag nach dem Urlaub. Sowohl die
    // Schnittstelle als auch FullCalendar rechnen so; würde die
    // Übersetzung hier einen Tag abziehen, wäre der Urlaub zu kurz.
    expect(toEventInput(ganztagTermin, 'calendar.familie').end).toBe('2026-07-13');
  });

  it('setzt Vorder- und Randfarbe auf denselben Wert', () => {
    const abgebildet = toEventInput(zeitTermin, 'calendar.mike', '#c2185b');
    expect(abgebildet.backgroundColor).toBe('#c2185b');
    expect(abgebildet.borderColor).toBe('#c2185b');
  });

  it('greift ohne Farbe auf den Standard zurück', () => {
    const abgebildet = toEventInput(zeitTermin, 'calendar.mike');
    expect(abgebildet.backgroundColor).toBe(DEFAULT_COLOR);
  });

  it('merkt sich den Kalender, aus dem der Termin stammt', () => {
    // Ohne diese Angabe wüsste das Speichern nicht, wohin.
    expect(props(toEventInput(zeitTermin, 'calendar.kjell')).entityId).toBe('calendar.kjell');
  });

  it('reicht die Wiederholungsregel durch, damit das Formular sie zeigt', () => {
    const serie: HassCalendarEvent = {
      ...zeitTermin,
      rrule: 'FREQ=WEEKLY;UNTIL=20261218T225959Z',
      recurrence_id: '20260602T090000',
    };
    const abgebildet = toEventInput(serie, 'calendar.kjell');
    expect(props(abgebildet).rrule).toBe('FREQ=WEEKLY;UNTIL=20261218T225959Z');
    expect(props(abgebildet).recurrenceId).toBe('20260602T090000');
  });

  it('füllt fehlende Kennungen mit leeren Zeichenketten statt undefined', () => {
    // Termine aus abonnierten Kalendern kommen ohne uid. Das Formular liest
    // die Felder ungeprüft; undefined stünde später als Text im Aufruf.
    const ohne: HassCalendarEvent = {
      summary: 'Feiertag',
      start: { date: '2026-10-03' },
      end: { date: '2026-10-04' },
    };
    expect(props(toEventInput(ohne, 'calendar.feiertage'))).toEqual({
      entityId: 'calendar.feiertage',
      uid: '',
      recurrenceId: '',
      rrule: '',
    });
  });

  it('gibt zwei Terminen derselben Serie verschiedene Kennungen', () => {
    // FullCalendar behandelt Termine mit gleicher id als eine Gruppe und
    // verschiebt sie gemeinsam. Bei einer Serie, von der nur dieser und
    // die folgenden Termine geändert werden sollen, wäre das falsch.
    const ersterMontag = toEventInput(
      { ...zeitTermin, rrule: 'FREQ=WEEKLY', recurrence_id: '20260602T090000' },
      'calendar.kjell',
    );
    const zweiterMontag = toEventInput(
      { ...zeitTermin, rrule: 'FREQ=WEEKLY', recurrence_id: '20260609T090000' },
      'calendar.kjell',
    );

    expect(ersterMontag.id).not.toBe(zweiterMontag.id);
    // Die uid bleibt für beide gleich - daran hängt das Speichern.
    expect(props(ersterMontag).uid).toBe(props(zweiterMontag).uid);
  });

  it('lässt die Kennung eines Einzeltermins die uid sein', () => {
    expect(toEventInput(zeitTermin, 'calendar.mike').id).toBe('abc123');
  });
});

describe('filterByCalendars', () => {
  const termine = [
    toEventInput(zeitTermin, 'calendar.mike'),
    toEventInput({ ...zeitTermin, uid: 'x' }, 'calendar.anja'),
    toEventInput({ ...zeitTermin, uid: 'y' }, 'calendar.kjell'),
  ];

  it('behält nur die eingeschalteten Kalender', () => {
    const gefiltert = filterByCalendars(termine, ['calendar.mike', 'calendar.kjell']);
    expect(gefiltert.map((e) => props(e).entityId)).toEqual([
      'calendar.mike',
      'calendar.kjell',
    ]);
  });

  it('liefert nichts, wenn kein Kalender eingeschaltet ist', () => {
    expect(filterByCalendars(termine, [])).toEqual([]);
  });

  it('ignoriert Kalender, zu denen es keine Termine gibt', () => {
    expect(filterByCalendars(termine, ['calendar.gibtsnicht'])).toEqual([]);
  });

  it('behält die ursprüngliche Reihenfolge', () => {
    const gefiltert = filterByCalendars(termine, ['calendar.kjell', 'calendar.mike']);
    expect(gefiltert.map((e) => props(e).entityId)).toEqual([
      'calendar.mike',
      'calendar.kjell',
    ]);
  });

  it('verändert die übergebene Liste nicht', () => {
    const vorher = termine.length;
    filterByCalendars(termine, ['calendar.mike']);
    expect(termine).toHaveLength(vorher);
  });
});
