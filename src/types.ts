export interface CalendarConfig {
  entities: string[];
  colors?: Record<string, string>;
}

export interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  allDay: boolean;
  extendedProps: {
    entityId: string;
  };
}
