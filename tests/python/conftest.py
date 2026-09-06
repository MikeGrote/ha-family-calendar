"""Macht die Module der Integration ohne laufendes Home Assistant importierbar.

Parser, Zuordnung und Absenderfilter selbst kommen ohne Home Assistant aus.
Nur das Paket-__init__ importiert HA-Symbole, und die werden hier durch
Platzhalter ersetzt, damit der Import durchlaeuft.
"""

from __future__ import annotations

import pathlib
import sys
import types

import pytest

COMPONENT = (
    pathlib.Path(__file__).resolve().parents[2]
    / "custom_components"
    / "calendar_service_ext"
)


class FakeStore:
    """Speicher im Arbeitsspeicher statt auf der Platte.

    Genau die drei Methoden, die die Integration nutzt - mehr braucht es
    nicht, um Laden, Zusammenfuehren und Sichern zu pruefen.
    """

    def __init__(self, hass, version, key) -> None:
        self.hass = hass
        self.version = version
        self.key = key
        self.saved = None
        self.writes = 0

    async def async_load(self):
        return self.saved

    async def async_save(self, data) -> None:
        self.saved = data
        self.writes += 1


class _Marker:
    """Ersatz fuer vol.Required - muss als Schluesselwert taugen."""

    def __init__(self, key, *args, **kwargs) -> None:
        self.key = key

    def __hash__(self) -> int:
        return hash(self.key)

    def __eq__(self, other) -> bool:
        return isinstance(other, _Marker) and other.key == self.key


def _stub_homeassistant() -> None:
    """Platzhalter fuer die Importe in calendar_service_ext/__init__.py."""
    for name in (
        "homeassistant",
        "homeassistant.components",
        "homeassistant.components.frontend",
        "homeassistant.components.http",
        "homeassistant.config_entries",
        "homeassistant.core",
        "homeassistant.helpers",
        "homeassistant.helpers.event",
        "homeassistant.helpers.storage",
        "homeassistant.helpers.start",
        "homeassistant.components.websocket_api",
        "voluptuous",
    ):
        sys.modules.setdefault(name, types.ModuleType(name))

    sys.modules["homeassistant.components"].frontend = sys.modules[
        "homeassistant.components.frontend"
    ]
    sys.modules["homeassistant.components.http"].StaticPathConfig = object
    sys.modules["homeassistant.config_entries"].ConfigEntry = object
    sys.modules["homeassistant.core"].HomeAssistant = object
    sys.modules["homeassistant.core"].callback = lambda func: func
    sys.modules["homeassistant.helpers.event"].async_track_time_interval = (
        lambda *args, **kwargs: None
    )
    sys.modules["homeassistant.helpers.storage"].Store = FakeStore
    sys.modules["homeassistant.helpers.event"].async_track_state_change_event = (
        lambda *args, **kwargs: None
    )
    sys.modules["homeassistant.helpers.start"].async_at_started = (
        lambda *args, **kwargs: None
    )
    sys.modules["homeassistant.core"].Event = object

    ws = sys.modules["homeassistant.components.websocket_api"]
    ws.ActiveConnection = object
    ws.async_register_command = lambda *args, **kwargs: None
    ws.websocket_command = lambda schema: (lambda func: func)
    ws.async_response = lambda func: func
    sys.modules["homeassistant.components"].websocket_api = ws

    sys.modules["voluptuous"].Required = _Marker


_stub_homeassistant()
sys.path.insert(0, str(COMPONENT.parent))


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
