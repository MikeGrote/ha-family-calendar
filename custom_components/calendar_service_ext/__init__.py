"""Family Calendar - Lovelace-Karte plus Einladungs-Abgleich.

Die Integration liefert das Frontend-Bundle aus und registriert es automatisch
als Lovelace-Resource. Optional traegt sie Besprechungsanfragen, die an ein
ueberwachtes Postfach gehen, in die passenden Kalender ein.

Einen eigenen Loeschservice gibt es bewusst nicht: Home Assistant Core bringt
dafuer den WebSocket-Befehl ``calendar/event/delete`` mit, den die Karte
direkt aufruft.
"""

from __future__ import annotations

import hashlib
import logging
from pathlib import Path

from homeassistant.components import frontend
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.start import async_at_started

from . import websocket
from .const import CONF_ENABLED, DOMAIN, FRONTEND_SCRIPT, URL_BASE
from .invite_sync import InviteSync
from .todo_recurrence import TodoRecurrenceWatcher

_LOGGER = logging.getLogger(__name__)

# Static Path und JS-URL sind global und ueberleben einen Config-Entry-Reload.
# Dieser Schluessel verhindert, dass sie doppelt registriert werden.
_FRONTEND_REGISTERED = f"{DOMAIN}_frontend_registered"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Richte die Integration aus einem Config Entry ein."""
    await _async_register_frontend(hass)
    websocket.async_register(hass)

    if entry.options.get(CONF_ENABLED):
        sync = InviteSync(hass, entry)
        await sync.async_start()
        hass.data.setdefault(DOMAIN, {})[entry.entry_id] = sync

    # Erst wenn Home Assistant fertig hochgefahren ist: Vorher gibt es die
    # Aufgabenlisten noch nicht, die beobachtet werden sollen.
    watcher = TodoRecurrenceWatcher(hass)
    entry.async_on_unload(async_at_started(hass, lambda _: watcher.async_start()))
    entry.async_on_unload(watcher.async_stop)

    entry.async_on_unload(entry.add_update_listener(_async_update_listener))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Entlade den Config Entry.

    Static Path und JS-URL bleiben bestehen: Home Assistant kann beides zur
    Laufzeit nicht zurueckziehen. Ein Neustart raeumt sie ab.
    """
    sync: InviteSync | None = hass.data.get(DOMAIN, {}).pop(entry.entry_id, None)
    if sync is not None:
        sync.async_stop()
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

    # Die URL bekommt eine Kennung aus dem Dateiinhalt. Ohne sie bleibt sie
    # ueber alle Versionen gleich, und Browser laden das Modul nach einem
    # Update nicht neu - das Panel zeigt dann weiter die alte Karte.
    version = await hass.async_add_executor_job(_file_fingerprint, www_dir / FRONTEND_SCRIPT)
    frontend.add_extra_js_url(hass, f"{URL_BASE}/{FRONTEND_SCRIPT}?v={version}")

    hass.data[_FRONTEND_REGISTERED] = True
    _LOGGER.info("Frontend registriert: %s/%s?v=%s", URL_BASE, FRONTEND_SCRIPT, version)


def _file_fingerprint(path: Path) -> str:
    """Kurze Kennung des Dateiinhalts. Laeuft blockierend im Thread."""
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    return digest[:12]
