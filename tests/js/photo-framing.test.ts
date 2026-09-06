import { describe, expect, it } from 'vitest';

import {
  type Face,
  type Groesse,
  backgroundPosition,
  focalPoint,
  focusPosition,
  mitteDerGesichter,
} from '../../src/lib/photo-framing';

/** Der Rahmen ist quer, viele Familienbilder sind hoch. Sitzt der Ausschnitt
 *  mittig, fällt oben und unten gleich viel weg — und oben sind die Köpfe.
 *
 *  background-position ist dabei nicht der Blickpunkt selbst, sondern
 *  verteilt den Überhang. Wer das verwechselt, verschiebt in die richtige
 *  Richtung, aber um den falschen Betrag — und merkt es nie, weil es
 *  „ungefähr" aussieht. */

const RAHMEN = { width: 1600, height: 900 };

function prozent(wert: string): { x: number; y: number } {
  const [x, y] = wert.split(' ').map((t) => Number.parseFloat(t));
  return { x, y };
}

/** Wo der Blickpunkt am Ende wirklich sitzt, in Anteilen des Rahmens.
 *
 * Das ist die Aussage, um die es geht - der Prozentwert selbst ist nur das
 * Mittel dorthin und zwischen verschiedenen Formaten nicht vergleichbar.
 */
function landetBei(focal: { x: number; y: number }, bild: Groesse, rahmen: Groesse): number {
  const p = prozent(backgroundPosition(focal, bild, rahmen)).y / 100;
  const massstab = Math.max(rahmen.width / bild.width, rahmen.height / bild.height);
  const bildHoehe = bild.height * massstab;
  const ueberhang = bildHoehe - rahmen.height;
  return (focal.y * bildHoehe - p * ueberhang) / rahmen.height;
}

describe('mitteDerGesichter', () => {
  it('liefert ohne Gesichter nichts', () => {
    expect(mitteDerGesichter([])).toBeNull();
  });

  it('nimmt bei einem Gesicht dessen Mitte', () => {
    expect(mitteDerGesichter([{ x: 0.3, y: 0.2, w: 0.1, h: 0.1 }])).toEqual({ x: 0.3, y: 0.2 });
  });

  it('legt bei mehreren die Mitte des umschließenden Kastens fest', () => {
    const gesichter: Face[] = [
      { x: 0.2, y: 0.4, w: 0.1, h: 0.1 },
      { x: 0.6, y: 0.6, w: 0.1, h: 0.1 },
    ];
    expect(mitteDerGesichter(gesichter)).toEqual({ x: 0.4, y: 0.5 });
  });

  it('lässt unbrauchbare Angaben aus', () => {
    const gesichter: Face[] = [
      { x: 1.4, y: 0.5, w: 0.1, h: 0.1 },
      { x: 0.3, y: 0.3, w: 0, h: 0.1 },
      { x: 0.7, y: 0.7, w: 0.1, h: 0.1 },
    ];
    expect(mitteDerGesichter(gesichter)).toEqual({ x: 0.7, y: 0.7 });
  });

  it('bleibt im Bild, auch wenn ein Gesicht am Rand angeschnitten ist', () => {
    const mitte = mitteDerGesichter([{ x: 0.02, y: 0.02, w: 0.2, h: 0.2 }])!;
    expect(mitte.x).toBeGreaterThanOrEqual(0);
    expect(mitte.y).toBeGreaterThanOrEqual(0);
  });
});

describe('focalPoint', () => {
  it('schaut auf die Gesichter, wenn es welche gibt', () => {
    const punkt = focalPoint({ width: 3, height: 4 }, RAHMEN, [
      { x: 0.5, y: 0.18, w: 0.1, h: 0.1 },
    ]);
    expect(punkt).toEqual({ x: 0.5, y: 0.18 });
  });

  it('schaut ohne Gesichter bei einem Hochformat ins obere Drittel', () => {
    expect(focalPoint({ width: 3, height: 4 }, RAHMEN)).toEqual({ x: 0.5, y: 0.38 });
  });

  it('bleibt ohne Gesichter mittig, wenn nur waagerecht beschnitten wird', () => {
    // Links oder rechts ist keine Seite bevorzugt.
    expect(focalPoint({ width: 3000, height: 1000 }, RAHMEN)).toEqual({ x: 0.5, y: 0.5 });
  });

  it.each([
    ['ohne Bildmaße', { width: 0, height: 0 }],
    ['mit negativer Höhe', { width: 3, height: -4 }],
  ])('bleibt %s mittig', (_fall, bild) => {
    expect(focalPoint(bild, RAHMEN)).toEqual({ x: 0.5, y: 0.5 });
  });
});

describe('backgroundPosition', () => {
  it('ändert nichts, wo nichts überhängt', () => {
    // Gleiches Seitenverhältnis: Es gibt keinen Überhang zu verteilen.
    const wert = backgroundPosition({ x: 0.2, y: 0.2 }, { width: 1600, height: 900 }, RAHMEN);
    expect(wert).toBe('50% 50%');
  });

  it('holt einen Punkt der oberen Bildhälfte tatsächlich in die Mitte', () => {
    // Nicht der Prozentwert ist die Aussage, sondern wo der Punkt landet.
    expect(landetBei({ x: 0.5, y: 0.3 }, { width: 3, height: 4 }, RAHMEN)).toBeCloseTo(0.5, 3);
  });

  it('trifft die Mitte für jeden erreichbaren Punkt', () => {
    for (const y of [0.3, 0.4, 0.5, 0.6, 0.7]) {
      expect(landetBei({ x: 0.5, y }, { width: 3, height: 4 }, RAHMEN)).toBeCloseTo(0.5, 3);
    }
  });

  it('klemmt am oberen Rand, statt über das Bild hinauszulaufen', () => {
    // Ein Gesicht ganz oben lässt sich nicht in die Mitte holen, ohne dass
    // über dem Bild Leere entstünde.
    expect(prozent(backgroundPosition({ x: 0.5, y: 0.02 }, { width: 3, height: 4 }, RAHMEN)).y)
      .toBe(0);
  });

  it('klemmt ebenso am unteren Rand', () => {
    expect(prozent(backgroundPosition({ x: 0.5, y: 0.98 }, { width: 3, height: 4 }, RAHMEN)).y)
      .toBe(100);
  });

  it('kommt der Mitte auch dann näher, wenn sie unerreichbar ist', () => {
    // Bei schwachem Beschnitt lässt sich ein hoher Punkt nicht mittig
    // holen, ohne dass über dem Bild Leere entstünde. Näher heran geht
    // trotzdem - und weiter als bis zum Rand darf es nicht gehen.
    const gelandet = landetBei({ x: 0.5, y: 0.15 }, { width: 3, height: 2 }, RAHMEN);

    expect(gelandet).toBeLessThan(0.5);
    expect(gelandet).toBeGreaterThan(0.15);
    expect(prozent(backgroundPosition({ x: 0.5, y: 0.15 }, { width: 3, height: 2 }, RAHMEN)).y)
      .toBe(0);
  });

  it('verschiebt waagerecht, wenn dort beschnitten wird', () => {
    const wert = prozent(
      backgroundPosition({ x: 0.2, y: 0.5 }, { width: 4000, height: 1000 }, RAHMEN),
    );
    expect(wert.x).toBeLessThan(50);
    expect(wert.y).toBe(50);
  });

  it.each([
    [{ width: 0, height: 0 }],
    [{ width: 3, height: -4 }],
  ])('bleibt bei unbrauchbaren Maßen mittig', (bild) => {
    expect(backgroundPosition({ x: 0.2, y: 0.2 }, bild, RAHMEN)).toBe('50% 50%');
  });
});

describe('focusPosition', () => {
  it('bringt ein Gesicht im oberen Bilddrittel weit nach oben', () => {
    const ohne = prozent(focusPosition({ width: 3, height: 4 }, RAHMEN));
    const mit = prozent(
      focusPosition({ width: 3, height: 4 }, RAHMEN, [{ x: 0.5, y: 0.15, w: 0.1, h: 0.1 }]),
    );
    expect(mit.y).toBeLessThan(ohne.y);
  });

  it('liefert immer einen gültigen CSS-Wert', () => {
    for (const bild of [
      { width: 3, height: 4 },
      { width: 4, height: 3 },
      { width: 1, height: 1 },
      { width: 20, height: 1 },
      { width: 1, height: 20 },
    ]) {
      expect(focusPosition(bild, RAHMEN)).toMatch(/^-?\d+(\.\d)?% -?\d+(\.\d)?%$/);
    }
  });

  it('bleibt in jedem Fall zwischen 0 und 100 Prozent', () => {
    for (const y of [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1]) {
      const wert = prozent(
        focusPosition({ width: 3, height: 4 }, RAHMEN, [{ x: 0.5, y, w: 0.1, h: 0.1 }]),
      );
      expect(wert.y).toBeGreaterThanOrEqual(0);
      expect(wert.y).toBeLessThanOrEqual(100);
    }
  });
});
