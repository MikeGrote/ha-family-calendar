"""Gesichter zu einem Bild der Medienablage.

Gelesen wird einmal je Datei und dann gemerkt: Die Angaben stehen im Kopf
der Datei und aendern sich nur, wenn die Datei sich aendert. Auf einem
kleinen Rechner ist das der Unterschied zwischen "faellt nicht auf" und
"jedes Bild ruckelt beim Wechsel".
"""

from __future__ import annotations

import logging
from pathlib import Path
from typing import Any

from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN
from .face_regions import KOPF_BYTES, faces_from_bytes

_LOGGER = logging.getLogger(__name__)

PREFIX = "media-source://media_source/"

# Gemerkt wird ueber Pfad, Aenderungszeit und Groesse: Wird ein Bild
# ersetzt, faellt der Eintrag von selbst heraus.
_CACHE_KEY = f"{DOMAIN}_faces"


@callback
def async_media_path(hass: HomeAssistant, media_content_id: str) -> Path | None:
    """Datei hinter einer Medienkennung - oder None, wenn sie nicht passt."""
    if not media_content_id.startswith(PREFIX):
        return None

    rest = media_content_id[len(PREFIX) :]
    schluessel, _, relativ = rest.partition("/")
    basis = hass.config.media_dirs.get(schluessel)
    if not basis or not relativ:
        return None

    wurzel = Path(basis).resolve()
    ziel = (wurzel / relativ).resolve()

    # Ein ".." in der Kennung darf nicht aus der Medienablage herausfuehren.
    if not ziel.is_relative_to(wurzel):
        _LOGGER.warning("Medienkennung zeigt aus der Ablage heraus: %s", media_content_id)
        return None

    return ziel


async def async_faces_for(hass: HomeAssistant, media_content_id: str) -> list[dict[str, float]]:
    """Gesichter des Bildes, in Anteilen des angezeigten Bildes."""
    pfad = async_media_path(hass, media_content_id)
    if pfad is None:
        return []

    cache: dict[Any, list[dict[str, float]]] = hass.data.setdefault(_CACHE_KEY, {})
    return await hass.async_add_executor_job(_lies_mit_cache, cache, pfad)


def _lies_mit_cache(
    cache: dict[Any, list[dict[str, float]]], pfad: Path
) -> list[dict[str, float]]:
    """Laeuft blockierend im Thread: Dateizugriff gehoert nicht in die Schleife."""
    try:
        zustand = pfad.stat()
    except OSError:
        return []

    schluessel = (str(pfad), zustand.st_mtime_ns, zustand.st_size)
    gemerkt = cache.get(schluessel)
    if gemerkt is not None:
        return gemerkt

    try:
        with pfad.open("rb") as datei:
            # Nur der Kopf: Bei fuenf Megabyte je Foto waere alles zu lesen
            # verschwenderisch, und weiter hinten steht ohnehin nichts.
            kopf = datei.read(KOPF_BYTES)
    except OSError as err:
        _LOGGER.debug("Bild nicht lesbar: %s (%s)", pfad, err)
        return []

    gefunden = [region.as_dict() for region in faces_from_bytes(kopf)]

    # Der Cache waechst mit der Zahl der Bilder; ein Bilderrahmen hat davon
    # Hunderte, nicht Millionen. Bei einem Neustart faengt er ohnehin an.
    cache[schluessel] = gefunden
    return gefunden
