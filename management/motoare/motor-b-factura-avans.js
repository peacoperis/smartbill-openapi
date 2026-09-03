// MOTOR B — dovada de plata / cash -> factura de avans + De comandat (creat 03.09.2026)
// Airtable Automation: trigger "When a record is updated" pe Ofertare, campuri urmarite:
//   Scan_Doc Plati · Mod Plată Avans
// Actiune: Run a script, input variable: recordId = Record ID (trigger)
// Scriptul verifica singur conditiile: proforma emisa, Avans_Confirmat nebifat, si (dovada atasata SAU mod = cash).
// DRAFT_MODE (din ⚙️ Config): "da" = factura apare ca CIORNA in SmartBill (o validezi cu un clic);
//                              "nu" = se emite direct. Recomandare: "da" pana la primele 3 corecte.

const config = input.config();
const recordId = config.recordId;
const SB_BASE = "https://ws.smartbill.ro/SBORO/api";

async function cfg() {
  const t = base.getTable("⚙️ Config");
  const q = await t.selectRecordsAsync({ fields: ["Cheie", "Valoare"] });
  const m = {};
  for (const r of q.records) m[(r.getCellValueAsString("Cheie") || "").trim()] = (r.getCellValueAsString("Valoare") || "").trim();
  return m;
}
function b64(s) {
  const t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'; let r = '';
  for (let i = 0; i < s.length; i += 3) { const a = s.charCodeAt(i), b = s.charCodeAt(i + 1), c = s.charCodeAt(i + 2);
    r += t[a >> 2] + t[((a & 3) << 4) | (b >> 4)] + ((i + 1 < s.length) ? t[((b & 15) << 2) | (c >> 6)] : '=') + ((i + 2 < s.length) ? t[c & 63] : '='); }
  return r;
}

async function main() {
  const table = base.getTable("Ofertare");
  const r = await table.selectRecordAsync(recordId);
  if (!r) throw new Error("Record negasit: " + recordId);

  if (r.getCellValue("Avans_Confirmat")) { output.set("status", "skip: avans deja confirmat"); return; }
  const idProforma = (r.getCellValueAsString("ID_Proforma_SmartBill") || "").trim();
  if (!idProforma) { output.set("status", "skip: nu exista proforma"); return; }
  const dovezi = r.getCellValue("Scan_Doc Plati ") || [];
  const modPlata = (r.getCellValueAsString("Mod Plată Avans") || "").trim().toLowerCase();
  const eCash = modPlata.indexOf("cash") >= 0;
  if (!dovezi.length && !eCash) { output.set("status", "skip: nici dovada, nici cash"); return; }

  const C = await cfg();
  if (!C.SB_EMAIL || !C.SB_TOKEN) throw new Error("Completeaza SB_EMAIL si SB_TOKEN in tabelul ⚙️ Config");
  const SB_CIF = C.SB_CIF || "RO34325848";
  const SB_SERIE = C.SB_SERIE_FACTURA || "FFITC";
  const DRAFT = (C.DRAFT_MODE || "da").toLowerCase() !== "nu";
  const HDR = { "Content-Type": "application/json", "Accept": "application/json", "Authorization": "Basic " + b64(C.SB_EMAIL + ":" + C.SB_TOKEN) };

  const nume    = (r.getCellValueAsString("Nume Beneficiar ") || "").trim();
  const cnp     = (r.getCellValueAsString("CNP / CUI ") || "").replace(/\s+/g, "");
  const locatie = (r.getCellValueAsString("Locatie proiect") || "").trim();
  const idOp    = (r.getCellValueAsString("Id Client operational") || "").trim();
  const idNum   = r.getCellValueAsString("Id client") || "";
  const adresa  = r.getCellValueAsString("Adresa Facturare") || locatie;
  const oras    = r.getCellValueAsString("Localitate Facturare") || locatie;
  const judet   = r.getCellValueAsString("Judeţ Facturare") || "";
  const email   = r.getCellValueAsString("Email Client") || "";
  const avans   = Number(r.getCellValue("💵 Valoare Avans") || 0);
  if (!(avans > 0)) throw new Error("«Valoare Avans» lipseste sau e 0 - nu pot emite factura de avans");
  if (!cnp) throw new Error("Lipseste CNP/CUI");

  const azi = new Date().toISOString().split("T")[0];
  const body = {
    companyVatCode: SB_CIF,
    client: { name: nume, vatCode: cnp, address: adresa, city: oras, county: judet, country: "Romania", email: email, isTaxPayer: /^RO/i.test(cnp), saveToDb: false },
    issueDate: azi, seriesName: SB_SERIE, isDraft: DRAFT,
    currency: "RON", language: "RO", precision: 2,
    products: [{ name: `Avans conform proformei ${idProforma} - comanda ${idOp} ${locatie}`.trim(), code: `AV-${idOp || idNum}`, isService: true, measuringUnitName: "buc", currency: "RON", quantity: 1, price: avans, isTaxIncluded: true, taxName: "Normala", taxPercentage: 21, saveToDb: false }],
    mentions: `Avans incasat (${modPlata || "dovada atasata"}) conform proformei ${idProforma}. Se regularizeaza la factura finala. Ref. ITC-${idNum} / ${idOp}.`
  };

  const res = await fetch(`${SB_BASE}/invoice`, { method: "POST", headers: HDR, body: JSON.stringify(body) });
  const txt = await res.text();
  console.log(`SmartBill /invoice HTTP ${res.status}: ${txt.substring(0, 300)}`);
  if (!res.ok) throw new Error(`SmartBill factura avans eroare ${res.status}: ${txt.substring(0, 200)}`);
  let j = {}; try { j = JSON.parse(txt); } catch (e) {}
  const numar = j.number || (j.invoice && j.invoice.number) || (DRAFT ? "CIORNA" : "?");
  const nrFactura = `${j.series || SB_SERIE}-${numar}`;

  await table.updateRecordAsync(recordId, {
    "Nr. Factură Avans": nrFactura,
    "Avans_Confirmat": true,
    "Status Avans": { name: "🟢 Încasat" },
    "Status Oferta F1": { name: "De Comandat " }
  });
  output.set("status", "ok");
  output.set("factura", nrFactura);
  console.log(`OK factura de avans ${nrFactura} pe ${avans} lei pentru ${idOp}; status -> De Comandat`);
}
await main();
