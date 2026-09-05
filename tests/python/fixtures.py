"""Beispiel-Einladungen, wie Outlook sie versendet."""

# Enthaelt bewusst einen VTIMEZONE-Block mit Windows-Zeitzonennamen -
# Outlook schickt "W. Europe Standard Time", keinen IANA-Namen.
REQUEST = """BEGIN:VCALENDAR
METHOD:REQUEST
PRODID:Microsoft Exchange Server 2010
VERSION:2.0
BEGIN:VTIMEZONE
TZID:W. Europe Standard Time
BEGIN:STANDARD
DTSTART:16010101T030000
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=-1SU;BYMONTH=10
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:16010101T020000
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=-1SU;BYMONTH=3
END:DAYLIGHT
END:VTIMEZONE
BEGIN:VEVENT
ORGANIZER;CN=Mike Grote:MAILTO:mike.grote@example.de
ATTENDEE;ROLE=REQ-PARTICIPANT;RSVP=TRUE:MAILTO:postfach+mike@example.com
DESCRIPTION;LANGUAGE=de-DE:Kurzabstimmung
UID:040000008200E00074C5B7101A82E00800000000AAAA
SUMMARY;LANGUAGE=de-DE:Projekt-Jour-Fixe
DTSTART;TZID=W. Europe Standard Time:20260910T140000
DTEND;TZID=W. Europe Standard Time:20260910T150000
LOCATION;LANGUAGE=de-DE:Besprechungsraum 2
SEQUENCE:0
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR
"""

CANCEL = (
    REQUEST.replace("METHOD:REQUEST", "METHOD:CANCEL")
    .replace("SEQUENCE:0", "SEQUENCE:2")
    .replace("STATUS:CONFIRMED", "STATUS:CANCELLED")
)

ALL_DAY = """BEGIN:VCALENDAR
METHOD:REQUEST
VERSION:2.0
BEGIN:VEVENT
UID:allday-0001
SUMMARY:Betriebsausflug
DTSTART;VALUE=DATE:20260915
DTEND;VALUE=DATE:20260916
SEQUENCE:1
END:VEVENT
END:VCALENDAR
"""


def invitation_mail(ics: str, to: str, sender: str = "mike.grote@example.de") -> str:
    """Baue eine Einladungsmail, wie Outlook sie verschickt."""
    return (
        f"From: Mike Grote <{sender}>\n"
        f"To: {to}\n"
        "Subject: Termin\n"
        "MIME-Version: 1.0\n"
        'Content-Type: multipart/alternative; boundary="_000_ABC_"\n'
        "\n"
        "--_000_ABC_\n"
        'Content-Type: text/plain; charset="utf-8"\n'
        "\n"
        "Wann: 10. September 2026 14:00-15:00\n"
        "\n"
        "--_000_ABC_\n"
        'Content-Type: text/calendar; method=REQUEST; charset="utf-8"\n'
        "\n"
        f"{ics}"
        "--_000_ABC_--\n"
    )
