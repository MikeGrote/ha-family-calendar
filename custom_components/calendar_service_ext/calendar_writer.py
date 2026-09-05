"""Schreibt Termine in Home-Assistant-Kalender.

Die Kalender-Entities werden direkt angesprochen statt ueber Services: Nur
so laesst sich nach dem Anlegen die vergebene Kennung ermitteln, die zum
spaeteren Absagen gebraucht wird.
"""

from __future__ import annotations

import datetime as dt
import logging
from typing import Any

from homeassistant.core import HomeAssistant

from .invite_model import ParsedInvite

_LOGGER = logging.getLogger(__name__)


class CalendarWriter:
    """Legt Termine an und entfernt sie wieder."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Merke den Kontext."""
        self._hass = hass

    async def async_create(self, entity_id: str, invite: ParsedInvite) -> str | None:
        """Lege den Termin an und gib seine Kennung zurueck."""
        entity = self._entity(entity_id)
        if entity is None:
            return None

        payload: dict[str, Any] = {
            "summary": invite.summary,
            "dtstart": invite.start,
            "dtend": invite.end,
        }
        if invite.description:
            payload["description"] = invite.description
        if invite.location:
            payload["location"] = invite.location

        await entity.async_create_event(**payload)
        return await self._async_find_created(entity, invite)

    async def async_delete(self, entity_id: str, uid: str) -> None:
        """Entferne einen Termin. Fehlt er bereits, ist das kein Fehler."""
        entity = self._entity(entity_id)
        if entity is None or not uid:
            return
        try:
            await entity.async_delete_event(uid=uid)
        except Exception:  # kann von Hand geloescht worden sein
            _LOGGER.debug("Termin %s liess sich nicht loeschen", uid, exc_info=True)

    def _entity(self, entity_id: str) -> Any | None:
        """Hole die Kalender-Entity aus der Kalenderkomponente."""
        component = self._hass.data.get("calendar")
        entity = component.get_entity(entity_id) if component else None
        if entity is None:
            _LOGGER.error("Kalender %s existiert nicht", entity_id)
        return entity

    async def _async_find_created(self, entity: Any, invite: ParsedInvite) -> str | None:
        """Finde die von Home Assistant vergebene Kennung des neuen Termins.

        async_create_event gibt sie nicht zurueck, deshalb wird direkt danach
        im Zeitfenster des Termins nachgesehen.
        """
        start, end = invite.as_datetime_window()
        try:
            events = await entity.async_get_events(
                self._hass, start - dt.timedelta(minutes=1), end + dt.timedelta(minutes=1)
            )
        except Exception:  # ohne Kennung geht nur das Absagen verloren
            _LOGGER.debug("Neuer Termin liess sich nicht nachschlagen", exc_info=True)
            return None

        for event in reversed(events):
            if event.summary == invite.summary and event.uid:
                return event.uid
        return None
