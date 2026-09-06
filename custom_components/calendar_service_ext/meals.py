"""Zugriff auf Mealie - ueber dessen Integration, nicht an ihr vorbei.

Die Karte koennte Mealie nicht selbst fragen: Der Browser am Panel erreicht
den internen Namen des Add-ons nicht, und die Kennung des Config-Entry
kennt er auch nicht. Beides weiss diese Integration, also holt sie die
Daten und reicht sie in einer Form weiter, die die Karte anzeigen kann.

Bewusst ueber die Aktionen der Mealie-Integration und nicht ueber deren
Kalender-Entitaeten: Ein Kalendereintrag traegt nur den Namen des Rezepts,
nicht seine Kennung - man koennte das Rezept also gar nicht oeffnen.
"""

from __future__ import annotations

import datetime as dt
import logging
from typing import Any

from homeassistant.config_entries import ConfigEntry, ConfigEntryState
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError

from .meal_model import plan_entries, recipe

_LOGGER = logging.getLogger(__name__)

MEALIE = "mealie"

#: Wie lange eine signierte Bildadresse gilt. Grosszuegig, weil ein Rezept
#: am Herd auch mal eine Weile offen steht.
BILD_GUELTIG = dt.timedelta(hours=12)


class MealieNichtEingerichtetError(HomeAssistantError):
    """Es gibt keine eingerichtete Mealie-Integration."""


@callback
def async_entry(hass: HomeAssistant) -> ConfigEntry | None:
    """Der Config-Entry von Mealie, bevorzugt ein geladener."""
    entries = hass.config_entries.async_entries(MEALIE)
    if not entries:
        return None

    geladen = [e for e in entries if e.state is ConfigEntryState.LOADED]
    return geladen[0] if geladen else entries[0]


@callback
def async_status(hass: HomeAssistant) -> dict[str, Any]:
    """Woran man ist - damit die Karte etwas Nuetzliches sagen kann."""
    entry = async_entry(hass)
    if entry is None:
        return {"ready": False, "reason": "missing"}
    if entry.state is not ConfigEntryState.LOADED:
        return {"ready": False, "reason": "not_loaded"}
    return {"ready": True, "reason": ""}


async def async_plan(
    hass: HomeAssistant, start: dt.date, end: dt.date
) -> list[dict[str, Any]]:
    """Der Wochenplan im angegebenen Zeitraum."""
    antwort = await _aktion(
        hass,
        "get_mealplan",
        {"start_date": start.isoformat(), "end_date": end.isoformat()},
    )
    return plan_entries(antwort.get("mealplan"))


async def async_recipe(hass: HomeAssistant, recipe_id: str) -> dict[str, Any] | None:
    """Ein einzelnes Rezept, mit Zutaten und Zubereitung."""
    antwort = await _aktion(hass, "get_recipe", {"recipe_id": recipe_id})
    return recipe(antwort.get("recipe"))


async def _aktion(
    hass: HomeAssistant, name: str, daten: dict[str, Any]
) -> dict[str, Any]:
    entry = async_entry(hass)
    if entry is None:
        raise MealieNichtEingerichtetError("Es ist keine Mealie-Integration eingerichtet.")

    antwort = await hass.services.async_call(
        MEALIE,
        name,
        {"config_entry_id": entry.entry_id, **daten},
        blocking=True,
        return_response=True,
    )
    return dict(antwort or {})


@callback
def async_image_path(recipe_id: str, gross: bool = False) -> str:
    """Pfad des Rezeptbildes bei uns - noch ohne Unterschrift.

    Klein ist die Vorgabe: In der Wochenuebersicht stehen sieben Bilder
    nebeneinander, und das Original ist mehrere Megabyte gross.
    """
    groesse = "full" if gross else "min"
    return f"/api/calendar_service_ext/recipe_image/{recipe_id}?size={groesse}"


@callback
def async_mealie_base_url(hass: HomeAssistant) -> str | None:
    """Adresse, unter der Mealie fuer Home Assistant erreichbar ist.

    Aus dem Config-Entry und nicht fest verdrahtet: Es muss nicht das
    Add-on auf dieser Box sein.
    """
    entry = async_entry(hass)
    if entry is None:
        return None

    for schluessel in ("host", "url", "base_url"):
        wert = entry.data.get(schluessel)
        if wert:
            return str(wert).rstrip("/")
    return None
