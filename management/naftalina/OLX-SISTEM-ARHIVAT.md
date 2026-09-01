# OLX — sistem complet, pus la naftalină (arhivat 01.09.2026)

Infrastructura OLX a fost proiectată bine, dar s-a autoblocat logic (vezi §1). Tabelele Airtable
și scenariile Make au fost șterse pe 01.09.2026 pentru a curăța baza. **Documentul acesta conține
tot ce trebuie ca sistemul să fie reconstruit identic, cu defectul reparat, când momentul e potrivit.**
Datele brute (25 orașe, 4 categorii, 44 anunțuri, 7 analize) sunt în backup-ul
`airtable-backup-2026-09-01.tar.gz`.

---

## 1. DE CE A MURIT — cauza exactă, o singură linie

Scenariul `OLX_S1_Analiza_Concurenta` interoga:

```
GET https://www.olx.ro/api/v1/offers/?offset=0&limit=1&query={Categorie} {Oras}
```

și citea `data.metadata.total_elements` ca „număr de concurenți".

**Defectul:** interogarea e text liber, **fără `city_id` și `category_id`** — deși ambele erau
stocate în tabele (`OLX_City_ID`, `OLX_Category_ID`). Deci `total_elements` returna totalul pe
toată țara pentru acel text (plafonat de OLX la ~1000), nu concurenții din orașul respectiv.

Pragurile erau calibrate pentru un număr local:
- sub 15 → VERDE (postează)
- 15–40 → GALBEN (postează cu „OFERTĂ LIMITATĂ")
- peste 40 → ROȘU (skip)

Primind mereu 205–1000, verdictul a fost **ROȘU de fiecare dată**. Sistemul refuza singur să
posteze. Din 44 de anunțuri planificate: **4 postate, 33 blocate în PLANIFICAT, 5 respinse ca
SKIP_ROSU, 2 aprobate**. Toate cele 7 analize zilnice: `ROSU_peste40`.

**Reparația la reluare:** folosește parametrii de filtrare ai API-ului OLX (`category_id`,
`city_id` / `region_id`) în loc de `query` text liber, apoi **recalibrează pragurile** pe numere
reale măsurate în 2–3 orașe înainte de a porni automatizarea.

---

## 2. SCHEMA AIRTABLE (5 tabele)

### OLX_Orase — catalogul de orașe țintă
`Oras` (text) · `Judet` (text) · `Tip` (select: REGIONAL | NATIONAL) · `Distanta_Pitesti_km` (number) ·
`Status` (select: ACTIV | REZERVA | INACTIV) · `Populatie_aprox` (number) ·
`Ultima_poza_sipca` / `Ultima_poza_jaluzea` / `Ultima_poza_tabla` / `Ultima_poza_porti` (text) ·
`Note` (multiline) · `OLX_City_ID` (number)

### OLX_Categorii — produsele și șabloanele de titlu
`Categorie` (text) · `Folder_OneDrive` (text) · `Titlu_T11_Verde` (multiline) · `Titlu_T11_Galben` (multiline) ·
`Tip_Distributie` (select: NATIONAL | REGIONAL_150KM) · `Status` (select: ACTIV | INACTIV) ·
`Budget_Lunar_Anunturi` (number) · `Nr_Anunturi_Actuale` (number) · `Note` (multiline) ·
`OLX_Category_ID` (number) · `Imagini_CDN` (multiline) · `Imagine_Principala` (text)

### OLX_Anunturi_Planificate — coada de postare
`ID_Anunt` · `Data_Planificata` (date) · `Sesiune` (DIMINEATA | SEARA) · `Oras` · `Categorie` (tabla | jaluzea | sipca | porti | Acoperisuri) ·
`Titlu` · `Status` (PLANIFICAT | APROBAT | POSTAT | SKIP_ROSU | EXPIRAT | DE_POSTAT) ·
`Decizie_Analiza` (VERDE | GALBEN | ROSU) · `Nr_Concurenti_OLX` (number) · `Poza_Selectata` · `OLX_ID` ·
`Boost_Recomandat` (NU | DA_VERIFICAT) · `Saptamana` (number) · `Descriere_Anunt` (multiline) ·
`OLX_City_ID` · `OLX_Category_ID` · `Imagine_URL` (url) · `Pret_RON` (currency) ·
`Unitate_Pret` (RON/ml | RON/mp | RON/buc | RON/set) · `Data_Postare` · `Data_Expirare` ·
`OLX_Status_Live` (active | limited | removed | expired | pending) · `Nr_Repostari` (number)

### OLX_Analiza_Zilnica — jurnalul deciziilor
`ID_Analiza` · `Data` · `Sesiune` · `Oras` · `Categorie` · `Nr_Concurenti` (number) ·
`Decizie` (VERDE_sub15 | GALBEN_15_40 | ROSU_peste40) · `Titlu_Ales` · `Oras_Inlocuitor` · `Note`

### OLX_Performanta — evaluarea la 7 zile (a rămas GOALĂ, 0 rânduri)
`OLX_ID` · `Data_Postare` · `Data_Evaluare_7zile` · `Oras` · `Categorie` · `Titlu` ·
`Views_Total` · `Saves_Total` · `Telefoane` (number) · `Scor_Manual` (number) ·
`Decizie_7zile` (SCALA | MENTINE | STERGE_INLOCUIESTE | BOOST) · `Cost_RON` ·
`Lead_Generat` (NU | DA_APEL | DA_OFERTA) · `Note`

Niciunul dintre cele 5 tabele nu avea legături cu restul bazei — de aceea ștergerea nu a rupt nimic.

---

## 3. DATELE DE REFERINȚĂ

### Cele 4 categorii (cu ID-urile OLX reale și bugetul lunar)

| Categorie | OLX_Category_ID | Distribuție | Buget/lună | Folder poze |
|---|---|---|---|---|
| sipca | 2888 | NATIONAL | 40 | `poze olx\sipca` |
| porti | 2888 | REGIONAL_150KM | 20 | `poze olx\porti` |
| jaluzea | 3182 | NATIONAL | 40 | `poze olx\jaluzea` |
| tabla | 2907 | REGIONAL_150KM | 30 | `poze olx\tabla` |

### Șabloanele de titlu (`{oras}` se înlocuiește; varianta GALBEN adaugă „(OFERTĂ LIMITATĂ)")

- **sipca:** `Șipcă metalică {oras} — fără întreținere 20 ani — 24 culori — rate`
- **porti:** `Poartă metalică {oras} — livrare + montaj — garantat 10 ani — rate`
- **jaluzea:** `Gard jaluzea {oras} — intimitate totală — 24 culori — rate TBI`
- **tabla:** `Tablă Bilka {oras} 0.50 mm — garanție 30 ani — rate fără dobândă`

### Descrierea standard generată automat
`{Titlu} - materiale premium - montaj profesional inclus - oferta gratuita la domiciliu - rate TBI fara avans - Invest Tetto Construct`

### Cele 25 de orașe (cu OLX_City_ID real — datele cele mai greu de refăcut)

| Oraș | Județ | km | Populație | OLX_City_ID |
|---|---|---|---|---|
| Pitești | Argeș | 0 | 155.000 | 60321 |
| Curtea de Argeș | Argeș | 35 | 30.000 | 60035 |
| Câmpulung Muscel | Argeș | 58 | 33.000 | 59829 |
| Slatina | Olt | 80 | 70.000 | 60305 |
| Câmpina | Prahova | 80 | 35.000 | 66239 |
| Târgoviște | Dâmbovița | 90 | 90.000 | 96923 |
| Rm. Vâlcea | Vâlcea | 100 | 107.000 | 89649 |
| Ploiești | Prahova | 110 | 210.000 | 66613 |
| București | Ilfov | 115 | 1.800.000 | 1 |
| Alexandria | Teleorman | 120 | 45.000 | 69235 |
| Oltenița | Călărași | 130 | 25.000 | 62647 |
| Giurgiu | Giurgiu | 140 | 60.000 | 64249 |
| Craiova | Dolj | 145 | 270.000 | 81351 |
| Brașov | Brașov | 170 | 250.000 | 26711 |
| Buzău | Buzău | 180 | 115.000 | 72473 |
| Sibiu | Sibiu | 220 | 150.000 | 33555 |
| Drobeta | Mehedinți | 220 | 80.000 | 85981 |
| Constanța | Constanța | 290 | 280.000 | 74335 |
| Tg. Mureș | Mureș | 340 | 150.000 | 30987 |
| Galați | Galați | 380 | 250.000 | 96583 |
| Bacău | Bacău | 380 | 140.000 | 34959 |
| Cluj | Cluj | 450 | 320.000 | 52953 |
| Iași | Iași | 500 | 370.000 | 39939 |
| Oradea | Bihor | 540 | 220.000 | 49313 |
| Timișoara | Timiș | 560 | 320.000 | 97487 |

Regula de distribuție: categoriile REGIONAL_150KM (porti, tabla) doar în orașele sub 150 km;
NATIONAL (sipca, jaluzea) oriunde.

---

## 4. SCENARIILE MAKE (8, șterse pe 01.09.2026)

| Scenariu | Programare | Ce făcea |
|---|---|---|
| `OLX_S1_Analiza_Concurenta` | zilnic | căuta anunțuri PLANIFICAT cu data de azi → interoga OLX → scria decizia (VERDE/GALBEN/ROȘU) și statusul (APROBAT/SKIP_ROSU) → rând în OLX_Analiza_Zilnica → raport Telegram. **Aici era defectul.** |
| `OLX_S2_Postare_Dimineata` | zilnic | posta anunțurile APROBAT din sesiunea DIMINEATA |
| `OLX_S3_Postare_Seara` | zilnic | idem, sesiunea SEARA |
| `OLX_S4_Raport_Zilnic` | zilnic | număra postările de ieri + cele active → raport Telegram cu pragurile de scor (>100 SCALA, 30–100 MENȚINE, <30 ȘTERGE) și țintele lunare (min 15 apeluri, cost/lead sub 50 RON) |
| `OLX_AUTO_Dimineata` / `OLX_AUTO_Seara` | la 60 s (!) | variante HTTP directe de auto-postare |
| `S0 — OLX Auto-Post FINAL` (×2, duplicate) | webhook | postare prin webhook; ambele marcate `invalid` |

Trei dintre ele erau marcate `isinvalid` de Make. Toate aveau **0 execuții**.

### Logica de decizie (de păstrat la reluare, cu praguri recalibrate)
```
concurenti < 15   → VERDE   → Status = APROBAT,   titlu normal
15 ≤ concurenti ≤ 40 → GALBEN → Status = APROBAT,   titlu + "(OFERTĂ LIMITATĂ)"
concurenti > 40   → ROȘU    → Status = SKIP_ROSU, nu se postează
```

### Evaluarea la 7 zile (proiectată, niciodată rulată — OLX_Performanta a rămas goală)
`Scor > 100 = SCALA · 30–100 = MENȚINE · sub 30 = ȘTERGE_ÎNLOCUIEȘTE · BOOST la performanță mare`
Țintă lunară declarată: minim 15 apeluri, cost pe lead sub 50 RON.

---

## 5. LECȚIILE (valabile pentru orice sistem viitor, nu doar OLX)

1. **Un prag nevalidat pe date reale poate bloca tot sistemul, fără nicio eroare.** Nimic nu a
   „crăpat": scenariile rulau, scriau în Airtable, trimiteau rapoarte pe Telegram — și refuzau
   să posteze. Măsoară întâi realitatea, apoi calibrează pragul.
2. **Dacă ai un ID, folosește ID-ul.** `OLX_City_ID` și `OLX_Category_ID` erau completate corect
   pentru toate cele 25 de orașe și 4 categorii, dar interogarea folosea text liber.
3. **Un sistem care nu produce rezultatul așteptat în prima săptămână trebuie oprit sau reparat,
   nu lăsat să ruleze.** 44 de anunțuri au stat blocate 5 luni fără ca cineva să întrebe de ce.
4. **Securitate:** blueprint-urile Make conțineau tokenul Airtable în clar, în antetul HTTP.
   La reluare, tokenul se pune în conexiunea Make, niciodată în corpul cererii.

---

## 6. CUM SE RELUĂ (ordinea)

1. Măsoară manual, în 3 orașe × 2 categorii, câți concurenți reali există (cu `city_id` +
   `category_id` în API-ul OLX). Notează cifrele.
2. Recalibrează pragurile VERDE/GALBEN/ROȘU pe cifrele măsurate.
3. Recreează cele 5 tabele din §2 și repopulează din backup (§3 conține datele critice).
4. Reconstruiește S1 cu interogarea corectă; rulează-l **o săptămână fără postare automată**,
   doar cu raport, ca să confirmi că deciziile au sens.
5. Abia apoi activează postarea, cu un buget lunar (§3) și cu evaluarea la 7 zile pornită
   din prima zi — altfel OLX_Performanta rămâne goală și a doua oară.
