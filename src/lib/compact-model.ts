import type { EventInput } from '@fullcalendar/core';

import type { EventExtendedProps } from '../types';
import { layoutOverlaps } from './day-layout';
import type { ClickedEvent } from './event-form';
import { DAY_MINUTES, type Span, buildTimeScale } from './time-scale';

/** Die Kompaktansicht als fertige Geometrie.
 *
 * Alles, was gerechnet werden muss, passiert hier - die Vorlage setzt nur
 * noch Bildpunkte. Das haelt die Rechnung pruefbar, denn genau an ihr
 * haengt die Aussage der Ansicht: Termine bleiben untereinander
 * massstabsgetreu, leere Zeit wird gestaucht und bleibt als Bruch sichtbar.
 */

const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

/** Darunter passt keine Beschriftung mehr hinein. Sehr kurze Termine
 *  werden dadurch etwas zu hoch gezeichnet - unlesbar waeren sie sonst. */
const MIN_BLOCK_PX = 15;

/** Auf Armlaenge gelesen sind dichte Beschriftungen unruhig. Lieber
 *  weniger Uhrzeiten - die genaue Zeit steht ohnehin am Termin. */
const MIN_TICK_ABSTAND_PX = 34;

/** Ein Termin der Woche: mit sicheren Zeiten und der Farbe seines
 *  Kalenders. ClickedEvent laesst beides offen, weil das Formular damit
 *  umgehen kann - beim Zeichnen waere jede Pruefung darauf nur Rauschen. */
interface WeekEvent extends ClickedEvent {
  start: Date;
  end: Date;
  color: string;
}
const TICK_SCHRITTE = [30, 60, 120, 180, 360];

export interface CompactBlock {
  event: ClickedEvent;
  color: string;
  top: number;
  height: number;
  lane: number;
  lanes: number;
  /** Zeitspanne als Text; bei mehrtaegigen Terminen mit "ab"/"bis". */
  time: string;
}

export interface CompactAllDay {
  event: ClickedEvent;
  color: string;
}

export interface CompactDay {
  date: Date;
  weekday: string;
  dayNumber: number;
  isToday: boolean;
  allDay: CompactAllDay[];
  blocks: CompactBlock[];
}

export interface CompactTick {
  y: number;
  label: string;
}

export interface CompactGap {
  top: number;
  height: number;
  /** Uebersprungene Dauer, etwa "6 Std". */
  label: string;
}

export interface CompactWeek {
  days: CompactDay[];
  ticks: CompactTick[];
  gaps: CompactGap[];
  height: number;
  /** Kein Termin mit Uhrzeit - dann gibt es keine sinnvolle Achse. */
  empty: boolean;
}

/** Baut die Woche aus den bereits gefilterten Terminen. */
export function buildCompactWeek(
  events: EventInput[],
  weekStart: Date,
  dayCount: number,
  budgetPx: number,
  today: Date = new Date(),
): CompactWeek {
  const termine = events.map(toWeekEvent).filter((e): e is WeekEvent => e !== null);
  const tage = tagesliste(weekStart, dayCount);
  const heute = startOfDay(today).getTime();

  const belegung: Span[] = [];
  const proTag = tage.map((datum) => {
    const beginn = datum;
    const ende = naechsterTag(datum);
    const mitUhrzeit = termine.filter((e) => !e.allDay && e.start < ende && e.end > beginn);
    for (const termin of mitUhrzeit) belegung.push(spanFor(termin, beginn, ende));
    return { datum, mitUhrzeit };
  });

  const scale = buildTimeScale(belegung, budgetPx);

  const days: CompactDay[] = proTag.map(({ datum, mitUhrzeit }) => ({
    date: datum,
    weekday: WEEKDAYS[datum.getDay()],
    dayNumber: datum.getDate(),
    isToday: datum.getTime() === heute,
    allDay: termine
      .filter((e) => e.allDay && e.start < naechsterTag(datum) && e.end > datum)
      .map((event) => ({ event, color: event.color })),
    blocks: scale ? bloecke(mitUhrzeit, datum, scale.yOf) : [],
  }));

  if (!scale) {
    return { days, ticks: [], gaps: [], height: 0, empty: true };
  }

  return {
    days,
    ticks: ticks(scale.segments, scale.pxPerMinute, scale.yOf),
    gaps: scale.segments
      .filter((s) => s.kind === 'gap')
      .map((s) => ({ top: s.top, height: s.height, label: dauerText(s.to - s.from) })),
    height: scale.height,
    empty: false,
  };
}

/** Die Bloecke eines Tages, nebeneinander wo sie sich ueberschneiden. */
function bloecke(
  termine: WeekEvent[],
  datum: Date,
  yOf: (minutes: number) => number,
): CompactBlock[] {
  const ende = naechsterTag(datum);
  const spans = new Map<WeekEvent, Span>(
    termine.map((termin) => [termin, spanFor(termin, datum, ende)]),
  );

  return layoutOverlaps(
    termine,
    (t) => spans.get(t)!.from,
    (t) => spans.get(t)!.to,
  ).map(({ item, lane, lanes }) => {
    const span = spans.get(item)!;
    const top = yOf(span.from);
    return {
      event: item,
      color: item.color,
      top,
      height: Math.max(MIN_BLOCK_PX, yOf(span.to) - top),
      lane,
      lanes,
      time: zeitText(item, datum, ende),
    };
  });
}

/** Stundenbeschriftungen - nur dort, wo die Achse nicht gestaucht ist. */
function ticks(
  segments: { kind: 'busy' | 'gap'; from: number; to: number }[],
  pxPerMinute: number,
  yOf: (minutes: number) => number,
): CompactTick[] {
  const schritt =
    TICK_SCHRITTE.find((s) => s * pxPerMinute >= MIN_TICK_ABSTAND_PX) ??
    TICK_SCHRITTE[TICK_SCHRITTE.length - 1];

  const ergebnis: CompactTick[] = [];
  for (const segment of segments) {
    if (segment.kind !== 'busy') continue;
    const erster = Math.ceil(segment.from / schritt) * schritt;
    for (let m = erster; m <= segment.to; m += schritt) {
      ergebnis.push({ y: yOf(m), label: uhrzeit(m) });
    }
  }
  return ergebnis;
}

// ------------------------------------------------------------- Hilfsmittel

function spanFor(event: WeekEvent, tagBeginn: Date, tagEnde: Date): Span {
  const from = event.start <= tagBeginn ? 0 : minutenImTag(event.start);
  const to = event.end >= tagEnde ? DAY_MINUTES : minutenImTag(event.end);
  return { from, to: Math.max(to, from + 1) };
}

function zeitText(event: WeekEvent, tagBeginn: Date, tagEnde: Date): string {
  const beginntHeute = event.start >= tagBeginn;
  const endetHeute = event.end <= tagEnde;
  if (beginntHeute && endetHeute) return `${uhr(event.start)} – ${uhr(event.end)}`;
  if (beginntHeute) return `ab ${uhr(event.start)}`;
  if (endetHeute) return `bis ${uhr(event.end)}`;
  return 'durchgehend';
}

/** Uebersprungene Dauer, kurz genug fuer die schmale Achsenspalte. */
function dauerText(minuten: number): string {
  const gerundet = Math.round(minuten);
  const stunden = Math.floor(gerundet / 60);
  const rest = gerundet % 60;
  if (stunden === 0) return `${rest} Min`;
  if (rest === 0) return `${stunden} Std`;
  return `${stunden}:${String(rest).padStart(2, '0')} Std`;
}

function minutenImTag(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

function uhr(date: Date): string {
  return uhrzeit(minutenImTag(date));
}

function uhrzeit(minuten: number): string {
  const h = Math.floor(minuten / 60);
  const m = Math.round(minuten % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function tagesliste(weekStart: Date, dayCount: number): Date[] {
  const erster = startOfDay(weekStart);
  return Array.from({ length: dayCount }, (_, i) => {
    const tag = new Date(erster);
    tag.setDate(tag.getDate() + i);
    return tag;
  });
}

function startOfDay(date: Date): Date {
  const kopie = new Date(date);
  kopie.setHours(0, 0, 0, 0);
  return kopie;
}

function naechsterTag(date: Date): Date {
  const kopie = new Date(date);
  kopie.setDate(kopie.getDate() + 1);
  return kopie;
}

/** Ein FullCalendar-Eintrag als das, was Anzeige und Formular brauchen. */
function toWeekEvent(event: EventInput): WeekEvent | null {
  const start = toDate(event.start);
  if (!start) return null;
  const end = toDate(event.end) ?? start;

  return {
    id: typeof event.id === 'string' ? event.id : '',
    title: event.title ?? '',
    start,
    end,
    allDay: event.allDay === true,
    extendedProps: (event.extendedProps ?? {}) as EventExtendedProps,
    color: typeof event.backgroundColor === 'string' ? event.backgroundColor : '#0078d4',
  };
}

function toDate(value: unknown): Date | null {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value !== 'string') return null;
  // Ein reines Datum liest der Browser sonst als UTC - der ganztaegige
  // Termin laege dann in Berlin um 02:00 und damit im falschen Tag.
  const text = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value;
  const datum = new Date(text);
  return Number.isNaN(datum.getTime()) ? null : datum;
}
