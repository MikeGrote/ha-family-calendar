import type { EventApi } from '@fullcalendar/core';
import { describe, expect, it } from 'vitest';

import {
  emptyForm,
  formForExistingEvent,
  formForNewEvent,
  missingField,
  recurrenceScope,
  toPayload,
  withAllDay,
  withFrequency,
} from '../../src/lib/event-form';
import type { EventExtendedProps } from '../../src/types';

/** Das Formular ist die Stelle, an der Benutzereingaben zu einem Aufruf der
 *  Kalender-Schnittstelle werden. Fehler hier legen keine Ausnahme, sie
 *  legen einen falschen Termin an. */

interface TerminVorlage {
  title?: string;
  start: Date | null;
  end?: Date | null;
  allDay?: boolean;
  id?: string;
  uid?: string;
  entityId?: string;
  recurrenceId?: string;
  rrule?: string;
}

/** Ein Termin, wie FullCalendar ihn beim Anklicken übergibt. */
function terminApi(vorlage: TerminVorlage): EventApi {
  const props: EventExtendedProps = {
    entityId: vorlage.entityId ?? 'calendar.mike',
    uid: vorlage.uid ?? 'uid-1',
    recurrenceId: vorlage.recurrenceId ?? '',
    rrule: vorlage.rrule ?? '',
  };
  return {
    id: vorlage.id ?? props.uid,
    title: vorlage.title ?? 'Zahnarzt',
    start: vorlage.start,
    end: vorlage.end ?? null,
    allDay: vorlage.allDay ?? false,
    extendedProps: props,
  } as unknown as EventApi;
}

describe('emptyForm', () => {
  it('ist geschlossen und ohne Reste eines vorherigen Termins', () => {
    const form = emptyForm();
    expect(form.showModal).toBe(false);
    expect(form.editMode).toBe(false);
    expect(form.confirmDelete).toBe(false);
    expect(form.newEventTitle).toBe('');
    expect(form.currentEventId).toBe('');
    expect(form.currentRecurrenceId).toBe('');
    expect(form.newEventRecurrence).toBe('');
    expect(form.newEventUntil).toBe('');
  });

  it('gibt bei jedem Aufruf ein eigenes Objekt zurück', () => {
    // Ein geteiltes Objekt würde Eingaben in den nächsten Termin tragen.
    const a = emptyForm();
    a.newEventTitle = 'Reste';
    expect(emptyForm().newEventTitle).toBe('');
  });
});

describe('formForNewEvent', () => {
  it('übernimmt den markierten Zeitraum als Ortszeit', () => {
    const form = formForNewEvent(
      new Date('2026-06-02T09:00:00+02:00'),
      new Date('2026-06-02T10:30:00+02:00'),
      false,
      'calendar.mike',
    );
    expect(form.showModal).toBe(true);
    expect(form.editMode).toBe(false);
    expect(form.newEventStart).toBe('2026-06-02T09:00');
    expect(form.newEventEnd).toBe('2026-06-02T10:30');
    expect(form.newEventCalendar).toBe('calendar.mike');
  });

  it('kürzt bei ganztägig auf das Datum', () => {
    const form = formForNewEvent(
      new Date('2026-07-06T00:00:00+02:00'),
      new Date('2026-07-07T00:00:00+02:00'),
      true,
      'calendar.familie',
    );
    expect(form.isAllDay).toBe(true);
    expect(form.newEventStart).toBe('2026-07-06');
    expect(form.newEventEnd).toBe('2026-07-07');
  });

  it('legt keinen Serientermin an, solange nichts gewählt wurde', () => {
    const form = formForNewEvent(new Date(), new Date(), false, 'calendar.mike');
    expect(form.newEventRecurrence).toBe('');
    expect(toPayload({ ...form, newEventTitle: 'x' }).rrule).toBeUndefined();
  });
});

describe('formForExistingEvent', () => {
  it('füllt das Formular aus dem angeklickten Termin', () => {
    const form = formForExistingEvent(
      terminApi({
        title: 'Zahnarzt',
        start: new Date('2026-06-02T09:00:00+02:00'),
        end: new Date('2026-06-02T10:00:00+02:00'),
        uid: 'abc',
        entityId: 'calendar.mike',
      }),
    );
    expect(form.editMode).toBe(true);
    expect(form.newEventTitle).toBe('Zahnarzt');
    expect(form.newEventStart).toBe('2026-06-02T09:00');
    expect(form.newEventEnd).toBe('2026-06-02T10:00');
    expect(form.currentEventId).toBe('abc');
    expect(form.newEventCalendar).toBe('calendar.mike');
  });

  it('liest Häufigkeit und Serienende aus der Regel', () => {
    // Der Nutzer hatte gemeldet, dass bei einem Serientermin nicht
    // "wöchentlich" stand - die Regel muss also im Formular ankommen.
    const form = formForExistingEvent(
      terminApi({
        start: new Date('2026-06-02T09:00:00+02:00'),
        end: new Date('2026-06-02T09:45:00+02:00'),
        rrule: 'FREQ=WEEKLY;UNTIL=20261218T225959Z',
        recurrenceId: '20260602T090000',
      }),
    );
    expect(form.newEventRecurrence).toBe('WEEKLY');
    expect(form.newEventUntil).toBe('2026-12-18');
    expect(form.currentRecurrenceId).toBe('20260602T090000');
  });

  it('nimmt den Beginn als Ende, wenn der Termin keines hat', () => {
    const form = formForExistingEvent(
      terminApi({ start: new Date('2026-06-02T09:00:00+02:00'), end: null }),
    );
    expect(form.newEventEnd).toBe('2026-06-02T09:00');
  });

  it('greift auf die Kennung des Termins zurück, wenn die uid fehlt', () => {
    const form = formForExistingEvent(
      terminApi({ start: new Date('2026-06-02T09:00:00+02:00'), uid: '', id: 'fallback' }),
    );
    expect(form.currentEventId).toBe('fallback');
  });

  it('öffnet nicht mit einer stehengebliebenen Löschabfrage', () => {
    const form = formForExistingEvent(
      terminApi({ start: new Date('2026-06-02T09:00:00+02:00') }),
    );
    expect(form.confirmDelete).toBe(false);
  });
});

describe('withAllDay', () => {
  const form = { ...emptyForm(), newEventStart: '2026-06-02T09:00', newEventEnd: '2026-06-02T10:30' };

  it('meldet keine Änderung, wenn der Haken schon so steht', () => {
    // Ein leeres Ergebnis verhindert ein überflüssiges Neuzeichnen.
    expect(withAllDay(form, false)).toEqual({});
  });

  it('behält den Tag beim Wechsel auf ganztägig', () => {
    expect(withAllDay(form, true)).toEqual({
      isAllDay: true,
      newEventStart: '2026-06-02',
      newEventEnd: '2026-06-02',
    });
  });

  it('setzt beim Zurückschalten eine Uhrzeit, die es an jedem Tag gibt', () => {
    const ganztags = { ...form, isAllDay: true, newEventStart: '2026-03-29', newEventEnd: '2026-03-29' };
    expect(withAllDay(ganztags, false)).toEqual({
      isAllDay: false,
      newEventStart: '2026-03-29T09:00',
      newEventEnd: '2026-03-29T09:00',
    });
  });

  it('verliert den Tag auch nach mehrfachem Umschalten nicht', () => {
    let stand = { ...form };
    for (let i = 0; i < 4; i++) {
      stand = { ...stand, ...withAllDay(stand, !stand.isAllDay) };
    }
    expect(stand.newEventStart.slice(0, 10)).toBe('2026-06-02');
    expect(stand.isAllDay).toBe(false);
  });
});

describe('withFrequency', () => {
  it('setzt die gewählte Häufigkeit', () => {
    expect(withFrequency('MONTHLY')).toEqual({ newEventRecurrence: 'MONTHLY' });
  });

  it('räumt das Serienende mit weg, wenn die Wiederholung entfällt', () => {
    // Ein stehengebliebenes Enddatum ohne Häufigkeit wäre unsichtbar und
    // beim nächsten Einschalten plötzlich wieder da.
    expect(withFrequency('')).toEqual({ newEventRecurrence: '', newEventUntil: '' });
  });

  it('lässt ein gesetztes Ende beim Wechsel der Häufigkeit stehen', () => {
    expect(withFrequency('DAILY')).not.toHaveProperty('newEventUntil');
  });
});

describe('missingField', () => {
  const vollstaendig = {
    ...emptyForm(),
    newEventTitle: 'Zahnarzt',
    newEventCalendar: 'calendar.mike',
    newEventStart: '2026-06-02T09:00',
    newEventEnd: '2026-06-02T10:00',
  };

  it('lässt ein vollständiges Formular durch', () => {
    expect(missingField(vollstaendig)).toBeNull();
  });

  it('erkennt einen Titel, der nur aus Leerzeichen besteht', () => {
    expect(missingField({ ...vollstaendig, newEventTitle: '   ' })).toBe(
      'Bitte einen Titel eingeben.',
    );
  });

  it('verlangt einen Kalender', () => {
    expect(missingField({ ...vollstaendig, newEventCalendar: '' })).toBe(
      'Bitte einen Kalender auswählen.',
    );
  });

  it.each([
    ['newEventStart' as const],
    ['newEventEnd' as const],
  ])('verlangt %s', (feld) => {
    expect(missingField({ ...vollstaendig, [feld]: '' })).toBe(
      'Bitte Start und Ende angeben.',
    );
  });

  it('nennt den Titel zuerst, wenn mehreres fehlt', () => {
    // Der Hinweis soll das erste leere Feld benennen, nicht irgendeines.
    expect(missingField(emptyForm())).toBe('Bitte einen Titel eingeben.');
  });
});

describe('toPayload', () => {
  const form = {
    ...emptyForm(),
    newEventTitle: '  Zahnarzt  ',
    newEventCalendar: 'calendar.mike',
    newEventStart: '2026-06-02T09:00',
    newEventEnd: '2026-06-02T10:00',
  };

  it('räumt Leerzeichen aus dem Titel', () => {
    expect(toPayload(form).summary).toBe('Zahnarzt');
  });

  it('übergibt die Zeiten so, wie sie im Feld stehen', () => {
    // Die Schnittstelle erwartet Ortszeit ohne Zeitzone.
    expect(toPayload(form).dtstart).toBe('2026-06-02T09:00');
    expect(toPayload(form).dtend).toBe('2026-06-02T10:00');
  });

  it('lässt rrule weg, wenn es keine Wiederholung gibt', () => {
    expect('rrule' in toPayload(form)).toBe(false);
  });

  it('hängt die Wiederholungsregel mit Ende an', () => {
    const serie = { ...form, newEventRecurrence: 'WEEKLY' as const, newEventUntil: '2026-12-18' };
    expect(toPayload(serie).rrule).toBe('FREQ=WEEKLY;UNTIL=20261218T225959Z');
  });

  it('hängt eine Regel ohne Ende an, wenn kein Ende gewählt wurde', () => {
    const serie = { ...form, newEventRecurrence: 'DAILY' as const };
    expect(toPayload(serie).rrule).toBe('FREQ=DAILY');
  });
});

describe('recurrenceScope', () => {
  it('bleibt beim Einzeltermin leer', () => {
    expect(recurrenceScope(emptyForm())).toEqual({});
  });

  it('begrenzt die Änderung auf diesen und die folgenden Termine', () => {
    // Ohne recurrence_id weist die Schnittstelle eine geänderte Regel ab;
    // ohne THISANDFUTURE gälte die Änderung für die ganze Serie.
    expect(recurrenceScope({ ...emptyForm(), currentRecurrenceId: '20260602T090000' })).toEqual({
      recurrence_id: '20260602T090000',
      recurrence_range: 'THISANDFUTURE',
    });
  });
});

describe('Formular im Ganzen', () => {
  it('führt vom angeklickten Serientermin unverändert zurück zur gleichen Regel', () => {
    // Öffnen und ohne Änderung speichern darf die Serie nicht verschieben.
    const termin = terminApi({
      title: 'Sport',
      start: new Date('2026-06-02T17:00:00+02:00'),
      end: new Date('2026-06-02T18:00:00+02:00'),
      rrule: 'FREQ=WEEKLY;UNTIL=20261218T225959Z',
      recurrenceId: '20260602T090000',
    });

    const nutzlast = toPayload(formForExistingEvent(termin));

    expect(nutzlast).toEqual({
      summary: 'Sport',
      dtstart: '2026-06-02T17:00',
      dtend: '2026-06-02T18:00',
      rrule: 'FREQ=WEEKLY;UNTIL=20261218T225959Z',
    });
  });

  it('trägt einen ganztägigen Termin ohne Uhrzeit weiter', () => {
    const termin = terminApi({
      title: 'Urlaub',
      start: new Date('2026-07-06T00:00:00+02:00'),
      end: new Date('2026-07-13T00:00:00+02:00'),
      allDay: true,
    });

    const nutzlast = toPayload(formForExistingEvent(termin));

    expect(nutzlast.dtstart).toBe('2026-07-06');
    expect(nutzlast.dtend).toBe('2026-07-13');
  });
});
