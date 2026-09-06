import { type TemplateResult, html } from 'lit';

import { shortBrowserId } from '../lib/browser-id';
import type { PanelSettings } from '../lib/settings-api';
import { gruppe, zeile } from './settings';

/** Abschnitt "Panel": was dieses Geraet von den anderen unterscheidet. */

export interface PanelContext {
  settings: PanelSettings;
  /** Kennung dieses Browsers; leer, wenn browser_mod sie nicht liefert. */
  eigeneId: string;
  onLead: (browserId: string) => void;
}

export function renderPanelSettings(ctx: PanelContext): TemplateResult {
  return gruppe(
    'Bereichswahl',
    html`
      ${zeile(
        'Dieses Gerät führt',
        'Der Bereich wird über einen einzigen Helfer geteilt, damit Automationen das Panel umschalten können. Führt ein Gerät, klicken alle anderen nur für sich.',
        steuerung(ctx),
      )}
      ${hinweis(ctx)}
    `,
  );
}

function steuerung(ctx: PanelContext): TemplateResult {
  if (!ctx.eigeneId) {
    return html`<span class="set-anzeige">nicht möglich</span>`;
  }

  const fuehrend = ctx.settings.leadBrowser;

  if (fuehrend === ctx.eigeneId) {
    return html`
      <div class="set-nebeneinander">
        <span class="set-anzeige set-gut">Ja</span>
        <button class="set-sekundaer" @click=${() => ctx.onLead('')}>Aufheben</button>
      </div>
    `;
  }

  return html`
    <button class="set-primaer" @click=${() => ctx.onLead(ctx.eigeneId)}>
      <ha-icon icon="mdi:monitor-star"></ha-icon>
      Dieses Gerät
    </button>
  `;
}

/** Sagt, woran man gerade ist - und was fehlt, wenn es nicht geht. */
function hinweis(ctx: PanelContext): TemplateResult {
  if (!ctx.eigeneId) {
    return html`
      <p class="set-fussnote">
        Dazu wird browser_mod gebraucht: Es gibt jedem Bildschirm eine Kennung, an der
        sich dieses Gerät von den anderen unterscheiden lässt. Ohne diese Kennung melden
        weiterhin alle Geräte zurück.
      </p>
    `;
  }

  const fuehrend = ctx.settings.leadBrowser;

  if (!fuehrend) {
    return html`
      <p class="set-fussnote">
        Zurzeit meldet jedes Gerät zurück — ein Klick auf einem Bildschirm zieht alle
        anderen mit.
      </p>
    `;
  }

  if (fuehrend === ctx.eigeneId) {
    return html`
      <p class="set-fussnote">
        Andere Bildschirme folgen weiterhin den Automationen, ihre Klicks bleiben aber
        bei ihnen.
      </p>
    `;
  }

  return html`
    <p class="set-fussnote">
      Zurzeit führt ein anderes Gerät (<code>${shortBrowserId(fuehrend)}</code>). Dieser
      Bildschirm folgt den Automationen, seine Klicks bleiben hier.
    </p>
  `;
}
