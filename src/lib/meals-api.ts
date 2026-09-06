import type { HomeAssistant } from 'custom-card-helpers';

import type { MealEntry } from './meals-model';

/** Zugriff auf Essensplan und Rezepte.
 *
 * Gefragt wird unsere eigene Integration, nicht Mealie: Der Browser am
 * Panel erreicht das Add-on nicht, und die Kennung des Config-Entry kennt
 * er auch nicht. Beides loest die Integration auf.
 */

const DOMAIN = 'calendar_service_ext';

export interface MealPlan {
  /** Ist Mealie ueberhaupt eingerichtet? */
  ready: boolean;
  /** Warum nicht - "missing", "not_loaded" oder "error". */
  reason: string;
  entries: MealEntry[];
}

export interface Ingredient {
  id: string;
  display: string;
  note: string;
}

export interface Instruction {
  id: string;
  title: string;
  text: string;
  /** Zutaten, die zu diesem Schritt gehoeren. */
  ingredientIds: string[];
}

export interface Recipe {
  recipeId: string;
  name: string;
  description: string;
  totalTime: string;
  prepTime: string;
  performTime: string;
  servings: number;
  yield: string;
  image: string;
  originalUrl: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}

export async function fetchMealPlan(
  hass: HomeAssistant,
  startDate: string,
  endDate: string,
): Promise<MealPlan> {
  return hass.callWS<MealPlan>({
    type: `${DOMAIN}/meals/plan`,
    start_date: startDate,
    end_date: endDate,
  });
}

export async function fetchRecipe(hass: HomeAssistant, recipeId: string): Promise<Recipe> {
  const antwort = await hass.callWS<{ recipe: Recipe }>({
    type: `${DOMAIN}/meals/recipe`,
    recipe_id: recipeId,
  });
  return antwort.recipe;
}
