"""Ein Rezept in Mealie anlegen.

Home Assistant kann Rezepte nur aus einer Webadresse holen, nicht selbst
schreiben. Und Mealies Importer weigert sich - zu Recht - Adressen im
eigenen Netz zu lesen; ein Umweg ueber eine selbst ausgelieferte Seite
scheitert daran. Bleibt der direkte Weg ueber Mealies Schnittstelle.

Angelegt wird in zwei Schritten, so wie Mealie es vorsieht: erst der Name,
dann der Rest. Gepatcht wird auf dem geholten Bestand, nicht auf einem
leeren Objekt - sonst gingen die Felder verloren, die Mealie selbst gesetzt
hat.
"""

from __future__ import annotations

import logging
from typing import Any

from aiohttp import ClientError
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .meals import async_mealie_credentials
from .recipe_payload import build_recipe

_LOGGER = logging.getLogger(__name__)

_ZEITLIMIT = 30


class RezeptFehlerError(HomeAssistantError):
    """Das Rezept liess sich nicht anlegen."""


async def async_create_recipe(hass: HomeAssistant, daten: dict[str, Any]) -> str:
    """Legt ein Rezept an und gibt seinen Slug zurueck."""
    zugang = async_mealie_credentials(hass)
    if zugang is None:
        raise RezeptFehlerError(
            "Mealie ist nicht eingerichtet oder der Config-Entry hat keinen Schluessel."
        )

    basis, token = zugang
    kopf = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    sitzung = async_get_clientsession(hass)
    name = str(daten.get("name") or "").strip()
    if not name:
        raise RezeptFehlerError("Ein Rezept braucht einen Namen.")

    # Ein bereits vorhandenes Rezept wird ueberschrieben statt ein zweites
    # anzulegen. Sonst haeuften sich bei jedem Versuch Dubletten mit "(1)"
    # im Namen - und Mealie weist den Schreibversuch dann ohnehin ab.
    slug = str(daten.get("slug") or "").strip()
    if slug:
        bestand = await _holen(sitzung, basis, kopf, slug)
    else:
        slug = await _anlegen(sitzung, basis, kopf, name)
        bestand = await _holen(sitzung, basis, kopf, slug)

    # Kategorien und Schlagworte muessen als vorhandene Objekte mitgehen.
    # Nur ihren Namen zu schicken laesst Mealie versuchen, sie anzulegen -
    # und das scheitert, sobald es sie schon gibt.
    kategorien = await _ordner(sitzung, basis, kopf, "categories", daten.get("categories"))
    schlagworte = await _ordner(sitzung, basis, kopf, "tags", daten.get("tags"))

    nutzlast = {
        **bestand,
        **build_recipe(
            name,
            [str(z) for z in daten.get("ingredients") or []],
            list(daten.get("instructions") or []),
            description=str(daten.get("description") or ""),
            servings=float(daten.get("servings") or 0),
            total_time=str(daten.get("total_time") or ""),
            prep_time=str(daten.get("prep_time") or ""),
        ),
        "recipeCategory": kategorien,
        "tags": schlagworte,
    }

    await _schreiben(sitzung, basis, kopf, slug, nutzlast)
    _LOGGER.info("Rezept angelegt: %s", slug)
    return slug


async def _ordner(
    sitzung, basis: str, kopf: dict[str, str], art: str, namen: Any
) -> list[dict[str, Any]]:
    """Kategorien oder Schlagworte auflösen - vorhandene nehmen, fehlende anlegen."""
    if not namen:
        return []

    adresse = f"{basis}/api/organizers/{art}"
    vorhanden = await _ruf(sitzung, "get", f"{adresse}?perPage=200", kopf, None)
    bekannt = {
        str(e.get("name", "")).casefold(): e
        for e in (vorhanden or {}).get("items", [])
        if isinstance(e, dict)
    }

    ergebnis: list[dict[str, Any]] = []
    for name in namen:
        eintrag = bekannt.get(str(name).casefold())
        if eintrag is None:
            eintrag = await _ruf(sitzung, "post", adresse, kopf, {"name": str(name)})
        if isinstance(eintrag, dict) and eintrag.get("id"):
            ergebnis.append(eintrag)
        else:
            _LOGGER.debug("Ordner %r liess sich nicht aufloesen, wird ausgelassen", name)

    return ergebnis


async def _anlegen(sitzung, basis: str, kopf: dict[str, str], name: str) -> str:
    antwort = await _ruf(sitzung, "post", f"{basis}/api/recipes", kopf, {"name": name})
    # Mealie antwortet hier mit dem Slug als blosser Zeichenkette.
    return str(antwort).strip('"')


async def _holen(sitzung, basis: str, kopf: dict[str, str], slug: str) -> dict[str, Any]:
    antwort = await _ruf(sitzung, "get", f"{basis}/api/recipes/{slug}", kopf, None)
    if not isinstance(antwort, dict):
        raise RezeptFehlerError(f"Unerwartete Antwort beim Lesen von {slug}.")
    return antwort


async def _schreiben(
    sitzung, basis: str, kopf: dict[str, str], slug: str, nutzlast: dict[str, Any]
) -> None:
    """Speichert das vollstaendige Rezept.

    Mit PUT und nicht mit PATCH: PATCH laeuft bei Mealie durch eine
    Zusammenfuehrung, die den Slug aus dem Namen neu bildet und dabei mit
    dem Rezept selbst kollidiert - "Recipe already exists", obwohl es um
    genau dieses geht. PUT ersetzt und ist auch das, was Mealies eigene
    Oberflaeche benutzt.
    """
    await _ruf(sitzung, "put", f"{basis}/api/recipes/{slug}", kopf, nutzlast)


async def _ruf(
    sitzung, methode: str, adresse: str, kopf: dict[str, str], koerper: Any
) -> Any:
    try:
        antwort = await getattr(sitzung, methode)(
            adresse, headers=kopf, json=koerper, timeout=_ZEITLIMIT
        )
    except (ClientError, TimeoutError) as err:
        raise RezeptFehlerError(f"Mealie antwortet nicht: {err}") from err

    if antwort.status >= 400:
        text = (await antwort.text())[:300]
        raise RezeptFehlerError(f"Mealie lehnt ab ({antwort.status}): {text}")

    if antwort.content_type == "application/json":
        return await antwort.json()
    return (await antwort.text()).strip()
