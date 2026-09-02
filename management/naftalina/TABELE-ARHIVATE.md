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

- `⚠️ SANDBOX — Ofertare` (243 rânduri) și `Persoane` (307 rânduri) — argumentate separat, așteaptă
  decizia lui Daniel.
- `Încasări Clienți` (128) și `Cheltuieli Operaționale` (308) — au date reale, se repară în fazele
  următoare.
