import type { HomeAssistant } from 'custom-card-helpers';

/** Zugriff auf die Medienablage von Home Assistant.
 *
 * Damit laesst sich ein Ordner auslesen, ohne die Dateien einzeln in der
 * Konfiguration zu pflegen - neue Bilder erscheinen von selbst.
 */

interface BrowseChild {
  title: string;
  media_class: string;
  media_content_id: string;
}

interface BrowseResult {
  children?: BrowseChild[];
}

interface ResolveResult {
  url: string;
}

/** Ein Bild der Ablage, so weit die Verwaltung es braucht. */
export interface ImageEntry {
  id: string;
  title: string;
}

/** Bilder eines Ordners mit Namen, alphabetisch. */
export async function listImageEntries(
  hass: HomeAssistant,
  folderId: string,
): Promise<ImageEntry[]> {
  const result = await hass.callWS<BrowseResult>({
    type: 'media_source/browse_media',
    media_content_id: folderId,
  });

  return (result.children ?? [])
    .filter((child) => child.media_class === 'image')
    .map((child) => ({ id: child.media_content_id, title: child.title }))
    .sort((a, b) => a.title.localeCompare(b.title, 'de'));
}

/** Bildkennungen eines Ordners, alphabetisch. */
export async function listImages(hass: HomeAssistant, folderId: string): Promise<string[]> {
  const result = await hass.callWS<BrowseResult>({
    type: 'media_source/browse_media',
    media_content_id: folderId,
  });

  return (result.children ?? [])
    .filter((child) => child.media_class === 'image')
    .map((child) => child.media_content_id)
    .sort((a, b) => a.localeCompare(b, 'de'));
}

/** Abrufbare URL zu einer Bildkennung.
 *
 * Die URL ist signiert und laeuft ab, deshalb wird sie erst kurz vor dem
 * Anzeigen geholt und nicht auf Vorrat gespeichert.
 */
export async function resolveImage(hass: HomeAssistant, mediaContentId: string): Promise<string> {
  const result = await hass.callWS<ResolveResult>({
    type: 'media_source/resolve_media',
    media_content_id: mediaContentId,
  });
  return result.url;
}

/** Ein Gesicht, wie die Integration es aus der Datei liest. */
export interface FaceRegion {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Gesichter eines Bildes.
 *
 * Kameras und Fotoverwaltungen schreiben sie nach dem Standard der Metadata
 * Working Group in die Datei; die Integration liest sie dort heraus. Wo
 * nichts steht, kommt eine leere Liste zurueck - dann wird geschaetzt.
 */
export async function fetchFaces(
  hass: HomeAssistant,
  mediaContentId: string,
): Promise<FaceRegion[]> {
  const antwort = await hass.callWS<{ faces: FaceRegion[] }>({
    type: 'calendar_service_ext/photos/faces',
    media_content_id: mediaContentId,
  });
  return antwort.faces ?? [];
}
