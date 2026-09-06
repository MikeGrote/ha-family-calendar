"""Die Einstellungen der App: zusammenfuehren, sichern, weitersagen.

Geschrieben wird immer nur ein Ausschnitt. Wer die Sekunden je Bild aendert,
schickt genau dieses Feld. Traegt das Zusammenfuehren dabei einen Nachbarn
aus, faellt das im Betrieb erst auf, wenn jemand die verlorene Einstellung
vermisst - und dann weiss niemand mehr, wann sie verschwunden ist.
"""

from __future__ import annotations

import pytest
from calendar_service_ext.settings_store import DEFAULTS, SettingsStore, merge

# ------------------------------------------------------------------- merge


def test_flacher_wert_wird_ersetzt():
    assert merge({"a": 1, "b": 2}, {"a": 9}) == {"a": 9, "b": 2}


def test_verschachteltes_wird_ebenenweise_verschmolzen():
    basis = {"photos": {"interval": 30, "showClock": True, "folder": "x"}}
    assert merge(basis, {"photos": {"interval": 45}}) == {
        "photos": {"interval": 45, "showClock": True, "folder": "x"}
    }


def test_neue_schluessel_kommen_dazu():
    assert merge({"a": 1}, {"b": {"c": 2}}) == {"a": 1, "b": {"c": 2}}


def test_liste_wird_als_ganzes_ersetzt():
    # Zusammengefuegte Listen liessen sich nie wieder kuerzen.
    assert merge({"l": [1, 2, 3]}, {"l": [7]}) == {"l": [7]}


def test_none_ersetzt_statt_zu_verschmelzen():
    assert merge({"a": {"b": 1}}, {"a": None}) == {"a": None}


def test_wert_ersetzt_woerterbuch():
    assert merge({"a": {"b": 1}}, {"a": 5}) == {"a": 5}


def test_eingaben_bleiben_unveraendert():
    basis = {"photos": {"interval": 30}}
    patch = {"photos": {"interval": 45}}

    merge(basis, patch)

    assert basis == {"photos": {"interval": 30}}
    assert patch == {"photos": {"interval": 45}}


def test_ergebnis_haengt_nicht_am_patch():
    # Sonst wuerde eine spaetere Aenderung am Patch den Speicher mitziehen.
    patch = {"photos": {"tags": ["a"]}}
    ergebnis = merge({}, patch)

    ergebnis["photos"]["tags"].append("b")

    assert patch["photos"]["tags"] == ["a"]


# ------------------------------------------------------------ SettingsStore


@pytest.fixture
def store() -> SettingsStore:
    return SettingsStore(hass=object())


async def test_ohne_gespeicherten_stand_gelten_die_vorgaben(store):
    assert await store.async_load() == DEFAULTS


async def test_fehlende_felder_kommen_aus_den_vorgaben(store):
    # Ein aelterer Stand kennt neu hinzugekommene Felder nicht.
    store._store.saved = {"photos": {"interval": 45}}

    stand = await store.async_load()

    assert stand["photos"]["interval"] == 45
    assert stand["photos"]["showClock"] == DEFAULTS["photos"]["showClock"]
    assert stand["photos"]["folder"] == DEFAULTS["photos"]["folder"]


async def test_ohne_festlegung_ist_jeder_bildschirm_fuer_sich(store):
    # Ein Bildschirm soll niemanden fernsteuern, solange das niemand
    # eingestellt hat.
    assert (await store.async_load())["panel"]["syncedBrowsers"] == []


async def test_alte_fuehrung_wird_zur_kopplung(store):
    # Frueher gab es genau ein fuehrendes Geraet. Wer das eingestellt hatte,
    # soll nicht von vorn anfangen muessen.
    store._store.saved = {"panel": {"leadBrowser": "browser_mod_wand"}}

    stand = await store.async_load()

    assert stand["panel"]["syncedBrowsers"] == ["browser_mod_wand"]
    assert "leadBrowser" not in stand["panel"]


async def test_uebernahme_ueberschreibt_keine_bestehende_kopplung(store):
    store._store.saved = {
        "panel": {"leadBrowser": "browser_mod_alt", "syncedBrowsers": ["browser_mod_neu"]}
    }

    stand = await store.async_load()

    assert stand["panel"]["syncedBrowsers"] == ["browser_mod_neu"]


async def test_abschnitte_stoeren_einander_nicht(store):
    # Zwei Bereiche der Einstellungen koennen gleichzeitig offen sein.
    await store.async_update({"photos": {"interval": 45}})
    stand = await store.async_update({"panel": {"syncedBrowsers": ["browser_mod_abc"]}})

    assert stand["photos"]["interval"] == 45
    assert stand["panel"]["syncedBrowsers"] == ["browser_mod_abc"]


async def test_kopplung_laesst_sich_wieder_aufheben(store):
    # Die Liste wird als Ganzes ersetzt - sonst liesse sich kein Bildschirm
    # wieder herausnehmen.
    await store.async_update({"panel": {"syncedBrowsers": ["a", "b"]}})
    stand = await store.async_update({"panel": {"syncedBrowsers": ["a"]}})

    assert stand["panel"]["syncedBrowsers"] == ["a"]


async def test_ausschnitt_laesst_nachbarn_stehen(store):
    await store.async_update({"photos": {"interval": 45}})
    stand = await store.async_update({"photos": {"showClock": False}})

    assert stand["photos"]["interval"] == 45
    assert stand["photos"]["showClock"] is False
    assert stand["photos"]["folder"] == DEFAULTS["photos"]["folder"]


async def test_aenderung_wird_gesichert(store):
    await store.async_update({"photos": {"interval": 45}})

    assert store._store.writes == 1
    assert store._store.saved["photos"]["interval"] == 45


async def test_gesicherter_stand_ist_vollstaendig(store):
    # Nicht nur der Ausschnitt: Sonst haette ein Neustart wieder Vorgaben.
    await store.async_update({"photos": {"interval": 45}})

    assert set(store._store.saved["photos"]) == set(DEFAULTS["photos"])


async def test_gelesener_stand_ist_eine_kopie(store):
    stand = await store.async_load()
    stand["photos"]["interval"] = 999

    assert (await store.async_load())["photos"]["interval"] == DEFAULTS["photos"]["interval"]


async def test_horcher_bekommen_den_neuen_stand(store):
    gemeldet = []
    store.async_listen(gemeldet.append)

    await store.async_update({"photos": {"interval": 45}})

    assert len(gemeldet) == 1
    assert gemeldet[0]["photos"]["interval"] == 45


async def test_horcher_bekommen_eigene_kopien(store):
    gemeldet = []
    store.async_listen(gemeldet.append)

    await store.async_update({"photos": {"interval": 45}})
    gemeldet[0]["photos"]["interval"] = 999
    await store.async_update({"photos": {"showClock": False}})

    assert gemeldet[1]["photos"]["interval"] == 45


async def test_abgemeldeter_horcher_wird_nicht_mehr_gerufen(store):
    gemeldet = []
    abmelden = store.async_listen(gemeldet.append)

    await store.async_update({"photos": {"interval": 45}})
    abmelden()
    await store.async_update({"photos": {"interval": 60}})

    assert len(gemeldet) == 1


async def test_ein_horcher_stoert_die_anderen_nicht(store):
    ersteMeldungen = []
    zweiteMeldungen = []
    abmelden = store.async_listen(ersteMeldungen.append)
    store.async_listen(zweiteMeldungen.append)

    abmelden()
    await store.async_update({"photos": {"interval": 45}})

    assert ersteMeldungen == []
    assert len(zweiteMeldungen) == 1


async def test_laden_nach_dem_schreiben_liefert_den_neuen_stand(store):
    await store.async_update({"photos": {"folder": "media-source://x/y"}})

    assert (await store.async_load())["photos"]["folder"] == "media-source://x/y"
