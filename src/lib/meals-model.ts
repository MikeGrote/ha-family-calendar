import { startOfDay } from './agenda';

/** Der Wochenplan als Tage mit Mahlzeiten.
 *
 * Mealie liefert eine flache Liste von Eintraegen mit Datum und Art. Die
 * Karte zeigt Tage nebeneinander, jeder mit seinen Mahlzeiten in der
 * Reihenfolge, in der man sie isst - nicht in der, in der sie geplant
 * wurden.
 */

/** Die Arten, die Mealie kennt, in der Reihenfolge des Tages. */
export const MEAL_ORDER = [
  'breakfast',
  'lunch',
  'dinner',
  'side',
  'dessert',
  'snack',
  'drink',
] as const;

export type MealType = (typeof MEAL_ORDER)[number];

export const MEAL_LABELS: Record<string, string> = {
  breakfast: 'Frühstück',
  lunch: 'Mittag',
  dinner: 'Abend',
  side: 'Beilage',
  dessert: 'Nachtisch',
  snack: 'Snack',
  drink: 'Getränk',
};

const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

/** Ein geplanter Eintrag, wie die Integration ihn liefert. */
export interface MealEntry {
  date: string;
  type: string;
  recipeId: string;
  name: string;
  description: string;
  hasImage: boolean;
  image: string;
  totalTime: string;
  servings: number;
}

export interface MealDay {
  date: Date;
  /** Kennung des Tages, wie sie in den Eintraegen steht. */
  iso: string;
  weekday: string;
  dayNumber: number;
  isToday: boolean;
  meals: MealEntry[];
}

/** Datum als YYYY-MM-DD in Ortszeit.
 *
 * Nicht ueber toISOString: Das rechnet nach UTC, und abends waere der Tag
 * dann der falsche - dieselbe Falle wie an jeder anderen Stelle mit Datum.
 */
export function isoDate(date: Date): string {
  const monat = String(date.getMonth() + 1).padStart(2, '0');
  const tag = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${monat}-${tag}`;
}

/** Verteilt die Eintraege auf die Tage der Woche. */
export function groupMeals(
  entries: MealEntry[],
  weekStart: Date,
  days: number,
  today: Date = new Date(),
): MealDay[] {
  const heute = isoDate(today);
  const erster = startOfDay(weekStart);

  return Array.from({ length: days }, (_, versatz) => {
    const datum = new Date(erster);
    datum.setDate(datum.getDate() + versatz);
    const iso = isoDate(datum);

    return {
      date: datum,
      iso,
      weekday: WEEKDAYS[datum.getDay()],
      dayNumber: datum.getDate(),
      isToday: iso === heute,
      meals: entries.filter((e) => e.date === iso).sort(nachTagesordnung),
    };
  });
}

/** Fruehstueck vor Mittag vor Abend - unbekannte Arten ans Ende. */
function nachTagesordnung(a: MealEntry, b: MealEntry): number {
  return rang(a.type) - rang(b.type);
}

function rang(typ: string): number {
  const platz = MEAL_ORDER.indexOf(typ as MealType);
  return platz === -1 ? MEAL_ORDER.length : platz;
}

/** Beschriftung einer Art, ersatzweise die Art selbst. */
export function mealLabel(typ: string): string {
  return MEAL_LABELS[typ] ?? typ;
}

/** Erster Tag der Woche, die diesen Tag enthaelt - Montag. */
export function weekStartFor(date: Date): Date {
  const tag = startOfDay(date);
  // getDay liefert 0 fuer Sonntag; der gehoert zur Woche davor.
  const versatz = (tag.getDay() + 6) % 7;
  tag.setDate(tag.getDate() - versatz);
  return tag;
}
