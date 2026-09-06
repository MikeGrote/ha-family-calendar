"""Aus Mealies Daten wird, was die Karte anzeigt.

Reine Umformung, ohne Home Assistant: Die Integration von Mealie liefert
ihre eigenen Datenklassen, und deren Felder heissen anders und sind tiefer
verschachtelt, als eine Karte es braucht. Hier wird daraus eine flache,
stabile Form - und wenn Mealie seine Felder eines Tages umbenennt, ist das
die einzige Stelle, die es merkt.
"""

from __future__ import annotations

from typing import Any

# Bruchzeichen fuer die Kueche. "0,5 Zwiebel" liest sich schlechter als
# "½ Zwiebel", und auf zwei Meter Abstand zaehlt jedes Zeichen.
_BRUECHE = {
    0.25: "¼",
    0.33: "⅓",
    0.333: "⅓",
    0.5: "½",
    0.66: "⅔",
    0.667: "⅔",
    0.75: "¾",
}


def plan_entries(roh: list[dict[str, Any]] | None) -> list[dict[str, Any]]:
    """Der Wochenplan, ein Eintrag je geplanter Mahlzeit."""
    return [_plan_entry(eintrag) for eintrag in roh or []]


def _plan_entry(roh: dict[str, Any]) -> dict[str, Any]:
    rezept = roh.get("recipe") or {}
    return {
        "date": _text(roh.get("mealplan_date")),
        "type": _text(roh.get("entry_type")),
        "recipeId": _text(rezept.get("recipe_id")),
        # Ohne Rezept ist es eine Notiz - dann traegt der Eintrag selbst
        # den Text, und die Karte soll trotzdem etwas anzeigen koennen.
        "name": _text(rezept.get("name")) or _text(roh.get("title")),
        "description": _text(rezept.get("description")) or _text(roh.get("description")),
        "hasImage": bool(rezept.get("image")),
        "totalTime": _text(rezept.get("total_time")),
        "servings": _zahl(rezept.get("recipe_servings")),
    }


def recipe(roh: dict[str, Any] | None) -> dict[str, Any] | None:
    """Ein Rezept, so wie es am Herd gebraucht wird."""
    if not roh:
        return None

    return {
        "recipeId": _text(roh.get("recipe_id")),
        "name": _text(roh.get("name")),
        "description": _text(roh.get("description")),
        "totalTime": _text(roh.get("total_time")),
        "prepTime": _text(roh.get("prep_time")),
        "performTime": _text(roh.get("perform_time")),
        "servings": _zahl(roh.get("recipe_servings")),
        "yield": _text(roh.get("recipe_yield")),
        "hasImage": bool(roh.get("image")),
        "originalUrl": _text(roh.get("original_url")),
        "ingredients": [_ingredient(z) for z in roh.get("ingredients") or []],
        "instructions": [_instruction(s) for s in roh.get("instructions") or []],
    }


def _ingredient(roh: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": _text(roh.get("reference_id")),
        "display": ingredient_text(roh),
        "note": _text(roh.get("note")),
    }


def ingredient_text(roh: dict[str, Any]) -> str:
    """Eine Zutat in einer Zeile.

    Mealie liefert oft schon einen fertigen Text mit - der wird bevorzugt,
    weil er die Schreibweise des Rezepts behaelt. Nur wenn er fehlt, wird
    aus Menge, Einheit und Lebensmittel einer gebaut.
    """
    fertig = _text(roh.get("display"))
    if fertig:
        return fertig

    teile: list[str] = []
    menge = quantity_text(roh.get("quantity"))
    if menge:
        teile.append(menge)

    einheit = _text((roh.get("unit") or {}).get("name"))
    if einheit:
        teile.append(einheit)

    lebensmittel = _text((roh.get("food") or {}).get("name"))
    if lebensmittel:
        teile.append(lebensmittel)

    if not teile:
        return _text(roh.get("note")) or _text(roh.get("original_text"))

    notiz = _text(roh.get("note"))
    zeile = " ".join(teile)
    return f"{zeile}, {notiz}" if notiz else zeile


def quantity_text(menge: Any) -> str:
    """Menge als Text, mit Bruchzeichen wo es sich anbietet."""
    if menge is None:
        return ""
    try:
        wert = float(menge)
    except (TypeError, ValueError):
        return ""

    if wert <= 0:
        return ""

    ganz = int(wert)
    rest = round(wert - ganz, 3)
    bruch = _BRUECHE.get(rest)

    if bruch:
        return f"{ganz}{bruch}" if ganz else bruch
    if rest == 0:
        return str(ganz)

    # Sonst so kurz wie moeglich: 1.50 -> 1,5
    return f"{wert:.2f}".rstrip("0").rstrip(".").replace(".", ",")


def _instruction(roh: dict[str, Any]) -> dict[str, Any]:
    return {
        "id": _text(roh.get("instruction_id")),
        "title": _text(roh.get("title")),
        "text": _text(roh.get("text")),
        "ingredientIds": _references(roh.get("ingredient_references")),
    }


def _references(roh: Any) -> list[str]:
    """Verweise auf Zutaten - mal als Zeichenkette, mal als Objekt.

    Damit weiss jeder Schritt, welche Zutaten zu ihm gehoeren. Beide Formen
    zu nehmen kostet drei Zeilen und erspart einen Fehler, der erst beim
    Kochen auffiele.
    """
    if not roh:
        return []

    ergebnis: list[str] = []
    for eintrag in roh:
        if isinstance(eintrag, str):
            ergebnis.append(eintrag)
        elif isinstance(eintrag, dict):
            kennung = eintrag.get("reference_id") or eintrag.get("referenceId")
            if kennung:
                ergebnis.append(str(kennung))
    return ergebnis


def _text(wert: Any) -> str:
    if wert is None:
        return ""
    return str(wert).strip()


def _zahl(wert: Any) -> float:
    try:
        return float(wert or 0)
    except (TypeError, ValueError):
        return 0.0
