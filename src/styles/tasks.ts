import { css } from 'lit';

/** Aufgaben und Listen: Spalten mit abhakbaren Eintraegen. */
export const tasksStyles = css`
  :host {
    display: block;
    color-scheme: light;
  }

  ha-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 10px 40px 0 rgba(31, 38, 135, 0.12);
    padding: 20px;
  }

  .card-title {
    margin: 0 0 16px;
    font-size: 1.3rem;
    font-weight: 600;
    color: #1d1d1f;
  }

  .columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    align-items: start;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.6);
  }

  .column-head {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--list-color);
  }

  .column-name {
    flex: 1;
    font-size: 1rem;
    font-weight: 600;
    color: #1d1d1f;
  }

  /* Die Zahl der offenen Punkte ist die Information, die man aus drei
     Metern Entfernung noch lesen koennen soll. */
  .column-count {
    min-width: 26px;
    padding: 2px 8px;
    border-radius: 10px;
    background: var(--list-color);
    color: white;
    font-size: 0.85rem;
    font-weight: 700;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
    /* Grosszuegig, damit der Haken mit dem Daumen sitzt. */
    min-height: 46px;
    padding: 8px 10px;
    border-radius: 12px;
    transition: background 0.15s;
  }

  .item:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  .check {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 22px;
    height: 22px;
    margin-top: 2px;
    padding: 0;
    border: 2px solid #c7c7cc;
    border-radius: 7px;
    background: transparent;
    color: white;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }

  .item--done .check {
    background: var(--list-color);
    border-color: var(--list-color);
  }

  .check ha-icon {
    --mdc-icon-size: 16px;
  }

  .item-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
    padding: 0;
    border: none;
    background: transparent;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
  }

  .item-title {
    font-size: 0.95rem;
    color: #1d1d1f;
    overflow-wrap: anywhere;
  }

  .item--done .item-title {
    color: #9aa0a6;
    text-decoration: line-through;
  }

  .item-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 10px;
    font-size: 0.78rem;
    color: #5f6368;
  }

  .item-due {
    font-size: inherit;
  }

  /* Wiederholung ist Zusatzinformation - erkennbar, aber leiser als die
     Faelligkeit, die eine Handlung verlangt. */
  .item-repeat {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    color: #86868b;
  }

  .item-repeat ha-icon {
    --mdc-icon-size: 13px;
  }

  .item--overdue .item-due {
    color: #d93025;
    font-weight: 600;
  }

  .empty {
    margin: 4px 0;
    padding: 8px 10px;
    font-size: 0.88rem;
    color: #9aa0a6;
  }

  .add {
    display: flex;
    gap: 6px;
    margin-top: 4px;
  }

  .add input {
    flex: 1;
    min-width: 0;
    min-height: 40px;
    padding: 0 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.9);
    color: #1d1d1f;
    font-family: inherit;
    font-size: 0.92rem;
  }

  .add input:focus {
    outline: none;
    border-color: var(--list-color);
  }

  .add-more {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 40px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.9);
    color: #5f6368;
    cursor: pointer;
  }

  .add-more--open {
    border-color: var(--list-color);
    color: var(--list-color);
  }

  .add-more ha-icon {
    --mdc-icon-size: 20px;
  }

  .add-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.03);
  }

  .add-details label {
    display: flex;
    flex-direction: column;
    gap: 3px;
    font-size: 0.78rem;
    color: #5f6368;
  }

  .add-details input,
  .add-details select {
    min-height: 36px;
    padding: 0 10px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    background: white;
    color: #1d1d1f;
    font-family: inherit;
    font-size: 0.9rem;
  }

  .add-hint {
    margin: 0;
    font-size: 0.76rem;
    line-height: 1.35;
    color: #86868b;
  }

  .add-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 40px;
    height: 40px;
    border: none;
    border-radius: 12px;
    background: var(--list-color);
    color: white;
    cursor: pointer;
  }

  .add-item ha-icon {
    --mdc-icon-size: 22px;
  }

  .clear {
    align-self: flex-start;
    padding: 6px 2px;
    border: none;
    background: none;
    color: #5f6368;
    font-family: inherit;
    font-size: 0.82rem;
    text-decoration: underline;
    cursor: pointer;
  }

  /* --------------------------------------------------------- Detaildialog */

  .dialog-overlay {
    position: fixed;
    inset: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(4px);
  }

  .dialog {
    width: 100%;
    max-width: 380px;
    padding: 24px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.97);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    color: #1d1d1f;
  }

  .dialog h3 {
    margin: 0 0 2px;
    font-size: 1.15rem;
    font-weight: 600;
  }

  .dialog-list {
    margin: 0 0 18px;
    font-size: 0.82rem;
    color: #86868b;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 14px;
    font-size: 0.82rem;
    color: #5f6368;
  }

  .field input,
  .field select {
    min-height: 40px;
    padding: 0 12px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 10px;
    background: white;
    color: #1d1d1f;
    font-family: inherit;
    font-size: 0.95rem;
  }

  .dialog-hint {
    margin: 0 0 18px;
    font-size: 0.78rem;
    line-height: 1.4;
    color: #86868b;
  }

  .dialog-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .dialog-actions button {
    min-height: 40px;
    padding: 0 16px;
    border: none;
    border-radius: 12px;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-delete {
    margin-right: auto;
    background: #d93025;
    color: white;
  }

  .btn-delete--confirm {
    background: #8c1d16;
  }

  .btn-cancel {
    background: rgba(0, 0, 0, 0.06);
    color: #1d1d1f;
  }

  .btn-save {
    background: var(--list-color, #0078d4);
    color: white;
  }
`;
