/** Rechnung fuer das Wachsen auf den ganzen Bildschirm.
 *
 * Der Bereich wird nicht in seiner Groesse animiert - das rechnet der
 * Browser bei jedem Einzelbild neu und ruckelt auf einem Wandpanel.
 * Stattdessen springt er sofort auf seine Endgroesse und wird per
 * transform optisch dorthin zurueckgelegt, wo er herkam; animiert wird
 * dann nur noch der transform. Das laeuft auf der Grafikkarte.
 *
 * Bekannt als FLIP: First, Last, Invert, Play.
 */

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/** Transform, der ein bei "gelegt" liegendes Element bei "gezeigt" erscheinen laesst.
 *
 * Setzt transform-origin: top left voraus.
 */
export function flipTransform(gezeigt: Rect, gelegt: Rect): string {
  const sx = massstab(gezeigt.width, gelegt.width);
  const sy = massstab(gezeigt.height, gelegt.height);
  const dx = runde(gezeigt.left - gelegt.left);
  const dy = runde(gezeigt.top - gelegt.top);

  return `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
}

/** Ein Element ohne Ausdehnung wuerde durch Null teilen. */
function massstab(gezeigt: number, gelegt: number): number {
  if (gelegt <= 0) return 1;
  return runde(gezeigt / gelegt, 4);
}

function runde(wert: number, stellen = 2): number {
  const faktor = 10 ** stellen;
  return Math.round(wert * faktor) / faktor;
}

/** Bewegung unerwuenscht? Dann wird umgeschaltet statt animiert. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}
