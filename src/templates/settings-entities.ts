import { type TemplateResult, html, nothing } from 'lit';

/** Eine geordnete Liste von Entitaeten bearbeiten.
 *
 * Kalender und Aufgabenlisten brauchen dasselbe: Reihenfolge, Anzeigename,
 * Farbe, und die Moeglichkeit, etwas hinzuzunehmen oder wegzulassen.
 *
 * Sortiert wird ueber Pfeile, nicht durch Ziehen: Auf einem Wandpanel
 * konkurriert Ziehen mit dem Rollen der Seite, und ein Fehlgriff ist dort
 * nicht so leicht rueckgaengig zu machen wie mit einer Maus.
 */

/** Genug Farben, um eine Familie zu unterscheiden, ohne zu einer
 *  Farbwahl-Wissenschaft zu werden. */
export const PALETTE = [
  '#0078d4',
  '#2980b9',
  '#16a085',
  '#27ae60',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#c0399b',
  '#9b59b6',
  '#8e6e53',
  '#5d6d7e',
  '#111827',
];

export interface EntityRow {
  entityId: string;
  /** Name aus Home Assistant - dient als Platzhalter. */
  fallbackName: string;
  name: string;
  color: string;
  /** Nur bei Kalendern: beim Start eingeblendet. */
  active?: boolean;
}

export interface EntityChoice {
  entityId: string;
  name: string;
}

export interface EntityListContext {
  rows: EntityRow[];
  available: EntityChoice[];
  /** Beschriftung des Schalters; leer bedeutet: kein Schalter. */
  activeLabel?: string;
  addLabel: string;
  emptyText: string;
  onName: (entityId: string, name: string) => void;
  onColor: (entityId: string, color: string) => void;
  onActive: (entityId: string, active: boolean) => void;
  onMove: (entityId: string, richtung: -1 | 1) => void;
  onRemove: (entityId: string) => void;
  onAdd: (entityId: string) => void;
}

export function renderEntityList(ctx: EntityListContext): TemplateResult {
  return html`
    ${ctx.rows.length === 0
      ? html`<p class="set-leer"><ha-icon icon="mdi:playlist-plus"></ha-icon>${ctx.emptyText}</p>`
      : html`<div class="set-liste">
          ${ctx.rows.map((row, i) => zeileFuer(row, i, ctx))}
        </div>`}
    ${hinzufuegen(ctx)}
  `;
}

function zeileFuer(row: EntityRow, index: number, ctx: EntityListContext): TemplateResult {
  const letzter = index === ctx.rows.length - 1;

  return html`
    <div class="set-eintrag">
      <div class="set-pfeile">
        <button
          ?disabled=${index === 0}
          aria-label="nach oben"
          @click=${() => ctx.onMove(row.entityId, -1)}
        >
          <ha-icon icon="mdi:chevron-up"></ha-icon>
        </button>
        <button
          ?disabled=${letzter}
          aria-label="nach unten"
          @click=${() => ctx.onMove(row.entityId, 1)}
        >
          <ha-icon icon="mdi:chevron-down"></ha-icon>
        </button>
      </div>

      <div class="set-eintrag-text">
        <input
          class="set-eingabe set-eingabe--name"
          type="text"
          .value=${row.name}
          placeholder=${row.fallbackName}
          @change=${(e: Event) =>
            ctx.onName(row.entityId, (e.target as HTMLInputElement).value.trim())}
        />
        <span class="set-entity">${row.entityId}</span>
      </div>

      <div class="set-palette">
        ${PALETTE.map(
          (farbe) => html`
            <button
              class="set-farbe ${farbe.toLowerCase() === row.color.toLowerCase() ? 'gewaehlt' : ''}"
              style="--farbe: ${farbe}"
              title=${farbe}
              aria-label="Farbe ${farbe}"
              @click=${() => ctx.onColor(row.entityId, farbe)}
            ></button>
          `,
        )}
      </div>

      ${ctx.activeLabel && row.active !== undefined
        ? html`
            <label class="set-mini">
              <span>${ctx.activeLabel}</span>
              <button
                class="set-schalter set-schalter--klein ${row.active ? 'an' : ''}"
                role="switch"
                aria-checked=${row.active ? 'true' : 'false'}
                @click=${() => ctx.onActive(row.entityId, !row.active)}
              >
                <span class="set-knopf"></span>
              </button>
            </label>
          `
        : nothing}

      <button
        class="set-entfernen"
        aria-label="entfernen"
        title="Aus der App entfernen"
        @click=${() => ctx.onRemove(row.entityId)}
      >
        <ha-icon icon="mdi:close"></ha-icon>
      </button>
    </div>
  `;
}

function hinzufuegen(ctx: EntityListContext): TemplateResult {
  if (ctx.available.length === 0) {
    return html`<p class="set-fussnote">Es gibt nichts mehr hinzuzufügen.</p>`;
  }

  return html`
    <div class="set-hinzu">
      <select
        class="set-auswahl"
        @change=${(e: Event) => {
          const feld = e.target as HTMLSelectElement;
          if (feld.value) ctx.onAdd(feld.value);
          // Zuruecksetzen, sonst laesst sich derselbe Eintrag nicht erneut
          // waehlen, falls er zwischendurch entfernt wurde.
          feld.value = '';
        }}
      >
        <option value="">${ctx.addLabel}</option>
        ${ctx.available.map(
          (wahl) => html`<option value=${wahl.entityId}>${wahl.name}</option>`,
        )}
      </select>
    </div>
  `;
}
