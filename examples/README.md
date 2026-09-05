# Beispiele

## `family_calendar_package.yaml`

Backend-Package für ein Wand-Dashboard, das Kalender über Regex-Filter
ein- und ausblendet und Termine per Formular anlegt. Gehört nach
`config/packages/` und setzt in `configuration.yaml` voraus:

```yaml
homeassistant:
  packages: !include_dir_named packages
```

Die Namen (Mike, Anja, Kjell, Family, Birthdays, Holidays) sind an einen
konkreten Haushalt angepasst — beim Übernehmen anpassen. Wichtig ist,
dass drei Stellen zusammenpassen:

1. `input_text.<name>_calendar_filter`
2. `script.<name>_calendar_visible_filter`
3. der Eintrag in `calendar_map` in `add_google_calendar_event`

Der letzte Schritt ruft `browser_mod.close_popup` auf. Browser Mod muss
dafür nicht nur installiert, sondern auch als Integration hinzugefügt
sein — sonst registriert es seine Services nicht. Der Schritt ist mit
`continue_on_error` abgesichert, der Termin wird also auch ohne Browser
Mod angelegt.

## `dashboard-example.yaml`

Siehe `../tests/dashboard-example.yaml` für die Karte selbst.

## `routinen_package.yaml`

Wiederkehrende Aufgaben. Die Aufgaben-Schnittstelle von Home Assistant kennt
keine Wiederholungsregel — anders als bei Kalenderterminen gibt es kein
`rrule`. Wiederkehrendes muss deshalb zum passenden Zeitpunkt neu angelegt
werden.

Das Skript `script.routine_aufgabe_anlegen` übernimmt das und prüft vorher,
ob die Aufgabe schon offen auf der Liste steht. Ohne diese Prüfung entstünden
bei jedem Neustart oder erneuten Auslösen weitere Kopien.

```yaml
action: script.routine_aufgabe_anlegen
data:
  liste: todo.aufgaben_kjell
  aufgabe: Müll rausbringen
  faellig_in_tagen: 0      # weglassen für ohne Fälligkeit
```

Die enthaltene Beispiel-Automation ist bewusst ausgeschaltet. Zum Verwenden
kopieren, Zeitpunkt und Text anpassen, dann in den Einstellungen einschalten.

## `panel_package.yaml`

Bereichswahl fürs Wandpanel. Der Auswahlhelfer `input_select.panel_bereich`
spiegelt den Bereich, der gerade sichtbar ist: Die Hüllkarte schreibt ihn beim
Umschalten, und Automationen können darüber umschalten — etwa abends in den
Bilderrahmen.

Das Umschalten selbst läuft in der Karte und ohne Serverbeteiligung. Der
Helfer ist nur die Brücke nach außen; ohne ihn funktioniert die Karte
genauso, nur eben ohne Automationen.

Die enthaltenen Automationen schalten um 21:30 auf den Bilderrahmen und um
06:00 zurück auf den Kalender. Eine Berührung holt das Panel jederzeit
zurück — das entscheidet die Karte selbst, dafür braucht es keine Automation.
