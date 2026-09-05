"""Gemeinsame Konstanten fuer Family Calendar."""

DOMAIN = "calendar_service_ext"
URL_BASE = "/calendar_service_ext_files"
FRONTEND_SCRIPT = "family-calendar.js"

# --- Einladungs-Abgleich per IMAP ------------------------------------------

CONF_ENABLED = "invite_enabled"
CONF_SERVER = "imap_server"
CONF_PORT = "imap_port"
CONF_USERNAME = "imap_username"
CONF_PASSWORD = "imap_password"
CONF_FOLDER = "imap_folder"
CONF_INTERVAL = "poll_interval"
CONF_MAPPING = "calendar_mapping"
CONF_FALLBACK = "fallback_calendar"
CONF_ALLOWED_SENDERS = "allowed_senders"

DEFAULT_SERVER = "imap.gmail.com"
DEFAULT_PORT = 993
DEFAULT_FOLDER = "INBOX"
DEFAULT_INTERVAL = 5

STORAGE_KEY = f"{DOMAIN}.invites"
STORAGE_VERSION = 1
