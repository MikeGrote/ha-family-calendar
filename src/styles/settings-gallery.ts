import { css } from 'lit';

/** Bilder des Rahmens: Upload, Vorschau und die Nachfrage vor dem
 *  Loeschen - eine Datei ist danach weg. */
export const settingsGalleryStyles = css`
  /* --- Bilder ----------------------------------------------------------- */

  .set-upload {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 14px;
  }

  .set-anzahl {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .set-fortschritt {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .set-balken {
    height: 6px;
    border-radius: 3px;
    background: rgba(60, 60, 67, 0.12);
    overflow: hidden;
  }

  .set-balken-fuell {
    height: 100%;
    background: var(--accent-color);
    transition: width 0.2s ease;
  }

  .set-galerie {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }

  .set-kachel {
    position: relative;
    margin: 0;
    border-radius: 12px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(60, 60, 67, 0.08);
  }

  .set-kachel img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  .set-kachel figcaption {
    padding: 5px 8px;
    font-size: 0.72rem;
    color: var(--text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .set-loeschen {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    cursor: pointer;
  }

  .set-loeschen ha-icon {
    --mdc-icon-size: 18px;
  }

  .set-loeschen:hover {
    background: #ff3b30;
  }

  /* Nachfrage vor dem Loeschen: Eine Datei ist danach weg, das laesst sich
     nicht zuruecknehmen. */
  .set-nachfrage {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 8px;
    background: rgba(20, 20, 22, 0.82);
    color: #fff;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .set-nachfrage div {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }

  .set-nachfrage button {
    min-height: 32px;
    padding: 0 10px;
    font-size: 0.78rem;
    justify-content: center;
  }

`;
