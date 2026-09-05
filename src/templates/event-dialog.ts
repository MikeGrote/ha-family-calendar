import { html, type TemplateResult } from 'lit';

import type { RecurrenceFrequency } from '../types';

/** Formular zum Anlegen und Bearbeiten eines Termins. */

export interface EventDialogContext {
  editMode: boolean;
  isSeries: boolean;
  confirmDelete: boolean;
  isAllDay: boolean;
  title: string;
  calendar: string;
  start: string;
  end: string;
  frequency: RecurrenceFrequency;
  until: string;
  entities: string[];
  nameOf: (entityId: string) => string;
  onTitle: (value: string) => void;
  onCalendar: (value: string) => void;
  onAllDay: (value: boolean) => void;
  onStart: (value: string) => void;
  onEnd: (value: string) => void;
  onFrequency: (value: string) => void;
  onUntil: (value: string) => void;
  onConfirmDelete: () => void;
  onDelete: () => void;
  onCancel: () => void;
  onSave: () => void;
}

const text = (e: Event): string => (e.target as HTMLInputElement | HTMLSelectElement).value;

export function renderEventDialog(ctx: EventDialogContext): TemplateResult {
  const dateType = ctx.isAllDay ? 'date' : 'datetime-local';

  return html`
    <div class="modal-overlay" @click=${() => ctx.onCancel()}>
      <div class="modal-content" @click=${(e: Event) => e.stopPropagation()}>
        <h3>${ctx.editMode ? 'Termin bearbeiten' : 'Neuer Termin'}</h3>

        <div class="form-group">
          <label>Titel</label>
          <input
            type="text"
            .value=${ctx.title}
            @input=${(e: Event) => ctx.onTitle(text(e))}
            placeholder="Termin Titel"
            autofocus
          />
        </div>

        ${renderCalendarField(ctx)}

        <div class="form-group form-group--inline">
          <label>
            <input
              type="checkbox"
              .checked=${ctx.isAllDay}
              @change=${(e: Event) => ctx.onAllDay((e.target as HTMLInputElement).checked)}
            />
            Ganztägig
          </label>
        </div>

        <div class="form-group">
          <label>Von</label>
          <input type=${dateType} .value=${ctx.start} @input=${(e: Event) => ctx.onStart(text(e))} />
        </div>

        <div class="form-group">
          <label>Bis</label>
          <input type=${dateType} .value=${ctx.end} @input=${(e: Event) => ctx.onEnd(text(e))} />
        </div>

        ${renderRecurrence(ctx)}

        <div class="modal-actions">
          ${ctx.editMode ? renderDeleteButton(ctx) : ''}
          <button class="btn-cancel" @click=${() => ctx.onCancel()}>Abbrechen</button>
          <button class="btn-save" @click=${() => ctx.onSave()}>
            ${ctx.editMode ? 'Aktualisieren' : 'Speichern'}
          </button>
        </div>
      </div>
    </div>
  `;
}

/** Beim Bearbeiten als feste Zeile.
 *
 * Als gesperrte Auswahlliste zeigte das Feld den ersten Eintrag statt des
 * echten Werts: Lit setzt den Wert, bevor die Optionen im DOM stehen.
 */
function renderCalendarField(ctx: EventDialogContext): TemplateResult {
  return html`
    <div class="form-group">
      <label>Kalender</label>
      ${ctx.editMode
        ? html`<p class="readonly-value">${ctx.nameOf(ctx.calendar)}</p>`
        : html`
            <select .value=${ctx.calendar} @change=${(e: Event) => ctx.onCalendar(text(e))}>
              ${ctx.entities.map(
                (entityId) => html`<option value=${entityId}>${ctx.nameOf(entityId)}</option>`,
              )}
            </select>
          `}
    </div>
  `;
}

/** Wiederholung und Serienende.
 *
 * Beim Bearbeiten laesst Home Assistant die Regel nur aendern, wenn eine
 * Serieninstanz angesprochen wird - fuer einen Einzeltermin ist der Weg
 * versperrt. Deshalb erscheinen die Felder dort nicht.
 */
function renderRecurrence(ctx: EventDialogContext): TemplateResult {
  if (ctx.editMode && !ctx.isSeries) {
    return html`
      <div class="form-group">
        <label>Wiederholung</label>
        <p class="readonly-value">Keine</p>
      </div>
    `;
  }

  return html`
    <div class="form-group">
      <label>Wiederholung</label>
      <select .value=${ctx.frequency} @change=${(e: Event) => ctx.onFrequency(text(e))}>
        ${ctx.isSeries ? '' : html`<option value="">Keine</option>`}
        <option value="DAILY">Täglich</option>
        <option value="WEEKLY">Wöchentlich</option>
        <option value="MONTHLY">Monatlich</option>
        <option value="YEARLY">Jährlich</option>
      </select>
    </div>
    ${ctx.frequency ? renderUntilField(ctx) : ''}
  `;
}

function renderUntilField(ctx: EventDialogContext): TemplateResult {
  return html`
    <div class="form-group">
      <label>Serie endet am</label>
      <input type="date" .value=${ctx.until} @input=${(e: Event) => ctx.onUntil(text(e))} />
      <p class="field-hint">
        ${ctx.until ? '' : 'Leer lassen für eine Serie ohne Ende. '}
        ${ctx.isSeries ? 'Änderungen gelten ab diesem Termin, frühere bleiben stehen.' : ''}
      </p>
    </div>
  `;
}

/** Zweistufiges Loeschen statt confirm(): erst Klick, dann Bestaetigung. */
function renderDeleteButton(ctx: EventDialogContext): TemplateResult {
  if (!ctx.confirmDelete) {
    return html`<button class="btn-delete" @click=${() => ctx.onConfirmDelete()}>Löschen</button>`;
  }
  return html`
    <button class="btn-delete btn-delete--confirm" @click=${() => ctx.onDelete()}>
      Wirklich löschen?
    </button>
  `;
}
