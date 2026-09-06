/** Kennung dieses Browsers, vergeben von browser_mod.
 *
 * Gebraucht wird sie, um genau einem Bildschirm die Fuehrung zu geben: Der
 * Auswahlhelfer fuer den Bereich ist eine einzige globale Entitaet, also
 * zieht sonst jeder Klick auf irgendeinem Geraet alle anderen mit.
 *
 * Zwei Quellen, weil browser_mod die Kennung im Speicher des Browsers
 * ablegt und erst beim Verbinden auf das globale Objekt legt - je nach
 * Zeitpunkt ist mal die eine, mal die andere schon da.
 */

const SPEICHER_SCHLUESSEL = 'browser_mod-browser-id';

interface BrowserMod {
  browserID?: string;
}

export function browserId(): string {
  const global = (window as unknown as { browser_mod?: BrowserMod }).browser_mod;
  if (global?.browserID) return global.browserID;

  try {
    return window.localStorage.getItem(SPEICHER_SCHLUESSEL) ?? '';
  } catch {
    // Privater Modus oder gesperrter Speicher: dann eben keine Kennung.
    return '';
  }
}

/** Kurzform fuer die Anzeige - die volle Kennung ist unlesbar lang. */
export function shortBrowserId(id: string): string {
  const ohnePrefix = id.replace(/^browser_mod_/, '');
  return ohnePrefix.length > 14 ? `${ohnePrefix.slice(0, 14)}…` : ohnePrefix;
}
