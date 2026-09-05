"""Laedt invite_sync.py ohne laufendes Home Assistant.

Die Datei importiert HA-Module, die im Testlauf nicht vorhanden sind. Sie
werden durch Platzhalter ersetzt - geprueft werden ohnehin nur die reinen
Funktionen: Parser, Routing und Absenderfilter.
"""

from __future__ import annotations

import importlib.util
import pathlib
import sys
import types

import pytest

COMPONENT = (
    pathlib.Path(__file__).resolve().parents[2]
    / "custom_components"
    / "calendar_service_ext"
)


def _stub_homeassistant() -> None:
    """Lege Platzhalter fuer die HA-Importe an."""
    for name in (
        "homeassistant",
        "homeassistant.config_entries",
        "homeassistant.core",
        "homeassistant.helpers",
        "homeassistant.helpers.event",
        "homeassistant.helpers.storage",
    ):
        sys.modules.setdefault(name, types.ModuleType(name))

    sys.modules["homeassistant.config_entries"].ConfigEntry = object
    sys.modules["homeassistant.core"].HomeAssistant = object
    sys.modules["homeassistant.core"].callback = lambda func: func
    sys.modules["homeassistant.helpers.event"].async_track_time_interval = (
        lambda *args, **kwargs: None
    )
    sys.modules["homeassistant.helpers.storage"].Store = object


def _load(name: str, path: pathlib.Path, rewrite: dict[str, str] | None = None):
    """Lade ein Modul aus einer Datei, optional mit ersetzten Importzeilen."""
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module  # dataclass braucht das Modul in sys.modules
    source = path.read_text(encoding="utf-8")
    for old, new in (rewrite or {}).items():
        source = source.replace(old, new)
    exec(compile(source, str(path), "exec"), module.__dict__)  # noqa: S102
    return module


@pytest.fixture(scope="session")
def invite_sync():
    """Das Modul invite_sync mit aufgeloesten Abhaengigkeiten."""
    _stub_homeassistant()
    _load("const", COMPONENT / "const.py")
    return _load(
        "invite_sync",
        COMPONENT / "invite_sync.py",
        {"from .const import": "from const import"},
    )


@pytest.fixture(scope="session")
def parse_mapping():
    """Der Zuordnungs-Parser aus dem Options-Flow.

    config_flow.py importiert voluptuous und HA-Selektoren; hier wird nur der
    reine Funktionsteil ab _parse_mapping ausgefuehrt.
    """
    source = (COMPONENT / "config_flow.py").read_text(encoding="utf-8")
    namespace: dict = {}
    exec(  # noqa: S102
        compile(source[source.index("def _parse_mapping") :], "config_flow.py", "exec"),
        namespace,
    )
    return namespace["_parse_mapping"]
