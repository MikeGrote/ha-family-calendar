import type { HomeAssistant } from 'custom-card-helpers';
import { LitElement, type TemplateResult, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { type ImageEntry, listImageEntries, resolveImage } from './lib/media-source';
import {
  type AppSettings,
  DEFAULT_SETTINGS,
  type PhotoSettings,
  deletePhoto,
  patchSettings,
  subscribeSettings,
  uploadPhoto,
} from './lib/settings-api';
import { settingsStyles } from './styles/settings';
import { type SettingsSection, renderComingSoon, renderSettingsFrame } from './templates/settings';
import { renderInfo } from './templates/settings-info';
import { type PhotoTile, renderPhotoSettings } from './templates/settings-photos';
import type { SettingsConfig } from './types';

/** Einstellungen der App.
 *
 * Ein eigener Bereich fuer die Parameter der App - nicht fuer die von Home
 * Assistant. Was HA schon fuehrt, etwa die Zeitzone, wird hier gezeigt und
 * nicht ein zweites Mal gesetzt.
 */

const SECTIONS: SettingsSection[] = [
  { id: 'fotos', icon: 'mdi:image-multiple', name: 'Fotos', ready: true },
  { id: 'kalender', icon: 'mdi:calendar-month', name: 'Kalender', ready: false },
  { id: 'aufgaben', icon: 'mdi:checkbox-marked-outline', name: 'Aufgaben', ready: false },
  { id: 'panel', icon: 'mdi:tablet-dashboard', name: 'Panel', ready: false },
  { id: 'info', icon: 'mdi:information-outline', name: 'Über', ready: true },
];

const HINWEIS_MS = 6000;

@customElement('family-settings')
export class FamilySettings extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: SettingsConfig;

  @state() private settings: AppSettings = DEFAULT_SETTINGS;
  @state() private section = 'fotos';
  @state() private tiles: PhotoTile[] = [];
  @state() private loading = true;
  @state() private uploading: { fertig: number; gesamt: number } | null = null;
  @state() private confirmDelete = '';
  @state() private message = '';
  @state() private appVersion = '';

  @query('#dateiwahl') private fileInput?: HTMLInputElement;

  private unsubscribe?: () => void;
  private started = false;
  private hinweisTimer?: number;

  setConfig(config: SettingsConfig): void {
    this.config = config;
  }

  getCardSize(): number {
    return 12;
  }

  updated(): void {
    if (this.hass && !this.started) {
      this.started = true;
      void this.start();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribe?.();
    this.unsubscribe = undefined;
    if (this.hinweisTimer) clearTimeout(this.hinweisTimer);
    this.started = false;
  }

  render(): TemplateResult {
    return html`
      <ha-card>
        <h2 class="set-titel">Einstellungen</h2>
        ${renderSettingsFrame({
          sections: SECTIONS,
          active: this.section,
          message: this.message,
          onSection: (id) => {
            this.section = id;
            this.confirmDelete = '';
          },
          content: this.inhalt(),
        })}
      </ha-card>
    `;
  }

  private inhalt(): TemplateResult {
    if (this.section === 'info') {
      return renderInfo({
        timeZone: this.hass?.config?.time_zone ?? '',
        haVersion: this.hass?.config?.version ?? '',
        appVersion: this.appVersion,
        folder: this.settings.photos.folder,
        onOpenIntegration: () =>
          this.navigate('/config/integrations/integration/calendar_service_ext'),
        onOpenTimeZone: () => this.navigate('/config/general'),
      });
    }

    if (this.section !== 'fotos') {
      return renderComingSoon(SECTIONS.find((s) => s.id === this.section)?.name ?? 'Der Bereich');
    }

    return renderPhotoSettings({
      settings: this.settings.photos,
      tiles: this.tiles,
      uploading: this.uploading,
      confirmDelete: this.confirmDelete,
      loading: this.loading,
      onPick: () => this.fileInput?.click(),
      onFiles: (files) => void this.upload(files),
      onAskDelete: (id) => (this.confirmDelete = id),
      onCancelDelete: () => (this.confirmDelete = ''),
      onDelete: (id) => void this.bildLoeschen(id),
      onChange: (patch) => void this.savePhotos(patch),
    });
  }

  // ---------------------------------------------------------------- Daten

  private async start(): Promise<void> {
    try {
      this.unsubscribe = await subscribeSettings(this.hass, (settings) => {
        const ordnerNeu = settings.photos.folder !== this.settings.photos.folder;
        this.settings = settings;
        if (ordnerNeu) void this.loadTiles();
      });
    } catch (err) {
      console.error('Family Settings: Einstellungen nicht erreichbar', err);
      this.notify('Einstellungen konnten nicht geladen werden.');
    }

    void this.loadVersion();
    await this.loadTiles();
  }

  private async loadVersion(): Promise<void> {
    try {
      const manifest = await this.hass.callWS<{ version?: string }>({
        type: 'manifest/get',
        integration: 'calendar_service_ext',
      });
      this.appVersion = manifest.version ?? '';
    } catch {
      // Ohne Version fehlt nur eine Zeile im Bereich "Stand".
      this.appVersion = '';
    }
  }

  private async loadTiles(): Promise<void> {
    this.loading = true;
    try {
      const eintraege = await listImageEntries(this.hass, this.settings.photos.folder);
      this.tiles = await Promise.all(eintraege.map((eintrag) => this.toTile(eintrag)));
    } catch (err) {
      console.error('Family Settings: Ordner nicht lesbar', err);
      this.tiles = [];
      this.notify('Der Bilderordner ist nicht lesbar.');
    } finally {
      this.loading = false;
    }
  }

  private async toTile(eintrag: ImageEntry): Promise<PhotoTile> {
    return { ...eintrag, url: await resolveImage(this.hass, eintrag.id) };
  }

  // -------------------------------------------------------------- Bilder

  private async upload(files: FileList): Promise<void> {
    const liste = [...files];
    this.uploading = { fertig: 0, gesamt: liste.length };
    let gescheitert = 0;

    for (const datei of liste) {
      try {
        await uploadPhoto(this.hass, this.settings.photos.folder, datei);
      } catch (err) {
        gescheitert++;
        console.error('Family Settings: Upload fehlgeschlagen', datei.name, err);
      }
      this.uploading = { fertig: this.uploading.fertig + 1, gesamt: liste.length };
    }

    this.uploading = null;
    if (gescheitert > 0) {
      this.notify(
        gescheitert === liste.length
          ? 'Kein Bild konnte hochgeladen werden.'
          : `${gescheitert} von ${liste.length} Bildern konnten nicht hochgeladen werden.`,
      );
    }
    await this.loadTiles();
  }

  private async bildLoeschen(id: string): Promise<void> {
    this.confirmDelete = '';
    try {
      await deletePhoto(this.hass, id);
      this.tiles = this.tiles.filter((kachel) => kachel.id !== id);
    } catch (err) {
      console.error('Family Settings: Löschen fehlgeschlagen', err);
      this.notify('Das Bild konnte nicht gelöscht werden.');
    }
  }

  private async savePhotos(patch: Partial<PhotoSettings>): Promise<void> {
    // Sofort anzeigen, damit der Schalter nicht nachhinkt; das Abonnement
    // liefert gleich darauf den bestaetigten Stand.
    this.settings = { ...this.settings, photos: { ...this.settings.photos, ...patch } };
    try {
      await patchSettings(this.hass, { photos: patch });
      if (patch.folder !== undefined) await this.loadTiles();
    } catch (err) {
      console.error('Family Settings: Speichern fehlgeschlagen', err);
      this.notify('Die Einstellung konnte nicht gespeichert werden.');
    }
  }

  // -------------------------------------------------------------- Helfer

  private navigate(path: string): void {
    history.pushState(null, '', path);
    window.dispatchEvent(new Event('location-changed'));
  }

  private notify(message: string): void {
    this.message = message;
    if (this.hinweisTimer) clearTimeout(this.hinweisTimer);
    this.hinweisTimer = window.setTimeout(() => (this.message = ''), HINWEIS_MS);
  }

  static styles = settingsStyles;
}

declare global {
  interface HTMLElementTagNameMap {
    'family-settings': FamilySettings;
  }
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: 'family-settings',
  name: 'Family Settings',
  description: 'Einstellungen der Family-Calendar-App: Bilder, Bilderrahmen und Stand.',
  preview: false,
});
