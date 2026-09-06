import { type TemplateResult, html } from 'lit';

/** Rahmen des Einstellungsbereichs.
 *
 * Bewusst mit eigenen Bedienelementen statt der Formulare von Home
 * Assistant: Der Bereich gehoert zur App und soll aussehen wie sie - und
 * die HA-Dialoge sind fuer Maus und Tastatur gemacht, nicht fuer einen
 * Finger auf einem Wandpanel.
 */

export interface SettingsSection {
  id: string;
  icon: string;
  name: string;
  /** Fertig gebaut. Angekuendigte Bereiche bleiben sichtbar, aber stumm. */
  ready: boolean;
}

export interface FrameContext {
  sections: SettingsSection[];
  active: string;
  message: string;
  onSection: (id: string) => void;
  content: TemplateResult;
}

export function renderSettingsFrame(ctx: FrameContext): TemplateResult {
  return html`
    <div class="set">
      <div class="set-tabs">
        ${ctx.sections.map(
          (abschnitt) => html`
            <button
              class="set-tab ${abschnitt.id === ctx.active ? 'active' : ''}"
              ?disabled=${!abschnitt.ready}
              @click=${() => ctx.onSection(abschnitt.id)}
            >
              <ha-icon icon=${abschnitt.icon}></ha-icon>
              <span>${abschnitt.name}</span>
              ${abschnitt.ready ? '' : html`<span class="set-soon">folgt</span>`}
            </button>
          `,
        )}
      </div>

      ${ctx.message ? html`<div class="set-hinweis">${ctx.message}</div>` : ''}

      <div class="set-inhalt">${ctx.content}</div>
    </div>
  `;
}

/** Ein angekuendigter, noch leerer Bereich. */
export function renderComingSoon(name: string): TemplateResult {
  return html`
    <p class="set-leer">
      <ha-icon icon="mdi:hammer-wrench"></ha-icon>
      ${name} ist noch nicht gebaut.
    </p>
  `;
}

// -------------------------------------------------------- Bedienelemente

export function gruppe(titel: string, inhalt: TemplateResult): TemplateResult {
  return html`
    <section class="set-gruppe">
      <h3>${titel}</h3>
      ${inhalt}
    </section>
  `;
}

export function zeile(
  beschriftung: string,
  hinweis: string,
  steuerung: TemplateResult,
): TemplateResult {
  return html`
    <div class="set-zeile">
      <div class="set-text">
        <span class="set-label">${beschriftung}</span>
        ${hinweis ? html`<span class="set-hint">${hinweis}</span>` : ''}
      </div>
      <div class="set-steuer">${steuerung}</div>
    </div>
  `;
}

export function schalter(an: boolean, onChange: (an: boolean) => void): TemplateResult {
  return html`
    <button
      class="set-schalter ${an ? 'an' : ''}"
      role="switch"
      aria-checked=${an ? 'true' : 'false'}
      @click=${() => onChange(!an)}
    >
      <span class="set-knopf"></span>
    </button>
  `;
}

/** Zahl mit zwei grossen Flaechen zum Tippen - Zahlenfelder trifft man
 *  auf einem Wandpanel schlecht. */
export function zahl(
  wert: number,
  einheit: string,
  schritt: number,
  grenzen: { min: number; max: number },
  onChange: (wert: number) => void,
): TemplateResult {
  const setze = (neu: number): void => {
    onChange(Math.min(grenzen.max, Math.max(grenzen.min, neu)));
  };

  return html`
    <div class="set-zahl">
      <button ?disabled=${wert <= grenzen.min} @click=${() => setze(wert - schritt)}>−</button>
      <span class="set-wert">${wert}<small>${einheit}</small></span>
      <button ?disabled=${wert >= grenzen.max} @click=${() => setze(wert + schritt)}>+</button>
    </div>
  `;
}

export function text(
  wert: string,
  platzhalter: string,
  onChange: (wert: string) => void,
): TemplateResult {
  return html`
    <input
      class="set-eingabe"
      type="text"
      .value=${wert}
      placeholder=${platzhalter}
      @change=${(e: Event) => onChange((e.target as HTMLInputElement).value.trim())}
    />
  `;
}
