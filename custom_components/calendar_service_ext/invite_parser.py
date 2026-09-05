"""Liest Besprechungsanfragen aus einer E-Mail.

Der Kalenderteil wird von der Bibliothek ical gelesen. Sie loest auch
Zeitzonen auf, die Outlook mit Windows-Namen wie "W. Europe Standard Time"
angibt - das sind keine IANA-Namen, und ein Eigenbau-Parser wuerde daran
scheitern.
"""

from __future__ import annotations

import logging
import re
from email.message import Message

from ical.calendar_stream import IcsCalendarStream

from .invite_model import ParsedInvite

_LOGGER = logging.getLogger(__name__)

# postfach+mike@example.com -> "mike"
PLUS_TAG = re.compile(r"[^\s<>@]+\+([^\s<>@]+)@[^\s<>]+")
ADDRESS = re.compile(r"[\w.+-]+@[\w.-]+")

# Header, in denen die Empfaengeradresse stehen kann. Delivered-To zuerst:
# Gmail traegt dort die tatsaechlich zugestellte Plus-Adresse ein, waehrend
# To bei Weiterleitungen die urspruengliche Adresse behalten kann.
RECIPIENT_HEADERS = ("Delivered-To", "X-Original-To", "To", "Cc")


def extract_calendar_part(message: Message) -> str | None:
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


def parse_invite(ics: str) -> ParsedInvite | None:
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


def target_tag(message: Message, known_tags: set[str]) -> str | None:
    """Lies das Plus-Kennwort aus den Empfaengeradressen."""
    for header in RECIPIENT_HEADERS:
        for value in message.get_all(header, []):
            for match in PLUS_TAG.finditer(str(value)):
                tag = match.group(1).lower()
                if tag in known_tags:
                    return tag
    return None


def sender_allowed(message: Message, allowed: str) -> bool:
    """Pruefe den Absender gegen die Freigabeliste.

    Die Postfachadresse ist bekannt, sobald sie einmal eingeladen wurde. Ohne
    Einschraenkung koennte jeder Termine auf das Wandpanel schieben.
    """
    addresses = [a.strip().lower() for a in allowed.split(",") if a.strip()]
    if not addresses:
        return True

    found = ADDRESS.search(message.get("From", ""))
    return bool(found) and found.group(0).lower() in addresses
