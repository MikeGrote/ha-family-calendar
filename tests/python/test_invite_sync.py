"""Prueft Parser, Routing und Absenderfilter des Einladungs-Abgleichs."""

from __future__ import annotations

import datetime as dt
import email
import email.policy
from types import SimpleNamespace

import pytest
from fixtures import ALL_DAY, CANCEL, REQUEST, invitation_mail

MAPPING = {
    "mike": "calendar.mike",
    "anja": "calendar.anja",
    "family": "calendar.family",
}


def make_sync(invite_sync, *, mapping=None, fallback="", allowed=""):
    """Eine InviteSync-Instanz ohne Home Assistant dahinter."""
    instance = invite_sync.InviteSync.__new__(invite_sync.InviteSync)
    instance.entry = SimpleNamespace(
        options={
            "calendar_mapping": MAPPING if mapping is None else mapping,
            "fallback_calendar": fallback,
            "allowed_senders": allowed,
        }
    )
    return instance


def mail(headers: str) -> email.message.Message:
    """Nachricht nur aus Kopfzeilen."""
    return email.message_from_string(headers + "\n\nRumpf\n", policy=email.policy.default)


# --------------------------------------------------------------------- Parser


def test_request_wird_vollstaendig_gelesen(invite_sync):
    invite = invite_sync._parse_invite(REQUEST)

    assert invite.method == "REQUEST"
    assert invite.summary == "Projekt-Jour-Fixe"
    assert invite.location == "Besprechungsraum 2"
    assert invite.sequence == 0
    assert invite.all_day is False


def test_windows_zeitzone_wird_aufgeloest(invite_sync):
    """Outlook schickt "W. Europe Standard Time" statt eines IANA-Namens."""
    invite = invite_sync._parse_invite(REQUEST)

    assert invite.start.utcoffset() == dt.timedelta(hours=2)
    assert invite.start.astimezone(dt.UTC).hour == 12


def test_absage_behaelt_die_kennung(invite_sync):
    request = invite_sync._parse_invite(REQUEST)
    cancel = invite_sync._parse_invite(CANCEL)

    assert cancel.method == "CANCEL"
    assert cancel.uid == request.uid
    assert cancel.sequence > request.sequence


def test_ganztaegiger_termin_kommt_als_datum(invite_sync):
    invite = invite_sync._parse_invite(ALL_DAY)

    assert invite.all_day is True
    assert invite.start == dt.date(2026, 9, 15)


@pytest.mark.parametrize(
    "payload",
    ["", "kein icalendar", "BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR"],
)
def test_unbrauchbarer_inhalt_wirft_nicht(invite_sync, payload):
    assert invite_sync._parse_invite(payload) is None


# ------------------------------------------------------------------ MIME-Teil


def test_kalenderteil_wird_gefunden(invite_sync):
    message = email.message_from_string(
        invitation_mail(REQUEST, "postfach+mike@example.com"),
        policy=email.policy.default,
    )

    ics = invite_sync._extract_calendar_part(message)

    assert ics is not None
    assert invite_sync._parse_invite(ics).summary == "Projekt-Jour-Fixe"


def test_mail_ohne_kalenderteil(invite_sync):
    assert invite_sync._extract_calendar_part(mail("From: a@b.de\nTo: c@d.de")) is None


# -------------------------------------------------------------------- Routing


@pytest.mark.parametrize(
    ("headers", "erwartet"),
    [
        ("To: postfach+mike@example.com", "calendar.mike"),
        ('To: "Zuhause" <postfach+anja@example.com>', "calendar.anja"),
        ("To: extern@fremd.de\nCc: postfach+mike@example.com", "calendar.mike"),
        # Delivered-To steht vor To: Gmail traegt dort die zugestellte Adresse ein.
        (
            "Delivered-To: postfach+family@example.com\nTo: postfach@example.com",
            "calendar.family",
        ),
        ("To: postfach+unbekannt@example.com", None),
        ("To: postfach@example.com", None),
    ],
)
def test_plus_kennwort_bestimmt_den_kalender(invite_sync, headers, erwartet):
    assert make_sync(invite_sync)._target_calendar(mail(headers)) == erwartet


def test_ausweichkalender_faengt_unbekannte_kennworte(invite_sync):
    sync = make_sync(invite_sync, fallback="calendar.family")

    assert sync._target_calendar(mail("To: postfach+oma@example.com")) == "calendar.family"


def test_ohne_ausweichkalender_wird_verworfen(invite_sync):
    assert make_sync(invite_sync)._target_calendar(mail("To: postfach@example.com")) is None


# ------------------------------------------------------------ Absenderfilter


@pytest.mark.parametrize(
    ("absender", "zugelassen"),
    [
        ("mike.grote@example.de", True),
        ("Mike Grote <mike.grote@example.de>", True),
        ("Mike.Grote@EXAMPLE.de", True),
        ("fremder@woanders.example", False),
    ],
)
def test_freigabeliste_filtert(invite_sync, absender, zugelassen):
    sync = make_sync(invite_sync, allowed="mike.grote@example.de, anja@example.de")

    assert sync._sender_allowed(mail(f"From: {absender}")) is zugelassen


def test_leere_freigabeliste_laesst_alles_durch(invite_sync):
    """Bewusstes Verhalten - die Oberflaeche weist darauf hin."""
    sync = make_sync(invite_sync, allowed="")

    assert sync._sender_allowed(mail("From: irgendwer@example.com")) is True


# ------------------------------------------------------------------ Zuordnung


@pytest.mark.parametrize(
    ("eingabe", "erwartet"),
    [
        ("mike = calendar.mike", {"mike": "calendar.mike"}),
        ("  MIKE  =  calendar.mike  ", {"mike": "calendar.mike"}),
        ("# Kommentar\nmike = calendar.mike\n\n", {"mike": "calendar.mike"}),
        ("", {}),
    ],
)
def test_zuordnung_wird_gelesen(parse_mapping, eingabe, erwartet):
    mapping, fehler = parse_mapping(eingabe)

    assert fehler is False
    assert mapping == erwartet


@pytest.mark.parametrize("eingabe", ["mike calendar.mike", "mike = mike", "= calendar.x"])
def test_fehlerhafte_zuordnung_wird_gemeldet(parse_mapping, eingabe):
    _, fehler = parse_mapping(eingabe)

    assert fehler is True
