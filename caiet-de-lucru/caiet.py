#!/usr/bin/env python3
"""Caietul de lucru - unealta de lucru cu registrul de reguli.

Registrul unic este reguli.json. Documentele .md se GENEREAZA din el;
nu se editeaza de mana.

Utilizare:
    python3 caiet.py valideaza            verifica integritatea registrului
    python3 caiet.py genereaza            rescrie documentele .md din registru
    python3 caiet.py lista [CATEGORIE]    listeaza regulile (optional pe categorie)
    python3 caiet.py arata ID             afiseaza o regula completa
    python3 caiet.py cauta TERMEN         cauta in enunt, titlu si note
    python3 caiet.py noteaza ID "text"    adauga o observatie datata pe regula
    python3 caiet.py stare ID STARE       schimba starea unei reguli
"""
import json
import re
import sys
import unicodedata
from datetime import date
from pathlib import Path

BAZA = Path(__file__).resolve().parent
REGISTRU = BAZA / "reguli.json"

OBLIGATORII = ("id", "titlu", "categorie", "stare", "prioritate", "enunt",
               "implementare", "verificare", "note")


def fara_diacritice(text):
    """Normalizeaza textul ca sa se poata cauta si fara diacritice."""
    desfacut = unicodedata.normalize("NFD", text.lower())
    return "".join(c for c in desfacut if unicodedata.category(c) != "Mn")


def incarca():
    return json.loads(REGISTRU.read_text(encoding="utf-8"))


def salveaza(d):
    REGISTRU.write_text(
        json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def gaseste(d, rid):
    for r in d["reguli"]:
        if r["id"].upper() == rid.upper():
            return r
    return None


# ---------------------------------------------------------------- valideaza
def valideaza(d):
    erori = []
    vazute = set()
    ids = {r.get("id") for r in d["reguli"]}
    for r in d["reguli"]:
        rid = r.get("id", "<fara id>")
        for camp in OBLIGATORII:
            if camp not in r:
                erori.append(f"{rid}: lipseste campul obligatoriu '{camp}'")
        if not re.fullmatch(r"(MNT|CALC|PRET|ACC|CAT|OFR)-\d{3}", rid):
            erori.append(f"{rid}: identificator neconform (CATEGORIE-000)")
        elif rid.split("-")[0] != r.get("categorie"):
            erori.append(f"{rid}: prefixul nu corespunde categoriei "
                         f"'{r.get('categorie')}'")
        if rid in vazute:
            erori.append(f"{rid}: identificator dublat")
        vazute.add(rid)
        if r.get("stare") not in d["stari"]:
            erori.append(f"{rid}: stare necunoscuta '{r.get('stare')}'")
        if r.get("prioritate") not in d["prioritati"]:
            erori.append(f"{rid}: prioritate necunoscuta '{r.get('prioritate')}'")
        impl = r.get("implementare", {})
        if impl.get("stare") not in d["implementare"]:
            erori.append(f"{rid}: stare de implementare necunoscuta "
                         f"'{impl.get('stare')}'")
        # trimiterile catre alte reguli trebuie sa existe
        text = " ".join(str(v) for v in r.values())
        for trimitere in re.findall(r"\b(?:MNT|CALC|PRET|ACC|CAT|OFR)-\d{3}\b", text):
            if trimitere != rid and trimitere not in ids:
                erori.append(f"{rid}: trimite la regula inexistenta {trimitere}")
        # o regula blocanta neimplementata trebuie sa spuna cum se aplica manual
        if (r.get("prioritate") == "blocanta"
                and impl.get("stare") == "neimplementata"
                and not impl.get("referinta")):
            erori.append(f"{rid}: regula blocanta neimplementata fara referinta")
    return erori


# ---------------------------------------------------------------- genereaza
def _randeaza(r):
    o = [f"### {r['id']} — {r['titlu']}", ""]
    o.append(f"**Stare:** {r['stare']} · **Prioritate:** {r['prioritate']} · "
             f"**În aplicație:** {r['implementare']['stare']}")
    o += ["", r["enunt"], ""]
    if r.get("formula"):
        o += ["```", r["formula"], "```", ""]
    if r.get("parametri"):
        o.append("| Parametru | Descriere | Valoare | UM | Sursă |")
        o.append("|---|---|---|---|---|")
        for p in r["parametri"]:
            o.append("| `{}` | {} | {} | {} | {} |".format(
                p.get("nume", ""), p.get("descriere", "—"),
                p.get("valoare", "—"), p.get("um", "—"), p.get("sursa", "—")))
        o.append("")
    if r.get("conditii"):
        o += ["**Condiții:** " + "; ".join(r["conditii"]), ""]
    if r.get("exceptii"):
        o += ["**Excepții:** " + "; ".join(r["exceptii"]), ""]
    if r.get("exemplu"):
        o += [f"**Exemplu:** {r['exemplu']}", ""]
    o += [f"**Verificare:** {r['verificare']}", ""]
    if r["implementare"].get("referinta"):
        o += [f"**Referință:** `{r['implementare']['referinta']}`", ""]
    if r.get("note"):
        o += [f"**Note:** {r['note']}", ""]
    return "\n".join(o)


ANTET = ("<!-- GENERAT AUTOMAT din reguli.json — nu edita manual. "
         "Rulează: python3 caiet.py genereaza -->\n")


def genereaza(d):
    scrise = []
    grupuri = {
        "legile-montajului.md": (
            ["MNT"], "Legile montajului",
            "Reguli fizice de execuție. Se aplică pe șantier și se verifică la "
            "recepție. Orice abatere se notează în fișa de șantier cu "
            "identificatorul regulii."),
        "reguli-de-calcul.md": (
            ["CALC", "PRET", "ACC"], "Reguli de calcul, preț și accesorii",
            "Reguli care produc cifre. Se aplică la ofertare și trebuie să dea "
            "același rezultat indiferent cine calculează."),
        "reguli-de-ofertare.md": (
            ["CAT", "OFR"], "Reguli de catalog și ofertare",
            "Reguli care decid ce se poate oferta și cum arată documentul "
            "trimis clientului."),
    }
    for fisier, (categorii, titlu, intro) in grupuri.items():
        reguli = [r for r in d["reguli"] if r["categorie"] in categorii]
        out = [ANTET, f"# {titlu}", "",
               f"Registru versiunea {d['versiune']} · actualizat {d['actualizat']} · "
               f"{len(reguli)} reguli", "", intro, ""]
        for cat in categorii:
            din_cat = [r for r in reguli if r["categorie"] == cat]
            if len(categorii) > 1:
                out += [f"## {cat} — {d['nomenclator'][cat]}", ""]
            for r in sorted(din_cat, key=lambda x: x["id"]):
                out += [_randeaza(r), "---", ""]
        (BAZA / fisier).write_text("\n".join(out), encoding="utf-8")
        scrise.append(fisier)

    # index
    out = [ANTET, "# Index reguli", "",
           f"Registru versiunea {d['versiune']} · {len(d['reguli'])} reguli", "",
           "| ID | Titlu | Stare | Prioritate | În aplicație |", "|---|---|---|---|---|"]
    for r in sorted(d["reguli"], key=lambda x: x["id"]):
        out.append("| {} | {} | {} | {} | {} |".format(
            r["id"], r["titlu"], r["stare"], r["prioritate"],
            r["implementare"]["stare"]))
    (BAZA / "INDEX.md").write_text("\n".join(out) + "\n", encoding="utf-8")
    scrise.append("INDEX.md")

    # abateri: reguli active care nu sunt acoperite de motorul de calcul
    lipsa = [r for r in d["reguli"]
             if r["stare"] == "activa"
             and r["implementare"]["stare"] != "implementata"]
    propuse = [r for r in d["reguli"] if r["stare"] in ("propusa", "de-confirmat")]
    out = [ANTET, "# Abateri și lucruri de decis", "",
           "Generat din registru. Prima listă = reguli **active** pe care "
           "aplicația nu le acoperă, deci se aplică manual. A doua listă = "
           "reguli care așteaptă o decizie.", "",
           f"## Reguli active neacoperite de aplicație ({len(lipsa)})", ""]
    for r in sorted(lipsa, key=lambda x: x["id"]):
        out.append(f"- **{r['id']}** ({r['implementare']['stare']}) — {r['titlu']}  ")
        out.append(f"  {r['implementare'].get('referinta', '—')}")
    out += ["", f"## Reguli care așteaptă decizie ({len(propuse)})", ""]
    for r in sorted(propuse, key=lambda x: x["id"]):
        out.append(f"- **{r['id']}** ({r['stare']}) — {r['titlu']}")
        if r.get("note"):
            out.append(f"  - {r['note']}")
    (BAZA / "abateri.md").write_text("\n".join(out) + "\n", encoding="utf-8")
    scrise.append("abateri.md")
    return scrise


# ---------------------------------------------------------------- comenzi
def main(argv):
    if len(argv) < 2 or argv[1] in ("-h", "--help", "ajutor"):
        print(__doc__)
        return 0
    cmd = argv[1]
    d = incarca()

    if cmd == "valideaza":
        erori = valideaza(d)
        for e in erori:
            print("EROARE:", e)
        print(f"{len(d['reguli'])} reguli verificate, {len(erori)} erori.")
        return 1 if erori else 0

    if cmd == "genereaza":
        erori = valideaza(d)
        if erori:
            print("Registrul are erori; rulează întâi 'valideaza'.")
            return 1
        for f in genereaza(d):
            print("scris:", f)
        return 0

    if cmd == "lista":
        cat = argv[2].upper() if len(argv) > 2 else None
        for r in sorted(d["reguli"], key=lambda x: x["id"]):
            if cat and r["categorie"] != cat:
                continue
            print(f"{r['id']:9} [{r['stare']:12}] {r['titlu']}")
        return 0

    if cmd == "arata":
        r = gaseste(d, argv[2])
        if not r:
            print("Regulă inexistentă:", argv[2])
            return 1
        print(_randeaza(r))
        return 0

    if cmd == "cauta":
        termen = fara_diacritice(" ".join(argv[2:]))
        gasite = [r for r in d["reguli"]
                  if termen in fara_diacritice(json.dumps(r, ensure_ascii=False))]
        for r in sorted(gasite, key=lambda x: x["id"]):
            print(f"{r['id']:9} {r['titlu']}")
        print(f"-- {len(gasite)} rezultate")
        return 0

    if cmd == "noteaza":
        r = gaseste(d, argv[2])
        if not r:
            print("Regulă inexistentă:", argv[2])
            return 1
        text = " ".join(argv[3:])
        if not text:
            print("Lipsește textul notei.")
            return 1
        nota = f"[{date.today().isoformat()}] {text}"
        r["note"] = (r["note"] + " | " + nota) if r.get("note") else nota
        salveaza(d)
        print(f"{r['id']}: notă adăugată.")
        return 0

    if cmd == "stare":
        r = gaseste(d, argv[2])
        if not r:
            print("Regulă inexistentă:", argv[2])
            return 1
        noua = argv[3]
        if noua not in d["stari"]:
            print("Stări permise:", ", ".join(d["stari"]))
            return 1
        veche, r["stare"] = r["stare"], noua
        nota = f"[{date.today().isoformat()}] stare {veche} -> {noua}"
        r["note"] = (r["note"] + " | " + nota) if r.get("note") else nota
        salveaza(d)
        print(f"{r['id']}: {veche} -> {noua}")
        return 0

    print("Comandă necunoscută:", cmd)
    print(__doc__)
    return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv))
