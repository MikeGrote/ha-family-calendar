import { describe, expect, it } from 'vitest';

import {
  buildDescription,
  parseMarker,
  recurrenceLabel,
  stripMarker,
} from '../../src/lib/todo-recurrence';

/** Die Wiederholungsregel einer Aufgabe reist in deren Beschreibung mit,
 *  weil Home Assistant dafür kein Feld hat. Karte und Integration lesen
 *  dieselbe Zeile - weicht eine Seite ab, legt die Integration die nächste
 *  Aufgabe nicht oder falsch an. Der Nutzer merkt das erst Tage später. */

describe('parseMarker', () => {
  it('liest eine einfache Regel', () => {
    expect(parseMarker('[wdh: FREQ=WEEKLY]')).toEqual({ frequency: 'WEEKLY', interval: 1 });
  });

  it('liest den Abstand mit', () => {
    expect(parseMarker('[wdh: FREQ=WEEKLY;INTERVAL=2]')).toEqual({
      frequency: 'WEEKLY',
      interval: 2,
    });
  });

  it('findet die Regel unter einem eigenen Text', () => {
    const beschreibung = 'Gelbe Tonne an die Straße\n\n[wdh: FREQ=WEEKLY;INTERVAL=2]';
    expect(parseMarker(beschreibung)).toEqual({ frequency: 'WEEKLY', interval: 2 });
  });

  it('findet die Regel auch über dem Text', () => {
    expect(parseMarker('[wdh: FREQ=DAILY]\nNicht vergessen')).toEqual({
      frequency: 'DAILY',
      interval: 1,
    });
  });

  it('verträgt zusätzliche Leerzeichen', () => {
    expect(parseMarker('[wdh:   FREQ=MONTHLY ; INTERVAL=3 ]  ')).toEqual({
      frequency: 'MONTHLY',
      interval: 3,
    });
  });

  it('liest die Häufigkeit auch in Kleinschreibung', () => {
    expect(parseMarker('[wdh: freq=weekly]')).toEqual({ frequency: 'WEEKLY', interval: 1 });
  });

  it.each([
    ['ohne Beschreibung', undefined],
    ['bei leerer Beschreibung', ''],
    ['ohne Markierung', 'Nur ein Hinweis'],
    ['bei unbekannter Häufigkeit', '[wdh: FREQ=HOURLY]'],
    ['ohne Häufigkeit', '[wdh: INTERVAL=2]'],
    ['bei leerer Markierung', '[wdh: ]'],
  ])('liefert %s keine Regel', (_fall, beschreibung) => {
    expect(parseMarker(beschreibung)).toBeNull();
  });

  it('erkennt keine Markierung mitten in einer Zeile', () => {
    // Die Regel steht auf einer eigenen Zeile. Sonst würde ein Text, der
    // die Schreibweise nur erwähnt, versehentlich zur Regel.
    expect(parseMarker('Siehe [wdh: FREQ=DAILY] im Handbuch')).toBeNull();
  });

  it.each([
    ['[wdh: FREQ=DAILY;INTERVAL=0]'],
    ['[wdh: FREQ=DAILY;INTERVAL=-3]'],
    ['[wdh: FREQ=DAILY;INTERVAL=zwei]'],
  ])('rettet einen unsinnigen Abstand in %s auf 1', (beschreibung) => {
    // Ein Abstand von 0 würde die Integration in eine Endlosschleife
    // schicken, ein negativer die Aufgabe in die Vergangenheit legen.
    expect(parseMarker(beschreibung)?.interval).toBe(1);
  });

  it.each(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'] as const)(
    'kennt die Häufigkeit %s',
    (frequency) => {
      expect(parseMarker(`[wdh: FREQ=${frequency}]`)?.frequency).toBe(frequency);
    },
  );
});

describe('stripMarker', () => {
  it('gibt den Text ohne die Regelzeile zurück', () => {
    expect(stripMarker('Gelbe Tonne\n\n[wdh: FREQ=WEEKLY]')).toBe('Gelbe Tonne');
  });

  it('lässt eine Beschreibung ohne Regel unverändert', () => {
    expect(stripMarker('Gelbe Tonne')).toBe('Gelbe Tonne');
  });

  it('liefert bei fehlender Beschreibung eine leere Zeichenkette', () => {
    // Das Bearbeitungsfeld braucht einen Wert, nicht undefined.
    expect(stripMarker(undefined)).toBe('');
  });

  it('liefert eine leere Zeichenkette, wenn nur die Regel dastand', () => {
    expect(stripMarker('[wdh: FREQ=WEEKLY]')).toBe('');
  });

  it('behält mehrzeiligen Text', () => {
    expect(stripMarker('Erste Zeile\nZweite Zeile\n\n[wdh: FREQ=DAILY]')).toBe(
      'Erste Zeile\nZweite Zeile',
    );
  });
});

describe('buildDescription', () => {
  it('hängt die Regel unter den Text', () => {
    expect(buildDescription('Gelbe Tonne', 'WEEKLY', 2)).toBe(
      'Gelbe Tonne\n\n[wdh: FREQ=WEEKLY;INTERVAL=2]',
    );
  });

  it('lässt den Abstand weg, wenn er 1 ist', () => {
    // Kürzer und deckungsgleich mit dem, was die Integration schreibt.
    expect(buildDescription('Gelbe Tonne', 'WEEKLY')).toBe('Gelbe Tonne\n\n[wdh: FREQ=WEEKLY]');
    expect(buildDescription('Gelbe Tonne', 'WEEKLY', 1)).toBe('Gelbe Tonne\n\n[wdh: FREQ=WEEKLY]');
  });

  it('schreibt nur die Regel, wenn es keinen Text gibt', () => {
    expect(buildDescription('', 'DAILY')).toBe('[wdh: FREQ=DAILY]');
  });

  it('entfernt die Regel, wenn keine Häufigkeit gewählt ist', () => {
    // So wird eine Wiederholung wieder abgestellt.
    expect(buildDescription('Gelbe Tonne\n\n[wdh: FREQ=WEEKLY]', '')).toBe('Gelbe Tonne');
  });

  it('liefert beim Abstellen ohne Text eine leere Beschreibung', () => {
    expect(buildDescription('[wdh: FREQ=WEEKLY]', '')).toBe('');
  });

  it('verdoppelt eine vorhandene Regel nicht', () => {
    // Beim Korrigieren einer Aufgabe kommt der Text mit alter Regel zurück.
    // Zwei Regelzeilen wären mehrdeutig.
    const geaendert = buildDescription('Gelbe Tonne\n\n[wdh: FREQ=WEEKLY]', 'MONTHLY', 3);
    expect(geaendert).toBe('Gelbe Tonne\n\n[wdh: FREQ=MONTHLY;INTERVAL=3]');
    expect(geaendert.match(/\[wdh:/g)).toHaveLength(1);
  });
});

describe('Regel schreiben und wieder lesen', () => {
  it.each([
    ['DAILY' as const, 1],
    ['DAILY' as const, 3],
    ['WEEKLY' as const, 1],
    ['WEEKLY' as const, 2],
    ['MONTHLY' as const, 6],
    ['YEARLY' as const, 1],
  ])('behält %s alle %i', (frequency, interval) => {
    const beschreibung = buildDescription('Aufgabe', frequency, interval);
    expect(parseMarker(beschreibung)).toEqual({ frequency, interval });
    expect(stripMarker(beschreibung)).toBe('Aufgabe');
  });

  it('bleibt nach mehrfachem Bearbeiten stabil', () => {
    // Der Nutzer korrigiert dieselbe Aufgabe mehrfach.
    let beschreibung = buildDescription('Müll', 'WEEKLY', 2);
    for (let i = 0; i < 5; i++) {
      beschreibung = buildDescription(beschreibung, 'WEEKLY', 2);
    }
    expect(beschreibung).toBe('Müll\n\n[wdh: FREQ=WEEKLY;INTERVAL=2]');
  });

  it('stellt die Wiederholung ab und wieder an, ohne den Text zu verlieren', () => {
    const mit = buildDescription('Müll', 'WEEKLY', 2);
    const ohne = buildDescription(mit, '');
    const wieder = buildDescription(ohne, 'MONTHLY');

    expect(ohne).toBe('Müll');
    expect(parseMarker(ohne)).toBeNull();
    expect(parseMarker(wieder)).toEqual({ frequency: 'MONTHLY', interval: 1 });
    expect(stripMarker(wieder)).toBe('Müll');
  });
});

describe('recurrenceLabel', () => {
  it.each([
    ['DAILY' as const, 'Täglich'],
    ['WEEKLY' as const, 'Wöchentlich'],
    ['MONTHLY' as const, 'Monatlich'],
    ['YEARLY' as const, 'Jährlich'],
  ])('nennt %s ohne Abstand %s', (frequency, erwartet) => {
    expect(recurrenceLabel({ frequency, interval: 1 })).toBe(erwartet);
  });

  it.each([
    [2, 'WEEKLY' as const, 'Alle 2 Wochen'],
    [3, 'DAILY' as const, 'Alle 3 Tage'],
    [6, 'MONTHLY' as const, 'Alle 6 Monate'],
    [2, 'YEARLY' as const, 'Alle 2 Jahre'],
  ])('nennt Abstand %i bei %s: %s', (interval, frequency, erwartet) => {
    expect(recurrenceLabel({ frequency, interval })).toBe(erwartet);
  });

  it('behandelt einen unsinnigen Abstand wie keinen', () => {
    expect(recurrenceLabel({ frequency: 'WEEKLY', interval: 0 })).toBe('Wöchentlich');
  });
});
