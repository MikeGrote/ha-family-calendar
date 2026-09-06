import { describe, expect, it } from 'vitest';

import {
  formatForApi,
  formatForInput,
  minutesToTime,
  reformatInput,
} from '../../src/lib/datetime';

/** Die Karte rechnet an zwei Grenzen: Browser-Eingabefeld und
 *  Home-Assistant-Schnittstelle. Beide erwarten Ortszeit ohne Zeitzone,
 *  entstehen aber aus einem Date, das intern in UTC liegt. Ein
 *  Vorzeichenfehler faellt im Sommer nicht auf und im Winter nur um eine
 *  Stunde - deshalb hier die Faelle, die ihn sichtbar machen. */

describe('formatForInput', () => {
  it('gibt Ortszeit aus, nicht UTC', () => {
    // Juli in Berlin ist UTC+2.
    expect(formatForInput(new Date('2026-07-01T12:00:00Z'), false)).toBe('2026-07-01T14:00');
  });

  it('rechnet im Winter mit einer Stunde Versatz', () => {
    expect(formatForInput(new Date('2026-01-15T12:00:00Z'), false)).toBe('2026-01-15T13:00');
  });

  it('schiebt über Mitternacht auf den nächsten Tag', () => {
    // 23:30 UTC ist in Berlin bereits der Folgetag.
    expect(formatForInput(new Date('2026-01-01T23:30:00Z'), false)).toBe('2026-01-02T00:30');
  });

  it('nimmt bei ganztägig das örtliche Datum, nicht das von UTC', () => {
    // Der haeufigste Fehler: ohne Versatzkorrektur stuende hier der 1. Januar.
    expect(formatForInput(new Date('2026-01-01T23:30:00Z'), true)).toBe('2026-01-02');
  });

  it('überspringt die nicht existierende Stunde beim Beginn der Sommerzeit', () => {
    // Am 29.03.2026 folgt auf 01:59 CET direkt 03:00 CEST.
    expect(formatForInput(new Date('2026-03-29T00:30:00Z'), false)).toBe('2026-03-29T01:30');
    expect(formatForInput(new Date('2026-03-29T01:30:00Z'), false)).toBe('2026-03-29T03:30');
  });

  it('bildet die doppelte Stunde beim Ende der Sommerzeit auf dieselbe Uhrzeit ab', () => {
    // 02:30 gibt es am 25.10.2026 zweimal - einmal CEST, einmal CET.
    expect(formatForInput(new Date('2026-10-25T00:30:00Z'), false)).toBe('2026-10-25T02:30');
    expect(formatForInput(new Date('2026-10-25T01:30:00Z'), false)).toBe('2026-10-25T02:30');
  });

  it('liefert für null einen leeren Wert', () => {
    expect(formatForInput(null, false)).toBe('');
    expect(formatForInput(null, true)).toBe('');
  });

  it.each([
    ['2026-07-01T12:00:00Z'],
    ['2026-01-15T08:45:00Z'],
    ['2026-12-31T22:15:00Z'],
    ['2026-03-29T01:30:00Z'],
  ])('ist umkehrbar: %s zurückgelesen ergibt denselben Zeitpunkt', (iso) => {
    const original = new Date(iso);
    // Ein Wert ohne Zeitzone wird vom Browser als Ortszeit gelesen - genau
    // so kommt er aus dem Eingabefeld zurueck.
    const zurueck = new Date(formatForInput(original, false));

    expect(zurueck.getTime()).toBe(Math.floor(original.getTime() / 60_000) * 60_000);
  });

  it('verliert in der doppelten Stunde den spaeteren der beiden Zeitpunkte', () => {
    // Am 25.10.2026 gibt es 02:30 zweimal, einmal MESZ und einmal MEZ.
    // Beide ergeben denselben Feldwert; beim Zuruecklesen waehlt die
    // Laufzeit den Versatz vor der Umstellung. Der spaetere Zeitpunkt ist
    // aus dem Feld also nicht wiederherstellbar - das liegt an der
    // Zeitzone, nicht an der Umrechnung, und darf nicht als Fehler
    // "korrigiert" werden.
    const frueh = new Date('2026-10-25T00:30:00Z');
    const spaet = new Date('2026-10-25T01:30:00Z');
    const feld = formatForInput(frueh, false);

    expect(formatForInput(spaet, false)).toBe(feld);
    expect(new Date(feld).getTime()).toBe(frueh.getTime());
    expect(new Date(feld).getTime()).not.toBe(spaet.getTime());
  });
});

describe('formatForApi', () => {
  it('hängt Sekunden an, sonst wie im Eingabefeld', () => {
    expect(formatForApi(new Date('2026-07-01T12:00:00Z'), false)).toBe('2026-07-01T14:00:00');
  });

  it('behält Sekunden aus dem Zeitpunkt', () => {
    expect(formatForApi(new Date('2026-07-01T12:00:42Z'), false)).toBe('2026-07-01T14:00:42');
  });

  it('kürzt bei ganztägig auf das Datum', () => {
    expect(formatForApi(new Date('2026-07-01T12:00:00Z'), true)).toBe('2026-07-01');
  });

  it('liefert für null einen leeren Wert', () => {
    expect(formatForApi(null, false)).toBe('');
  });
});

describe('reformatInput', () => {
  it('behält den Tag beim Wechsel auf ganztägig', () => {
    expect(reformatInput('2026-07-01T14:30', true)).toBe('2026-07-01');
  });

  it('setzt beim Wechsel zurück eine Uhrzeit, die es an jedem Tag gibt', () => {
    // 09:00 existiert auch an den Umstellungstagen - anders als 02:30.
    expect(reformatInput('2026-03-29', false)).toBe('2026-03-29T09:00');
  });

  it('ist bei leerem Wert gutmütig', () => {
    expect(reformatInput('', true)).toBe('');
    expect(reformatInput('', false)).toBe('');
  });

  it('lässt sich mehrfach hin und her schalten, ohne den Tag zu verlieren', () => {
    let wert = '2026-11-03T17:45';
    for (let i = 0; i < 3; i++) {
      wert = reformatInput(wert, true);
      wert = reformatInput(wert, false);
    }

    expect(wert.slice(0, 10)).toBe('2026-11-03');
  });
});

describe('minutesToTime', () => {
  it.each([
    [0, '00:00:00'],
    [65, '01:05:00'],
    [540, '09:00:00'],
    [1439, '23:59:00'],
    // FullCalendar versteht 24:00:00 als Tagesende - das ist gewollt und
    // nicht dasselbe wie 00:00:00 des Folgetags.
    [1440, '24:00:00'],
  ])('%i Minuten ergeben %s', (minuten, erwartet) => {
    expect(minutesToTime(minuten)).toBe(erwartet);
  });

  it('füllt einstellige Werte auf', () => {
    expect(minutesToTime(5)).toBe('00:05:00');
  });
});
