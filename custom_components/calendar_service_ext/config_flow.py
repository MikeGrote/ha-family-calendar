"""Config Flow und Optionen fuer Family Calendar."""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlow,
)
from homeassistant.core import callback
from homeassistant.helpers import selector

from .const import (
    CONF_ALLOWED_SENDERS,
    CONF_ENABLED,
    CONF_FALLBACK,
    CONF_FOLDER,
    CONF_INTERVAL,
    CONF_MAPPING,
    CONF_PASSWORD,
    CONF_PORT,
    CONF_SERVER,
    CONF_USERNAME,
    DEFAULT_FOLDER,
    DEFAULT_INTERVAL,
    DEFAULT_PORT,
    DEFAULT_SERVER,
    DOMAIN,
)


class CalendarServiceExtConfigFlow(ConfigFlow, domain=DOMAIN):
    """Fuehre den Nutzer durch die Einrichtung."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Einziger Schritt - alles Weitere laeuft ueber die Optionen."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            return self.async_create_entry(title="Family Calendar", data={})

        return self.async_show_form(step_id="user")

    @staticmethod
    @callback
    def async_get_options_flow(entry: ConfigEntry) -> OptionsFlow:  # noqa: ARG004
        """Reiche die Optionen nach."""
        return CalendarServiceExtOptionsFlow()


class CalendarServiceExtOptionsFlow(OptionsFlow):
    """Einstellungen fuer den Einladungs-Abgleich."""

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Zeige und speichere die Einstellungen."""
        errors: dict[str, str] = {}

        if user_input is not None:
            mapping, invalid = _parse_mapping(user_input.get(CONF_MAPPING, ""))
            if invalid:
                errors[CONF_MAPPING] = "invalid_mapping"
            elif user_input.get(CONF_ENABLED) and not user_input.get(CONF_USERNAME):
                errors[CONF_USERNAME] = "credentials_required"
            else:
                options = dict(user_input)
                options[CONF_MAPPING] = mapping
                return self.async_create_entry(data=options)

        current = self.config_entry.options
        schema = vol.Schema(
            {
                vol.Required(
                    CONF_ENABLED, default=current.get(CONF_ENABLED, False)
                ): selector.BooleanSelector(),
                vol.Optional(
                    CONF_SERVER, default=current.get(CONF_SERVER, DEFAULT_SERVER)
                ): str,
                vol.Optional(
                    CONF_PORT, default=current.get(CONF_PORT, DEFAULT_PORT)
                ): int,
                vol.Optional(CONF_USERNAME, default=current.get(CONF_USERNAME, "")): str,
                vol.Optional(
                    CONF_PASSWORD, default=current.get(CONF_PASSWORD, "")
                ): selector.TextSelector(
                    selector.TextSelectorConfig(type=selector.TextSelectorType.PASSWORD)
                ),
                vol.Optional(
                    CONF_FOLDER, default=current.get(CONF_FOLDER, DEFAULT_FOLDER)
                ): str,
                vol.Optional(
                    CONF_INTERVAL, default=current.get(CONF_INTERVAL, DEFAULT_INTERVAL)
                ): selector.NumberSelector(
                    selector.NumberSelectorConfig(
                        min=1, max=60, step=1, mode=selector.NumberSelectorMode.BOX
                    )
                ),
                vol.Optional(
                    CONF_MAPPING, default=_format_mapping(current.get(CONF_MAPPING, {}))
                ): selector.TextSelector(
                    selector.TextSelectorConfig(multiline=True)
                ),
                vol.Optional(
                    CONF_FALLBACK, default=current.get(CONF_FALLBACK, "")
                ): selector.EntitySelector(
                    selector.EntitySelectorConfig(domain="calendar")
                ),
                vol.Optional(
                    CONF_ALLOWED_SENDERS,
                    default=current.get(CONF_ALLOWED_SENDERS, ""),
                ): selector.TextSelector(selector.TextSelectorConfig(multiline=True)),
            }
        )

        return self.async_show_form(step_id="init", data_schema=schema, errors=errors)


def _parse_mapping(raw: str | dict[str, str]) -> tuple[dict[str, str], bool]:
    """Lies "mike = calendar.mike" je Zeile in eine Zuordnung."""
    if isinstance(raw, dict):
        return raw, False

    mapping: dict[str, str] = {}
    for line in raw.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if "=" not in line:
            return {}, True
        tag, entity_id = (part.strip() for part in line.split("=", 1))
        if not tag or not entity_id.startswith("calendar."):
            return {}, True
        mapping[tag.lower()] = entity_id
    return mapping, False


def _format_mapping(mapping: dict[str, str]) -> str:
    """Stelle die Zuordnung wieder als Text dar."""
    return "\n".join(f"{tag} = {entity_id}" for tag, entity_id in mapping.items())
