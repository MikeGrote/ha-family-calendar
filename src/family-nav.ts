import { LitElement, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { navStyles } from './styles/nav';
import { renderNav } from './templates/nav';
import type { NavConfig, NavItem } from './types';

/** Seitenleiste zum Wechseln zwischen den Bereichen des Panels.
 *
 * Home Assistant blendet im Kiosk-Modus seine eigene Navigation aus. Diese
 * Karte tritt an ihre Stelle: Sie kennt nur Ziele innerhalb des Dashboards
 * und hebt den Bereich hervor, in dem man gerade ist.
 */
@customElement('family-nav')
export class FamilyNav extends LitElement {
  @property({ attribute: false }) config!: NavConfig;
  @property({ type: Boolean, reflect: true }) compact = false;

  @state() private currentPath = window.location.pathname;

  private readonly onLocationChanged = (): void => {
    this.currentPath = window.location.pathname;
  };

  setConfig(config: NavConfig): void {
    if (!config.items?.length) {
      throw new Error('Bitte mindestens einen Eintrag angeben!');
    }
    this.config = config;
    this.compact = config.compact ?? false;
  }

  getCardSize(): number {
    return 1;
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Beide Ereignisse noetig: location-changed feuert bei Wechseln aus
    // Lovelace heraus, popstate beim Zurueck-Knopf des Browsers.
    window.addEventListener('location-changed', this.onLocationChanged);
    window.addEventListener('popstate', this.onLocationChanged);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('location-changed', this.onLocationChanged);
    window.removeEventListener('popstate', this.onLocationChanged);
  }

  render(): TemplateResult {
    return renderNav({
      items: this.config.items,
      isActive: (item) => this.isActive(item),
      onSelect: (item) => this.select(item),
    });
  }

  private isActive(item: NavItem): boolean {
    if (item.disabled) return false;
    return this.currentPath === item.path;
  }

  private select(item: NavItem): void {
    if (item.disabled || this.currentPath === item.path) return;
    history.pushState(null, '', item.path);
    window.dispatchEvent(new CustomEvent('location-changed', { bubbles: true, composed: true }));
    this.currentPath = item.path;
  }

  static styles = navStyles;
}

declare global {
  interface HTMLElementTagNameMap {
    'family-nav': FamilyNav;
  }
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: 'family-nav',
  name: 'Family Navigation',
  description: 'Seitenleiste zum Wechseln zwischen den Bereichen des Familien-Dashboards.',
  preview: false,
});
