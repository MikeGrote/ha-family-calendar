import { describe, expect, it } from 'vitest';

import {
  MEAL_ORDER,
  type MealEntry,
  groupMeals,
  isoDate,
  mealLabel,
  weekStartFor,
} from '../../src/lib/meals-model';

/** Der Plan kommt flach mit Datum und Art. Die Karte zeigt Tage. Geht dabei
 *  ein Tag verloren oder rutscht eine Mahlzeit in den falschen, merkt man es
 *  erst beim Kochen. */

function eintrag(date: string, type: string, name = 'Etwas'): MealEntry {
  return {
    date,
    type,
    name,
    recipeId: 'r',
    description: '',
    hasImage: false,
    image: '',
    totalTime: '',
    servings: 0,
  };
}

describe('isoDate', () => {
  it('nimmt den örtlichen Tag', () => {
    expect(isoDate(new Date('2026-09-07T10:00:00+02:00'))).toBe('2026-09-07');
  });

  it('bleibt abends beim richtigen Tag', () => {
    // Über toISOString wäre das schon der Folgetag.
    expect(isoDate(new Date('2026-09-07T23:30:00+02:00'))).toBe('2026-09-07');
  });

  it('füllt einstellige Werte auf', () => {
    expect(isoDate(new Date('2026-01-05T12:00:00+01:00'))).toBe('2026-01-05');
  });
});

describe('weekStartFor', () => {
  it.each([
    ['Montag', '2026-09-07', '2026-09-07'],
    ['Mittwoch', '2026-09-09', '2026-09-07'],
    ['Sonntag', '2026-09-13', '2026-09-07'],
    ['Samstag', '2026-09-12', '2026-09-07'],
  ])('findet von %s aus den Montag', (_tag, datum, erwartet) => {
    // Der Sonntag gehört zur Woche davor - sonst stünde er allein.
    expect(isoDate(weekStartFor(new Date(`${datum}T12:00:00`)))).toBe(erwartet);
  });

  it('setzt die Uhrzeit auf Mitternacht', () => {
    expect(weekStartFor(new Date('2026-09-09T17:42:00')).getHours()).toBe(0);
  });
});

describe('groupMeals', () => {
  const montag = new Date('2026-09-07T00:00:00');

  it('liefert genau so viele Tage wie angefordert', () => {
    const tage = groupMeals([], montag, 7, montag);
    expect(tage).toHaveLength(7);
    expect(tage.map((t) => t.dayNumber)).toEqual([7, 8, 9, 10, 11, 12, 13]);
    expect(tage.map((t) => t.weekday)).toEqual(['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']);
  });

  it('ordnet einen Eintrag seinem Tag zu', () => {
    const tage = groupMeals([eintrag('2026-09-09', 'dinner')], montag, 7, montag);
    expect(tage.map((t) => t.meals.length)).toEqual([0, 0, 1, 0, 0, 0, 0]);
  });

  it('lässt Einträge außerhalb der Woche weg', () => {
    const tage = groupMeals(
      [eintrag('2026-09-01', 'dinner'), eintrag('2026-09-20', 'dinner')],
      montag,
      7,
      montag,
    );
    expect(tage.flatMap((t) => t.meals)).toEqual([]);
  });

  it('sortiert nach der Reihenfolge des Tages, nicht nach Eingang', () => {
    const tage = groupMeals(
      [
        eintrag('2026-09-07', 'dinner', 'Abendessen'),
        eintrag('2026-09-07', 'breakfast', 'Müsli'),
        eintrag('2026-09-07', 'lunch', 'Suppe'),
      ],
      montag,
      7,
      montag,
    );

    expect(tage[0].meals.map((m) => m.name)).toEqual(['Müsli', 'Suppe', 'Abendessen']);
  });

  it('stellt unbekannte Arten ans Ende', () => {
    const tage = groupMeals(
      [eintrag('2026-09-07', 'brunch', 'Unbekannt'), eintrag('2026-09-07', 'dinner', 'Abend')],
      montag,
      7,
      montag,
    );

    expect(tage[0].meals.map((m) => m.name)).toEqual(['Abend', 'Unbekannt']);
  });

  it('markiert den heutigen Tag', () => {
    const tage = groupMeals([], montag, 7, new Date('2026-09-10T08:00:00'));
    expect(tage.map((t) => t.isToday)).toEqual([false, false, false, true, false, false, false]);
  });

  it('markiert keinen Tag, wenn heute außerhalb der Woche liegt', () => {
    const tage = groupMeals([], montag, 7, new Date('2026-10-01T08:00:00'));
    expect(tage.some((t) => t.isToday)).toBe(false);
  });

  it('verändert die übergebene Liste nicht', () => {
    const eintraege = [eintrag('2026-09-07', 'dinner'), eintrag('2026-09-07', 'breakfast')];
    groupMeals(eintraege, montag, 7, montag);
    expect(eintraege.map((e) => e.type)).toEqual(['dinner', 'breakfast']);
  });

  it('bleibt über die Zeitumstellung auf ganzen Tagen', () => {
    const tage = groupMeals([], new Date('2026-10-19T00:00:00'), 7, montag);
    expect(tage.map((t) => t.dayNumber)).toEqual([19, 20, 21, 22, 23, 24, 25]);
    expect(tage.every((t) => t.date.getHours() === 0)).toBe(true);
  });
});

describe('mealLabel', () => {
  it('übersetzt die bekannten Arten', () => {
    expect(mealLabel('breakfast')).toBe('Frühstück');
    expect(mealLabel('dinner')).toBe('Abend');
  });

  it('lässt Unbekanntes stehen, statt es zu verschlucken', () => {
    expect(mealLabel('brunch')).toBe('brunch');
  });

  it('hat für jede bekannte Art eine Beschriftung', () => {
    for (const typ of MEAL_ORDER) {
      expect(mealLabel(typ)).not.toBe(typ);
    }
  });
});
