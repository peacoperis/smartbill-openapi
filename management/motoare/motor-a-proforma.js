// MOTOR A — CNP introdus -> proforma SmartBill (creat 03.09.2026)
// Airtable Automation: trigger "When a record matches conditions" pe Ofertare:
//   CNP / CUI is not empty · Proformă Generată is unchecked · ID_Proforma_SmartBill is empty ·
//   Valoare Oferta acceptata is not empty · ✅ Fără Avans (Trust) is unchecked ·
//   Status Oferta F1 is any of: Ofertat, De ofertat, Procedura de avans, DE MASURAT
// Actiune: Run a script, input variable: recordId = Record ID (trigger)
// Regula: avans = «Valoare Avans» daca e deja completata; altfel PROCENT_AVANS% din valoare;
//         altfel toata suma daca valoarea e sub PRAG_INTEGRAL.
// Credentialele se citesc din tabelul «⚙️ Config» (Cheie / Valoare) — nu stau in cod.

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
  const C = await cfg();
  if (!C.SB_EMAIL || !C.SB_TOKEN) throw new Error("Completeaza SB_EMAIL si SB_TOKEN in tabelul ⚙️ Config");
  const SB_CIF = C.SB_CIF || "RO34325848";
  const PROCENT = (Number(C.PROCENT_AVANS) || 30) / 100;
  const PRAG = Number(C.PRAG_INTEGRAL) || 1000;
  const HDR = { "Content-Type": "application/json", "Accept": "application/json", "Authorization": "Basic " + b64(C.SB_EMAIL + ":" + C.SB_TOKEN) };

  const table = base.getTable("Ofertare");
  const r = await table.selectRecordAsync(recordId);
  if (!r) throw new Error("Record negasit: " + recordId);
  if (r.getCellValue("Proformă Generată") || r.getCellValueAsString("ID_Proforma_SmartBill")) { output.set("status", "skip: proforma exista deja"); return; }

  const nume    = (r.getCellValueAsString("Nume Beneficiar ") || "").trim();
  const cnp     = (r.getCellValueAsString("CNP / CUI ") || "").replace(/\s+/g, "");
  const locatie = (r.getCellValueAsString("Locatie proiect") || "").trim();
  const idOp    = (r.getCellValueAsString("Id Client operational") || "").trim();
  const idNum   = r.getCellValueAsString("Id client") || "";
  const adresa  = r.getCellValueAsString("Adresa Facturare") || locatie;
  const oras    = r.getCellValueAsString("Localitate Facturare") || locatie;
  const judet   = r.getCellValueAsString("Judeţ Facturare") || "";
  const email   = r.getCellValueAsString("Email Client") || "";
  const valoare = Number(r.getCellValue("Valoare Oferta acceptata ") || 0);
  const avansExistent = Number(r.getCellValue("💵 Valoare Avans") || 0);
  if (!nume) throw new Error("Lipseste numele clientului");
  if (!cnp) throw new Error("Lipseste CNP/CUI");
  if (!(valoare > 0)) throw new Error("Lipseste valoarea ofertei");

  const avans = avansExistent > 0 ? avansExistent : (valoare < PRAG ? Math.round(valoare * 100) / 100 : Math.round(valoare * PROCENT));
  const procent = Math.round(avans / valoare * 100);

  // seria de proforme: din Config, altfel prima serie de tip proforma din cont
  let serie = C.SB_SERIE_PROFORMA || "";
  if (!serie) {
    const sres = await fetch(`${SB_BASE}/series?cif=${SB_CIF}&type=e`, { headers: HDR });
    const stxt = await sres.text();
    let sj = {}; try { sj = JSON.parse(stxt); } catch (e) {}
    const lista = sj.list || sj.series || [];
    if (!sres.ok || !lista.length) throw new Error("Nu am gasit nicio serie de proforme in SmartBill: " + stxt.substring(0, 200));
    serie = lista[0].name;
    console.log("Serie proforma folosita: " + serie + " (disponibile: " + lista.map(x => x.name).join(", ") + ")");
  }

  const azi = new Date().toISOString().split("T")[0];
  const scadenta = new Date(Date.now() + 5 * 86400000).toISOString().split("T")[0];
  const body = {
    companyVatCode: SB_CIF,
    client: { name: nume, vatCode: cnp, address: adresa, city: oras, county: judet, country: "Romania", email: email, isTaxPayer: /^RO/i.test(cnp), saveToDb: false },
    issueDate: azi, dueDate: scadenta, seriesName: serie,
    currency: "RON", language: "RO", precision: 2,
    products: [{ name: `Avans comanda ${idOp} - ${locatie}`.trim(), code: `AV-${idOp || idNum}`, isService: true, measuringUnitName: "buc", currency: "RON", quantity: 1, price: avans, isTaxIncluded: true, taxName: "Normala", taxPercentage: 21, saveToDb: false }],
    mentions: `Avans ${procent}% din oferta de ${valoare.toFixed(2)} lei (TVA inclus). Referinta plata: ITC-${idNum} / ${idOp}.`
  };

  const res = await fetch(`${SB_BASE}/estimate`, { method: "POST", headers: HDR, body: JSON.stringify(body) });
  const txt = await res.text();
  console.log(`SmartBill /estimate HTTP ${res.status}: ${txt.substring(0, 300)}`);
  if (!res.ok) throw new Error(`SmartBill proforma eroare ${res.status}: ${txt.substring(0, 200)}`);
  let j = {}; try { j = JSON.parse(txt); } catch (e) {}
  const numar = j.number || (j.estimate && j.estimate.number) || "?";
  const idProforma = `${j.series || serie}-${numar}`;

  await table.updateRecordAsync(recordId, {
    "ID_Proforma_SmartBill": idProforma,
    "Proformă Generată": true,
    "💵 Valoare Avans": avans,
    "Status Oferta F1": { name: "Procedura de avans " }
  });
  output.set("status", "ok");
  output.set("proforma", idProforma);
  output.set("avans", avans);
  console.log(`OK proforma ${idProforma} pe ${avans} lei (${procent}%) pentru ${idOp}`);
}
await main();
