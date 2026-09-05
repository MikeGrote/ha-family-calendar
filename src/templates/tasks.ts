import { html, type TemplateResult } from 'lit';

import type { TodoItem } from '../lib/todo-api';
import { dueLabel, isOverdue, openCount, sortItems } from '../lib/todo-model';
import type { TodoListConfig } from '../types';

/** Markup der Aufgaben- und Listenkarte. */

export interface TasksContext {
  lists: TodoListConfig[];
  items: Map<string, TodoItem[]>;
  drafts: Map<string, string>;
  showCompleted: boolean;
  showDue: boolean;
  title?: string;
  nameOf: (entityId: string) => string;
  onToggle: (entityId: string, item: TodoItem) => void;
  onDraft: (entityId: string, value: string) => void;
  onAdd: (entityId: string) => void;
  onClearCompleted: (entityId: string) => void;
}

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

      <div class="add">
        <input
          type="text"
          placeholder=${ctx.showDue ? "Neue Aufgabe…" : "Neuer Eintrag…"}
          .value=${ctx.drafts.get(list.entity) ?? ''}
          @input=${(e: Event) => ctx.onDraft(list.entity, (e.target as HTMLInputElement).value)}
          @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && ctx.onAdd(list.entity)}
        />
        <button class="add-item" aria-label="Hinzufügen" @click=${() => ctx.onAdd(list.entity)}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>

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

  return html`
    <button
      class="item ${erledigt ? 'item--done' : ''} ${isOverdue(item) ? 'item--overdue' : ''}"
      @click=${() => ctx.onToggle(list.entity, item)}
    >
      <span class="check">
        ${erledigt ? html`<ha-icon icon="mdi:check"></ha-icon>` : ''}
      </span>
      <span class="item-body">
        <span class="item-title">${item.summary}</span>
        ${faellig ? html`<span class="item-due">${faellig}</span>` : ''}
      </span>
    </button>
  `;
}
