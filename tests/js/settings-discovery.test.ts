import { describe, expect, it } from 'vitest';

import { dashboardPath, findTaskCards } from '../../src/lib/settings-discovery';

/** Der Einstellungsbereich kann nicht raten, wie viele Aufgabenkarten ein
 *  Panel hat. Findet er sie nicht, lässt sich nichts einstellen — findet er
 *  zu viele, schreiben zwei Karten in denselben Eintrag. */

const dashboard = {
  views: [
    {
      cards: [
        {
          type: 'custom:family-shell',
          areas: [
            { id: 'kalender', name: 'Kalender', card: { type: 'custom:family-calendar' } },
            {
              id: 'aufgaben',
              name: 'Aufgaben',
              card: {
                type: 'custom:family-tasks',
                title: 'Wer macht was',
                showCompleted: true,
                lists: [{ entity: 'todo.mike', name: 'Mike' }],
              },
            },
            {
              id: 'listen',
              name: 'Listen',
              card: {
                type: 'custom:family-tasks',
                showDue: false,
                lists: [{ entity: 'todo.einkauf' }],
              },
            },
            { id: 'geplant', name: 'Geplant' },
          ],
        },
      ],
    },
  ],
};

describe('findTaskCards', () => {
  it('findet beide Aufgabenkarten, in der Reihenfolge der Bereiche', () => {
    expect(findTaskCards(dashboard).map((k) => k.key)).toEqual(['aufgaben', 'listen']);
  });

  it('nimmt die Kennung des Bereichs als Schlüssel', () => {
    // Zwei Karten dürfen sich nicht denselben Eintrag teilen.
    const schluessel = findTaskCards(dashboard).map((k) => k.key);
    expect(new Set(schluessel).size).toBe(schluessel.length);
  });

  it('übernimmt die Beschriftung aus der Seitenleiste', () => {
    expect(findTaskCards(dashboard)[0].bereich).toBe('Aufgaben');
  });

  it('liest die bisherigen Werte als Ausgangspunkt', () => {
    const [aufgaben, listen] = findTaskCards(dashboard);
    expect(aufgaben.title).toBe('Wer macht was');
    expect(aufgaben.showCompleted).toBe(true);
    expect(aufgaben.showDue).toBe(true);
    expect(aufgaben.lists).toEqual([{ entity: 'todo.mike', name: 'Mike' }]);
    expect(listen.showDue).toBe(false);
    expect(listen.title).toBe('');
  });

  it('lässt Bereiche ohne Karte und andere Karten aus', () => {
    expect(findTaskCards(dashboard)).toHaveLength(2);
  });

  it('greift auf die Kennung zurück, wenn ein Bereich keinen Namen hat', () => {
    const ohneNamen = {
      views: [
        {
          cards: [
            {
              type: 'custom:family-shell',
              areas: [{ id: 'listen', card: { type: 'custom:family-tasks' } }],
            },
          ],
        },
      ],
    };
    expect(findTaskCards(ohneNamen)[0].bereich).toBe('listen');
  });

  it.each([
    ['nichts', undefined],
    ['null', null],
    ['ein leeres Dashboard', {}],
    ['eine Ansicht ohne Karten', { views: [{}] }],
    ['ein Panel ohne Hülle', { views: [{ cards: [{ type: 'markdown' }] }] }],
  ])('liefert bei %s eine leere Liste', (_fall, config) => {
    expect(findTaskCards(config)).toEqual([]);
  });

  it('überspringt einen Bereich ohne Kennung', () => {
    // Ohne Kennung gäbe es keinen Schlüssel, unter dem gespeichert werden
    // könnte - eine solche Karte stumm mitzuführen wäre irreführend.
    const ohneId = {
      views: [
        {
          cards: [
            {
              type: 'custom:family-shell',
              areas: [{ name: 'Listen', card: { type: 'custom:family-tasks' } }],
            },
          ],
        },
      ],
    };
    expect(findTaskCards(ohneId)).toEqual([]);
  });
});

describe('dashboardPath', () => {
  it.each([
    ['/dashboard-wand/panel', 'dashboard-wand'],
    ['/dashboard-wand', 'dashboard-wand'],
    ['/lovelace/0', 'lovelace'],
    ['/', 'lovelace'],
    ['', 'lovelace'],
  ])('macht aus "%s" das Dashboard "%s"', (pfad, erwartet) => {
    expect(dashboardPath(pfad)).toBe(erwartet);
  });
});
