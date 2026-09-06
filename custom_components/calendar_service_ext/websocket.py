"""WebSocket-Schnittstelle fuer die Einstellungen.

Die Karte spricht direkt mit dem Speicher: lesen, einen Ausschnitt schreiben,
und auf Aenderungen horchen. Das Horchen ist der Grund, warum es hier ein
Abonnement gibt und kein Abfragen im Takt - stellt jemand am Panel die
Sekunden je Bild um, soll der Bilderrahmen das sofort uebernehmen.
"""

from __future__ import annotations

import logging
from datetime import date
from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.components.http.auth import async_sign_path
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError

from .const import DOMAIN
from .meals import (
    BILD_GUELTIG,
    MealieNichtEingerichtetError,
    async_image_path,
    async_plan,
    async_recipe,
    async_status,
)
from .photo_faces import async_faces_for
from .settings_store import async_get_store

_LOGGER = logging.getLogger(__name__)

WS_GET = f"{DOMAIN}/settings/get"
WS_SET = f"{DOMAIN}/settings/set"
WS_SUBSCRIBE = f"{DOMAIN}/settings/subscribe"
WS_FACES = f"{DOMAIN}/photos/faces"
WS_MEAL_PLAN = f"{DOMAIN}/meals/plan"
WS_RECIPE = f"{DOMAIN}/meals/recipe"

_REGISTERED = f"{DOMAIN}_ws_registered"


@callback
def async_register(hass: HomeAssistant) -> None:
    """Befehle anmelden. Ueberlebt einen Reload, deshalb nur einmal."""
    if hass.data.get(_REGISTERED):
        return

    websocket_api.async_register_command(hass, ws_get)
    websocket_api.async_register_command(hass, ws_set)
    websocket_api.async_register_command(hass, ws_subscribe)
    websocket_api.async_register_command(hass, ws_faces)
    websocket_api.async_register_command(hass, ws_meal_plan)
    websocket_api.async_register_command(hass, ws_recipe)
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


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_FACES,
        vol.Required("media_content_id"): str,
    }
)
@websocket_api.async_response
async def ws_faces(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Gesichter eines Bildes, damit der Ausschnitt sie nicht abschneidet.

    Die Angaben stehen bereits in der Datei - Kameras und Fotoverwaltungen
    schreiben sie nach dem Standard der Metadata Working Group. Gerechnet
    wird hier also nichts, nur gelesen und gemerkt.
    """
    faces = await async_faces_for(hass, msg["media_content_id"])
    connection.send_result(msg["id"], {"faces": faces})


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_MEAL_PLAN,
        vol.Required("start_date"): str,
        vol.Required("end_date"): str,
    }
)
@websocket_api.async_response
async def ws_meal_plan(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Der Wochenplan eines Zeitraums.

    Antwortet auch ohne eingerichtetes Mealie - dann mit ``ready: false``
    statt mit einem Fehler. Die Karte soll erklaeren koennen, was fehlt,
    statt nur leer zu bleiben.
    """
    status = async_status(hass)
    if not status["ready"]:
        connection.send_result(msg["id"], {**status, "entries": []})
        return

    try:
        eintraege = await async_plan(
            hass,
            date.fromisoformat(msg["start_date"]),
            date.fromisoformat(msg["end_date"]),
        )
    except (MealieNichtEingerichtetError, HomeAssistantError):
        _LOGGER.exception("Essensplan nicht abrufbar")
        connection.send_result(
            msg["id"], {"ready": False, "reason": "error", "entries": []}
        )
        return

    for eintrag in eintraege:
        eintrag["image"] = _bildadresse(hass, eintrag["recipeId"], eintrag["hasImage"])

    connection.send_result(msg["id"], {**status, "entries": eintraege})


@websocket_api.websocket_command(
    {
        vol.Required("type"): WS_RECIPE,
        vol.Required("recipe_id"): str,
    }
)
@websocket_api.async_response
async def ws_recipe(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Ein Rezept mit Zutaten und Zubereitung."""
    try:
        rezept = await async_recipe(hass, msg["recipe_id"])
    except (MealieNichtEingerichtetError, HomeAssistantError) as err:
        connection.send_error(msg["id"], "mealie_error", str(err))
        return

    if rezept is None:
        connection.send_error(msg["id"], "not_found", "Rezept nicht gefunden.")
        return

    rezept["image"] = _bildadresse(hass, rezept["recipeId"], rezept["hasImage"], gross=True)
    connection.send_result(msg["id"], {"recipe": rezept})


def _bildadresse(
    hass: HomeAssistant, recipe_id: str, vorhanden: bool, gross: bool = False
) -> str:
    """Signierte Adresse des Bildes, oder leer wenn es keines gibt.

    Signiert, weil ein Bild in einem img-Element keinen Anmeldekopf
    mitschicken kann - genau wie bei den Bildern der Medienablage.
    """
    if not vorhanden or not recipe_id:
        return ""
    return async_sign_path(hass, async_image_path(recipe_id, gross), BILD_GUELTIG)
