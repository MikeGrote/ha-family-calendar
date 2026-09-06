import { type TemplateResult, html } from 'lit';

import type { MealDay, MealEntry } from '../lib/meals-model';
import { mealLabel } from '../lib/meals-model';

/** Der Wochenplan: Tage nebeneinander, Mahlzeiten untereinander. */

export interface MealsContext {
  days: MealDay[];
  title: string;
  loading: boolean;
  /** Mealie ist nicht eingerichtet - dann sagen, was fehlt. */
  setupReason: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onMeal: (eintrag: MealEntry) => void;
}

export function renderMeals(ctx: MealsContext): TemplateResult {
  return html`
    <div class="mahl">
      <div class="mahl-nav">
        <button class="mahl-schritt" @click=${ctx.onPrev} aria-label="Woche zurück">
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </button>
        <button class="mahl-heute" @click=${ctx.onToday}>Heute</button>
        <span class="mahl-titel">${ctx.title}</span>
        <button class="mahl-schritt" @click=${ctx.onNext} aria-label="Woche vor">
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>
      </div>

      ${ctx.setupReason
        ? einrichtung(ctx.setupReason)
        : html`<div class="mahl-woche">${ctx.days.map((tag) => tagesspalte(tag, ctx))}</div>`}
    </div>
  `;
}

function tagesspalte(tag: MealDay, ctx: MealsContext): TemplateResult {
  return html`
    <div class="mahl-tag ${tag.isToday ? 'heute' : ''}">
      <div class="mahl-tag-kopf">
        <span class="mahl-wochentag">${tag.weekday}</span>
        <span class="mahl-tagzahl">${tag.dayNumber}</span>
      </div>
      <div class="mahl-liste">
        ${tag.meals.length === 0
          ? html`<span class="mahl-leer">${ctx.loading ? '' : '—'}</span>`
          : tag.meals.map((eintrag) => mahlzeit(eintrag, ctx))}
      </div>
    </div>
  `;
}

function mahlzeit(eintrag: MealEntry, ctx: MealsContext): TemplateResult {
  // Ohne Rezept ist es eine Notiz: nichts zum Aufschlagen, also auch kein
  // Knopf, der so tut als gaebe es etwas.
  const oeffnetSich = Boolean(eintrag.recipeId);

  return html`
    <button
      class="mahl-karte ${oeffnetSich ? '' : 'notiz'}"
      ?disabled=${!oeffnetSich}
      title=${eintrag.name}
      @click=${() => ctx.onMeal(eintrag)}
    >
      ${eintrag.image
        ? html`<img class="mahl-bild" src=${eintrag.image} alt="" />`
        : html`<span class="mahl-bild mahl-bild--leer"><ha-icon icon="mdi:silverware-fork-knife"></ha-icon></span>`}
      <span class="mahl-text">
        <span class="mahl-art">${mealLabel(eintrag.type)}</span>
        <span class="mahl-name">${eintrag.name}</span>
        ${eintrag.totalTime ? html`<span class="mahl-zeit">${eintrag.totalTime}</span>` : ''}
      </span>
    </button>
  `;
}

/** Was zu tun ist, solange Mealie fehlt. */
function einrichtung(grund: string): TemplateResult {
  if (grund === 'error') {
    return html`
      <div class="mahl-hinweis">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <div>
          <strong>Der Essensplan ließ sich nicht abrufen.</strong>
          <p>Läuft das Mealie-Add-on noch? Näheres steht im Protokoll von Home Assistant.</p>
        </div>
      </div>
    `;
  }

  return html`
    <div class="mahl-hinweis">
      <ha-icon icon="mdi:chef-hat"></ha-icon>
      <div>
        <strong>Mealie ist noch nicht eingerichtet.</strong>
        <p>
          Der Essensplan und die Rezepte kommen aus Mealie. Das Add-on läuft bereits — es
          fehlt die Verbindung: in Home Assistant unter <em>Geräte &amp; Dienste</em> die
          Integration <em>Mealie</em> hinzufügen, mit der Adresse
          <code>http://a0d7b954-mealie:9000</code> und einem Zugangsschlüssel aus Mealie.
        </p>
      </div>
    </div>
  `;
}
