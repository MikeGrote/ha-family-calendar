import type { HomeAssistant } from 'custom-card-helpers';
import { LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { type FaceRegion, fetchFaces, listImages, resolveImage } from './lib/media-source';
import {
  type Groesse,
  focalPoint,
  focusPosition,
  measureAspect,
  screenPoint,
} from './lib/photo-framing';
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
const LEER: Groesse = { width: 0, height: 0 };

@customElement('family-photos')
export class FamilyPhotos extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: PhotosConfig;

  @state() private frontUrl = '';
  @state() private backUrl = '';
  @state() private frontSize: Groesse | null = null;
  @state() private backSize: Groesse | null = null;
  @state() private frontFaces: FaceRegion[] = [];
  @state() private backFaces: FaceRegion[] = [];
  @state() private frontZoom = false;
  @state() private backZoom = false;
  @state() private frontVisible = true;
  @state() private hasImages = false;
  @state() private now = new Date();
  @state() private settings?: PhotoSettings;

  private unsubscribe?: () => void;
  private resizeObserver?: ResizeObserver;
  /** Gemessene Bildmasse je Medienkennung. Die Adresse wechselt bei jedem
   *  Aufloesen, das Bild dahinter nicht. */
  private readonly masse = new Map<string, Groesse>();
  /** Gesichter je Medienkennung. Die Integration liest sie aus der Datei;
   *  ein zweites Nachfragen zum selben Bild waere verschenkt. */
  private readonly gesichter = new Map<string, FaceRegion[]>();
  private rahmen: Groesse = { width: 0, height: 0 };
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
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    this.unsubscribe?.();
    this.unsubscribe = undefined;
    this.started = false;
  }

  render(): TemplateResult {
    return renderPhotos({
      frontUrl: this.frontUrl,
      frontPosition: focusPosition(this.frontSize ?? LEER, this.rahmen, this.frontFaces),
      frontOrigin: this.originVon(this.frontSize, this.frontFaces),
      frontZoom: this.frontZoom,
      backUrl: this.backUrl,
      backPosition: focusPosition(this.backSize ?? LEER, this.rahmen, this.backFaces),
      backOrigin: this.originVon(this.backSize, this.backFaces),
      backZoom: this.backZoom,
      zoomSeconds: this.intervalSeconds,
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
    this.beobachteRahmen();
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

  /** Der Ausschnitt haengt am Seitenverhaeltnis des Rahmens - und das
   *  aendert sich, wenn der Bereich auf den ganzen Bildschirm waechst. */
  private beobachteRahmen(): void {
    const karte = this.renderRoot.querySelector('ha-card');
    if (!karte || this.resizeObserver) return;

    this.resizeObserver = new ResizeObserver(([eintrag]) => {
      this.setzeRahmen(eintrag.contentRect);
    });
    this.resizeObserver.observe(karte);
    this.messeRahmen();
  }

  /** Misst selbst nach.
   *
   * Der Beobachter meldet nichts, solange die Seite im Hintergrund liegt.
   * Ohne diesen Nachschlag bliebe der Rahmen dann bei null, und der
   * Ausschnitt faende die Gesichter nicht.
   */
  private messeRahmen(): void {
    const karte = this.renderRoot.querySelector('ha-card');
    if (karte) this.setzeRahmen(karte.getBoundingClientRect());
  }

  private setzeRahmen(masse: { width: number; height: number }): void {
    const { width, height } = masse;
    if (!width || !height) return;
    if (Math.abs(width - this.rahmen.width) < 1 && Math.abs(height - this.rahmen.height) < 1) {
      return;
    }
    this.rahmen = { width, height };
    this.requestUpdate();
  }

  private stopTimers(): void {
    for (const timer of this.timers) clearInterval(timer);
    this.timers = [];
  }

  /** Ursprung der Bewegung: dort, wo die Koepfe im Rahmen landen. */
  private originVon(groesse: Groesse | null, faces: FaceRegion[]): string {
    const bild = groesse ?? LEER;
    const punkt = screenPoint(focalPoint(bild, this.rahmen, faces), bild, this.rahmen);
    return `${Math.round(punkt.x * 1000) / 10}% ${Math.round(punkt.y * 1000) / 10}%`;
  }

  /** Setzt die Bewegung in Gang - erst, nachdem die Ebene ohne sie stand.
   *
   * Ohne diesen Umweg fasst der Browser Zuruecksetzen und Setzen zu einem
   * Schritt zusammen, und es bewegt sich nichts.
   *
   * Bewusst ueber einen Zeitgeber und nicht ueber requestAnimationFrame:
   * Der feuert nicht, solange die Seite im Hintergrund liegt - etwa
   * nachts, wenn der Bildschirm aus ist. Die Bewegung bliebe dann fuer
   * immer aus, auch nachdem er wieder angeht.
   */
  private starteBewegung(): void {
    void this.updateComplete.then(() => {
      window.setTimeout(() => {
        if (this.frontVisible) this.frontZoom = true;
        else this.backZoom = true;
      }, 60);
    });
  }

  /** Gesichter eines Bildes, gefragt oder aus dem Gedaechtnis. */
  private async gesichterVon(kennung: string): Promise<FaceRegion[]> {
    const gemerkt = this.gesichter.get(kennung);
    if (gemerkt) return gemerkt;

    try {
      const gefunden = await fetchFaces(this.hass, kennung);
      this.gesichter.set(kennung, gefunden);
      return gefunden;
    } catch (err) {
      // Ohne Integration wird geschaetzt statt gescheitert.
      console.warn('Family Photos: Gesichter nicht abrufbar', err);
      return [];
    }
  }

  /** Masse eines Bildes, gemessen oder aus dem Gedaechtnis.
   *
   * Beim Messen laedt der Browser das Bild in seinen Zwischenspeicher; das
   * Anzeigen gleich darauf kostet dann nichts mehr.
   */
  private async groesseVon(kennung: string, url: string): Promise<Groesse | null> {
    const gemerkt = this.masse.get(kennung);
    if (gemerkt) return gemerkt;

    const gemessen = await measureAspect(url);
    if (gemessen) this.masse.set(kennung, gemessen);
    return gemessen;
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
    this.messeRahmen();

    this.index = (this.index + 1) % this.images.length;
    try {
      // Erst jetzt aufloesen: Die signierte URL laeuft ab, auf Vorrat
      // geholte Adressen waeren beim Anzeigen womoeglich schon ungueltig.
      const kennung = this.images[this.index];
      const url = await resolveImage(this.hass, kennung);
      const groesse = await this.groesseVon(kennung, url);
      const faces = await this.gesichterVon(kennung);

      if (this.frontVisible) {
        this.backUrl = url;
        this.backSize = groesse;
        this.backFaces = faces;
        this.backZoom = false;
      } else {
        this.frontUrl = url;
        this.frontSize = groesse;
        this.frontFaces = faces;
        this.frontZoom = false;
      }
      this.frontVisible = !this.frontVisible;
      this.now = new Date();
      this.starteBewegung();
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
