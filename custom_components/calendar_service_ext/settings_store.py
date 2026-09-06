"""Einstellungen der App.

Abgelegt im Speicher von Home Assistant, nicht in der Dashboard-Konfiguration.
Das hat drei Gruende: Die Werte ueberstehen jedes Umbauen der Ansicht, sie
liegen im Backup, und das Panel kann sie schreiben, ohne die Lovelace-Datei
anzufassen.

Geschrieben wird immer nur ein Ausschnitt. Wer die Sekunden je Bild aendert,
schickt genau dieses Feld - nicht den ganzen Baum. So koennen zwei Bereiche
gleichzeitig offen sein, ohne sich gegenseitig zu ueberschreiben.
"""

from __future__ import annotations

from collections.abc import Callable
from copy import deepcopy
from typing import Any

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.storage import Store

from .const import DOMAIN, SETTINGS_KEY, SETTINGS_VERSION

# Nur was auch wirklich gelesen wird. Ein Abschnitt fuer noch nicht gebaute
# Bereiche waere ein Versprechen, das die Karte nicht einloest.
DEFAULTS: dict[str, Any] = {
    "photos": {
        "folder": "media-source://media_source/local/fotos",
        "interval": 30,
        "showClock": True,
        "rescanMinutes": 60,
    },
    "panel": {
        # BrowserIDs (browser_mod) der Bildschirme, die sich den
        # Auswahlhelfer teilen. Der Helfer ist eine einzige globale
        # Entitaet: Wer mitmacht, folgt ihm und meldet zurueck - und zieht
        # damit die anderen Gekoppelten mit. Wer nicht darin steht, ist fuer
        # sich. Leer ist die Vorgabe, weil ein Bildschirm normalerweise
        # niemanden sonst fernsteuern soll.
        #
        # Automationen schalten ueber diesen Helfer um; das Wandpanel
        # gehoert deshalb ueblicherweise hinein.
        "syncedBrowsers": [],
        # Leere Zeichenketten und Nullen heissen durchweg: nichts eingestellt,
        # es gilt der Eintrag im Dashboard. Nur so laesst sich eine einzelne
        # Einstellung wieder abgeben, ohne die anderen mitzunehmen.
        "initialArea": "",
        "idleAfter": 0,
        "idleArea": "",
        "fullscreenArea": "",
        "fullscreenAfter": 0,
    },
    "calendars": {
        # Reihenfolge, in der die Kalender in der Kopfzeile stehen.
        "order": [],
        # entity_id -> {"name": str, "color": str, "active": bool}
        "items": {},
        # Mit der gestauchten Zeitachse beginnen statt mit dem Stundenraster.
        "startCompact": False,
    },
    # Schluessel der Aufgabenkarte -> ihre Spalten. Zwei Karten (Aufgaben und
    # Listen) teilen sich sonst einen Eintrag und ueberschreiben einander.
    "tasks": {},
}


class SettingsStore:
    """Laedt, fuehrt zusammen und meldet Aenderungen."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._store: Store[dict[str, Any]] = Store(hass, SETTINGS_VERSION, SETTINGS_KEY)
        self._data: dict[str, Any] = deepcopy(DEFAULTS)
        self._listeners: list[Callable[[dict[str, Any]], None]] = []
        self._loaded = False

    @property
    def data(self) -> dict[str, Any]:
        """Der aktuelle Stand als Kopie."""
        return deepcopy(self._data)

    async def async_load(self) -> dict[str, Any]:
        """Vom Datentraeger lesen; fehlende Felder kommen aus den Vorgaben."""
        if not self._loaded:
            gespeichert = await self._store.async_load() or {}
            self._data = uebernehme_alte_fuehrung(merge(deepcopy(DEFAULTS), gespeichert))
            self._loaded = True
        return self.data

    async def async_update(self, patch: dict[str, Any]) -> dict[str, Any]:
        """Einen Ausschnitt einarbeiten und sichern."""
        await self.async_load()
        self._data = merge(self._data, patch)
        await self._store.async_save(self._data)
        self._notify()
        return self.data

    @callback
    def async_listen(self, listener: Callable[[dict[str, Any]], None]) -> Callable[[], None]:
        """Auf Aenderungen horchen. Der Rueckgabewert beendet das Horchen."""
        self._listeners.append(listener)

        @callback
        def unsubscribe() -> None:
            if listener in self._listeners:
                self._listeners.remove(listener)

        return unsubscribe

    def _notify(self) -> None:
        stand = self.data
        for listener in list(self._listeners):
            listener(stand)


def uebernehme_alte_fuehrung(daten: dict[str, Any]) -> dict[str, Any]:
    """Uebertraegt das fruehere "ein Geraet fuehrt" auf die Kopplung.

    Zuerst gab es genau ein fuehrendes Geraet, dem alle anderen folgten. Das
    Modell ist inzwischen umgekehrt - jeder Bildschirm ist fuer sich, und wer
    mitmachen will, koppelt sich. Wer damals ein Geraet festgelegt hat, soll
    nicht von vorn anfangen muessen.
    """
    panel = daten.get("panel", {})
    alt = panel.get("leadBrowser")
    if alt and not panel.get("syncedBrowsers"):
        panel["syncedBrowsers"] = [alt]
    panel.pop("leadBrowser", None)
    return daten


def merge(basis: dict[str, Any], patch: dict[str, Any]) -> dict[str, Any]:
    """Zwei Baeume zusammenfuehren.

    Woerterbuecher werden Ebene fuer Ebene verschmolzen, alles andere ersetzt.
    Eine Liste ist immer als Ganzes gemeint - haetten wir sie zusammengefuegt,
    liesse sich kein Eintrag mehr loeschen.
    """
    ergebnis = dict(basis)
    for schluessel, wert in patch.items():
        vorhanden = ergebnis.get(schluessel)
        if isinstance(vorhanden, dict) and isinstance(wert, dict):
            ergebnis[schluessel] = merge(vorhanden, wert)
        else:
            ergebnis[schluessel] = deepcopy(wert)
    return ergebnis


# Eigener Platz in hass.data: Unter DOMAIN liegen die Config Entries, und
# der Speicher gehoert keinem davon - er lebt laenger als jeder einzelne.
_STORE_KEY = f"{DOMAIN}_settings"


@callback
def async_get_store(hass: HomeAssistant) -> SettingsStore:
    """Der eine Speicher der Integration, unabhaengig vom Config Entry."""
    if _STORE_KEY not in hass.data:
        hass.data[_STORE_KEY] = SettingsStore(hass)
    return hass.data[_STORE_KEY]
