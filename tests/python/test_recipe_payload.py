"""Aus einem lesbaren Rezept wird, was Mealie speichert.

Der Kern ist die Verknuepfung von Schritt und Zutat. Zeigt ein Verweis auf
die falsche Zutat, hebt die Kochansicht beim Schritt das Falsche hervor -
und man merkt es genau dann nicht, wenn man sich darauf verlaesst.
"""

from __future__ import annotations

import pytest
from calendar_service_ext.recipe_payload import build_recipe, slugify

ZUTATEN = ["300 g Nudeln", "200 g Schmand", "200 g geriebener Käse"]


def bauen(instructions=None, **kwargs):
    return build_recipe(
        "Nudelauflauf",
        ZUTATEN,
        instructions if instructions is not None else [],
        kennungen=["id-0", "id-1", "id-2"],
        **kwargs,
    )


def test_name_und_zutaten():
    n = bauen()

    assert n["name"] == "Nudelauflauf"
    assert [z["note"] for z in n["recipeIngredient"]] == ZUTATEN


def test_jede_zutat_bekommt_eine_kennung():
    n = bauen()
    kennungen = [z["referenceId"] for z in n["recipeIngredient"]]

    assert kennungen == ["id-0", "id-1", "id-2"]
    assert len(set(kennungen)) == 3


def test_kennungen_sind_ohne_vorgabe_verschieden():
    n = build_recipe("X", ZUTATEN, [])
    kennungen = [z["referenceId"] for z in n["recipeIngredient"]]

    assert len(set(kennungen)) == 3
    assert all(kennungen)


def test_der_ganze_text_bleibt_beisammen():
    # Zerlegt wird in der Karte; hier wuerde ein halber Zerleger nur
    # Angaben verlieren.
    n = bauen()
    erste = n["recipeIngredient"][0]

    assert erste["note"] == "300 g Nudeln"
    assert erste["originalText"] == "300 g Nudeln"
    assert erste["disableAmount"] is True


def test_leerzeichen_am_rand_fallen_weg():
    n = build_recipe("  Auflauf  ", ["  300 g Nudeln  "], [{"text": "  Kochen.  "}])

    assert n["name"] == "Auflauf"
    assert n["recipeIngredient"][0]["note"] == "300 g Nudeln"
    assert n["recipeInstructions"][0]["text"] == "Kochen."


# --------------------------------------------------- Schritt und Zutat


def test_schritt_verweist_auf_seine_zutaten():
    n = bauen([{"text": "Nudeln kochen.", "uses": [0]}])

    assert n["recipeInstructions"][0]["ingredientReferences"] == [{"referenceId": "id-0"}]


def test_schritt_mit_mehreren_zutaten():
    n = bauen([{"text": "Alles mischen.", "uses": [1, 2]}])

    assert n["recipeInstructions"][0]["ingredientReferences"] == [
        {"referenceId": "id-1"},
        {"referenceId": "id-2"},
    ]


def test_schritt_ohne_zutaten():
    n = bauen([{"text": "Ofen vorheizen."}])

    assert n["recipeInstructions"][0]["ingredientReferences"] == []


@pytest.mark.parametrize("uses", [[7], [-1], ["zwei"], [None], [3]])
def test_verweise_ins_leere_fallen_weg(uses):
    # Lieber kein Verweis als ein falscher: Beim Kochen wuerde sonst die
    # falsche Zutat hervorgehoben.
    n = bauen([{"text": "Irgendwas.", "uses": uses}])

    assert n["recipeInstructions"][0]["ingredientReferences"] == []


def test_doppelter_verweis_zaehlt_einmal():
    n = bauen([{"text": "Nudeln, nochmal Nudeln.", "uses": [0, 0]}])

    assert n["recipeInstructions"][0]["ingredientReferences"] == [{"referenceId": "id-0"}]


def test_gueltige_verweise_bleiben_neben_ungueltigen():
    n = bauen([{"text": "Mischen.", "uses": [0, 99, 2]}])

    assert n["recipeInstructions"][0]["ingredientReferences"] == [
        {"referenceId": "id-0"},
        {"referenceId": "id-2"},
    ]


def test_jeder_schritt_hat_eine_eigene_kennung():
    n = bauen([{"text": "Eins."}, {"text": "Zwei."}])
    kennungen = [s["id"] for s in n["recipeInstructions"]]

    assert len(set(kennungen)) == 2


def test_ueberschrift_eines_schritts():
    n = bauen([{"text": "Kochen.", "title": "Vorbereiten"}])

    assert n["recipeInstructions"][0]["title"] == "Vorbereiten"


# ------------------------------------------------------------- Beiwerk


def test_zeiten_und_portionen():
    n = bauen(servings=4, total_time="30 Minuten", prep_time="10 Minuten")

    assert n["recipeServings"] == 4
    assert n["totalTime"] == "30 Minuten"
    assert n["prepTime"] == "10 Minuten"


def test_leere_angaben_werden_weggelassen():
    # Mealie zeigt sonst leere Felder an, wo nichts steht.
    n = bauen()

    assert "recipeServings" not in n
    assert "totalTime" not in n
    assert "prepTime" not in n


def test_kategorien_und_schlagworte():
    # Mealie verlangt vorhandene Objekte mit Kennung; die loest der
    # Schreiber vorher auf. Hier steht nur die Form.
    n = bauen(categories=["Hauptgericht"], tags=["Kinder", "schnell"])

    assert n["recipeCategory"] == [{"name": "Hauptgericht", "slug": "hauptgericht"}]
    assert n["tags"] == [
        {"name": "Kinder", "slug": "kinder"},
        {"name": "schnell", "slug": "schnell"},
    ]


@pytest.mark.parametrize(
    ("text", "erwartet"),
    [
        ("Hauptgericht", "hauptgericht"),
        ("Süße Nachspeise", "suesse-nachspeise"),
        ("Für Kinder", "fuer-kinder"),
        ("Ohne  doppelte   Leerzeichen", "ohne-doppelte-leerzeichen"),
        ("Mit / Schrägstrich", "mit-schraegstrich"),
        ("  Rand  ", "rand"),
    ],
)
def test_slug_aus_dem_namen(text, erwartet):
    assert slugify(text) == erwartet


def test_rezept_ohne_alles_bleibt_gueltig():
    n = build_recipe("Butterbrot", [], [])

    assert n["recipeIngredient"] == []
    assert n["recipeInstructions"] == []
    assert n["recipeCategory"] == []
