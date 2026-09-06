import { type TemplateResult, html } from 'lit';

import { gruppe, schalter, zeile } from './settings';
import { type EntityListContext, renderEntityList } from './settings-entities';

/** Abschnitt "Kalender": welche Kalender die App zeigt, wie und in welcher
 *  Reihenfolge. */

export interface CalendarContext extends EntityListContext {
  /** Beim Oeffnen gleich die Kompaktansicht zeigen. */
  startCompact: boolean;
  onStartCompact: (kompakt: boolean) => void;
}

export function renderCalendarSettings(ctx: CalendarContext): TemplateResult {
  return html`
    ${gruppe('Kalender', renderEntityList(ctx))}
    ${gruppe(
      'Ansicht',
      zeile(
        'Kompakt beginnen',
        'Startet mit der gestauchten Zeitachse statt mit dem Stundenraster.',
        schalter(ctx.startCompact, ctx.onStartCompact),
      ),
    )}
  `;
}
