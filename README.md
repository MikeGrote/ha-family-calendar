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
*   **Compact mode** — the same week on a squashed time axis. Every busy
    minute keeps the same scale, so two events stay comparable in length,
    while long empty stretches collapse into a marked break. The week fits
    without scrolling.
*   **Adaptive time axis** — the visible hours follow the events of the week.

**Invitation sync** (optional)

*   Invite an address of a watched mailbox to a meeting and the event appears in
    the matching Home Assistant calendar.
*   **Plus addressing decides the target:** an invitation sent to
    `mailbox+mike@example.com` lands in the calendar mapped to the tag `mike`.
*   Cancellations remove the event again; rescheduled meetings replace it.
*   Works with any IMAP mailbox — no calendar API, no admin consent, and only
    what you deliberately invite ever reaches the screen.

**Overview and shell**

*   **Agenda card** — the next days as a list rather than a grid: what is on
    today and tomorrow, without reading a timetable.
*   **Shell card** — a sidebar plus areas that stay mounted. Switching between
    areas is instant and nothing reloads.

**Tasks and lists**

*   **Task card** — one card for chores per person and for shopping lists.
*   **Recurring tasks** — daily, weekly, monthly or yearly, with an interval.
    Home Assistant has no recurrence rule for tasks, so the integration
    rebuilds it: tick a task off and the next one appears.
*   Tap the text to correct a task, change its rhythm or delete it.

**Photo frame and settings**

*   **Photo frame** — pictures from a folder of the media store, with clock and
    date. New pictures appear on their own; nobody maintains a list.
*   **Settings area** — the parameters of the app, in the design of the app:
    upload pictures, set up the frame, and see what Home Assistant already
    holds. The values live in the integration, not in the dashboard
    configuration, so they survive every rebuild of the view.
*   What Home Assistant already provides is shown, not set a second time. The
    time zone is its example: two places to set it would mean two answers.
*   **One screen leads** — the shell mirrors the current area into a helper so
    automations can switch the panel. That helper is a single global entity, so
    without this every click on any screen drags all the others along. Press
    "Dieses Gerät" on the panel itself, and other browsers follow automations
    but keep their own clicks to themselves.

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

#### The shell

One view holds everything; the sidebar switches between areas without
reloading them.

If you also set `syncEntity` so automations can switch the panel, every area
id must be an option of that `input_select`. An area the helper cannot name
snaps straight back to the previous one.

```yaml
type: custom:family-shell
initial: kalender
areas:
  - id: kalender
    icon: mdi:calendar-month
    name: Calendar
    card:
      type: custom:family-calendar
      entities: [calendar.privat]
  - id: agenda
    icon: mdi:view-agenda-outline
    name: Overview
    card:
      type: custom:family-agenda
      entities: [calendar.privat]
      days: 7
  - id: tasks
    icon: mdi:check-circle-outline
    name: Tasks
    disabled: true          # visible, not yet filled
  - id: photos
    icon: mdi:image-multiple-outline
    name: Photos
    card:
      type: custom:family-photos
  - id: settings
    icon: mdi:cog-outline
    name: Settings
    card:
      type: custom:family-settings
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
*   **Kompaktmodus** — dieselbe Woche auf gestauchter Zeitachse. Belegte Zeit
    behält überall denselben Maßstab, zwei Termine bleiben also in ihrer
    Länge vergleichbar, während lange Leerstellen zu einem gekennzeichneten
    Bruch zusammenfallen. Die Woche passt ohne Scrollen aufs Bild.
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

**Übersicht und Hülle**

*   **Übersichtskarte** — die nächsten Tage als Liste statt als Raster: was
    heute und morgen ansteht, ohne einen Stundenplan lesen zu müssen.
*   **Hüllkarte** — Seitenleiste mit Bereichen, die geladen bleiben. Das
    Umschalten geht ohne Verzögerung, es wird nichts neu aufgebaut.

**Aufgaben und Listen**

*   **Aufgabenkarte** — eine Karte für Pflichten je Person und für
    Einkaufslisten.
*   **Wiederkehrende Aufgaben** — täglich, wöchentlich, monatlich oder
    jährlich, mit Intervall. Home Assistant kennt für Aufgaben keine
    Wiederholungsregel, die Integration baut sie nach: abhaken, und die
    nächste erscheint.
*   Ein Tipp auf den Text korrigiert eine Aufgabe, ändert den Rhythmus oder
    löscht sie.

**Bilderrahmen und Einstellungen**

*   **Bilderrahmen** — Bilder aus einem Ordner der Medienablage, mit Uhrzeit
    und Datum. Neue Bilder erscheinen von selbst, niemand pflegt eine Liste.
*   **Einstellungsbereich** — die Parameter der App, im Design der App: Bilder
    hochladen, den Rahmen einstellen, und sehen, was Home Assistant ohnehin
    führt. Die Werte liegen in der Integration, nicht in der
    Dashboard-Konfiguration, und überstehen damit jeden Umbau der Ansicht.
*   Was Home Assistant schon führt, wird gezeigt und nicht ein zweites Mal
    gesetzt. Die Zeitzone ist das Beispiel: zwei Orte dafür hießen zwei
    Antworten.
*   **Ein Bildschirm führt** — die Hülle spiegelt den Bereich in einen Helfer,
    damit Automationen das Panel umschalten können. Dieser Helfer ist eine
    einzige globale Entität; ohne die Festlegung zieht jeder Klick auf
    irgendeinem Bildschirm alle anderen mit. Am Panel selbst auf „Dieses
    Gerät" tippen, dann folgen andere Browser weiter den Automationen,
    behalten ihre Klicks aber für sich.

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

#### Die Hülle

Eine Ansicht trägt alles; die Seitenleiste schaltet zwischen den Bereichen um,
ohne sie neu zu laden.

Wer zusätzlich `syncEntity` setzt, damit Automationen das Panel umschalten
können, muss jede Bereichskennung als Option in diesem `input_select` führen.
Ein Bereich, den der Helfer nicht benennen kann, springt sofort auf den
vorherigen zurück.

```yaml
type: custom:family-shell
initial: kalender
areas:
  - id: kalender
    icon: mdi:calendar-month
    name: Kalender
    card:
      type: custom:family-calendar
      entities: [calendar.privat]
  - id: uebersicht
    icon: mdi:view-agenda-outline
    name: Übersicht
    card:
      type: custom:family-agenda
      entities: [calendar.privat]
      days: 7
  - id: aufgaben
    icon: mdi:check-circle-outline
    name: Aufgaben
    disabled: true          # sichtbar, noch ohne Inhalt
  - id: fotos
    icon: mdi:image-multiple-outline
    name: Fotos
    card:
      type: custom:family-photos
  - id: einstellungen
    icon: mdi:cog-outline
    name: Einstellungen
    card:
      type: custom:family-settings
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
