import { css } from 'lit';

/** Bilderrahmen: Bild fuellt die Flaeche, Uhrzeit liegt darueber. */
export const photosStyles = css`
  :host {
    display: block;
    color-scheme: dark;
  }

  ha-card {
    position: relative;
    /* Von der Huelle steuerbar, damit der Rahmen auf den ganzen Bildschirm
       wachsen kann. Eigenschaften reichen durch den Schattenbaum. */
    height: var(--photos-height, 85vh);
    border-radius: var(--photos-radius, 24px);
    overflow: hidden;
    background: #101418;
    border: none;
  }

  /* Zwei Ebenen uebereinander: Beim Wechsel blendet die obere ein, damit
     zwischen den Bildern kein schwarzer Moment entsteht. */
  .layer {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1.2s ease-in-out;
  }

  .layer--visible {
    opacity: 1;
  }

  /* Verlauf unten, damit die Uhrzeit auch auf hellen Bildern lesbar ist. */
  .scrim {
    position: absolute;
    inset: auto 0 0 0;
    height: 45%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent);
    pointer-events: none;
  }

  .clock {
    position: absolute;
    left: 40px;
    bottom: 32px;
    color: white;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  }

  .time {
    display: block;
    font-size: clamp(3rem, 9vw, 6rem);
    font-weight: 200;
    line-height: 1;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }

  .date {
    display: block;
    margin-top: 8px;
    font-size: clamp(1rem, 2.2vw, 1.5rem);
    font-weight: 400;
    opacity: 0.9;
  }

  .hint {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 32px;
    color: #9aa0a6;
    text-align: center;
  }
`;
