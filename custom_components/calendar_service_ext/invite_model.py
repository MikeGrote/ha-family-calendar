"""Datenmodell einer Besprechungsanfrage."""

from __future__ import annotations

import datetime as dt
from dataclasses import dataclass


@dataclass(frozen=True)
class ParsedInvite:
    """Das Wesentliche einer Einladung."""

    method: str
    uid: str
    sequence: int
    summary: str
    start: dt.datetime | dt.date
    end: dt.datetime | dt.date
    description: str | None
    location: str | None

    @property
    def all_day(self) -> bool:
        """Ganztaegige Termine liefert der Parser als date, nicht datetime."""
        return not isinstance(self.start, dt.datetime)

    def as_datetime_window(self) -> tuple[dt.datetime, dt.datetime]:
        """Zeitfenster des Termins, auch fuer ganztaegige Eintraege."""
        return _as_datetime(self.start), _as_datetime(self.end)


def _as_datetime(value: dt.datetime | dt.date) -> dt.datetime:
    """Mache aus einem Ganztages-Datum einen Zeitpunkt."""
    if isinstance(value, dt.datetime):
        return value
    return dt.datetime.combine(value, dt.time.min, tzinfo=dt.UTC)
