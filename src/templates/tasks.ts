import { html, type TemplateResult } from 'lit';

import type { TodoItem } from '../lib/todo-api';
import { dueLabel, isOverdue, openCount, sortItems } from '../lib/todo-model';
import { parseMarker, recurrenceLabel, type TaskFrequency } from '../lib/todo-recurrence';
import type { TodoListConfig } from '../types';

/** Markup der Aufgaben- und Listenkarte. */

/** Entwurf einer neuen Aufgabe, bevor sie angelegt wird. */
export interface TaskDraft {
  text: string;
  due: string;
  frequency: TaskFrequency;
  interval: number;
  expanded: boolean;
}

export interface TasksContext {
  lists: TodoListConfig[];
  items: Map<string, TodoItem[]>;
  drafts: Map<string, TaskDraft>;
  showCompleted: boolean;
  showDue: boolean;
  title?: string;
  nameOf: (entityId: string) => string;
  onToggle: (entityId: string, item: TodoItem) => void;
  onOpen: (entityId: string, item: TodoItem) => void;
  onDraft: (entityId: string, changes: Partial<TaskDraft>) => void;
  onAdd: (entityId: string) => void;
  onClearCompleted: (entityId: string) => void;
}

const LEERER_ENTWURF: TaskDraft = {
  text: '',
  due: '',
  frequency: '',
  interval: 1,
  expanded: false,
};

export function renderTasks(ctx: TasksContext): TemplateResult {
  return html`
    <ha-card>
      ${ctx.title ? html`<h2 class="card-title">${ctx.title}</h2>` : ''}
      <div class="columns">${ctx.lists.map((list) => renderList(list, ctx))}</div>
    </ha-card>
  `;
}

function renderList(list: TodoListConfig, ctx: TasksContext): TemplateResult {
  const alle = ctx.items.get(list.entity) ?? [];
  const sichtbar = ctx.showCompleted ? alle : alle.filter((i) => i.status !== 'completed');
  const offen = openCount(alle);
  const erledigte = alle.length - offen;

  return html`
    <section class="column" style="--list-color: ${list.color ?? '#0078d4'}">
      <header class="column-head">
        <span class="column-name">${list.name ?? ctx.nameOf(list.entity)}</span>
        <span class="column-count" title="offen">${offen}</span>
      </header>

      <div class="items">
        ${sichtbar.length === 0
          ? html`<p class="empty">${ctx.showDue ? 'Nichts offen' : 'Liste ist leer'}</p>`
          : sortItems(sichtbar).map((item) => renderItem(list, item, ctx))}
      </div>

      ${renderAdd(list, ctx)}

      ${ctx.showCompleted && erledigte > 0
        ? html`
            <button class="clear" @click=${() => ctx.onClearCompleted(list.entity)}>
              ${erledigte} erledigte entfernen
            </button>
          `
        : ''}
    </section>
  `;
}

function renderItem(list: TodoListConfig, item: TodoItem, ctx: TasksContext): TemplateResult {
  const erledigt = item.status === 'completed';
  const faellig = ctx.showDue ? dueLabel(item) : null;
  const wiederholung = parseMarker(item.description);

  // Zwei getrennte Flaechen: Der Haken hakt ab, der Text oeffnet die
  // Details. Sonst waere Aendern nur ueber einen langen Druck erreichbar,
  // und der ist auf einem Wandpanel schlecht zu erraten.
  return html`
    <div class="item ${erledigt ? 'item--done' : ''} ${isOverdue(item) ? 'item--overdue' : ''}">
      <button
        class="check"
        aria-label=${erledigt ? 'Wieder öffnen' : 'Abhaken'}
        @click=${() => ctx.onToggle(list.entity, item)}
      >
        ${erledigt ? html`<ha-icon icon="mdi:check"></ha-icon>` : ''}
      </button>
      <button class="item-body" title="Ändern" @click=${() => ctx.onOpen(list.entity, item)}>
        <span class="item-title">${item.summary}</span>
        ${faellig || wiederholung
          ? html`
              <span class="item-meta">
                ${faellig ? html`<span class="item-due">${faellig}</span>` : ''}
                ${wiederholung
                  ? html`
                      <span class="item-repeat" title=${recurrenceLabel(wiederholung)}>
                        <ha-icon icon="mdi:repeat"></ha-icon>
                        ${recurrenceLabel(wiederholung)}
                      </span>
                    `
                  : ''}
              </span>
            `
          : ''}
      </button>
    </div>
  `;
}

/** Eingabe fuer eine neue Aufgabe, bei Bedarf mit Datum und Rhythmus. */
function renderAdd(list: TodoListConfig, ctx: TasksContext): TemplateResult {
  const entwurf = ctx.drafts.get(list.entity) ?? LEERER_ENTWURF;
  const text = (e: Event): string => (e.target as HTMLInputElement | HTMLSelectElement).value;

  return html`
    <div class="add">
      <input
        type="text"
        placeholder=${ctx.showDue ? 'Neue Aufgabe…' : 'Neuer Eintrag…'}
        .value=${entwurf.text}
        @input=${(e: Event) => ctx.onDraft(list.entity, { text: text(e) })}
        @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && ctx.onAdd(list.entity)}
      />
      ${ctx.showDue
        ? html`
            <button
              class="add-more ${entwurf.expanded ? 'add-more--open' : ''}"
              aria-label="Termin und Wiederholung"
              title="Termin und Wiederholung"
              @click=${() => ctx.onDraft(list.entity, { expanded: !entwurf.expanded })}
            >
              <ha-icon icon="mdi:tune-variant"></ha-icon>
            </button>
          `
        : ''}
      <button class="add-item" aria-label="Hinzufügen" @click=${() => ctx.onAdd(list.entity)}>
        <ha-icon icon="mdi:plus"></ha-icon>
      </button>
    </div>

    ${ctx.showDue && entwurf.expanded ? renderAddDetails(list, entwurf, ctx) : ''}
  `;
}

function renderAddDetails(
  list: TodoListConfig,
  entwurf: TaskDraft,
  ctx: TasksContext,
): TemplateResult {
  const text = (e: Event): string => (e.target as HTMLInputElement | HTMLSelectElement).value;

  return html`
    <div class="add-details">
      <label>
        Fällig am
        <input
          type="date"
          .value=${entwurf.due}
          @input=${(e: Event) => ctx.onDraft(list.entity, { due: text(e) })}
        />
      </label>
      <label>
        Wiederholung
        <select
          .value=${entwurf.frequency}
          @change=${(e: Event) =>
            ctx.onDraft(list.entity, { frequency: text(e) as TaskFrequency })}
        >
          <option value="">Keine</option>
          <option value="DAILY">Täglich</option>
          <option value="WEEKLY">Wöchentlich</option>
          <option value="MONTHLY">Monatlich</option>
          <option value="YEARLY">Jährlich</option>
        </select>
      </label>
      ${entwurf.frequency
        ? html`
            <label>
              Alle … Male
              <input
                type="number"
                min="1"
                max="30"
                .value=${String(entwurf.interval)}
                @input=${(e: Event) =>
                  ctx.onDraft(list.entity, {
                    interval: Math.max(1, Number.parseInt(text(e), 10) || 1),
                  })}
              />
            </label>
            <p class="add-hint">
              Nach dem Abhaken erscheint die Aufgabe automatisch wieder.
            </p>
          `
        : ''}
    </div>
  `;
}
