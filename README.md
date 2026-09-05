# HA-Family Calendar 📅

[English](#english) | [Deutsch](#deutsch)

---

<a name="english"></a>
## English

> ⚠️ **Note:** This is an early **Alpha version**. It may contain bugs and is
> subject to change. Use at your own risk.

A calendar card for Home Assistant, plus an optional bridge that turns meeting
invitations into calendar entries.

### Features

**Calendar card**

*   **Real week view** — a timetable grid rather than a list, with a month view
    alongside it.
*   **Create, edit and delete** events straight from the card, including all-day
    events and simple recurrence.
*   **Per-calendar colours and filters** — toggle each calendar on and off.
*   **Compact mode** — a space-saving block view.
*   **Adaptive time axis** — the visible hours follow the events of the week.

**Invitation sync** (optional)

*   Invite an address of a watched mailbox to a meeting and the event appears in
    the matching Home Assistant calendar.
*   **Plus addressing decides the target:** an invitation sent to
    `mailbox+mike@example.com` lands in the calendar mapped to the tag `mike`.
*   Cancellations remove the event again; rescheduled meetings replace it.
*   Works with any IMAP mailbox — no calendar API, no admin consent, and only
    what you deliberately invite ever reaches the screen.

### Requirements

*   Home Assistant 2025.7 or newer.
*   For invitation sync: an IMAP mailbox reachable from Home Assistant. Gmail
    requires an app password with two-step verification enabled.

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
automatically — no manual resource entry needed.

#### Manual

1.  Copy the `custom_components/calendar_service_ext/` folder into your
    `config/custom_components/` directory.
2.  Restart Home Assistant.
3.  Add the **Family Calendar** integration under
    Settings > Devices & Services.

### Configuration

#### The card

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
# Optional: refresh debounce in milliseconds (default 500)
refreshDebounceMs: 500
```

#### Invitation sync

Open **Settings > Devices & Services > Family Calendar > Configure**. Enable the
sync and enter the mailbox details, then map plus tags to calendars — one per
line:

```
mike = calendar.mike
anja = calendar.anja
family = calendar.family
```

Invitations whose tag is missing go to the fallback calendar, or are discarded
if none is set.

> ⚠️ **Restrict the senders.** Anyone who knows the mailbox address can put
> events on your screen. Fill in **Allowed senders** unless the mailbox is
> private.

### Development

```bash
npm install
npm run check   # Typecheck + ESLint + Ruff
npm run dev     # Local test server
npm run build   # Builds family-calendar.js
```

Python tests for the invitation parser and routing:

```bash
pip install -r tests/python/requirements.txt
pytest tests/python
```

All checks must pass before the card is deployed; CI runs them on every push.

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
---

<a name="deutsch"></a>
## Deutsch

> ⚠️ **Hinweis:** Dies ist eine frühe **Alpha-Version**. Sie kann Fehler
> enthalten und sich jederzeit ändern. Die Nutzung erfolgt auf eigene Gefahr.

Eine Kalenderkarte für Home Assistant, dazu eine optionale Brücke, die
Besprechungsanfragen in Kalendereinträge verwandelt.

### Funktionen

**Kalenderkarte**

*   **Echte Wochenansicht** — ein Stundenraster statt einer Liste, daneben eine
    Monatsansicht.
*   **Anlegen, Bearbeiten und Löschen** direkt in der Karte, auch ganztägige
    Termine und einfache Wiederholungen.
*   **Farben und Filter je Kalender** — jeder Kalender einzeln ein- und
    ausblendbar.
*   **Kompaktmodus** — platzsparende Blockansicht.
*   **Mitwachsende Zeitachse** — der sichtbare Bereich richtet sich nach den
    Terminen der Woche.

**Einladungs-Abgleich** (optional)

*   Lade eine Adresse eines überwachten Postfachs zu einem Termin ein, und er
    erscheint im passenden Home-Assistant-Kalender.
*   **Die Plus-Adresse bestimmt das Ziel:** eine Einladung an
    `postfach+mike@example.com` landet im Kalender, der dem Kennwort `mike`
    zugeordnet ist.
*   Absagen entfernen den Termin wieder, Verschiebungen ersetzen ihn.
*   Funktioniert mit jedem IMAP-Postfach — ohne Kalender-Schnittstelle, ohne
    Administratorfreigabe, und es landet nur, was du bewusst einlädst.

### Voraussetzungen

*   Home Assistant 2025.7 oder neuer.
*   Für den Einladungs-Abgleich: ein IMAP-Postfach, das Home Assistant
    erreichen kann. Bei Gmail wird ein App-Passwort benötigt, dafür muss die
    Zwei-Faktor-Authentifizierung aktiv sein.

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
Lovelace-Ressource — ein manueller Ressourcen-Eintrag ist nicht nötig.

#### Manuell

1.  Kopiere den Ordner `custom_components/calendar_service_ext/` in dein
    Verzeichnis `config/custom_components/`.
2.  Starte Home Assistant neu.
3.  Füge die Integration **Family Calendar** unter
    Einstellungen > Geräte & Dienste hinzu.

### Konfiguration

#### Die Karte

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

#### Einladungs-Abgleich

Unter **Einstellungen > Geräte & Dienste > Family Calendar > Konfigurieren**
den Abgleich aktivieren, die Postfachdaten eintragen und die Kennworte den
Kalendern zuordnen — eine Zeile je Kalender:

```
mike = calendar.mike
anja = calendar.anja
family = calendar.family
```

Einladungen mit unbekanntem Kennwort gehen in den Ausweichkalender, oder werden
verworfen, wenn keiner gesetzt ist.

> ⚠️ **Absender einschränken.** Wer die Postfachadresse kennt, kann Termine auf
> euren Bildschirm bringen. Trage unter **Erlaubte Absender** ein, von wem
> Einladungen angenommen werden, sofern das Postfach nicht privat ist.

### Entwicklung

```bash
npm install
npm run check   # Typecheck + ESLint + Ruff
npm run dev     # Startet lokalen Test-Server
npm run build   # Erstellt die family-calendar.js
```

Python-Tests für Parser und Zuordnung des Einladungs-Abgleichs:

```bash
pip install -r tests/python/requirements.txt
pytest tests/python
```

Alle Checks müssen grün sein, bevor die Karte deployt wird; die CI führt sie bei
jedem Push aus.

### Lizenz

Dieses Projekt ist unter der **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** Lizenz veröffentlicht.

Das bedeutet:
*   **Namensnennung:** Du musst angemessene Urheber- und Rechteangaben machen.
*   **Nicht-kommerziell:** Du darfst das Material nicht für kommerzielle Zwecke nutzen.

Die vollständige Lizenz findest du in der Datei [LICENSE](LICENSE).

### Haftungsausschluss

DIE SOFTWARE WIRD OHNE JEDE AUSDRÜCKLICHE ODER IMPLIZIERTE GARANTIE BEREITGESTELLT, EINSCHLIESSLICH DER GARANTIE ZUR BENUTZUNG FÜR DEN VORGESEHENEN ZWECK. IN KEINEM FALL SIND DIE AUTOREN ODER COPYRIGHT-INHABER FÜR JEGLICHEN SCHADEN ODER SONSTIGE VERPFLICHTUNGEN HAFTBAR ZU MACHEN, OB IN EINER VERTRAGS- ODER HAFTUNGSKLAGE, DIE AUS ODER IN VERBINDUNG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN GESCHÄFTEN MIT DER SOFTWARE ENTSTEHEN.

**Der Autor behält sich das Recht vor, das Projekt jederzeit ohne Vorankündigung einzustellen, zu entfernen oder zu ändern.**
