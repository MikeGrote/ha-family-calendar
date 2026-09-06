import { css } from 'lit';

/** Zeilen einer geordneten Liste: Reihenfolge, Name, Farbe.
 *
 * Von Kalendern und Aufgabenlisten gemeinsam genutzt - beide bearbeiten
 * dieselbe Art Liste.
 */
export const settingsListStyles = css`
  /* --- Liste von Entitaeten -------------------------------------------- */

  .set-liste {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
  }

  .set-eintrag {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    padding: 9px 11px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.68);
    border: 1px solid rgba(60, 60, 67, 0.08);
  }

  .set-pfeile {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .set-pfeile button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 21px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
  }

  .set-pfeile button:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.06);
    color: var(--text-primary);
  }

  .set-pfeile button:disabled {
    opacity: 0.25;
    cursor: default;
  }

  .set-pfeile ha-icon {
    --mdc-icon-size: 18px;
  }

  .set-eintrag-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1 1 190px;
    min-width: 0;
  }

  .set-eingabe--name {
    width: 100%;
    max-width: none;
    height: 34px;
  }

  .set-entity {
    font-size: 0.68rem;
    color: var(--text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .set-palette {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    flex: 0 0 auto;
  }

  .set-farbe {
    width: 22px;
    height: 22px;
    padding: 0;
    border-radius: 50%;
    border: 2px solid transparent;
    background: var(--farbe);
    cursor: pointer;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.12);
  }

  .set-farbe.gewaehlt {
    border-color: var(--text-primary);
    transform: scale(1.15);
  }

  .set-mini {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 0.76rem;
    color: var(--text-secondary);
  }

  .set-schalter--klein {
    width: 42px;
    height: 25px;
  }

  .set-schalter--klein .set-knopf {
    width: 21px;
    height: 21px;
  }

  .set-schalter--klein.an .set-knopf {
    transform: translateX(17px);
  }

  .set-entfernen {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
  }

  .set-entfernen:hover {
    background: rgba(255, 59, 48, 0.12);
    color: #d70015;
  }

  .set-hinzu {
    display: flex;
    gap: 10px;
  }

  .set-auswahl {
    height: 38px;
    padding: 0 12px;
    border-radius: 12px;
    border: 1px solid rgba(60, 60, 67, 0.14);
    background: #fff;
    color: var(--text-primary);
    font: inherit;
    font-size: 0.88rem;
    cursor: pointer;
  }

`;
