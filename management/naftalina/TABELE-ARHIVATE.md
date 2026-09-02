# Tabele Airtable arhivate — schema completă înainte de ștergere

Baza „test #" (`appdbikkM2awYhpoM`). Backup integral al datelor: `airtable-backup-2026-09-01.tar.gz`
(20 de tabele, 2.360 înregistrări + schema), livrat lui Daniel. Tabelele de mai jos nu au fost
atinse între data backupului și data ștergerii, deci backupul le acoperă integral.

---

## Sistemul de paleți v1 (04–05.05.2026) — trei tabele, model FIFO

**De ce a existat:** un model lot → retur → alocare FIFO pe locație. Scenariul din specificație era
„Bascov: 3 paleți reveniți din Bascov fără referință la factură" — deci alocarea trebuia ghicită.

**De ce a murit în 24 de ore:** realitatea nu are problema asta. Unitatea e **rândul de factură**
(1 factură Bilka = 1 palet în 404 din 410 cazuri), iar storno-ul Bilka vine **cu numărul facturii și
cu data/locația livrării**, pe care Antonia le scrie direct pe rândul livrării. În 410 rânduri de
registru există un singur retur cu adevărat ambiguu. Modelul rezolva o problemă pe care datele nu o au.

**Înlocuit de:** câmpurile de pe rândul facturii din `Facturare` (`Numar Paleti Livrare`, `Tip Palet`,
`Factură Storno Palet`, `Nr Paleți Storno`, `Data Storno Palet`) + rollup-urile de pe `Furnizori`.

### `Loturi Paleți Primiți` (tblaW8RbCpeTX2Jva) — 1 rând, complet gol

| Câmp | Tip | Opțiuni |
|---|---|---|
| Cod Lot | singleLineText | primar |
| Factură Sursă | multipleRecordLinks | → Facturare |
| Furnizor | singleSelect | Bilka, Belprofile, Wetterbest, Caretta, Top Profil, Muntenia, Unimat, Furnizori 1, Furnizori 2 |
| Locație | singleLineText | |
| Tip Palet | singleSelect | Palet lemn, Euro palet, Stand metalic, Palet metalic |
| Nr Paleți Primiți | number | |
| Data Primire | date | |
| Notă | multilineText | |
| Storno Alocări | multipleRecordLinks | → Alocări Paleți |

### `Retururi Paleți` (tbl5jtQAXp1j03mNa) — 0 rânduri

| Câmp | Tip | Opțiuni |
|---|---|---|
| Cod Retur | singleLineText | primar |
| Furnizor | singleSelect | aceleași 9 |
| Locație | singleLineText | |
| Nr Paleți Reveniți Total | number | |
| Factură Storno | singleLineText | |
| Data Retur | date | |
| Sursă Mail | multilineText | |
| Atașamente | multipleAttachments | |
| Notă | multilineText | |
| Distribuție pe Loturi | multipleRecordLinks | → Alocări Paleți |

### `Alocări Paleți` (tbl62lyV050XBDqjp) — 1 rând, complet gol

| Câmp | Tip | Opțiuni |
|---|---|---|
| Cod Alocare | singleLineText | primar |
| Lot | multipleRecordLinks | → Loturi Paleți Primiți |
| Retur | multipleRecordLinks | → Retururi Paleți |
| Nr Paleți Alocați | number | |
| Tip Alocare | singleSelect | FIFO automat, Override manual, Estimat istoric |
| Notă | multilineText | |

---

## `Inbox Storno` (tblqtKQ4iX4DJRhi5) — 12 rânduri, o singură zi

**De ce a existat:** zona de aterizare pentru mailurile structurate de storno ambalaj de la Bilka
(„La livrarea din DD.MM.YYYY de la LOCALITATE, PALETI LIVRATI / FACTURATI / RETURNATI"), parsate de
un POC în Make, urmând să fie potrivite automat cu facturile.

**De ce a murit:** a rulat o singură dată, 05.05.2026 între 13:17 și 13:55. Toate cele 12 înregistrări
au rămas `⏸️ În procesare`, cu `Tip Caz` gol, `Linked Facturi` 0 și `Storno Minus Generat` 0. Din cele
12 rânduri există doar **8 numere unice** (9002244604 și 9002247796 apar de câte 3 ori) — cheia unică
declarată în descriere nu fusese aplicată. Parsarea lăsa gunoi în „Locație Mail"
(`"CALINESTI\n\nPALETI LIVRATI"`). Toate cele 8 numere reale erau deja în Excel, în coloana G din
`Situatie paleti`, cu locație și dată concordante.

**Cauza de fond:** numărul din mail e al facturii **de ambalaj**, nu al livrării de marfă — deci
potrivirea automată pe număr nu avea cum să reușească.

| Câmp | Tip | Opțiuni |
|---|---|---|
| Nr Factură Storno | singleLineText | primar |
| Data Procesare | date | |
| Furnizor | singleSelect | cele 9 |
| Sender Email | email | |
| Sender Nume | singleLineText | |
| Subject | singleLineText | |
| Body | multilineText | |
| PDF Atașat | multipleAttachments | |
| Data Livrare Mail | date | |
| Locație Mail | singleLineText | |
| Nr Paleți Livrați | number | |
| Nr Paleți Facturati | number | |
| Nr Paleți Returnați | number | |
| Tip Caz | singleSelect | 1. Auto-matched, 2. Multi-locație, 3. Palet ratat, 4. Mismatch, 0. Istoric |
| Status Match | singleSelect | ✅ Matched automat, 🟡 Verifică, ✅ Manual, ⏸️ În procesare |
| Linked Facturi | multipleRecordLinks | → Facturare |
| Storno Minus Generat | multipleRecordLinks | → Facturare |
| Notă | multilineText | |

**Dacă se reconstruiește:** mailul Bilka trebuie potrivit după **data + localitatea livrării**, nu după
numărul facturii de ambalaj. Un storno acoperă frecvent mai multe livrări din aceeași zi (71 de cazuri
în Excel, până la 6 rânduri pe un singur număr). Emailul sursă: `gabriela.peptine@bilka.ro`.

---

## `Automation 2` (wfl4CJ7j8DdmtKrWE) — automatizare Airtable

Declanșator: `cron` de tip **oneTime**, la `2026-03-23T13:00:00Z`. A tras o singură dată, în martie
2026, și nu mai poate porni niciodată. Structură: `findRecords` → `repeatingGroup` → `updateRecord`.
Era, după toate semnele, o migrare de date rulată o dată. Rămăsese „deployed" în listă, încurcând
citirea a ceea ce e efectiv activ.

---

## Ce NU s-a șters

`Încasări Clienți` (128) și `Cheltuieli Operaționale` (308) — au date reale, se repară în fazele
următoare.

---

## `Persoane` (tblw34HPU0UFE5LY2) — 307 rânduri, șters 02.09.2026

**Ce era:** o încercare de listă unificată de contacte, cu normalizare de telefon și rol
(Client direct / Colaborator / Beneficiar facturare). Creată în 2 zile (26.05 și 08.07.2026).

**De ce s-a șters:** era legat **doar** de tabelul SANDBOX, nu de `Ofertare`. Din 121 de numere de
telefon, **doar 3** nu existau deja în `Ofertare` sau `Clienți`. Din 194 de nume, 14 nu apăreau în
`Ofertare.Nume Beneficiar`, iar 4 dintre acelea erau intrări de test („meme", „test vasile", „ion" cu
telefonul „11", „tica ghoerghe" cu „0908"). Peste 98% duplicat. Numele real al clientului stă oricum
în `Ofertare.Nume Beneficiar`, completat pe toate cele 514 rânduri.

**Ideea care merită păstrată:** câmpul `Telefon Normalizat` (ultimele 9 cifre), care permite
potrivirea contactelor indiferent cum a fost scris numărul. De reluat pe `Clienți` dacă apare nevoia.

### Cele 12 contacte reale care existau doar aici

Numerele de telefon sunt în arhiva `airtable-backup-2026-09-01.tar.gz` (nu se pun în repo).

| Nume | Rol |
|---|---|
| Dina Viorel | Client direct |
| Vlasceanu Silvia | Client direct |
| Popescu Georgeta | Client direct |
| Daniel (IANIS EXPRESS CARGO S.R.L.) | Client direct |
| Porojan Ionela porti | Client direct |
| Stancutu Nicolae | Client direct |
| Mosoaia (Smeura) gard Caretta | Client direct |
| Marian | Client direct |
| Vali Lisenche | Client direct |
| Preda Daniel | Client direct |
| Flavius Bujgoi | Colaborator |
| Cristi Boaca | Colaborator |

### Schema

| Câmp | Tip |
|---|---|
| Display | formula (primar) |
| Nume Complet | singleLineText |
| Telefon | phoneNumber |
| Telefon Normalizat | formula |
| Rol | multipleSelects (Client direct, Colaborator, Beneficiar facturare) |
| Email, Notă, CNP/CUI, Adresă | text |
| Ofertare copy | multipleRecordLinks → SANDBOX |

---

## `⚠️ SANDBOX — Ofertare` (tbl3Mr6ULNPwoeGaJ) — 243 rânduri, șters 02.09.2026

**Ce era:** o copie a tabelului `Ofertare`, făcută ca loc de teste. 69 de câmpuri, înregistrări create
între 15.01 și 08.07.2026.

**De ce s-a șters — patru motive, în ordinea gravității:**

1. **Nu era izolat.** Șapte tabele vii (`Facturare`, `Ponou Control`, `Plăți Furnizori`,
   `Încasări Clienți`, `Cheltuieli Operaționale`, `Clienți`, `Persoane`) aveau fiecare câte un câmp
   „Ofertare copy" care arăta **spre** el. Un test făcut acolo atingea tabelele de producție. Un
   sandbox legat de producție nu e sandbox.
2. **Spărgea convenția `ITC-`.** Numerotarea lui automată se suprapunea cu cea din `Ofertare`, deci
   codurile `ITC-nnn` nu mai erau unice în bază — exact cheia pe care se sprijină reconcilierea
   bancară planificată (motorul C).
3. **Era vechi:** 243 de rânduri față de 514 în producție, ultima atingere 08.07.2026.
4. **Nu conținea informație nouă:** din 121 de numere de telefon, **unul singur** nu exista în
   `Ofertare`.

**Alternativa corectă pentru teste:** duplicarea întregii baze (un clic în Airtable). Aia e izolată cu
adevărat — o folosești, o arunci, o refaci.

**Schema:** 69 de câmpuri, un subset al celor 84 din `Ofertare` la data copierii. Recuperabilă
integral din arhivă. Nu se reconstruiește ca tabel — dacă e nevoie de teste, se duplică baza.

---

## Scenarii Make șterse 02.09.2026 — 9 bucăți, toate cu ZERO execuții de la creare

Criteriul: `executions: 0` de la data creării. Niciunul nu a rulat vreodată.

| ID | Nume | Creat | Module | Ce încerca |
|---|---|---|---|---|
| 8416649 | `C 2026` | 05.01.2026 | Airtable Watch → Create → Update | Sincronizare Airtable→Airtable, la 15 min |
| 6618496 | `Integration Airtable` | 04.08.2025 | Airtable Watch → Telegram | Notificare pe Telegram la înregistrare nouă |
| 4274959 | `Integration Email` | 19.03.2025 | Email Trigger | Doar declanșatorul, fără nimic după |
| 8567794 | `Integration HTTP` | 28.01.2026 | Airtable Watch → HTTP → Update | Apel HTTP la modificare de înregistrare |
| 7612555 | `Integration Telegram Bot` | 13.10.2025 | Telegram + regexp + Airtable + DumplingAI (transcript YouTube) | Bot cu router: căutare/creare în Airtable + transcript YouTube. **Webhook 3381399** |
| 8282907 | `Integration Telegram Bot` | 11.12.2025 | Telegram + OpenAI + Google Calendar | Bot care crea evenimente în calendar din mesaje. **Webhook 3688827** |
| 5421669 | `Leaduri peacoperis` | 25.05.2025 | Google Calendar → Airtable | Leaduri din evenimente de calendar |
| 4274750 | `secenariu smslink` | 19.03.2025 | HTTP Send | Trimitere SMS prin SMSLink |
| 9488816 | `YouTube → Tetto_Second_Brain [DRAFT - NU RULA]` | 06.07.2026 | YouTube + OpenAI + Google Drive | Rezumate de videoclipuri în Drive. Marcat de Daniel „NU RULA" |

**De ce contau cele două „Integration Telegram Bot":** aveau webhook-uri înregistrate pe boți Telegram.
Un al doilea scenariu care ascultă pe același bot poate intercepta mesaje destinate scenariului activ
(PUNTE 4 — captura de ofertă). Ștergerea lor elimină capcana.

**Păstrat:** `Integration Email, Text parser, Airtable` (9181226) — parserul de mail Bilka cu 3 module
regexp, baza motorului de ingestie automată a facturilor de furnizor. Inactiv, dar util.

Make: **14 → 5 scenarii** (cele 4 PUNTE + parserul Bilka).
