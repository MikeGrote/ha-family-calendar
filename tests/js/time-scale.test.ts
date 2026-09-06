import { describe, expect, it } from 'vitest';

import { type Span, buildTimeScale } from '../../src/lib/time-scale';

/** Die gestauchte Achse hat einen Zweck und eine Bedingung: Sie soll ohne
 *  Scrollen auskommen, darf dabei aber nicht über die Länge der Termine
 *  lügen. Beides wird hier geprüft - die Höhe gegen das Budget, die
 *  Maßstabstreue gegen sich selbst. */

const BUDGET = 600;

function span(vonStunde: number, bisStunde: number): Span {
  return { from: vonStunde * 60, to: bisStunde * 60 };
}

describe('buildTimeScale', () => {
  it('liefert ohne Belegung keine Achse', () => {
    expect(buildTimeScale([], BUDGET)).toBeNull();
  });

  it('verwirft Abschnitte ohne Dauer', () => {
    expect(buildTimeScale([{ from: 540, to: 540 }], BUDGET)).toBeNull();
  });

  it('liefert ohne Platz keine Achse', () => {
    expect(buildTimeScale([span(9, 10)], 0)).toBeNull();
  });

  it('bleibt bei einem einzigen Termin ohne Bruch', () => {
    const scale = buildTimeScale([span(9, 10)], BUDGET);
    expect(scale?.segments.every((s) => s.kind === 'busy')).toBe(true);
  });

  it('deckelt den Maßstab, damit ein Termin nicht die ganze Höhe füllt', () => {
    // Sonst wäre ein einzelner Zahnarzttermin einen halben Meter hoch.
    const scale = buildTimeScale([span(9, 10)], BUDGET);
    expect(scale!.height).toBeLessThan(BUDGET);
    expect(scale!.pxPerMinute).toBeLessThanOrEqual(1.6);
  });
});

describe('Maßstabstreue', () => {
  it('zeichnet einen zweistündigen Termin doppelt so hoch wie einen einstündigen', () => {
    // Der Fall aus der Anforderung: vormittags 9 bis 10, abends 20 bis 22.
    const scale = buildTimeScale([span(9, 10), span(20, 22)], BUDGET)!;

    const vormittags = scale.yOf(10 * 60) - scale.yOf(9 * 60);
    const abends = scale.yOf(22 * 60) - scale.yOf(20 * 60);

    expect(abends / vormittags).toBeCloseTo(2, 10);
  });

  it('gibt gleich langen Terminen dieselbe Höhe, egal wann sie liegen', () => {
    const scale = buildTimeScale([span(7, 8), span(13, 14), span(21, 22)], BUDGET)!;

    const hoehen = [
      scale.yOf(8 * 60) - scale.yOf(7 * 60),
      scale.yOf(14 * 60) - scale.yOf(13 * 60),
      scale.yOf(22 * 60) - scale.yOf(21 * 60),
    ];

    expect(hoehen[1]).toBeCloseTo(hoehen[0], 10);
    expect(hoehen[2]).toBeCloseTo(hoehen[0], 10);
  });

  it('behält den Maßstab auch über einen Bruch hinweg', () => {
    // Eine halbe Stunde vor der Lücke und eine halbe Stunde danach müssen
    // gleich hoch sein - sonst wäre der Vergleich über den Tag hinweg hin.
    const scale = buildTimeScale([span(8, 9), span(19, 20)], BUDGET)!;

    const vorher = scale.yOf(8 * 60 + 30) - scale.yOf(8 * 60);
    const nachher = scale.yOf(19 * 60 + 30) - scale.yOf(19 * 60);

    expect(nachher).toBeCloseTo(vorher, 10);
  });
});

describe('Stauchung leerer Zeit', () => {
  it('staucht eine lange Lücke weit unter ihre wahre Länge', () => {
    const scale = buildTimeScale([span(9, 10), span(20, 22)], BUDGET)!;
    const luecke = scale.segments.find((s) => s.kind === 'gap')!;

    // 10:30 bis 19:30 - die halbe Stunde Luft um jeden Termin geht ab.
    const echteMinuten = luecke.to - luecke.from;
    expect(echteMinuten).toBe(9 * 60);
    // Ungestaucht bräuchte sie ein Vielfaches der Höhe aller Termine.
    expect(luecke.height).toBeLessThan(echteMinuten * scale.pxPerMinute * 0.25);
  });

  it('lässt eine längere Lücke höher aussehen als eine kürzere', () => {
    // Sonst wäre nicht mehr erkennbar, wo viel Freiraum ist und wo wenig.
    const kurz = buildTimeScale([span(8, 9), span(12, 13)], BUDGET)!;
    const lang = buildTimeScale([span(8, 9), span(21, 22)], BUDGET)!;

    const kurzeLuecke = kurz.segments.find((s) => s.kind === 'gap')!;
    const langeLuecke = lang.segments.find((s) => s.kind === 'gap')!;

    expect(langeLuecke.height).toBeGreaterThan(kurzeLuecke.height);
  });

  it('deckelt die Höhe einer Lücke', () => {
    // Zwischen 4 und 12 Stunden Leerzeit darf der Unterschied sichtbar
    // sein, aber nicht die Höhe der Termine auffressen.
    const mittel = buildTimeScale([span(7, 8), span(13, 14)], BUDGET)!;
    const riesig = buildTimeScale([span(0, 1), span(22, 23)], BUDGET)!;

    const a = mittel.segments.find((s) => s.kind === 'gap')!.height;
    const b = riesig.segments.find((s) => s.kind === 'gap')!.height;

    expect(b).toBeGreaterThan(a);
    expect(b).toBeLessThan(a * 2);
  });

  it('staucht kurze Lücken gar nicht erst', () => {
    // Eine Stunde Pause zwischen zwei Terminen als Bruch zu zeichnen
    // kostet mehr Aufmerksamkeit, als es an Höhe einspart.
    const scale = buildTimeScale([span(9, 10), span(11, 12)], BUDGET)!;
    expect(scale.segments.filter((s) => s.kind === 'gap')).toHaveLength(0);
  });

  it('lässt zwischen zwei belegten Blöcken genau einen Bruch', () => {
    const scale = buildTimeScale([span(8, 9), span(14, 15), span(20, 21)], BUDGET)!;
    expect(scale.segments.map((s) => s.kind)).toEqual([
      'busy',
      'gap',
      'busy',
      'gap',
      'busy',
    ]);
  });

  it('lässt den Termingrößen mindestens die Hälfte der Höhe', () => {
    // Ein Tag mit vielen kurzen Terminen erzeugt viele Brüche. Ohne
    // Deckel bliebe für die Termine selbst nichts übrig.
    const viele = [span(1, 2), span(5, 6), span(9, 10), span(13, 14), span(17, 18), span(22, 23)];
    const scale = buildTimeScale(viele, BUDGET)!;

    const lueckenHoehe = scale.segments
      .filter((s) => s.kind === 'gap')
      .reduce((summe, s) => summe + s.height, 0);

    expect(lueckenHoehe).toBeLessThanOrEqual(BUDGET * 0.45 + 0.001);
  });
});

describe('Höhe und Budget', () => {
  it.each([
    ['ein Termin', [span(9, 10)]],
    ['zwei weit auseinander', [span(9, 10), span(20, 22)]],
    ['ein voller Tag', [span(6, 22)]],
    ['viele kurze', [span(1, 2), span(5, 6), span(9, 10), span(13, 14), span(19, 20)]],
    ['ganze 24 Stunden', [span(0, 24)]],
    ['Randlage', [span(0, 1), span(23, 24)]],
  ])('bleibt bei "%s" im Budget', (_fall, spans) => {
    // Der eigentliche Zweck der Ansicht: nie scrollen müssen.
    const scale = buildTimeScale(spans, BUDGET)!;
    expect(scale.height).toBeLessThanOrEqual(BUDGET + 0.001);
    expect(scale.height).toBeGreaterThan(0);
  });

  it.each([320, 480, 600, 900, 1200])('passt sich an ein Budget von %ipx an', (budget) => {
    const scale = buildTimeScale([span(8, 9), span(19, 21)], budget)!;
    expect(scale.height).toBeLessThanOrEqual(budget + 0.001);
  });

  it('nutzt bei viel Belegung den Platz auch aus', () => {
    const scale = buildTimeScale([span(6, 22)], BUDGET)!;
    expect(scale.height).toBeGreaterThan(BUDGET * 0.9);
  });
});

describe('yOf', () => {
  const scale = buildTimeScale([span(9, 10), span(20, 22)], BUDGET)!;

  it('beginnt oben und endet unten', () => {
    expect(scale.yOf(0)).toBe(0);
    expect(scale.yOf(24 * 60)).toBe(scale.height);
  });

  it('klemmt Zeiten außerhalb des gezeigten Bereichs an den Rand', () => {
    // Vor dem ersten und nach dem letzten Termin wird nichts gezeigt.
    expect(scale.yOf(3 * 60)).toBe(0);
    expect(scale.yOf(23 * 60 + 59)).toBe(scale.height);
  });

  it('läuft über den ganzen Tag monoton', () => {
    // Ein Rücksprung würde Termine in falscher Reihenfolge zeichnen.
    let vorher = -1;
    for (let m = 0; m <= 24 * 60; m += 5) {
      const y = scale.yOf(m);
      expect(y).toBeGreaterThanOrEqual(vorher);
      vorher = y;
    }
  });

  it('bildet den Anfang eines belegten Blocks auf dessen Oberkante ab', () => {
    for (const segment of scale.segments) {
      expect(scale.yOf(segment.from)).toBeCloseTo(segment.top, 6);
      expect(scale.yOf(segment.to)).toBeCloseTo(segment.top + segment.height, 6);
    }
  });

  it('lässt vor dem ersten Termin etwas Luft', () => {
    // Ein Termin, der direkt an der Oberkante klebt, sieht abgeschnitten aus.
    const erster = scale.segments[0];
    expect(erster.from).toBeLessThan(9 * 60);
    expect(scale.yOf(9 * 60)).toBeGreaterThan(0);
  });
});
