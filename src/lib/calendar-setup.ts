import {
  Calendar,
  type DateSelectArg,
  type DatesSetArg,
  type EventClickArg,
  type EventDropArg,
} from '@fullcalendar/core';
import deLocale from '@fullcalendar/core/locales/de';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { type EventResizeDoneArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

import { SLOT_MAX_FALLBACK, SLOT_MIN_FALLBACK } from './time-range';

/** Aufbau des FullCalendar-Rasters. */

export interface CalendarHandlers {
  onSelect: (info: DateSelectArg) => void;
  onEventClick: (info: EventClickArg) => void;
  onEventMoved: (info: EventDropArg | EventResizeDoneArg) => void;
  onDatesSet: (arg: DatesSetArg) => void;
}

export function createCalendar(host: HTMLElement, handlers: CalendarHandlers): Calendar {
  const calendar = new Calendar(host, {
    plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    locale: deLocale,
    selectable: true,
    selectMirror: true,
    editable: true,
    eventDurationEditable: true,
    select: handlers.onSelect,
    eventClick: handlers.onEventClick,
    eventDrop: handlers.onEventMoved,
    eventResize: handlers.onEventMoved,
    datesSet: handlers.onDatesSet,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,dayGridMonth',
    },
    height: '85vh',
    allDaySlot: true,
    slotMinTime: SLOT_MIN_FALLBACK,
    slotMaxTime: SLOT_MAX_FALLBACK,
    slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
    eventTimeFormat: { hour: '2-digit', minute: '2-digit', meridiem: false },
    events: [],
  });
  calendar.render();
  return calendar;
}
