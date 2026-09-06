import type {
  CalendarSettings,
  PanelSettings,
  TaskSetSettings,
} from './settings-api';
import type {
  CalendarConfig,
  ShellConfig,
  ShellFullscreen,
  ShellIdle,
  TasksConfig,
  TodoListConfig,
} from '../types';

/** Was gilt: der Einstellungsbereich oder der Eintrag im Dashboard?
 *
 * Der Einstellungsbereich gewinnt, sobald dort etwas steht. Der Eintrag im
 * Dashboard bleibt der Rueckfall - fuer den ersten Start, und fuer den Fall,
 * dass die Integration nicht antwortet.
 *
 * "Nichts eingestellt" heisst durchweg: leere Liste, leere Zeichenkette,
 * Null. Nur so laesst sich eine einzelne Einstellung wieder abgeben, ohne
 * die anderen mitzunehmen.
 */

export const DEFAULT_COLOR = '#0078d4';

export interface EffectiveCalendar {
  entityId: string;
  /** Leer: den Namen aus Home Assistant nehmen. */
  name: string;
  color: string;
  active: boolean;
}

/** Die Kalender der App, in ihrer Reihenfolge. */
export function effectiveCalendars(
  config: Pick<CalendarConfig, 'entities' | 'colors'> | undefined,
  settings: CalendarSettings | undefined,
): EffectiveCalendar[] {
  // Eine leere Reihenfolge heisst: hier wurde nichts eingestellt. Dann
  // zaehlen auch die Einzelwerte nicht - sonst bliebe eine alte Farbe
  // haengen, obwohl der Einstellungsbereich schon wieder das Dashboard
  // zeigt, und die beiden widersprechen einander.
  const eingestellt = Boolean(settings?.order?.length);
  const reihenfolge = eingestellt ? settings!.order : (config?.entities ?? []);

  return reihenfolge.map((entityId) => {
    const gespeichert = eingestellt ? settings?.items?.[entityId] : undefined;
    return {
      entityId,
      name: gespeichert?.name ?? '',
      color: gespeichert?.color || config?.colors?.[entityId] || DEFAULT_COLOR,
      active: gespeichert?.active ?? true,
    };
  });
}

/** Farbzuordnung, wie die Karten sie erwarten. */
export function colorMap(kalender: EffectiveCalendar[]): Record<string, string> {
  return Object.fromEntries(kalender.map((k) => [k.entityId, k.color]));
}

/** Die Spalten einer Aufgabenkarte.
 *
 * Sobald es fuer diese Karte einen gespeicherten Satz gibt, gilt er ganz -
 * halb aus dem Dashboard und halb aus den Einstellungen waere nicht
 * nachvollziehbar.
 */
export function effectiveTaskLists(
  config: Pick<TasksConfig, 'lists'> | undefined,
  set: TaskSetSettings | undefined,
): TodoListConfig[] {
  if (!set?.order?.length) return config?.lists ?? [];

  return set.order.map((entity) => {
    const gespeichert = set.items?.[entity];
    return {
      entity,
      ...(gespeichert?.name ? { name: gespeichert.name } : {}),
      ...(gespeichert?.color ? { color: gespeichert.color } : {}),
    };
  });
}

export interface EffectivePanel {
  initial: string;
  idle?: ShellIdle;
  fullscreen?: ShellFullscreen;
}

/** Verhalten der Huelle. */
export function effectivePanel(
  config: ShellConfig | undefined,
  settings: PanelSettings | undefined,
): EffectivePanel {
  const bereiche = config?.areas ?? [];
  const ersterEchter = bereiche.find((a) => !a.disabled && !a.path)?.id ?? '';

  return {
    initial: gueltigerBereich(settings?.initialArea, bereiche) || config?.initial || ersterEchter,
    idle: ruhezustand(config, settings, bereiche),
    fullscreen: vollbild(config, settings, bereiche),
  };
}

function ruhezustand(
  config: ShellConfig | undefined,
  settings: PanelSettings | undefined,
  bereiche: ShellConfig['areas'],
): ShellIdle | undefined {
  const bereich = gueltigerBereich(settings?.idleArea, bereiche);
  if (!settings?.idleAfter || !bereich) return config?.idle;

  return {
    after: settings.idleAfter,
    area: bereich,
    ...(config?.idle?.returnTo ? { returnTo: config.idle.returnTo } : {}),
  };
}

function vollbild(
  config: ShellConfig | undefined,
  settings: PanelSettings | undefined,
  bereiche: ShellConfig['areas'],
): ShellFullscreen | undefined {
  const bereich = gueltigerBereich(settings?.fullscreenArea, bereiche);
  if (!settings?.fullscreenAfter || !bereich) return config?.fullscreen;

  return { after: settings.fullscreenAfter, area: bereich };
}

/** Ein Bereich, den es nicht mehr gibt, zaehlt als nicht eingestellt.
 *
 * Sonst zeigte das Panel nach dem Umbenennen eines Bereichs ins Leere und
 * liesse sich nur noch ueber die Konfiguration retten.
 */
function gueltigerBereich(id: string | undefined, bereiche: ShellConfig['areas']): string {
  if (!id) return '';
  return bereiche.some((a) => a.id === id && !a.disabled && !a.path) ? id : '';
}
