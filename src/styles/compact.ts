import { css } from 'lit';

/** Kompaktansicht: eine Woche auf einen Blick.
 *
 * Die Geometrie kommt aus compact-model; hier steht nur, wie es aussieht.
 * Wichtig ist der Achsenbruch: Er muss sich deutlich von belegter Zeit
 * abheben, sonst liest sich die gestauchte Stelle wie eine leere Stunde.
 */
export const compactStyles = css`
  /* Keine feste Hoehe: Die Ansicht ist genau so hoch, wie ihre Zeitachse
     gerechnet wurde - und die passt in den gemessenen Platz. */
  .compact {
    display: flex;
    flex-direction: column;
    padding: 0 12px 12px;
    box-sizing: border-box;
  }

  .compact-nav {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0 10px;
  }

  .compact-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-left: 4px;
  }

  .compact-step,
  .compact-today {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--grid-line);
    background: var(--surface-soft);
    color: var(--text-primary);
    border-radius: 8px;
    cursor: pointer;
    font: inherit;
    min-height: 34px;
  }

  .compact-step {
    width: 34px;
  }

  .compact-today {
    padding: 0 12px;
  }

  .compact-step:hover,
  .compact-today:hover {
    background: var(--surface-hover);
  }

  /* Achsenspalte und sieben Tage - dieselbe Aufteilung fuer Kopf und Koerper. */
  .compact-grid {
    display: grid;
    grid-template-columns: 58px repeat(7, minmax(0, 1fr));
    gap: 0 4px;
  }

  .compact-head {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 5px;
    padding: 4px 0 6px;
    border-bottom: 1px solid var(--grid-line);
    color: var(--text-secondary);
  }

  .compact-weekday {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .compact-daynum {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .compact-head.today .compact-daynum,
  .compact-head.today .compact-weekday {
    color: var(--accent-color);
  }

  .compact-axis-head,
  .compact-axis-label {
    border-bottom: 1px solid var(--grid-line);
  }

  .compact-axis-label {
    font-size: 0.7rem;
    color: var(--text-secondary);
    align-self: center;
    padding-bottom: 4px;
  }

  .compact-allday {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    padding: 4px 2px;
    border-bottom: 1px solid var(--grid-line);
    align-content: flex-start;
  }

  .compact-chip {
    display: block;
    width: 100%;
    border: none;
    border-radius: 5px;
    padding: 2px 6px;
    font: inherit;
    font-size: 0.72rem;
    text-align: left;
    color: #fff;
    background: var(--block-color);
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .compact-body {
    padding-top: 6px;
  }

  .compact-scale {
    position: relative;
  }

  .compact-empty {
    color: var(--text-secondary);
    text-align: center;
    margin-top: 24px;
  }

  .compact-axis {
    position: relative;
  }

  .compact-tick {
    position: absolute;
    right: 6px;
    transform: translateY(-50%);
    font-size: 0.72rem;
    color: var(--text-secondary);
    font-variant-numeric: tabular-nums;
  }

  .compact-break-label {
    position: absolute;
    right: 6px;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 0.66rem;
    color: var(--text-secondary);
    opacity: 0.75;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .compact-day {
    position: relative;
    border-left: 1px solid var(--grid-line);
    border-radius: 4px;
    background: var(--surface-soft);
  }

  .compact-day.today {
    background: var(--today-tint);
  }

  /* Uebersprungene Zeit. Die Schraffur sagt: Hier gilt der Massstab nicht. */
  .compact-break {
    position: absolute;
    left: 0;
    right: 0;
    background: repeating-linear-gradient(
      -45deg,
      var(--break-stripe) 0 5px,
      transparent 5px 10px
    );
    border-top: 1px dashed var(--grid-line-strong);
    border-bottom: 1px dashed var(--grid-line-strong);
    pointer-events: none;
  }

  .compact-block {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1px;
    overflow: hidden;
    margin: 0 1px;
    padding: 2px 5px;
    border: none;
    border-left: 3px solid var(--block-color);
    border-radius: 4px;
    background: color-mix(in srgb, var(--block-color) 88%, #000);
    color: #fff;
    font: inherit;
    text-align: left;
    cursor: pointer;
    line-height: 1.15;
  }

  .compact-block:hover {
    filter: brightness(1.12);
  }

  .compact-block-title {
    font-size: 0.76rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .compact-block-time {
    font-size: 0.68rem;
    opacity: 0.85;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  /* Flache Bloecke haben nur Platz fuer eine Zeile. */
  .compact-block.flach {
    flex-direction: row;
    align-items: center;
    gap: 5px;
    padding: 0 5px;
  }

  /* In einer Zeile ist der Titel wichtiger als die Uhrzeit - die steht im
     Kurzhinweis und im Dialog. */
  .compact-block.flach .compact-block-time {
    display: none;
  }
`;
