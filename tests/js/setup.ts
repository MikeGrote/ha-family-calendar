/** Stellt sicher, dass die Tests in der Zeitzone laufen, fuer die sie gelten.
 *
 * Die Datums- und Zeitlogik der Karte rechnet mit dem oertlichen Versatz.
 * Liefe der Testlauf in UTC, gingen die Erwartungen zu Sommerzeit und
 * Mitternacht stillschweigend daneben - und zwar in beide Richtungen.
 */
const ERWARTET = 'Europe/Berlin';
const tatsaechlich = Intl.DateTimeFormat().resolvedOptions().timeZone;

if (tatsaechlich !== ERWARTET) {
  throw new Error(
    `Zeitzone ist ${tatsaechlich}, erwartet ${ERWARTET}. ` +
      `Bitte über "npm run test:js" starten - das setzt TZ.`,
  );
}
