# ITC Pipeline Core — arhitectură și foaie de parcurs

Caietul de sarcini al lui Daniel (COMENZI SSoT + FACTURI_FURNIZORI + PLATI_BANCA + motoarele A–D), transpus pe sistemul REAL existent. Decizie de arhitectură (31.08.2026): **nu se creează tabele paralele** — spec-ul se mapează pe tabelele vii din baza „test #". Două surse de adevăr = exact problema de decodificare pe care o rezolvăm.

## Maparea entităților

| Spec | Realitate | Observații |
|---|---|---|
| COMENZI (SSoT) | **`Ofertare`** (existent, ~509 înregistrări) | Extins la 31.08 cu: `Avans_Confirmat`, `Factura_Furnizor_OK`, `Factura_Client_OK`, `ID_Proforma_SmartBill`, `Valoare_Oferta_EUR`, `Curs_BNR`. `ID_Factura_SmartBill` = câmpul existent «Nr. Factură Finală». |
| FACTURI_FURNIZORI | **`Facturare`** (existent) | Are deja ingestie automată (ANAF e-Factura / email / AI Agent scan), link la comenzi, storno paleți prin `Inbox Storno`. |
| PLATI_BANCA | **de creat în faza C** | Coada de reconciliere; nu înainte. |

### Maparea statusurilor (spec → Ofertare `Status Oferta F1`)
1. Ofertat → `Ofertat` · 2. Așteptare Avans → `Procedura de avans` · 3. De Comandat → `De Comandat` · 4. Comandat Furnizor → `Comandată` · 5. Confirmat Fabrica → *(acoperit de `Comandată` + `Factura_Furnizor_OK`)* · 6. Livrare Mâine → `Livrare mâine` · 7. Facturat & Livrat → `Livrată` / `FINALIZATĂ` + `Factura_Client_OK`.

## Ce e DEJA construit și PORNIT (31.08.2026)

- **D1 (gating „Livrare Mâine")**: alerta instant și rapoartele marchează comenzile din «Livrare mâine» fără `Factura_Furnizor_OK` cu „⚠️ FĂRĂ FACTURĂ FURNIZOR". Fluxul: automatizare Airtable (email la mutarea statusului) → mailhook Make → Telegram Daniel. *(Automatizarea Airtable e draft — pornirea = 1 click în Airtable → Automations.)*
- **D3 (dashboard de seară)**: raportul Telegram de la 17:30 (scenariul Make „PUNTE 3") — comenzile «Livrare mâine» fără factură client/furnizor apar evidențiate în listă. Varianta pe fond roșu în interfață se poate adăuga ulterior ca view colorat.
- **Briefing 08:50 pentru Antonia** („PUNTE 2") — planul zilei generat din starea tabelelor.

## Motoarele — ordine decisă, condiții de start, regula pornirii

> **Regulă:** un motor se consideră livrat doar activat + testat în aceeași sesiune, cu data pornirii notată aici. Nimic nu mai rămâne „construit dar oprit".

### 1. D2 — «Emite Factură Finală SmartBill» (următoarea sesiune)
- Buton/checkbox pe `Ofertare` → script (extinderea motorului F2.3 existent): preia proforma (`ID_Proforma_SmartBill`), emite factura fiscală prin API SmartBill, **scade avansul încasat**, atașează PDF-ul, completează «Nr. Factură Finală», setează `Factura_Client_OK = TRUE`.
- Condiții de start: niciuna — F2.3 e deja funcțional și oferă șablonul (TVA 21%, serie FFITC, draft).
- De decis la implementare: emitere directă vs draft; tratarea facturii multiple/parțiale.

### 2. A — Parser Bilka .xlsm → Proformă SmartBill
- Script (Python/openpyxl sau Airtable extension) pe fișierul din `Scan_Oferta / Formular`: extrage client/telefon/adresă + liniile de deviz (mp/ml/buc, cantitate, preț unitar EUR fără TVA) → curs BNR la zi → payload SmartBill proformă (TVA 21%; PF fără CNP — doar nume+adresă; PJ cu CUI) cu mențiunea **„Avans comandă ITC-{Id client}"** → salvează `ID_Proforma_SmartBill`, `Valoare_Oferta_EUR`, `Curs_BNR`, atașează PDF → status `Procedura de avans`.
- **Condiție de start: 1–2 fișiere .xlsm Bilka reale, de probă** (încărcate în Airtable sau trimise în sesiune). Fără ele nu se scrie nicio linie de parser.
- Mențiunea ITC-{ID} e fundația reconcilierii (C).

### 3. B — Ingestie facturi Yahoo Mail + SPV
- **Nu se construiește de la zero**: se repornește și se completează scenariul Make existent „Integration Email, Text parser, Airtable" (conexiunea IMAP există). Se adaugă parsarea XML e-Factura (UBL: CUI emitent, nr., dată, valoare, referință comandă) → rând în `Facturare` → link automat la comandă → `Factura_Furnizor_OK = TRUE`.
- Condiție de start: un email Bilka real cu XML+PDF ca probă.

### 4. C — Motorul de reconciliere a încasărilor
- Tabel nou `Plăți Bancă` + import extras (CSV/MT940, drop manual la început).
- Pas 1: regex `ITC-[0-9]+` în detalii → asociere directă → `Avans_Confirmat = TRUE` → status `De Comandat`.
- Pas 2 (fallback): sumă identică unică pe comenzile în `Procedura de avans` → asociere automată; sume identice multiple → ping Telegram cu butoane inline (alege comanda).
- Condiții de start: A pornit (mențiunea ITC- pe proforme) + un extras bancar de probă + formatul băncii.

## Jurnal de livrare
| Data | Componentă | Stare |
|---|---|---|
| 31.08.2026 | Punte: PUNTE 1/2/3 (Make) + automatizare Airtable (draft) + câmpuri sistem + `Jurnal Antonia` | Activ (automatizarea Airtable: de pornit de Daniel, 1 click) |
| — | D2 / A / B / C | Neîncepute — în ordinea de mai sus |
