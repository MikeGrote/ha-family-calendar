import type { HomeAssistant } from 'custom-card-helpers';
import { LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { groupByDay, startOfDay, toEntry } from './lib/agenda';
import { fetchEvents } from './lib/calendar-api';
import { colorMap, effectiveCalendars } from './lib/effective-config';
import { DEFAULT_COLOR } from './lib/event-mapping';
import { SettingsListener } from './lib/settings-listener';
import { agendaStyles } from './styles/agenda';
import { renderAgenda } from './templates/agenda';
import type { AgendaConfig, AgendaDay, AgendaEntry } from './types';

/** Uebersicht der naechsten Tage.
 *
 * Der Gegenentwurf zum Wochenraster: keine Stundenspalten, sondern eine
 * Liste. Auf einem Wandpanel beantwortet sie die haeufigste Frage - was
 * steht heute und morgen an - ohne dass man ein Raster lesen muss.
 */
const DEFAULT_DAYS = 7;
const DEFAULT_DEBOUNCE_MS = 500;

@customElement('family-agenda')
export class FamilyAgenda extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: AgendaConfig;

  @state() private days: AgendaDay[] = [];
  /** Zaehlt hoch, wenn sich die Einstellungen aendern. Gelesen wird der
   *  Wert nirgends - er ist nur das Signal an Lit, neu zu zeichnen; der
   *  Stand selbst liegt im Zuhoerer. */
  @state() private settingsRevision = 0;

  private readonly einstellungen = new SettingsListener('Family Agenda', () => {
    this.settingsRevision++;
    this.scheduleLoad();
  });
  private refreshTimer?: number;
  private lastSignature = '';

  setConfig(config: AgendaConfig): void {
    if (!config.entities?.length) {
      throw new Error('Bitte mindestens eine Kalender-Entität angeben!');
    }
    this.config = config;
  }

  getCardSize(): number {
    return 8;
  }

  /** Kalender und Farben kommen aus dem Einstellungsbereich, ersatzweise
   *  aus dem Dashboard - dieselbe Auswahl wie in der Kalenderkarte. */
  private get kalender() {
    return effectiveCalendars(this.config, this.einstellungen.settings.calendars);
  }

  private get kalenderIds(): string[] {
    return this.kalender.map((k) => k.entityId);
  }

  private get farben(): Record<string, string> {
    return colorMap(this.kalender);
  }

  firstUpdated(): void {
    void this.einstellungen.start(this.hass);
  }

  updated(changedProps: PropertyValues): void {
    if (!changedProps.has('hass')) return;

    // hass wird bei jeder Zustandsaenderung im System neu zugewiesen -
    // ohne Vergleich wuerde die Karte staendig nachladen.
    const signature = this.kalenderIds
      .map((id) => this.hass.states[id]?.last_updated ?? 'missing')
      .join('|');
    if (signature === this.lastSignature) return;
    this.lastSignature = signature;
    this.scheduleLoad();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.refreshTimer !== undefined) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = undefined;
    }
    this.einstellungen.stop();
  }

  render(): TemplateResult {
    return renderAgenda({
      days: this.days,
      hideEmptyDays: this.config?.hideEmptyDays ?? false,
    });
  }

  private scheduleLoad(): void {
    if (this.refreshTimer !== undefined) clearTimeout(this.refreshTimer);
    this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = undefined;
      void this.load();
    }, this.config?.refreshDebounceMs ?? DEFAULT_DEBOUNCE_MS);
  }

  private async load(): Promise<void> {
    if (!this.hass || !this.config) return;

    const anzahl = this.config.days ?? DEFAULT_DAYS;
    const start = startOfDay(new Date());
    const end = new Date(start);
    end.setDate(end.getDate() + anzahl);

    const entries: AgendaEntry[] = [];
    for (const entityId of this.kalenderIds) {
      try {
        const events = await fetchEvents(
          this.hass,
          entityId,
          start.toISOString(),
          end.toISOString(),
        );
        const color = this.farben[entityId] ?? DEFAULT_COLOR;
        const name =
          this.kalender.find((k) => k.entityId === entityId)?.name ||
          this.hass.states[entityId]?.attributes?.friendly_name ||
          entityId;
        entries.push(...events.map((event) => toEntry(event, color, name)));
      } catch (err) {
        console.error('Family Agenda: Laden fehlgeschlagen für', entityId, err);
      }
    }

    this.days = groupByDay(entries, anzahl);
  }

  static styles = agendaStyles;
}

declare global {
  interface HTMLElementTagNameMap {
    'family-agenda': FamilyAgenda;
  }
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: 'family-agenda',
  name: 'Family Agenda',
  description: 'Übersicht der nächsten Tage als Liste, über mehrere Kalender.',
  preview: false,
});
