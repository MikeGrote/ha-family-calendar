"""Prueft Parser, Routing und Absenderfilter des Einladungs-Abgleichs."""

from __future__ import annotations

import datetime as dt
import email
import email.policy

import pytest
from calendar_service_ext.invite_parser import (
    extract_calendar_part,
    parse_invite,
    sender_allowed,
    target_tag,
)
from fixtures import ALL_DAY, CANCEL, REQUEST, invitation_mail

MAPPING = {
    "mike": "calendar.mike",
    "anja": "calendar.anja",
    "family": "calendar.family",
}


def ziel(message, *, fallback=None):
    """Zielkalender wie InviteSync ihn bestimmt: Kennwort, sonst Ausweich."""
    tag = target_tag(message, set(MAPPING))
    return MAPPING[tag] if tag else fallback


def mail(headers: str) -> email.message.Message:
    """Nachricht nur aus Kopfzeilen."""
    return email.message_from_string(headers + "\n\nRumpf\n", policy=email.policy.default)


# --------------------------------------------------------------------- Parser


def test_request_wird_vollstaendig_gelesen():
    invite = parse_invite(REQUEST)

    assert invite.method == "REQUEST"
    assert invite.summary == "Projekt-Jour-Fixe"
    assert invite.location == "Besprechungsraum 2"
    assert invite.sequence == 0
    assert invite.all_day is False


def test_windows_zeitzone_wird_aufgeloest():
    """Outlook schickt "W. Europe Standard Time" statt eines IANA-Namens."""
    invite = parse_invite(REQUEST)

    assert invite.start.utcoffset() == dt.timedelta(hours=2)
    assert invite.start.astimezone(dt.UTC).hour == 12


def test_absage_behaelt_die_kennung():
    request = parse_invite(REQUEST)
    cancel = parse_invite(CANCEL)

    assert cancel.method == "CANCEL"
    assert cancel.uid == request.uid
    assert cancel.sequence > request.sequence


def test_ganztaegiger_termin_kommt_als_datum():
    invite = parse_invite(ALL_DAY)

    assert invite.all_day is True
    assert invite.start == dt.date(2026, 9, 15)


@pytest.mark.parametrize(
    "payload",
    ["", "kein icalendar", "BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR"],
)
def test_unbrauchbarer_inhalt_wirft_nicht(payload):
    assert parse_invite(payload) is None


# ------------------------------------------------------------------ MIME-Teil


def test_kalenderteil_wird_gefunden():
    message = email.message_from_string(
        invitation_mail(REQUEST, "postfach+mike@example.com"),
        policy=email.policy.default,
    )

    ics = extract_calendar_part(message)

    assert ics is not None
    assert parse_invite(ics).summary == "Projekt-Jour-Fixe"


def test_mail_ohne_kalenderteil():
    assert extract_calendar_part(mail("From: a@b.de\nTo: c@d.de")) is None


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
def test_plus_kennwort_bestimmt_den_kalender(headers, erwartet):
    assert ziel(mail(headers)) == erwartet


def test_ausweichkalender_faengt_unbekannte_kennworte():
    treffer = ziel(mail("To: postfach+oma@example.com"), fallback="calendar.family")

    assert treffer == "calendar.family"


def test_ohne_ausweichkalender_wird_verworfen():
    assert ziel(mail("To: postfach@example.com")) is None


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
def test_freigabeliste_filtert(absender, zugelassen):
    erlaubt = "mike.grote@example.de, anja@example.de"

    assert sender_allowed(mail(f"From: {absender}"), erlaubt) is zugelassen


def test_leere_freigabeliste_laesst_alles_durch():
    """Bewusstes Verhalten - die Oberflaeche weist darauf hin."""
    assert sender_allowed(mail("From: irgendwer@example.com"), "") is True


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
