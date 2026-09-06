import type { HomeAssistant } from 'custom-card-helpers';
import { LitElement, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { effectiveTaskLists } from './lib/effective-config';
import { SettingsListener } from './lib/settings-listener';
import {
  addItem,
  clearCompleted,
  removeItem,
  setStatus,
  subscribeList,
  updateItem,
  type TodoItem,
} from './lib/todo-api';
import { tasksStyles } from './styles/tasks';
import {
  buildDescription,
  parseMarker,
  stripMarker,
  type TaskFrequency,
} from './lib/todo-recurrence';
import { renderTaskDialog } from './templates/task-dialog';
import { renderTasks, type TaskDraft } from './templates/tasks';
import { html, nothing } from 'lit';
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
  @state() private drafts = new Map<string, TaskDraft>();
  @state() private open: {
    entityId: string;
    item: TodoItem;
    title: string;
    due: string;
    frequency: TaskFrequency;
    interval: number;
    confirmDelete: boolean;
  } | null = null;

  /** Zaehlt hoch, wenn sich die Einstellungen aendern. Gelesen wird der
   *  Wert nirgends - er ist nur das Signal an Lit, neu zu zeichnen; der
   *  Stand selbst liegt im Zuhoerer. */
  @state() private settingsRevision = 0;

  /** Kennung des Bereichs, in dem diese Karte steckt. Die Huelle setzt sie
   *  beim Anlegen - ohne sie teilten sich zwei Aufgabenkarten einen
   *  Eintrag im Speicher und ueberschrieben einander. */
  settingsKey = '';

  private readonly einstellungen = new SettingsListener('Family Tasks', () => {
    this.settingsRevision++;
    const kennung = this.listen.map((l) => l.entity).join('|');
    if (kennung === this.letzteListen) return;
    this.letzteListen = kennung;
    void this.subscribeAll();
  });
  private unsubscribes: (() => void)[] = [];
  private subscribed = false;
  private letzteListen = '';

  setConfig(config: TasksConfig): void {
    if (!config.lists?.length) {
      throw new Error('Bitte mindestens eine Liste angeben!');
    }
    this.config = config;
  }

  getCardSize(): number {
    return 8;
  }

  /** Die Spalten, wie der Einstellungsbereich sie vorgibt - ersatzweise wie
   *  sie im Dashboard stehen. */
  private get listen() {
    return effectiveTaskLists(this.config, this.satz);
  }

  private get satz() {
    return this.einstellungen.settings.tasks[this.settingsKey];
  }

  updated(changed: PropertyValues): void {
    // Das Abonnement braucht hass, das erst nach dem ersten Rendern da ist.
    if (changed.has('hass') && this.hass && !this.subscribed) {
      this.subscribed = true;
      void this.subscribeAll();
      void this.einstellungen.start(this.hass);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    for (const stop of this.unsubscribes) stop();
    this.unsubscribes = [];
    this.einstellungen.stop();
    this.subscribed = false;
  }

  render(): TemplateResult {
    return html`${this.renderCard()}${this.renderDialog()}`;
  }

  private renderDialog(): TemplateResult | typeof nothing {
    const offen = this.open;
    if (!offen) return nothing;

    const liste = this.listen.find((l) => l.entity === offen.entityId);
    const patch = (changes: Partial<NonNullable<typeof this.open>>): void => {
      if (this.open) this.open = { ...this.open, ...changes };
    };

    return renderTaskDialog({
      title: offen.title,
      due: offen.due,
      frequency: offen.frequency,
      interval: offen.interval,
      listName: liste?.name ?? this.nameOf(offen.entityId),
      confirmDelete: offen.confirmDelete,
      onTitle: (value) => patch({ title: value }),
      onDue: (value) => patch({ due: value }),
      onFrequency: (value) => patch({ frequency: value }),
      onInterval: (value) => patch({ interval: value }),
      onConfirmDelete: () => patch({ confirmDelete: true }),
      onDelete: () => void this.deleteOpen(),
      onCancel: () => (this.open = null),
      onSave: () => void this.saveOpen(),
    });
  }

  private nameOf(entityId: string): string {
    const eigener = this.listen.find((l) => l.entity === entityId)?.name;
    return eigener || this.hass?.states[entityId]?.attributes?.friendly_name || entityId;
  }

  private renderCard(): TemplateResult {
    return renderTasks({
      lists: this.listen,
      items: this.items,
      drafts: this.drafts,
      showCompleted: this.satz?.showCompleted ?? this.config.showCompleted ?? false,
      showDue: this.satz?.showDue ?? this.config.showDue ?? true,
      title: this.satz?.title ?? this.config.title,
      nameOf: (entityId) => this.nameOf(entityId),
      onToggle: (entityId, item) => void this.toggle(entityId, item),
      onOpen: (entityId, item) => this.openItem(entityId, item),
      onDraft: (entityId, changes) => this.patchDraft(entityId, changes),
      onAdd: (entityId) => void this.add(entityId),
      onClearCompleted: (entityId) => void clearCompleted(this.hass, entityId),
    });
  }

  private async subscribeAll(): Promise<void> {
    for (const stop of this.unsubscribes) stop();
    this.unsubscribes = [];

    for (const list of this.listen) {
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

  private draftOf(entityId: string): TaskDraft {
    return (
      this.drafts.get(entityId) ?? {
        text: '',
        due: '',
        frequency: '',
        interval: 1,
        expanded: false,
      }
    );
  }

  private patchDraft(entityId: string, changes: Partial<TaskDraft>): void {
    this.drafts = new Map(this.drafts).set(entityId, {
      ...this.draftOf(entityId),
      ...changes,
    });
  }

  private async add(entityId: string): Promise<void> {
    const entwurf = this.draftOf(entityId);
    const text = entwurf.text.trim();
    if (!text) return;

    // Das Feld sofort leeren: Das Abonnement liefert den neuen Eintrag
    // ohnehin nach, und ein stehenbleibender Text wirkt wie ein Fehler.
    this.patchDraft(entityId, { text: '', due: '', frequency: '', interval: 1 });

    try {
      await addItem(this.hass, entityId, text, {
        dueDate: entwurf.due || undefined,
        // Die Wiederholung reist in der Beschreibung mit - die Integration
        // liest sie beim Abhaken und legt die naechste Aufgabe an.
        description: entwurf.frequency
          ? buildDescription('', entwurf.frequency, entwurf.interval)
          : undefined,
      });
    } catch (err) {
      console.error('Family Tasks: Anlegen fehlgeschlagen', err);
      this.patchDraft(entityId, entwurf);
      this.notify('Die Aufgabe ließ sich nicht anlegen.');
    }
  }

  /** Detailansicht mit den aktuellen Werten fuellen. */
  private openItem(entityId: string, item: TodoItem): void {
    const wiederholung = parseMarker(item.description);
    this.open = {
      entityId,
      item,
      title: item.summary,
      due: item.due ? item.due.slice(0, 10) : '',
      frequency: wiederholung?.frequency ?? '',
      interval: wiederholung?.interval ?? 1,
      confirmDelete: false,
    };
  }

  private async saveOpen(): Promise<void> {
    const offen = this.open;
    if (!offen) return;

    const titel = offen.title.trim();
    if (!titel) return this.notify('Bitte einen Titel eingeben.');

    // Die Wiederholung steht in der Beschreibung. Auf "Keine" gestellt
    // bleibt der freie Text erhalten, nur die Regelzeile faellt weg.
    const rumpf = stripMarker(offen.item.description);
    const beschreibung = buildDescription(rumpf, offen.frequency, offen.interval);

    this.open = null;
    try {
      await updateItem(this.hass, offen.entityId, offen.item, {
        rename: titel,
        dueDate: offen.due || undefined,
        description: beschreibung,
      });
    } catch (err) {
      console.error('Family Tasks: Aendern fehlgeschlagen', err);
      this.notify('Die Aufgabe ließ sich nicht ändern.');
    }
  }

  private async deleteOpen(): Promise<void> {
    const offen = this.open;
    if (!offen) return;

    this.open = null;
    try {
      await removeItem(this.hass, offen.entityId, offen.item);
    } catch (err) {
      console.error('Family Tasks: Löschen fehlgeschlagen', err);
      this.notify('Die Aufgabe ließ sich nicht löschen.');
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
