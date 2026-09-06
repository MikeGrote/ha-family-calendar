import { describe, expect, it } from 'vitest';

import { layoutOverlaps } from '../../src/lib/day-layout';

/** Zwei gleichzeitige Termine dürfen sich nicht überdecken - der untere
 *  wäre sonst unsichtbar. Geteilt wird aber nur dort, wo sich wirklich
 *  etwas berührt: Ein einzelner Abendtermin bleibt breit, auch wenn
 *  morgens drei parallel laufen. */

interface Termin {
  name: string;
  von: number;
  bis: number;
}

function lege(termine: Termin[]) {
  return layoutOverlaps(
    termine,
    (t) => t.von,
    (t) => t.bis,
  );
}

function spuren(termine: Termin[]): Record<string, string> {
  const ergebnis: Record<string, string> = {};
  for (const { item, lane, lanes } of lege(termine)) {
    ergebnis[item.name] = `${lane}/${lanes}`;
  }
  return ergebnis;
}

describe('layoutOverlaps', () => {
  it('kommt mit einer leeren Liste zurecht', () => {
    expect(lege([])).toEqual([]);
  });

  it('gibt einem einzelnen Termin die volle Breite', () => {
    expect(spuren([{ name: 'a', von: 540, bis: 600 }])).toEqual({ a: '0/1' });
  });

  it('lässt sich nicht berührende Termine beide breit', () => {
    expect(
      spuren([
        { name: 'frueh', von: 540, bis: 600 },
        { name: 'spaet', von: 1200, bis: 1320 },
      ]),
    ).toEqual({ frueh: '0/1', spaet: '0/1' });
  });

  it('teilt zwei gleichzeitige Termine', () => {
    expect(
      spuren([
        { name: 'a', von: 540, bis: 660 },
        { name: 'b', von: 600, bis: 720 },
      ]),
    ).toEqual({ a: '0/2', b: '1/2' });
  });

  it('teilt drei gleichzeitige Termine in drei Spuren', () => {
    expect(
      spuren([
        { name: 'a', von: 540, bis: 660 },
        { name: 'b', von: 560, bis: 660 },
        { name: 'c', von: 580, bis: 660 },
      ]),
    ).toEqual({ a: '0/3', b: '1/3', c: '2/3' });
  });

  it('behandelt aneinandergrenzende Termine nicht als gleichzeitig', () => {
    // Ein Termin bis 10 und der nächste ab 10 überschneiden sich nicht.
    expect(
      spuren([
        { name: 'a', von: 540, bis: 600 },
        { name: 'b', von: 600, bis: 660 },
      ]),
    ).toEqual({ a: '0/1', b: '0/1' });
  });

  it('gibt eine Spur wieder frei, sobald sie zu Ende ist', () => {
    // a und c liegen nacheinander, b läuft über beide - zwei Spuren
    // genügen, obwohl drei Termine beteiligt sind.
    expect(
      spuren([
        { name: 'a', von: 0, bis: 60 },
        { name: 'b', von: 30, bis: 180 },
        { name: 'c', von: 90, bis: 150 },
      ]),
    ).toEqual({ a: '0/2', b: '1/2', c: '0/2' });
  });

  it('hält eine Kette zusammen, auch wenn Anfang und Ende sich nicht berühren', () => {
    // a berührt b, b berührt c, a und c nicht. Trotzdem müssen alle drei
    // dieselbe Breite bekommen, sonst springen die Kanten.
    const gelegt = spuren([
      { name: 'a', von: 0, bis: 100 },
      { name: 'b', von: 50, bis: 150 },
      { name: 'c', von: 120, bis: 200 },
    ]);
    expect(new Set(Object.values(gelegt).map((v) => v.split('/')[1]))).toEqual(new Set(['2']));
  });

  it('rechnet Gruppen unabhängig voneinander', () => {
    // Der Abendtermin darf nicht schmal werden, nur weil morgens drei
    // Termine parallel liegen.
    expect(
      spuren([
        { name: 'm1', von: 540, bis: 660 },
        { name: 'm2', von: 560, bis: 660 },
        { name: 'm3', von: 580, bis: 660 },
        { name: 'abend', von: 1200, bis: 1320 },
      ]),
    ).toEqual({ m1: '0/3', m2: '1/3', m3: '2/3', abend: '0/1' });
  });

  it('hängt nicht von der Reihenfolge der Eingabe ab', () => {
    const termine = [
      { name: 'a', von: 540, bis: 660 },
      { name: 'b', von: 600, bis: 720 },
      { name: 'c', von: 1200, bis: 1260 },
    ];
    const vorwaerts = spuren(termine);
    const rueckwaerts = spuren([...termine].reverse());
    expect(rueckwaerts).toEqual(vorwaerts);
  });

  it('gibt zwei deckungsgleichen Terminen verschiedene Spuren', () => {
    expect(
      spuren([
        { name: 'a', von: 540, bis: 600 },
        { name: 'b', von: 540, bis: 600 },
      ]),
    ).toEqual({ a: '0/2', b: '1/2' });
  });

  it('legt Termine ohne Dauer nicht übereinander', () => {
    // Ein Termin ohne Länge belegt seine Spur trotzdem kurz.
    const gelegt = spuren([
      { name: 'a', von: 540, bis: 540 },
      { name: 'b', von: 540, bis: 540 },
    ]);
    expect(gelegt).toEqual({ a: '0/2', b: '1/2' });
  });

  it('verändert die übergebene Liste nicht', () => {
    const termine = [
      { name: 'b', von: 600, bis: 660 },
      { name: 'a', von: 540, bis: 600 },
    ];
    lege(termine);
    expect(termine.map((t) => t.name)).toEqual(['b', 'a']);
  });

  it('gibt jeden Termin genau einmal zurück', () => {
    const termine = Array.from({ length: 12 }, (_, i) => ({
      name: `t${i}`,
      von: i * 20,
      bis: i * 20 + 90,
    }));
    expect(lege(termine)).toHaveLength(12);
  });

  it('legt in einer Gruppe keine zwei Termine auf dieselbe Spur, die sich überschneiden', () => {
    const termine = [
      { name: 'a', von: 0, bis: 120 },
      { name: 'b', von: 30, bis: 90 },
      { name: 'c', von: 60, bis: 180 },
      { name: 'd', von: 100, bis: 140 },
    ];
    const gelegt = lege(termine);

    for (const eins of gelegt) {
      for (const zwei of gelegt) {
        if (eins === zwei || eins.lane !== zwei.lane) continue;
        const ueberschneidet = eins.item.von < zwei.item.bis && zwei.item.von < eins.item.bis;
        expect(ueberschneidet).toBe(false);
      }
    }
  });
});
