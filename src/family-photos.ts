import type { HomeAssistant } from 'custom-card-helpers';
import { LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { listImages, resolveImage } from './lib/media-source';
import { photosStyles } from './styles/photos';
import { renderPhotos } from './templates/photos';
import type { PhotosConfig } from './types';

/** Bilderrahmen fuer das Wandpanel.
 *
 * Die Bilder kommen aus einem Ordner der Medienablage, nicht aus der
 * Konfiguration: So erscheinen neue Fotos von selbst, ohne dass jemand eine
 * Liste pflegt.
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
    for (const timer of this.timers) clearInterval(timer);
    this.timers = [];
    this.started = false;
  }

  render(): TemplateResult {
    return renderPhotos({
      frontUrl: this.frontUrl,
      backUrl: this.backUrl,
      frontVisible: this.frontVisible,
      showClock: this.config?.showClock ?? true,
      now: this.now,
      hasImages: this.hasImages,
      folder: this.folder,
    });
  }

  private get folder(): string {
    return this.config?.folder ?? DEFAULT_FOLDER;
  }

  private async start(): Promise<void> {
    await this.rescan();
    await this.advance();

    const sekunden = (this.config?.interval ?? DEFAULT_INTERVAL_S) * 1000;
    const rescan = (this.config?.rescanMinutes ?? DEFAULT_RESCAN_MIN) * 60_000;

    this.timers.push(window.setInterval(() => void this.advance(), sekunden));
    this.timers.push(window.setInterval(() => void this.rescan(), rescan));
    this.timers.push(window.setInterval(() => (this.now = new Date()), CLOCK_TICK_MS));
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
