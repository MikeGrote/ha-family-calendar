import type { RecurrenceFrequency } from '../types';

/** Wiederholungsregeln lesen und schreiben. */

const KNOWN_FREQUENCIES = ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'];

/** Zerlegt eine Wiederholungsregel in Haeufigkeit und Enddatum. */
export function parseRrule(rrule: string): {
  frequency: RecurrenceFrequency;
  until: string;
} {
  const frequency = /FREQ=([A-Z]+)/.exec(rrule)?.[1] ?? '';
  const until = /UNTIL=(\d{4})(\d{2})(\d{2})/.exec(rrule);
  return {
    frequency: (KNOWN_FREQUENCIES.includes(frequency) ? frequency : '') as RecurrenceFrequency,
    until: until ? `${until[1]}-${until[2]}-${until[3]}` : '',
  };
}

/** Baut die Wiederholungsregel fuer die Kalender-Schnittstelle. */
export function buildRrule(
  frequency: RecurrenceFrequency,
  until: string,
): string | undefined {
  if (!frequency) return undefined;
  if (!until) return `FREQ=${frequency}`;

  // UNTIL muss laut Norm in UTC stehen. Gemeint ist das Ende des gewaehlten
  // Tages in Ortszeit - toISOString rechnet die Verschiebung mit.
  const endOfDay = new Date(`${until}T23:59:59`);
  const utc = endOfDay.toISOString().replace(/[-:]/g, '').slice(0, 15);
  return `FREQ=${frequency};UNTIL=${utc}Z`;
}
