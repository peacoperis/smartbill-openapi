# Harta de automatizare — ce e pornit, ce zace oprit, ce urmează

> Principiu: „să rămână doar golul lipsei" — se automatizează ce e mecanic (facturare, ingestie, notificare, reconciliere), rămâne uman ce cere prezență și judecată (măsurători, relația cu clientul, montaj video, walk-in).
> **Regulă nouă:** nimic nu se mai construiește fără dată de pornire. Un scenariu oprit = timp pierdut, nu progres.

## PORNIT și funcțional (după 31.08.2026)

| Componentă | Unde | Ce face |
|---|---|---|
| F2.3 SmartBill Motor | Airtable (automatizare) | «De emis factura» → factură draft SmartBill + update status |
| Ingestie facturi furnizori | Airtable (`Facturare`) | Intrare automată: ANAF e-Factura / email / AI Agent scan |
| Matching storno paleți | Airtable (`Inbox Storno`) | Auto-match / cazuri de verificat |
| PUNTE 1 — alertă «Livrare mâine» | Make (mailhook→Telegram) | **NU E LIVE** (03.09): 3 execuții, toate teste; automatizarea Airtable-sursă e tot draft. Alerta nu există până la clicul de deploy |
| PUNTE 2 — briefing | Make | v3 (03.09): 07:30 cât merge la Daniel (rodaj), 08:50 când trece la Antonia; filtru 7 zile + „cele mai vechi 3 din backlog"; text fix doar lunea; șabloane WhatsApp; retry pe citiri |
| PUNTE 3 — raport 17:30 | Make | v3 (03.09), L–S: comenzi/livrări/de ridicat/restanțe 7 zile + **ÎN LUCRU pe etape** + link dashboard + delta backlog; **sâmbătă „Săptămâna în cifre"**; snapshot zilnic în `📊 Zile` (upsert) |
| `Etapă comandă` + dashboard «Comenzi în lucru» | Airtable (formulă + interfață) | 03.09: etapa fiecărei comenzi (comandată → livrare → facturat → încasat) și lista celor deschise, pe file. https://airtable.com/appdbikkM2awYhpoM/pagW48gNn8LNQ9eS7 |
| `📊 Zile` | Airtable | un rând pe zi scris de PUNTE 3: comenzi, livrări, facturi client, încasări, oferte noi, facturi furnizor intrate, restanțe, backlog — contorul săptămânal |

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

## Audit 01.09.2026 — fix-uri aplicate și puncte rămase deschise

**Aplicate și testate:**
- Filtru anti-injecție pe PUNTE 1: doar emailurile cu subiect «🚚 LIVRARE MÂINE» ajung pe Telegram (test cu email fals: blocat — 1 operație, fără mesaj).
- Linie-santinelă «🔧 Sistem: OK» în ambele rapoarte: distinge „zi curată" de „citire Airtable ruptă" (zerourile nu mai pot minți silențios).
- Indicatori de trunchiere: când o listă atinge plafonul (20/15), raportul spune explicit „sunt mai multe".

**Deschise (proprietar: Daniel):**
1. Automatizarea Airtable «PUNTE — Livrare mâine» e încă NEPORNITĂ (draft) — fără click-ul de deploy, alerta instant nu există.
2. Briefing-ul de dimineață merge la Daniel, nu la Antonia — ea trebuie să dea /start botului, apoi se mută chat ID-ul (o singură modificare).
3. Securitate: scriptul F2.3 conține credențialele SmartBill în clar, iar blueprint-urile vechi Make conțin un token Airtable în clar — vizibile oricui are acces la bază. De rotit ambele și de mutat în conexiuni/secrets.
4. Actul adițional la Regulamentul Intern — fără el, pragurile din PLAN-ANTONIA.md nu au forță legală (termen: 15 septembrie).
5. NU redenumiți statusurile din Airtable («Livare maine », «🟡 Verifică», «⚠️ De Clasificat») — rapoartele caută după aceste nume exacte.

**Limite asumate ale măsurării (de ținut minte la decizia din 20 octombrie):**
- Scorul măsoară starea tabelelor, nu autorul muncii — dacă Daniel face el sarcinile, ziua iese tot „curată". Corecție: la discuția de vineri, 2 verificări prin sondaj (o bifă → factura chiar e atașată?; un rând de jurnal → captura există?).
- Bifele și jurnalul walk-in sunt auto-raportate de persoana evaluată. Sondajul de vineri e contramăsura.
- Septembrie e luna de vârf — scorul se interpretează cu acest context.


## Curățenie 01.09.2026 — OLX pus la naftalină

**Șters din Airtable (5 tabele):** OLX_Orase (25), OLX_Categorii (4), OLX_Anunturi_Planificate (44),
OLX_Analiza_Zilnica (7), OLX_Performanta (0). Niciunul nu avea legături cu restul bazei.
Baza a scăzut de la **20 la 15 tabele**.

**Șters din Make (8 scenarii):** OLX_S1_Analiza_Concurenta, OLX_S2_Postare_Dimineata,
OLX_S3_Postare_Seara, OLX_S4_Raport_Zilnic, OLX_AUTO_Dimineata, OLX_AUTO_Seara,
S0 — OLX Auto-Post FINAL (×2). Toate cu 0 execuții. Make a scăzut de la **22 la 14 scenarii**.

**Backup complet înainte de ștergere:** `airtable-backup-2026-09-01.tar.gz` (20 tabele,
2.360 înregistrări + schema), livrat lui Daniel. Nu se păstrează în repo — conține date personale.

**Infrastructura e documentată integral** în `naftalina/OLX-SISTEM-ARHIVAT.md`: schema celor 5 tabele,
cele 25 de orașe cu OLX_City_ID, cele 4 categorii cu ID-uri și bugete, șabloanele de titlu, logica
scenariilor și pragurile de decizie. Poate fi reconstruită identic.

**Cauza reală a morții, găsită la arhivare:** interogarea OLX folosea text liber
(`?query={categorie} {oras}`) în loc de `city_id` + `category_id`, deși ambele ID-uri erau stocate
corect în tabele. Deci numărul de „concurenți" era totalul pe țară (205–1000), nu pe oraș — iar
pragul „peste 40 = roșu" respingea automat fiecare anunț. Sistemul nu a eșuat tehnic, s-a
autoblocat logic: 4 postate, 33 blocate în PLANIFICAT, 5 respinse.

## Rămâne UMAN (nu se automatizează)
- Măsurători, ofertare complexă, negociere — Daniel.
- Clienți walk-in, montaj video, relația zilnică cu clienții de birou — Antonia.
- Decizia de vineri (15 min pe restanțe) — amândoi.
