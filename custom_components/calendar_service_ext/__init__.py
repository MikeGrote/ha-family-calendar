import logging
import os
import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers import config_validation as cv
from homeassistant.exceptions import HomeAssistantError
from homeassistant.components import frontend

_LOGGER = logging.getLogger(__name__)

DOMAIN = "calendar_service_ext"
URL_BASE = "/calendar_service_ext_files"

async def async_setup(hass: HomeAssistant, config: dict):
    """Set up the component via YAML (legacy)."""
    return True

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry):
    """Set up from a config entry."""
    _LOGGER.info("Initializing Calendar Service Extension")
    
    # 1. Statischen Pfad registrieren
    component_dir = os.path.dirname(__file__)
    www_dir = os.path.join(component_dir, "www")
    
    try:
        hass.http.register_static_path(
            URL_BASE,
            www_dir,
            cache_headers=False
        )
        _LOGGER.info(f"Registered static path {URL_BASE} to {www_dir}")
    except ValueError:
        _LOGGER.warning(f"Static path {URL_BASE} already registered")

    # 2. JS-Resource für Dashboards verfügbar machen (damit es als Card genutzt werden kann)
    js_url = f"{URL_BASE}/family-calendar.js"
    frontend.add_extra_js_url(hass, js_url)
    _LOGGER.info(f"Added extra JS URL: {js_url}")

    # 3. Service registrieren
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
    _LOGGER.info("Service 'delete_event' registered successfully")

    return True

async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry):
    """Unload a config entry."""
    return True