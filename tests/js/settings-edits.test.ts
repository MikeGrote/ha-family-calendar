import { describe, expect, it } from 'vitest';

import {
  addToOrder,
  moveInOrder,
  removeFromOrder,
  stillAvailable,
} from '../../src/lib/settings-edits';

/** Die Reihenfolge wird als Ganzes gespeichert. Ein Fehler hier vertauscht
 *  oder verliert einen Eintrag - und im Speicher steht dann genau das. */

describe('moveInOrder', () => {
  const liste = ['a', 'b', 'c'];

  it('schiebt nach oben', () => {
    expect(moveInOrder(liste, 'b', -1)).toEqual(['b', 'a', 'c']);
  });

  it('schiebt nach unten', () => {
    expect(moveInOrder(liste, 'b', 1)).toEqual(['a', 'c', 'b']);
  });

  it('lässt den ersten Eintrag nicht heraus', () => {
    expect(moveInOrder(liste, 'a', -1)).toEqual(liste);
  });

  it('lässt den letzten Eintrag nicht heraus', () => {
    expect(moveInOrder(liste, 'c', 1)).toEqual(liste);
  });

  it('lässt einen unbekannten Eintrag die Liste unverändert', () => {
    expect(moveInOrder(liste, 'x', 1)).toEqual(liste);
  });

  it('verändert die übergebene Liste nicht', () => {
    moveInOrder(liste, 'b', 1);
    expect(liste).toEqual(['a', 'b', 'c']);
  });

  it('behält alle Einträge, egal wie oft geschoben wird', () => {
    let stand = ['a', 'b', 'c', 'd'];
    for (const [id, r] of [['d', -1], ['d', -1], ['a', 1], ['c', 1]] as [string, -1 | 1][]) {
      stand = moveInOrder(stand, id, r);
    }
    expect([...stand].sort()).toEqual(['a', 'b', 'c', 'd']);
  });
});

describe('addToOrder', () => {
  it('hängt hinten an', () => {
    expect(addToOrder(['a'], 'b')).toEqual(['a', 'b']);
  });

  it('nimmt nichts doppelt auf', () => {
    expect(addToOrder(['a', 'b'], 'a')).toEqual(['a', 'b']);
  });

  it('ignoriert eine leere Kennung', () => {
    expect(addToOrder(['a'], '')).toEqual(['a']);
  });
});

describe('removeFromOrder', () => {
  it('nimmt den Eintrag heraus', () => {
    expect(removeFromOrder(['a', 'b', 'c'], 'b')).toEqual(['a', 'c']);
  });

  it('lässt eine Liste ohne den Eintrag unverändert', () => {
    expect(removeFromOrder(['a'], 'x')).toEqual(['a']);
  });
});

describe('stillAvailable', () => {
  const alle = [{ entityId: 'a' }, { entityId: 'b' }, { entityId: 'c' }];

  it('lässt nur übrig, was noch nicht dabei ist', () => {
    expect(stillAvailable(alle, ['b'])).toEqual([{ entityId: 'a' }, { entityId: 'c' }]);
  });

  it('liefert nichts, wenn schon alles dabei ist', () => {
    expect(stillAvailable(alle, ['a', 'b', 'c'])).toEqual([]);
  });

  it('liefert alles, wenn noch nichts dabei ist', () => {
    expect(stillAvailable(alle, [])).toEqual(alle);
  });
});
