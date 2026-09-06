import { describe, expect, it } from 'vitest';

import type { TodoItem } from '../../src/lib/todo-api';
import { dueDate, dueLabel, isOverdue, openCount, sortItems } from '../../src/lib/todo-model';

/** Fälligkeiten kommen mal mit, mal ohne Uhrzeit. Beides landet in derselben
 *  Anzeige - und die Rechnung "wie viele Tage noch" darf an den beiden
 *  Umstellungstagen nicht um einen Tag danebenliegen. */

function aufgabe(teil: Partial<TodoItem> = {}): TodoItem {
  return {
    uid: teil.uid ?? 'u1',
    summary: teil.summary ?? 'Müll rausbringen',
    status: teil.status ?? 'needs_action',
    ...(teil.due !== undefined ? { due: teil.due } : {}),
    ...(teil.description !== undefined ? { description: teil.description } : {}),
  };
}

const HEUTE = new Date('2026-06-10T14:30:00+02:00');

/** Nicht jede Node-Fassung bringt die deutschen Gebietsdaten mit; der
 *  Browser auf dem Wandpanel tut es. Die Verzweigung - Wochentag oder
 *  Datum - wird deshalb sprachunabhaengig geprueft, die deutschen Woerter
 *  zusaetzlich dort, wo die Laufzeit sie beherrscht. */
const KANN_DEUTSCH = Intl.DateTimeFormat.supportedLocalesOf(['de-DE']).length > 0;

function wochentag(tag: string): string {
  return new Date(`${tag}T00:00:00`).toLocaleDateString('de-DE', { weekday: 'long' });
}

function kurzdatum(tag: string): string {
  return new Date(`${tag}T00:00:00`).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
  });
}

describe('dueDate', () => {
  it('liest eine Fälligkeit mit Uhrzeit', () => {
    const datum = dueDate(aufgabe({ due: '2026-06-10T18:00:00+02:00' }));
    expect(datum?.toISOString()).toBe('2026-06-10T16:00:00.000Z');
  });

  it('legt eine Fälligkeit ohne Uhrzeit auf Mitternacht Ortszeit', () => {
    // Ohne den angehängten Zeitanteil läse der Browser das Datum als UTC -
    // in Berlin wäre die Aufgabe dann um 02:00 fällig und an der
    // Tagesgrenze einen Tag zu früh.
    const datum = dueDate(aufgabe({ due: '2026-06-10' }));
    expect(datum?.getHours()).toBe(0);
    expect(datum?.getDate()).toBe(10);
  });

  it('liefert ohne Fälligkeit null', () => {
    expect(dueDate(aufgabe())).toBeNull();
  });

  it('liefert bei unlesbarer Angabe null statt eines ungültigen Datums', () => {
    // Ein Invalid Date würde sich lautlos durch Sortierung und Anzeige
    // ziehen und dort als "NaN" auftauchen.
    expect(dueDate(aufgabe({ due: 'irgendwann' }))).toBeNull();
  });
});

describe('isOverdue', () => {
  it('meldet gestern fällige offene Aufgaben', () => {
    expect(isOverdue(aufgabe({ due: '2026-06-09' }), HEUTE)).toBe(true);
  });

  it('meldet heute fällige Aufgaben nicht als überfällig', () => {
    // Auch nicht, wenn die Uhrzeit schon vorbei ist - der Tag läuft noch.
    expect(isOverdue(aufgabe({ due: '2026-06-10' }), HEUTE)).toBe(false);
    expect(isOverdue(aufgabe({ due: '2026-06-10T08:00:00+02:00' }), HEUTE)).toBe(false);
  });

  it('meldet erledigte Aufgaben nie als überfällig', () => {
    expect(isOverdue(aufgabe({ due: '2026-01-01', status: 'completed' }), HEUTE)).toBe(false);
  });

  it('meldet Aufgaben ohne Fälligkeit nicht als überfällig', () => {
    expect(isOverdue(aufgabe(), HEUTE)).toBe(false);
  });

  it('verändert den übergebenen Stichtag nicht', () => {
    // isOverdue setzt intern die Uhrzeit auf null - auf einer Kopie.
    const stichtag = new Date(HEUTE);
    isOverdue(aufgabe({ due: '2026-06-09' }), stichtag);
    expect(stichtag.getTime()).toBe(HEUTE.getTime());
  });
});

describe('dueLabel', () => {
  it.each([
    ['2026-06-10', 'Heute'],
    ['2026-06-11', 'Morgen'],
    ['2026-06-09', 'Gestern'],
  ])('nennt %s beim Namen: %s', (due, erwartet) => {
    expect(dueLabel(aufgabe({ due }), HEUTE)).toBe(erwartet);
  });

  it('zählt bei älteren Aufgaben die Tage', () => {
    expect(dueLabel(aufgabe({ due: '2026-06-07' }), HEUTE)).toBe('3 Tage überfällig');
  });

  it('nennt innerhalb der Woche den Wochentag', () => {
    expect(dueLabel(aufgabe({ due: '2026-06-13' }), HEUTE)).toBe(wochentag('2026-06-13'));
  });

  it('wechselt nach einer Woche vom Wochentag auf das Datum', () => {
    // Sechs Tage voraus ist noch eindeutig, sieben waere zweideutig.
    expect(dueLabel(aufgabe({ due: '2026-06-16' }), HEUTE)).toBe(wochentag('2026-06-16'));
    expect(dueLabel(aufgabe({ due: '2026-06-17' }), HEUTE)).toBe(kurzdatum('2026-06-17'));
  });

  it.runIf(KANN_DEUTSCH)('schreibt die Beschriftung auf Deutsch', () => {
    // 13.06.2026 ist ein Samstag.
    expect(dueLabel(aufgabe({ due: '2026-06-13' }), HEUTE)).toBe('Samstag');
    expect(dueLabel(aufgabe({ due: '2026-06-17' }), HEUTE)).toBe('17.06.');
  });

  it('liefert ohne Fälligkeit null', () => {
    expect(dueLabel(aufgabe(), HEUTE)).toBeNull();
  });

  it('rechnet über den Beginn der Sommerzeit richtig', () => {
    // Der 29.03.2026 hat nur 23 Stunden. Eine Division ohne Rundung
    // ergäbe hier 0,958 Tage und damit "Heute" statt "Morgen".
    const samstag = new Date('2026-03-28T20:00:00+01:00');
    expect(dueLabel(aufgabe({ due: '2026-03-29' }), samstag)).toBe('Morgen');
    expect(dueLabel(aufgabe({ due: '2026-03-30' }), samstag)).toBe(wochentag('2026-03-30'));
  });

  it('rechnet über das Ende der Sommerzeit richtig', () => {
    // Der 25.10.2026 hat 25 Stunden.
    const samstag = new Date('2026-10-24T20:00:00+02:00');
    expect(dueLabel(aufgabe({ due: '2026-10-25' }), samstag)).toBe('Morgen');
    expect(dueLabel(aufgabe({ due: '2026-10-26' }), samstag)).toBe(wochentag('2026-10-26'));
  });

  it('nennt den Stichtag unabhängig von der Uhrzeit', () => {
    // Kurz vor Mitternacht darf aus "Heute" nicht "Gestern" werden.
    const spaet = new Date('2026-06-10T23:59:00+02:00');
    const frueh = new Date('2026-06-10T00:01:00+02:00');
    expect(dueLabel(aufgabe({ due: '2026-06-10' }), spaet)).toBe('Heute');
    expect(dueLabel(aufgabe({ due: '2026-06-10' }), frueh)).toBe('Heute');
  });
});

describe('sortItems', () => {
  it('stellt offene vor erledigte', () => {
    const sortiert = sortItems([
      aufgabe({ uid: 'a', status: 'completed', due: '2026-06-01' }),
      aufgabe({ uid: 'b', due: '2026-12-01' }),
    ]);
    expect(sortiert.map((i) => i.uid)).toEqual(['b', 'a']);
  });

  it('sortiert offene nach Fälligkeit', () => {
    const sortiert = sortItems([
      aufgabe({ uid: 'spaet', due: '2026-06-20' }),
      aufgabe({ uid: 'frueh', due: '2026-06-11' }),
      aufgabe({ uid: 'mitte', due: '2026-06-15' }),
    ]);
    expect(sortiert.map((i) => i.uid)).toEqual(['frueh', 'mitte', 'spaet']);
  });

  it('stellt Aufgaben ohne Fälligkeit hinter die mit', () => {
    const sortiert = sortItems([
      aufgabe({ uid: 'ohne', summary: 'Aaa' }),
      aufgabe({ uid: 'mit', summary: 'Zzz', due: '2026-12-31' }),
    ]);
    expect(sortiert.map((i) => i.uid)).toEqual(['mit', 'ohne']);
  });

  it('sortiert Aufgaben ohne Fälligkeit nach Namen', () => {
    const sortiert = sortItems([
      aufgabe({ uid: 'c', summary: 'Zwiebeln' }),
      aufgabe({ uid: 'a', summary: 'Äpfel' }),
      aufgabe({ uid: 'b', summary: 'Butter' }),
    ]);
    // Nach deutscher Sortierung steht Ae bei A, nicht hinter Z. Das gilt
    // auch ohne deutsche Gebietsdaten, weil localeCompare dann auf eine
    // Reihenfolge zurueckfaellt, die Umlaute ebenfalls einordnet.
    expect(sortiert.map((i) => i.uid)).toEqual(['a', 'b', 'c']);
  });

  it('behält bei gleicher Fälligkeit die ursprüngliche Reihenfolge', () => {
    const sortiert = sortItems([
      aufgabe({ uid: 'erst', due: '2026-06-11' }),
      aufgabe({ uid: 'dann', due: '2026-06-11' }),
    ]);
    expect(sortiert.map((i) => i.uid)).toEqual(['erst', 'dann']);
  });

  it('vergleicht Fälligkeiten mit und ohne Uhrzeit miteinander', () => {
    const sortiert = sortItems([
      aufgabe({ uid: 'abends', due: '2026-06-11T20:00:00+02:00' }),
      aufgabe({ uid: 'ganztags', due: '2026-06-11' }),
    ]);
    expect(sortiert.map((i) => i.uid)).toEqual(['ganztags', 'abends']);
  });

  it('lässt die übergebene Liste unangetastet', () => {
    // Die Liste kommt aus dem Abonnement und wird an mehreren Stellen
    // gelesen; sie an Ort und Stelle zu sortieren wäre eine Nebenwirkung.
    const original = [
      aufgabe({ uid: 'b', due: '2026-06-20' }),
      aufgabe({ uid: 'a', due: '2026-06-11' }),
    ];
    sortItems(original);
    expect(original.map((i) => i.uid)).toEqual(['b', 'a']);
  });

  it('kommt mit einer leeren Liste zurecht', () => {
    expect(sortItems([])).toEqual([]);
  });
});

describe('openCount', () => {
  it('zählt nur die offenen', () => {
    expect(
      openCount([
        aufgabe({ uid: 'a' }),
        aufgabe({ uid: 'b', status: 'completed' }),
        aufgabe({ uid: 'c' }),
      ]),
    ).toBe(2);
  });

  it('zählt in einer leeren Liste null', () => {
    expect(openCount([])).toBe(0);
  });
});
