"""Config Flow fuer Family Calendar."""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import DOMAIN


class CalendarServiceExtConfigFlow(ConfigFlow, domain=DOMAIN):
    """Fuehre den Nutzer durch die Einrichtung."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Einziger Schritt - die Integration hat keine Optionen."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            return self.async_create_entry(title="Family Calendar", data={})

        return self.async_show_form(step_id="user")
