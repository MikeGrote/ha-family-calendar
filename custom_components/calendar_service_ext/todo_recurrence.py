"""Wiederholungen fuer Aufgaben.

Home Assistant kennt fuer Aufgaben keine Wiederholungsregel - anders als bei
Kalenderterminen gibt es kein rrule. Diese Ergaenzung baut sie nach: Wird
eine Aufgabe abgehakt, entsteht die naechste.

Die Regel reist in der Beschreibung der Aufgabe mit, in einer eigenen Zeile:

    [wdh: FREQ=WEEKLY;INTERVAL=1]

Das hat zwei Gruende. Erstens ueberlebt sie damit den Wechsel der Kennung,
die beim Neuanlegen ohnehin eine andere ist. Zweitens haengt sie an der
Aufgabe selbst - abhaken laesst sich auch am Telefon oder in der
Standardkarte, und die Wiederholung greift trotzdem.
"""

from __future__ import annotations

import datetime as dt
import logging
import re
from dataclasses import dataclass

from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.helpers.event import async_track_state_change_event

_LOGGER = logging.getLogger(__name__)

MARKER = re.compile(r"^\[wdh:\s*([^\]]+)\]\s*$", re.MULTILINE)

TODO_DOMAIN = "todo"
STATUS_COMPLETED = "completed"

# Wie weit die Faelligkeit hoechstens nachgezogen wird. Ohne Grenze wuerde
# eine sehr alte Aufgabe eine lange Schleife ausloesen.
MAX_ADVANCES = 500


@dataclass(frozen=True)
class Recurrence:
    """Eine Wiederholungsregel in der von uns unterstuetzten Form."""

    frequency: str
    interval: int = 1

    def next_after(self, base: dt.date) -> dt.date:
        """Naechster Termin nach dem angegebenen Datum."""
        step = max(1, self.interval)
        if self.frequency == "DAILY":
            return base + dt.timedelta(days=step)
        if self.frequency == "WEEKLY":
            return base + dt.timedelta(weeks=step)
        if self.frequency == "MONTHLY":
            return _add_months(base, step)
        if self.frequency == "YEARLY":
            return _add_months(base, 12 * step)
        return base + dt.timedelta(days=step)


def _add_months(base: dt.date, months: int) -> dt.date:
    """Monate addieren und dabei auf das Monatsende begrenzen.

    Der 31. Januar plus einen Monat ist der 28. oder 29. Februar, nicht der
    3. Maerz.
    """
    monat = base.month - 1 + months
    jahr = base.year + monat // 12
    monat = monat % 12 + 1
    letzter = _days_in_month(jahr, monat)
    return dt.date(jahr, monat, min(base.day, letzter))


def _days_in_month(year: int, month: int) -> int:
    """Anzahl der Tage im Monat."""
    if month == 12:
        return 31
    return (dt.date(year, month + 1, 1) - dt.timedelta(days=1)).day


def parse_marker(description: str | None) -> Recurrence | None:
    """Liest die Regel aus der Beschreibung."""
    if not description:
        return None

    treffer = MARKER.search(description)
    if not treffer:
        return None

    regel = treffer.group(1)
    frequency = _field(regel, "FREQ")
    if frequency not in {"DAILY", "WEEKLY", "MONTHLY", "YEARLY"}:
        _LOGGER.warning("Unbekannte Wiederholung in Aufgabe: %s", regel)
        return None

    try:
        interval = int(_field(regel, "INTERVAL") or "1")
    except ValueError:
        interval = 1

    return Recurrence(frequency=frequency, interval=interval)


def _field(rule: str, name: str) -> str | None:
    """Einen Wert aus FREQ=WEEKLY;INTERVAL=2 herausziehen."""
    for teil in rule.split(";"):
        schluessel, _, wert = teil.partition("=")
        if schluessel.strip().upper() == name:
            return wert.strip().upper()
    return None


def next_due(recurrence: Recurrence, due: dt.date | None, today: dt.date) -> dt.date:
    """Naechste Faelligkeit, notfalls mehrere Schritte in die Zukunft.

    Wird eine Aufgabe spaet abgehakt, laege der naechste Termin sonst schon
    wieder in der Vergangenheit und es entstuende ein Rueckstau.
    """
    zeitpunkt = due or today
    for _ in range(MAX_ADVANCES):
        zeitpunkt = recurrence.next_after(zeitpunkt)
        if zeitpunkt >= today:
            return zeitpunkt
    return zeitpunkt


class TodoRecurrenceWatcher:
    """Legt abgehakte Aufgaben mit Wiederholung neu an."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Merke den Kontext."""
        self.hass = hass
        self._unsub = None
        # Verhindert, dass die eigene Aenderung sofort wieder verarbeitet wird.
        self._busy: set[str] = set()

    @callback
    def async_start(self) -> None:
        """Beobachte alle Aufgabenlisten."""
        entity_ids = [
            state.entity_id
            for state in self.hass.states.async_all(TODO_DOMAIN)
        ]
        if not entity_ids:
            _LOGGER.debug("Keine Aufgabenlisten vorhanden")
            return

        self._unsub = async_track_state_change_event(
            self.hass, entity_ids, self._async_changed
        )
        _LOGGER.info("Wiederholungen aktiv fuer %s Aufgabenlisten", len(entity_ids))

    @callback
    def async_stop(self) -> None:
        """Beende die Beobachtung."""
        if self._unsub is not None:
            self._unsub()
            self._unsub = None

    async def _async_changed(self, event: Event) -> None:
        """Eine Liste hat sich geaendert."""
        entity_id = event.data["entity_id"]
        if entity_id in self._busy:
            return

        self._busy.add(entity_id)
        try:
            await self._async_process(entity_id)
        except Exception:  # eine kaputte Aufgabe darf den Rest nicht stoppen
            _LOGGER.exception("Wiederholung fuer %s fehlgeschlagen", entity_id)
        finally:
            self._busy.discard(entity_id)

    async def _async_process(self, entity_id: str) -> None:
        """Abgehakte Aufgaben mit Wiederholung erneuern."""
        antwort = await self.hass.services.async_call(
            TODO_DOMAIN,
            "get_items",
            {"entity_id": entity_id, "status": STATUS_COMPLETED},
            blocking=True,
            return_response=True,
        )
        items = (antwort or {}).get(entity_id, {}).get("items", [])
        heute = dt.date.today()

        for item in items:
            regel = parse_marker(item.get("description"))
            if regel is None:
                continue

            faellig = _as_date(item.get("due"))
            naechste = next_due(regel, faellig, heute)

            await self.hass.services.async_call(
                TODO_DOMAIN,
                "add_item",
                {
                    "entity_id": entity_id,
                    "item": item["summary"],
                    "due_date": naechste.isoformat(),
                    "description": item.get("description") or "",
                },
                blocking=True,
            )
            await self.hass.services.async_call(
                TODO_DOMAIN,
                "remove_item",
                {"entity_id": entity_id, "item": item["uid"]},
                blocking=True,
            )
            _LOGGER.info(
                "Aufgabe '%s' wiederholt sich, naechster Termin %s",
                item["summary"],
                naechste,
            )


def _as_date(value: str | None) -> dt.date | None:
    """Faelligkeit als Datum, mit oder ohne Uhrzeit."""
    if not value:
        return None
    try:
        return dt.date.fromisoformat(value[:10])
    except ValueError:
        return None
