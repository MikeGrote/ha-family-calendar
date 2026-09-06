"""Rezeptbilder auf den Schirm bringen.

Mealie liefert seine Bilder ohne Anmeldung aus - geprueft an der laufenden
Instanz: Der Rezeptpfad antwortet mit 401, der Medienpfad nicht. Nur
erreicht der Browser am Panel den internen Namen des Add-ons nicht. Diese
Ansicht holt das Bild deshalb im Namen von Home Assistant und reicht es
weiter.

Angemeldet wird trotzdem: ueber einen signierten Pfad, den die Karte sich
holt. Damit sieht die Bilder, wer sich an Home Assistant anmelden darf -
und nicht jeder im Heimnetz, der eine Kennung erraet.
"""

from __future__ import annotations

import logging

from aiohttp import ClientError, web
from homeassistant.components.http import KEY_HASS, HomeAssistantView
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .meals import async_mealie_base_url

_LOGGER = logging.getLogger(__name__)

#: Klein fuer die Uebersicht, gross fuer das offene Rezept. Das Original
#: kann mehrere Megabyte haben - sieben davon nebeneinander waeren auf
#: einem Wandpanel deutlich zu spueren.
_DATEIEN = {
    "min": "min-original.webp",
    "full": "original.webp",
}

_ZEITLIMIT = 20


class RecipeImageView(HomeAssistantView):
    """Reicht ein Rezeptbild aus Mealie weiter."""

    url = "/api/calendar_service_ext/recipe_image/{recipe_id}"
    name = "api:calendar_service_ext:recipe_image"
    # Signierte Pfade gelten dabei als Anmeldung - genau wie bei den
    # Bildern der Medienablage, die der Bilderrahmen schon nutzt.
    requires_auth = True

    async def get(self, request: web.Request, recipe_id: str) -> web.StreamResponse:
        """Bild holen und durchreichen."""
        hass = request.app[KEY_HASS]

        basis = async_mealie_base_url(hass)
        if not basis:
            return web.Response(status=503, text="Mealie ist nicht eingerichtet.")

        datei = _DATEIEN.get(request.query.get("size", "min"), _DATEIEN["min"])
        quelle = f"{basis}/api/media/recipes/{recipe_id}/images/{datei}"

        try:
            antwort = await async_get_clientsession(hass).get(quelle, timeout=_ZEITLIMIT)
        except (ClientError, TimeoutError) as err:
            _LOGGER.debug("Rezeptbild nicht abrufbar: %s (%s)", quelle, err)
            return web.Response(status=502, text="Mealie antwortet nicht.")

        if antwort.status != 200:
            # Nicht jedes Rezept hat ein Bild; das ist kein Fehler, sondern
            # der Normalfall bei selbst eingetippten Rezepten.
            return web.Response(status=antwort.status)

        return web.Response(
            body=await antwort.read(),
            content_type=antwort.content_type or "image/webp",
            headers={"Cache-Control": "private, max-age=3600"},
        )
