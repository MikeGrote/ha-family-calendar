import type { HomeAssistant } from 'custom-card-helpers';
import { LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import {
  addItem,
  clearCompleted,
  setStatus,
  subscribeList,
  type TodoItem,
} from './lib/todo-api';
import { tasksStyles } from './styles/tasks';
import { renderTasks } from './templates/tasks';
import type { TasksConfig } from './types';

/** Aufgaben und Listen nebeneinander.
 *
 * Dieselbe Karte fuer beides: Eine Aufgabenliste je Person und eine
 * Einkaufsliste unterscheiden sich technisch nicht, nur in der Darstellung.
 * showDue blendet die Faelligkeiten aus, wo sie nicht gemeint sind.
 *
 * Die Listen werden abonniert statt abgefragt - haakt jemand am Telefon
 * etwas ab, aendert sich das Panel im selben Moment.
 */
@customElement('family-tasks')
export class FamilyTasks extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config!: TasksConfig;

  @state() private items = new Map<string, TodoItem[]>();
  @state() private drafts = new Map<string, string>();

  private unsubscribes: (() => void)[] = [];
  private subscribed = false;

  setConfig(config: TasksConfig): void {
    if (!config.lists?.length) {
      throw new Error('Bitte mindestens eine Liste angeben!');
    }
    this.config = config;
  }

  getCardSize(): number {
    return 8;
  }

  updated(changed: PropertyValues): void {
    // Das Abonnement braucht hass, das erst nach dem ersten Rendern da ist.
    if (changed.has('hass') && this.hass && !this.subscribed) {
      this.subscribed = true;
      void this.subscribeAll();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    for (const stop of this.unsubscribes) stop();
    this.unsubscribes = [];
    this.subscribed = false;
  }

  render(): TemplateResult {
    return renderTasks({
      lists: this.config.lists,
      items: this.items,
      drafts: this.drafts,
      showCompleted: this.config.showCompleted ?? false,
      showDue: this.config.showDue ?? true,
      title: this.config.title,
      nameOf: (entityId) =>
        this.hass?.states[entityId]?.attributes?.friendly_name ?? entityId,
      onToggle: (entityId, item) => void this.toggle(entityId, item),
      onDraft: (entityId, value) => this.setDraft(entityId, value),
      onAdd: (entityId) => void this.add(entityId),
      onClearCompleted: (entityId) => void clearCompleted(this.hass, entityId),
    });
  }

  private async subscribeAll(): Promise<void> {
    for (const list of this.config.lists) {
      try {
        const stop = await subscribeList(this.hass, list.entity, (items) => {
          this.items = new Map(this.items).set(list.entity, items);
        });
        this.unsubscribes.push(stop);
      } catch (err) {
        console.error('Family Tasks: Liste nicht erreichbar', list.entity, err);
      }
    }
  }

  private async toggle(entityId: string, item: TodoItem): Promise<void> {
    const ziel = item.status === 'completed' ? 'needs_action' : 'completed';
    try {
      await setStatus(this.hass, entityId, item, ziel);
    } catch (err) {
      console.error('Family Tasks: Status liess sich nicht aendern', err);
      this.notify('Die Aufgabe ließ sich nicht ändern.');
    }
  }

  private setDraft(entityId: string, value: string): void {
    this.drafts = new Map(this.drafts).set(entityId, value);
  }

  private async add(entityId: string): Promise<void> {
    const text = (this.drafts.get(entityId) ?? '').trim();
    if (!text) return;

    // Das Feld sofort leeren: Das Abonnement liefert den neuen Eintrag
    // ohnehin nach, und ein stehenbleibender Text wirkt wie ein Fehler.
    this.setDraft(entityId, '');
    try {
      await addItem(this.hass, entityId, text);
    } catch (err) {
      console.error('Family Tasks: Anlegen fehlgeschlagen', err);
      this.setDraft(entityId, text);
      this.notify('Die Aufgabe ließ sich nicht anlegen.');
    }
  }

  private notify(message: string): void {
    this.dispatchEvent(
      new CustomEvent('hass-notification', {
        detail: { message },
        bubbles: true,
        composed: true,
      }),
    );
  }

  static styles = tasksStyles;
}

declare global {
  interface HTMLElementTagNameMap {
    'family-tasks': FamilyTasks;
  }
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: 'family-tasks',
  name: 'Family Tasks',
  description: 'Aufgaben- und Einkaufslisten nebeneinander, mit Abhaken und Anlegen.',
  preview: false,
});
