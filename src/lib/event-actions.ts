import type { EventDropArg } from '@fullcalendar/core';
import type { EventResizeDoneArg } from '@fullcalendar/interaction';
import type { HomeAssistant } from 'custom-card-helpers';

import type { CalendarEventPayload, EventExtendedProps } from '../types';
import { createEvent, deleteEvent, updateEvent } from './calendar-api';
import { formatForApi } from './datetime';
import { type EventFormState, recurrenceScope, toPayload } from './event-form';

/** Schreibende Zugriffe auf die Kalender.
 *
 * Getrennt von der Karte, weil hier nichts gezeichnet wird: Jede Funktion
 * nimmt den Zustand entgegen, spricht mit Home Assistant und meldet, ob es
 * geklappt hat. Die Karte entscheidet daraufhin, was sie anzeigt.
 */

export interface ActionContext {
  hass: HomeAssistant;
  notify: (message: string) => void;
  errorText: (err: unknown) => string;
}

/** Legt an oder aendert, je nachdem ob das Formular einen Termin kennt. */
export async function saveFormEvent(
  ctx: ActionContext,
  form: EventFormState,
): Promise<boolean> {
  try {
    if (form.editMode && form.currentEventId) {
      await updateEvent(
        ctx.hass,
        form.newEventCalendar,
        form.currentEventId,
        toPayload(form),
        recurrenceScope(form),
      );
    } else {
      await createEvent(ctx.hass, form.newEventCalendar, toPayload(form));
    }
    return true;
  } catch (err) {
    console.error('Family Calendar: Speichern fehlgeschlagen', err);
    ctx.notify(`Termin konnte nicht gespeichert werden: ${ctx.errorText(err)}`);
    return false;
  }
}

export async function deleteFormEvent(
  ctx: ActionContext,
  form: EventFormState,
): Promise<boolean> {
  try {
    await deleteEvent(
      ctx.hass,
      form.newEventCalendar,
      form.currentEventId,
      recurrenceScope(form),
    );
    return true;
  } catch (err) {
    console.error('Family Calendar: Löschen fehlgeschlagen', err);
    ctx.notify(`Termin konnte nicht gelöscht werden: ${ctx.errorText(err)}`);
    return false;
  }
}

/** Termin wurde gezogen oder in der Dauer geaendert. */
export async function moveEvent(
  ctx: ActionContext,
  info: EventDropArg | EventResizeDoneArg,
): Promise<boolean> {
  const event = info.event;
  const props = event.extendedProps as EventExtendedProps;

  if (!props.uid) {
    info.revert();
    ctx.notify('Dieser Termin hat keine Kennung und lässt sich nicht verschieben.');
    return false;
  }

  const payload: CalendarEventPayload = {
    summary: event.title,
    dtstart: formatForApi(event.start, event.allDay),
    dtend: formatForApi(event.end ?? event.start, event.allDay),
  };

  try {
    // Beim Ziehen wird genau diese Instanz verschoben, nicht die ganze
    // Serie - deshalb ohne recurrence_range.
    const scope: Record<string, string> = props.recurrenceId
      ? { recurrence_id: props.recurrenceId }
      : {};
    await updateEvent(ctx.hass, props.entityId, props.uid, payload, scope);
    return true;
  } catch (err) {
    // Ohne revert() bliebe der Termin optisch an der neuen Stelle stehen,
    // obwohl der Server ihn nicht uebernommen hat.
    info.revert();
    console.error('Family Calendar: Verschieben fehlgeschlagen', err);
    ctx.notify(`Termin konnte nicht verschoben werden: ${ctx.errorText(err)}`);
    return false;
  }
}
