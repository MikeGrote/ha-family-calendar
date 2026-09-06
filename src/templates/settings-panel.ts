import { type TemplateResult, html } from 'lit';


import type { AreaInfo } from '../lib/settings-discovery';
import type { PanelSettings } from '../lib/settings-api';
import { gruppe, schalter, zahl, zeile } from './settings';

/** Abschnitt "Panel": was dieses Geraet von den anderen unterscheidet. */

export interface PanelContext {
  settings: PanelSettings;
  /** Kennung dieses Browsers; leer, wenn browser_mod sie nicht liefert. */
  eigeneId: string;
  areas: AreaInfo[];
  /** Ist dieser Bildschirm gekoppelt? */
  gekoppelt: boolean;
  /** Wie viele Bildschirme insgesamt gekoppelt sind. */
  anzahlGekoppelt: number;
  onKopplung: (gekoppelt: boolean) => void;
  onChange: (patch: Partial<PanelSettings>) => void;
}

export function renderPanelSettings(ctx: PanelContext): TemplateResult {
  return html`
    ${gruppe(
      'Start und Ruhe',
      html`
        ${zeile(
          'Bereich beim Laden',
          'Womit das Panel beginnt, wenn die Seite neu geladen wird.',
          bereichswahl(ctx, ctx.settings.initialArea, (initialArea) =>
            ctx.onChange({ initialArea }),
          ),
        )}
        ${zeile(
          'Ruhe nach',
          'Sekunden ohne Berührung, bis in den Ruhebereich gewechselt wird. Null: wie im Dashboard eingetragen.',
          zahl(ctx.settings.idleAfter, 's', 60, { min: 0, max: 3600 }, (idleAfter) =>
            ctx.onChange({ idleAfter }),
          ),
        )}
        ${zeile(
          'Ruhebereich',
          'Wohin das Panel dann wechselt.',
          bereichswahl(ctx, ctx.settings.idleArea, (idleArea) => ctx.onChange({ idleArea })),
        )}
      `,
    )}
    ${gruppe(
      'Vollbild',
      html`
        ${zeile(
          'Vollbild nach',
          'Sekunden ohne Berührung, bis der Bereich über die Seitenleiste hinweg wächst. Null: wie im Dashboard eingetragen.',
          zahl(ctx.settings.fullscreenAfter, 's', 5, { min: 0, max: 600 }, (fullscreenAfter) =>
            ctx.onChange({ fullscreenAfter }),
          ),
        )}
        ${zeile(
          'Welcher Bereich',
          'Sinnvoll beim Bilderrahmen; bei einer Karte mit Bedienelementen eher nicht.',
          bereichswahl(ctx, ctx.settings.fullscreenArea, (fullscreenArea) =>
            ctx.onChange({ fullscreenArea }),
          ),
        )}
      `,
    )}
    ${gruppe(
      'Bereichswahl',
      html`
        ${zeile(
          'Mit anderen koppeln',
          'Normalerweise ist jeder Bildschirm für sich. Gekoppelte Bildschirme zeigen denselben Bereich und ziehen einander mit.',
          steuerung(ctx),
        )}
        ${hinweis(ctx)}
      `,
    )}
  `;
}

/** Auswahl eines Bereichs; leer heisst "wie im Dashboard eingetragen". */
function bereichswahl(
  ctx: PanelContext,
  wert: string,
  onChange: (id: string) => void,
): TemplateResult {
  return html`
    <select
      class="set-auswahl"
      .value=${wert}
      @change=${(e: Event) => onChange((e.target as HTMLSelectElement).value)}
    >
      <option value="" ?selected=${!wert}>wie im Dashboard</option>
      ${ctx.areas.map(
        (bereich) => html`
          <option value=${bereich.id} ?selected=${bereich.id === wert}>${bereich.name}</option>
        `,
      )}
    </select>
  `;
}

function steuerung(ctx: PanelContext): TemplateResult {
  if (!ctx.eigeneId) {
    return html`<span class="set-anzeige">nicht möglich</span>`;
  }

  return schalter(ctx.gekoppelt, ctx.onKopplung);
}

/** Sagt, woran man gerade ist - und was fehlt, wenn es nicht geht. */
function hinweis(ctx: PanelContext): TemplateResult {
  if (!ctx.eigeneId) {
    return html`
      <p class="set-fussnote">
        Dazu wird browser_mod gebraucht: Es gibt jedem Bildschirm eine Kennung, an der
        sich dieses Gerät von den anderen unterscheiden lässt. Ohne diese Kennung bleibt
        jeder Bildschirm für sich.
      </p>
    `;
  }

  if (!ctx.gekoppelt) {
    return html`
      <p class="set-fussnote">
        Dieser Bildschirm ist für sich. Automationen, die das Panel umschalten, erreichen
        ihn nicht — beim Wandpanel ist die Kopplung deshalb sinnvoll.
      </p>
    `;
  }

  if (ctx.anzahlGekoppelt <= 1) {
    return html`
      <p class="set-fussnote">
        Gekoppelt, aber allein: Automationen erreichen diesen Bildschirm, sonst zieht ihn
        niemand mit.
      </p>
    `;
  }

  return html`
    <p class="set-fussnote">
      ${ctx.anzahlGekoppelt} Bildschirme sind gekoppelt und zeigen denselben Bereich.
    </p>
  `;
}
