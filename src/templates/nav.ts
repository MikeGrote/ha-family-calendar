import { html, type TemplateResult } from 'lit';

import type { CardLink, NavItem } from '../types';

/** Markup der Seitenleiste. */

export interface NavContext {
  items: NavItem[];
  /** Wege aus der App heraus - im Kioskmodus der einzige. */
  exits: CardLink[];
  isActive: (item: NavItem) => boolean;
  onSelect: (item: NavItem) => void;
  onExit: (path: string) => void;
  onReload: () => void;
}

export function renderNav(ctx: NavContext): TemplateResult {
  return html`
    <ha-card>
      <nav>${ctx.items.map((item) => renderItem(item, ctx))}</nav>
      <!-- Im Kioskmodus blendet Home Assistant Seitenleiste und Kopfzeile
           aus. Dann gibt es weder einen Weg zurueck in seine Oberflaeche noch
           eine Moeglichkeit, die Seite neu zu laden. Beides sitzt deshalb hier
           am Fuss, weit weg von den Bereichen: zu finden, wenn man es sucht,
           und schwer versehentlich zu treffen. -->
      <div class="fuss">
        ${ctx.exits.map(
          (ausgang) => html`
            <button
              class="fuss-knopf"
              title=${ausgang.name ?? 'Verlassen'}
              aria-label=${ausgang.name ?? 'Verlassen'}
              @click=${() => ctx.onExit(ausgang.path)}
            >
              <ha-icon .icon=${ausgang.icon}></ha-icon>
            </button>
          `,
        )}
        <button
          class="fuss-knopf fuss-knopf--laden"
          title="Seite neu laden"
          aria-label="Seite neu laden"
          @click=${() => ctx.onReload()}
        >
          <ha-icon icon="mdi:refresh"></ha-icon>
        </button>
      </div>
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
