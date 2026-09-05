import type { HomeAssistant } from 'custom-card-helpers';

/** Konfiguration der Karte, wie sie im Lovelace-YAML steht. */
export interface CalendarConfig {
  type?: string;
  entities: string[];
  colors?: Record<string, string>;
  /** Wiederholungen pro Sekunde, mit denen auf hass-Updates reagiert wird. */
  refreshDebounceMs?: number;
}

/** Ein Event, wie es die REST-API /api/calendars/<entity_id> liefert. */
export interface HassCalendarEvent {
  summary: string;
  description?: string;
  location?: string;
  uid?: string;
  recurrence_id?: string;
  rrule?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

/** Zusatzdaten, die wir an jedes FullCalendar-Event haengen. */
export interface EventExtendedProps {
  entityId: string;
  uid: string;
  recurrenceId: string;
}

/** Nutzlast fuer calendar/event/create und calendar/event/update. */
export interface CalendarEventPayload {
  summary: string;
  dtstart: string;
  dtend: string;
  description?: string;
  location?: string;
  rrule?: string;
}

export type RecurrenceFrequency = '' | 'DAILY' | 'WEEKLY' | 'MONTHLY';

/** hass.callApi ist in custom-card-helpers zu locker typisiert. */
export type HassWithApi = HomeAssistant & {
  callApi: <T>(method: 'GET' | 'POST', path: string) => Promise<T>;
};
