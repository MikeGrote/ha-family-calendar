# HA-Family Calendar 📅

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
    *   HACS > 3 dots (top right) > Custom Repositories
    *   URL: `https://github.com/MikeGrote/ha-family-calendar`
    *   Category: **Integration**
2.  Click "Install", then restart Home Assistant.
3.  Go to Settings > Devices & Services > Add Integration and add
    **Family Calendar**.

The integration serves the card and registers it as a Lovelace resource
automatically - no manual resource entry needed.

#### Manual

1.  Copy the `custom_components/calendar_service_ext/` folder into your
    `config/custom_components/` directory.
2.  Restart Home Assistant.
3.  Add the **Family Calendar** integration under
    Settings > Devices & Services.

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
# Optional: Entprellung der Aktualisierung in Millisekunden (Standard 500)
refreshDebounceMs: 500
```

### Development

```bash
npm install
npm run check  # Typecheck + ESLint + Ruff
npm run dev    # Starts local test server
npm run build  # Builds family-calendar.js
```

All checks must pass before the card is deployed.

### License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** License.

This means:
*   **Attribution:** You must give appropriate credit.
*   **Non-Commercial:** You may not use the material for commercial purposes.

The full license can be found in the [LICENSE](LICENSE) file.

### Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**The author reserves the right to discontinue, remove, or modify this project at any time without notice.**

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
    *   HACS > 3 Punkte (oben rechts) > Benutzerdefinierte Repositories
    *   URL: `https://github.com/MikeGrote/ha-family-calendar`
    *   Kategorie: **Integration**
2.  Klicke auf "Installieren" und starte Home Assistant neu.
3.  Füge unter Einstellungen > Geräte & Dienste > Integration hinzufügen
    die Integration **Family Calendar** hinzu.

Die Integration liefert die Karte aus und registriert sie automatisch als
Lovelace-Ressource - ein manueller Ressourcen-Eintrag ist nicht nötig.

#### Manuell

1.  Kopiere den Ordner `custom_components/calendar_service_ext/` in dein
    Verzeichnis `config/custom_components/`.
2.  Starte Home Assistant neu.
3.  Füge die Integration **Family Calendar** unter
    Einstellungen > Geräte & Dienste hinzu.

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
# Optional: Entprellung der Aktualisierung in Millisekunden (Standard 500)
refreshDebounceMs: 500
```

### Entwicklung

```bash
npm install
npm run check  # Typecheck + ESLint + Ruff
npm run dev    # Startet lokalen Test-Server
npm run build  # Erstellt die family-calendar.js
```

Alle Checks müssen grün sein, bevor die Karte deployt wird.

### Lizenz

Dieses Projekt ist unter der **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** Lizenz veröffentlicht.

Das bedeutet:
*   **Namensnennung:** Du musst angemessene Urheber- und Rechteangaben machen.
*   **Nicht-kommerziell:** Du darfst das Material nicht für kommerzielle Zwecke nutzen.

Die vollständige Lizenz findest du in der Datei [LICENSE](LICENSE).

### Haftungsausschluss

DIE SOFTWARE WIRD OHNE JEDE AUSDRÜCKLICHE ODER IMPLIZIERTE GARANTIE BEREITGESTELLT, EINSCHLIESSLICH DER GARANTIE ZUR BENUTZUNG FÜR DEN VORGESEHENEN ZWECK. IN KEINEM FALL SIND DIE AUTOREN ODER COPYRIGHT-INHABER FÜR JEGLICHEN SCHADEN ODER SONSTIGE VERPFLICHTUNGEN HAFTBAR ZU MACHEN, OB IN EINER VERTRAGS- ODER HAFTUNGSKLAGE, DIE AUS ODER IN VERBINDUNG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN GESCHÄFTEN MIT DER SOFTWARE ENTSTEHEN.

**Der Autor behält sich das Recht vor, das Projekt jederzeit ohne Vorankündigung einzustellen, zu entfernen oder zu ändern.**
