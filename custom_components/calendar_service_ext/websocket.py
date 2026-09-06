"""WebSocket-Schnittstelle fuer die Einstellungen.

Die Karte spricht direkt mit dem Speicher: lesen, einen Ausschnitt schreiben,
und auf Aenderungen horchen. Das Horchen ist der Grund, warum es hier ein
Abonnement gibt und kein Abfragen im Takt - stellt jemand am Panel die
Sekunden je Bild um, soll der Bilderrahmen das sofort uebernehmen.
"""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN
from .settings_store import async_get_store

WS_GET = f"{DOMAIN}/settings/get"
WS_SET = f"{DOMAIN}/settings/set"
WS_SUBSCRIBE = f"{DOMAIN}/settings/subscribe"

_REGISTERED = f"{DOMAIN}_ws_registered"


@callback
def async_register(hass: HomeAssistant) -> None:
    """Befehle anmelden. Ueberlebt einen Reload, deshalb nur einmal."""
    if hass.data.get(_REGISTERED):
        return

    websocket_api.async_register_command(hass, ws_get)
    websocket_api.async_register_command(hass, ws_set)
    websocket_api.async_register_command(hass, ws_subscribe)
    hass.data[_REGISTERED] = True


@websocket_api.websocket_command({vol.Required("type"): WS_GET})
@websocket_api.async_response
async def ws_get(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Den aktuellen Stand liefern."""
    store = async_get_store(hass)
    connection.send_result(msg["id"], await store.async_load())


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_SET,
        vol.Required("patch"): dict,
    }
)
@websocket_api.async_response
async def ws_set(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Einen Ausschnitt einarbeiten und den neuen Stand zurueckgeben."""
    store = async_get_store(hass)
    connection.send_result(msg["id"], await store.async_update(msg["patch"]))


@websocket_api.websocket_command({vol.Required("type"): WS_SUBSCRIBE})
@websocket_api.async_response
async def ws_subscribe(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Bei jeder Aenderung den vollstaendigen Stand schicken.

    Auch gleich beim Anmelden - so braucht der Aufrufer kein zweites
    Kommando, um erstmals an die Werte zu kommen.
    """
    store = async_get_store(hass)

    @callback
    def weiterreichen(stand: dict[str, Any]) -> None:
        connection.send_event(msg["id"], stand)

    connection.subscriptions[msg["id"]] = store.async_listen(weiterreichen)
    connection.send_result(msg["id"])
    weiterreichen(await store.async_load())
