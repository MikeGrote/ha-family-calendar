/** Wohin im Bild geschaut wird - und wie daraus ein Ausschnitt wird.
 *
 * Der Rahmen ist quer, viele Familienbilder sind hoch. Beim Fuellen
 * ("cover") faellt oben und unten gleich viel weg - und oben sind die
 * Koepfe. Wo die Datei die Gesichter selbst mitbringt, wird darauf
 * geschaut; sonst auf das obere Drittel, wo Koepfe ueblicherweise sitzen.
 */

export interface Groesse {
  width: number;
  height: number;
}

export interface Punkt {
  x: number;
  y: number;
}

/** Ein Gesicht in Anteilen des Bildes; x/y ist die Mitte. */
export interface Face {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Ohne Gesichter: das obere Drittel. Nicht die Mitte, weil Koepfe dort
 *  selten sind, und nicht ganz oben, weil sonst der Rest wegfaellt. */
const OHNE_GESICHT_Y = 0.38;

export function focusPosition(bild: Groesse, rahmen: Groesse, faces: Face[] = []): string {
  return backgroundPosition(focalPoint(bild, rahmen, faces), bild, rahmen);
}

/** Wohin geschaut werden soll, in Anteilen des Bildes. */
export function focalPoint(bild: Groesse, rahmen: Groesse, faces: Face[] = []): Punkt {
  const ausGesichtern = mitteDerGesichter(faces);
  if (ausGesichtern) return ausGesichtern;

  // Wird ueberhaupt senkrecht beschnitten? Sonst ist die Mitte richtig.
  const bildVerhaeltnis = verhaeltnis(bild);
  const rahmenVerhaeltnis = verhaeltnis(rahmen);
  if (!bildVerhaeltnis || !rahmenVerhaeltnis || bildVerhaeltnis >= rahmenVerhaeltnis) {
    return { x: 0.5, y: 0.5 };
  }

  return { x: 0.5, y: OHNE_GESICHT_Y };
}

/** Der umschliessende Kasten aller Gesichter, als Mittelpunkt. */
export function mitteDerGesichter(faces: Face[]): Punkt | null {
  const brauchbar = faces.filter(
    (f) => f.x >= 0 && f.x <= 1 && f.y >= 0 && f.y <= 1 && f.w > 0 && f.h > 0,
  );
  if (brauchbar.length === 0) return null;

  const links = Math.min(...brauchbar.map((f) => f.x - f.w / 2));
  const rechts = Math.max(...brauchbar.map((f) => f.x + f.w / 2));
  const oben = Math.min(...brauchbar.map((f) => f.y - f.h / 2));
  const unten = Math.max(...brauchbar.map((f) => f.y + f.h / 2));

  return { x: klemme((links + rechts) / 2), y: klemme((oben + unten) / 2) };
}

/** CSS-Wert, der den Blickpunkt moeglichst in die Mitte des Rahmens holt.
 *
 * background-position ist nicht der Blickpunkt selbst: Der Prozentwert
 * verteilt den Ueberhang. "30%" heisst, dass der Punkt bei 30 Prozent des
 * Bildes auf den Punkt bei 30 Prozent des Rahmens faellt. Wer den
 * Blickpunkt mittig haben will, muss umrechnen.
 */
export function backgroundPosition(focal: Punkt, bild: Groesse, rahmen: Groesse): string {
  const ueberhang = ueberhaenge(bild, rahmen);
  const x = anteil(focal.x, ueberhang.x);
  const y = anteil(focal.y, ueberhang.y);
  return `${runde(x)}% ${runde(y)}%`;
}

/** Wie oft das gefuellte Bild je Achse in den Rahmen passt; 1 heisst: genau. */
function ueberhaenge(bild: Groesse, rahmen: Groesse): Punkt {
  if (!bild.width || !bild.height || !rahmen.width || !rahmen.height) {
    return { x: 1, y: 1 };
  }
  if (bild.width < 0 || bild.height < 0) return { x: 1, y: 1 };

  const massstab = Math.max(rahmen.width / bild.width, rahmen.height / bild.height);
  return {
    x: (bild.width * massstab) / rahmen.width,
    y: (bild.height * massstab) / rahmen.height,
  };
}

function anteil(focal: number, ueberhang: number): number {
  // Nichts haengt ueber: Der Wert aendert dann ohnehin nichts.
  if (ueberhang <= 1.0001) return 50;
  return klemme((focal * ueberhang - 0.5) / (ueberhang - 1)) * 100;
}

function verhaeltnis(groesse: Groesse | undefined): number {
  if (!groesse?.width || !groesse.height) return 0;
  if (groesse.width < 0 || groesse.height < 0) return 0;
  return groesse.width / groesse.height;
}

function klemme(wert: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, wert));
}

function runde(wert: number): number {
  return Math.round(wert * 10) / 10;
}

/** Wo der Blickpunkt am Ende wirklich sitzt, in Anteilen des Rahmens.
 *
 * Meist die Mitte - aber nicht, wenn ein Gesicht so nah am Rand liegt, dass
 * es sich nicht mittig holen laesst, ohne dass neben dem Bild Leere
 * entstuende. Gebraucht wird der Punkt als Ursprung der Bewegung: Ein Zoom
 * um die Bildmitte zoege sonst am Gesicht vorbei.
 */
export function screenPoint(focal: Punkt, bild: Groesse, rahmen: Groesse): Punkt {
  const ueberhang = ueberhaenge(bild, rahmen);
  return {
    x: aufDemSchirm(focal.x, ueberhang.x),
    y: aufDemSchirm(focal.y, ueberhang.y),
  };
}

function aufDemSchirm(focal: number, ueberhang: number): number {
  if (ueberhang <= 1.0001) return focal;
  const p = klemme((focal * ueberhang - 0.5) / (ueberhang - 1));
  return klemme(focal * ueberhang - p * (ueberhang - 1));
}

/** Misst ein Bild, ohne es anzuzeigen.
 *
 * Der Browser laedt es dabei in seinen Zwischenspeicher; das Anzeigen
 * gleich darauf kostet dann nichts mehr.
 */
export function measureAspect(url: string): Promise<Groesse | null> {
  return new Promise((fertig) => {
    const bild = new Image();
    bild.onload = () => fertig({ width: bild.naturalWidth, height: bild.naturalHeight });
    bild.onerror = () => fertig(null);
    bild.src = url;
  });
}
