import { flipTransform, prefersReducedMotion } from './fullscreen-flip';
import type { ShellFullscreen } from '../types';

/** Ein Bereich, der nach einer Weile ohne Beruehrung den Bildschirm fuellt.
 *
 * Getrennt von der Huelle, weil hier nichts entschieden wird: Der Steuerer
 * kennt nur seinen Zeitgeber und das Element, das wachsen soll.
 *
 * Animiert wird der transform, nicht die Groesse. Groesse und Position
 * rechnet der Browser bei jedem Einzelbild neu; auf einem Wandpanel sieht
 * man das. Der Bereich springt deshalb sofort auf Vollbild und wird per
 * transform dorthin zurueckgelegt, wo er herkam.
 */

/** Hinaus etwas gemaechlich, damit man es als Bewegung wahrnimmt. */
const GROW_MS = 560;
const GROW_CURVE = 'cubic-bezier(0.16, 1, 0.3, 1)';

/** Zurueck deutlich schneller: Wer das Panel beruehrt, will etwas tun und
 *  soll nicht auf eine Animation warten. */
const SHRINK_MS = 200;
const SHRINK_CURVE = 'cubic-bezier(0.4, 0, 1, 1)';

export class FullscreenArea {
  private timer?: number;
  private gewachsen = false;

  constructor(
    /** Wonach gewachsen werden soll - null, wenn gar nicht. */
    private readonly config: () => ShellFullscreen | undefined,
    /** Der aktuell sichtbare Bereich. */
    private readonly activeId: () => string,
    /** Das Element eines Bereichs im Schattenbaum der Huelle. */
    private readonly element: (id: string) => HTMLElement | null,
  ) {}

  get expanded(): boolean {
    return this.gewachsen;
  }

  /** Zeitgeber neu stellen - nach jeder Beruehrung und jedem Wechsel. */
  restart(): void {
    if (this.timer !== undefined) clearTimeout(this.timer);

    const gross = this.config();
    if (!gross?.after || !gross.area) return;

    this.timer = window.setTimeout(() => {
      if (this.activeId() === gross.area) this.expand();
    }, gross.after * 1000);
  }

  dispose(): void {
    if (this.timer !== undefined) clearTimeout(this.timer);
    this.timer = undefined;
  }

  expand(): void {
    const el = this.element(this.config()?.area ?? '');
    if (!el || this.gewachsen) return;

    this.gewachsen = true;
    const vorher = el.getBoundingClientRect();
    el.classList.add('area--fullscreen');

    if (prefersReducedMotion()) return;

    const nachher = el.getBoundingClientRect();
    el.style.transition = 'none';
    el.style.transform = flipTransform(vorher, nachher);
    // Erzwingt die Neuberechnung: Ohne sie fasst der Browser das Setzen und
    // das Zuruecknehmen zu einem Schritt zusammen und es gibt keine Bewegung.
    void el.offsetWidth;

    el.style.transition = `transform ${GROW_MS}ms ${GROW_CURVE}`;
    el.style.transform = '';
    this.nachDerBewegung(el, GROW_MS, () => {
      el.style.transition = '';
    });
  }

  collapse(): void {
    const el = this.element(this.config()?.area ?? '');
    if (!el || !this.gewachsen) return;

    this.gewachsen = false;

    const aufraeumen = (): void => {
      el.classList.remove('area--fullscreen');
      el.style.transition = '';
      el.style.transform = '';
    };

    if (prefersReducedMotion()) {
      aufraeumen();
      return;
    }

    const vollbild = el.getBoundingClientRect();
    // Kurz herausnehmen, um das Ziel zu messen, und sofort zurueck: Der
    // Browser zeichnet dazwischen nicht.
    el.classList.remove('area--fullscreen');
    const ziel = el.getBoundingClientRect();
    el.classList.add('area--fullscreen');

    el.style.transition = 'none';
    el.style.transform = '';
    void el.offsetWidth;

    el.style.transition = `transform ${SHRINK_MS}ms ${SHRINK_CURVE}`;
    el.style.transform = flipTransform(ziel, vollbild);
    this.nachDerBewegung(el, SHRINK_MS, aufraeumen);
  }

  /** Ruft auf, wenn die Bewegung fertig ist - notfalls per Zeitgeber.
   *
   * transitionend bleibt aus, wenn der Bildschirm zwischendurch in den
   * Hintergrund geraet. Ohne Netz haenge der Bereich dann fuer immer im
   * Vollbild fest.
   */
  private nachDerBewegung(el: HTMLElement, dauer: number, fertig: () => void): void {
    let erledigt = false;
    const einmal = (): void => {
      if (erledigt) return;
      erledigt = true;
      fertig();
    };
    el.addEventListener('transitionend', einmal, { once: true });
    window.setTimeout(einmal, dauer + 150);
  }
}
