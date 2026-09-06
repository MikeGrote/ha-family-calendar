"""Aus einem lesbaren Rezept wird, was Mealie speichert.

Reine Umformung, ohne Netz und ohne Home Assistant.

Der Kern ist die Verknuepfung von Schritt und Zutat: Mealie fuehrt sie mit,
fuellt sie beim Import aus einer Webseite aber nie - dort bleibt sie leer,
weil nur ein Mensch sie setzen kann. Wer ein Rezept hier anlegt, gibt je
Schritt an, welche Zutaten er braucht, und bekommt genau das, was Mealies
eigener Import schuldig bleibt.
"""

from __future__ import annotations

import uuid
from typing import Any


def build_recipe(
    name: str,
    ingredients: list[str],
    instructions: list[dict[str, Any]],
    *,
    description: str = "",
    servings: float = 0,
    total_time: str = "",
    prep_time: str = "",
    categories: list[str] | None = None,
    tags: list[str] | None = None,
    kennungen: list[str] | None = None,
) -> dict[str, Any]:
    """Baut die Nutzlast fuer PATCH /api/recipes/{slug}.

    ``instructions`` ist eine Liste aus ``{"text": ..., "uses": [0, 2]}`` -
    die Zahlen sind Plaetze in ``ingredients``. Ueber Plaetze und nicht
    ueber Namen, weil dieselbe Zutat zweimal vorkommen kann und ein Name
    dann nicht mehr eindeutig waere.
    """
    ids = kennungen or [str(uuid.uuid4()) for _ in ingredients]

    zutaten = [
        {
            "referenceId": kennung,
            # Der ganze lesbare Text bleibt beisammen. Mealie zerlegt ihn
            # nur mit eingeschaltetem Zerleger, und die Karte kann es
            # ohnehin besser - dort ist der Text sichtbar und pruefbar.
            "note": text.strip(),
            "quantity": 0,
            "unit": None,
            "food": None,
            "disableAmount": True,
            "originalText": text.strip(),
        }
        for kennung, text in zip(ids, ingredients, strict=False)
    ]

    schritte = [
        {
            "id": str(uuid.uuid4()),
            "title": str(schritt.get("title") or ""),
            "text": str(schritt.get("text") or "").strip(),
            "ingredientReferences": [
                {"referenceId": ids[i]}
                for i in _plaetze(schritt.get("uses"), len(ids))
            ],
        }
        for schritt in instructions
    ]

    nutzlast: dict[str, Any] = {
        "name": name.strip(),
        "description": description.strip(),
        "recipeIngredient": zutaten,
        "recipeInstructions": schritte,
        "recipeCategory": [_ordner(c) for c in categories or []],
        "tags": [_ordner(t) for t in tags or []],
    }

    if servings:
        nutzlast["recipeServings"] = float(servings)
    if total_time:
        nutzlast["totalTime"] = total_time
    if prep_time:
        nutzlast["prepTime"] = prep_time

    return nutzlast


def _ordner(name: str) -> dict[str, str]:
    """Kategorie oder Schlagwort, wie Mealie es verlangt.

    Der Name allein genuegt nicht - Mealie erwartet zusaetzlich einen
    Slug und weist die Angabe sonst mit 422 zurueck.
    """
    return {"name": name, "slug": slugify(name)}


def slugify(text: str) -> str:
    """Aus "Süße Nachspeise" wird "suesse-nachspeise"."""
    klein = text.strip().lower()
    for zeichen, ersatz in (("ä", "ae"), ("ö", "oe"), ("ü", "ue"), ("ß", "ss")):
        klein = klein.replace(zeichen, ersatz)

    erlaubt = "".join(z if z.isalnum() else "-" for z in klein)
    # Leere Teile fallen weg, sonst blieben aus zwei Trennern zwei Striche.
    return "-".join(teil for teil in erlaubt.split("-") if teil)


def _plaetze(roh: Any, anzahl: int) -> list[int]:
    """Gueltige Plaetze in der Zutatenliste - alles andere faellt weg.

    Ein Verweis ins Leere waere schlimmer als kein Verweis: Beim Kochen
    wuerde dann die falsche Zutat hervorgehoben.
    """
    if not roh:
        return []

    gefunden: list[int] = []
    for eintrag in roh:
        try:
            platz = int(eintrag)
        except (TypeError, ValueError):
            continue
        if 0 <= platz < anzahl and platz not in gefunden:
            gefunden.append(platz)
    return gefunden
