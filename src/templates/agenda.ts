import { html, type TemplateResult } from 'lit';

import { timeLabel } from '../lib/agenda';
import type { AgendaDay, AgendaEntry } from '../types';

/** Markup der Uebersicht: Tage untereinander, Termine je Tag. */

export interface AgendaContext {
  days: AgendaDay[];
  hideEmptyDays: boolean;
}

/** Der Monat interessiert nur, wenn die Liste einen Wechsel enthaelt. */
function monatNoetig(days: AgendaDay[]): boolean {
  const erster = days[0]?.date.getMonth();
  return days.some((day) => day.date.getMonth() !== erster);
}

export function renderAgenda(ctx: AgendaContext): TemplateResult {
  const sichtbar = ctx.hideEmptyDays
    ? ctx.days.filter((day) => day.entries.length > 0)
    : ctx.days;

  return html`
    <ha-card>
      <div class="agenda">
        ${sichtbar.length === 0
          ? html`<p class="empty-all">In den nächsten Tagen steht nichts an.</p>`
          : sichtbar.map((day) => renderDay(day, monatNoetig(sichtbar)))}
      </div>
    </ha-card>
  `;
}

function renderDay(day: AgendaDay, mitMonat: boolean): TemplateResult {
  const heute = day.label === 'Heute';
  return html`
    <section class="day ${heute ? 'day--today' : ''}">
      <header class="day-head">
        <span class="day-number">${day.date.getDate()}</span>
        <span class="day-label">${day.label}</span>
        ${mitMonat
          ? html`<span class="day-month">
              ${day.date.toLocaleDateString('de-DE', { month: 'short' })}
            </span>`
          : ''}
      </header>
      ${day.entries.length === 0
        ? html`<p class="empty">Keine Termine</p>`
        : day.entries.map((entry) => renderEntry(entry, day.date))}
    </section>
  `;
}

function renderEntry(entry: AgendaEntry, day: Date): TemplateResult {
  return html`
    <article class="entry" style="--entry-color: ${entry.color}" title=${entry.calendarName}>
      <span class="stripe"></span>
      <div class="entry-body">
        <span class="entry-title">${entry.summary}</span>
        <span class="entry-meta">
          ${timeLabel(entry, day)}${entry.location ? html` · ${entry.location}` : ''}
        </span>
      </div>
    </article>
  `;
}
