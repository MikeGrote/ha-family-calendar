import { type TemplateResult, html } from 'lit';

import type { PhotoSettings } from '../lib/settings-api';
import { gruppe, schalter, text, zahl, zeile } from './settings';

/** Abschnitt "Fotos": Bilder hochladen und den Rahmen einstellen. */

export interface PhotoTile {
  id: string;
  title: string;
  url: string;
}

export interface PhotoContext {
  settings: PhotoSettings;
  tiles: PhotoTile[];
  /** Laeuft gerade ein Upload? Dann Fortschritt statt Knopf. */
  uploading: { fertig: number; gesamt: number } | null;
  /** Bild, fuer das gerade nachgefragt wird, ob es weg soll. */
  confirmDelete: string;
  loading: boolean;
  onPick: () => void;
  onFiles: (files: FileList) => void;
  onAskDelete: (id: string) => void;
  onCancelDelete: () => void;
  onDelete: (id: string) => void;
  onChange: (patch: Partial<PhotoSettings>) => void;
}

export function renderPhotoSettings(ctx: PhotoContext): TemplateResult {
  return html`
    ${gruppe('Bilder', bilder(ctx))}
    ${gruppe(
      'Bilderrahmen',
      html`
        ${zeile(
          'Sekunden je Bild',
          'Wie lange ein Bild stehen bleibt.',
          zahl(ctx.settings.interval, 's', 5, { min: 5, max: 300 }, (interval) =>
            ctx.onChange({ interval }),
          ),
        )}
        ${zeile(
          'Uhr einblenden',
          'Zeigt Uhrzeit und Datum über dem Bild.',
          schalter(ctx.settings.showClock, (showClock) => ctx.onChange({ showClock })),
        )}
        ${zeile(
          'Ordner neu lesen',
          'Wie oft nach neuen Bildern gesehen wird.',
          zahl(ctx.settings.rescanMinutes, 'min', 15, { min: 5, max: 720 }, (rescanMinutes) =>
            ctx.onChange({ rescanMinutes }),
          ),
        )}
        ${zeile(
          'Ordner',
          'Ort in der Medienablage. Nur ändern, wenn die Bilder woanders liegen.',
          text(ctx.settings.folder, 'media-source://…', (folder) => ctx.onChange({ folder })),
        )}
      `,
    )}
  `;
}

function bilder(ctx: PhotoContext): TemplateResult {
  return html`
    <div class="set-upload">
      ${ctx.uploading
        ? html`
            <div class="set-fortschritt">
              <span>Lädt … ${ctx.uploading.fertig} von ${ctx.uploading.gesamt}</span>
              <div class="set-balken">
                <div
                  class="set-balken-fuell"
                  style="width: ${Math.round(
                    (ctx.uploading.fertig / Math.max(1, ctx.uploading.gesamt)) * 100,
                  )}%"
                ></div>
              </div>
            </div>
          `
        : html`
            <button class="set-primaer" @click=${ctx.onPick}>
              <ha-icon icon="mdi:image-plus"></ha-icon>
              Bilder auswählen
            </button>
            <span class="set-anzahl">
              ${ctx.loading
                ? 'wird gelesen …'
                : ctx.tiles.length === 1
                  ? '1 Bild im Ordner'
                  : `${ctx.tiles.length} Bilder im Ordner`}
            </span>
          `}
      <input
        id="dateiwahl"
        type="file"
        accept="image/*"
        multiple
        hidden
        @change=${(e: Event) => {
          const feld = e.target as HTMLInputElement;
          if (feld.files?.length) ctx.onFiles(feld.files);
          // Zuruecksetzen, sonst loest dieselbe Datei kein zweites Mal aus.
          feld.value = '';
        }}
      />
    </div>

    ${ctx.tiles.length === 0 && !ctx.loading
      ? html`<p class="set-leer">
          <ha-icon icon="mdi:image-off-outline"></ha-icon>
          Noch keine Bilder. Der Bilderrahmen bleibt leer, bis welche da sind.
        </p>`
      : html`<div class="set-galerie">${ctx.tiles.map((kachel) => bild(kachel, ctx))}</div>`}
  `;
}

function bild(kachel: PhotoTile, ctx: PhotoContext): TemplateResult {
  const fragt = ctx.confirmDelete === kachel.id;

  return html`
    <figure class="set-kachel ${fragt ? 'fragt' : ''}">
      <!-- Ohne loading="lazy": Die Kacheln entstehen, waehrend der Bereich
           in der Huelle noch verborgen ist. Der Browser haelt sie dann fuer
           ausserhalb des Sichtfelds und laedt sie auch beim Aufklappen nicht
           zuverlaessig nach - die Galerie bliebe grau. -->
      <img src=${kachel.url} alt=${kachel.title} />
      ${fragt
        ? html`
            <div class="set-nachfrage">
              <span>Löschen?</span>
              <div>
                <button class="set-weg" @click=${() => ctx.onDelete(kachel.id)}>Ja, löschen</button>
                <button class="set-zurueck" @click=${ctx.onCancelDelete}>Abbrechen</button>
              </div>
            </div>
          `
        : html`
            <button
              class="set-loeschen"
              title="${kachel.title} löschen"
              @click=${() => ctx.onAskDelete(kachel.id)}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          `}
      <figcaption>${kachel.title}</figcaption>
    </figure>
  `;
}
