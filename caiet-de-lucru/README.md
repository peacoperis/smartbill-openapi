# Caietul de lucru — reguli, legile montajului și reguli de calcul

Locul unic în care se scriu regulile după care se măsoară, se calculează, se
ofertează și se montează șipca metalică. Scopul caietului este ca **orice
regulă să poată fi identificată printr-un cod, citată într-o discuție și
notată cu observații din teren**.

## Fișiere

| Fișier | Ce conține | Se editează manual? |
|---|---|---|
| `reguli.json` | **Registrul unic.** Sursa de adevăr pentru toate regulile. | Da — prin `caiet.py` sau direct |
| `caiet.py` | Unealta: validare, generare, căutare, notare | Da |
| `INDEX.md` | Tabelul tuturor regulilor | Nu — generat |
| `legile-montajului.md` | Regulile MNT, pentru șantier | Nu — generat |
| `reguli-de-calcul.md` | Regulile CALC, PRET, ACC | Nu — generat |
| `reguli-de-ofertare.md` | Regulile CAT, OFR | Nu — generat |
| `abateri.md` | Ce nu acoperă aplicația + ce așteaptă decizie | Nu — generat |
| `fisa-santier.md` | Formular de completat la măsurătoare și la montaj | Se tipărește |

Documentele `.md` generate se rescriu integral la fiecare `genereaza`. Orice
modificare se face în `reguli.json`, altfel se pierde.

## Cum se identifică o regulă

Fiecare regulă are un cod `CATEGORIE-NNN`, unic și definitiv. Codul nu se
reutilizează niciodată: o regulă scoasă din uz trece în starea `retrasa`, dar
codul rămâne ocupat, ca trimiterile vechi din oferte și procese-verbale să
rămână valide.

| Prefix | Categorie | Unde se aplică |
|---|---|---|
| `MNT` | Legile montajului | Pe șantier, la execuție și recepție |
| `CALC` | Reguli de calcul | La dimensionare și antemăsurătoare |
| `PRET` | Reguli de preț | La marje, curs valutar, TVA |
| `ACC` | Accesorii și consumabile | La deviz |
| `CAT` | Catalog și disponibilitate | La configurare |
| `OFR` | Ofertare | La documentul trimis clientului |

### Starea unei reguli

| Stare | Înseamnă |
|---|---|
| `activa` | Confirmată, se aplică obligatoriu |
| `propusa` | Nouă, așteaptă validarea coordonatorului |
| `de-confirmat` | Valoarea numerică trebuie confirmată cu furnizorul sau montatorul |
| `retrasa` | Nu se mai aplică; se păstrează pentru istoric |

### Prioritatea

| Prioritate | Înseamnă |
|---|---|
| `blocanta` | Nu se emite oferta / nu se montează dacă regula e încălcată |
| `importanta` | Încălcarea produce cost sau reclamație; se notează obligatoriu |
| `informativa` | Bună practică, se recomandă |

### În aplicație

Arată dacă motorul din `calculator_sipca_v22_enterprise.html` aplică regula:
`implementata`, `partiala` sau `neimplementata`. Tot ce nu e `implementata` și
e `activa` apare automat în `abateri.md` și **se aplică manual**.

## Cum se notează

Observațiile din teren se atașează pe regula la care se referă, datate:

```bash
python3 caiet.py noteaza MNT-005 "La Popescu, rigle la 1.40 m - șipca a jucat. Confirmat pas max 1.20."
```

Nota se adaugă în `reguli.json`, în câmpul `note`, cu data zilei. Nu se șterg
note vechi — se adaugă unele noi.

Schimbarea stării se face tot cu unealta, ca să rămână urma în note:

```bash
python3 caiet.py stare MNT-003 activa
```

## Cum se adaugă o regulă nouă

1. Alege prefixul de categorie și **următorul număr liber** din acea categorie
   (`python3 caiet.py lista MNT`).
2. Adaugă obiectul în `reguli.json` cu toate câmpurile obligatorii: `id`,
   `titlu`, `categorie`, `stare`, `prioritate`, `enunt`, `implementare`,
   `verificare`, `note`.
3. Pornește de la starea `propusa` sau `de-confirmat`. O regulă nu intră
   direct `activa` decât dacă doar consemnează ce se face deja.
4. Scrie la `verificare` **cum se dovedește** că regula e respectată. O regulă
   pe care nu o poți verifica nu e regulă, e o părere.
5. Rulează `python3 caiet.py valideaza` și apoi `python3 caiet.py genereaza`.
6. Ridică `versiune` în `reguli.json` și actualizează `actualizat`.

### Șablon

`MNT-017` de mai jos este doar exemplu — pune primul cod liber din categoria ta.

```json
{
  "id": "MNT-017",
  "titlu": "Enunț scurt, la imperativ sau constatativ",
  "categorie": "MNT",
  "stare": "propusa",
  "prioritate": "importanta",
  "enunt": "Formularea completă, fără ambiguități, cu valorile numerice explicite.",
  "formula": "optional - expresia de calcul",
  "parametri": [{ "nume": "x", "descriere": "...", "valoare": 0, "um": "mm", "sursa": "..." }],
  "conditii": ["optional"],
  "exceptii": ["optional"],
  "implementare": { "stare": "neimplementata", "referinta": "fisier:linie sau motivul" },
  "exemplu": "optional - un caz numeric complet",
  "verificare": "Cum se dovedește pe teren sau în aplicație.",
  "note": ""
}
```

## Comenzi

```bash
python3 caiet.py valideaza          # coduri unice, câmpuri, trimiteri valide
python3 caiet.py genereaza          # rescrie documentele .md
python3 caiet.py lista CALC         # regulile dintr-o categorie
python3 caiet.py arata MNT-005      # o regulă completă
python3 caiet.py cauta interspatiu  # caută în tot registrul
python3 caiet.py noteaza ID "text"  # adaugă observație datată
python3 caiet.py stare ID activa    # schimbă starea
```

`valideaza` verifică: coduri unice și conforme, prefix potrivit cu categoria,
stări și priorități permise, câmpuri obligatorii prezente, trimiteri către
reguli care chiar există.

## Reguli de disciplină a caietului

1. **O regulă, un cod.** Dacă enunțul are două afirmații care se pot încălca
   separat, sunt două reguli.
2. **Valorile numerice se scriu în regulă**, nu în cap. "Distanță rezonabilă"
   nu e regulă; "minim 50 mm" este.
3. **Fiecare regulă spune cum se verifică.**
4. **Ce nu e în aplicație se aplică manual** și apare în `abateri.md`.
5. **Observațiile de pe șantier se notează pe regulă**, nu în mesaje separate.
   La 3 observații care contrazic o valoare, regula se rediscută.
6. **Nimic nu se șterge.** Se trece în `retrasa`.
