import { html, type TemplateResult } from 'lit';

import type { TaskFrequency } from '../lib/todo-recurrence';

/** Detailansicht einer Aufgabe: aendern, Rhythmus zuruecksetzen, loeschen. */

export interface TaskDialogContext {
  title: string;
  due: string;
  frequency: TaskFrequency;
  interval: number;
  listName: string;
  confirmDelete: boolean;
  onTitle: (value: string) => void;
  onDue: (value: string) => void;
  onFrequency: (value: TaskFrequency) => void;
  onInterval: (value: number) => void;
  onConfirmDelete: () => void;
  onDelete: () => void;
  onCancel: () => void;
  onSave: () => void;
}

const text = (e: Event): string => (e.target as HTMLInputElement | HTMLSelectElement).value;

export function renderTaskDialog(ctx: TaskDialogContext): TemplateResult {
  return html`
    <div class="dialog-overlay" @click=${() => ctx.onCancel()}>
      <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
        <h3>Aufgabe</h3>
        <p class="dialog-list">${ctx.listName}</p>

        <label class="field">
          Titel
          <input type="text" .value=${ctx.title} @input=${(e: Event) => ctx.onTitle(text(e))} />
        </label>

        <label class="field">
          Fällig am
          <input type="date" .value=${ctx.due} @input=${(e: Event) => ctx.onDue(text(e))} />
        </label>

        <label class="field">
          Wiederholung
          <select
            .value=${ctx.frequency}
            @change=${(e: Event) => ctx.onFrequency(text(e) as TaskFrequency)}
          >
            <option value="">Keine</option>
            <option value="DAILY">Täglich</option>
            <option value="WEEKLY">Wöchentlich</option>
            <option value="MONTHLY">Monatlich</option>
            <option value="YEARLY">Jährlich</option>
          </select>
        </label>

        ${ctx.frequency
          ? html`
              <label class="field">
                Alle … Male
                <input
                  type="number"
                  min="1"
                  max="30"
                  .value=${String(ctx.interval)}
                  @input=${(e: Event) =>
                    ctx.onInterval(Math.max(1, Number.parseInt(text(e), 10) || 1))}
                />
              </label>
              <p class="dialog-hint">
                Nach dem Abhaken erscheint die Aufgabe automatisch wieder.
              </p>
            `
          : html`
              <p class="dialog-hint">
                Ohne Wiederholung bleibt die Aufgabe nach dem Abhaken erledigt.
              </p>
            `}

        <div class="dialog-actions">
          ${ctx.confirmDelete
            ? html`
                <button class="btn-delete btn-delete--confirm" @click=${() => ctx.onDelete()}>
                  Wirklich löschen?
                </button>
              `
            : html`
                <button class="btn-delete" @click=${() => ctx.onConfirmDelete()}>Löschen</button>
              `}
          <button class="btn-cancel" @click=${() => ctx.onCancel()}>Abbrechen</button>
          <button class="btn-save" @click=${() => ctx.onSave()}>Speichern</button>
        </div>
      </div>
    </div>
  `;
}
