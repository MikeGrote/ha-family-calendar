import type { HomeAssistant } from 'custom-card-helpers';

/** Zugriff auf die Aufgabenlisten von Home Assistant.
 *
 * Gelesen wird ueber ein Abonnement statt durch Abfragen: todo/item/subscribe
 * schickt bei jeder Aenderung die vollstaendige Liste. Damit ist die Karte
 * ohne Nachladen aktuell, auch wenn jemand anderes etwas abhakt.
 */

export type TodoStatus = 'needs_action' | 'completed';

/** Ein Eintrag, wie Home Assistant ihn liefert. */
export interface TodoItem {
  uid: string;
  summary: string;
  status: TodoStatus;
  due?: string;
  description?: string;
}

interface SubscribeEvent {
  items: TodoItem[];
}

/** Verbindung, die custom-card-helpers nur unvollstaendig typisiert. */
interface HassConnection {
  subscribeMessage: (
    callback: (event: SubscribeEvent) => void,
    payload: Record<string, unknown>,
  ) => Promise<() => void>;
}

/** Abonniert eine Liste. Der Rueckgabewert beendet das Abonnement. */
export async function subscribeList(
  hass: HomeAssistant,
  entityId: string,
  onItems: (items: TodoItem[]) => void,
): Promise<() => void> {
  const connection = (hass as unknown as { connection: HassConnection }).connection;
  return connection.subscribeMessage((event) => onItems(event.items ?? []), {
    type: 'todo/item/subscribe',
    entity_id: entityId,
  });
}

export async function addItem(
  hass: HomeAssistant,
  entityId: string,
  summary: string,
  dueDate?: string,
): Promise<void> {
  await hass.callService('todo', 'add_item', {
    entity_id: entityId,
    item: summary,
    ...(dueDate ? { due_date: dueDate } : {}),
  });
}

/** Haken setzen oder loesen. */
export async function setStatus(
  hass: HomeAssistant,
  entityId: string,
  item: TodoItem,
  status: TodoStatus,
): Promise<void> {
  await hass.callService('todo', 'update_item', {
    entity_id: entityId,
    item: item.uid,
    status,
  });
}

export async function removeItem(
  hass: HomeAssistant,
  entityId: string,
  item: TodoItem,
): Promise<void> {
  await hass.callService('todo', 'remove_item', { entity_id: entityId, item: item.uid });
}

/** Entfernt alle erledigten Eintraege einer Liste. */
export async function clearCompleted(hass: HomeAssistant, entityId: string): Promise<void> {
  await hass.callService('todo', 'remove_completed_items', { entity_id: entityId });
}
