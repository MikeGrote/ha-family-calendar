import type { HomeAssistant } from 'custom-card-helpers';
import { LitElement, html, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { browserId } from './lib/browser-id';
import { flipTransform, prefersReducedMotion } from './lib/fullscreen-flip';
import { subscribeSettings } from './lib/settings-api';
import { navStyles } from './styles/nav';
import { shellStyles } from './styles/shell';
import { renderNav } from './templates/nav';
import type { ShellArea, ShellConfig } from './types';

/** Hinaus etwas gemaechlich, damit man es als Bewegung wahrnimmt. */
const GROW_MS = 560;
const GROW_CURVE = 'cubic-bezier(0.16, 1, 0.3, 1)';

/** Zurueck deutlich schneller: Wer das Panel beruehrt, will etwas tun und
 *  soll nicht auf eine Animation warten. */
const SHRINK_MS = 200;
const SHRINK_CURVE = 'cubic-bezier(0.4, 0, 1, 1)';

/** Huelle mit Seitenleiste, die alle Bereiche geladen haelt.
 *
 * Home Assistant baut beim Wechsel zwischen Ansichten alles neu auf. Bei
 * einer Kalenderkarte heisst das: Raster neu aufbauen, alle Kalender neu
 * abfragen, kurzes Flackern. Hier bleiben die Bereiche stattdessen im DOM
 * und werden nur aus- und eingeblendet - dasselbe Muster, das Vue
 * keep-alive nennt.
 *
 * Iframes waeren der andere Weg, kosten aber je Bereich ein vollstaendiges
 * Home-Assistant-Frontend samt eigener Verbindung.
 */

/** Karte, wie Home Assistant sie ueber die Hilfsfunktionen liefert. */
interface LovelaceCardElement extends HTMLElement {
  hass?: unknown;
}

interface CardHelpers {
  createCardElement: (config: Record<string, unknown>) => LovelaceCardElement;
}

declare global {
  interface Window {
    loadCardHelpers?: () => Promise<CardHelpers>;
  }
}

@customElement('family-shell')
export class FamilyShell extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: ShellConfig;
  @property({ type: Boolean, reflect: true }) compact = false;

  @state() private activeId = '';
  @state() private ready = false;

  private readonly cards = new Map<string, LovelaceCardElement>();
  /** Geraet, das den Bereich zurueckmelden darf. Leer: alle duerfen. */
  private leadBrowser = '';
  private unsubscribeSettings?: () => void;
  private idleTimer?: number;
  private previousId = '';
  private readonly onActivity = (): void => this.noteActivity();
  private expandTimer?: number;
  private expanded = false;

  setConfig(config: ShellConfig): void {
    if (!config.areas?.length) {
      throw new Error('Bitte mindestens einen Bereich angeben!');
    }
    this.config = config;
    this.compact = config.compact ?? false;
    this.activeId = config.initial ?? config.areas.find((a) => !a.disabled)?.id ?? '';
  }

  getCardSize(): number {
    return 12;
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Beobachtet wird auf dem Fenster, nicht auf der Karte: Ein Tipp irgendwo
    // im Panel gilt als Bedienung, nicht nur einer in der Seitenleiste.
    for (const typ of ['pointerdown', 'keydown', 'wheel']) {
      window.addEventListener(typ, this.onActivity, { passive: true });
    }
    this.restartIdleTimer();
    this.restartExpandTimer();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    for (const typ of ['pointerdown', 'keydown', 'wheel']) {
      window.removeEventListener(typ, this.onActivity);
    }
    if (this.idleTimer !== undefined) clearTimeout(this.idleTimer);
    if (this.expandTimer !== undefined) clearTimeout(this.expandTimer);
    this.unsubscribeSettings?.();
    this.unsubscribeSettings = undefined;
  }

  firstUpdated(): void {
    void this.buildAreas();
    void this.watchLead();
  }

  /** Legt die Karten der Bereiche einmalig an. */
  private async buildAreas(): Promise<void> {
    const helpers = await window.loadCardHelpers?.();
    if (!helpers) {
      console.error('Family Shell: Kartenhilfen von Home Assistant nicht verfügbar');
      return;
    }

    for (const area of this.config.areas) {
      if (!area.card) continue;
      const element = helpers.createCardElement(area.card);
      element.hass = this.hass;
      this.cards.set(area.id, element);
    }
    this.ready = true;
  }

  updated(changed: PropertyValues): void {
    if (!changed.has('hass')) return;

    // Auch die verborgenen Bereiche bleiben auf Stand - sonst waeren sie
    // beim Einblenden veraltet und muessten doch nachladen.
    for (const element of this.cards.values()) {
      element.hass = this.hass;
    }

    this.followSyncEntity();
  }

  /** Folgt dem Auswahlhelfer, damit Automationen umschalten koennen. */
  private followSyncEntity(): void {
    const entityId = this.config.syncEntity;
    if (!entityId) return;

    const gewuenscht = this.hass?.states[entityId]?.state;
    if (!gewuenscht || gewuenscht === this.activeId) return;
    if (!this.config.areas.some((area) => area.id === gewuenscht && !area.path)) return;

    this.switchTo(gewuenscht);
  }

  render(): TemplateResult {
    return html`
      <div class="shell">
        ${renderNav({
          items: this.config.areas,
          isActive: (item) => item.id === this.activeId && !this.pathOf(item.id),
          onSelect: (item) => this.select(item.id),
          onReload: () => location.reload(),
        })}
        <div class="content">
          ${this.ready ? this.config.areas.map((area) => this.renderArea(area)) : ''}
        </div>
      </div>
    `;
  }

  /** Beobachtet, welches Geraet die Bereichswahl fuehren soll. */
  private async watchLead(): Promise<void> {
    try {
      this.unsubscribeSettings = await subscribeSettings(this.hass, (settings) => {
        this.leadBrowser = settings.panel?.leadBrowser ?? '';
      });
    } catch (err) {
      // Ohne Integration bleibt es beim bisherigen Verhalten.
      console.warn('Family Shell: Einstellungen nicht erreichbar', err);
    }
  }

  private pathOf(id: string): string | undefined {
    return this.config.areas.find((area) => area.id === id)?.path;
  }

  private renderArea(area: ShellArea): TemplateResult {
    if (area.path) return html``;

    const element = this.cards.get(area.id);
    const hidden = area.id !== this.activeId;

    if (!element) {
      return hidden
        ? html``
        : html`<div class="placeholder">Dieser Bereich ist noch nicht eingerichtet.</div>`;
    }

    return html`<div class="area" data-area=${area.id} ?hidden=${hidden}>${element}</div>`;
  }

  private select(id: string): void {
    const area = this.config.areas.find((a) => a.id === id);
    if (!area) return;

    // Ziele ausserhalb des Panels - etwa die Einstellungen von Home
    // Assistant - lassen sich nicht einblenden, dorthin wird gewechselt.
    if (area.path) {
      history.pushState(null, '', area.path);
      window.dispatchEvent(new CustomEvent('location-changed', { bubbles: true, composed: true }));
      return;
    }

    if (id === this.activeId) return;
    this.switchTo(id);
    this.reportToSyncEntity(id);
  }

  private switchTo(id: string): void {
    if (id === this.activeId) return;
    if (this.expanded) this.collapse();
    this.previousId = this.activeId;
    this.activeId = id;
    this.restartExpandTimer();

    // Ein verborgener Bereich hat keine Breite. Karten, die ihr Layout
    // selbst berechnen - etwa das Wochenraster - brauchen nach dem
    // Einblenden einen Anstoss.
    window.setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
  }

  /** Schreibt den Bereich in den Auswahlhelfer zurueck.
   *
   * Nur, wenn dieses Geraet die Fuehrung hat. Der Helfer ist eine einzige
   * globale Entitaet: Ohne diese Einschraenkung zieht ein Klick auf
   * irgendeinem Bildschirm alle anderen mit. Gesetzt wird die Fuehrung im
   * Einstellungsbereich, an dem Geraet, das fuehren soll.
   */
  private reportToSyncEntity(id: string): void {
    const entityId = this.config.syncEntity;
    if (!entityId || !this.darfMelden() || this.hass?.states[entityId]?.state === id) return;

    void this.hass?.callService('input_select', 'select_option', {
      entity_id: entityId,
      option: id,
    });
  }

  // ------------------------------------------------------- Auf den Schirm

  /** Zeitgeber neu stellen, nach dem der Bereich waechst. */
  private restartExpandTimer(): void {
    if (this.expandTimer !== undefined) clearTimeout(this.expandTimer);

    const gross = this.config?.fullscreen;
    if (!gross?.after || !gross.area) return;

    this.expandTimer = window.setTimeout(() => {
      if (this.activeId === gross.area) this.expand();
    }, gross.after * 1000);
  }

  private areaElement(id: string): HTMLElement | null {
    if (!id) return null;
    return this.renderRoot.querySelector<HTMLElement>(`.area[data-area="${id}"]`);
  }

  /** Waechst auf den ganzen Bildschirm.
   *
   * Der Bereich springt sofort auf Vollbild und wird per transform dorthin
   * zurueckgelegt, wo er herkam; animiert wird nur der transform. Die
   * Groesse selbst zu animieren hiesse, bei jedem Einzelbild neu zu
   * rechnen - auf einem Wandpanel sichtbar ruckelig.
   */
  private expand(): void {
    const el = this.areaElement(this.config?.fullscreen?.area ?? '');
    if (!el || this.expanded) return;

    this.expanded = true;
    const vorher = el.getBoundingClientRect();
    el.classList.add('area--fullscreen');

    if (prefersReducedMotion()) return;

    const nachher = el.getBoundingClientRect();
    el.style.transition = 'none';
    el.style.transform = flipTransform(vorher, nachher);
    // Erzwingt die Neuberechnung: Ohne sie fasst der Browser das Setzen und
    // das Zuruecknehmen zu einem Schritt zusammen und es gibt keine Bewegung.
    void el.offsetWidth;

    el.style.transition = `transform ${GROW_MS}ms ${GROW_CURVE}`;
    el.style.transform = '';
    this.nachDerBewegung(el, GROW_MS, () => {
      el.style.transition = '';
    });
  }

  /** Zurueck in die Seitenleiste - deutlich schneller als hinaus. */
  private collapse(): void {
    const el = this.areaElement(this.config?.fullscreen?.area ?? '');
    if (!el || !this.expanded) return;

    this.expanded = false;

    const aufraeumen = (): void => {
      el.classList.remove('area--fullscreen');
      el.style.transition = '';
      el.style.transform = '';
    };

    if (prefersReducedMotion()) {
      aufraeumen();
      return;
    }

    const vollbild = el.getBoundingClientRect();
    // Kurz herausnehmen, um das Ziel zu messen, und sofort zurueck: Der
    // Browser zeichnet dazwischen nicht.
    el.classList.remove('area--fullscreen');
    const ziel = el.getBoundingClientRect();
    el.classList.add('area--fullscreen');

    el.style.transition = 'none';
    el.style.transform = '';
    void el.offsetWidth;

    el.style.transition = `transform ${SHRINK_MS}ms ${SHRINK_CURVE}`;
    el.style.transform = flipTransform(ziel, vollbild);
    this.nachDerBewegung(el, SHRINK_MS, aufraeumen);
  }

  /** Ruft auf, wenn die Bewegung fertig ist - notfalls per Zeitgeber.
   *
   * transitionend bleibt aus, wenn der Bildschirm zwischendurch in den
   * Hintergrund geraet. Ohne Netz haenge der Bereich dann fuer immer im
   * Vollbild fest.
   */
  private nachDerBewegung(el: HTMLElement, dauer: number, fertig: () => void): void {
    let erledigt = false;
    const einmal = (): void => {
      if (erledigt) return;
      erledigt = true;
      fertig();
    };
    el.addEventListener('transitionend', einmal, { once: true });
    window.setTimeout(einmal, dauer + 150);
  }

  /** Fuehrt dieses Geraet die Bereichswahl?
   *
   * Ohne festgelegtes Geraet melden alle zurueck - so war es vorher, und so
   * bleibt es, solange niemand etwas einstellt. Ist eines festgelegt, dessen
   * Kennung sich hier aber nicht ermitteln laesst, schweigt dieser Browser
   * lieber: Ein stummer Bildschirm ist harmloser als einer, der ungefragt
   * alle anderen umschaltet.
   */
  private darfMelden(): boolean {
    if (!this.leadBrowser) return true;
    return browserId() === this.leadBrowser;
  }

  /** Eine Bedienung holt aus dem Ruhezustand zurueck. */
  private noteActivity(): void {
    // Ist der Bereich gewachsen, gilt diese Beruehrung dem Verkleinern und
    // sonst nichts. Sie soll nicht zugleich den Bereich wechseln - sonst
    // waere die Bewegung umsonst und man landet ungewollt woanders.
    if (this.expanded) {
      this.collapse();
      this.restartIdleTimer();
      this.restartExpandTimer();
      return;
    }

    const idle = this.config.idle;
    if (idle && this.activeId === idle.area) {
      const ziel = idle.returnTo ?? this.previousId;
      if (ziel && ziel !== idle.area) {
        this.switchTo(ziel);
        this.reportToSyncEntity(ziel);
      }
    }
    this.restartIdleTimer();
    this.restartExpandTimer();
  }

  private restartIdleTimer(): void {
    if (this.idleTimer !== undefined) clearTimeout(this.idleTimer);

    const idle = this.config?.idle;
    if (!idle?.after || !idle.area) return;

    this.idleTimer = window.setTimeout(() => {
      if (this.activeId === idle.area) return;
      this.switchTo(idle.area);
      this.reportToSyncEntity(idle.area);
    }, idle.after * 1000);
  }

  static styles = [shellStyles, navStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    'family-shell': FamilyShell;
  }
  interface Window {
    customCards?: {
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }[];
  }
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: 'family-shell',
  name: 'Family Shell',
  description: 'Seitenleiste mit Bereichen, die beim Wechseln geladen bleiben.',
  preview: false,
});
