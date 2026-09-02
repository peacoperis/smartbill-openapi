# Inventarul bazei Airtable — ce e fiecare tabel

Baza „test #" (`appdbikkM2awYhpoM`). Analiză la 02.09.2026.

Metoda: pentru fiecare tabel am numărat rândurile, **în câte zile distincte au fost create**
înregistrările, ce câmpuri sunt efectiv completate, ce legături are, și cine îl folosește
(scenarii Make + automatizări Airtable).

**Tiparul care descoperă totul:** un tabel ale cărui înregistrări au fost create toate în aceeași zi
și niciodată după = tabel importat o dată și abandonat. Șapte din cele 15 arătau exact așa.

---

## Vii — folosite efectiv

| Tabel | Rânduri | Ce e | Dovada |
|---|---|---|---|
| `Ofertare` | 514 | **Sursa de adevăr.** Ofertele și comenzile | 140 de zile distincte, ultima 01.09.2026 |
| `Facturare` | 305 | Facturile furnizorilor + motorul de sold/paleți | 67 de zile, ultima 04.08.2026 |
| `Ponou Control` | 54 | **Catalogul de produse** (Șipcă Sofia, T 35 Bilka, Folie Bilka, Sistem complet Wetterbest). Alimentează „Tip Materiale Comandă" din Ofertare | 42 de zile, ultima 27.08.2026 |
| `Furnizori` | 9 | Hubul de solduri și paleți | activ din 02.09.2026 |
| `Jurnal Antonia` | 1 | Dovezile zilnice | gol — e în concediu |

`Ponou Control` = de fapt „Produse". Numele e o scăpare de tastare, de-asta nu-ți spunea nimic.

## Importate o dată, apoi abandonate — dar cu date reale

| Tabel | Rânduri | Ce e | A murit la |
|---|---|---|---|
| `Plăți Furnizori` | 346 | Extras bancar ian.2025 – 23.03.2026. Devine jurnalul de plăți | toate create 24.03.2026 |
| `Cheltuieli Operaționale` | 308 | Extras de card recategorisit **greșit**: „Altele" 102, fără GPL/Benzină, `Mașină` 0/308, `Cantitate` 0/308 | 24.03.2026 |
| `Încasări Clienți` | 128 | Încasări din SmartBill (facturi FFITC), legate de Ofertare | **11.07.2026 — sarcină a Antoniei, lăsată moartă** |
| `Clienți` | 72 | Clienți cu CNP/CUI, telefon, sursă | 24.03.2026 |

## Șterse la 02.09.2026 (documentate în `naftalina/TABELE-ARHIVATE.md`)

| Tabel | Rânduri | De ce |
|---|---|---|
| `Loturi Paleți Primiți` | 1, gol | Model FIFO lot→retur care nu seamănă cu practica. Create 04.05, abandonate 05.05.2026 |
| `Retururi Paleți` | 0 | idem |
| `Alocări Paleți` | 1, gol | idem |
| `Inbox Storno` | 12 | A rulat o zi. Toate blocate în „⏸️ În procesare", 0 legate. Din 12 rânduri, doar 8 numere unice |

Baza: **15 → 11 tabele.**

## Rămân de decis

### `⚠️ SANDBOX — Ofertare` (243 rânduri)

Intenția — un loc de teste — e corectă. Implementarea e problema:

1. **Nu e izolat.** Șapte tabele vii aveau fiecare câte un câmp „Ofertare copy" care arată **spre** el.
   Când testezi acolo, atingi producția. Un sandbox legat de producție nu e sandbox.
2. **E vechi:** 243 de rânduri față de 514, ultima atingere 08.07.2026.
3. **Sparge convenția ITC-:** numerotarea lui automată se suprapune cu cea din Ofertare, deci codurile
   `ITC-nnn` nu mai sunt unice în bază — exact cheia pe care se sprijină reconcilierea bancară.
4. Din 127 de telefoane, **unul singur** e unic. Restul sunt duplicate. Nu conține informație nouă.

**Alternativa corectă:** duplicarea întregii baze (un clic în Airtable). Aia e izolată cu adevărat,
o arunci și o refaci oricând.

### `Persoane` (307 rânduri)

Legat **doar** de SANDBOX. Aproximativ 40% din rânduri nu sunt persoane, ci etichete de ofertă
(„Oferta Jaluzele TPS (Marian)", „Cristi colaborator (Soare Marius Adrian)"). Dacă SANDBOX dispare,
rămâne complet orfan. Ideea utilă de păstrat: normalizarea telefonului.

Numele real al clientului stă oricum în `Ofertare.Nume Beneficiar` (514/514 completate). Și `Clienți`,
și `Persoane` sunt tabele secundare.

---

## Ofertare — auditul celor 84 de câmpuri

25 nu au fost completate niciodată. **Dar șase sunt schela motoarelor viitoare, iar unul e folosit
chiar acum** — o ștergere în bloc ar fi rupt alerta de livrare și raportul de seară.

| Câmp | Verdict |
|---|---|
| `Factura_Furnizor_OK` | **NU se atinge** — îl folosesc PUNTE 1 (alerta instant) și PUNTE 3 (raportul de seară) |
| `Avans_Confirmat`, `Factura_Client_OK`, `ID_Proforma_SmartBill`, `Valoare_Oferta_EUR`, `Curs_BNR` | se păstrează — schela motoarelor A / C / D2 |
| `% Comision Colaborator`, `Mod Plata Colaborator`, `Data Plata Colaborator`, `plati colaboratori` | candidat — blocul colaborator, 0 completări |
| `Ore Estimate`, `RON/Oră` | candidat — pontaj nepornit |
| `Email Client`, `Nr Reg Com`, `📸 Scan Buletin / CUI`, `📝 Date Facturare Text`, `Proformă Generată` | candidat — date de facturare niciodată completate |
| `Ultima Notificare Plată`, `Data Promisă Plată` | candidat — escaladarea încasărilor, nepornită |
| `Data Livrare`, `📂 Verificare Storno`, `Comanda acceptata`, `Motiv Completare / Rework` | de verificat individual în scenarii |
| linkuri `Plăți Furnizori`, `Cheltuieli Operaționale` | candidat — 0 folosiri |

## Limită tehnică descoperită

**API-ul Airtable nu poate șterge câmpuri** — doar crea și redenumi. La fel, nu poate șterge o
automatizare pornită, și nu poate crea view-uri. Astea rămân clicuri în interfață.

De asemenea, când se șterge un tabel, Airtable **nu șterge** câmpurile-legătură care arătau spre el —
le convertește în text. Au rămas astfel 4 coloane moarte în `Facturare`, pe care le-am redenumit
`🗑️ STERGE - ...` cu explicația în descriere, ca să fie găsite și șterse din interfață.

## Automatizări (5)

| Automatizare | Stare | Verdict |
|---|---|---|
| `Automation 1` | pornită | Ingestia AI a facturilor scanate în `Facturare`. Se păstrează |
| `Automation 2` | pornită, dar declanșator programat **o singură dată la 23.03.2026** | Moartă. A tras acum 5 luni, nu mai pornește niciodată. **De oprit din interfață, apoi se poate șterge** |
| `F2.3 SmartBill Motor` | pornită | Emite facturile. Se păstrează |
| `F2.6 Bilka AI → Ofertare` | nepornită | De evaluat separat |
| `PUNTE — Livrare mâine` | **nepornită** | Alerta instant nu există până nu apeși deploy |

## Make — 14 scenarii, din care 10 cu 0 execuții vreodată

Active și funcționale: cele 4 PUNTE.

Se păstrează: `Integration Email, Text parser, Airtable` — parserul de mail Bilka, baza motorului de
ingestie a facturilor.

Candidate la ștergere (0 execuții de la creare): `C 2026`, `Integration Airtable`, `Integration Email`,
`Integration HTTP`, `Integration Telegram Bot` ×2, `Leaduri peacoperis`, `secenariu smslink`,
`YouTube → Tetto_Second_Brain [DRAFT]`. Cele două „Integration Telegram Bot" au webhook-uri
înregistrate pe boți (3381399 și 3688827) — se elimină odată cu scenariile.
