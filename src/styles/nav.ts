import { css } from 'lit';

/** Seitenleiste zum Wechseln zwischen den Bereichen. */
export const navStyles = css`
  :host {
    display: block;
    height: 100%;
    color-scheme: light;
  }

  ha-card {
    height: 100%;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    box-shadow: 0 10px 40px 0 rgba(31, 38, 135, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.5);
    overflow: hidden;
  }

  nav {
    display: flex;
    flex-direction: column;
    padding: 12px 8px;
    gap: 2px;
  }

  .item {
    /* Bezugspunkt fuer den Balken des aktiven Eintrags. */
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    /* Grosszuegige Hoehe: Das Ziel wird mit dem Daumen getroffen. */
    min-height: 52px;
    padding: 0 12px;
    border: none;
    border-radius: 14px;
    background: transparent;
    color: #5f6368;
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }

  .item:hover:not(.item--disabled) {
    background: rgba(0, 0, 0, 0.04);
    color: #1d1d1f;
  }

  /* Der aktive Bereich bekommt Farbe und einen Balken am Rand. */
  .item--active {
    background: rgba(0, 122, 255, 0.1);
    color: #0062cc;
    font-weight: 600;
  }

  .item--active::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 28px;
    border-radius: 0 3px 3px 0;
    background: #007aff;
  }

  /* Geplante Bereiche bleiben sichtbar, sind aber erkennbar noch nichts. */
  .item--disabled {
    opacity: 0.38;
    cursor: default;
  }

  .item ha-icon {
    --mdc-icon-size: 24px;
    flex: 0 0 auto;
  }

  .label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host([compact]) .item {
    justify-content: center;
    padding: 0;
  }

  :host([compact]) .label {
    display: none;
  }
`;
