import type { CalendarContext } from '../templates/settings-calendars';
import type { EntityChoice } from '../templates/settings-entities';
import type { TaskSetContext } from '../templates/settings-tasks';
import { effectiveCalendars, effectiveTaskLists } from './effective-config';
import {
  type AppSettings,
  type CalendarSettings,
  DEFAULT_TASK_SET,
  type SettingsPatch,
  type TaskSetSettings,
} from './settings-api';
import type { TaskCardInfo } from './settings-discovery';
import { addToOrder, moveInOrder, removeFromOrder, stillAvailable } from './settings-edits';

/** Baut die Kontexte der Abschnitte und uebersetzt jede Bedienung in einen
 *  Ausschnitt fuer den Speicher.
 *
 * Hier steht, was ein Klick bedeutet - getrennt vom Zeichnen, damit es sich
 * pruefen laesst, ohne eine Oberflaeche aufzubauen.
 */

export interface ContextDeps {
  /** Anzeigename einer Entitaet aus Home Assistant. */
  nameOf: (entityId: string) => string;
  /** Alles, was sich grundsaetzlich hinzufuegen laesst. */
  choices: EntityChoice[];
  patch: (patch: SettingsPatch) => void;
}

/** Ausgangsstand aus dem, was im Dashboard steht. */
export function seedCalendars(
  config: { entities: string[]; colors: Record<string, string> },
  startCompact: boolean,
): CalendarSettings {
  const kalender = effectiveCalendars(config, undefined);
  return {
    order: kalender.map((k) => k.entityId),
    items: Object.fromEntries(
      kalender.map((k) => [k.entityId, { name: k.name, color: k.color, active: k.active }]),
    ),
    startCompact,
  };
}

export function seedTaskSet(info: TaskCardInfo): TaskSetSettings {
  const listen = effectiveTaskLists(info, undefined);
  return {
    order: listen.map((l) => l.entity),
    items: Object.fromEntries(
      listen.map((l) => [l.entity, { name: l.name ?? '', color: l.color ?? '' }]),
    ),
    title: info.title,
    showCompleted: info.showCompleted,
    showDue: info.showDue,
  };
}

/** Der Abschnitt "Kalender". */
export function calendarContext(
  settings: AppSettings,
  dashboard: { entities: string[]; colors: Record<string, string> },
  deps: ContextDeps,
): CalendarContext {
  // Solange nichts gespeichert ist, gilt das Dashboard - und beim ersten
  // Bearbeiten wird genau das zum Ausgangsstand.
  const stand = settings.calendars.order.length
    ? settings.calendars
    : seedCalendars(dashboard, settings.calendars.startCompact);

  const schreibe = (aenderung: Partial<CalendarSettings>): void => {
    deps.patch({ calendars: { ...stand, ...aenderung } });
  };

  const mitItem = (entityId: string, teil: Partial<CalendarSettings['items'][string]>): void => {
    const vorher = stand.items[entityId] ?? { name: '', color: '', active: true };
    schreibe({ items: { ...stand.items, [entityId]: { ...vorher, ...teil } } });
  };

  return {
    rows: effectiveCalendars(dashboard, stand).map((k) => ({
      entityId: k.entityId,
      fallbackName: deps.nameOf(k.entityId),
      name: k.name,
      color: k.color,
      active: k.active,
    })),
    available: stillAvailable(deps.choices, stand.order),
    activeLabel: 'sichtbar',
    addLabel: 'Kalender hinzufügen …',
    emptyText: 'Noch kein Kalender ausgewählt.',
    startCompact: stand.startCompact,
    onStartCompact: (startCompact) => schreibe({ startCompact }),
    onName: (id, name) => mitItem(id, { name }),
    onColor: (id, color) => mitItem(id, { color }),
    onActive: (id, active) => mitItem(id, { active }),
    onMove: (id, richtung) => schreibe({ order: moveInOrder(stand.order, id, richtung) }),
    onRemove: (id) => schreibe({ order: removeFromOrder(stand.order, id) }),
    onAdd: (id) => schreibe({ order: addToOrder(stand.order, id) }),
  };
}

/** Ein Abschnitt je Aufgabenkarte des Panels. */
export function taskContexts(
  settings: AppSettings,
  karten: TaskCardInfo[],
  deps: ContextDeps,
): TaskSetContext[] {
  return karten.map((info) => {
    const gespeichert = settings.tasks[info.key];
    const stand: TaskSetSettings = gespeichert?.order?.length
      ? { ...DEFAULT_TASK_SET, ...gespeichert }
      : seedTaskSet(info);

    const schreibe = (aenderung: Partial<TaskSetSettings>): void => {
      deps.patch({ tasks: { [info.key]: { ...stand, ...aenderung } } });
    };

    const mitItem = (entityId: string, teil: Partial<TaskSetSettings['items'][string]>): void => {
      const vorher = stand.items[entityId] ?? { name: '', color: '' };
      schreibe({ items: { ...stand.items, [entityId]: { ...vorher, ...teil } } });
    };

    return {
      key: info.key,
      bereich: info.bereich,
      rows: effectiveTaskLists(info, stand).map((l) => ({
        entityId: l.entity,
        fallbackName: deps.nameOf(l.entity),
        name: l.name ?? '',
        color: l.color ?? '',
      })),
      available: stillAvailable(deps.choices, stand.order),
      addLabel: 'Liste hinzufügen …',
      emptyText: 'Noch keine Liste ausgewählt.',
      title: stand.title,
      showCompleted: stand.showCompleted,
      showDue: stand.showDue,
      onTitle: (title) => schreibe({ title }),
      onShowCompleted: (showCompleted) => schreibe({ showCompleted }),
      onShowDue: (showDue) => schreibe({ showDue }),
      onName: (id, name) => mitItem(id, { name }),
      onColor: (id, color) => mitItem(id, { color }),
      onActive: () => undefined,
      onMove: (id, richtung) => schreibe({ order: moveInOrder(stand.order, id, richtung) }),
      onRemove: (id) => schreibe({ order: removeFromOrder(stand.order, id) }),
      onAdd: (id) => schreibe({ order: addToOrder(stand.order, id) }),
    };
  });
}
