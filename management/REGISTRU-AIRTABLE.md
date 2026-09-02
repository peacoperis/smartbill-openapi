# Registrul de furnizori în Airtable — sold, paleți, storno

Mutarea mecanismului din `Registru_5.xlsx` în baza „test #" (`appdbikkM2awYhpoM`).
Starea la 02.09.2026: **Faza 0 — proba de funcționare, construită și verificată. Fără import.**

## Ce face Excelul, de fapt

Registrul are 25 de foi și 77.463 de formule, dar face exact **trei calcule**; restul e tastare.

| Calcul | În Excel | În Airtable |
|---|---|---|
| Sold per furnizor | rândul 2 din `Facturi detaliat `: `X2 = V2 - W2` | rollup `Total Facturat` − `Total Platit` |
| Stoc paleți | `Situatie paleti!K5 = SUM(E5:E2253) - SUM(H12:H2227)`, citit înapoi în `Facturi!P1` | rollup `Paleti Primiti` − `Paleti Returnati` |
| Total facturat | `Facturi!N1 = SUM(N3:N3932)` | rollup `Total Facturat` |

Toate cele trei sunt, în Excel, sume peste **intervale fixe de rânduri**. De aici vine întreaga clasă de defecte: când datele depășesc intervalul, calculul tace și dă un rezultat greșit fără nicio eroare.

## De ce a eșuat încercarea din mai 2026

1. **`Furnizori` nu era legat de nimic.** 9 rânduri, zero legături. `Facturare.Furnizor` = text liber cu 28 de variante de scriere („Bilka" / „BILKA STEEL SRL", „Cipcos" în 4 feluri). `Plăți Furnizori.Furnizor` = alt select, cu alte 9 opțiuni. Nimic nu se putea aduna, deci niciun sold nu a existat vreodată.
2. **Modelul de paleți nu semăna cu practica.** Trei tabele (`Loturi Paleți Primiți`, `Retururi Paleți`, `Alocări Paleți`) cu alocare FIFO lot→retur. În realitate: 1 factură = 1 palet, iar storno-ul Bilka vine cu numărul facturii și locația, scris direct pe rândul livrării. Create 04.05.2026, abandonate 05.05.2026 — au azi 2 rânduri goale.
3. **Două sisteme incomplete în paralel.** `Facturare` = 284 rânduri (ian–apr 2026) față de 1.857 în Excel; `Plăți Furnizori` = 346 (oprite la 23.03.2026) față de 504.

## Ce s-a construit (02.09.2026)

### Legăturile — piesa care lipsea

| Tabel | Câmp nou | Ce face |
|---|---|---|
| `Facturare` | `🔗 Furnizor` (fldorcGrvF2poXtz3) | leagă factura de furnizor. Numele nu se mai tastează. |
| `Plăți Furnizori` | `🔗 Furnizor` (fldXGVCPpndxcHYZX) | leagă plata de furnizor |

Câmpul text `Furnizor` din `Facturare` rămâne pentru **sub-furnizor** (Trutzi, Dedeman, Arkada) — echivalentul coloanei BL din Excel.

### Câmpurile calculate pe `Furnizori`

| Câmp | Tip | Echivalent Excel |
|---|---|---|
| `Total Facturat` | rollup SUM(`Valoare in Sold`) | „Total Factura" din rândul 2 |
| `Total Platit` | rollup SUM(`Valoare Plată`) | „Total plata" din rândul 2 |
| **`SOLD`** | formulă, `Total Facturat − Total Platit` | „Sold" din rândul 2 (`X2`, `A2`) |
| `Paleti Primiti` | rollup SUM(`Numar Paleti Livrare`) | `SUM(E)` din Situatie paleti |
| `Paleti Returnati` | rollup SUM(`Nr Paleți Storno`) | `J5 = SUM(H:H)` |
| **`Paleti in Stoc`** | formulă | `K5`, adică `Facturi!P1` |
| `Valoare Paleti Stoc` | formulă, × `Preț Palet RON` | `L5 = K5*478` |
| `Ultima Plata` / `Ultima Factura` | rollup MAX(dată) | — |

**Niciunul nu are limită de rânduri.** Asta e diferența de fond față de Excel.

### Câmpurile de disciplină pe `Facturare`

- `Valoare in Sold` — formulă: storno = **întotdeauna negativ**, indiferent cum a fost tastată suma; proformă = 0; rând exclus = 0. Aici se scad automat facturile de storno.
- `Exclus din sold` + `Nota corectie` — un rând se scoate din calcul **fără să dispară**, cu motivul la vedere. Reversibil.
- `Tip Palet`, `Data Storno Palet` (noi) lângă `Factură Storno Palet` și `Nr Paleți Storno` (existente) = coloanele F/G/H/I din Situatie paleti, dar pe rândul facturii.
- `Palet Deschis` = primiți − stornați pe rând. `Zile Palet` = de câte zile stă.

### Regula paleților (ca să nu se dubleze numărătoarea)

- `Numar Paleti Livrare` = paleți veniți **cu marfa** (coloana P). Numărătoare, nu bani.
- Facturile Bilka de „ambalaj" (484 lei) = rânduri **doar de bani**, cu `Numar Paleti Livrare` = 0.
- Storno-ul de palet scade **numărătoarea** prin `Nr Paleți Storno`; scade **banii** doar dacă există un rând de factură negativ.

În Excel banii paleților lipsesc cu totul: cele 388 de numere de storno din coloana G nu apar niciodată în `Facturi`.

## Mostra de test — 21 de înregistrări noi, 13 legate

Alese pentru că sunt **exact blocurile pe care Excelul le calculează greșit azi**.

| Furnizor | Facturat | Plătit | SOLD Airtable | Sold Excel | De ce diferă |
|---|---|---|---|---|---|
| Wetterbest-SAF | 31.248,60 | 30.975,56 | **273,04** | −2.385,65 | formulele-oglindă se opresc la rândul 567 (martie 2026) |
| Unimat | 15.792,43 | 12.544,71 | **3.247,72** | 0 | formulele se opresc la rândul 516; 3 facturi din 2026 invizibile |
| Bilka (mostră) | 102.483,10 | — | mostră | — | doar 12 facturi din august, pentru paleți |

Verificări care se leagă singure:
- **Wetterbest**: fiecare plată acoperă exact o factură (16.469,23 = 985,36 + 15.483,87; apoi 3.539,46; 8.754,25; 100,01). Rămâne neplătită doar SAF 13636 din 26.08.2026 = **2.385,65**. Excelul afișează exact aceeași sumă, cu semn minus.
- **Unimat**: sold 3.247,72 = exact cele două facturi neplătite din 31.03 și 01.04.2026 (1.623,86 fiecare).
- **Bilka**: 12 paleți primiți, 4 returnați, **8 în stoc**, 3.824 lei (8 × 478). Storno-ul `9002392727` acoperă două livrări (Domnesti și „3.5 to Pitesti") — tiparul real din Excel.

### Factura dedusă 11772 (Wetterbest)

Există o plată de 2.112,61 din 28.08.2025 fără nicio factură în Excel, iar plata facturii 12296 a fost scrisă acolo 6.641,64 = 8.754,25 − 2.112,61 (compensare manuală). Am adăugat factura ca rând **bifat „Exclus din sold"**, cu explicația în `Nota corectie`. Dacă fișa SAF Construct o confirmă, se debifează și soldul devine **2.385,65** — exact factura neplătită.

## Limite cunoscute ale stării actuale

- **Cele 284 de rânduri vechi din `Facturare` nu sunt legate**, deci nu influențează niciun sold. 20 dintre ele au totuși paleți notați fără storno (ian–mar 2026, din încercarea abandonată): un filtru „Palet Deschis > 0" pe tot tabelul întoarce 28 de rânduri, din care doar 8 sunt reale. **View-ul de paleți trebuie să filtreze și pe `🔗 Furnizor` completat.**
- Airtable afișează câmpurile numerice noi cu 0 zecimale. Valorile din spate sunt exacte (soldurile de mai sus sunt reale); e doar formatare, se schimbă din interfață.
- View-urile nu se pot crea prin API — se fac din interfață, cu filtrele de mai sus.
- Soldul Bilka afișat **nu e** soldul real: doar 12 facturi din august sunt legate. Nota de avertisment e scrisă pe rândul furnizorului.

## Ce urmează (neînceput)

- **Faza 1**: restul furnizorilor principali + cei ~34 secundari (Trutzi, Dedeman, Arkada…) ca rânduri proprii cu `Categorie = Secundar`; curățenie de câmpuri moarte pe `Facturare`; interfața cu 3 pagini; linia de sold și paleți în raportul Telegram de seară.
- **Faza 2 — importul**: nu începe fără OK explicit. Diferențele identificate: Bilka 143.773,90 → ≈129.136 (7 facturi dublate în ianuarie 2026 = 12.483,12 + 2.154,41 din dezaliniere), Furnizori 1 1.601,34 → 2.499,87 (3 valori scrise ca text, ignorate de SUM), Top Profil −2.524 → −4.791 (sumă doar din 2026 + constanta −6500). Caretta e singurul bloc corect.
- **Faza 3**: cheltuielile lunare (motorina însumează coloana greșită în 14 din 21 de foi; „Total cheltuieli lunare" nu mai calculează nimic din martie 2026) și Valabilitate Acte (17 documente expirate).

## Ce nu s-a atins

Excelul, `Ofertare`, facturarea către clienți, motorul F2.3 SmartBill, scenariile PUNTE. Niciun tabel șters.
