import { type TemplateResult, html } from 'lit';

import { gruppe, schalter, text, zeile } from './settings';
import { type EntityListContext, renderEntityList } from './settings-entities';

/** Abschnitt "Aufgaben": je Aufgabenkarte ein eigener Satz Spalten.
 *
 * Getrennt, weil im Panel zwei solche Karten stehen - Aufgaben und Listen.
 * Ein gemeinsamer Eintrag hiesse, dass eine die andere ueberschreibt.
 */

export interface TaskSetContext extends EntityListContext {
  key: string;
  /** Ueberschrift des Bereichs, wie sie in der Seitenleiste steht. */
  bereich: string;
  title: string;
  showCompleted: boolean;
  showDue: boolean;
  onTitle: (titel: string) => void;
  onShowCompleted: (an: boolean) => void;
  onShowDue: (an: boolean) => void;
}

export interface TasksContext {
  sets: TaskSetContext[];
  /** Konnte die Dashboard-Konfiguration nicht gelesen werden. */
  fehler: string;
}

export function renderTaskSettings(ctx: TasksContext): TemplateResult {
  if (ctx.fehler) {
    return gruppe('Aufgaben', html`<p class="set-fussnote">${ctx.fehler}</p>`);
  }

  if (ctx.sets.length === 0) {
    return gruppe(
      'Aufgaben',
      html`<p class="set-leer">
        <ha-icon icon="mdi:playlist-remove"></ha-icon>
        In diesem Panel gibt es keine Aufgabenkarte.
      </p>`,
    );
  }

  return html`${ctx.sets.map((satz) => renderSet(satz))}`;
}

function renderSet(satz: TaskSetContext): TemplateResult {
  return gruppe(
    satz.bereich,
    html`
      ${renderEntityList(satz)}
      ${zeile(
        'Überschrift',
        'Steht über allen Spalten. Leer lassen, wenn keine gebraucht wird.',
        text(satz.title, 'ohne Überschrift', satz.onTitle),
      )}
      ${zeile(
        'Erledigte mitzeigen',
        'Abgehakte Einträge bleiben sichtbar, ans Ende sortiert.',
        schalter(satz.showCompleted, satz.onShowCompleted),
      )}
      ${zeile(
        'Fälligkeiten zeigen',
        'Zeigt "Heute", "Morgen" oder das Datum an jedem Eintrag.',
        schalter(satz.showDue, satz.onShowDue),
      )}
    `,
  );
}
