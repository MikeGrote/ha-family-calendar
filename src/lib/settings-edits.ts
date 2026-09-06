/** Aenderungen an einer geordneten Liste.
 *
 * Reine Rechnung, ohne Bezug zur Oberflaeche: Der Einstellungsbereich
 * schickt immer die vollstaendige neue Reihenfolge, weil eine Liste im
 * Speicher als Ganzes ersetzt wird. Zusammengefuegte Listen liessen sich
 * nie wieder kuerzen.
 */

/** Einen Eintrag um eine Stelle verschieben. */
export function moveInOrder(order: string[], entityId: string, richtung: -1 | 1): string[] {
  const von = order.indexOf(entityId);
  if (von === -1) return [...order];

  const nach = von + richtung;
  if (nach < 0 || nach >= order.length) return [...order];

  const neu = [...order];
  [neu[von], neu[nach]] = [neu[nach], neu[von]];
  return neu;
}

/** Hinten anfuegen, aber nie doppelt. */
export function addToOrder(order: string[], entityId: string): string[] {
  if (!entityId || order.includes(entityId)) return [...order];
  return [...order, entityId];
}

export function removeFromOrder(order: string[], entityId: string): string[] {
  return order.filter((id) => id !== entityId);
}

/** Was sich noch hinzufuegen laesst: alles, was noch nicht dabei ist. */
export function stillAvailable<T extends { entityId: string }>(
  alle: T[],
  order: string[],
): T[] {
  const drin = new Set(order);
  return alle.filter((eintrag) => !drin.has(eintrag.entityId));
}
