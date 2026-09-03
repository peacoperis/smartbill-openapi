# Motoarele fluxului de comandă — „să rămână doar golul lipsei"

03.09.2026. Daniel: „am plecat de la înlocuirea acțiunilor repetitive din Airtable […] ne-am concentrat pe
raportul pe care-l primim; practic am început invers". Corect. Aici e motorul, în trei piese, în ordinea
fluxului lui:

| Motor | Declanșator | Ce face singur | Fișier |
|---|---|---|---|
| **0 — PDF → câmpuri** | se schimbă `Scan_Oferta / Formular` și `Extras din PDF` nu e bifat | AI citește PDF-ul, recunoaște dacă e oferta ITC către client (calculatorul Bilka) sau oferta unui furnizor către ITC (Caretta), completează **doar câmpurile goale**: nume, telefon, localitate, CNP, valoare (doar dacă e oferta ITC), EUR, curs; scrie `Valoare din PDF (lei)`, `Tip document PDF`; bifează `Extras din PDF` | `motor-0-pdf-campuri.md` |
| **A — CNP → proformă** | `CNP / CUI` completat, `Proformă Generată` nebifat, `ID_Proforma_SmartBill` gol, valoare completată, `Fără Avans (Trust)` nebifat, status ∈ {Ofertat, De ofertat, Procedura de avans, DE MASURAT} | emite proforma în SmartBill pe `Valoare Avans` dacă e scrisă, altfel **30%** din valoare, altfel **toată suma sub 1.000 lei**; scrie `ID_Proforma_SmartBill`, `Valoare Avans`, bifează `Proformă Generată`, status → `Procedura de avans` | `motor-a-proforma.js` |
| **B — dovadă/cash → factură de avans** | se schimbă `Scan_Doc Plati` sau `Mod Plată Avans`; scriptul verifică: proformă emisă, `Avans_Confirmat` nebifat, și (dovadă atașată sau mod = cash) | emite factura de avans în SmartBill (serie FFITC) pe `Valoare Avans`; scrie `Nr. Factură Avans`, bifează `Avans_Confirmat`, `Status Avans` = Încasat, status → **`De Comandat`** | `motor-b-factura-avans.js` |

Ce rămâne manual după cele trei: alegerea produselor în calculator, trimiterea proformei pe WhatsApp
(faza 2: PDF-ul proformei vine pe Telegram), mailul către furnizor (faza 2: captura din „Trimise").

## De ce nu le-am putut porni eu

Crearea automatizărilor prin API a fost blocată de filtrul de siguranță al sesiunii (de trei ori, inclusiv
pentru motorul 0 care nu are nicio parolă). Scripturile sunt aici, complete și verificate pe structura reală
a bazei; instalarea e copy-paste, ~3 minute fiecare. Alternativ, Daniel poate permite explicit acțiunea
`create_automation` în sesiune și le creez eu, deja oprite, ca să le pornească el.

## Pasul 0 — o singură dată: tabelul `⚙️ Config`

Există (creat 03.09). Completează **Valoare** la:

| Cheie | Valoare | De unde |
|---|---|---|
| `SB_EMAIL` | adresa contului SmartBill | aceeași ca în scriptul F2.3 |
| `SB_TOKEN` | tokenul API SmartBill | SmartBill → Contul meu → Integrări → API (același din F2.3) |
| `SB_CIF` | `RO34325848` | pus deja |
| `SB_SERIE_FACTURA` | `FFITC` | pus deja |
| `SB_SERIE_PROFORMA` | gol = prima serie de proforme din cont; sau numele exact al seriei | SmartBill → Configurări → Serii |
| `DRAFT_MODE` | `da` la început → factura de avans apare ca **ciornă** în SmartBill; `nu` = se emite direct | decizia ta după primele 3 |
| `PROCENT_AVANS` | `30` | |
| `PRAG_INTEGRAL` | `1000` | sub această sumă proforma e pe toată valoarea |

Parolele nu mai stau în cod. **De făcut și în F2.3** (scriptul vechi le are în clar): înlocuiește constantele
cu citirea din `⚙️ Config` folosind funcția `cfg()` din oricare script de aici.

## Cum se instalează un motor (Airtable → Automations → + Create automation)

1. **Trigger**: pentru motorul 0 și B, „When a record is updated" → tabel `Ofertare` → câmpurile urmărite
   din tabelul de mai sus. Pentru motorul A, „When a record matches conditions" → condițiile din tabel.
2. **Acțiune** (motor 0 doar): „Conditional logic" → condiția `Extras din PDF` is unchecked; înăuntru
   „Generate with AI (structured output)" cu promptul și schema din `motor-0-pdf-campuri.md`, cu
   atașamentele din `Scan_Oferta / Formular` inserate în prompt.
3. **Acțiune**: „Run a script" → lipește scriptul. La „Input variables" adaugă `recordId` = Record ID din
   trigger (și, pentru motorul 0, câte o variabilă pentru fiecare ieșire a pasului AI, cu numele din script).
4. **Test** cu o înregistrare de probă (motorul A creează o proformă REALĂ în SmartBill — testează pe un
   client fictiv și șterge proforma din SmartBill după).
5. **Turn on**.

## Reguli de siguranță din scripturi

- Motorul 0 nu suprascrie niciodată un câmp completat de mână.
- Motorul A refuză să emită fără nume, CNP sau valoare, și nu emite de două ori (`Proformă Generată`).
- Motorul B refuză fără proformă sau fără `Valoare Avans`; cu `DRAFT_MODE = da` factura e ciornă.
- Toate scriu în consolă ce au făcut; la eroare, Airtable trimite email proprietarului bazei.
