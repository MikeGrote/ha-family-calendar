import { type TemplateResult, html, nothing } from 'lit';

import type { CompactBlock, CompactDay, CompactGap, CompactWeek } from '../lib/compact-model';
import type { ClickedEvent } from '../lib/event-form';

/** Die Kompaktansicht: eine Woche ohne Scrollen.
 *
 * Gerechnet ist hier nichts mehr - jede Zahl kommt aus compact-model.
 */

export interface CompactContext {
  week: CompactWeek;
  title: string;
  onEvent: (event: ClickedEvent) => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export function renderCompact(ctx: CompactContext): TemplateResult {
  const { week } = ctx;

  return html`
    <div class="compact">
      <div class="compact-nav">
        <button class="compact-step" @click=${ctx.onPrev} aria-label="Woche zurück">
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </button>
        <button class="compact-today" @click=${ctx.onToday}>Heute</button>
        <span class="compact-title">${ctx.title}</span>
        <button class="compact-step" @click=${ctx.onNext} aria-label="Woche vor">
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>
      </div>

      <div class="compact-grid">
        <div class="compact-axis-head"></div>
        ${week.days.map(
          (tag) => html`
            <div class="compact-head ${tag.isToday ? 'today' : ''}">
              <span class="compact-weekday">${tag.weekday}</span>
              <span class="compact-daynum">${tag.dayNumber}</span>
            </div>
          `,
        )}

        ${week.days.some((tag) => tag.allDay.length > 0)
          ? html`
              <div class="compact-axis-label">Ganztägig</div>
              ${week.days.map(
                (tag) => html`
                  <div class="compact-allday">
                    ${tag.allDay.map(
                      ({ event, color }) => html`
                        <button
                          class="compact-chip"
                          style="--block-color: ${color}"
                          title=${event.title}
                          @click=${() => ctx.onEvent(event)}
                        >
                          ${event.title}
                        </button>
                      `,
                    )}
                  </div>
                `,
              )}
            `
          : nothing}
      </div>

      <div class="compact-body">
        ${week.empty
          ? html`<p class="compact-empty">Diese Woche steht nichts mit Uhrzeit an.</p>`
          : html`
              <div class="compact-grid compact-scale" style="height: ${week.height}px">
                <div class="compact-axis">
                  ${week.gaps.map((luecke) => bruchBeschriftung(luecke))}
                  ${week.ticks.map(
                    (tick) => html`
                      <span class="compact-tick" style="top: ${tick.y}px">${tick.label}</span>
                    `,
                  )}
                </div>
                ${week.days.map((tag) => tagesspalte(tag, week.gaps, ctx.onEvent))}
              </div>
            `}
      </div>
    </div>
  `;
}

/** Ein Tag mit seinen Terminen und den Bruchstellen dahinter. */
function tagesspalte(
  tag: CompactDay,
  gaps: CompactGap[],
  onEvent: (event: ClickedEvent) => void,
): TemplateResult {
  return html`
    <div class="compact-day ${tag.isToday ? 'today' : ''}">
      ${gaps.map(
        (luecke) => html`
          <div class="compact-break" style="top: ${luecke.top}px; height: ${luecke.height}px"></div>
        `,
      )}
      ${tag.blocks.map((block) => terminblock(block, onEvent))}
    </div>
  `;
}

function terminblock(
  block: CompactBlock,
  onEvent: (event: ClickedEvent) => void,
): TemplateResult {
  const breite = 100 / block.lanes;
  const style = [
    `top: ${block.top}px`,
    `height: ${block.height}px`,
    `left: ${block.lane * breite}%`,
    `width: ${breite}%`,
    `--block-color: ${block.color}`,
  ].join('; ');

  return html`
    <button
      class="compact-block ${block.height < 30 ? 'flach' : ''}"
      style=${style}
      title="${block.event.title} · ${block.time}"
      @click=${() => onEvent(block.event)}
    >
      <span class="compact-block-title">${block.event.title}</span>
      <span class="compact-block-time">${block.time}</span>
    </button>
  `;
}

/** Der Achsenbruch: macht sichtbar, dass hier Zeit übersprungen wird. */
function bruchBeschriftung(luecke: CompactGap): TemplateResult {
  return html`
    <span
      class="compact-break-label"
      style="top: ${luecke.top}px; height: ${luecke.height}px"
      >${luecke.label}</span
    >
  `;
}
