import { html, type TemplateResult } from 'lit';

/** Markup des Bilderrahmens. */

export interface PhotosContext {
  frontUrl: string;
  /** CSS-Wert fuer background-position, je Ebene eigen. */
  frontPosition: string;
  /** Ursprung der Bewegung - dort, wo die Koepfe sitzen. */
  frontOrigin: string;
  frontZoom: boolean;
  backUrl: string;
  backPosition: string;
  backOrigin: string;
  backZoom: boolean;
  /** Sekunden, ueber die herangefahren wird. */
  zoomSeconds: number;
  frontVisible: boolean;
  showClock: boolean;
  now: Date;
  hasImages: boolean;
  folder: string;
}

export function renderPhotos(ctx: PhotosContext): TemplateResult {
  if (!ctx.hasImages) {
    return html`
      <ha-card>
        <div class="hint">
          Keine Bilder in <code>${ctx.folder}</code>.<br />
          Lege Fotos in den Medienordner, sie erscheinen dann von selbst.
        </div>
      </ha-card>
    `;
  }

  return html`
    <ha-card>
      <div
        class="layer ${ctx.frontVisible ? 'layer--visible' : ''} ${ctx.frontZoom ? 'layer--zoom' : ''}"
        style=${ebenenStil(ctx.frontUrl, ctx.frontPosition, ctx.frontOrigin, ctx.zoomSeconds)}
      ></div>
      <div
        class="layer ${ctx.frontVisible ? '' : 'layer--visible'} ${ctx.backZoom ? 'layer--zoom' : ''}"
        style=${ebenenStil(ctx.backUrl, ctx.backPosition, ctx.backOrigin, ctx.zoomSeconds)}
      ></div>
      ${ctx.showClock ? renderClock(ctx.now) : ''}
    </ha-card>
  `;
}

function ebenenStil(
  url: string,
  position: string,
  origin: string,
  sekunden: number,
): string {
  if (!url) return '';
  return [
    `background-image: url("${url}")`,
    `background-position: ${position}`,
    `transform-origin: ${origin}`,
    `--zoom-dauer: ${sekunden}s`,
  ].join('; ');
}

function renderClock(now: Date): TemplateResult {
  return html`
    <div class="scrim"></div>
    <div class="clock">
      <span class="time">
        ${now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
      </span>
      <span class="date">
        ${now.toLocaleDateString('de-DE', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })}
      </span>
    </div>
  `;
}
