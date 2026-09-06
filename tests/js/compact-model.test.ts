import { describe, expect, it } from 'vitest';

import { buildCompactWeek } from '../../src/lib/compact-model';
import { toEventInput } from '../../src/lib/event-mapping';
import type { HassCalendarEvent } from '../../src/types';

/** Hier läuft alles zusammen: Termine aus der Schnittstelle, die gestauchte
 *  Achse und die Aufteilung gleichzeitiger Termine. Geprüft wird, was die
 *  Ansicht behauptet - Termine maßstabsgetreu, Freiräume sichtbar, und
 *  alles ohne Scrollen. */

const MONTAG = new Date('2026-06-01T00:00:00');
const BUDGET = 600;

function termin(summary: string, start: string, end: string): HassCalendarEvent {
  return { summary, uid: `${summary}-${start}`, start: { dateTime: start }, end: { dateTime: end } };
}

function ganztags(summary: string, von: string, bis: string): HassCalendarEvent {
  return { summary, uid: summary, start: { date: von }, end: { date: bis } };
}

function woche(events: HassCalendarEvent[], budget = BUDGET, heute = MONTAG) {
  const eingaben = events.map((e, i) =>
    toEventInput(e, i % 2 === 0 ? 'calendar.mike' : 'calendar.anja', '#0078d4'),
  );
  return buildCompactWeek(eingaben, MONTAG, 7, budget, heute);
}

describe('Gerüst der Woche', () => {
  it('liefert sieben Tage mit Wochentag und Datum', () => {
    const w = woche([]);
    expect(w.days.map((t) => t.weekday)).toEqual(['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']);
    expect(w.days.map((t) => t.dayNumber)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('markiert den heutigen Tag', () => {
    const w = woche([], BUDGET, new Date('2026-06-03T15:00:00'));
    expect(w.days.map((t) => t.isToday)).toEqual([false, false, true, false, false, false, false]);
  });

  it('meldet eine Woche ohne Termine als leer', () => {
    const w = woche([]);
    expect(w.empty).toBe(true);
    expect(w.height).toBe(0);
    expect(w.ticks).toEqual([]);
  });

  it('bleibt leer, wenn es nur ganztägige Termine gibt', () => {
    // Ohne einen Termin mit Uhrzeit gibt es keine Zeitachse zu stauchen.
    const w = woche([ganztags('Urlaub', '2026-06-01', '2026-06-08')]);
    expect(w.empty).toBe(true);
    expect(w.days[0].allDay).toHaveLength(1);
  });
});

describe('Zuordnung zu den Tagen', () => {
  it('legt einen Termin auf seinen Tag', () => {
    const w = woche([termin('Zahnarzt', '2026-06-02T09:00:00', '2026-06-02T10:00:00')]);
    expect(w.days.map((t) => t.blocks.length)).toEqual([0, 1, 0, 0, 0, 0, 0]);
    expect(w.days[1].blocks[0].event.title).toBe('Zahnarzt');
  });

  it('zeigt einen ganztägigen Termin an jedem Tag, aber nicht am Endtag', () => {
    // Die Schnittstelle nennt als Ende den ersten Tag danach.
    const w = woche([ganztags('Urlaub', '2026-06-02', '2026-06-05')]);
    expect(w.days.map((t) => t.allDay.length)).toEqual([0, 1, 1, 1, 0, 0, 0]);
  });

  it('zeigt einen über Nacht laufenden Termin an beiden Tagen', () => {
    const w = woche([termin('Nachtschicht', '2026-06-02T22:00:00', '2026-06-03T06:00:00')]);
    expect(w.days[1].blocks).toHaveLength(1);
    expect(w.days[2].blocks).toHaveLength(1);
  });

  it('beschriftet den ersten und den zweiten Tag eines Nachttermins verschieden', () => {
    const w = woche([termin('Nachtschicht', '2026-06-02T22:00:00', '2026-06-03T06:00:00')]);
    expect(w.days[1].blocks[0].time).toBe('ab 22:00');
    expect(w.days[2].blocks[0].time).toBe('bis 06:00');
  });

  it('nennt bei einem Termin an einem Tag Beginn und Ende', () => {
    const w = woche([termin('Zahnarzt', '2026-06-02T09:00:00', '2026-06-02T10:30:00')]);
    expect(w.days[1].blocks[0].time).toBe('09:00 – 10:30');
  });

  it('lässt Termine außerhalb der Woche weg', () => {
    // Die Karte lädt einen größeren Zeitraum als die sichtbare Woche.
    const w = woche([
      termin('Vorwoche', '2026-05-26T09:00:00', '2026-05-26T10:00:00'),
      termin('Diese', '2026-06-02T09:00:00', '2026-06-02T10:00:00'),
      termin('Naechste', '2026-06-15T09:00:00', '2026-06-15T10:00:00'),
    ]);
    expect(w.days.flatMap((t) => t.blocks)).toHaveLength(1);
  });
});

describe('Maßstab und Freiraum', () => {
  const morgens = termin('Zahnarzt', '2026-06-02T09:00:00', '2026-06-02T10:00:00');
  const abends = termin('Elternabend', '2026-06-02T20:00:00', '2026-06-02T22:00:00');

  it('zeichnet den zweistündigen Termin doppelt so hoch wie den einstündigen', () => {
    // Der Fall aus der Anforderung.
    const w = woche([morgens, abends]);
    const [frueh, spaet] = w.days[1].blocks;

    expect(spaet.height / frueh.height).toBeCloseTo(2, 6);
  });

  it('lässt zwischen den beiden einen sichtbaren Bruch', () => {
    const w = woche([morgens, abends]);
    expect(w.gaps).toHaveLength(1);
    expect(w.gaps[0].height).toBeGreaterThan(20);
    expect(w.gaps[0].label).toBe('9 Std');
  });

  it('schreibt eine angebrochene Stunde kurz genug für die Achsenspalte', () => {
    // Schulschluss um 15:00, Sport um 18:15 - dazwischen 2:15 Stunden.
    const w = woche([
      termin('Schule', '2026-06-02T08:00:00', '2026-06-02T15:00:00'),
      termin('Sport', '2026-06-02T18:15:00', '2026-06-02T19:45:00'),
    ]);
    expect(w.gaps[0].label).toBe('2:15 Std');
  });

  it('bleibt im Höhenbudget', () => {
    const w = woche([morgens, abends]);
    expect(w.height).toBeLessThanOrEqual(BUDGET);
  });

  it('vergleicht auch über Tage hinweg richtig', () => {
    // Ein Termin am Montag und ein gleich langer am Freitag müssen gleich
    // hoch sein - die Achse gilt für die ganze Woche.
    const w = woche([
      termin('Montag', '2026-06-01T08:00:00', '2026-06-01T09:00:00'),
      termin('Freitag', '2026-06-05T19:00:00', '2026-06-05T20:00:00'),
    ]);
    expect(w.days[4].blocks[0].height).toBeCloseTo(w.days[0].blocks[0].height, 6);
  });

  it('zeichnet auch einen sehr kurzen Termin noch lesbar', () => {
    const w = woche([termin('Anruf', '2026-06-02T09:00:00', '2026-06-02T09:05:00')]);
    expect(w.days[1].blocks[0].height).toBeGreaterThanOrEqual(15);
  });

  it.each([
    ['ein einziger Termin', [termin('A', '2026-06-02T09:00:00', '2026-06-02T10:00:00')]],
    [
      'voller Wochenplan',
      [
        termin('A', '2026-06-01T07:30:00', '2026-06-01T08:15:00'),
        termin('B', '2026-06-01T13:00:00', '2026-06-01T14:00:00'),
        termin('C', '2026-06-02T09:00:00', '2026-06-02T10:00:00'),
        termin('D', '2026-06-03T17:00:00', '2026-06-03T19:30:00'),
        termin('E', '2026-06-04T06:00:00', '2026-06-04T07:00:00'),
        termin('F', '2026-06-05T21:00:00', '2026-06-05T23:00:00'),
        termin('G', '2026-06-06T11:00:00', '2026-06-06T12:00:00'),
      ],
    ],
    ['ganzer Tag belegt', [termin('Reise', '2026-06-02T00:00:00', '2026-06-03T00:00:00')]],
  ])('bleibt bei "%s" im Budget', (_fall, events) => {
    expect(woche(events).height).toBeLessThanOrEqual(BUDGET + 0.001);
  });

  it.each([360, 480, 600, 820])('passt sich an ein Budget von %ipx an', (budget) => {
    const w = woche([morgens, abends], budget);
    expect(w.height).toBeLessThanOrEqual(budget + 0.001);
    expect(w.height).toBeGreaterThan(budget * 0.5);
  });
});

describe('Stundenbeschriftung', () => {
  it('beschriftet nur die ungestauchten Bereiche', () => {
    // Eine Uhrzeit mitten im Bruch wäre falsch: Dort ist der Maßstab
    // absichtlich verlassen.
    const w = woche([
      termin('A', '2026-06-02T09:00:00', '2026-06-02T10:00:00'),
      termin('B', '2026-06-02T20:00:00', '2026-06-02T22:00:00'),
    ]);

    for (const bruch of w.gaps) {
      for (const tick of w.ticks) {
        const drin = tick.y > bruch.top + 0.001 && tick.y < bruch.top + bruch.height - 0.001;
        expect(drin).toBe(false);
      }
    }
  });

  it('schreibt die Uhrzeiten zweistellig', () => {
    const w = woche([termin('A', '2026-06-02T09:00:00', '2026-06-02T10:00:00')]);
    expect(w.ticks.length).toBeGreaterThan(0);
    for (const tick of w.ticks) expect(tick.label).toMatch(/^\d{2}:\d{2}$/);
  });

  it('beschriftet aufsteigend', () => {
    const w = woche([
      termin('A', '2026-06-02T09:00:00', '2026-06-02T10:00:00'),
      termin('B', '2026-06-02T20:00:00', '2026-06-02T22:00:00'),
    ]);
    const ys = w.ticks.map((t) => t.y);
    expect([...ys].sort((a, b) => a - b)).toEqual(ys);
  });

  it('dünnt die Beschriftung aus, wenn wenig Platz ist', () => {
    // Bei kleinem Budget dürfen die Stunden nicht übereinanderkleben.
    const w = woche([termin('Reise', '2026-06-02T00:00:00', '2026-06-03T00:00:00')], 300);
    const ys = w.ticks.map((t) => t.y).sort((a, b) => a - b);
    for (let i = 1; i < ys.length; i++) {
      expect(ys[i] - ys[i - 1]).toBeGreaterThanOrEqual(33);
    }
  });
});

describe('Gleichzeitige Termine', () => {
  it('legt zwei gleichzeitige Termine nebeneinander', () => {
    const w = woche([
      termin('Mike', '2026-06-02T09:00:00', '2026-06-02T10:00:00'),
      termin('Anja', '2026-06-02T09:30:00', '2026-06-02T10:30:00'),
    ]);
    const [a, b] = w.days[1].blocks;
    expect(a.lanes).toBe(2);
    expect(b.lanes).toBe(2);
    expect(a.lane).not.toBe(b.lane);
  });

  it('lässt einen Termin ohne Nachbarn in voller Breite', () => {
    const w = woche([
      termin('Mike', '2026-06-02T09:00:00', '2026-06-02T10:00:00'),
      termin('Anja', '2026-06-02T09:30:00', '2026-06-02T10:30:00'),
      termin('Abend', '2026-06-02T20:00:00', '2026-06-02T21:00:00'),
    ]);
    const abend = w.days[1].blocks.find((b) => b.event.title === 'Abend')!;
    expect(abend.lanes).toBe(1);
  });

  it('rechnet die Tage unabhängig voneinander', () => {
    const w = woche([
      termin('Mo1', '2026-06-01T09:00:00', '2026-06-01T10:00:00'),
      termin('Mo2', '2026-06-01T09:30:00', '2026-06-01T10:30:00'),
      termin('Di', '2026-06-02T09:00:00', '2026-06-02T10:00:00'),
    ]);
    expect(w.days[0].blocks.every((b) => b.lanes === 2)).toBe(true);
    expect(w.days[1].blocks[0].lanes).toBe(1);
  });
});

describe('Weiterreichen an das Formular', () => {
  it('behält die Zusatzdaten, mit denen der Termin gespeichert wird', () => {
    const serie: HassCalendarEvent = {
      summary: 'Sport',
      uid: 'abc',
      rrule: 'FREQ=WEEKLY',
      recurrence_id: '20260602T170000',
      start: { dateTime: '2026-06-02T17:00:00' },
      end: { dateTime: '2026-06-02T18:00:00' },
    };
    const w = buildCompactWeek(
      [toEventInput(serie, 'calendar.kjell', '#c2185b')],
      MONTAG,
      7,
      BUDGET,
      MONTAG,
    );

    const block = w.days[1].blocks[0];
    expect(block.color).toBe('#c2185b');
    expect(block.event.extendedProps).toEqual({
      entityId: 'calendar.kjell',
      uid: 'abc',
      recurrenceId: '20260602T170000',
      rrule: 'FREQ=WEEKLY',
    });
    expect(block.event.allDay).toBe(false);
  });
});
