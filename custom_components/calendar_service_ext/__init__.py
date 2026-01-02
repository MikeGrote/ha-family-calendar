import logging
import os
import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers import config_validation as cv
from homeassistant.exceptions import HomeAssistantError
from homeassistant.components import frontend

_LOGGER = logging.getLogger(__name__)

DOMAIN = "calendar_service_ext"
URL_BASE = "/calendar_service_ext_files"

async def async_setup(hass: HomeAssistant, config: dict):
    """Setzt die Integration auf."""
    
    # 1. Statischen Pfad registrieren
    component_dir = os.path.dirname(__file__)
    www_dir = os.path.join(component_dir, "www")
    
    hass.http.register_static_path(
        URL_BASE,
        www_dir,
        cache_headers=False
    )

    # 2. JS-Resource für Dashboards verfügbar machen (damit es als Card genutzt werden kann)
    frontend.add_extra_js_url(hass, f"{URL_BASE}/family-calendar.js")

    # 3. Panel registrieren (Optional: Falls du es auch in der Seitenleiste willst)
    # Um das Panel auszublenden, einfach diesen Block auskommentieren oder löschen.
    # frontend.async_register_panel(
    #     hass,
    #     component_name="custom",
    #     sidebar_title="Family Calendar",
    #     sidebar_icon="mdi:calendar-heart",
    #     url_path="family-calendar",
    #     config={
    #         "_panel_custom": {
    #             "name": "family-calendar",
    #             "module_url": f"{URL_BASE}/family-calendar.js"
    #         }
    #     },
    #     require_admin=False
    # )
    
    async def handle_delete_event(call: ServiceCall):
        """Handle the service call."""
        entity_id = call.data.get("entity_id")
        uid = call.data.get("uid")
        recurrence_id = call.data.get("recurrence_id")
        recurrence_range = call.data.get("recurrence_range")

        # 1. Zugriff auf die Calendar Component im Core
        component = hass.data.get("calendar")
        
        if not component:
            raise HomeAssistantError("Calendar integration not loaded.")

        # 2. Die spezifische Entity holen (z.B. calendar.google)
        entity = component.get_entity(entity_id)

        if not entity:
            raise HomeAssistantError(f"Calendar entity {entity_id} not found.")

        # 3. Prüfen, ob der Kalender das Löschen unterstützt
        if not hasattr(entity, "async_delete_event"):
             raise HomeAssistantError(f"Calendar {entity_id} does not support deleting events.")

        # 4. Löschen ausführen
        try:
            await entity.async_delete_event(
                uid=uid,
                recurrence_id=recurrence_id,
                recurrence_range=recurrence_range
            )
            _LOGGER.info(f"Event {uid} deleted from {entity_id}")
        except NotImplementedError:
             raise HomeAssistantError(f"This specific calendar integration ({entity_id}) has not implemented delete logic.")
        except Exception as e:
            raise HomeAssistantError(f"Error deleting event: {e}")

    # Service registrieren
    # Der Service heißt dann: calendar_service_ext.delete_event
    hass.services.async_register(
        DOMAIN, 
        "delete_event", 
        handle_delete_event
    )

    return True