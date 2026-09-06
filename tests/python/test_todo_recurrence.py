"""Prueft das Rechnen mit Wiederholungen bei Aufgaben."""

from __future__ import annotations

import datetime as dt

import pytest
from calendar_service_ext.todo_recurrence import (
    Recurrence,
    next_due,
    parse_marker,
)

# ------------------------------------------------------------------- Marker


@pytest.mark.parametrize(
    ("beschreibung", "erwartet"),
    [
        ("[wdh: FREQ=WEEKLY]", Recurrence("WEEKLY", 1)),
        ("Mülltonne raus\n\n[wdh: FREQ=WEEKLY;INTERVAL=2]", Recurrence("WEEKLY", 2)),
        ("[wdh:FREQ=DAILY;INTERVAL=3]", Recurrence("DAILY", 3)),
        ("[wdh: freq=monthly]", Recurrence("MONTHLY", 1)),
    ],
)
def test_marker_wird_gelesen(beschreibung, erwartet):
    assert parse_marker(beschreibung) == erwartet


@pytest.mark.parametrize(
    "beschreibung",
    [None, "", "Nur Text", "[wdh: FREQ=HOURLY]", "[wdh: INTERVAL=2]"],
)
def test_ohne_brauchbaren_marker(beschreibung):
    assert parse_marker(beschreibung) is None


def test_kaputtes_intervall_faellt_auf_eins_zurueck():
    assert parse_marker("[wdh: FREQ=DAILY;INTERVAL=x]") == Recurrence("DAILY", 1)


# ------------------------------------------------------------- Naechster Termin

HEUTE = dt.date(2026, 9, 6)


@pytest.mark.parametrize(
    ("regel", "faellig", "erwartet"),
    [
        (Recurrence("DAILY"), dt.date(2026, 9, 6), dt.date(2026, 9, 7)),
        (Recurrence("WEEKLY"), dt.date(2026, 9, 6), dt.date(2026, 9, 13)),
        (Recurrence("WEEKLY", 2), dt.date(2026, 9, 6), dt.date(2026, 9, 20)),
        (Recurrence("MONTHLY"), dt.date(2026, 9, 6), dt.date(2026, 10, 6)),
        (Recurrence("YEARLY"), dt.date(2026, 9, 6), dt.date(2027, 9, 6)),
    ],
)
def test_naechster_termin(regel, faellig, erwartet):
    assert next_due(regel, faellig, HEUTE) == erwartet


def test_monatsende_wird_begrenzt():
    """31. Januar plus ein Monat ist Ende Februar, nicht der 3. Maerz."""
    assert next_due(Recurrence("MONTHLY"), dt.date(2026, 1, 31), dt.date(2026, 1, 31)) == dt.date(
        2026, 2, 28
    )


def test_schaltjahr():
    assert next_due(Recurrence("MONTHLY"), dt.date(2028, 1, 31), dt.date(2028, 1, 31)) == dt.date(
        2028, 2, 29
    )


def test_spaet_abgehakt_staut_sich_nicht():
    """Eine lange liegengebliebene Aufgabe springt in die Gegenwart."""
    ergebnis = next_due(Recurrence("WEEKLY"), dt.date(2026, 1, 5), HEUTE)

    assert ergebnis >= HEUTE
    # Und zwar auf denselben Wochentag wie die urspruengliche Faelligkeit.
    assert ergebnis.weekday() == dt.date(2026, 1, 5).weekday()


def test_ohne_faelligkeit_wird_ab_heute_gerechnet():
    assert next_due(Recurrence("DAILY"), None, HEUTE) == dt.date(2026, 9, 7)


# --- Vertrag zwischen Karte und Integration -------------------------------
#
# Die Regelzeile schreibt die Karte (src/lib/todo-recurrence.ts), gelesen
# wird sie hier. Die folgenden Zeichenketten stehen wortgleich in
# tests/js/todo-recurrence.test.ts. Aendert eine Seite ihr Format, faellt
# es dort oder hier auf - nicht erst dann, wenn eine wiederkehrende
# Aufgabe im Betrieb stumm nicht mehr nachrueckt.

VON_DER_KARTE = [
    ("[wdh: FREQ=DAILY]", "DAILY", 1),
    ("Gelbe Tonne\n\n[wdh: FREQ=WEEKLY]", "WEEKLY", 1),
    ("Gelbe Tonne\n\n[wdh: FREQ=WEEKLY;INTERVAL=2]", "WEEKLY", 2),
    ("Aufgabe\n\n[wdh: FREQ=MONTHLY;INTERVAL=3]", "MONTHLY", 3),
    ("Aufgabe\n\n[wdh: FREQ=YEARLY]", "YEARLY", 1),
]


@pytest.mark.parametrize(("beschreibung", "frequenz", "intervall"), VON_DER_KARTE)
def test_liest_was_die_karte_schreibt(beschreibung, frequenz, intervall):
    regel = parse_marker(beschreibung)

    assert regel is not None
    assert regel.frequency == frequenz
    assert regel.interval == intervall


def test_karte_ohne_wiederholung_ergibt_keine_regel():
    # Beim Abstellen entfernt die Karte die Zeile vollstaendig.
    assert parse_marker("Gelbe Tonne") is None
    assert parse_marker("") is None
