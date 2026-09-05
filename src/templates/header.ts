import { html, type TemplateResult } from 'lit';

import type { CardLink } from '../types';

/** Kopfzeile der Karte: Sprungziele, Filter, Anlegen, Kompaktmodus. */

export interface HeaderContext {
  links: CardLink[];
  entities: string[];
  activeCalendars: string[];
  isCompact: boolean;
  colorOf: (entityId: string) => string;
  nameOf: (entityId: string) => string;
  onNavigate: (path: string) => void;
  onToggleCalendar: (entityId: string) => void;
  onToggleCompact: () => void;
  onNewEvent: () => void;
}

export function renderHeader(ctx: HeaderContext): TemplateResult {
  return html`
    <div class="header">
      <div class="filters">
        ${ctx.links.map((link) => renderLink(link, ctx.onNavigate))}
        ${ctx.entities.map((entityId) => renderFilterChip(entityId, ctx))}
        <div style="flex: 1"></div>
        <button class="add-button" @click=${() => ctx.onNewEvent()}>
          <ha-icon icon="mdi:plus"></ha-icon>
          Termin
        </button>
        <button
          class="filter-chip ${ctx.isCompact ? 'active' : ''}"
          style="--chip-color: #666"
          @click=${() => ctx.onToggleCompact()}
        >
          <span class="dot"></span>
          Kompakt
        </button>
      </div>
    </div>
  `;
}

/** Kleine Symbolschaltflaeche, etwa zu einer anderen Ansicht. */
function renderLink(link: CardLink, onNavigate: (path: string) => void): TemplateResult {
  const label = link.name ?? link.path;
  return html`
    <button
      class="link-button"
      title=${label}
      aria-label=${label}
      @click=${() => onNavigate(link.path)}
    >
      <ha-icon .icon=${link.icon}></ha-icon>
    </button>
  `;
}

function renderFilterChip(entityId: string, ctx: HeaderContext): TemplateResult {
  const isActive = ctx.activeCalendars.includes(entityId);
  return html`
    <button
      class="filter-chip ${isActive ? 'active' : ''}"
      style="--chip-color: ${ctx.colorOf(entityId)}"
      @click=${() => ctx.onToggleCalendar(entityId)}
    >
      <span class="dot"></span>
      ${ctx.nameOf(entityId)}
    </button>
  `;
}
