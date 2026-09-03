# MOTOR 0 — PDF atașat → câmpurile se completează singure

Model: `Automation 1` din bază (citește NIR-urile cu AI) — același tip de pas, alt prompt, alte câmpuri.

## Trigger

„When a record is updated" → tabel `Ofertare` → câmp urmărit: `Scan_Oferta / Formular`.

## Pasul 1 — Conditional logic

Condiție: `Extras din PDF` **is unchecked**. (Debifarea forțează o nouă citire.)

## Pasul 2 — Generate with AI → Structured output

Model: cel implicit (Automation 1 folosește GPT-4.1 mini), randomness 0, cu atașamentele din
`Scan_Oferta / Formular` inserate la finalul promptului.

**Prompt:**

```
Ești asistentul de birou al firmei INVEST TETTO CONSTRUCT SRL (PeAcoperis.ro, Pitești), care vinde și
montează acoperișuri și garduri metalice. Primești documentele atașate unei oferte. Ignoră fișierele care
nu sunt PDF (de ex. .xlsm). Extrage STRICT ce e scris, nu inventa; când o informație lipsește lasă textul
gol sau numărul 0.

1. tip_document — alege UNA din variante:
 - "oferta_itc_catre_client": documentul e generat de calculatorul Bilka/ITC și în „INFO VANZATOR" apare
   Invest Tetto Construct (sau Neacsu Daniel ca reprezentant vânzări); cumpărătorul e clientul final.
   Prețurile sunt de VÂNZARE.
 - "oferta_furnizor_catre_itc": documentul e emis de un furnizor (Caretta, Bilka, Wetterbest, SAF, Unimat
   etc.) către INVEST TETTO CONSTRUCT ca „client". Prețurile sunt de COST.
 - "altceva": orice altceva.

2. Datele clientului final (doar pentru oferta_itc_catre_client, din blocul „INFO CUMPARATOR" sau „Date
   client"): nume_client, telefon_client (doar cifre, așa cum apare), localitate_client (localitatea
   șantierului dacă există, altfel localitatea clientului), judet_client, cnp_client (CNP sau CUI, doar
   caracterele alfanumerice). Pentru oferta furnizorului aceste câmpuri rămân goale — NU pune datele firmei
   INVEST TETTO acolo.

3. Totaluri: total_lei_tva_inclus = valoarea de la „TOTAL - TVA INCLUS (LEI)" sau echivalent, ca număr fără
   separatori de mii (ex. 2856.41); total_eur_tva_inclus = valoarea de la „TOTAL - TVA INCLUS (EURO)";
   curs_eur = cursul folosit (ex. 5.3000). Dacă există „cu reducere" și „fără reducere", ia varianta CU
   reducere.

4. produs_principal = modelul/produsul principal (ex. „T 18 P 8017 DPM 0.40" sau „GARD CARETTA ORIZONTAL
   X 135"); emitent_document = firma care a emis documentul.

Documentele atașate: {Scan_Oferta / Formular}
```

**Schema (structured output):**

| Proprietate | Tip |
|---|---|
| `tip_document` | text, valori permise: `oferta_itc_catre_client`, `oferta_furnizor_catre_itc`, `altceva` |
| `nume_client`, `telefon_client`, `localitate_client`, `judet_client`, `cnp_client` | text |
| `total_lei_tva_inclus`, `total_eur_tva_inclus`, `curs_eur` | număr |
| `produs_principal`, `emitent_document` | text |

## Pasul 3 — Run a script

Input variables (nume → valoare din pasul AI): `recordId` → Record ID (trigger); `tip`, `nume`, `telefon`,
`localitate`, `cnp`, `totalLei`, `totalEur`, `curs`, `produs`, `emitent` → proprietățile corespunzătoare.

```js
// MOTOR 0 — PDF atasat -> campurile se completeaza singure (creat 03.09.2026)
// Regula de aur: NU suprascrie nimic tastat de mana. Scrie doar in campurile goale.
const c = input.config();
const table = base.getTable("Ofertare");
const r = await table.selectRecordAsync(c.recordId);
if (!r) throw new Error("Record negasit: " + c.recordId);

const gol = (f) => { const v = r.getCellValue(f); return v === null || v === undefined || v === "" || (Array.isArray(v) && v.length === 0); };
const txt = (x) => (x === null || x === undefined) ? "" : String(x).trim();
const num = (x) => { const n = Number(x); return isFinite(n) ? n : 0; };

const tip = txt(c.tip);
const totalLei = num(c.totalLei), totalEur = num(c.totalEur), curs = num(c.curs);
const upd = {};
let motive = [];

if (tip === "oferta_itc_catre_client") {
  upd["Tip document PDF"] = { name: "Ofertă ITC către client" };
  if (gol("Nume Beneficiar ") && txt(c.nume)) { upd["Nume Beneficiar "] = txt(c.nume); motive.push("nume"); }
  if (gol("Telefon / Nr Contact") && txt(c.telefon).replace(/\D/g, "").length >= 9) { upd["Telefon / Nr Contact"] = txt(c.telefon); motive.push("telefon"); }
  if (gol("Locatie proiect") && txt(c.localitate)) { upd["Locatie proiect"] = txt(c.localitate); motive.push("localitate"); }
  if (gol("CNP / CUI ") && txt(c.cnp).replace(/\W/g, "").length >= 8) { upd["CNP / CUI "] = txt(c.cnp).replace(/\s+/g, ""); motive.push("cnp"); }
  if (gol("Valoare Oferta acceptata ") && totalLei > 0) { upd["Valoare Oferta acceptata "] = Math.round(totalLei * 100) / 100; motive.push("valoare"); }
  if (gol("Valoare_Oferta_EUR") && totalEur > 0) { upd["Valoare_Oferta_EUR"] = Math.round(totalEur * 100) / 100; }
  if (gol("Curs_BNR") && curs > 0) { upd["Curs_BNR"] = curs; }
} else if (tip === "oferta_furnizor_catre_itc") {
  upd["Tip document PDF"] = { name: "Ofertă furnizor către ITC" };
  if (gol("Curs_BNR") && curs > 0) { upd["Curs_BNR"] = curs; }
  motive.push("pret de cost, nu s-a copiat in valoare");
} else {
  upd["Tip document PDF"] = { name: "Altceva" };
}
if (totalLei > 0) upd["Valoare din PDF (lei)"] = Math.round(totalLei * 100) / 100;

// bifam "Extras din PDF" doar daca AI-ul a inteles documentul
if (totalLei > 0 || tip !== "altceva") upd["Extras din PDF"] = true;

if (Object.keys(upd).length) await table.updateRecordAsync(c.recordId, upd);
console.log(`tip=${tip} emitent=${txt(c.emitent)} produs=${txt(c.produs)} totalLei=${totalLei} totalEur=${totalEur} curs=${curs} | completat: ${motive.join(", ") || "nimic nou"}`);
output.set("tip", tip);
output.set("completat", motive.join(", "));
```

## Verificat pe documente reale (03.09)

- PDF din calculatorul Bilka („OFERTA SISTEM PENTRU ACOPERIS"): are `TOTAL - TVA INCLUS (LEI) 2,856.41`,
  `TOTAL - TVA INCLUS (EURO) 538.95`, curs `5.3000`, blocul INFO CUMPARATOR (gol în exemplu — se
  completează în calculator, altfel rămân goale și în Airtable). Înregistrarea avea valoarea tastată
  2.900 → nu se suprascrie.
- PDF Caretta („Ofertă NR 249740 … INVEST TETTO CONSTRUCT"): `TOTAL - TVA INCLUS (LEI) 2447.9` = preț de
  cost; înregistrarea avea 3.600 (prețul de vânzare). De aceea valoarea din PDF-ul furnizorului **nu** se
  copiază niciodată în `Valoare Oferta acceptata`.
- Fișierul `.xlsm` (2,5 MB) nu poate fi citit de AI; e în același câmp, promptul îl ignoră.
