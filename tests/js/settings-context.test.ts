import { describe, expect, it, vi } from 'vitest';

import {
  calendarContext,
  seedCalendars,
  seedTaskSet,
  taskContexts,
} from '../../src/lib/settings-context';
import { DEFAULT_SETTINGS, type SettingsPatch } from '../../src/lib/settings-api';
import type { TaskCardInfo } from '../../src/lib/settings-discovery';

/** Was ein Klick im Speicher bedeutet. Geht hier etwas verloren, merkt man
 *  es erst beim nächsten Laden - und dann ist nicht mehr nachvollziehbar,
 *  welche Bedienung es war. */

const dashboard = {
  entities: ['calendar.mike', 'calendar.anja'],
  colors: { 'calendar.mike': '#111111', 'calendar.anja': '#222222' },
};

function deps() {
  const patch = vi.fn<(p: SettingsPatch) => void>();
  return {
    patch,
    deps: {
      nameOf: (id: string) => `Name ${id}`,
      choices: [
        { entityId: 'calendar.mike', name: 'Mike' },
        { entityId: 'calendar.anja', name: 'Anja' },
        { entityId: 'calendar.kjell', name: 'Kjell' },
      ],
      patch,
    },
  };
}

describe('seedCalendars', () => {
  it('macht aus dem Dashboard einen vollständigen Ausgangsstand', () => {
    expect(seedCalendars(dashboard, false)).toEqual({
      order: ['calendar.mike', 'calendar.anja'],
      items: {
        'calendar.mike': { name: '', color: '#111111', active: true },
        'calendar.anja': { name: '', color: '#222222', active: true },
      },
      startCompact: false,
    });
  });

  it('trägt die Startansicht durch, statt sie anzunehmen', () => {
    expect(seedCalendars(dashboard, true).startCompact).toBe(true);
  });
});

describe('seedTaskSet', () => {
  it('übernimmt Spalten, Überschrift und Schalter der Karte', () => {
    const info: TaskCardInfo = {
      key: 'aufgaben',
      bereich: 'Aufgaben',
      title: 'Wer macht was',
      showCompleted: true,
      showDue: false,
      lists: [{ entity: 'todo.mike', name: 'Mike', color: '#111' }, { entity: 'todo.anja' }],
    };

    expect(seedTaskSet(info)).toEqual({
      order: ['todo.mike', 'todo.anja'],
      items: {
        'todo.mike': { name: 'Mike', color: '#111' },
        'todo.anja': { name: '', color: '' },
      },
      title: 'Wer macht was',
      showCompleted: true,
      showDue: false,
    });
  });
});

describe('calendarContext', () => {
  it('zeigt ohne Einstellungen die Kalender des Dashboards', () => {
    const ctx = calendarContext(DEFAULT_SETTINGS, dashboard, deps().deps);

    expect(ctx.rows.map((r) => r.entityId)).toEqual(['calendar.mike', 'calendar.anja']);
    expect(ctx.rows[0].color).toBe('#111111');
    expect(ctx.rows[0].fallbackName).toBe('Name calendar.mike');
  });

  it('bietet nur an, was noch nicht dabei ist', () => {
    const ctx = calendarContext(DEFAULT_SETTINGS, dashboard, deps().deps);
    expect(ctx.available.map((a) => a.entityId)).toEqual(['calendar.kjell']);
  });

  it('schreibt bei der ersten Änderung den ganzen Ausgangsstand', () => {
    // Sonst stünde nach dem ersten Klick nur eine Farbe im Speicher und die
    // übrigen Kalender wären verschwunden.
    const { patch, deps: d } = deps();
    calendarContext(DEFAULT_SETTINGS, dashboard, d).onColor('calendar.mike', '#abcdef');

    const geschrieben = patch.mock.calls[0][0].calendars!;
    expect(geschrieben.order).toEqual(['calendar.mike', 'calendar.anja']);
    expect(geschrieben.items!['calendar.mike']).toEqual({
      name: '',
      color: '#abcdef',
      active: true,
    });
    expect(geschrieben.items!['calendar.anja']).toEqual({
      name: '',
      color: '#222222',
      active: true,
    });
  });

  it('lässt beim Umbenennen Farbe und Schalter stehen', () => {
    const { patch, deps: d } = deps();
    const settings = {
      ...DEFAULT_SETTINGS,
      calendars: {
        order: ['calendar.mike'],
        items: { 'calendar.mike': { name: 'Alt', color: '#abcdef', active: false } },
        startCompact: false,
      },
    };

    calendarContext(settings, dashboard, d).onName('calendar.mike', 'Papa');

    expect(patch.mock.calls[0][0].calendars!.items!['calendar.mike']).toEqual({
      name: 'Papa',
      color: '#abcdef',
      active: false,
    });
  });

  it('fügt hinten an und entfernt aus der Reihenfolge', () => {
    const { patch, deps: d } = deps();
    const ctx = calendarContext(DEFAULT_SETTINGS, dashboard, d);

    ctx.onAdd('calendar.kjell');
    expect(patch.mock.calls[0][0].calendars!.order).toEqual([
      'calendar.mike',
      'calendar.anja',
      'calendar.kjell',
    ]);

    ctx.onRemove('calendar.mike');
    expect(patch.mock.calls[1][0].calendars!.order).toEqual(['calendar.anja']);
  });

  it('verschiebt in der Reihenfolge', () => {
    const { patch, deps: d } = deps();
    calendarContext(DEFAULT_SETTINGS, dashboard, d).onMove('calendar.anja', -1);

    expect(patch.mock.calls[0][0].calendars!.order).toEqual(['calendar.anja', 'calendar.mike']);
  });

  it('merkt sich die Startansicht', () => {
    const { patch, deps: d } = deps();
    calendarContext(DEFAULT_SETTINGS, dashboard, d).onStartCompact(true);

    expect(patch.mock.calls[0][0].calendars!.startCompact).toBe(true);
  });
});

describe('taskContexts', () => {
  const karten: TaskCardInfo[] = [
    {
      key: 'aufgaben',
      bereich: 'Aufgaben',
      title: 'Wer macht was',
      showCompleted: true,
      showDue: true,
      lists: [{ entity: 'todo.mike' }],
    },
    {
      key: 'listen',
      bereich: 'Listen',
      title: '',
      showCompleted: false,
      showDue: false,
      lists: [{ entity: 'todo.einkauf' }],
    },
  ];

  it('baut je Karte einen eigenen Abschnitt', () => {
    const saetze = taskContexts(DEFAULT_SETTINGS, karten, deps().deps);
    expect(saetze.map((s) => s.key)).toEqual(['aufgaben', 'listen']);
    expect(saetze.map((s) => s.bereich)).toEqual(['Aufgaben', 'Listen']);
  });

  it('schreibt unter dem Schlüssel der jeweiligen Karte', () => {
    // Der eigentliche Grund für die Trennung: Sonst überschreibt die eine
    // Karte die Spalten der anderen.
    const { patch, deps: d } = deps();
    const saetze = taskContexts(DEFAULT_SETTINGS, karten, d);

    saetze[1].onShowDue(true);

    const geschrieben = patch.mock.calls[0][0].tasks!;
    expect(Object.keys(geschrieben)).toEqual(['listen']);
    expect(geschrieben.listen.showDue).toBe(true);
    expect(geschrieben.listen.order).toEqual(['todo.einkauf']);
  });

  it('übernimmt die Werte der Karte als Ausgangspunkt', () => {
    const saetze = taskContexts(DEFAULT_SETTINGS, karten, deps().deps);
    expect(saetze[0].title).toBe('Wer macht was');
    expect(saetze[0].showCompleted).toBe(true);
    expect(saetze[1].showDue).toBe(false);
  });

  it('lässt einen gespeicherten Satz gewinnen', () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      tasks: {
        aufgaben: {
          order: ['todo.anja'],
          items: { 'todo.anja': { name: 'Anja', color: '#222' } },
          title: 'Neu',
          showCompleted: false,
          showDue: true,
        },
      },
    };

    const saetze = taskContexts(settings, karten, deps().deps);

    expect(saetze[0].rows.map((r) => r.entityId)).toEqual(['todo.anja']);
    expect(saetze[0].title).toBe('Neu');
    // Die zweite Karte bleibt beim Dashboard.
    expect(saetze[1].rows.map((r) => r.entityId)).toEqual(['todo.einkauf']);
  });
});
