# Rutina zilnică Antonia (L–V)

> Sursa de adevăr este Airtable (baza „test #"). „Făcut" înseamnă că se vede în tabele — nu se raportează verbal.
> La 08:50 primește pe Telegram briefing-ul zilei (generat automat de scenariul Make „PUNTE 2").
> La 17:30 Daniel primește raportul de seară („PUNTE 3") — nu mai întreabă „e făcută factura aia?", citește raportul.

## 09:00 — SPV / facturi furnizori
1. Preia facturile intrate din SPV (intrarea în tabelul `Facturare` e automată: ANAF e-Factura / email / AI Agent).
2. Trecere în registrul zilnic + înregistrare în contabilitate.
3. Clasifică tot ce e `⚠️ De Clasificat` → `Lucrare Client` sau `Cheltuială Internă`, cu alocare pe comandă.

**Gata când:** în `Facturare` nu mai există niciun rând `⚠️ De Clasificat`.

## 09:30 — Livrările de azi
1. Deschide comenzile cu `Status Oferta F1 = Livrare mâine` (lista e și în briefing-ul de dimineață).
2. Emite facturile (motorul SmartBill F2.3 la statusul «De emis factura», unde se aplică) și atașează documentele (`Scan_Doc Emise`).
3. Mută statusul mai departe după facturare/livrare.
4. ⚠️ Dacă o comandă apare cu „FĂRĂ FACTURĂ FURNIZOR" — NU factura; semnalează-i lui Daniel întâi.

**Gata când:** nicio comandă din lista de dimineață fără factură atașată și status mutat.

## 11:00 — Analiza Facebook
1. Verifică contul: ce a mers, ce a stat, ce nu a funcționat.
2. Scrie concluzia (3 rânduri) într-un rând nou în `Jurnal Antonia`: Tip = „Analiză Facebook", cu captură la `📸 Capturi`.

**Gata când:** rândul de azi există în `Jurnal Antonia`, cu captură. (Apare automat în raportul de seară al lui Daniel.)

## Pe parcurs — Mail
- Fiecare cerere de ofertă din mail → contact cu clientul + rând nou în `Ofertare` (sursă, telefon, ce cere) **în aceeași zi**.
- Ofertarea complexă (măsurători, configurări) rămâne la Daniel — statusul `DE MĂSURAT` i-o predă.

**Gata când:** nicio cerere din mail fără rând în `Ofertare` în ziua primirii.

## Clienții care intră în birou
1. Fiecare client intrat → rând în `Jurnal Antonia`: Tip = „Client birou (walk-in)", cu „Daniel prezent?", „A cumpărat?", „Valoare estimată".
2. Cerere simplă (șipcă/accesorii): ofertă pe loc cu calculatorul V22 (PDF/WhatsApp) + rând în `Ofertare` cu `Sursa Client = Birou`.
3. Follow-up la 3 zile dacă n-a cumpărat.

**Gata când:** niciun client intrat fără rând în jurnal; nicio ofertă de birou lăsată pe `De ofertat` peste 24h.
*(Jurnalul walk-in e și măsurătoarea care decide organizarea biroului — se completează la FIECARE client intrat, fără excepție.)*

## Video (când Daniel trimite footage de dronă)
1. Daniel filmează și trimite footage-ul (un singur canal convenit — folder dedicat, nu WhatsApp răzleț).
2. Antonia montează în CapCut (30–60s, vertical, text: localitate + tip lucrare + telefon) și postează (Facebook/TikTok/Instagram).
3. Rând în `Jurnal Antonia`: Tip = „Video montat/postat", cu **linkul postării** la `Link Dovadă`.

**Gata când:** clipul e live în max 48h de la primirea footage-ului; dovada = linkul, nu afirmația. Fără footage primit = fără sarcină.

## După-amiază — Pregătirea zilei de mâine
1. Când sosesc facturile furnizorilor pentru livrările de mâine: leagă factura de comandă și bifează `Factura_Furnizor_OK`.
2. Mută comenzile respective din `Comandată` → `Livrare mâine` **până la 16:30**.
3. Mutarea **va** trimite automat alerta către Daniel (transport/șofer) — **doar după ce automatizarea Airtable «PUNTE — Livrare mâine» e pornită (clic al lui Daniel; la 03.09 încă nu era)**. Până atunci, anunță-l verbal.
4. Bifa `Factura_Furnizor_OK` e ce citește raportul de seară al lui Daniel: nebifată = „fără factură furnizor" în raport și în dashboardul «Comenzi în lucru». Se bifează doar când factura furnizorului e legată de comandă.

**Gata când:** toate comenzile cu livrare confirmată mâine sunt mutate și cu factura furnizorului bifată.

## La nevoie
- Proforme la `Procedura de avans`; facturare când statusul devine plătit; completarea `ID_Proforma_SmartBill` / `Nr. Factură Finală`.

---
**Regula zilei:** ziua e închisă când briefing-ul de dimineață ar afișa «zero» la punctele 1–3 (inclusiv cele câte 3 din backlog). Dovezile din jurnal rămân sarcină, nu condiție a scorului zilnic (vezi PLAN-ANTONIA.md, actualizat 03.09).
