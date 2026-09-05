/** Wiederholungen bei Aufgaben.
 *
 * Home Assistant kennt fuer Aufgaben keine Wiederholungsregel. Die Regel
 * reist deshalb in der Beschreibung mit, in einer eigenen Zeile:
 *
 *     [wdh: FREQ=WEEKLY;INTERVAL=1]
 *
 * Die Integration liest sie beim Abhaken und legt die naechste Aufgabe an.
 * Diese Datei ist die Gegenseite in der Karte: schreiben, lesen, verbergen.
 */

export type TaskFrequency = '' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export interface TaskRecurrence {
  frequency: Exclude<TaskFrequency, ''>;
  interval: number;
}

const MARKER = /^\[wdh:\s*([^\]]+)\]\s*$/m;
const KNOWN: TaskFrequency[] = ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'];

/** Liest die Regel aus der Beschreibung. */
export function parseMarker(description?: string): TaskRecurrence | null {
  if (!description) return null;

  const treffer = MARKER.exec(description);
  if (!treffer) return null;

  const regel = treffer[1];
  const frequency = feld(regel, 'FREQ');
  if (!frequency || !KNOWN.includes(frequency as TaskFrequency)) return null;

  const interval = Number.parseInt(feld(regel, 'INTERVAL') ?? '1', 10);
  return {
    frequency: frequency as Exclude<TaskFrequency, ''>,
    interval: Number.isFinite(interval) && interval > 0 ? interval : 1,
  };
}

function feld(regel: string, name: string): string | undefined {
  for (const teil of regel.split(';')) {
    const [schluessel, wert] = teil.split('=');
    if (schluessel?.trim().toUpperCase() === name) return wert?.trim().toUpperCase();
  }
  return undefined;
}

/** Beschreibung ohne die Regelzeile - was der Nutzer geschrieben hat. */
export function stripMarker(description?: string): string {
  if (!description) return '';
  return description.replace(MARKER, '').trim();
}

/** Baut die Beschreibung mit angehaengter Regel. */
export function buildDescription(
  text: string,
  frequency: TaskFrequency,
  interval = 1,
): string {
  const rumpf = stripMarker(text);
  if (!frequency) return rumpf;

  const regel = interval > 1 ? `FREQ=${frequency};INTERVAL=${interval}` : `FREQ=${frequency}`;
  return rumpf ? `${rumpf}\n\n[wdh: ${regel}]` : `[wdh: ${regel}]`;
}

const LABELS: Record<string, string> = {
  DAILY: 'Täglich',
  WEEKLY: 'Wöchentlich',
  MONTHLY: 'Monatlich',
  YEARLY: 'Jährlich',
};

const PLURAL: Record<string, string> = {
  DAILY: 'Tage',
  WEEKLY: 'Wochen',
  MONTHLY: 'Monate',
  YEARLY: 'Jahre',
};

/** Regel in Worten, etwa "Alle 2 Wochen". */
export function recurrenceLabel(recurrence: TaskRecurrence): string {
  if (recurrence.interval <= 1) return LABELS[recurrence.frequency] ?? 'Wiederholt';
  return `Alle ${recurrence.interval} ${PLURAL[recurrence.frequency] ?? 'Male'}`;
}
