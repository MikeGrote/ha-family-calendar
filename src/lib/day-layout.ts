/** Nebeneinander liegende Termine auf Spuren verteilen.
 *
 * Zwei Termine zur selben Zeit duerfen sich nicht ueberdecken - sonst ist
 * einer davon unsichtbar. Sie teilen sich deshalb die Breite des Tages.
 * Geteilt wird nur innerhalb einer Gruppe, die sich tatsaechlich
 * beruehrt: Ein einzelner Termin am Abend bleibt breit, auch wenn morgens
 * drei gleichzeitig laufen.
 */

export interface Placed<T> {
  item: T;
  /** Spur von links, beginnend bei 0. */
  lane: number;
  /** Wie viele Spuren sich die Gruppe teilt. */
  lanes: number;
}

/** Verteilt die Eintraege auf moeglichst wenige Spuren. */
export function layoutOverlaps<T>(
  items: T[],
  startOf: (item: T) => number,
  endOf: (item: T) => number,
): Placed<T>[] {
  const sortiert = [...items].sort((a, b) => startOf(a) - startOf(b) || endOf(a) - endOf(b));

  const ergebnis: Placed<T>[] = [];
  // Ende je Spur; eine Spur wird frei, sobald ihr Termin vorbei ist.
  let spurEnden: number[] = [];
  let gruppe: Placed<T>[] = [];

  for (const item of sortiert) {
    const start = startOf(item);
    // Beruehrt der Termin keine der laufenden Spuren mehr, ist die Gruppe
    // abgeschlossen und die naechste beginnt bei null.
    if (spurEnden.every((ende) => ende <= start)) {
      schliesse(gruppe, spurEnden.length);
      gruppe = [];
      spurEnden = [];
    }

    let lane = spurEnden.findIndex((ende) => ende <= start);
    if (lane === -1) lane = spurEnden.length;
    spurEnden[lane] = Math.max(endOf(item), start + 1);

    const platziert: Placed<T> = { item, lane, lanes: 1 };
    gruppe.push(platziert);
    ergebnis.push(platziert);
  }
  schliesse(gruppe, spurEnden.length);

  return ergebnis;
}

/** Allen Eintraegen einer Gruppe dieselbe Spurenzahl geben. */
function schliesse<T>(gruppe: Placed<T>[], spuren: number): void {
  for (const eintrag of gruppe) {
    eintrag.lanes = Math.max(1, spuren);
  }
}
