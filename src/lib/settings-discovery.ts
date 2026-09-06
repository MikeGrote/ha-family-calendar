import type { TodoListConfig } from '../types';

/** Findet heraus, welche Karten dieses Panel ueberhaupt hat.
 *
 * Der Einstellungsbereich kann nicht raten, wie viele Aufgabenkarten es
 * gibt und wie sie heissen - im Panel stehen zwei davon, "Aufgaben" und
 * "Listen". Gelesen wird die Dashboard-Konfiguration; geschrieben wird sie
 * nicht, die Einstellungen liegen weiterhin in der Integration.
 */

export interface TaskCardInfo {
  /** Schluessel im Speicher - die Kennung des Bereichs. */
  key: string;
  /** Beschriftung, wie sie in der Seitenleiste steht. */
  bereich: string;
  lists: TodoListConfig[];
  title: string;
  showCompleted: boolean;
  showDue: boolean;
}

interface RohKarte {
  type?: string;
  areas?: RohBereich[];
  lists?: TodoListConfig[];
  title?: string;
  showCompleted?: boolean;
  showDue?: boolean;
  entities?: string[];
  colors?: Record<string, string>;
}

interface RohBereich {
  id?: string;
  name?: string;
  disabled?: boolean;
  path?: string;
  card?: RohKarte;
}

interface RohConfig {
  views?: { cards?: RohKarte[] }[];
}

const SHELL = 'custom:family-shell';
const TASKS = 'custom:family-tasks';
const CALENDAR = 'custom:family-calendar';

/** Alle Aufgabenkarten des Dashboards, in der Reihenfolge der Bereiche. */
export function findTaskCards(config: unknown): TaskCardInfo[] {
  const roh = config as RohConfig | null | undefined;
  const gefunden: TaskCardInfo[] = [];

  for (const view of roh?.views ?? []) {
    for (const karte of view.cards ?? []) {
      if (karte.type !== SHELL) continue;

      for (const bereich of karte.areas ?? []) {
        if (bereich.card?.type !== TASKS || !bereich.id) continue;
        gefunden.push({
          key: bereich.id,
          bereich: bereich.name || bereich.id,
          lists: bereich.card.lists ?? [],
          title: bereich.card.title ?? '',
          showCompleted: bereich.card.showCompleted ?? false,
          showDue: bereich.card.showDue ?? true,
        });
      }
    }
  }

  return gefunden;
}

/** Das Dashboard aus der Adresse, wie lovelace/config es erwartet.
 *
 * "/dashboard-wand/panel" -> "dashboard-wand". Die Vorgabe-Ansicht liegt
 * unter "lovelace" und hat keinen eigenen Abschnitt in der Adresse.
 */
export function dashboardPath(pfad: string): string {
  const teile = pfad.split('/').filter(Boolean);
  return teile[0] ?? 'lovelace';
}

/** Ein Bereich, in den sich umschalten laesst. */
export interface AreaInfo {
  id: string;
  name: string;
}

/** Die umschaltbaren Bereiche des Panels.
 *
 * Ohne Ziele ausserhalb des Panels und ohne angekuendigte, noch leere
 * Bereiche - dorthin umzuschalten waere eine Sackgasse.
 */
export function findAreas(config: unknown): AreaInfo[] {
  const roh = config as RohConfig | null | undefined;
  const gefunden: AreaInfo[] = [];

  for (const view of roh?.views ?? []) {
    for (const karte of view.cards ?? []) {
      if (karte.type !== SHELL) continue;
      for (const bereich of karte.areas ?? []) {
        if (!bereich.id || !bereich.card || bereich.disabled || bereich.path) continue;
        gefunden.push({ id: bereich.id, name: bereich.name || bereich.id });
      }
    }
  }

  return gefunden;
}

/** Die Kalenderkarte des Panels - Ausgangspunkt fuer die Einstellungen.
 *
 * Beim ersten Bearbeiten wird daraus der gespeicherte Stand aufgebaut, damit
 * nichts verlorengeht, was heute schon eingetragen ist.
 */
export function findCalendarConfig(
  config: unknown,
): { entities: string[]; colors: Record<string, string> } {
  const roh = config as RohConfig | null | undefined;

  for (const view of roh?.views ?? []) {
    for (const karte of view.cards ?? []) {
      if (karte.type !== SHELL) continue;
      for (const bereich of karte.areas ?? []) {
        if (bereich.card?.type !== CALENDAR) continue;
        return { entities: bereich.card.entities ?? [], colors: bereich.card.colors ?? {} };
      }
    }
  }

  return { entities: [], colors: {} };
}
