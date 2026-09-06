import { describe, expect, it } from 'vitest';

import { DEFAULT_SETTINGS, withDefaults } from '../../src/lib/settings-api';

/** Bundle und Integration werden nicht im selben Moment neu geladen. Nach
 *  einem Update laeuft die alte Integration im Speicher weiter, bis Home
 *  Assistant neu startet - sie kennt dann Abschnitte nicht, die es im
 *  Bundle schon gibt. Ohne Auffuellen zerbricht die Karte am fehlenden
 *  Feld, und zwar genau bei dem, der gerade aktualisiert hat. */

describe('withDefaults', () => {
  it('liefert bei fehlender Antwort die Vorgaben', () => {
    expect(withDefaults(undefined)).toEqual(DEFAULT_SETTINGS);
    expect(withDefaults(null)).toEqual(DEFAULT_SETTINGS);
    expect(withDefaults({})).toEqual(DEFAULT_SETTINGS);
  });

  it('ergänzt einen Abschnitt, den die ältere Integration nicht kennt', () => {
    // Genau der Fall, der die Karte beim Zeichnen hat abstürzen lassen.
    const alt = { photos: { folder: 'x', interval: 45, showClock: false, rescanMinutes: 20 } };

    const ergaenzt = withDefaults(alt);

    expect(ergaenzt.panel).toEqual(DEFAULT_SETTINGS.panel);
    expect(ergaenzt.photos.interval).toBe(45);
  });

  it('ergänzt einzelne Felder innerhalb eines Abschnitts', () => {
    const teilweise = { photos: { interval: 45 } };

    const ergaenzt = withDefaults(teilweise as never);

    expect(ergaenzt.photos.interval).toBe(45);
    expect(ergaenzt.photos.folder).toBe(DEFAULT_SETTINGS.photos.folder);
    expect(ergaenzt.photos.showClock).toBe(DEFAULT_SETTINGS.photos.showClock);
  });

  it('lässt gesetzte Werte unangetastet, auch falsche Wahrheitswerte', () => {
    // false und 0 duerfen nicht als "fehlt" gelten.
    const ergaenzt = withDefaults({
      photos: { ...DEFAULT_SETTINGS.photos, showClock: false },
      panel: { leadBrowser: '' },
    });

    expect(ergaenzt.photos.showClock).toBe(false);
    expect(ergaenzt.panel.leadBrowser).toBe('');
  });

  it('übernimmt die Führung eines Geräts', () => {
    const ergaenzt = withDefaults({ panel: { leadBrowser: 'browser_mod_abc' } });
    expect(ergaenzt.panel.leadBrowser).toBe('browser_mod_abc');
  });

  it('gibt bei jedem Aufruf eigene Abschnitte zurück', () => {
    // Sonst zoege eine Aenderung an einem Ergebnis die Vorgaben mit.
    const eins = withDefaults({});
    eins.photos.interval = 999;

    expect(withDefaults({}).photos.interval).toBe(DEFAULT_SETTINGS.photos.interval);
    expect(DEFAULT_SETTINGS.photos.interval).not.toBe(999);
  });

  it('liefert jeden Abschnitt, den die Karte anfasst', () => {
    // Waechst die Karte um einen Abschnitt, muss er hier mitwachsen -
    // sonst faellt es erst im Betrieb auf.
    expect(Object.keys(withDefaults({})).sort()).toEqual(Object.keys(DEFAULT_SETTINGS).sort());
  });
});
