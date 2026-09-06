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

/** Leere Zeichenketten und Nullen heissen durchweg: nichts eingestellt, es
 *  gilt der Eintrag im Dashboard. Nur so laesst sich eine einzelne
 *  Einstellung wieder abgeben, ohne die anderen mitzunehmen. */
export interface PanelSettings {
  /** Bildschirme, die sich den Auswahlhelfer teilen. Wer nicht darin
   *  steht, ist fuer sich - das ist die Vorgabe. */
  syncedBrowsers: string[];
  initialArea: string;
  idleAfter: number;
  idleArea: string;
  fullscreenArea: string;
  fullscreenAfter: number;
}

/** Ein Kalender, so wie die App ihn zeigen soll. */
export interface CalendarItem {
  name: string;
  color: string;
  active: boolean;
}

export interface CalendarSettings {
  /** Reihenfolge in der Kopfzeile. */
  order: string[];
  items: Record<string, CalendarItem>;
  /** Mit der gestauchten Zeitachse beginnen. */
  startCompact: boolean;
}

/** Eine Spalte einer Aufgabenkarte. */
export interface TaskItem {
  name: string;
  color: string;
}

export interface TaskSetSettings {
  order: string[];
  items: Record<string, TaskItem>;
  title: string;
  showCompleted: boolean;
  showDue: boolean;
}

export interface AppSettings {
  photos: PhotoSettings;
  panel: PanelSettings;
  calendars: CalendarSettings;
  /** Je Aufgabenkarte ein Eintrag, damit sich Aufgaben und Listen nicht
   *  gegenseitig ueberschreiben. */
  tasks: Record<string, TaskSetSettings>;
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
    syncedBrowsers: [],
    initialArea: '',
    idleAfter: 0,
    idleArea: '',
    fullscreenArea: '',
    fullscreenAfter: 0,
  },
  calendars: { order: [], items: {}, startCompact: false },
  tasks: {},
};

/** Vorgaben einer Aufgabenkarte, die es im Speicher noch nicht gibt. */
export const DEFAULT_TASK_SET: TaskSetSettings = {
  order: [],
  items: {},
  title: '',
  showCompleted: false,
  showDue: true,
};

/** Tief verschachtelter Ausschnitt; alles darf fehlen. */
export type SettingsPatch = {
  photos?: Partial<PhotoSettings>;
  panel?: Partial<PanelSettings>;
  calendars?: Partial<CalendarSettings>;
  tasks?: Record<string, Partial<TaskSetSettings>>;
};

/** Fuellt fehlende Abschnitte und Felder aus den Vorgaben auf.
 *
 * Noetig, weil das Bundle und die Integration nicht im selben Moment neu
 * geladen werden: Nach einem Update laeuft die alte Integration noch im
 * Speicher weiter, bis Home Assistant neu startet, und kennt Abschnitte
 * nicht, die es im Bundle schon gibt. Ohne dieses Auffuellen zerbricht die
 * Karte am fehlenden Feld - genau dann, wenn jemand gerade aktualisiert hat.
 */
export type RohSettings = { [K in keyof AppSettings]?: Partial<AppSettings[K]> };

export function withDefaults(roh: RohSettings | null | undefined): AppSettings {
  return {
    photos: { ...DEFAULT_SETTINGS.photos, ...(roh?.photos ?? {}) },
    panel: { ...DEFAULT_SETTINGS.panel, ...(roh?.panel ?? {}) },
    calendars: { ...DEFAULT_SETTINGS.calendars, ...(roh?.calendars ?? {}) },
    tasks: { ...(roh?.tasks ?? {}) } as Record<string, TaskSetSettings>,
  };
}

export async function fetchSettings(hass: HomeAssistant): Promise<AppSettings> {
  return withDefaults(await hass.callWS<RohSettings>({ type: `${DOMAIN}/settings/get` }));
}

/** Schreibt einen Ausschnitt und liefert den neuen Gesamtstand. */
export async function patchSettings(
  hass: HomeAssistant,
  patch: SettingsPatch,
): Promise<AppSettings> {
  return withDefaults(
    await hass.callWS<RohSettings>({ type: `${DOMAIN}/settings/set`, patch }),
  );
}

interface HassConnection {
  subscribeMessage: (
    callback: (settings: RohSettings) => void,
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
