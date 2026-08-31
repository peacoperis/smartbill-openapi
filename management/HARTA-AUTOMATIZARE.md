# Harta de automatizare — ce e pornit, ce zace oprit, ce urmează

> Principiu: „să rămână doar golul lipsei" — se automatizează ce e mecanic (facturare, ingestie, notificare, reconciliere), rămâne uman ce cere prezență și judecată (măsurători, relația cu clientul, montaj video, walk-in).
> **Regulă nouă:** nimic nu se mai construiește fără dată de pornire. Un scenariu oprit = timp pierdut, nu progres.

## PORNIT și funcțional (după 31.08.2026)

| Componentă | Unde | Ce face |
|---|---|---|
| F2.3 SmartBill Motor | Airtable (automatizare) | «De emis factura» → factură draft SmartBill + update status |
| Ingestie facturi furnizori | Airtable (`Facturare`) | Intrare automată: ANAF e-Factura / email / AI Agent scan |
| Matching storno paleți | Airtable (`Inbox Storno`) | Auto-match / cazuri de verificat |
| PUNTE 1 — alertă «Livrare mâine» | Make (mailhook→Telegram) | Alertă instant către Daniel + avertisment «fără factură furnizor» *(automatizarea Airtable-sursă: draft, de pornit cu 1 click)* |
| PUNTE 2 — briefing 08:50 | Make | Planul zilei pentru Antonia, pe Telegram (L–V) |
| PUNTE 3 — raport 17:30 | Make | Raportul de seară pentru Daniel: mișcare/dovezi/livrări/restanțe (L–V) |

Consum Make: ~30 operații/zi din limita de 10.000/lună — nesemnificativ. Fără polling.

## CONSTRUIT dar OPRIT în Make (inventar la 31.08.2026 — 18 scenarii, 0 execuții)

**Merită repornite (cu completări):**
- `Integration Email, Text parser, Airtable` — parserul de mail Bilka + IMAP: baza motorului B (ingestie facturi). Prima repornire planificată.
- Suita OLX (`OLX_S1…S4`, `OLX_AUTO_Dimineata/Seara`, `S0 Auto-Post`) — procesul OLX e complet proiectat în tabele (sesiuni, analiză concurență, evaluare 7 zile). Decizie luată: OLX = automatizare, NU sarcină manuală a Antoniei. Repornirea = proiect separat, doar cu dată de pornire; 3 scenarii sunt marcate `invalid` și trebuie reparate.

**De lăsat / abandonat (nu se șterg, doar nu se investește):**
- Boții Telegram experimentali (`Integration Telegram Bot` ×2), `Integration HTTP`, `C 2026`, `Leaduri peacoperis`, `secenariu smslink`, `YouTube → Tetto [DRAFT]` — utile doar dacă apare un caz concret.

## URMEAZĂ (ordinea decisă — detalii în ARHITECTURA-ITC-PIPELINE.md)

1. **D2 — Emite Factură Finală** (extindere F2.3): proformă → factură fiscală cu scăderea avansului. Fără condiții de start.
2. **A — Parser Bilka .xlsm → proformă** cu mențiunea «ITC-{ID}». Start: fișiere .xlsm de probă de la Daniel.
3. **B — Ingestie mail + XML e-Factura** → `Factura_Furnizor_OK` automat. Start: un email Bilka de probă; repornește scenariul existent.
4. **C — Reconciliere bancară** (tabel `Plăți Bancă`, regex ITC-, ping cu butoane la ambiguitate). Start: A pornit + extras bancar de probă.
5. **Extinderi SmartBill** (după A–C): trimitere PDF pe email client, sincronizare încasări.
6. **OLX reactivat ca automatizare** — doar când Daniel îi pune dată de pornire.

## Rămâne UMAN (nu se automatizează)
- Măsurători, ofertare complexă, negociere — Daniel.
- Clienți walk-in, montaj video, relația zilnică cu clienții de birou — Antonia.
- Decizia de vineri (15 min pe restanțe) — amândoi.
