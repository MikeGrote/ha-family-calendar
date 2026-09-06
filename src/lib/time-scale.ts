/** Zeitachse, die leere Stunden staucht.
 *
 * Eine Woche linear darzustellen heisst auf dem Wandpanel scrollen: Wer
 * morgens einen Termin hat und abends einen, sieht vor allem die leeren
 * Stunden dazwischen.
 *
 * Deshalb bekommt hier jede belegte Minute ueberall gleich viele
 * Bildpunkte - die Laenge zweier Termine bleibt damit exakt vergleichbar -
 * waehrend lange Leerstellen auf ein beschraenktes Mass zusammenfallen.
 * Die Stauchung waechst mit der Laenge der Luecke, bleibt aber gedeckelt:
 * Eine lange Pause sieht laenger aus als eine kurze, ohne die Hoehe
 * aufzufressen.
 *
 * Damit die Darstellung nicht luegt, bleibt eine gestauchte Stelle als
 * solche erkennbar - der Aufrufer zeichnet dort einen Achsenbruch mit der
 * uebersprungenen Dauer.
 */

export const DAY_MINUTES = 24 * 60;

/** Ein belegter Abschnitt des Tages, in Minuten seit Mitternacht. */
export interface Span {
  from: number;
  to: number;
}

export interface Segment extends Span {
  kind: 'busy' | 'gap';
  /** Oberkante in Bildpunkten. */
  top: number;
  height: number;
}

export interface TimeScale {
  segments: Segment[];
  /** Gesamthoehe; nie groesser als das uebergebene Budget. */
  height: number;
  /** Bildpunkte je Minute im belegten Bereich - ueberall derselbe Wert. */
  pxPerMinute: number;
  /** Bildpunkt zu einem Zeitpunkt. Ausserhalb wird an den Rand geklemmt. */
  yOf: (minutes: number) => number;
}

export interface ScaleOptions {
  /** Luft vor und nach einem belegten Bereich. */
  padMinutes?: number;
  /** Kuerzere Luecken bleiben ungestaucht - ein Bruch kostet dort mehr
   *  Aufmerksamkeit, als er an Hoehe einspart. */
  minGapMinutes?: number;
  minGapPx?: number;
  maxGapPx?: number;
  /** Obergrenze, damit ein einzelner Termin nicht die ganze Hoehe fuellt. */
  maxPxPerMinute?: number;
}

const DEFAULTS: Required<ScaleOptions> = {
  padMinutes: 30,
  minGapMinutes: 75,
  minGapPx: 26,
  maxGapPx: 76,
  maxPxPerMinute: 1.6,
};

/** Nach dieser Luecke ist die Haelfte der moeglichen Stauchhoehe erreicht. */
const GAP_HALBWERT_MINUTEN = 180;

/** Bruecken duerfen hoechstens diesen Anteil der Hoehe belegen. Sonst
 *  bliebe fuer die Termine selbst zu wenig uebrig. */
const MAX_ANTEIL_LUECKEN = 0.45;

/** Baut die Achse aus den belegten Abschnitten eines Tages.
 *
 * Gibt null zurueck, wenn nichts belegt ist - dann gibt es keine sinnvolle
 * Achse und der Aufrufer zeigt etwas anderes.
 */
export function buildTimeScale(
  spans: Span[],
  budgetPx: number,
  options: ScaleOptions = {},
): TimeScale | null {
  const opt = { ...DEFAULTS, ...options };

  const belegt = mergeSpans(spans.map(clip).filter((s) => s.to > s.from));
  if (belegt.length === 0 || budgetPx <= 0) return null;

  const gepolstert = mergeSpans(
    belegt.map((s) => ({
      from: Math.max(0, s.from - opt.padMinutes),
      to: Math.min(DAY_MINUTES, s.to + opt.padMinutes),
    })),
  );
  const bloecke = verschmelzeKurzeLuecken(gepolstert, opt.minGapMinutes);

  const luecken = bloecke.slice(1).map((block, i) => ({
    from: bloecke[i].to,
    to: block.from,
  }));
  const lueckenHoehen = luecken.map((l) => lueckenHoehe(l.to - l.from, opt));
  const gedeckelt = deckelLuecken(lueckenHoehen, budgetPx);

  const belegteMinuten = bloecke.reduce((summe, b) => summe + (b.to - b.from), 0);
  const uebrig = Math.max(0, budgetPx - summe(gedeckelt));
  const pxPerMinute = Math.min(opt.maxPxPerMinute, uebrig / belegteMinuten);

  const segments: Segment[] = [];
  let top = 0;
  bloecke.forEach((block, i) => {
    if (i > 0) {
      const luecke = luecken[i - 1];
      segments.push({ kind: 'gap', ...luecke, top, height: gedeckelt[i - 1] });
      top += gedeckelt[i - 1];
    }
    const height = (block.to - block.from) * pxPerMinute;
    segments.push({ kind: 'busy', ...block, top, height });
    top += height;
  });

  return { segments, height: top, pxPerMinute, yOf: (m) => yOf(segments, top, m) };
}

/** Bildpunkt zu einem Zeitpunkt. */
function yOf(segments: Segment[], gesamt: number, minutes: number): number {
  const erstes = segments[0];
  const letztes = segments[segments.length - 1];
  if (minutes <= erstes.from) return 0;
  if (minutes >= letztes.to) return gesamt;

  for (const segment of segments) {
    if (minutes >= segment.from && minutes <= segment.to) {
      const anteil = (minutes - segment.from) / (segment.to - segment.from);
      return segment.top + anteil * segment.height;
    }
  }
  return gesamt;
}

/** Hoehe einer gestauchten Luecke: waechst mit der Dauer, bleibt gedeckelt. */
function lueckenHoehe(minuten: number, opt: Required<ScaleOptions>): number {
  const anteil = 1 - Math.pow(2, -minuten / GAP_HALBWERT_MINUTEN);
  return opt.minGapPx + (opt.maxGapPx - opt.minGapPx) * anteil;
}

/** Verkleinert alle Bruecken gleichmaessig, wenn sie zu viel Platz naehmen. */
function deckelLuecken(hoehen: number[], budgetPx: number): number[] {
  const erlaubt = budgetPx * MAX_ANTEIL_LUECKEN;
  const gesamt = summe(hoehen);
  if (gesamt <= erlaubt) return hoehen;
  const faktor = erlaubt / gesamt;
  return hoehen.map((h) => h * faktor);
}

function summe(werte: number[]): number {
  return werte.reduce((a, b) => a + b, 0);
}

function clip(span: Span): Span {
  return {
    from: Math.max(0, Math.min(DAY_MINUTES, span.from)),
    to: Math.max(0, Math.min(DAY_MINUTES, span.to)),
  };
}

/** Ueberlappende und aneinandergrenzende Abschnitte zu einem verbinden. */
function mergeSpans(spans: Span[]): Span[] {
  const sortiert = [...spans].sort((a, b) => a.from - b.from);
  const ergebnis: Span[] = [];
  for (const span of sortiert) {
    const letzter = ergebnis[ergebnis.length - 1];
    if (letzter && span.from <= letzter.to) {
      letzter.to = Math.max(letzter.to, span.to);
    } else {
      ergebnis.push({ ...span });
    }
  }
  return ergebnis;
}

function verschmelzeKurzeLuecken(bloecke: Span[], minGapMinutes: number): Span[] {
  const ergebnis: Span[] = [];
  for (const block of bloecke) {
    const letzter = ergebnis[ergebnis.length - 1];
    if (letzter && block.from - letzter.to < minGapMinutes) {
      letzter.to = block.to;
    } else {
      ergebnis.push({ ...block });
    }
  }
  return ergebnis;
}
