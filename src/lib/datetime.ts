/** Datums- und Zeitformate an den Grenzen der Karte.
 *
 * Zwei Formate treffen hier aufeinander: Eingabefelder im Browser erwarten
 * `YYYY-MM-DD` oder `YYYY-MM-DDTHH:mm`, die Kalender-Schnittstelle von Home
 * Assistant eine lokale Angabe ohne Zeitzone. Beide entstehen aus derselben
 * Verschiebung um den Zeitzonenversatz.
 */

/** Verschiebt einen Zeitpunkt so, dass toISOString die Ortszeit liefert. */
function toLocalIso(date: Date): string {
  const local = new Date(date);
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  return local.toISOString();
}

/** Wert fuer `<input type="date">` beziehungsweise `type="datetime-local">`. */
export function formatForInput(date: Date | null, allDay: boolean): string {
  if (!date) return '';
  const iso = toLocalIso(date);
  return allDay ? iso.slice(0, 10) : iso.slice(0, 16);
}

/** Zeitangabe fuer die Kalender-Schnittstelle: lokal, ohne Zeitzone. */
export function formatForApi(date: Date | null, allDay: boolean): string {
  if (!date) return '';
  const iso = toLocalIso(date);
  return allDay ? iso.slice(0, 10) : iso.slice(0, 19);
}

/** Wechselt einen Eingabewert zwischen Datum und Datum mit Uhrzeit. */
export function reformatInput(value: string, toAllDay: boolean): string {
  if (!value) return '';
  return toAllDay ? value.slice(0, 10) : `${value.slice(0, 10)}T09:00`;
}

/** Minuten seit Mitternacht als `HH:MM:SS` fuer die Zeitachse. */
export function minutesToTime(minutes: number): string {
  const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
  const rest = String(minutes % 60).padStart(2, '0');
  return `${hours}:${rest}:00`;
}
