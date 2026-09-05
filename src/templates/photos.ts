import { html, type TemplateResult } from 'lit';

/** Markup des Bilderrahmens. */

export interface PhotosContext {
  frontUrl: string;
  backUrl: string;
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
        class="layer ${ctx.frontVisible ? 'layer--visible' : ''}"
        style=${ctx.frontUrl ? `background-image: url("${ctx.frontUrl}")` : ''}
      ></div>
      <div
        class="layer ${ctx.frontVisible ? '' : 'layer--visible'}"
        style=${ctx.backUrl ? `background-image: url("${ctx.backUrl}")` : ''}
      ></div>
      ${ctx.showClock ? renderClock(ctx.now) : ''}
    </ha-card>
  `;
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
