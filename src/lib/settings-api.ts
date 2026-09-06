import type { HomeAssistant } from 'custom-card-helpers';

/** Zugriff auf die Einstellungen der App.
 *
 * Die Werte liegen in der Integration, nicht in der Dashboard-Konfiguration.
 * Geschrieben wird immer nur ein Ausschnitt, damit zwei geoeffnete Bereiche
 * sich nicht gegenseitig ueberschreiben.
 */

const DOMAIN = 'calendar_service_ext';

export interface PhotoSettings {
  folder: string;
  /** Sekunden je Bild. */
  interval: number;
  showClock: boolean;
  rescanMinutes: number;
}

export interface PanelSettings {
  /** BrowserID des Geraets, das den Bereich zurueckmeldet. Leer: alle. */
  leadBrowser: string;
}

export interface AppSettings {
  photos: PhotoSettings;
  panel: PanelSettings;
}

/** Vorgaben, solange nichts geladen ist - deckungsgleich mit der Integration. */
export const DEFAULT_SETTINGS: AppSettings = {
  photos: {
    folder: 'media-source://media_source/local/fotos',
    interval: 30,
    showClock: true,
    rescanMinutes: 60,
  },
  panel: {
    leadBrowser: '',
  },
};

/** Tief verschachtelter Ausschnitt; alles darf fehlen. */
export type SettingsPatch = {
  photos?: Partial<PhotoSettings>;
  panel?: Partial<PanelSettings>;
};

/** Fuellt fehlende Abschnitte und Felder aus den Vorgaben auf.
 *
 * Noetig, weil das Bundle und die Integration nicht im selben Moment neu
 * geladen werden: Nach einem Update laeuft die alte Integration noch im
 * Speicher weiter, bis Home Assistant neu startet, und kennt Abschnitte
 * nicht, die es im Bundle schon gibt. Ohne dieses Auffuellen zerbricht die
 * Karte am fehlenden Feld - genau dann, wenn jemand gerade aktualisiert hat.
 */
export function withDefaults(roh: Partial<AppSettings> | null | undefined): AppSettings {
  return {
    photos: { ...DEFAULT_SETTINGS.photos, ...(roh?.photos ?? {}) },
    panel: { ...DEFAULT_SETTINGS.panel, ...(roh?.panel ?? {}) },
  };
}

export async function fetchSettings(hass: HomeAssistant): Promise<AppSettings> {
  return withDefaults(await hass.callWS<Partial<AppSettings>>({ type: `${DOMAIN}/settings/get` }));
}

/** Schreibt einen Ausschnitt und liefert den neuen Gesamtstand. */
export async function patchSettings(
  hass: HomeAssistant,
  patch: SettingsPatch,
): Promise<AppSettings> {
  return withDefaults(
    await hass.callWS<Partial<AppSettings>>({ type: `${DOMAIN}/settings/set`, patch }),
  );
}

interface HassConnection {
  subscribeMessage: (
    callback: (settings: Partial<AppSettings>) => void,
    payload: Record<string, unknown>,
  ) => Promise<() => void>;
}

/** Horcht auf Aenderungen. Der Rueckgabewert beendet das Abonnement.
 *
 * Der erste Aufruf kommt sofort mit dem aktuellen Stand - ein zusaetzliches
 * Laden eruebrigt sich damit.
 */
export async function subscribeSettings(
  hass: HomeAssistant,
  onChange: (settings: AppSettings) => void,
): Promise<() => void> {
  const connection = (hass as unknown as { connection: HassConnection }).connection;
  return connection.subscribeMessage((roh) => onChange(withDefaults(roh)), {
    type: `${DOMAIN}/settings/subscribe`,
  });
}

// ------------------------------------------------------------------- Bilder

interface HassWithFetch {
  fetchWithAuth: (path: string, init?: RequestInit) => Promise<Response>;
}

/** Laedt ein Bild in den Ordner der Medienablage.
 *
 * Genutzt wird der Weg, den Home Assistant selbst dafuer vorsieht. Ein
 * eigener Endpunkt haette eigene Regeln fuer Dateityp und Groesse gebraucht -
 * und damit eine zweite Stelle, an der sie falsch sein koennen.
 */
export async function uploadPhoto(
  hass: HomeAssistant,
  folder: string,
  file: File,
): Promise<void> {
  const daten = new FormData();
  daten.append('media_content_id', folder);
  daten.append('file', file);

  const antwort = await (hass as unknown as HassWithFetch).fetchWithAuth(
    '/api/media_source/local_source/upload',
    { method: 'POST', body: daten },
  );

  if (!antwort.ok) {
    throw new Error(`${antwort.status} ${await antwort.text()}`);
  }
}

/** Loescht ein Bild endgueltig aus der Ablage. */
export async function deletePhoto(hass: HomeAssistant, mediaContentId: string): Promise<void> {
  await hass.callWS({
    type: 'media_source/local_source/remove',
    media_content_id: mediaContentId,
  });
}
