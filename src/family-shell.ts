import type { HomeAssistant } from 'custom-card-helpers';
import { LitElement, html, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { navStyles } from './styles/nav';
import { shellStyles } from './styles/shell';
import { renderNav } from './templates/nav';
import type { ShellArea, ShellConfig } from './types';

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
  private idleTimer?: number;
  private previousId = '';
  private readonly onActivity = (): void => this.noteActivity();

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
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    for (const typ of ['pointerdown', 'keydown', 'wheel']) {
      window.removeEventListener(typ, this.onActivity);
    }
    if (this.idleTimer !== undefined) clearTimeout(this.idleTimer);
  }

  firstUpdated(): void {
    void this.buildAreas();
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

    return html`<div class="area" ?hidden=${hidden}>${element}</div>`;
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
    this.previousId = this.activeId;
    this.activeId = id;

    // Ein verborgener Bereich hat keine Breite. Karten, die ihr Layout
    // selbst berechnen - etwa das Wochenraster - brauchen nach dem
    // Einblenden einen Anstoss.
    window.setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
  }

  /** Schreibt den Bereich in den Auswahlhelfer zurueck. */
  private reportToSyncEntity(id: string): void {
    const entityId = this.config.syncEntity;
    if (!entityId || this.hass?.states[entityId]?.state === id) return;

    void this.hass?.callService('input_select', 'select_option', {
      entity_id: entityId,
      option: id,
    });
  }

  /** Eine Bedienung holt aus dem Ruhezustand zurueck. */
  private noteActivity(): void {
    const idle = this.config.idle;
    if (idle && this.activeId === idle.area) {
      const ziel = idle.returnTo ?? this.previousId;
      if (ziel && ziel !== idle.area) {
        this.switchTo(ziel);
        this.reportToSyncEntity(ziel);
      }
    }
    this.restartIdleTimer();
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
