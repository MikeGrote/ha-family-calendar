"""Family Calendar - Lovelace-Karte plus Erweiterungspunkt fuer eigene Logik.

Die Integration liefert das Frontend-Bundle aus und registriert es automatisch
als Lovelace-Resource. Ein eigener Loeschservice wird bewusst nicht mehr
angeboten: Home Assistant Core bringt dafuer den WebSocket-Befehl
``calendar/event/delete`` mit, den die Karte direkt aufruft.
"""

from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components import frontend
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN, FRONTEND_SCRIPT, URL_BASE

_LOGGER = logging.getLogger(__name__)

# Static Path und JS-URL sind global und ueberleben einen Config-Entry-Reload.
# Dieser Schluessel verhindert, dass sie doppelt registriert werden.
_FRONTEND_REGISTERED = f"{DOMAIN}_frontend_registered"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Richte die Integration aus einem Config Entry ein."""
    await _async_register_frontend(hass)
    entry.async_on_unload(entry.add_update_listener(_async_update_listener))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:  # noqa: ARG001
    """Entlade den Config Entry.

    Static Path und JS-URL bleiben bestehen: Home Assistant kann beides zur
    Laufzeit nicht zurueckziehen. Ein Neustart raeumt sie ab.
    """
    return True


async def _async_update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Lade den Eintrag neu, wenn die Optionen geaendert wurden."""
    await hass.config_entries.async_reload(entry.entry_id)


async def _async_register_frontend(hass: HomeAssistant) -> None:
    """Liefere das JS-Bundle aus und melde es als Lovelace-Resource an."""
    if hass.data.get(_FRONTEND_REGISTERED):
        return

    www_dir = Path(__file__).parent / "www"
    if not (www_dir / FRONTEND_SCRIPT).is_file():
        _LOGGER.error(
            "Frontend-Bundle %s fehlt in %s - bitte 'npm run build' ausfuehren",
            FRONTEND_SCRIPT,
            www_dir,
        )
        return

    await hass.http.async_register_static_paths(
        [StaticPathConfig(URL_BASE, str(www_dir), cache_headers=False)]
    )
    frontend.add_extra_js_url(hass, f"{URL_BASE}/{FRONTEND_SCRIPT}")

    hass.data[_FRONTEND_REGISTERED] = True
    _LOGGER.debug("Frontend registriert: %s/%s", URL_BASE, FRONTEND_SCRIPT)
