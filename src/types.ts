import type { HomeAssistant } from 'custom-card-helpers';

/** Konfiguration der Karte, wie sie im Lovelace-YAML steht. */
export interface CalendarConfig {
  type?: string;
  entities: string[];
  colors?: Record<string, string>;
  /** Wiederholungen pro Sekunde, mit denen auf hass-Updates reagiert wird. */
  refreshDebounceMs?: number;
  /** Kleine Symbolschaltflaechen links in der Kopfzeile. */
  links?: CardLink[];
}

/** Ein Sprungziel in der Kopfzeile, etwa eine andere Dashboard-Ansicht. */
export interface CardLink {
  /** Material-Design-Symbol, z. B. "mdi:cog". */
  icon: string;
  /** Pfad innerhalb von Home Assistant, z. B. "/dashboard-wand/planer". */
  path: string;
  /** Beschriftung fuer Sprachausgabe und Kurzhinweis. */
  name?: string;
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
  /** Wiederholungsregel des Termins, leer bei Einzelterminen. */
  rrule: string;
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

export type RecurrenceFrequency = '' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

/** hass.callApi ist in custom-card-helpers zu locker typisiert. */
export type HassWithApi = HomeAssistant & {
  callApi: <T>(method: 'GET' | 'POST', path: string) => Promise<T>;
};

/** Ein Eintrag der Seitenleiste. */
export interface NavItem {
  /** Eindeutige Kennung des Bereichs. */
  id: string;
  /** Material-Design-Symbol, z. B. "mdi:calendar-month". */
  icon: string;
  /** Beschriftung neben dem Symbol. */
  name: string;
  /** Sichtbar, aber noch ohne Inhalt - fuer geplante Bereiche. */
  disabled?: boolean;
}

/** Ein Bereich der Huellkarte. */
export interface ShellArea extends NavItem {
  /** Die Karte, die den Bereich fuellt. Fehlt sie, ist er noch leer. */
  card?: Record<string, unknown>;
  /** Statt umzuschalten dorthin wechseln - fuer Ziele ausserhalb des Panels. */
  path?: string;
}

/** Konfiguration der Huellkarte. */
export interface ShellConfig {
  type?: string;
  areas: ShellArea[];
  /** Bereich, der beim Laden gezeigt wird. Standard: der erste. */
  initial?: string;
  /** Nur Symbole ohne Beschriftung. Standard: mit Beschriftung. */
  compact?: boolean;
}

/** Konfiguration der Uebersichtskarte. */
export interface AgendaConfig {
  type?: string;
  entities: string[];
  colors?: Record<string, string>;
  /** Wie viele Tage ab heute gezeigt werden. Standard: 7. */
  days?: number;
  /** Tage ohne Termine ausblenden. Standard: false. */
  hideEmptyDays?: boolean;
  /** Entprellung der Aktualisierung in Millisekunden. Standard: 500. */
  refreshDebounceMs?: number;
}

/** Ein Termin, aufbereitet fuer die Uebersicht. */
export interface AgendaEntry {
  uid: string;
  summary: string;
  location?: string;
  color: string;
  calendarName: string;
  allDay: boolean;
  start: Date;
  end: Date;
}

/** Ein Tag der Uebersicht mit seinen Terminen. */
export interface AgendaDay {
  date: Date;
  label: string;
  entries: AgendaEntry[];
}
