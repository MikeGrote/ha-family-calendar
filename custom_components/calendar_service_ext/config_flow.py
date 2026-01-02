from homeassistant import config_entries
from . import DOMAIN

class CalendarServiceExtConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Calendar Service Extension."""
    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Handle the initial step."""
        # Nur eine Instanz erlauben
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            return self.async_create_entry(title="Calendar Service Extension", data=user_input)

        return self.async_show_form(step_id="user")