import type { Calendar, EventInput } from '@fullcalendar/core';
import type { HomeAssistant } from 'custom-card-helpers';

import type { CalendarConfig } from '../types';
import { fetchEvents } from './calendar-api';
import { DEFAULT_COLOR, filterByCalendars, toEventInput } from './event-mapping';
import { slotRangeFor } from './time-range';

/** Holt Termine, filtert sie und haelt das Raster in Form.
 *
 * Buendelt alles, was mit Nachladen und Zeitgebern zu tun hat, damit die
 * Karte selbst nur noch verdrahtet.
 */

/** Puffer in Tagen, der ueber den sichtbaren Bereich hinaus geladen wird. */
const FETCH_BUFFER_DAYS = 7;
const RESIZE_DEBOUNCE_MS = 100;

export interface LoaderContext {
  hass: () => HomeAssistant | undefined;
  config: () => CalendarConfig | undefined;
  calendar: () => Calendar | null;
  activeCalendars: () => string[];
  onError: (message: string, entityId: string) => void;
}

export class EventLoader {
  private all: EventInput[] = [];
  private visible: EventInput[] = [];
  private refreshTimer?: number;
  private resizeTimer?: number;
  private lastSignature = '';

  constructor(private readonly ctx: LoaderContext) {}

  /** Aendert sich nur, wenn einer der konfigurierten Kalender sich meldet.
   *
   * hass wird bei JEDER Zustandsaenderung im System neu zugewiesen. Ohne
   * diesen Vergleich wuerde die Karte dutzende Male pro Minute alles laden.
   */
  hasRelevantChange(): boolean {
    const hass = this.ctx.hass();
    const entities = this.ctx.config()?.entities;
    if (!hass || !entities) return false;

    const signature = entities.map((id) => hass.states[id]?.last_updated ?? 'missing').join('|');
    if (signature === this.lastSignature) return false;
    this.lastSignature = signature;
    return true;
  }

  scheduleFetch(debounceMs: number): void {
    this.clear('refreshTimer');
    this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = undefined;
      void this.load();
    }, debounceMs);
  }

  scheduleResize(): void {
    this.clear('resizeTimer');
    this.resizeTimer = window.setTimeout(() => {
      this.resizeTimer = undefined;
      this.ctx.calendar()?.updateSize();
    }, RESIZE_DEBOUNCE_MS);
  }

  /** Wendet die Filter an und passt die Zeitachse an. */
  applyFilters(): void {
    const calendar = this.ctx.calendar();
    if (!calendar) return;

    this.visible = filterByCalendars(this.all, this.ctx.activeCalendars());

    // removeAllEvents() laesst die Event-Sources stehen - ohne das hier
    // sammeln sich bei jedem Refresh neue Sources an.
    calendar.removeAllEventSources();
    calendar.addEventSource(this.visible);

    const view = calendar.view;
    this.adjustTimeRange(view.activeStart, view.activeEnd);
    calendar.updateSize();
  }

  adjustTimeRange(viewStart: Date, viewEnd: Date): void {
    const calendar = this.ctx.calendar();
    if (!calendar || calendar.view.type !== 'timeGridWeek') return;

    const range = slotRangeFor(this.visible, viewStart, viewEnd);
    calendar.setOption('slotMinTime', range.min);
    calendar.setOption('slotMaxTime', range.max);
  }

  dispose(): void {
    this.clear('refreshTimer');
    this.clear('resizeTimer');
  }

  private async load(): Promise<void> {
    const hass = this.ctx.hass();
    const config = this.ctx.config();
    if (!hass || !config || !this.ctx.calendar()) return;

    const { start, end } = this.window();
    const collected: EventInput[] = [];

    for (const entityId of config.entities) {
      try {
        const events = await fetchEvents(hass, entityId, start, end);
        const color = config.colors?.[entityId] ?? DEFAULT_COLOR;
        collected.push(...events.map((event) => toEventInput(event, entityId, color)));
      } catch (err) {
        console.error('Family Calendar: Laden fehlgeschlagen für', entityId, err);
        this.ctx.onError('Kalender konnte nicht geladen werden.', entityId);
      }
    }

    this.all = collected;
    this.applyFilters();
  }

  private window(): { start: string; end: string } {
    const view = this.ctx.calendar()?.view;
    const start = view ? new Date(view.activeStart) : new Date();
    const end = view ? new Date(view.activeEnd) : new Date();
    if (!view) end.setDate(end.getDate() + 14);
    start.setDate(start.getDate() - FETCH_BUFFER_DAYS);
    end.setDate(end.getDate() + FETCH_BUFFER_DAYS);
    return { start: start.toISOString(), end: end.toISOString() };
  }

  private clear(name: 'refreshTimer' | 'resizeTimer'): void {
    const handle = this[name];
    if (handle !== undefined) {
      clearTimeout(handle);
      this[name] = undefined;
    }
  }
}
