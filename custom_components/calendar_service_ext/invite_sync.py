"""Traegt Besprechungsanfragen aus einem Postfach in Kalender ein.

Der Ablauf: Ein Termin wird in Outlook (oder sonstwo) angelegt und eine
Adresse des ueberwachten Postfachs als Teilnehmer eingeladen. Die Einladung
kommt als E-Mail mit einem text/calendar-Teil an. Dieser Teil wird gelesen
und der Termin im passenden Home-Assistant-Kalender angelegt.

Die Zuordnung laeuft ueber Plus-Adressierung: unserhome+mike@example.com
landet in dem Kalender, der dem Kennwort "mike" zugeordnet ist. Damit
entscheidet der Einladende pro Termin, wo er erscheint - und der restliche
Kalender bleibt privat.

Absagen (METHOD:CANCEL) entfernen den Termin wieder, Verschiebungen
(hoehere SEQUENCE) ersetzen ihn.
"""

from __future__ import annotations

import datetime as dt
import email
import email.policy
import imaplib
import logging
import re
from dataclasses import dataclass
from email.message import Message
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.storage import Store
from ical.calendar_stream import IcsCalendarStream

from .const import (
    CONF_ALLOWED_SENDERS,
    CONF_FALLBACK,
    CONF_FOLDER,
    CONF_INTERVAL,
    CONF_MAPPING,
    CONF_PASSWORD,
    CONF_PORT,
    CONF_SERVER,
    CONF_USERNAME,
    DEFAULT_FOLDER,
    DEFAULT_INTERVAL,
    DEFAULT_PORT,
    DEFAULT_SERVER,
    STORAGE_KEY,
    STORAGE_VERSION,
)

_LOGGER = logging.getLogger(__name__)

# unserhome+mike@example.com -> "mike"
_PLUS_TAG = re.compile(r"[^\s<>@]+\+([^\s<>@]+)@[^\s<>]+")
_ADDRESS = re.compile(r"[\w.+-]+@[\w.-]+")

# Header, in denen die Empfaengeradresse stehen kann. Delivered-To zuerst:
# Gmail traegt dort die tatsaechlich zugestellte Plus-Adresse ein, waehrend
# To bei Weiterleitungen die urspruengliche Adresse behalten kann.
_RECIPIENT_HEADERS = ("Delivered-To", "X-Original-To", "To", "Cc")


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


class InviteSync:
    """Fragt das Postfach ab und pflegt die Kalender."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        """Merke Kontext und Ablage."""
        self.hass = hass
        self.entry = entry
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self._known: dict[str, dict[str, Any]] = {}
        self._unsub = None
        self._running = False

    # ----------------------------------------------------------- Lebenszyklus

    async def async_start(self) -> None:
        """Lade den Merkzettel und starte den Abrufzyklus."""
        self._known = await self._store.async_load() or {}

        minutes = self.entry.options.get(CONF_INTERVAL, DEFAULT_INTERVAL)
        self._unsub = async_track_time_interval(
            self.hass, self._async_poll, dt.timedelta(minutes=minutes)
        )
        _LOGGER.info("Einladungs-Abgleich aktiv, Abruf alle %s Minuten", minutes)
        await self._async_poll()

    @callback
    def async_stop(self) -> None:
        """Beende den Abrufzyklus."""
        if self._unsub is not None:
            self._unsub()
            self._unsub = None

    # ---------------------------------------------------------------- Abrufen

    async def _async_poll(self, _now: dt.datetime | None = None) -> None:
        """Hole neue Nachrichten und verarbeite sie."""
        if self._running:
            _LOGGER.debug("Vorheriger Abruf laeuft noch, dieser wird uebersprungen")
            return

        self._running = True
        try:
            messages = await self.hass.async_add_executor_job(self._fetch_unseen)
        except (imaplib.IMAP4.error, OSError):
            # Netz- und Anmeldefehler: nichts als gelesen markieren, beim
            # naechsten Durchlauf erneut versuchen.
            _LOGGER.exception("Postfach nicht erreichbar")
            self._running = False
            return

        handled: list[bytes] = []
        try:
            for msg_id, raw in messages:
                try:
                    await self._async_handle_message(raw)
                except Exception:  # eine kaputte Mail darf den Rest nicht stoppen
                    _LOGGER.exception("Einladung konnte nicht verarbeitet werden")
                handled.append(msg_id)

            if handled:
                await self.hass.async_add_executor_job(self._mark_seen, handled)
        finally:
            self._running = False

    def _fetch_unseen(self) -> list[tuple[bytes, bytes]]:
        """Hole ungelesene Nachrichten. Laeuft blockierend im Thread."""
        options = self.entry.options
        server = options.get(CONF_SERVER, DEFAULT_SERVER)
        port = options.get(CONF_PORT, DEFAULT_PORT)
        folder = options.get(CONF_FOLDER, DEFAULT_FOLDER)

        result: list[tuple[bytes, bytes]] = []
        with imaplib.IMAP4_SSL(server, port) as client:
            client.login(options[CONF_USERNAME], options[CONF_PASSWORD])
            client.select(folder)
            status, data = client.search(None, "UNSEEN")
            if status != "OK":
                return result

            for msg_id in data[0].split():
                # BODY.PEEK laesst das Gelesen-Kennzeichen unberuehrt - gesetzt
                # wird es erst, wenn die Nachricht wirklich verarbeitet wurde.
                status, payload = client.fetch(msg_id, "(BODY.PEEK[])")
                if status != "OK" or not payload or not isinstance(payload[0], tuple):
                    continue
                result.append((msg_id, payload[0][1]))
        return result

    def _mark_seen(self, msg_ids: list[bytes]) -> None:
        """Setze das Gelesen-Kennzeichen. Laeuft blockierend im Thread."""
        options = self.entry.options
        with imaplib.IMAP4_SSL(
            options.get(CONF_SERVER, DEFAULT_SERVER), options.get(CONF_PORT, DEFAULT_PORT)
        ) as client:
            client.login(options[CONF_USERNAME], options[CONF_PASSWORD])
            client.select(options.get(CONF_FOLDER, DEFAULT_FOLDER))
            for msg_id in msg_ids:
                client.store(msg_id, "+FLAGS", "\\Seen")

    # ------------------------------------------------------------ Verarbeiten

    async def _async_handle_message(self, raw: bytes) -> None:
        """Verarbeite eine einzelne Nachricht."""
        message = email.message_from_bytes(raw, policy=email.policy.default)

        if not self._sender_allowed(message):
            _LOGGER.warning(
                "Einladung von %s ignoriert - Absender nicht freigegeben",
                message.get("From", "unbekannt"),
            )
            return

        ics = _extract_calendar_part(message)
        if ics is None:
            _LOGGER.debug("Nachricht ohne Kalenderteil uebersprungen")
            return

        invite = _parse_invite(ics)
        if invite is None:
            return

        entity_id = self._target_calendar(message)
        if entity_id is None:
            _LOGGER.warning(
                "Keine Kalenderzuordnung fuer %s gefunden und kein Ausweichkalender gesetzt",
                message.get("To", "unbekannt"),
            )
            return

        if invite.method == "CANCEL":
            await self._async_cancel(invite)
        else:
            await self._async_upsert(invite, entity_id)

    def _sender_allowed(self, message: Message) -> bool:
        """Pruefe den Absender gegen die Freigabeliste.

        Die Postfachadresse ist bekannt, sobald sie einmal eingeladen wurde.
        Ohne Einschraenkung koennte jeder Termine auf das Wandpanel schieben.
        """
        allowed = [
            a.strip().lower()
            for a in self.entry.options.get(CONF_ALLOWED_SENDERS, "").split(",")
            if a.strip()
        ]
        if not allowed:
            return True

        header = message.get("From", "")
        found = _ADDRESS.search(header)
        return bool(found) and found.group(0).lower() in allowed

    def _target_calendar(self, message: Message) -> str | None:
        """Bestimme den Zielkalender ueber das Plus-Kennwort der Empfaengeradresse."""
        mapping = self.entry.options.get(CONF_MAPPING, {})

        for header in _RECIPIENT_HEADERS:
            for value in message.get_all(header, []):
                for match in _PLUS_TAG.finditer(str(value)):
                    tag = match.group(1).lower()
                    if tag in mapping:
                        return mapping[tag]

        return self.entry.options.get(CONF_FALLBACK) or None

    # -------------------------------------------------------------- Kalender

    async def _async_upsert(self, invite: ParsedInvite, entity_id: str) -> None:
        """Lege den Termin an oder ersetze eine aeltere Fassung."""
        previous = self._known.get(invite.uid)

        if previous is not None:
            if previous.get("sequence", -1) >= invite.sequence:
                _LOGGER.debug("Einladung %s ist nicht neuer als die bekannte", invite.uid)
                return
            await self._async_remove_stored(invite.uid)

        entity = self._calendar_entity(entity_id)
        if entity is None:
            return

        payload: dict[str, Any] = {"summary": invite.summary}
        if invite.description:
            payload["description"] = invite.description
        if invite.location:
            payload["location"] = invite.location
        payload["dtstart"] = invite.start
        payload["dtend"] = invite.end

        await entity.async_create_event(**payload)

        created_uid = await self._async_find_created(entity, invite)
        self._known[invite.uid] = {
            "entity_id": entity_id,
            "uid": created_uid,
            "sequence": invite.sequence,
            "summary": invite.summary,
        }
        await self._store.async_save(self._known)
        _LOGGER.info("Termin '%s' aus Einladung in %s eingetragen", invite.summary, entity_id)

    async def _async_cancel(self, invite: ParsedInvite) -> None:
        """Entferne einen abgesagten Termin."""
        if invite.uid not in self._known:
            _LOGGER.debug("Absage fuer unbekannten Termin %s ignoriert", invite.uid)
            return

        await self._async_remove_stored(invite.uid)
        await self._store.async_save(self._known)
        _LOGGER.info("Termin '%s' nach Absage entfernt", invite.summary)

    async def _async_remove_stored(self, outlook_uid: str) -> None:
        """Loesche den zugehoerigen Kalendereintrag und vergiss ihn."""
        entry = self._known.pop(outlook_uid, None)
        if entry is None:
            return

        entity = self._calendar_entity(entry["entity_id"])
        ha_uid = entry.get("uid")
        if entity is None or not ha_uid:
            return

        try:
            await entity.async_delete_event(uid=ha_uid)
        except Exception:  # Termin kann von Hand geloescht worden sein
            _LOGGER.debug("Termin %s liess sich nicht loeschen", ha_uid, exc_info=True)

    def _calendar_entity(self, entity_id: str) -> Any | None:
        """Hole die Kalender-Entity aus der Kalenderkomponente."""
        component = self.hass.data.get("calendar")
        entity = component.get_entity(entity_id) if component else None
        if entity is None:
            _LOGGER.error("Kalender %s existiert nicht", entity_id)
        return entity

    async def _async_find_created(self, entity: Any, invite: ParsedInvite) -> str | None:
        """Finde die von Home Assistant vergebene Kennung des neuen Termins.

        async_create_event gibt sie nicht zurueck, deshalb wird direkt danach
        im Zeitfenster des Termins nachgesehen.
        """
        start = _as_datetime(invite.start) - dt.timedelta(minutes=1)
        end = _as_datetime(invite.end) + dt.timedelta(minutes=1)

        try:
            events = await entity.async_get_events(self.hass, start, end)
        except Exception:  # ohne Kennung geht nur Absagen verloren
            _LOGGER.debug("Neuer Termin liess sich nicht nachschlagen", exc_info=True)
            return None

        for event in reversed(events):
            if event.summary == invite.summary and event.uid:
                return event.uid
        return None


# ------------------------------------------------------------------ Helfer


def _extract_calendar_part(message: Message) -> str | None:
    """Suche den text/calendar-Teil der Nachricht."""
    for part in message.walk():
        if part.get_content_type() != "text/calendar":
            continue
        payload = part.get_payload(decode=True)
        if payload is None:
            continue
        charset = part.get_content_charset() or "utf-8"
        return payload.decode(charset, errors="replace")
    return None


def _parse_invite(ics: str) -> ParsedInvite | None:
    """Lies die Einladung. Zeitzonen loest die Bibliothek selbst auf."""
    try:
        stream = IcsCalendarStream.from_ics(ics)
    except Exception:  # fremde Datei, kann alles enthalten
        _LOGGER.warning("Kalenderteil liess sich nicht lesen", exc_info=True)
        return None

    for calendar in stream.calendars:
        for event in calendar.events:
            if not event.uid or not event.summary:
                continue
            return ParsedInvite(
                method=(calendar.method or "REQUEST").upper(),
                uid=event.uid,
                sequence=event.sequence or 0,
                summary=event.summary,
                start=event.start,
                end=event.end,
                description=event.description,
                location=event.location,
            )

    _LOGGER.debug("Kalenderteil ohne verwertbaren Termin")
    return None


def _as_datetime(value: dt.datetime | dt.date) -> dt.datetime:
    """Mache aus einem Ganztages-Datum einen Zeitpunkt fuer die Suche."""
    if isinstance(value, dt.datetime):
        return value
    return dt.datetime.combine(value, dt.time.min, tzinfo=dt.UTC)
