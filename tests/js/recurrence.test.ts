import { describe, expect, it } from 'vitest';

import { buildRrule, parseRrule } from '../../src/lib/recurrence';

/** Die Wiederholungsregel ist die einzige Stelle, an der die Karte Ortszeit
 *  in UTC uebersetzt und wieder zurueck. Geht dabei ein Tag verloren, endet
 *  eine Serie einen Termin zu frueh - und zwar still. */

describe('buildRrule', () => {
  it('liefert ohne Häufigkeit gar keine Regel', () => {
    expect(buildRrule('', '')).toBeUndefined();
    // Ein Enddatum ohne Häufigkeit ergibt keine Serie.
    expect(buildRrule('', '2026-12-31')).toBeUndefined();
  });

  it('lässt das Ende weg, wenn keines gewählt wurde', () => {
    expect(buildRrule('WEEKLY', '')).toBe('FREQ=WEEKLY');
  });

  it('setzt UNTIL auf das Tagesende in UTC', () => {
    // 31.12.2026 23:59:59 MEZ ist 22:59:59 UTC.
    expect(buildRrule('WEEKLY', '2026-12-31')).toBe('FREQ=WEEKLY;UNTIL=20261231T225959Z');
  });

  it('rechnet in der Sommerzeit mit zwei Stunden', () => {
    expect(buildRrule('DAILY', '2026-07-01')).toBe('FREQ=DAILY;UNTIL=20260701T215959Z');
  });

  it('behält den Tag auch am Tag der Zeitumstellung', () => {
    // Der Umstellungstag ist 23 bzw. 25 Stunden lang; das Tagesende bleibt.
    expect(buildRrule('WEEKLY', '2026-03-29')).toBe('FREQ=WEEKLY;UNTIL=20260329T215959Z');
    expect(buildRrule('WEEKLY', '2026-10-25')).toBe('FREQ=WEEKLY;UNTIL=20261025T225959Z');
  });

  it('erzeugt einen Zeitstempel im Grundformat ohne Trennzeichen', () => {
    const regel = buildRrule('MONTHLY', '2026-02-28');
    expect(regel).toMatch(/^FREQ=MONTHLY;UNTIL=\d{8}T\d{6}Z$/);
  });

  it.each(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'] as const)(
    'behält die Häufigkeit %s unverändert',
    (frequency) => {
      expect(buildRrule(frequency, '')).toBe(`FREQ=${frequency}`);
    },
  );
});

describe('parseRrule', () => {
  it('liest Häufigkeit und Ende', () => {
    expect(parseRrule('FREQ=WEEKLY;UNTIL=20261231T225959Z')).toEqual({
      frequency: 'WEEKLY',
      until: '2026-12-31',
    });
  });

  it('kommt mit einer Regel ohne Ende zurecht', () => {
    expect(parseRrule('FREQ=DAILY')).toEqual({ frequency: 'DAILY', until: '' });
  });

  it('liefert bei leerer Regel leere Felder statt undefined', () => {
    // Einzeltermine haben ein leeres rrule-Feld - das darf nicht knallen.
    expect(parseRrule('')).toEqual({ frequency: '', until: '' });
  });

  it('verwirft eine Häufigkeit, die das Formular nicht anbietet', () => {
    // HOURLY ist nach Norm gültig, die Auswahlliste kennt es aber nicht.
    // Ein unbekannter Wert würde sonst im Formular stumm hängenbleiben.
    expect(parseRrule('FREQ=HOURLY;INTERVAL=6').frequency).toBe('');
  });

  it('liest UNTIL auch ohne Uhrzeit', () => {
    // Bei ganztägigen Serien steht dort nur ein Datum.
    expect(parseRrule('FREQ=WEEKLY;UNTIL=20261025').until).toBe('2026-10-25');
  });

  it('findet die Felder unabhängig von ihrer Reihenfolge', () => {
    expect(parseRrule('UNTIL=20260701T215959Z;FREQ=MONTHLY')).toEqual({
      frequency: 'MONTHLY',
      until: '2026-07-01',
    });
  });

  it('ignoriert Felder, die das Formular nicht abbildet', () => {
    const gelesen = parseRrule('FREQ=WEEKLY;BYDAY=MO,WE;WKST=MO');
    expect(gelesen.frequency).toBe('WEEKLY');
    expect(gelesen.until).toBe('');
  });
});

describe('Zusammenspiel beim Bearbeiten einer Serie', () => {
  it.each([
    ['2026-01-15'],
    ['2026-03-28'],
    ['2026-03-29'],
    ['2026-06-30'],
    ['2026-10-25'],
    ['2026-12-31'],
  ])('behält beim Öffnen und Speichern den Endtag %s', (tag) => {
    // Der Nutzer öffnet einen Serientermin und speichert ihn ohne Änderung.
    // Genau hier kostet ein Vorzeichenfehler in der UTC-Rechnung einen Tag.
    const geschrieben = buildRrule('WEEKLY', tag);
    expect(parseRrule(geschrieben ?? '').until).toBe(tag);
  });

  it('verliert beim erneuten Speichern die Anzahl einer Serie mit COUNT', () => {
    // Serien aus fremden Kalendern können statt eines Enddatums eine Anzahl
    // tragen. Das Formular kennt nur Häufigkeit und Ende, deshalb fällt
    // COUNT beim Speichern weg. Bekannt und hier festgehalten, damit die
    // Grenze sichtbar bleibt.
    const gelesen = parseRrule('FREQ=WEEKLY;COUNT=10');
    expect(gelesen).toEqual({ frequency: 'WEEKLY', until: '' });
    expect(buildRrule(gelesen.frequency, gelesen.until)).toBe('FREQ=WEEKLY');
  });
});
