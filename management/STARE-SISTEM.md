# Starea sistemului — toate ID-urile, ce e live, ce nu (03.09.2026, 09:00 UTC)

Regula: orice cifră de aici se reverifică prin API înainte de a fi folosită într-o decizie; ID-urile nu se
schimbă, stările da. Spațiile finale din numele câmpurilor și opțiunilor sunt **reale** și obligatorii.

## Airtable — baza „test #" `appdbikkM2awYhpoM` (conector MCP `mcp__Airtable__*`)

### Tabele

| Tabel | ID | Rol | Rânduri |
|---|---|---|---|
| `Ofertare` | `tblgxij0sB0YHP2rz` | **sursa de adevăr**: oferte și comenzi, 87 câmpuri | 518 |
| `Facturare` | `tbloIxkL2GlphhRRj` | facturi furnizori + motorul de sold/paleți (link `🔗 Furnizor` fldorcGrvF2poXtz3) | ~305 |
| `Furnizori` | `tbluWx5b5ZwD07BCb` | hub solduri/paleți (rollup-uri) | 9 |
| `Plăți Furnizori` | `tblbdZVheniNCz05k` | jurnal plăți (link `🔗 Furnizor` fldXGVCPpndxcHYZX) | 346 |
| `Ponou Control` | `tblsyvGhneA5VWVis` | catalog produse (numele e o scăpare, e „Produse") | 54 |
| `Jurnal Antonia` | `tbl6H1TRCP60uAGUM` | dovezi zilnice (câmpuri: Data, Tip, Rezumat, Link Dovadă) | 1 (test) |
| `📊 Zile` | `tblJ0IUiG4uQ5VNYM` | snapshot zilnic scris de PUNTE 3 | 2 |
| `⚙️ Config` | `tbltvlIAmooZTDU0c` | setări motoare (Cheie fldf2FklZGAZCTV5R / Valoare fldpRsEJDGQoLiwyF / Notă fldKdK50vTK4a7IGq) | 0 — **de completat** |
| `Încasări Clienți`, `Clienți`, `Cheltuieli Operaționale` | — | importate o dată, abandonate; vezi INVENTAR | |

Șterse la 02.09 (documentate în `naftalina/TABELE-ARHIVATE.md`): Loturi/Retururi/Alocări Paleți, Inbox
Storno, Persoane, SANDBOX. Au rămas 14 coloane moarte `🗑️ STERGE - …` în 6 tabele (clic al lui Daniel).

### `Ofertare` — câmpurile folosite de automatizări

| Câmp (nume exact) | ID | Tip / note |
|---|---|---|
| `Nume Beneficiar ` (spațiu final) | fldMlCOY3FaPt44zs | text |
| `Telefon / Nr Contact` | fldKWuLdPcw9hf0jO | phone; formate mixte (`07…`, `+40…`, `(07x) xxx-xxxx`) |
| `Locatie proiect` | fld4ETUmNFXDHFdla | text |
| `Valoare Oferta acceptata ` (spațiu final) | fldT1qmpXFurkB6qM | currency, TVA inclus, RON |
| `Status Oferta F1` | fldt1AVA5FEvMCbMS | singleSelect; opțiuni cu spațiu final: `De ofertat`, `Ofertat`, `Procedura de avans `, `Avans Achitat `, `De Comandat `, `Comandata `, `Livare maine `, `Livrata `, `Livrata Partia`, `Anulata `, `Pierduta `, `FINALIZATA `, `DE MASURAT `, `COMANDA PARTIALA `, `COMANDA PARTIALA / LIVARE MAINE `, `LIVRATA DE RIDICAT `. ID-uri: Livare maine selvB1bvjoUmVQ6A6 · PARTIALA/LIVARE selSHuYIfjOzhhH7s · DE RIDICAT selV6gSs0TZVnLfi8 · Comandata sel9gZPSYOW9GATJL · FINALIZATA selsLzjsT7yA31wsd · Ofertat selR04g0HvANghmWS |
| `Data Ofertarii` / `Data Comanda` / `Data Livrare` | fldDjffRJC8tcCU65 / fldEcDByQHberYRxA / fld23cUd7xFBK90l4 | date |
| `Responsabil Comanda` | fldgplWaCwuK3dibw | singleSelect = de la ce colaborator vine comanda (NU cine a tastat) |
| `Introdus prin` | fldz7XPlJ9i0LYxiO | singleSelect: `Telegram — Daniel`, `Telegram — Antonia`, `Airtable` (scris de PUNTE 4) |
| `Id client` (autoNumber) / `Id Client operational` | fldU92MWCNDRmzXNj / fldBP8DZbS44fXLTO | formula `UPPER(LEFT(nume,3) & RIGHT(cifre tel,5))`, ex. `HOD0001x` |
| `ultima modificare` | fldPMCWKlwA2GSFtR | lastModifiedTime (toate câmpurile) |
| `Factura_Furnizor_OK` | fldc4hpRPyr4Z95Gr | checkbox; 0/518 bifate; citit de rapoarte și de `Etapă comandă` |
| `💰 Status Financiar REZIDUAL` | fld8ffrdbRM13AI4b | singleSelect; relevante: `De emis factura` selDWlarmYreITlr6, `🔴 Încasat - Nefacturat (Urgent Factură)` selDCcYGXQAi5uLol, `🔴 Facturat - Neîncasat )`, `NEINCASAT `, `🟢 Încasat …` |
| `Nr. Factură Finală` | flda87edCIzrCgzW5 | text (scris de F2.3) |
| `CNP / CUI ` (spațiu) · `Mod Plată Avans` (Op /Card /Cash /card+cash) · `💵 Valoare Avans` · `Status Avans` (🟢 Încasat) · `Scan_Doc Plati ` · `Nr. Factură Avans` · `Avans_Confirmat` · `ID_Proforma_SmartBill` · `Proformă Generată` · `✅ Fără Avans (Trust)` · `Adresa/Localitate/Judeţ Facturare` · `Email Client` | fldeUT8KLc1NrPxF7 · fldV976XXzm47P1qn · fldzu6fFxLMBSIpx6 · fldUJkv5J2yNtXq2r · fld9vL7hDGU1dSE5c · fldxxxqSEt5ZpnbHP · fldnQkbldxiWywXvj · fldaj8tiFgsnAxVQv · fldhoEU8KRVQ911pt · fldo4mOkSNEVWCBkY · fldN1RqIHfvLJKJ5T / fldnreXVGJRZB4Kot / fldcgkvwEKkvfp1Ao · fld18fHN13OVovanw | folosite de motoarele A și B |
| `Scan_Oferta / Formular` | fldP0G0lV0FUvOp9e | attachments: .xlsm Bilka + PDF ofertă (ITC sau furnizor) |
| `Extras din PDF` · `Valoare din PDF (lei)` · `Tip document PDF` | fldTYvBNhYpiS0tnL · fldTStaGxcAjxNfGh · fldGwmCq2IX8WFfLV | create 03.09 pentru motorul 0 |
| **`Etapă comandă`** | fldXVHBtBBwKfVyAc | formulă (03.09): `0 anulată/pierdută · 1 ofertă · 2 avans/de comandat · 3 comandată (✓/fără factură furnizor) · 4 livrare mâine · 5 livrată PARȚIAL · 6 livrată — DE FACTURAT / status financiar necompletat · 7 facturată — NEÎNCASATĂ · 8 încasată ✅ · 9 finalizată fără status financiar` |
| câmp note (scris de PUNTE 4) | fld653IfpqyJc30rQ | text lung |
| schelă neutilizată | `Avans_Confirmat`, `Factura_Client_OK`, `Valoare_Oferta_EUR` fldGFkeiUpjVTiJGb, `Curs_BNR` fldfzLAykz1XyO4zT | |

View: „Comenzi efectuate" viwb6UzI7gOYxrBXk (nu se mai folosește în rapoarte). **`Created by` /
`Last modified by` nu există** — API-ul nu le poate crea; e clicul #4 al lui Daniel.

### `📊 Zile` — câmpuri

`Data` fldILoP5ogBtM6RMs (primar) · `Comenzi azi` fldVzquV3SyxaYuOu · `Restante 7 zile` fldhOguVc10A5JdAg ·
`Dovezi jurnal` fldV6aUDJuOmpStTq · `Livrari maine` fldtysLkMVqfMq7aK · `Fara factura furnizor`
fldNXrYmKOSWyl6nb · `Backlog facturi` fldGMpE31CkuOKnfD · `Backlog de emis` fldLnSJOeU7HZOeln · `Livrari
facute` fldedVHo9T6uMtvgO · `Facturi client emise` fldNplYcLYNToCULM · `Incasari` fldTWR5VoXBkFAJnc ·
`Oferte noi` fldyVWi9l5HI5JZdF · `Facturi furnizor intrate` fldSBP7fWe3X0zK5T · `Zi curată`
fldO1XuyalKf9vaNM (formulă `AND({Restante}=0,{Dovezi}>0)` — **propus doar restanțe=0, schimbare refuzată
la permisiune**) · `Zi` fldE2tZzZXNuJpScl.
Rânduri: 02.09 (4·0·0·3·3, backlog 94/51, completat manual după bug) și 03.09 (scris de PUNTE 3).

### Interfață

„Comenzi în lucru" — interfața pbdtDrTq1hVrcEyQF, pagina pagW48gNn8LNQ9eS7, **publicată**:
https://airtable.com/appdbikkM2awYhpoM/pagW48gNn8LNQ9eS7 — listă grupată pe `Etapă comandă`, filtrată
fără etapele 0/1/8/9, file: Comandate / Livrare mâine / Parțiale / De facturat / Neîncasate / Avans.
La 03.09: 184 deschise = 4 · 14 · 3 · 2 · 51 de facturat · 49 neîncasate · 61 fără status financiar.

### Automatizări Airtable

| Nume | ID | Stare | Ce face |
|---|---|---|---|
| Automation 1 | wfljvEHJo4Wzq8B05 | deployed | AI citește NIR-urile din `Facturare` (model pentru motorul 0) |
| Automation 2 | wfl4CJ7j8DdmtKrWE | deployed, **moartă** (cron unic 23.03.2026) | de oprit de Daniel, apoi de șters |
| F2.3 SmartBill Motor — De emis factura | wflcDw0zztsIIHZ40 | deployed | la status financiar `De emis factura` emite factura finală (ciornă, serie FFITC, scade avansul). **Are credențialele SmartBill în clar în script** — de mutat pe `⚙️ Config` |
| F2.6 Bilka AI → Ofertare | wflMqenjSBzRHQJfq | undeployed | de evaluat |
| PUNTE — Livrare mâine → alertă Telegram | wflycO7sOfg95PRSY | **undeployed** | trimite email la mailhook-ul PUNTE 1 când statusul devine `Livare maine ` |
| Motoare 0 / A / B | — | **neinstalate**; `create_automation` blocat de filtrul de siguranță | `management/motoare/` |

## Make — echipa 1521547, org 3320758 (conector MCP `mcp__Make__*`)

Conexiuni: Airtable `13998011`, Telegram bot `13294170`. Chat Telegram Daniel: `7486183573`.

| Scenariu | ID | Program | Stare / versiune |
|---|---|---|---|
| PUNTE 1 — alertă instant | 9737372 | instant (mailhook 4345579, filtru subiect «🚚 LIVRARE MÂINE») | activ, dar **fără sursă** (automatizarea Airtable e undeployed); 3 execuții, toate teste |
| PUNTE 2 — briefing | 9737881 | L–V **07:30** (cât merge la Daniel; 08:50 când trece la Antonia) | v3 (03.09), `management/make/punte2_v3.json`, ~19 op |
| PUNTE 3 — raport de seară | 9737514 | **L–S 17:30** | v3 (03.09), `management/make/punte3_v3.json`, ~46 op; scrie `📊 Zile` prin upsert |
| PUNTE 4 — captură `/o` `/c` | 9743378 | instant (hook 4347890) | v2 (02.09), `management/make/punte4_v2.json`; **0 folosiri reale** |
| copii blueprint | — | — | `management/make/punte1_v1.json`, `punte2_v3.json`, `punte3_v3.json`, `punte4_v2.json` |
| Integration Email, Text parser, Airtable | 9181226 | inactiv | păstrat: conexiunea IMAP + parser Bilka — baza capturii din „Trimise" |

Toate PUNTE au `confidential: true`, `dlq: true`, handler Break (3 reîncercări) pe fiecare Search Airtable.
Bugetul: ~1.700 op/lună din 10.000.

## Telegram

Un singur chat destinatar azi: Daniel (`7486183573`). Antonia nu a dat încă `/start` botului; când
revine: chat ID-ul ei intră în PUNTE 2 (modulul 9) și PUNTE 2 revine la 08:50 cu titlul ei
(variabila `antonia_in_concediu` = „nu" în modulul 40 al ambelor scenarii).

## SmartBill

CIF `RO34325848`, serie facturi `FFITC`, TVA 21%, endpoint `https://ws.smartbill.ro/SBORO/api`
(`/invoice`, `/estimate`, `/series?cif=&type=e|f`). Credențialele: **numai** în `⚙️ Config` (de completat
de Daniel) și, temporar, în scriptul F2.3. Nu se pun niciodată în apeluri de unelte, în Make sau în repo.

## Repo

Branch `claude/antonia-delegation-management-vvt3xe`, fără PR. Ultimele commit-uri: af5cd06 (motoare),
2d977ad (audit + raport v3), 151824c (raport v2). Backup-urile Airtable cu date personale au fost doar în
scratchpad-ul sesiunii (`airtable-backup-2026-09-01.tar.gz`) — **nu în repo**; se refac prin API la nevoie.

## Programări externe

Check-in Claude Code: `trig_01Ud4qJuoinakP8Yh5z6tBT8` la 2026-09-03T15:00Z (verifică `Created by` și
rulările). Poate fi șters dacă sesiunea se schimbă.

## Deschise (detaliile în `CLICURI-DANIEL.md`)

Token SmartBill în `⚙️ Config` · instalarea motoarelor 0/A/B · mail-exemplu către furnizor pentru captura
din „Trimise" · data întoarcerii Antoniei · cont Airtable separat + `Created by` · act adițional RI ·
deploy PUNTE — Livrare mâine · oprire Automation 2 · 14 coloane 🗑️ · adresa/programul biroului ·
corecturi de date · notificări Make · decizie istoric git · testul `/c`.
