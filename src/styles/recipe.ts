import { css } from 'lit';

/** Das Rezept am Herd: gross, ruhig, mit dicken Zielen zum Antippen. */
export const recipeStyles = css`
  .rez-schicht {
    position: fixed;
    inset: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(16, 20, 24, 0.55);
    backdrop-filter: blur(6px);
  }

  .rez {
    position: relative;
    width: min(1100px, 100%);
    max-height: 92vh;
    overflow: auto;
    padding: 26px 30px 30px;
    border-radius: 22px;
    background: #fff;
    color: var(--text-primary);
    box-shadow: 0 24px 70px rgba(16, 20, 24, 0.35);
  }

  .rez-zu {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    background: rgba(60, 60, 67, 0.08);
    color: var(--text-primary);
    cursor: pointer;
  }

  .rez-zu:hover {
    background: rgba(60, 60, 67, 0.16);
  }

  .rez-hinweis,
  .rez-leer {
    color: var(--text-secondary);
    margin: 0;
  }

  /* --- Kopf ------------------------------------------------------------ */

  .rez-kopf {
    display: flex;
    gap: 22px;
    align-items: flex-start;
    margin-bottom: 24px;
    padding-right: 48px;
  }

  .rez-bild {
    width: 220px;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border-radius: 14px;
    flex: 0 0 auto;
  }

  .rez-kopf h2 {
    margin: 0 0 6px;
    font-size: 1.85rem;
    line-height: 1.15;
    letter-spacing: -0.01em;
  }

  .rez-unter {
    margin: 0 0 10px;
    color: var(--text-secondary);
    font-size: 1rem;
    max-width: 60ch;
  }

  .rez-fakten {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 18px;
  }

  .rez-faktum {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  .rez-faktum ha-icon {
    --mdc-icon-size: 18px;
  }

  /* --- Zutaten und Schritte -------------------------------------------- */

  .rez-spalten {
    display: grid;
    grid-template-columns: minmax(240px, 340px) minmax(0, 1fr);
    gap: 28px;
  }

  @media (max-width: 820px) {
    .rez-spalten {
      grid-template-columns: minmax(0, 1fr);
      gap: 20px;
    }

    .rez-kopf {
      flex-direction: column;
    }

    .rez-bild {
      width: 100%;
    }
  }

  .rez-spalten h3 {
    margin: 0 0 10px;
    font-size: 0.76rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--text-secondary);
  }

  .rez-spalten h3 small {
    text-transform: none;
    letter-spacing: 0;
    font-weight: 500;
  }

  .rez-zutaten ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .rez-zutaten li {
    display: flex;
    align-items: flex-start;
    gap: 11px;
    padding: 9px 11px;
    border-radius: 10px;
    font-size: 1.02rem;
    line-height: 1.35;
    cursor: pointer;
  }

  .rez-zutaten li:hover {
    background: rgba(60, 60, 67, 0.05);
  }

  .rez-haken {
    flex: 0 0 auto;
    width: 21px;
    height: 21px;
    margin-top: 1px;
    border: 2px solid rgba(60, 60, 67, 0.28);
    border-radius: 7px;
    transition: background 0.15s, border-color 0.15s;
  }

  .rez-zutaten li.ab {
    color: var(--text-secondary);
    text-decoration: line-through;
  }

  .rez-zutaten li.ab .rez-haken {
    background: var(--accent-color);
    border-color: var(--accent-color);
  }

  /* Die Zutaten des Schritts, an dem man gerade ist. Der eigentliche
     Gewinn gegenueber einem Zettel: Man sieht, was jetzt gebraucht wird. */
  .rez-zutaten li.dran {
    background: rgba(255, 193, 7, 0.18);
    box-shadow: inset 3px 0 0 #f0a500;
  }

  .rez-schritte ol {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
    counter-reset: schritt;
  }

  .rez-schritte li {
    display: flex;
    gap: 14px;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid transparent;
  }

  .rez-schritte li.dran {
    background: rgba(0, 122, 255, 0.07);
    border-color: rgba(0, 122, 255, 0.22);
  }

  .rez-schritte li.ab .rez-schritt-text {
    color: var(--text-secondary);
    opacity: 0.65;
  }

  .rez-nr {
    flex: 0 0 auto;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(60, 60, 67, 0.2);
    border-radius: 50%;
    background: transparent;
    color: var(--text-secondary);
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }

  .rez-schritte li.ab .rez-nr {
    background: var(--accent-color);
    border-color: var(--accent-color);
    color: #fff;
  }

  .rez-schritt-text {
    flex: 1;
    min-width: 0;
    cursor: pointer;
  }

  .rez-schritt-text strong {
    display: block;
    margin-bottom: 3px;
    font-size: 0.95rem;
  }

  .rez-schritt-text p {
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.5;
  }
`;
