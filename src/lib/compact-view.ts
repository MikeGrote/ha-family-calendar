import type { EventInput } from '@fullcalendar/core';

import { type CompactWeek, buildCompactWeek } from './compact-model';

/** Der Lebenszyklus der Kompaktansicht.
 *
 * Anders als das Raster laeuft die Kompaktansicht nicht ueber: Ihre
 * Zeitachse wird in die verfuegbare Hoehe hineingerechnet. Diese Hoehe
 * muss also bekannt sein, bevor gezeichnet wird - und sich melden, wenn
 * sie sich aendert.
 */

/** Die Kompaktansicht zeigt dieselbe Woche wie das Raster. */
const COMPACT_DAYS = 7;

/** Was unterhalb der Zeitachse noch Platz braucht: der Innenabstand der
 *  Ansicht und der der Karte, dazu etwas Luft zum Bildrand. */
const RESERVE_PX = 36;

/** Darunter wird nichts mehr lesbar; dann ist Scrollen das kleinere Uebel. */
const MIN_BUDGET_PX = 240;

export class CompactView {
  private frame?: HTMLElement;
  private budgetPx = MIN_BUDGET_PX;
  private readonly onResize = () => this.measure();

  /** onChange stoesst das Neuzeichnen an. */
  constructor(private readonly onChange: () => void) {}

  /** Merkt sich den Rahmen und misst den verbleibenden Platz.
   *
   * Gemessen wird der Abstand vom oberen Rand des Rahmens bis zum unteren
   * Bildrand, nicht eine feste Hoehe in vh. Eine feste Hoehe kennt die
   * Kopfzeile nicht: Bricht die Kalenderauswahl auf zwei Zeilen um, rutscht
   * die Ansicht sonst unten aus dem Bild - und genau das Scrollen soll sie
   * ja ersparen.
   *
   * Die Messung laeuft nicht im Kreis, weil die Oberkante des Rahmens von
   * allem darueber bestimmt wird und nicht davon, was hineingezeichnet wird.
   */
  watch(frame: HTMLElement | undefined): void {
    if (frame !== this.frame) {
      this.frame = frame;
      if (frame) window.addEventListener('resize', this.onResize);
      else window.removeEventListener('resize', this.onResize);
    }
    this.measure();
  }

  week(events: EventInput[], viewStart: Date): CompactWeek {
    return buildCompactWeek(events, viewStart, COMPACT_DAYS, this.budgetPx);
  }

  dispose(): void {
    window.removeEventListener('resize', this.onResize);
    this.frame = undefined;
  }

  private measure(): void {
    if (!this.frame) return;

    const oben = this.frame.getBoundingClientRect().top;
    const platz = Math.max(MIN_BUDGET_PX, Math.floor(window.innerHeight - oben - RESERVE_PX));
    if (Math.abs(platz - this.budgetPx) <= 1) return;

    this.budgetPx = platz;
    this.onChange();
  }
}
