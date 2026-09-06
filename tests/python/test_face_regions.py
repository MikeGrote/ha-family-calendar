"""Gesichter aus den Bilddaten.

Die Anteile im XMP beziehen sich auf das *ungedrehte* Bild - angezeigt wird
aber das gedrehte. Wird das verwechselt, sitzt der Ausschnitt bei jedem
Hochformat an der falschen Stelle, und ausgerechnet dort ist der Fehler
gemeint: hochkant aufgenommene Bilder sind der Grund fuer die ganze Uebung.
"""

from __future__ import annotations

import struct

import pytest
from calendar_service_ext.face_regions import (
    FaceRegion,
    applied_dimensions,
    exif_orientation,
    faces_from_bytes,
)


def xmp(inhalt: str) -> bytes:
    return b"\xff\xd8" + f"<x:xmpmeta>{inhalt}</x:xmpmeta>".encode()


def region(x: float, y: float, w: float = 0.1, h: float = 0.1, typ: str = "Face") -> str:
    return (
        f'<rdf:li><rdf:Description mwg-rs:Type="{typ}">'
        f'<mwg-rs:Area stArea:y="{y}" stArea:w="{w}" stArea:x="{x}" stArea:h="{h}"'
        f' stArea:unit="normalized"/>'
        f"</rdf:Description></rdf:li>"
    )


def exif(orientation: int) -> bytes:
    """Kleinster EXIF-Block, der nur die Ausrichtung traegt."""
    ifd = struct.pack("<H", 1) + struct.pack("<HHIHH", 0x0112, 3, 1, orientation, 0)
    tiff = b"II" + struct.pack("<H", 42) + struct.pack("<I", 8) + ifd
    return b"\xff\xd8\xff\xe1\x00\x00" + b"Exif\x00\x00" + tiff


# ------------------------------------------------------------------ Lesen


def test_ohne_xmp_keine_gesichter():
    assert faces_from_bytes(b"\xff\xd8 nur bilddaten") == []


def test_ohne_regionen_keine_gesichter():
    assert faces_from_bytes(xmp("<rdf:RDF></rdf:RDF>")) == []


def test_ein_gesicht_wird_gelesen():
    gefunden = faces_from_bytes(xmp(region(0.4, 0.3, 0.08, 0.12)))

    assert gefunden == [FaceRegion(x=0.4, y=0.3, w=0.08, h=0.12)]


def test_mehrere_gesichter_in_ihrer_reihenfolge():
    gefunden = faces_from_bytes(xmp(region(0.2, 0.5) + region(0.8, 0.5)))

    assert [r.x for r in gefunden] == [0.2, 0.8]


def test_andere_bereiche_zaehlen_nicht():
    # Dieselbe Liste traegt auch Haustiere und Bildausschnitte.
    gefunden = faces_from_bytes(xmp(region(0.2, 0.5, typ="Pet") + region(0.8, 0.5)))

    assert [r.x for r in gefunden] == [0.8]


def test_andere_masseinheit_wird_uebergangen():
    inhalt = (
        '<rdf:li><rdf:Description mwg-rs:Type="Face">'
        '<mwg-rs:Area stArea:y="100" stArea:w="50" stArea:x="200" stArea:h="50"'
        ' stArea:unit="pixel"/>'
        "</rdf:Description></rdf:li>"
    )
    assert faces_from_bytes(xmp(inhalt)) == []


@pytest.mark.parametrize(
    "x,y",
    [(-0.1, 0.5), (1.5, 0.5), (0.5, -0.2), (0.5, 2.0)],
)
def test_werte_ausserhalb_des_bildes_werden_verworfen(x, y):
    assert faces_from_bytes(xmp(region(x, y))) == []


def test_bereich_ohne_ausdehnung_wird_verworfen():
    assert faces_from_bytes(xmp(region(0.5, 0.5, w=0, h=0.1))) == []


def test_kaputte_zahlen_lassen_den_rest_stehen():
    kaputt = (
        '<rdf:li><rdf:Description mwg-rs:Type="Face">'
        '<mwg-rs:Area stArea:y="oben" stArea:w="0.1" stArea:x="0.3" stArea:h="0.1"'
        ' stArea:unit="normalized"/></rdf:Description></rdf:li>'
    )
    gefunden = faces_from_bytes(xmp(kaputt + region(0.7, 0.7)))

    assert [r.x for r in gefunden] == [0.7]


def test_angewendete_masse():
    inhalt = '<mwg-rs:AppliedToDimensions stDim:h="3024" stDim:w="4032" stDim:unit="pixel"/>'
    assert applied_dimensions(xmp(inhalt)) == (4032, 3024)


def test_ohne_angewendete_masse():
    assert applied_dimensions(xmp(region(0.5, 0.5))) is None


# --------------------------------------------------------------- Drehung


def test_ohne_exif_gilt_ungedreht():
    assert exif_orientation(b"\xff\xd8 nichts") == 1


@pytest.mark.parametrize("wert", [1, 3, 6, 8])
def test_ausrichtung_wird_gelesen(wert):
    assert exif_orientation(exif(wert)) == wert


@pytest.mark.parametrize("wert", [0, 9, 42])
def test_unsinnige_ausrichtung_gilt_als_ungedreht(wert):
    assert exif_orientation(exif(wert)) == 1


def test_ausrichtung_eins_laesst_alles_stehen():
    daten = exif(1) + xmp(region(0.25, 0.75, 0.1, 0.2))

    assert faces_from_bytes(daten) == [FaceRegion(0.25, 0.75, 0.1, 0.2)]


def test_hochkant_dreht_das_gesicht_nach_oben():
    # Der Fall, um den es geht: hochkant aufgenommen, Kopf oben. Im
    # gespeicherten Querbild liegt er links mittig.
    daten = exif(6) + xmp(region(0.22, 0.50, 0.12, 0.09))

    gesicht = faces_from_bytes(daten)[0]

    assert gesicht.x == pytest.approx(0.50)
    assert gesicht.y == pytest.approx(0.22)
    # Beim Vierteldrehen tauschen Breite und Hoehe.
    assert (gesicht.w, gesicht.h) == pytest.approx((0.09, 0.12))


def test_hochkant_andersherum():
    daten = exif(8) + xmp(region(0.22, 0.50, 0.12, 0.09))

    gesicht = faces_from_bytes(daten)[0]

    assert gesicht.x == pytest.approx(0.50)
    assert gesicht.y == pytest.approx(0.78)


def test_kopfstand_dreht_beides():
    daten = exif(3) + xmp(region(0.25, 0.30))

    gesicht = faces_from_bytes(daten)[0]

    assert (gesicht.x, gesicht.y) == pytest.approx((0.75, 0.70))


@pytest.mark.parametrize("wert", [1, 2, 3, 4, 5, 6, 7, 8])
def test_jede_ausrichtung_bleibt_im_bild(wert):
    # Ein Gesicht ausserhalb des Bildes waere fuer den Ausschnitt wertlos.
    daten = exif(wert) + xmp(region(0.3, 0.8, 0.1, 0.2))

    gesicht = faces_from_bytes(daten)[0]

    assert 0.0 <= gesicht.x <= 1.0
    assert 0.0 <= gesicht.y <= 1.0


def test_zweimal_vierteldrehen_ergibt_die_halbe_drehung():
    # Prueft die Drehungen gegeneinander statt jede fuer sich.
    einmal = faces_from_bytes(exif(6) + xmp(region(0.3, 0.7)))[0]
    zurueck = faces_from_bytes(exif(6) + xmp(region(einmal.x, einmal.y)))[0]
    halb = faces_from_bytes(exif(3) + xmp(region(0.3, 0.7)))[0]

    assert (zurueck.x, zurueck.y) == pytest.approx((halb.x, halb.y))
