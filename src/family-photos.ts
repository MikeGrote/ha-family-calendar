import type { HomeAssistant } from 'custom-card-helpers';
import { LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { listImages, resolveImage } from './lib/media-source';
import { type PhotoSettings, subscribeSettings } from './lib/settings-api';
import { photosStyles } from './styles/photos';
import { renderPhotos } from './templates/photos';
import type { PhotosConfig } from './types';

/** Bilderrahmen fuer das Wandpanel.
 *
 * Die Bilder kommen aus einem Ordner der Medienablage, nicht aus der
 * Konfiguration: So erscheinen neue Fotos von selbst, ohne dass jemand eine
 * Liste pflegt.
 *
 * Die Einstellungen kommen aus dem Einstellungsbereich und gelten vor dem,
 * was im Dashboard steht. Zwei Orte fuer denselben Wert waeren einer zu
 * viel - der Eintrag im Dashboard bleibt nur als Rueckfall, falls die
 * Integration nicht antwortet.
 */
const DEFAULT_FOLDER = 'media-source://media_source/local/fotos';
const DEFAULT_INTERVAL_S = 30;
const DEFAULT_RESCAN_MIN = 60;
const CLOCK_TICK_MS = 20_000;

@customElement('family-photos')
export class FamilyPhotos extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: PhotosConfig;

  @state() private frontUrl = '';
  @state() private backUrl = '';
  @state() private frontVisible = true;
  @state() private hasImages = false;
  @state() private now = new Date();
  @state() private settings?: PhotoSettings;

  private unsubscribe?: () => void;
  private images: string[] = [];
  private index = -1;
  private timers: number[] = [];
  private started = false;

  setConfig(config: PhotosConfig): void {
    this.config = config;
  }

  getCardSize(): number {
    return 12;
  }

  updated(changed: PropertyValues): void {
    if (changed.has('hass') && this.hass && !this.started) {
      this.started = true;
      void this.start();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopTimers();
    this.unsubscribe?.();
    this.unsubscribe = undefined;
    this.started = false;
  }

  render(): TemplateResult {
    return renderPhotos({
      frontUrl: this.frontUrl,
      backUrl: this.backUrl,
      frontVisible: this.frontVisible,
      showClock: this.settings?.showClock ?? this.config?.showClock ?? true,
      now: this.now,
      hasImages: this.hasImages,
      folder: this.folder,
    });
  }

  private get folder(): string {
    return this.settings?.folder ?? this.config?.folder ?? DEFAULT_FOLDER;
  }

  private get intervalSeconds(): number {
    return this.settings?.interval ?? this.config?.interval ?? DEFAULT_INTERVAL_S;
  }

  private get rescanMinutes(): number {
    return this.settings?.rescanMinutes ?? this.config?.rescanMinutes ?? DEFAULT_RESCAN_MIN;
  }

  private async start(): Promise<void> {
    try {
      this.unsubscribe = await subscribeSettings(this.hass, (settings) =>
        this.applySettings(settings.photos),
      );
    } catch (err) {
      // Ohne Integration gilt, was im Dashboard steht - der Rahmen laeuft.
      console.warn('Family Photos: Einstellungen nicht erreichbar', err);
    }

    await this.rescan();
    await this.advance();
    this.startTimers();
  }

  /** Neue Einstellungen uebernehmen, ohne den Rahmen anzuhalten. */
  private applySettings(photos: PhotoSettings): void {
    const alterOrdner = this.folder;
    this.settings = photos;

    if (this.folder !== alterOrdner) {
      this.index = -1;
      void this.rescan().then(() => this.advance());
    }
    this.startTimers();
  }

  private startTimers(): void {
    this.stopTimers();
    this.timers.push(
      window.setInterval(() => void this.advance(), this.intervalSeconds * 1000),
      window.setInterval(() => void this.rescan(), this.rescanMinutes * 60_000),
      window.setInterval(() => (this.now = new Date()), CLOCK_TICK_MS),
    );
  }

  private stopTimers(): void {
    for (const timer of this.timers) clearInterval(timer);
    this.timers = [];
  }

  /** Ordner neu einlesen, damit neue Bilder auftauchen. */
  private async rescan(): Promise<void> {
    try {
      this.images = await listImages(this.hass, this.folder);
      this.hasImages = this.images.length > 0;
    } catch (err) {
      console.error('Family Photos: Ordner nicht lesbar', this.folder, err);
      this.hasImages = false;
    }
  }

  /** Naechstes Bild einblenden. */
  private async advance(): Promise<void> {
    if (this.images.length === 0) return;

    this.index = (this.index + 1) % this.images.length;
    try {
      // Erst jetzt aufloesen: Die signierte URL laeuft ab, auf Vorrat
      // geholte Adressen waeren beim Anzeigen womoeglich schon ungueltig.
      const url = await resolveImage(this.hass, this.images[this.index]);
      if (this.frontVisible) {
        this.backUrl = url;
      } else {
        this.frontUrl = url;
      }
      this.frontVisible = !this.frontVisible;
      this.now = new Date();
    } catch (err) {
      console.error('Family Photos: Bild nicht abrufbar', err);
    }
  }

  static styles = photosStyles;
}

declare global {
  interface HTMLElementTagNameMap {
    'family-photos': FamilyPhotos;
  }
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: 'family-photos',
  name: 'Family Photos',
  description: 'Bilderrahmen mit Uhrzeit, gespeist aus einem Ordner der Medienablage.',
  preview: false,
});
