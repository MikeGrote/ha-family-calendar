import { type TemplateResult, html } from 'lit';

import { gruppe, zeile } from './settings';

/** Abschnitt "Über": Werte, die woanders gesetzt werden, und wo das ist. */

export interface InfoContext {
  timeZone: string;
  haVersion: string;
  appVersion: string;
  folder: string;
  onOpenIntegration: () => void;
  onOpenTimeZone: () => void;
}

export function renderInfo(ctx: InfoContext): TemplateResult {
  return html`
    ${gruppe(
      'Zeit',
      html`
        ${zeile(
          'Zeitzone',
          'Kommt von Home Assistant. Der Kalender rechnet damit - eine zweite Zeitzone hier würde nur zu zwei Wahrheiten führen.',
          html`
            <div class="set-nebeneinander">
              <span class="set-anzeige">${ctx.timeZone || 'unbekannt'}</span>
              <button class="set-sekundaer" @click=${ctx.onOpenTimeZone}>Ändern</button>
            </div>
          `,
        )}
      `,
    )}
    ${gruppe(
      'Termine aus Office 365',
      html`
        ${zeile(
          'Einladungsweg',
          'Läuft über ein Postfach und braucht ein App-Passwort. Das gebe ich nicht ein - es gehört in den Dialog der Integration.',
          html`<button class="set-sekundaer" @click=${ctx.onOpenIntegration}>Einrichten</button>`,
        )}
      `,
    )}
    ${gruppe(
      'Stand',
      html`
        ${zeile('App', '', html`<span class="set-anzeige">${ctx.appVersion || '–'}</span>`)}
        ${zeile('Home Assistant', '', html`<span class="set-anzeige">${ctx.haVersion}</span>`)}
        ${zeile(
          'Bilderordner',
          '',
          html`<span class="set-anzeige set-schmal">${ctx.folder}</span>`,
        )}
      `,
    )}
  `;
}
