import type { HomeAssistant } from 'custom-card-helpers';
import { LitElement, type TemplateResult, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { type MealPlan, type Recipe, fetchMealPlan, fetchRecipe } from './lib/meals-api';
import { type MealEntry, groupMeals, isoDate, weekStartFor } from './lib/meals-model';
import { mealsStyles } from './styles/meals';
import { recipeStyles } from './styles/recipe';
import { tokenStyles } from './styles/tokens';
import { renderMeals } from './templates/meals';
import { renderRecipe } from './templates/recipe';
import type { MealsConfig } from './types';

/** Essensplan und Rezepte.
 *
 * Die Daten kommen aus Mealie, geholt ueber unsere eigene Integration - der
 * Browser am Panel erreicht das Add-on nicht selbst. Ohne eingerichtetes
 * Mealie zeigt die Karte, was fehlt, statt leer zu bleiben.
 */

const DEFAULT_DAYS = 7;

/** Der Plan aendert sich selten; oefter zu fragen brächte nichts. */
const REFRESH_MS = 10 * 60 * 1000;

@customElement('family-meals')
export class FamilyMeals extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: MealsConfig;

  @state() private weekStart = weekStartFor(new Date());
  @state() private plan: MealPlan = { ready: true, reason: '', entries: [] };
  @state() private loading = true;

  @state() private recipe: Recipe | null = null;
  @state() private recipeOffen = false;
  @state() private recipeLoading = false;
  @state() private recipeFehler = '';
  @state() private doneIngredients = new Set<string>();
  @state() private doneSteps = new Set<string>();
  @state() private currentStep = '';

  private timer?: number;
  private started = false;

  setConfig(config: MealsConfig): void {
    this.config = config;
  }

  getCardSize(): number {
    return 10;
  }

  updated(): void {
    if (this.hass && !this.started) {
      this.started = true;
      void this.load();
      this.timer = window.setInterval(() => void this.load(), REFRESH_MS);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.timer !== undefined) clearInterval(this.timer);
    this.timer = undefined;
    this.started = false;
  }

  render(): TemplateResult {
    const tage = this.config?.days ?? DEFAULT_DAYS;

    return html`
      <ha-card>
        ${renderMeals({
          days: groupMeals(this.plan.entries, this.weekStart, tage),
          title: this.titel(tage),
          loading: this.loading,
          setupReason: this.plan.ready ? '' : this.plan.reason,
          onPrev: () => this.verschiebe(-tage),
          onNext: () => this.verschiebe(tage),
          onToday: () => this.setzeWoche(weekStartFor(new Date())),
          onMeal: (eintrag) => void this.oeffneRezept(eintrag),
        })}
      </ha-card>
      ${this.recipeOffen ? this.renderRezept() : nothing}
    `;
  }

  private renderRezept(): TemplateResult {
    return renderRecipe({
      recipe: this.recipe,
      loading: this.recipeLoading,
      fehler: this.recipeFehler,
      doneIngredients: this.doneIngredients,
      doneSteps: this.doneSteps,
      currentStep: this.currentStep,
      onClose: () => this.schliesseRezept(),
      onIngredient: (id) => (this.doneIngredients = umschalten(this.doneIngredients, id)),
      onStep: (id) => (this.currentStep = this.currentStep === id ? '' : id),
      onStepDone: (id) => (this.doneSteps = umschalten(this.doneSteps, id)),
    });
  }

  // ----------------------------------------------------------------- Daten

  private async load(): Promise<void> {
    const tage = this.config?.days ?? DEFAULT_DAYS;
    const ende = new Date(this.weekStart);
    ende.setDate(ende.getDate() + tage - 1);

    this.loading = true;
    try {
      this.plan = await fetchMealPlan(this.hass, isoDate(this.weekStart), isoDate(ende));
    } catch (err) {
      console.error('Family Meals: Plan nicht abrufbar', err);
      this.plan = { ready: false, reason: 'error', entries: [] };
    } finally {
      this.loading = false;
    }
  }

  private setzeWoche(start: Date): void {
    this.weekStart = start;
    void this.load();
  }

  private verschiebe(tage: number): void {
    const neu = new Date(this.weekStart);
    neu.setDate(neu.getDate() + tage);
    this.setzeWoche(neu);
  }

  // --------------------------------------------------------------- Rezept

  private async oeffneRezept(eintrag: MealEntry): Promise<void> {
    if (!eintrag.recipeId) return;

    // Jeder Kochvorgang faengt bei null an - abgehakte Schritte von
    // vorgestern waeren nur verwirrend.
    this.recipeOffen = true;
    this.recipe = null;
    this.recipeFehler = '';
    this.recipeLoading = true;
    this.doneIngredients = new Set();
    this.doneSteps = new Set();
    this.currentStep = '';

    try {
      this.recipe = await fetchRecipe(this.hass, eintrag.recipeId);
    } catch (err) {
      console.error('Family Meals: Rezept nicht abrufbar', err);
      this.recipeFehler = 'Das Rezept ließ sich nicht holen.';
    } finally {
      this.recipeLoading = false;
    }
  }

  private schliesseRezept(): void {
    this.recipeOffen = false;
    this.recipe = null;
  }

  // --------------------------------------------------------------- Helfer

  private titel(tage: number): string {
    const ende = new Date(this.weekStart);
    ende.setDate(ende.getDate() + tage - 1);
    const kurz = (d: Date, mitJahr = false): string =>
      d.toLocaleDateString('de-DE', {
        day: 'numeric',
        month: 'short',
        ...(mitJahr ? { year: 'numeric' } : {}),
      });
    return `${kurz(this.weekStart)} – ${kurz(ende, true)}`;
  }

  static styles = [tokenStyles, mealsStyles, recipeStyles];
}

/** Ein Eintrag umschalten - immer als neue Menge, damit Lit es merkt. */
function umschalten(menge: Set<string>, id: string): Set<string> {
  const neu = new Set(menge);
  if (!neu.delete(id)) neu.add(id);
  return neu;
}

declare global {
  interface HTMLElementTagNameMap {
    'family-meals': FamilyMeals;
  }
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: 'family-meals',
  name: 'Family Meals',
  description: 'Essensplan und Rezepte aus Mealie, für die Küche gemacht.',
  preview: false,
});
