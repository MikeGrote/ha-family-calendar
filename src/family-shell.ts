import type { HomeAssistant } from 'custom-card-helpers';
import { LitElement, html, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { browserId } from './lib/browser-id';
import { FullscreenArea } from './lib/fullscreen-area';
import { type EffectivePanel, effectivePanel } from './lib/effective-config';
import { type AppSettings, subscribeSettings } from './lib/settings-api';
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
  /** Nimmt dieser Bildschirm an der geteilten Bereichswahl teil? */
  private gekoppelt = false;
  private panel: EffectivePanel = { initial: '' };
  /** Sobald jemand selbst umgeschaltet hat, wird der eingestellte
   *  Startbereich nicht mehr nachtraeglich angewendet. */
  private selbstGewaehlt = false;
  /** Zuletzt gesehener Stand des Auswahlhelfers. */
  private letzterHelferStand = '';
  private unsubscribeSettings?: () => void;
  private idleTimer?: number;
  private previousId = '';
  private readonly onActivity = (): void => this.noteActivity();
  private readonly vollbild = new FullscreenArea(
    () => this.panel.fullscreen ?? this.config?.fullscreen,
    () => this.activeId,
    (id) => (id ? this.renderRoot.querySelector<HTMLElement>(`.area[data-area="${id}"]`) : null),
  );

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
    this.vollbild.restart();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    for (const typ of ['pointerdown', 'keydown', 'wheel']) {
      window.removeEventListener(typ, this.onActivity);
    }
    if (this.idleTimer !== undefined) clearTimeout(this.idleTimer);
    this.vollbild.dispose();
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
      // Damit zwei Aufgabenkarten im Speicher auseinandergehalten werden.
      (element as { settingsKey?: string }).settingsKey = area.id;
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

  /** Folgt dem Auswahlhelfer, damit Automationen umschalten koennen.
   *
   * Nur gekoppelte Bildschirme folgen ueberhaupt - und auch die nur auf
   * *Aenderungen* des Helfers, nicht auf seinen Stand. Wuerde dem Stand
   * gefolgt, zoege es einen Bildschirm nach jedem eigenen Klick sofort
   * wieder zurueck, und er liesse sich nicht mehr bedienen.
   */
  private followSyncEntity(): void {
    const entityId = this.config.syncEntity;
    if (!entityId || !this.gekoppelt) return;

    const gewuenscht = this.hass?.states[entityId]?.state;
    if (!gewuenscht || gewuenscht === this.letzterHelferStand) return;
    this.letzterHelferStand = gewuenscht;

    if (gewuenscht === this.activeId) return;
    if (!this.config.areas.some((area) => area.id === gewuenscht && !area.path)) return;

    this.switchTo(gewuenscht);
  }

  render(): TemplateResult {
    return html`
      <div class="shell">
        ${renderNav({
          items: this.config.areas,
          isActive: (item) => item.id === this.activeId && !this.pathOf(item.id),
          exits: this.config.exits ?? [],
          onSelect: (item) => this.select(item.id),
          onExit: (path) => this.leave(path),
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
      this.unsubscribeSettings = await subscribeSettings(this.hass, (settings) =>
        this.applySettings(settings),
      );
    } catch (err) {
      // Ohne Integration bleibt es beim bisherigen Verhalten.
      console.warn('Family Shell: Einstellungen nicht erreichbar', err);
    }
  }

  /** Uebernimmt die Einstellungen des Panels. */
  private applySettings(settings: AppSettings): void {
    this.gekoppelt = settings.panel.syncedBrowsers.includes(browserId());
    this.panel = effectivePanel(this.config, settings.panel);

    // Der Startbereich gilt beim Laden. Wer schon umgeschaltet hat, soll
    // nicht mitten im Blick zurueckgeworfen werden.
    if (!this.selbstGewaehlt && this.panel.initial && this.panel.initial !== this.activeId) {
      this.switchTo(this.panel.initial);
    }

    this.restartIdleTimer();
    this.vollbild.restart();
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
      this.navigate(area.path);
      return;
    }

    if (id === this.activeId) return;
    this.selbstGewaehlt = true;
    this.switchTo(id);
    this.reportToSyncEntity(id);
  }

  /** Wechselt innerhalb von Home Assistant, ohne die Seite neu zu laden. */
  private navigate(path: string): void {
    history.pushState(null, '', path);
    window.dispatchEvent(new CustomEvent('location-changed', { bubbles: true, composed: true }));
  }

  /** Verlaesst die App wirklich - mit vollem Seitenaufbau.
   *
   * Ein Wechsel nur der Route reicht hier nicht: Der Kioskmodus hat die
   * Seitenleiste von Home Assistant ausgeblendet und blendet sie beim
   * seiteninternen Wechsel nicht wieder ein. Man landet dann in den
   * Einstellungen ohne jede Navigation - und ohne Browserleiste, die am
   * Panel fehlt, auch ohne Weg zurueck. Ein echtes Neuladen laesst den
   * Kioskmodus hinter sich, weil er nur fuer dieses Dashboard gilt.
   */
  private leave(path: string): void {
    location.href = path;
  }

  private switchTo(id: string): void {
    if (id === this.activeId) return;
    if (this.vollbild.expanded) this.vollbild.collapse();
    this.previousId = this.activeId;
    this.activeId = id;
    this.vollbild.restart();

    // Ein verborgener Bereich hat keine Breite. Karten, die ihr Layout
    // selbst berechnen - etwa das Wochenraster - brauchen nach dem
    // Einblenden einen Anstoss.
    window.setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
  }

  /** Schreibt den Bereich in den Auswahlhelfer zurueck.
   *
   * Nur, wenn dieser Bildschirm gekoppelt ist. Der Helfer ist eine einzige
   * globale Entitaet: Ohne diese Einschraenkung zieht ein Klick auf
   * irgendeinem Geraet alle anderen mit. Gekoppelt wird im
   * Einstellungsbereich, an dem Geraet, das mitmachen soll.
   */
  private reportToSyncEntity(id: string): void {
    const entityId = this.config.syncEntity;
    if (!entityId || !this.gekoppelt || this.hass?.states[entityId]?.state === id) return;

    void this.hass?.callService('input_select', 'select_option', {
      entity_id: entityId,
      option: id,
    });
  }

  /** Eine Bedienung holt aus dem Ruhezustand zurueck. */
  private noteActivity(): void {
    // Ist der Bereich gewachsen, gilt diese Beruehrung dem Verkleinern und
    // sonst nichts. Sie soll nicht zugleich den Bereich wechseln - sonst
    // waere die Bewegung umsonst und man landet ungewollt woanders.
    if (this.vollbild.expanded) {
      this.vollbild.collapse();
      this.restartIdleTimer();
      this.vollbild.restart();
      return;
    }

    const idle = this.panel.idle ?? this.config.idle;
    if (idle && this.activeId === idle.area) {
      const ziel = idle.returnTo ?? this.previousId;
      if (ziel && ziel !== idle.area) {
        this.switchTo(ziel);
        this.reportToSyncEntity(ziel);
      }
    }
    this.restartIdleTimer();
    this.vollbild.restart();
  }

  private restartIdleTimer(): void {
    if (this.idleTimer !== undefined) clearTimeout(this.idleTimer);

    const idle = this.panel.idle ?? this.config?.idle;
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
