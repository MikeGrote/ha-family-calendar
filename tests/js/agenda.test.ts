import { describe, expect, it } from 'vitest';

import { dayLabel, groupByDay, startOfDay, timeLabel, toEntry } from '../../src/lib/agenda';
import type { AgendaEntry, HassCalendarEvent } from '../../src/types';

/** Die Übersicht verteilt Termine auf Tage. Zwei Fallen liegen hier: ein
 *  mehrtägiger Termin muss an jedem betroffenen Tag auftauchen, und ein
 *  ganztägiger endet in der Schnittstelle am Folgetag - er darf dort nicht
 *  noch einmal erscheinen. */

const KANN_DEUTSCH = Intl.DateTimeFormat.supportedLocalesOf(['de-DE']).length > 0;

function uhrzeit(datum: Date): string {
  return datum.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

function eintrag(teil: Partial<AgendaEntry> & { start: Date; end: Date }): AgendaEntry {
  return {
    uid: teil.uid ?? 'u1',
    summary: teil.summary ?? 'Termin',
    color: teil.color ?? '#0078d4',
    calendarName: teil.calendarName ?? 'Mike',
    allDay: teil.allDay ?? false,
    start: teil.start,
    end: teil.end,
  };
}

describe('startOfDay', () => {
  it('setzt die Uhrzeit auf Mitternacht', () => {
    const anfang = startOfDay(new Date('2026-06-10T14:30:45+02:00'));
    expect(anfang.getHours()).toBe(0);
    expect(anfang.getMinutes()).toBe(0);
    expect(anfang.getSeconds()).toBe(0);
    expect(anfang.getMilliseconds()).toBe(0);
    expect(anfang.getDate()).toBe(10);
  });

  it('lässt den übergebenen Zeitpunkt unverändert', () => {
    const original = new Date('2026-06-10T14:30:00+02:00');
    const kopie = original.getTime();
    startOfDay(original);
    expect(original.getTime()).toBe(kopie);
  });

  it('nimmt den örtlichen Tag, nicht den von UTC', () => {
    // 23:30 UTC ist in Berlin schon der Folgetag.
    expect(startOfDay(new Date('2026-06-10T23:30:00Z')).getDate()).toBe(11);
  });
});

describe('dayLabel', () => {
  const heute = new Date('2026-06-10T14:30:00+02:00');

  it('nennt heute und morgen beim Namen', () => {
    expect(dayLabel(new Date('2026-06-10T08:00:00+02:00'), heute)).toBe('Heute');
    expect(dayLabel(new Date('2026-06-11T08:00:00+02:00'), heute)).toBe('Morgen');
  });

  it('nennt andere Tage mit dem Wochentag', () => {
    // 12.06.2026 ist ein Freitag.
    expect(dayLabel(new Date('2026-06-12T08:00:00+02:00'), heute)).toBe('Fr');
  });

  it('hängt nicht an der Uhrzeit', () => {
    // Kurz vor Mitternacht darf aus "Heute" nicht "Gestern" werden.
    expect(dayLabel(new Date('2026-06-10T23:59:00+02:00'), heute)).toBe('Heute');
    expect(dayLabel(new Date('2026-06-10T00:01:00+02:00'), heute)).toBe('Heute');
  });

  it('rechnet über die Zeitumstellung richtig', () => {
    // Der 29.03.2026 hat 23 Stunden, der 25.10.2026 hat 25.
    expect(dayLabel(new Date('2026-03-29T12:00:00+02:00'), new Date('2026-03-28T20:00:00+01:00')))
      .toBe('Morgen');
    expect(dayLabel(new Date('2026-10-25T12:00:00+01:00'), new Date('2026-10-24T20:00:00+02:00')))
      .toBe('Morgen');
  });
});

describe('toEntry', () => {
  it('übernimmt einen Termin mit Uhrzeit', () => {
    const event: HassCalendarEvent = {
      summary: 'Zahnarzt',
      uid: 'abc',
      location: 'Hauptstraße 1',
      start: { dateTime: '2026-06-10T09:00:00+02:00' },
      end: { dateTime: '2026-06-10T10:00:00+02:00' },
    };
    const e = toEntry(event, '#c2185b', 'Mike');
    expect(e.summary).toBe('Zahnarzt');
    expect(e.location).toBe('Hauptstraße 1');
    expect(e.color).toBe('#c2185b');
    expect(e.calendarName).toBe('Mike');
    expect(e.allDay).toBe(false);
    expect(e.start.getHours()).toBe(9);
  });

  it('legt einen ganztägigen Termin auf Mitternacht Ortszeit', () => {
    // Ohne angehängte Uhrzeit läse der Browser das Datum als UTC und der
    // Termin begänne in Berlin um 02:00 - beim Verteilen auf die Tage
    // wäre er dann am falschen Tag.
    const event: HassCalendarEvent = {
      summary: 'Feiertag',
      start: { date: '2026-10-03' },
      end: { date: '2026-10-04' },
    };
    const e = toEntry(event, '#888', 'Feiertage');
    expect(e.allDay).toBe(true);
    expect(e.start.getHours()).toBe(0);
    expect(e.start.getDate()).toBe(3);
  });

  it('erfindet eine Kennung, wenn der Termin keine hat', () => {
    // Abonnierte Kalender liefern oft keine uid. Ohne eigene Kennung
    // würde Lit beim Neuzeichnen Einträge durcheinanderbringen.
    const event: HassCalendarEvent = {
      summary: 'Feiertag',
      start: { date: '2026-10-03' },
      end: { date: '2026-10-04' },
    };
    expect(toEntry(event, '#888', 'Feiertage').uid).toBe('Feiertage-Feiertag-2026-10-03');
  });

  it('lässt einen fehlenden Ort weg, statt null zu übernehmen', () => {
    const event: HassCalendarEvent = {
      summary: 'Termin',
      start: { dateTime: '2026-06-10T09:00:00+02:00' },
      end: { dateTime: '2026-06-10T10:00:00+02:00' },
    };
    expect(toEntry(event, '#888', 'Mike').location).toBeUndefined();
  });
});

describe('groupByDay', () => {
  const heute = new Date('2026-06-10T14:30:00+02:00');

  it('liefert genau so viele Tage wie angefordert', () => {
    const tage = groupByDay([], 7, heute);
    expect(tage).toHaveLength(7);
    expect(tage.map((t) => t.date.getDate())).toEqual([10, 11, 12, 13, 14, 15, 16]);
  });

  it('beginnt jeden Tag um Mitternacht', () => {
    for (const tag of groupByDay([], 3, heute)) {
      expect(tag.date.getHours()).toBe(0);
    }
  });

  it('beschriftet die ersten beiden Tage mit Namen', () => {
    const tage = groupByDay([], 3, heute);
    expect(tage.map((t) => t.label)).toEqual(['Heute', 'Morgen', 'Fr']);
  });

  it('ordnet einen Termin seinem Tag zu', () => {
    const termin = eintrag({
      start: new Date('2026-06-11T09:00:00+02:00'),
      end: new Date('2026-06-11T10:00:00+02:00'),
    });
    const tage = groupByDay([termin], 3, heute);
    expect(tage[0].entries).toHaveLength(0);
    expect(tage[1].entries).toHaveLength(1);
    expect(tage[2].entries).toHaveLength(0);
  });

  it('zeigt einen mehrtägigen Termin an jedem betroffenen Tag', () => {
    // Sonst wäre ein laufender Urlaub ab dem zweiten Tag unsichtbar.
    const urlaub = eintrag({
      summary: 'Urlaub',
      allDay: true,
      start: new Date('2026-06-11T00:00:00+02:00'),
      end: new Date('2026-06-14T00:00:00+02:00'),
    });
    const tage = groupByDay([urlaub], 5, heute);
    expect(tage.map((t) => t.entries.length)).toEqual([0, 1, 1, 1, 0]);
  });

  it('zeigt einen ganztägigen Termin nicht am Tag seines Endes', () => {
    // Die Schnittstelle nennt als Ende den ersten Tag danach. Ein
    // eintägiger Termin darf deshalb nur an einem Tag stehen.
    const feiertag = eintrag({
      summary: 'Feiertag',
      allDay: true,
      start: new Date('2026-06-11T00:00:00+02:00'),
      end: new Date('2026-06-12T00:00:00+02:00'),
    });
    const tage = groupByDay([feiertag], 4, heute);
    expect(tage.map((t) => t.entries.length)).toEqual([0, 1, 0, 0]);
  });

  it('lässt Termine außerhalb des Zeitraums weg', () => {
    const vergangen = eintrag({
      uid: 'alt',
      start: new Date('2026-06-01T09:00:00+02:00'),
      end: new Date('2026-06-01T10:00:00+02:00'),
    });
    const spaeter = eintrag({
      uid: 'spaet',
      start: new Date('2026-07-01T09:00:00+02:00'),
      end: new Date('2026-07-01T10:00:00+02:00'),
    });
    const tage = groupByDay([vergangen, spaeter], 5, heute);
    expect(tage.flatMap((t) => t.entries)).toEqual([]);
  });

  it('zeigt einen Termin, der heute schon vorbei ist', () => {
    // Der Tag läuft noch; ein Termin von heute Vormittag gehört dazu.
    const vormittags = eintrag({
      start: new Date('2026-06-10T08:00:00+02:00'),
      end: new Date('2026-06-10T09:00:00+02:00'),
    });
    expect(groupByDay([vormittags], 2, heute)[0].entries).toHaveLength(1);
  });

  it('stellt ganztägige Termine vor die mit Uhrzeit', () => {
    const morgens = eintrag({
      uid: 'morgens',
      start: new Date('2026-06-10T08:00:00+02:00'),
      end: new Date('2026-06-10T09:00:00+02:00'),
    });
    const ganztags = eintrag({
      uid: 'ganztags',
      allDay: true,
      start: new Date('2026-06-10T00:00:00+02:00'),
      end: new Date('2026-06-11T00:00:00+02:00'),
    });
    const tag = groupByDay([morgens, ganztags], 1, heute)[0];
    expect(tag.entries.map((e) => e.uid)).toEqual(['ganztags', 'morgens']);
  });

  it('sortiert die Termine eines Tages nach Uhrzeit', () => {
    const spaet = eintrag({
      uid: 'spaet',
      start: new Date('2026-06-10T17:00:00+02:00'),
      end: new Date('2026-06-10T18:00:00+02:00'),
    });
    const frueh = eintrag({
      uid: 'frueh',
      start: new Date('2026-06-10T08:00:00+02:00'),
      end: new Date('2026-06-10T09:00:00+02:00'),
    });
    const tag = groupByDay([spaet, frueh], 1, heute)[0];
    expect(tag.entries.map((e) => e.uid)).toEqual(['frueh', 'spaet']);
  });

  it('bleibt über die Zeitumstellung auf ganzen Tagen', () => {
    // Ein Tag mit 23 oder 25 Stunden darf die Reihe nicht verschieben.
    const tage = groupByDay([], 4, new Date('2026-03-28T12:00:00+01:00'));
    expect(tage.map((t) => t.date.getDate())).toEqual([28, 29, 30, 31]);
    expect(tage.every((t) => t.date.getHours() === 0)).toBe(true);
  });

  it('bleibt auch über den langen Oktobertag auf ganzen Tagen', () => {
    const tage = groupByDay([], 4, new Date('2026-10-24T12:00:00+02:00'));
    expect(tage.map((t) => t.date.getDate())).toEqual([24, 25, 26, 27]);
    expect(tage.every((t) => t.date.getHours() === 0)).toBe(true);
  });

  it('bleibt am Monatsende auf dem richtigen Tag', () => {
    const tage = groupByDay([], 3, new Date('2026-01-30T12:00:00+01:00'));
    expect(tage.map((t) => `${t.date.getMonth() + 1}-${t.date.getDate()}`)).toEqual([
      '1-30',
      '1-31',
      '2-1',
    ]);
  });
});

describe('timeLabel', () => {
  const tag = startOfDay(new Date('2026-06-10T12:00:00+02:00'));

  it('nennt ganztägige Termine ganztägig', () => {
    const ganztags = eintrag({
      allDay: true,
      start: new Date('2026-06-10T00:00:00+02:00'),
      end: new Date('2026-06-11T00:00:00+02:00'),
    });
    expect(timeLabel(ganztags, tag)).toBe('Ganztägig');
  });

  it('nennt bei einem Termin an einem Tag Beginn und Ende', () => {
    const termin = eintrag({
      start: new Date('2026-06-10T09:00:00+02:00'),
      end: new Date('2026-06-10T10:30:00+02:00'),
    });
    expect(timeLabel(termin, tag)).toBe(`${uhrzeit(termin.start)} – ${uhrzeit(termin.end)}`);
  });

  it('nennt am ersten Tag eines mehrtägigen Termins nur den Beginn', () => {
    const termin = eintrag({
      start: new Date('2026-06-10T20:00:00+02:00'),
      end: new Date('2026-06-12T08:00:00+02:00'),
    });
    expect(timeLabel(termin, tag)).toBe(`ab ${uhrzeit(termin.start)}`);
  });

  it('nennt am letzten Tag nur das Ende', () => {
    const termin = eintrag({
      start: new Date('2026-06-08T20:00:00+02:00'),
      end: new Date('2026-06-10T08:00:00+02:00'),
    });
    expect(timeLabel(termin, tag)).toBe(`bis ${uhrzeit(termin.end)}`);
  });

  it('nennt einen durchlaufenden Tag ganztägig', () => {
    const termin = eintrag({
      start: new Date('2026-06-08T20:00:00+02:00'),
      end: new Date('2026-06-12T08:00:00+02:00'),
    });
    expect(timeLabel(termin, tag)).toBe('Ganztägig');
  });

  it.runIf(KANN_DEUTSCH)('schreibt die Uhrzeit im deutschen Format', () => {
    const termin = eintrag({
      start: new Date('2026-06-10T09:00:00+02:00'),
      end: new Date('2026-06-10T14:30:00+02:00'),
    });
    // Vierundzwanzig Stunden, führende Null, Gedankenstrich.
    expect(timeLabel(termin, tag)).toBe('09:00 – 14:30');
  });
});
