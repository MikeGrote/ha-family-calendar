import { html, type TemplateResult } from 'lit';

import type { NavItem } from '../types';

/** Markup der Seitenleiste. */

export interface NavContext {
  items: NavItem[];
  isActive: (item: NavItem) => boolean;
  onSelect: (item: NavItem) => void;
}

export function renderNav(ctx: NavContext): TemplateResult {
  return html`
    <ha-card>
      <nav>${ctx.items.map((item) => renderItem(item, ctx))}</nav>
    </ha-card>
  `;
}

function renderItem(item: NavItem, ctx: NavContext): TemplateResult {
  const active = ctx.isActive(item);
  const classes = [
    'item',
    active ? 'item--active' : '',
    item.disabled ? 'item--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return html`
    <button
      class=${classes}
      ?disabled=${item.disabled}
      aria-current=${active ? 'page' : 'false'}
      title=${item.name}
      @click=${() => ctx.onSelect(item)}
    >
      <ha-icon .icon=${item.icon}></ha-icon>
      <span class="label">${item.name}</span>
    </button>
  `;
}
