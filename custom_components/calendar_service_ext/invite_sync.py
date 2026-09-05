"""Traegt Besprechungsanfragen aus einem Postfach in Kalender ein.

Ein Termin wird in Outlook (oder sonstwo) angelegt und eine Adresse des
ueberwachten Postfachs als Teilnehmer eingeladen. Die Einladung kommt als
E-Mail mit einem Kalenderteil an und wird hier zu einem Kalendereintrag.

Die Zuordnung laeuft ueber Plus-Adressierung: postfach+mike@example.com
landet in dem Kalender, der dem Kennwort "mike" zugeordnet ist. Damit
entscheidet der Einladende pro Termin, wo der Eintrag erscheint - und der
restliche Kalender bleibt privat.

Absagen entfernen den Termin wieder, Verschiebungen ersetzen ihn.
"""

from __future__ import annotations

import datetime as dt
import email
import email.policy
import imaplib
import logging
from email.message import Message
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.storage import Store

from .calendar_writer import CalendarWriter
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
from .imap_mailbox import ImapMailbox, MailboxSettings
from .invite_model import ParsedInvite
from .invite_parser import extract_calendar_part, parse_invite, sender_allowed, target_tag

_LOGGER = logging.getLogger(__name__)


class InviteSync:
    """Fragt das Postfach ab und pflegt die Kalender."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        """Merke Kontext und Ablage."""
        self.hass = hass
        self.entry = entry
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self._writer = CalendarWriter(hass)
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

    def _mailbox(self) -> ImapMailbox:
        """Baue den Postfachzugriff aus den Optionen."""
        options = self.entry.options
        return ImapMailbox(
            MailboxSettings(
                server=options.get(CONF_SERVER, DEFAULT_SERVER),
                port=options.get(CONF_PORT, DEFAULT_PORT),
                username=options[CONF_USERNAME],
                password=options[CONF_PASSWORD],
                folder=options.get(CONF_FOLDER, DEFAULT_FOLDER),
            )
        )

    async def _async_poll(self, _now: dt.datetime | None = None) -> None:
        """Hole neue Nachrichten und verarbeite sie."""
        if self._running:
            _LOGGER.debug("Vorheriger Abruf laeuft noch, dieser wird uebersprungen")
            return

        self._running = True
        mailbox = self._mailbox()
        try:
            messages = await self.hass.async_add_executor_job(mailbox.fetch_unseen)
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
                await self.hass.async_add_executor_job(mailbox.mark_seen, handled)
        finally:
            self._running = False

    # ------------------------------------------------------------ Verarbeiten

    async def _async_handle_message(self, raw: bytes) -> None:
        """Verarbeite eine einzelne Nachricht."""
        message = email.message_from_bytes(raw, policy=email.policy.default)

        if not sender_allowed(message, self.entry.options.get(CONF_ALLOWED_SENDERS, "")):
            _LOGGER.warning(
                "Einladung von %s ignoriert - Absender nicht freigegeben",
                message.get("From", "unbekannt"),
            )
            return

        ics = extract_calendar_part(message)
        if ics is None:
            _LOGGER.debug("Nachricht ohne Kalenderteil uebersprungen")
            return

        invite = parse_invite(ics)
        if invite is None:
            return

        entity_id = self._target_calendar(message)
        if entity_id is None:
            _LOGGER.warning(
                "Keine Kalenderzuordnung fuer %s und kein Ausweichkalender gesetzt",
                message.get("To", "unbekannt"),
            )
            return

        if invite.method == "CANCEL":
            await self._async_cancel(invite)
        else:
            await self._async_upsert(invite, entity_id)

    def _target_calendar(self, message: Message) -> str | None:
        """Bestimme den Zielkalender ueber das Plus-Kennwort."""
        mapping: dict[str, str] = self.entry.options.get(CONF_MAPPING, {})
        tag = target_tag(message, set(mapping))
        if tag is not None:
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
            await self._async_forget(invite.uid)

        created_uid = await self._writer.async_create(entity_id, invite)
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

        await self._async_forget(invite.uid)
        await self._store.async_save(self._known)
        _LOGGER.info("Termin '%s' nach Absage entfernt", invite.summary)

    async def _async_forget(self, outlook_uid: str) -> None:
        """Loesche den zugehoerigen Kalendereintrag und vergiss ihn."""
        entry = self._known.pop(outlook_uid, None)
        if entry is None:
            return
        await self._writer.async_delete(entry["entity_id"], entry.get("uid") or "")
