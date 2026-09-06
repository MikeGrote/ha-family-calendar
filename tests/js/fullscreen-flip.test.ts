import { describe, expect, it } from 'vitest';

import { type Rect, flipTransform } from '../../src/lib/fullscreen-flip';

/** Der Bereich springt auf Vollbild und wird per transform dorthin
 *  zurueckgelegt, wo er herkam. Stimmt diese Rechnung nicht, springt das
 *  Bild im ersten Einzelbild sichtbar - genau das, was der Effekt
 *  vermeiden soll. */

function rect(left: number, top: number, width: number, height: number): Rect {
  return { left, top, width, height };
}

/** Wendet den Transform auf die Ecken an, wie es der Browser tut. */
function angewendet(transform: string, gelegt: Rect): Rect {
  const [, dx, dy, sx, sy] = /translate\((-?[\d.]+)px, (-?[\d.]+)px\) scale\(([\d.]+), ([\d.]+)\)/
    .exec(transform)!
    .map(Number) as unknown as [string, number, number, number, number];

  // transform-origin: top left - erst skalieren, dann verschieben.
  return {
    left: gelegt.left + dx,
    top: gelegt.top + dy,
    width: gelegt.width * sx,
    height: gelegt.height * sy,
  };
}

describe('flipTransform', () => {
  const vollbild = rect(0, 0, 1280, 800);
  const klein = rect(202, 64, 1060, 680);

  it('legt das Vollbild optisch auf das kleine Rechteck zurück', () => {
    const ergebnis = angewendet(flipTransform(klein, vollbild), vollbild);

    expect(ergebnis.left).toBeCloseTo(klein.left, 1);
    expect(ergebnis.top).toBeCloseTo(klein.top, 1);
    expect(ergebnis.width).toBeCloseTo(klein.width, 0);
    expect(ergebnis.height).toBeCloseTo(klein.height, 0);
  });

  it('funktioniert auch in die andere Richtung', () => {
    // Beim Verkleinern liegt das Element im Vollbild und soll klein wirken.
    const ergebnis = angewendet(flipTransform(klein, vollbild), vollbild);
    expect(ergebnis.width).toBeLessThan(vollbild.width);
  });

  it('ergibt bei gleichem Rechteck keine Verschiebung', () => {
    expect(flipTransform(vollbild, vollbild)).toBe('translate(0px, 0px) scale(1, 1)');
  });

  it('skaliert die Achsen unabhängig voneinander', () => {
    // Seitenverhältnisse stimmen selten überein; würde nur einachsig
    // skaliert, ragte der Bereich während der Bewegung über den Rand.
    const transform = flipTransform(rect(0, 0, 640, 200), rect(0, 0, 1280, 800));
    expect(transform).toBe('translate(0px, 0px) scale(0.5, 0.25)');
  });

  it('verschiebt nach links und oben, wenn das Ziel weiter innen liegt', () => {
    const transform = flipTransform(rect(202, 64, 100, 100), rect(0, 0, 100, 100));
    expect(transform).toBe('translate(202px, 64px) scale(1, 1)');
  });

  it('verschiebt zurück, wenn das Ziel weiter außen liegt', () => {
    const transform = flipTransform(rect(0, 0, 100, 100), rect(202, 64, 100, 100));
    expect(transform).toBe('translate(-202px, -64px) scale(1, 1)');
  });

  it.each([
    ['ohne Breite', rect(0, 0, 0, 800)],
    ['ohne Höhe', rect(0, 0, 1280, 0)],
    ['ohne beides', rect(0, 0, 0, 0)],
  ])('teilt bei einem Element %s nicht durch null', (_fall, gelegt) => {
    const transform = flipTransform(klein, gelegt);
    expect(transform).not.toMatch(/Infinity|NaN/);
  });

  it('rundet auf eine Stelle, die kein Flimmern erzeugt', () => {
    // Lange Nachkommastellen blaehen das Attribut auf, ohne dass man sie
    // sieht.
    const transform = flipTransform(rect(1 / 3, 2 / 7, 1, 3), rect(0, 0, 7, 9));
    expect(transform).toMatch(/^translate\(-?\d+(\.\d{1,2})?px, -?\d+(\.\d{1,2})?px\) scale\(\d+(\.\d{1,4})?, \d+(\.\d{1,4})?\)$/);
  });
});
