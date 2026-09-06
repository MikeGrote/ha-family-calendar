import { type TemplateResult, html, nothing } from 'lit';

import type { Recipe } from '../lib/meals-api';

/** Das Rezept am Herd.
 *
 * Gross genug, um es aus zwei Metern mit mehligen Haenden zu lesen. Der
 * angetippte Schritt hebt seine Zutaten hervor - deshalb stehen Zutaten und
 * Zubereitung nebeneinander und nicht untereinander.
 */

export interface RecipeContext {
  recipe: Recipe | null;
  loading: boolean;
  fehler: string;
  /** Abgehakte Zutaten und Schritte - nur fuer diesen Kochvorgang. */
  doneIngredients: Set<string>;
  doneSteps: Set<string>;
  /** Der Schritt, an dem man gerade ist. */
  currentStep: string;
  onClose: () => void;
  onIngredient: (id: string) => void;
  onStep: (id: string) => void;
  onStepDone: (id: string) => void;
}

export function renderRecipe(ctx: RecipeContext): TemplateResult {
  return html`
    <div class="rez-schicht" @click=${ctx.onClose}>
      <div class="rez" @click=${(e: Event) => e.stopPropagation()}>
        <button class="rez-zu" @click=${ctx.onClose} aria-label="Schließen">
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
        ${inhalt(ctx)}
      </div>
    </div>
  `;
}

function inhalt(ctx: RecipeContext): TemplateResult {
  if (ctx.fehler) {
    return html`<p class="rez-hinweis">${ctx.fehler}</p>`;
  }
  if (!ctx.recipe) {
    return html`<p class="rez-hinweis">${ctx.loading ? 'Wird geholt …' : ''}</p>`;
  }

  const rezept = ctx.recipe;
  const hervorgehoben = zutatenDesSchritts(ctx);

  return html`
    ${kopf(rezept)}
    <div class="rez-spalten">
      <section class="rez-zutaten">
        <h3>Zutaten${rezept.servings ? html` <small>für ${mengeText(rezept.servings)}</small>` : ''}</h3>
        ${rezept.ingredients.length === 0
          ? html`<p class="rez-leer">Keine Zutaten hinterlegt.</p>`
          : html`<ul>
              ${rezept.ingredients.map(
                (zutat) => html`
                  <li
                    class="${ctx.doneIngredients.has(zutat.id) ? 'ab' : ''} ${hervorgehoben.has(zutat.id) ? 'dran' : ''}"
                    @click=${() => ctx.onIngredient(zutat.id)}
                  >
                    <span class="rez-haken"></span>
                    <span>${zutat.display}</span>
                  </li>
                `,
              )}
            </ul>`}
      </section>

      <section class="rez-schritte">
        <h3>Zubereitung</h3>
        ${rezept.instructions.length === 0
          ? html`<p class="rez-leer">Keine Zubereitung hinterlegt.</p>`
          : html`<ol>
              ${rezept.instructions.map((schritt, i) => schrittZeile(schritt, i, ctx))}
            </ol>`}
      </section>
    </div>
  `;
}

function kopf(rezept: Recipe): TemplateResult {
  return html`
    <div class="rez-kopf">
      ${rezept.image ? html`<img class="rez-bild" src=${rezept.image} alt="" />` : nothing}
      <div class="rez-kopf-text">
        <h2>${rezept.name}</h2>
        ${rezept.description ? html`<p class="rez-unter">${rezept.description}</p>` : nothing}
        <div class="rez-fakten">
          ${rezept.totalTime ? faktum('mdi:clock-outline', rezept.totalTime) : nothing}
          ${rezept.prepTime ? faktum('mdi:knife', `${rezept.prepTime} Vorbereitung`) : nothing}
          ${rezept.yield ? faktum('mdi:bowl-mix-outline', rezept.yield) : nothing}
        </div>
      </div>
    </div>
  `;
}

function faktum(icon: string, text: string): TemplateResult {
  return html`<span class="rez-faktum"><ha-icon icon=${icon}></ha-icon>${text}</span>`;
}

function schrittZeile(
  schritt: { id: string; title: string; text: string },
  index: number,
  ctx: RecipeContext,
): TemplateResult {
  const dran = ctx.currentStep === schritt.id;
  const fertig = ctx.doneSteps.has(schritt.id);

  return html`
    <li class="${dran ? 'dran' : ''} ${fertig ? 'ab' : ''}">
      <button class="rez-nr" @click=${() => ctx.onStepDone(schritt.id)} aria-label="Schritt abhaken">
        ${fertig ? html`<ha-icon icon="mdi:check"></ha-icon>` : index + 1}
      </button>
      <div class="rez-schritt-text" @click=${() => ctx.onStep(schritt.id)}>
        ${schritt.title ? html`<strong>${schritt.title}</strong>` : nothing}
        <p>${schritt.text}</p>
      </div>
    </li>
  `;
}

/** Die Zutaten des Schritts, an dem man gerade ist. */
function zutatenDesSchritts(ctx: RecipeContext): Set<string> {
  const schritt = ctx.recipe?.instructions.find((s) => s.id === ctx.currentStep);
  return new Set(schritt?.ingredientIds ?? []);
}

function mengeText(portionen: number): string {
  const gerundet = Math.round(portionen * 10) / 10;
  return gerundet === 1 ? '1 Portion' : `${String(gerundet).replace('.', ',')} Portionen`;
}
