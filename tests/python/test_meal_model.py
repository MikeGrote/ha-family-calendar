"""Aus Mealies Daten wird, was die Karte anzeigt.

Die Felder heissen dort anders und liegen tiefer. Geht bei der Umformung
etwas verloren, steht am Herd eine Zutat ohne Menge oder ein Schritt ohne
Text - und man merkt es genau dann, wenn man die Haende voll hat.
"""

from __future__ import annotations

import datetime as dt

import pytest
from calendar_service_ext.meal_model import (
    ingredient_text,
    plan_entries,
    quantity_text,
    recipe,
)

# ------------------------------------------------------------- Wochenplan


def test_leerer_plan():
    assert plan_entries(None) == []
    assert plan_entries([]) == []


def test_eintrag_mit_rezept():
    eintrag = plan_entries(
        [
            {
                "mealplan_date": dt.date(2026, 9, 7),
                "entry_type": "dinner",
                "title": None,
                "description": None,
                "recipe": {
                    "recipe_id": "abc",
                    "name": "Linsensuppe",
                    "description": "Mit Wurst",
                    "image": "original.webp",
                    "total_time": "45 Minuten",
                    "recipe_servings": 4,
                },
            }
        ]
    )[0]

    assert eintrag["date"] == "2026-09-07"
    assert eintrag["type"] == "dinner"
    assert eintrag["recipeId"] == "abc"
    assert eintrag["name"] == "Linsensuppe"
    assert eintrag["hasImage"] is True
    assert eintrag["servings"] == 4


def test_eintrag_ohne_rezept_ist_eine_notiz():
    # Man kann in Mealie auch nur "Reste" eintragen. Die Karte soll dann
    # nicht leer bleiben.
    eintrag = plan_entries(
        [
            {
                "mealplan_date": dt.date(2026, 9, 8),
                "entry_type": "lunch",
                "title": "Reste",
                "description": "von gestern",
                "recipe": None,
            }
        ]
    )[0]

    assert eintrag["name"] == "Reste"
    assert eintrag["description"] == "von gestern"
    assert eintrag["recipeId"] == ""
    assert eintrag["hasImage"] is False


def test_eintrag_ohne_alles_bricht_nicht():
    eintrag = plan_entries([{}])[0]

    assert eintrag["name"] == ""
    assert eintrag["date"] == ""
    assert eintrag["servings"] == 0


# ------------------------------------------------------------------ Menge


@pytest.mark.parametrize(
    ("menge", "erwartet"),
    [
        (1, "1"),
        (1.0, "1"),
        (2.0, "2"),
        (0.5, "½"),
        (0.25, "¼"),
        (0.75, "¾"),
        (0.33, "⅓"),
        (0.667, "⅔"),
        (1.5, "1½"),
        (2.25, "2¼"),
        (1.75, "1¾"),
    ],
)
def test_mengen_mit_bruchzeichen(menge, erwartet):
    # "0,5 Zwiebel" liest sich auf zwei Meter schlechter als "½ Zwiebel".
    assert quantity_text(menge) == erwartet


@pytest.mark.parametrize(
    ("menge", "erwartet"),
    [
        (1.2, "1,2"),
        (0.1, "0,1"),
        (12.75, "12¾"),
    ],
)
def test_mengen_ohne_passenden_bruch(menge, erwartet):
    assert quantity_text(menge) == erwartet


@pytest.mark.parametrize("menge", [None, 0, 0.0, -1, "viel", ""])
def test_menge_fehlt_oder_taugt_nicht(menge):
    # Keine Menge ist besser als eine erfundene.
    assert quantity_text(menge) == ""


# ----------------------------------------------------------------- Zutaten


def test_fertiger_anzeigetext_gewinnt():
    # Mealie schreibt ihn selbst und behaelt dabei die Schreibweise des
    # Rezepts - die ist besser als alles Zusammengebaute.
    zutat = {"display": "2 EL Olivenöl", "quantity": 2, "unit": {"name": "Esslöffel"}}
    assert ingredient_text(zutat) == "2 EL Olivenöl"


def test_text_aus_menge_einheit_lebensmittel():
    zutat = {
        "display": None,
        "quantity": 0.5,
        "unit": {"name": "Liter"},
        "food": {"name": "Gemüsebrühe"},
        "note": None,
    }
    assert ingredient_text(zutat) == "½ Liter Gemüsebrühe"


def test_notiz_haengt_hinten_an():
    zutat = {
        "quantity": 1,
        "unit": {"name": "Zwiebel"},
        "food": None,
        "note": "fein gewürfelt",
    }
    assert ingredient_text(zutat) == "1 Zwiebel, fein gewürfelt"


def test_ohne_menge_nur_das_lebensmittel():
    zutat = {"quantity": None, "unit": None, "food": {"name": "Salz"}, "note": None}
    assert ingredient_text(zutat) == "Salz"


def test_nur_eine_notiz():
    zutat = {"quantity": None, "unit": None, "food": None, "note": "etwas Pfeffer"}
    assert ingredient_text(zutat) == "etwas Pfeffer"


def test_faellt_auf_den_urspruenglichen_text_zurueck():
    zutat = {"original_text": "eine Handvoll Petersilie"}
    assert ingredient_text(zutat) == "eine Handvoll Petersilie"


def test_leere_zutat_ergibt_leeren_text():
    assert ingredient_text({}) == ""


# ------------------------------------------------------------------ Rezept


def beispiel() -> dict:
    return {
        "recipe_id": "abc",
        "name": "Linsensuppe",
        "description": "Deftig",
        "total_time": "45 Minuten",
        "prep_time": "15 Minuten",
        "recipe_servings": 4,
        "recipe_yield": "4 Teller",
        "image": "original.webp",
        "original_url": "https://example.com/linsensuppe",
        "ingredients": [
            {"reference_id": "r1", "display": "250 g Linsen", "note": ""},
            {"reference_id": "r2", "display": "1 Zwiebel", "note": "gewürfelt"},
        ],
        "instructions": [
            {
                "instruction_id": "s1",
                "title": "Vorbereiten",
                "text": "Zwiebel würfeln.",
                "ingredient_references": ["r2"],
            },
            {
                "instruction_id": "s2",
                "title": None,
                "text": "Linsen zugeben.",
                "ingredient_references": [{"reference_id": "r1"}],
            },
        ],
    }


def test_ohne_rezept_kommt_nichts():
    assert recipe(None) is None
    assert recipe({}) is None


def test_rezept_wird_flach():
    r = recipe(beispiel())

    assert r["name"] == "Linsensuppe"
    assert r["servings"] == 4
    assert r["yield"] == "4 Teller"
    assert r["hasImage"] is True
    assert r["originalUrl"] == "https://example.com/linsensuppe"
    assert [z["display"] for z in r["ingredients"]] == ["250 g Linsen", "1 Zwiebel"]
    assert [s["text"] for s in r["instructions"]] == ["Zwiebel würfeln.", "Linsen zugeben."]


def test_schritte_kennen_ihre_zutaten():
    # Genau das macht die Kochansicht aus: Beim Schritt hervorheben, was
    # gerade gebraucht wird.
    r = recipe(beispiel())

    assert r["instructions"][0]["ingredientIds"] == ["r2"]


def test_verweise_auch_als_objekte():
    # Mealie liefert sie mal als Zeichenkette, mal als Objekt.
    r = recipe(beispiel())

    assert r["instructions"][1]["ingredientIds"] == ["r1"]


def test_rezept_ohne_zutaten_und_schritte():
    r = recipe({"recipe_id": "x", "name": "Butterbrot"})

    assert r["ingredients"] == []
    assert r["instructions"] == []
    assert r["hasImage"] is False


def test_jede_zutat_bekommt_eine_kennung_fuer_die_verweise():
    r = recipe(beispiel())
    kennungen = {z["id"] for z in r["ingredients"]}
    verwiesen = {v for s in r["instructions"] for v in s["ingredientIds"]}

    assert verwiesen <= kennungen
