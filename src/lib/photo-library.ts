import type { HomeAssistant } from 'custom-card-helpers';

import type { PhotoTile } from '../templates/settings-photos';
import { type ImageEntry, listImageEntries, resolveImage } from './media-source';
import { deletePhoto, uploadPhoto } from './settings-api';

/** Die Bilder des Ordners: lesen, hinzufuegen, entfernen.
 *
 * Getrennt von der Karte, weil hier nichts gezeichnet wird - die Karte
 * fragt nur, was sie anzeigen soll, und wird benachrichtigt, wenn sich
 * etwas geaendert hat.
 */

export interface UploadProgress {
  fertig: number;
  gesamt: number;
}

export class PhotoLibrary {
  tiles: PhotoTile[] = [];
  loading = true;
  uploading: UploadProgress | null = null;

  constructor(
    private readonly onChange: () => void,
    private readonly onError: (message: string) => void,
  ) {}

  async reload(hass: HomeAssistant, folder: string): Promise<void> {
    this.loading = true;
    this.onChange();
    try {
      const eintraege = await listImageEntries(hass, folder);
      this.tiles = await Promise.all(eintraege.map((e) => this.toTile(hass, e)));
    } catch (err) {
      console.error('Family Settings: Ordner nicht lesbar', err);
      this.tiles = [];
      this.onError('Der Bilderordner ist nicht lesbar.');
    } finally {
      this.loading = false;
      this.onChange();
    }
  }

  /** Bilder nacheinander hochladen und den Fortschritt melden.
   *
   * Nacheinander und nicht alle auf einmal: Ein Panel mit einer Handvoll
   * Urlaubsbildern wuerde sonst seine eigene Verbindung verstopfen.
   */
  async upload(hass: HomeAssistant, folder: string, files: FileList): Promise<void> {
    const liste = [...files];
    this.uploading = { fertig: 0, gesamt: liste.length };
    this.onChange();

    let gescheitert = 0;
    for (const datei of liste) {
      try {
        await uploadPhoto(hass, folder, datei);
      } catch (err) {
        gescheitert++;
        console.error('Family Settings: Upload fehlgeschlagen', datei.name, err);
      }
      this.uploading = { fertig: this.uploading.fertig + 1, gesamt: liste.length };
      this.onChange();
    }

    this.uploading = null;
    if (gescheitert > 0) this.onError(uploadFehler(gescheitert, liste.length));
    await this.reload(hass, folder);
  }

  async remove(hass: HomeAssistant, mediaContentId: string): Promise<void> {
    try {
      await deletePhoto(hass, mediaContentId);
      this.tiles = this.tiles.filter((kachel) => kachel.id !== mediaContentId);
      this.onChange();
    } catch (err) {
      console.error('Family Settings: Löschen fehlgeschlagen', err);
      this.onError('Das Bild konnte nicht gelöscht werden.');
    }
  }

  private async toTile(hass: HomeAssistant, eintrag: ImageEntry): Promise<PhotoTile> {
    return { ...eintrag, url: await resolveImage(hass, eintrag.id) };
  }
}

/** Meldung, die sagt, wie viel schiefging - nicht nur dass. */
export function uploadFehler(gescheitert: number, gesamt: number): string {
  if (gescheitert === gesamt) {
    return gesamt === 1
      ? 'Das Bild konnte nicht hochgeladen werden.'
      : 'Kein Bild konnte hochgeladen werden.';
  }
  return `${gescheitert} von ${gesamt} Bildern konnten nicht hochgeladen werden.`;
}
