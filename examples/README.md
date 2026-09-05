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
