import type { HomeAssistant } from 'custom-card-helpers';

import type { CalendarEventPayload, HassCalendarEvent } from '../types';

/** Alle Zugriffe auf die Kalender von Home Assistant.
 *
 * Gelesen wird ueber die REST-Schnittstelle, geschrieben ueber WebSocket -
 * das Anlegen und Aendern gibt es nur dort.
 */

/** Termine eines Kalenders im angegebenen Zeitraum. */
export async function fetchEvents(
  hass: HomeAssistant,
  entityId: string,
  start: string,
  end: string,
): Promise<HassCalendarEvent[]> {
  const from = encodeURIComponent(start);
  const to = encodeURIComponent(end);
  return hass.callApi<HassCalendarEvent[]>('GET', `calendars/${entityId}?start=${from}&end=${to}`);
}

/** Neuen Termin anlegen. */
export async function createEvent(
  hass: HomeAssistant,
  entityId: string,
  event: CalendarEventPayload,
): Promise<void> {
  await hass.callWS({ type: 'calendar/event/create', entity_id: entityId, event });
}

/** Bestehenden Termin aendern.
 *
 * `scope` entscheidet ueber die Reichweite: ohne Angabe die ganze Serie, mit
 * recurrence_id und THISANDFUTURE ab dieser Instanz. Eine Aenderung der
 * Wiederholungsregel laesst Home Assistant nur im zweiten Fall zu.
 */
export async function updateEvent(
  hass: HomeAssistant,
  entityId: string,
  uid: string,
  event: CalendarEventPayload,
  scope: Record<string, string> = {},
): Promise<void> {
  await hass.callWS({
    type: 'calendar/event/update',
    entity_id: entityId,
    uid,
    ...scope,
    event,
  });
}

/** Termin entfernen. */
export async function deleteEvent(
  hass: HomeAssistant,
  entityId: string,
  uid: string,
  scope: Record<string, string> = {},
): Promise<void> {
  await hass.callWS({
    type: 'calendar/event/delete',
    entity_id: entityId,
    uid,
    ...scope,
  });
}
