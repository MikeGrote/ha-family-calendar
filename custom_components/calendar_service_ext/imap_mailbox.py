"""Postfachzugriff per IMAP.

Bewusst die Standardbibliothek statt aioimaplib: Ein Abruf alle paar Minuten
rechtfertigt keine zusaetzliche Abhaengigkeit. Die blockierenden Aufrufe
laufen im Thread, nicht in der Ereignisschleife.
"""

from __future__ import annotations

import imaplib
from dataclasses import dataclass


@dataclass(frozen=True)
class MailboxSettings:
    """Zugangsdaten und Ordner eines Postfachs."""

    server: str
    port: int
    username: str
    password: str
    folder: str


class ImapMailbox:
    """Holt ungelesene Nachrichten und markiert sie als gelesen."""

    def __init__(self, settings: MailboxSettings) -> None:
        """Merke die Zugangsdaten."""
        self._settings = settings

    def fetch_unseen(self) -> list[tuple[bytes, bytes]]:
        """Hole ungelesene Nachrichten als (Kennung, Rohdaten). Blockierend."""
        result: list[tuple[bytes, bytes]] = []
        with self._connect() as client:
            status, data = client.search(None, "UNSEEN")
            if status != "OK":
                return result

            for msg_id in data[0].split():
                # BODY.PEEK laesst das Gelesen-Kennzeichen unberuehrt - gesetzt
                # wird es erst, wenn die Nachricht verarbeitet wurde.
                status, payload = client.fetch(msg_id, "(BODY.PEEK[])")
                if status != "OK" or not payload or not isinstance(payload[0], tuple):
                    continue
                result.append((msg_id, payload[0][1]))
        return result

    def mark_seen(self, msg_ids: list[bytes]) -> None:
        """Setze das Gelesen-Kennzeichen. Blockierend."""
        with self._connect() as client:
            for msg_id in msg_ids:
                client.store(msg_id, "+FLAGS", "\\Seen")

    def _connect(self) -> imaplib.IMAP4_SSL:
        """Baue die Verbindung auf und waehle den Ordner."""
        client = imaplib.IMAP4_SSL(self._settings.server, self._settings.port)
        client.login(self._settings.username, self._settings.password)
        client.select(self._settings.folder)
        return client
