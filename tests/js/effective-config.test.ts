import { describe, expect, it } from 'vitest';

import {
  DEFAULT_COLOR,
  colorMap,
  effectiveCalendars,
  effectivePanel,
  effectiveTaskLists,
} from '../../src/lib/effective-config';
import { DEFAULT_SETTINGS, DEFAULT_TASK_SET } from '../../src/lib/settings-api';
import type { ShellConfig } from '../../src/types';

/** Zwei Orte können dieselbe Sache bestimmen: der Einstellungsbereich und
 *  der Eintrag im Dashboard. Welcher gewinnt, entscheidet sich hier. Ein
 *  Fehler an dieser Stelle sieht aus wie "die Einstellung wird nicht
 *  übernommen" — und man sucht ihn in der Oberfläche. */

describe('effectiveCalendars', () => {
  const config = {
    entities: ['calendar.mike', 'calendar.anja'],
    colors: { 'calendar.mike': '#111111' },
  };

  it('nimmt ohne Einstellungen das Dashboard', () => {
    expect(effectiveCalendars(config, DEFAULT_SETTINGS.calendars)).toEqual([
      { entityId: 'calendar.mike', name: '', color: '#111111', active: true },
      { entityId: 'calendar.anja', name: '', color: DEFAULT_COLOR, active: true },
    ]);
  });

  it('kommt ganz ohne Angaben zurecht', () => {
    expect(effectiveCalendars(undefined, undefined)).toEqual([]);
  });

  it('lässt die Reihenfolge der Einstellungen gewinnen', () => {
    const kalender = effectiveCalendars(config, {
      ...DEFAULT_SETTINGS.calendars,
      order: ['calendar.anja', 'calendar.mike'],
      items: {},
    });
    expect(kalender.map((k) => k.entityId)).toEqual(['calendar.anja', 'calendar.mike']);
  });

  it('nimmt Kalender auf, die im Dashboard gar nicht stehen', () => {
    // Im Einstellungsbereich lässt sich ein Kalender hinzufügen, ohne die
    // Dashboard-Konfiguration anzufassen.
    const kalender = effectiveCalendars(config, {
      ...DEFAULT_SETTINGS.calendars,
      order: ['calendar.kjell'],
      items: { 'calendar.kjell': { name: 'Kjell', color: '#27ae60', active: true } },
    });
    expect(kalender).toEqual([
      { entityId: 'calendar.kjell', name: 'Kjell', color: '#27ae60', active: true },
    ]);
  });

  it('übernimmt Name, Farbe und Schalter je Kalender', () => {
    const kalender = effectiveCalendars(config, {
      ...DEFAULT_SETTINGS.calendars,
      order: ['calendar.mike'],
      items: { 'calendar.mike': { name: 'Papa', color: '#abcdef', active: false } },
    });
    expect(kalender[0]).toEqual({
      entityId: 'calendar.mike',
      name: 'Papa',
      color: '#abcdef',
      active: false,
    });
  });

  it('fällt bei leerer Farbe auf das Dashboard zurück', () => {
    // Eine leere Farbe heißt "nicht eingestellt", nicht "schwarz".
    const kalender = effectiveCalendars(config, {
      ...DEFAULT_SETTINGS.calendars,
      order: ['calendar.mike'],
      items: { 'calendar.mike': { name: '', color: '', active: true } },
    });
    expect(kalender[0].color).toBe('#111111');
  });

  it('ignoriert Einzelwerte, solange keine Reihenfolge steht', () => {
    // Beim Zurücksetzen wird die Reihenfolge geleert; die Einträge bleiben
    // im Speicher stehen, weil Wörterbücher zusammengeführt und nicht
    // ersetzt werden. Zählten sie weiter, zeigte die Karte eine alte Farbe,
    // während der Einstellungsbereich schon wieder das Dashboard zeigt.
    const kalender = effectiveCalendars(config, {
      ...DEFAULT_SETTINGS.calendars,
      order: [],
      items: { 'calendar.mike': { name: 'Papa', color: '#abcdef', active: false } },
    });

    expect(kalender).toEqual([
      { entityId: 'calendar.mike', name: '', color: '#111111', active: true },
      { entityId: 'calendar.anja', name: '', color: DEFAULT_COLOR, active: true },
    ]);
  });

  it('lässt einen ausgeschalteten Kalender in der Liste', () => {
    // Ausgeschaltet heißt: nicht vorausgewählt — nicht: weg. Sonst ließe er
    // sich am Panel nicht wieder einblenden.
    const kalender = effectiveCalendars(config, {
      ...DEFAULT_SETTINGS.calendars,
      order: ['calendar.mike', 'calendar.anja'],
      items: { 'calendar.mike': { name: '', color: '', active: false } },
    });
    expect(kalender).toHaveLength(2);
    expect(kalender.filter((k) => k.active).map((k) => k.entityId)).toEqual(['calendar.anja']);
  });
});

describe('colorMap', () => {
  it('baut die Zuordnung, die die Karten erwarten', () => {
    expect(
      colorMap([
        { entityId: 'calendar.a', name: '', color: '#111', active: true },
        { entityId: 'calendar.b', name: '', color: '#222', active: false },
      ]),
    ).toEqual({ 'calendar.a': '#111', 'calendar.b': '#222' });
  });
});

describe('effectiveTaskLists', () => {
  const config = {
    lists: [
      { entity: 'todo.mike', name: 'Mike', color: '#111' },
      { entity: 'todo.anja', name: 'Anja', color: '#222' },
    ],
  };

  it('nimmt ohne gespeicherten Satz das Dashboard', () => {
    expect(effectiveTaskLists(config, undefined)).toEqual(config.lists);
    expect(effectiveTaskLists(config, DEFAULT_TASK_SET)).toEqual(config.lists);
  });

  it('kommt ohne beides zurecht', () => {
    expect(effectiveTaskLists(undefined, undefined)).toEqual([]);
  });

  it('lässt den gespeicherten Satz ganz gewinnen', () => {
    const listen = effectiveTaskLists(config, {
      ...DEFAULT_TASK_SET,
      order: ['todo.einkauf'],
      items: { 'todo.einkauf': { name: 'Einkauf', color: '#16a085' } },
    });
    expect(listen).toEqual([{ entity: 'todo.einkauf', name: 'Einkauf', color: '#16a085' }]);
  });

  it('lässt Name und Farbe weg, wenn nichts eingestellt ist', () => {
    // Die Karte nimmt dann den Namen aus Home Assistant und ihre Standardfarbe.
    expect(
      effectiveTaskLists(config, { ...DEFAULT_TASK_SET, order: ['todo.x'], items: {} }),
    ).toEqual([{ entity: 'todo.x' }]);
  });

  it('behält die eingestellte Reihenfolge', () => {
    const listen = effectiveTaskLists(config, {
      ...DEFAULT_TASK_SET,
      order: ['todo.anja', 'todo.mike'],
      items: {},
    });
    expect(listen.map((l) => l.entity)).toEqual(['todo.anja', 'todo.mike']);
  });
});

describe('effectivePanel', () => {
  const config: ShellConfig = {
    areas: [
      { id: 'kalender', icon: '', name: 'Kalender' },
      { id: 'fotos', icon: '', name: 'Fotos' },
      { id: 'geplant', icon: '', name: 'Geplant', disabled: true },
      { id: 'extern', icon: '', name: 'Extern', path: '/config' },
    ],
    initial: 'kalender',
    idle: { after: 600, area: 'fotos', returnTo: 'kalender' },
    fullscreen: { area: 'fotos', after: 10 },
  };

  it('nimmt ohne Einstellungen das Dashboard', () => {
    expect(effectivePanel(config, DEFAULT_SETTINGS.panel)).toEqual({
      initial: 'kalender',
      idle: config.idle,
      fullscreen: config.fullscreen,
    });
  });

  it('lässt den eingestellten Startbereich gewinnen', () => {
    const panel = effectivePanel(config, { ...DEFAULT_SETTINGS.panel, initialArea: 'fotos' });
    expect(panel.initial).toBe('fotos');
  });

  it('überschreibt den Ruhezustand nur, wenn beides gesetzt ist', () => {
    // Eine Zeit ohne Bereich ergibt keinen Ruhezustand.
    const nurZeit = effectivePanel(config, { ...DEFAULT_SETTINGS.panel, idleAfter: 120 });
    expect(nurZeit.idle).toEqual(config.idle);

    const beides = effectivePanel(config, {
      ...DEFAULT_SETTINGS.panel,
      idleAfter: 120,
      idleArea: 'fotos',
    });
    expect(beides.idle).toEqual({ after: 120, area: 'fotos', returnTo: 'kalender' });
  });

  it('überschreibt das Vollbild eigenständig', () => {
    const panel = effectivePanel(config, {
      ...DEFAULT_SETTINGS.panel,
      fullscreenArea: 'kalender',
      fullscreenAfter: 30,
    });
    expect(panel.fullscreen).toEqual({ area: 'kalender', after: 30 });
    expect(panel.idle).toEqual(config.idle);
  });

  it.each([
    ['einen Bereich, den es nicht gibt', 'gibtsnicht'],
    ['einen angekündigten Bereich', 'geplant'],
    ['ein Ziel außerhalb des Panels', 'extern'],
  ])('ignoriert %s', (_fall, bereich) => {
    // Sonst zeigte das Panel nach einem Umbau ins Leere und ließe sich nur
    // noch über die Konfiguration retten.
    const panel = effectivePanel(config, {
      ...DEFAULT_SETTINGS.panel,
      initialArea: bereich,
      idleArea: bereich,
      idleAfter: 60,
      fullscreenArea: bereich,
      fullscreenAfter: 5,
    });
    expect(panel.initial).toBe('kalender');
    expect(panel.idle).toEqual(config.idle);
    expect(panel.fullscreen).toEqual(config.fullscreen);
  });

  it('greift ohne Startbereich auf den ersten echten Bereich zurück', () => {
    const ohne: ShellConfig = { areas: config.areas };
    expect(effectivePanel(ohne, DEFAULT_SETTINGS.panel).initial).toBe('kalender');
  });

  it('kommt ohne Konfiguration zurecht', () => {
    expect(effectivePanel(undefined, undefined)).toEqual({
      initial: '',
      idle: undefined,
      fullscreen: undefined,
    });
  });
});
