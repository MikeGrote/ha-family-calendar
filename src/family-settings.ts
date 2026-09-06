import type { HomeAssistant } from 'custom-card-helpers';
import { LitElement, type TemplateResult, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { browserId } from './lib/browser-id';
import { calendarContext, taskContexts } from './lib/settings-context';
import {
  type AreaInfo,
  type TaskCardInfo,
  dashboardPath,
  findAreas,
  findCalendarConfig,
  findTaskCards,
} from './lib/settings-discovery';
import { PhotoLibrary } from './lib/photo-library';
import {
  type AppSettings,
  DEFAULT_SETTINGS,
  type PanelSettings,
  type PhotoSettings,
  type SettingsPatch,
  patchSettings,
  subscribeSettings,
} from './lib/settings-api';
import { settingsStyles } from './styles/settings';
import { type SettingsSection, renderComingSoon, renderSettingsFrame } from './templates/settings';
import { renderInfo } from './templates/settings-info';
import { renderCalendarSettings } from './templates/settings-calendars';
import type { EntityChoice } from './templates/settings-entities';
import { renderPanelSettings } from './templates/settings-panel';
import { renderTaskSettings } from './templates/settings-tasks';
import { renderPhotoSettings } from './templates/settings-photos';
import type { SettingsConfig } from './types';

/** Einstellungen der App.
 *
 * Ein eigener Bereich fuer die Parameter der App - nicht fuer die von Home
 * Assistant. Was HA schon fuehrt, etwa die Zeitzone, wird hier gezeigt und
 * nicht ein zweites Mal gesetzt.
 */

const SECTIONS: SettingsSection[] = [
  { id: 'fotos', icon: 'mdi:image-multiple', name: 'Fotos', ready: true },
  { id: 'kalender', icon: 'mdi:calendar-month', name: 'Kalender', ready: true },
  { id: 'aufgaben', icon: 'mdi:checkbox-marked-outline', name: 'Aufgaben', ready: true },
  { id: 'panel', icon: 'mdi:tablet-dashboard', name: 'Panel', ready: true },
  { id: 'info', icon: 'mdi:information-outline', name: 'Über', ready: true },
];

const HINWEIS_MS = 6000;

@customElement('family-settings')
export class FamilySettings extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: SettingsConfig;

  @state() private settings: AppSettings = DEFAULT_SETTINGS;
  @state() private section = 'fotos';
  @state() private confirmDelete = '';
  @state() private message = '';
  @state() private appVersion = '';
  @state() private taskCards: TaskCardInfo[] = [];
  @state() private areas: AreaInfo[] = [];
  @state() private dashboardFehler = '';

  private kalenderImDashboard: { entities: string[]; colors: Record<string, string> } = {
    entities: [],
    colors: {},
  };

  @query('#dateiwahl') private fileInput?: HTMLInputElement;

  private readonly bilder = new PhotoLibrary(
    () => this.requestUpdate(),
    (message) => this.notify(message),
  );
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

    if (this.section === 'panel') {
      return renderPanelSettings({
        settings: this.settings.panel,
        eigeneId: browserId(),
        areas: this.areas,
        gekoppelt: this.settings.panel.syncedBrowsers.includes(browserId()),
        anzahlGekoppelt: this.settings.panel.syncedBrowsers.length,
        onKopplung: (an) => void this.savePanel({ syncedBrowsers: this.kopplung(an) }),
        onChange: (patch) => void this.savePanel(patch),
      });
    }

    if (this.section === 'kalender') {
      return renderCalendarSettings(
        calendarContext(this.settings, this.kalenderImDashboard, this.deps('calendar')),
      );
    }

    if (this.section === 'aufgaben') {
      return renderTaskSettings({
        sets: taskContexts(this.settings, this.taskCards, this.deps('todo')),
        fehler: this.dashboardFehler,
      });
    }

    if (this.section !== 'fotos') {
      return renderComingSoon(SECTIONS.find((s) => s.id === this.section)?.name ?? 'Der Bereich');
    }

    return renderPhotoSettings({
      settings: this.settings.photos,
      tiles: this.bilder.tiles,
      uploading: this.bilder.uploading,
      confirmDelete: this.confirmDelete,
      loading: this.bilder.loading,
      onPick: () => this.fileInput?.click(),
      onFiles: (files) => void this.bilder.upload(this.hass, this.folder, files),
      onAskDelete: (id) => (this.confirmDelete = id),
      onCancelDelete: () => (this.confirmDelete = ''),
      onDelete: (id) => {
        this.confirmDelete = '';
        void this.bilder.remove(this.hass, id);
      },
      onChange: (patch) => void this.savePhotos(patch),
    });
  }

  // ---------------------------------------------------------------- Daten

  private async start(): Promise<void> {
    try {
      this.unsubscribe = await subscribeSettings(this.hass, (settings) => {
        const ordnerNeu = settings.photos.folder !== this.settings.photos.folder;
        this.settings = settings;
        if (ordnerNeu) void this.bilder.reload(this.hass, this.folder);
      });
    } catch (err) {
      console.error('Family Settings: Einstellungen nicht erreichbar', err);
      this.notify('Einstellungen konnten nicht geladen werden.');
    }

    void this.loadVersion();
    void this.loadDashboard();
    await this.bilder.reload(this.hass, this.folder);
  }

  /** Was die Abschnitte zum Bauen ihrer Kontexte brauchen. */
  private deps(domain: 'calendar' | 'todo') {
    return {
      nameOf: (entityId: string) =>
        this.hass?.states[entityId]?.attributes.friendly_name ?? entityId,
      choices: this.entityChoices(domain),
      patch: (patch: SettingsPatch) => void this.save(patch),
    };
  }

  /** Alle Entitäten einer Domäne, alphabetisch. */
  private entityChoices(domain: string): EntityChoice[] {
    return Object.keys(this.hass?.states ?? {})
      .filter((id) => id.startsWith(`${domain}.`))
      .map((id) => ({
        entityId: id,
        name: this.hass.states[id].attributes.friendly_name ?? id,
      }))
      .sort((a, b) => a.name.localeCompare(b.name, 'de'));
  }

  /** Liest, welche Karten dieses Panel hat.
   *
   * Nur lesend: Die Einstellungen selbst liegen in der Integration, nicht
   * in der Dashboard-Konfiguration.
   */
  private async loadDashboard(): Promise<void> {
    try {
      const config = await this.hass.callWS({
        type: 'lovelace/config',
        url_path: dashboardPath(location.pathname),
      });
      this.taskCards = findTaskCards(config);
      this.areas = findAreas(config);
      this.kalenderImDashboard = findCalendarConfig(config);
      this.dashboardFehler = '';
    } catch (err) {
      console.error('Family Settings: Dashboard nicht lesbar', err);
      this.dashboardFehler =
        'Die Aufteilung des Panels ließ sich nicht lesen. Ohne sie ist nicht bekannt, welche Karten es gibt.';
    }
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

  /** Diesen Bildschirm in die Kopplung aufnehmen oder herausnehmen. */
  private kopplung(an: boolean): string[] {
    const eigene = browserId();
    const andere = this.settings.panel.syncedBrowsers.filter((id) => id !== eigene);
    return an && eigene ? [...andere, eigene] : andere;
  }

  private async savePanel(patch: Partial<PanelSettings>): Promise<void> {
    this.settings = { ...this.settings, panel: { ...this.settings.panel, ...patch } };
    await this.save({ panel: patch });
  }

  /** Einen Ausschnitt schreiben; das Abonnement liefert den neuen Stand. */
  private async save(patch: SettingsPatch): Promise<void> {
    try {
      await patchSettings(this.hass, patch);
    } catch (err) {
      console.error('Family Settings: Speichern fehlgeschlagen', err);
      this.notify('Die Einstellung konnte nicht gespeichert werden.');
    }
  }

  private async savePhotos(patch: Partial<PhotoSettings>): Promise<void> {
    // Sofort anzeigen, damit der Schalter nicht nachhinkt; das Abonnement
    // liefert gleich darauf den bestaetigten Stand.
    this.settings = { ...this.settings, photos: { ...this.settings.photos, ...patch } };
    await this.save({ photos: patch });
    if (patch.folder !== undefined) await this.bilder.reload(this.hass, this.folder);
  }

  private get folder(): string {
    return this.settings.photos.folder;
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
