"""Gesichter aus den Bilddaten lesen.

Kameras und Fotoverwaltungen schreiben gefundene Gesichter nach dem Standard
der Metadata Working Group ins XMP - Apple tut es, Picasa tat es. Die
Information liegt also schon in der Datei; ein Modell braucht es dafuer
nicht. Nur wo sie fehlt, muss geraten werden.

Gelesen wird ohne fremde Bibliothek: Es geht um ein paar Kilobyte am Anfang
der Datei, und eine Abhaengigkeit wie Pillow oder OpenCV waere dafuer ein
hoher Preis - zumal sie im Container von Home Assistant erst gebaut werden
muesste.
"""

from __future__ import annotations

import re
import struct
from dataclasses import dataclass

# Weiter als hierhin steht XMP nicht in einer JPEG-Datei. Das ganze Bild zu
# lesen waere bei fuenf Megabyte je Foto verschwenderisch.
KOPF_BYTES = 512 * 1024

_XMP_START = b"<x:xmpmeta"
_XMP_ENDE = b"</x:xmpmeta>"

_AREA = re.compile(
    r'<mwg-rs:Area\s+([^/>]*?)/?>',
    re.IGNORECASE,
)
_ATTRIBUT = re.compile(r'stArea:(\w+)\s*=\s*"([^"]*)"', re.IGNORECASE)
_TYP = re.compile(r'mwg-rs:Type\s*=\s*"([^"]*)"', re.IGNORECASE)
_ANGEWENDET = re.compile(
    r'<mwg-rs:AppliedToDimensions[^/>]*?stDim:h\s*=\s*"(\d+)"[^/>]*?stDim:w\s*=\s*"(\d+)"',
    re.IGNORECASE,
)


@dataclass(frozen=True)
class FaceRegion:
    """Ein Gesicht in Anteilen des angezeigten Bildes.

    x und y bezeichnen die *Mitte* des Bereichs, nicht seine Ecke - so legt
    es der Standard fest.
    """

    x: float
    y: float
    w: float
    h: float

    def as_dict(self) -> dict[str, float]:
        return {"x": self.x, "y": self.y, "w": self.w, "h": self.h}


def faces_from_bytes(daten: bytes) -> list[FaceRegion]:
    """Gesichter einer Bilddatei, gedreht wie das Bild angezeigt wird."""
    xmp = _xmp_block(daten)
    if not xmp:
        return []

    regionen = _regionen(xmp)
    if not regionen:
        return []

    return [_gedreht(region, exif_orientation(daten)) for region in regionen]


def _xmp_block(daten: bytes) -> str:
    anfang = daten.find(_XMP_START, 0, KOPF_BYTES)
    if anfang == -1:
        return ""
    ende = daten.find(_XMP_ENDE, anfang)
    if ende == -1:
        return ""
    return daten[anfang:ende].decode("utf-8", "replace")


def _regionen(xmp: str) -> list[FaceRegion]:
    gefunden: list[FaceRegion] = []

    for treffer in _AREA.finditer(xmp):
        # Nur Gesichter: Dieselbe Liste traegt auch Haustiere und
        # Bildausschnitte, und die sind hier nicht gemeint.
        davor = xmp[: treffer.start()]
        typ = _TYP.findall(davor)
        if typ and typ[-1].lower() != "face":
            continue

        werte = {name.lower(): wert for name, wert in _ATTRIBUT.findall(treffer.group(1))}
        if werte.get("unit", "normalized").lower() != "normalized":
            continue

        region = _region_aus(werte)
        if region is not None:
            gefunden.append(region)

    return gefunden


def _region_aus(werte: dict[str, str]) -> FaceRegion | None:
    try:
        x = float(werte["x"])
        y = float(werte["y"])
        w = float(werte["w"])
        h = float(werte["h"])
    except (KeyError, ValueError):
        return None

    if not (0.0 <= x <= 1.0 and 0.0 <= y <= 1.0):
        return None
    if w <= 0 or h <= 0:
        return None

    return FaceRegion(x=x, y=y, w=min(w, 1.0), h=min(h, 1.0))


def applied_dimensions(daten: bytes) -> tuple[int, int] | None:
    """Masse, auf die sich die Anteile beziehen - falls angegeben."""
    xmp = _xmp_block(daten)
    treffer = _ANGEWENDET.search(xmp) if xmp else None
    if not treffer:
        return None
    return int(treffer.group(2)), int(treffer.group(1))


def exif_orientation(daten: bytes) -> int:
    """Ausrichtung nach EXIF; 1, wenn nichts dasteht.

    Wird gebraucht, weil die Anteile im XMP sich auf das ungedrehte Bild
    beziehen koennen, angezeigt aber das gedrehte wird.
    """
    anfang = daten.find(b"Exif\x00\x00", 0, KOPF_BYTES)
    if anfang == -1:
        return 1

    tiff = anfang + 6
    if len(daten) < tiff + 8:
        return 1

    byte_order = daten[tiff : tiff + 2]
    if byte_order == b"II":
        endian = "<"
    elif byte_order == b"MM":
        endian = ">"
    else:
        return 1

    try:
        (ifd_offset,) = struct.unpack_from(endian + "I", daten, tiff + 4)
        (anzahl,) = struct.unpack_from(endian + "H", daten, tiff + ifd_offset)
        for i in range(anzahl):
            eintrag = tiff + ifd_offset + 2 + i * 12
            (tag,) = struct.unpack_from(endian + "H", daten, eintrag)
            if tag == 0x0112:
                (wert,) = struct.unpack_from(endian + "H", daten, eintrag + 8)
                return wert if 1 <= wert <= 8 else 1
    except struct.error:
        return 1

    return 1


def _gedreht(region: FaceRegion, orientation: int) -> FaceRegion:
    """Rechnet Anteile auf das angezeigte, gedrehte Bild um."""
    x, y, w, h = region.x, region.y, region.w, region.h

    if orientation == 2:  # waagerecht gespiegelt
        return FaceRegion(1 - x, y, w, h)
    if orientation == 3:  # um 180 Grad gedreht
        return FaceRegion(1 - x, 1 - y, w, h)
    if orientation == 4:  # senkrecht gespiegelt
        return FaceRegion(x, 1 - y, w, h)
    if orientation == 5:  # gespiegelt und um 90 Grad gegen den Uhrzeigersinn
        return FaceRegion(y, x, h, w)
    if orientation == 6:  # um 90 Grad im Uhrzeigersinn
        return FaceRegion(1 - y, x, h, w)
    if orientation == 7:  # gespiegelt und um 90 Grad im Uhrzeigersinn
        return FaceRegion(1 - y, 1 - x, h, w)
    if orientation == 8:  # um 90 Grad gegen den Uhrzeigersinn
        return FaceRegion(y, 1 - x, h, w)

    return region
