import type { TodoItem } from './todo-api';

/** Aufbereitung der Aufgaben fuer die Anzeige. */

/** Faelligkeit als Datum, unabhaengig davon ob mit oder ohne Uhrzeit. */
export function dueDate(item: TodoItem): Date | null {
  if (!item.due) return null;
  const date = new Date(item.due.length === 10 ? `${item.due}T00:00:00` : item.due);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Ueberfaellig heisst: Faelligkeit liegt vor heute und noch offen. */
export function isOverdue(item: TodoItem, today: Date = new Date()): boolean {
  if (item.status === 'completed') return false;
  const due = dueDate(item);
  if (!due) return false;

  const grenze = new Date(today);
  grenze.setHours(0, 0, 0, 0);
  return due < grenze;
}

/** Faelligkeit in Worten: heute, morgen, Wochentag oder Datum. */
export function dueLabel(item: TodoItem, today: Date = new Date()): string | null {
  const due = dueDate(item);
  if (!due) return null;

  const tage = Math.round(
    (new Date(due).setHours(0, 0, 0, 0) - new Date(today).setHours(0, 0, 0, 0)) / 86_400_000,
  );

  if (tage < 0) return tage === -1 ? 'Gestern' : `${Math.abs(tage)} Tage überfällig`;
  if (tage === 0) return 'Heute';
  if (tage === 1) return 'Morgen';
  if (tage < 7) return due.toLocaleDateString('de-DE', { weekday: 'long' });
  return due.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
}

/** Offene zuerst, darin nach Faelligkeit; Erledigte ans Ende. */
export function sortItems(items: TodoItem[]): TodoItem[] {
  return [...items].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'completed' ? 1 : -1;

    const da = dueDate(a);
    const db = dueDate(b);
    // Eintraege ohne Faelligkeit stehen hinter denen mit.
    if (da && db) return da.getTime() - db.getTime();
    if (da) return -1;
    if (db) return 1;
    return a.summary.localeCompare(b.summary, 'de');
  });
}

/** Anzahl der noch offenen Eintraege. */
export function openCount(items: TodoItem[]): number {
  return items.filter((item) => item.status !== 'completed').length;
}
