# Family Calendar 📅

[English](#english) | [Deutsch](#deutsch)

---

<a name="english"></a>
## English

> ⚠️ **Note:** This is a very early **Alpha version**. It may contain bugs and is subject to change. Use at your own risk.

A modern, powerful calendar card for Home Assistant, inspired by modern calendar apps.

![Preview](https://via.placeholder.com/800x400?text=Family+Calendar+Preview)

### Features ✨

*   **Real Week View:** Timetable grid instead of a simple list.
*   **Modern Glass Design:** Modern UI with blur effects and smooth animations.
*   **Compact Mode:** Switchable to a space-saving list view ("Agenda").
*   **Live Data:** Uses the WebSocket API for instant updates.
*   **Filters:** Calendars can be toggled individually.

### Installation

#### Via HACS (Recommended)

1.  Add this repository as a **Custom Repository** in HACS:
    *   HACS > Frontend > 3 dots (top right) > Custom Repositories
    *   URL: `https://github.com/MikeGrote/ha-family-calendar`
    *   Category: **Dashboard**
2.  Click "Install".
3.  Reload your dashboard.

#### Manual

1.  Download the `family-calendar.js` file.
2.  Copy it to your `config/www/` folder.
3.  Add it under Settings > Dashboards > Resources:
    *   URL: `/local/family-calendar.js`
    *   Type: JavaScript Module

### Configuration

Add a card to your dashboard:

```yaml
type: custom:family-calendar
entities:
  - calendar.privat
  - calendar.arbeit
  - calendar.familie
colors:
  calendar.privat: "#0078d4"
  calendar.arbeit: "#d93025"
  calendar.familie: "#107c10"
```

### Development

```bash
npm install
npm run dev   # Starts local test server
npm run build # Builds family-calendar.js
```

### License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** License.

This means:
*   **Attribution:** You must give appropriate credit.
*   **Non-Commercial:** You may not use the material for commercial purposes.

The full license can be found in the [LICENSE](LICENSE) file.

### Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

<a name="deutsch"></a>
## Deutsch

> ⚠️ **Hinweis:** Dies ist eine sehr frühe **Alpha-Version**. Sie kann Fehler enthalten und sich jederzeit ändern. Die Nutzung erfolgt auf eigene Gefahr.

Eine moderne, leistungsstarke Kalender-Karte für Home Assistant, inspiriert von modernen Kalender-Apps.

![Preview](https://via.placeholder.com/800x400?text=Family+Calendar+Preview)

### Features ✨

*   **Echte Wochenansicht:** Stundenplan-Raster statt einfacher Liste.
*   **Modernes Glass Design:** Modernes UI mit Blur-Effekten und sanften Animationen.
*   **Kompakt-Modus:** Umschaltbar auf eine platzsparende Listenansicht ("Agenda").
*   **Live-Daten:** Nutzt die WebSocket-API für sofortige Updates.
*   **Filter:** Kalender einzeln ein-/ausblendbar.

### Installation

#### Über HACS (Empfohlen)

1.  Füge dieses Repository als **Benutzerdefiniertes Repository** in HACS hinzu:
    *   HACS > Frontend > 3 Punkte (oben rechts) > Benutzerdefinierte Repositories
    *   URL: `https://github.com/MikeGrote/ha-family-calendar`
    *   Kategorie: **Dashboard**
2.  Klicke auf "Installieren".
3.  Lade dein Dashboard neu.

#### Manuell

1.  Lade die Datei `family-calendar.js` herunter.
2.  Kopiere sie in deinen `config/www/` Ordner.
3.  Füge sie unter Einstellungen > Dashboards > Ressourcen hinzu:
    *   URL: `/local/family-calendar.js`
    *   Typ: JavaScript Modul

### Konfiguration

Füge eine Karte zu deinem Dashboard hinzu:

```yaml
type: custom:family-calendar
entities:
  - calendar.privat
  - calendar.arbeit
  - calendar.familie
colors:
  calendar.privat: "#0078d4"
  calendar.arbeit: "#d93025"
  calendar.familie: "#107c10"
```

### Entwicklung

```bash
npm install
npm run dev   # Startet lokalen Test-Server
npm run build # Erstellt die family-calendar.js
```

### Lizenz

Dieses Projekt ist unter der **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** Lizenz veröffentlicht.

Das bedeutet:
*   **Namensnennung:** Du musst angemessene Urheber- und Rechteangaben machen.
*   **Nicht-kommerziell:** Du darfst das Material nicht für kommerzielle Zwecke nutzen.

Die vollständige Lizenz findest du in der Datei [LICENSE](LICENSE).

### Haftungsausschluss

DIE SOFTWARE WIRD OHNE JEDE AUSDRÜCKLICHE ODER IMPLIZIERTE GARANTIE BEREITGESTELLT, EINSCHLIESSLICH DER GARANTIE ZUR BENUTZUNG FÜR DEN VORGESEHENEN ZWECK. IN KEINEM FALL SIND DIE AUTOREN ODER COPYRIGHT-INHABER FÜR JEGLICHEN SCHADEN ODER SONSTIGE VERPFLICHTUNGEN HAFTBAR ZU MACHEN, OB IN EINER VERTRAGS- ODER HAFTUNGSKLAGE, DIE AUS ODER IN VERBINDUNG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN GESCHÄFTEN MIT DER SOFTWARE ENTSTEHEN.
