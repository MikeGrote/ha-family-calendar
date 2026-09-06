import { css } from 'lit';

import { settingsGalleryStyles } from './settings-gallery';
import { settingsListStyles } from './settings-list';
import { tokenStyles } from './tokens';

/** Einstellungen im Stil der App.
 *
 * Bewusst eigene Bedienelemente statt der Formulare von Home Assistant:
 * Der Bereich gehoert zur App, und die HA-Dialoge sind fuer Maus und
 * Tastatur gemacht - hier bedient ein Finger auf einem Wandpanel. Deshalb
 * grosse Flaechen, klare Trennlinien und keine winzigen Drehfelder.
 */
export const settingsStyles = css`


  ${tokenStyles}

  ha-card {
    padding: 20px 22px 24px;
    gap: 0;
    /* Wie die anderen Bereiche: Sonst endet die Karte dort, wo ihr Inhalt
       aufhoert, und die Seitenleiste daneben bricht auf halber Hoehe ab. */
    min-height: 85vh;
    box-sizing: border-box;
  }

  .set-titel {
    margin: 0 0 14px;
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--text-primary);
  }

  .set {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* --- Abschnittswahl --------------------------------------------------- */

  .set-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .set-tab {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    min-height: 40px;
    padding: 0 15px;
    border: 1px solid rgba(60, 60, 67, 0.1);
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.55);
    color: var(--text-primary);
    font: inherit;
    font-weight: 500;
    cursor: pointer;
  }

  .set-tab ha-icon {
    --mdc-icon-size: 19px;
    color: var(--text-secondary);
  }

  .set-tab:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.85);
  }

  .set-tab.active {
    background: var(--accent-color);
    border-color: transparent;
    color: #fff;
  }

  .set-tab.active ha-icon {
    color: #fff;
  }

  .set-tab:disabled {
    opacity: 0.45;
    cursor: default;
  }

  .set-soon {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-secondary);
  }

  .set-hinweis {
    padding: 10px 14px;
    border-radius: 12px;
    background: rgba(255, 59, 48, 0.1);
    border: 1px solid rgba(255, 59, 48, 0.25);
    color: #b3261e;
    font-size: 0.86rem;
  }

  /* --- Gruppen und Zeilen ----------------------------------------------- */

  .set-inhalt {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .set-gruppe h3 {
    margin: 0 0 8px;
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--text-secondary);
  }

  .set-gruppe {
    padding: 14px 16px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  .set-zeile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 11px 0;
    border-top: 1px solid rgba(60, 60, 67, 0.08);
  }

  .set-zeile:first-of-type {
    border-top: none;
  }

  .set-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .set-label {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-primary);
  }

  .set-hint {
    font-size: 0.78rem;
    line-height: 1.35;
    color: var(--text-secondary);
  }

  .set-steuer {
    flex: 0 0 auto;
  }

  .set-nebeneinander {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .set-anzeige {
    font-size: 0.9rem;
    color: var(--text-secondary);
    font-variant-numeric: tabular-nums;
  }

  .set-schmal {
    display: inline-block;
    max-width: 320px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
  }

  /* --- Bedienelemente --------------------------------------------------- */

  .set-schalter {
    width: 52px;
    height: 31px;
    padding: 2px;
    border: none;
    border-radius: 16px;
    background: rgba(60, 60, 67, 0.22);
    cursor: pointer;
    transition: background 0.18s ease;
  }

  .set-schalter.an {
    background: #34c759;
  }

  .set-knopf {
    display: block;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
    transition: transform 0.18s ease;
  }

  .set-schalter.an .set-knopf {
    transform: translateX(21px);
  }

  .set-zahl {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(60, 60, 67, 0.1);
    overflow: hidden;
  }

  .set-zahl button {
    width: 40px;
    height: 38px;
    border: none;
    background: transparent;
    color: var(--accent-color);
    font-size: 1.2rem;
    cursor: pointer;
  }

  .set-zahl button:hover:not(:disabled) {
    background: rgba(0, 122, 255, 0.1);
  }

  .set-zahl button:disabled {
    opacity: 0.3;
    cursor: default;
  }

  .set-wert {
    min-width: 62px;
    text-align: center;
    font-size: 0.98rem;
    font-weight: 600;
    color: var(--text-primary);
    font-variant-numeric: tabular-nums;
  }

  .set-wert small {
    margin-left: 2px;
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--text-secondary);
  }

  .set-eingabe {
    width: 340px;
    max-width: 42vw;
    height: 38px;
    padding: 0 12px;
    box-sizing: border-box;
    border-radius: 12px;
    border: 1px solid rgba(60, 60, 67, 0.14);
    background: #fff;
    color: var(--text-primary);
    font: inherit;
    font-size: 0.88rem;
  }

  .set-primaer,
  .set-sekundaer,
  .set-weg,
  .set-zurueck {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    min-height: 40px;
    padding: 0 16px;
    border-radius: 20px;
    border: none;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }

  .set-primaer {
    background: var(--accent-color);
    color: #fff;
  }

  .set-sekundaer,
  .set-zurueck {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(60, 60, 67, 0.12);
    color: var(--text-primary);
  }

  .set-weg {
    background: #ff3b30;
    color: #fff;
  }

  .set-primaer:hover,
  .set-weg:hover {
    filter: brightness(1.08);
  }


  .set-fussnote {
    margin: 2px 0 0;
    padding-bottom: 4px;
    font-size: 0.78rem;
    line-height: 1.4;
    color: var(--text-secondary);
  }

  .set-fussnote code {
    font-size: 0.74rem;
    padding: 1px 5px;
    border-radius: 5px;
    background: rgba(60, 60, 67, 0.08);
  }

  .set-gut {
    color: #1d7a35;
    font-weight: 600;
  }

  .set-leer {
    display: flex;
    align-items: center;
    gap: 9px;
    margin: 0;
    padding: 18px 4px;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  ${settingsListStyles}
  ${settingsGalleryStyles}
`;
