import { css } from 'lit';

/** Wochenplan: sieben Tage nebeneinander, Mahlzeiten untereinander. */
export const mealsStyles = css`
  .mahl {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 0 4px 4px;
  }

  .mahl-nav {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .mahl-titel {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-left: 4px;
  }

  .mahl-schritt,
  .mahl-heute {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 34px;
    border: 1px solid var(--grid-line);
    border-radius: 8px;
    background: var(--surface-soft);
    color: var(--text-primary);
    font: inherit;
    cursor: pointer;
  }

  .mahl-schritt {
    width: 34px;
  }

  .mahl-heute {
    padding: 0 12px;
  }

  .mahl-schritt:hover,
  .mahl-heute:hover {
    background: var(--surface-hover);
  }

  .mahl-woche {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 8px;
  }

  @media (max-width: 900px) {
    .mahl-woche {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .mahl-tag {
    display: flex;
    flex-direction: column;
    gap: 7px;
    min-width: 0;
  }

  .mahl-tag-kopf {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 5px;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--grid-line);
    color: var(--text-secondary);
  }

  .mahl-wochentag {
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .mahl-tagzahl {
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .mahl-tag.heute .mahl-tagzahl,
  .mahl-tag.heute .mahl-wochentag {
    color: var(--accent-color);
  }

  .mahl-liste {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-height: 40px;
  }

  .mahl-leer {
    text-align: center;
    color: var(--text-secondary);
    opacity: 0.5;
    padding-top: 8px;
  }

  .mahl-karte {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0;
    border: 1px solid var(--grid-line);
    border-radius: 12px;
    background: var(--surface-soft);
    text-align: left;
    cursor: pointer;
    overflow: hidden;
    font: inherit;
    color: var(--text-primary);
  }

  .mahl-karte:hover:not(:disabled) {
    background: var(--surface-hover);
  }

  /* Eine Notiz ohne Rezept laesst sich nicht aufschlagen - dann soll sie
     auch nicht wie ein Knopf aussehen. */
  .mahl-karte.notiz {
    cursor: default;
    background: transparent;
    border-style: dashed;
  }

  .mahl-bild {
    display: block;
    width: 100%;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    background: rgba(60, 60, 67, 0.06);
  }

  .mahl-bild--leer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    opacity: 0.4;
  }

  .mahl-bild--leer ha-icon {
    --mdc-icon-size: 22px;
  }

  .mahl-text {
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding: 7px 9px 9px;
    min-width: 0;
  }

  .mahl-art {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-secondary);
  }

  .mahl-name {
    font-size: 0.88rem;
    font-weight: 600;
    line-height: 1.25;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .mahl-zeit {
    font-size: 0.72rem;
    color: var(--text-secondary);
    margin-top: 2px;
  }

  /* --- Wenn Mealie fehlt ----------------------------------------------- */

  .mahl-hinweis {
    display: flex;
    gap: 14px;
    padding: 22px 24px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.6);
  }

  .mahl-hinweis ha-icon {
    --mdc-icon-size: 28px;
    color: var(--accent-color);
    flex: 0 0 auto;
  }

  .mahl-hinweis strong {
    display: block;
    margin-bottom: 4px;
    font-size: 1rem;
  }

  .mahl-hinweis p {
    margin: 0;
    max-width: 62ch;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--text-secondary);
  }

  .mahl-hinweis code {
    font-size: 0.85em;
    padding: 1px 5px;
    border-radius: 5px;
    background: rgba(0, 122, 255, 0.1);
    color: var(--accent-color);
  }
`;
