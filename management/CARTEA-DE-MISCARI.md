# Cartea de mișcări — cum se face fiecare operațiune, cu capcanele găsite

Fiecare rețetă a fost executată cel puțin o dată. Capcanele sunt lucruri care au picat efectiv.

## 1. Modificarea unui scenariu Make (PUNTE 2 / 3 / 4)

1. Pornește de la copia din `management/make/<scenariu>.json` (nu reconstrui din memorie). Dacă bănuiești
   că Daniel a umblat în interfața Make, trage întâi `mcp__Make__scenarios_get` și compară `lastEdit`.
2. Modifică local cu Python (`json.load` → editare → `json.dump(ensure_ascii=False)`), apoi verifică:
   `python3 -c "import json; b=json.load(open(f)); print([m['id'] for m in b['flow']])"`.
   **Atenție (03.09):** pe calculatorul local al lui Daniel **Python nu e instalat** (doar scurtătura din
   Microsoft Store, care nu rulează nimic). Ruta asta merge doar din sesiunile care au Python; de pe local,
   blueprint-ul se editează cu alt instrument sau din interfața Make.
3. Programarea nu face parte din `blueprint`: copiile din repo o țin în cheia `scheduling` doar ca referință; la `scenarios_update` se trimite în parametrul separat `scheduling` (`{type: weekly, days: [1..5], time: "07:30"}`), și numai dacă se schimbă.
4. Trimite tot blueprintul cu `mcp__Make__scenarios_update` (`blueprint` = obiectul întreg: `name`, `flow`,
   `metadata`; `scheduling` separat dacă se schimbă). Tool-ul **înlocuiește**, nu îmbină.
5. **Run-once imediat**: `mcp__Make__scenarios_run` cu `responsive: true`. `status: 1` = succes. Daniel
   primește mesajul de probă — spune-i dinainte.
6. Verifică efectul, nu doar statusul: rândul din `📊 Zile` (`list_records_for_table` filtrat pe `Data` =
   azi) și/sau cifrele din mesaj. Un `status: 1` cu cifre greșite a trecut neobservat o zi întreagă.
7. Copiază JSON-ul final peste `management/make/…json`, commit.

**Capcane Make (toate reale):**
- **Un feeder = un agregator.** Două `util:TextAggregator` cu același `feeder` golesc ieșirea primului.
  Fiecare contor primește propria căutare (ex. modulele 1→2 și 33→32 în PUNTE 3).
- `split(text; sep)` **aruncă elementele goale**: numărul de rânduri = `length(split(text; "▪️"))`, fără
  `-1`; text gol → 0.
- Un **filtru pe un modul blochează tot lanțul din aval**, nu doar modulul, iar scenariul raportează succes.
  Condițiile de tip „doar vineri" se pun în formula Airtable, nu în filtrul modulului.
- `toNumber` nu există → `parseNumber(text; ".")`. Nu există nici `isEmpty` ca funcție: se folosește
  `length(x) = 0` sau `ifempty`.
- Aggregatoarele scot mereu un bundle, chiar cu 0 intrări (de aceea filtrele `{{N.id}} exist` stau pe
  agregator, ca să treacă bundle-ul gol mai departe). Un Search cu 0 rezultate **oprește** lanțul dacă
  după el nu e un agregator.
- Search Airtable: formulele cu `IS_SAME(... , 'YYYY-MM-DD', 'day')`, `FIND()`, `OR()` merg toate — testat
  prin `mcp__Make__rpc_execute` (`appName airtable`, `appVersion 3`, `rpcName searchRecords`, `data:
  {__IMTCONN__: 13998011, base, table, field: "Id Client operational", formula}`). Folosește RPC-ul ca să
  testezi o formulă fără să rulezi scenariul.
- `executions_get-detail` **nu întoarce modulele** pe acest cont; nu-l folosi. `executions_list` dă status
  și număr de operații.
- Schimbarea orei de programare **declanșează o rulare imediată** dacă ora nouă e în trecutul apropiat
  (s-a întâmplat: două briefinguri la 3 minute).
- Telegram `parseMode: HTML`: orice valoare din Airtable trece prin `escapeHTML()`; `<a href='…'>` cu
  ghilimele simple; peste 4.000 de caractere → mesaj de rezervă, nu trunchiere de HTML.
- Numărul de operații = numărul de module executate (agregatorul costă 1 indiferent de bundle-uri).
- Upsert în Airtable din Make: modulul `airtable:upsertRecord` v3 cu `recordId` gol = create, plin = update.
  Identificarea rândului: Search + agregator pe `{{N.id}}` + `recordId: {{agg.text}}`.
- Un router (`builtin:BasicRouter`) trebuie să fie ultimul din flow; s-a evitat folosind upsert.
- `metadata.scenario`: `confidential: true` (date personale), `dlq: true` (necesar pentru Break),
  `maxErrors: 3`. Handler: `onerror: [{module: "builtin:Break", parameters: {retry: true, count: 3,
  interval: 1}}]` pe fiecare Search.

## 2. Schema Airtable prin API

- **Se poate**: `create_field` (text, număr, currency, checkbox, select, date, **formula**, lookup, rollup,
  link), `create_table`, `update_field` (nume, descriere, formulă), `create_interface` + `create_page`
  (visualization list/kanban/grid…) + `publish_interface`, `create_records/update/delete`.
- **Nu se poate**: `createdBy` / `lastModifiedBy`, ștergerea unui câmp, ștergerea unei automatizări
  pornite, crearea de view-uri, redenumirea opțiunilor cu păstrarea ID-ului.
- Ștergerea unui tabel transformă câmpurile-legătură din alte tabele în text (au rămas 14 coloane 🗑️).
- Formulele cu opțiuni de select se compară pe **numele exact, cu spațiul final** (`'Livare maine '`).
- Filtrele MCP `list_records_for_table` cer ID-uri de câmp și ID-uri de opțiune (nu nume); `isAnyOf` pentru
  select; date ca obiect `{mode: "exactDate", exactDate, timeZone}`.
- Anunță într-o propoziție orice schimbare de schemă înainte s-o faci — două au fost refuzate la
  permisiune (03.09) fără explicație.

## 3. Verificarea zilnică (2 minute, read-only)

1. `mcp__Make__executions_list` pentru 9737881 și 9737514 cu `from` = azi 00:00 UTC în ms → status 1.
2. `list_records_for_table` pe `📊 Zile` filtrat pe azi → valorile plauzibile (fără negative).
3. `list_automations` → ce e deployed (PUNTE — Livrare mâine încă nu).
4. Dacă un scenariu a picat: `executions_list` arată `error.message`; repară, run-once, verifică.

## 4. Git și igienă

- `grep -rn -E "\+40[0-9]{9}|\(07[0-9]\) [0-9]{3}-[0-9]{4}|\b07[0-9]{8}\b" management/` → 0 înainte de
  commit (exemplele `0700000000`, `0722111222`, `+4070000000x` sunt permise).
- `grep -rn -i "<fragment din token>" management/` → 0. Tokenul SmartBill nu apare nicăieri.
- Commit mic, mesaj în română fără diacritice, `git push -u origin claude/antonia-delegation-management-vvt3xe`,
  retry cu backoff la eroare de rețea. Fără PR.
- Numele de clienți nu intră în documente; ID-urile operaționale reale conțin cifre de telefon → în
  documente se folosesc forme anonimizate (`HOD0001x`).

## 5. Filtrul de siguranță al sesiunii (ce blochează și ce faci)

- Blochează: comenzi `curl` cu credențiale în ele; apeluri de unelte care conțin parole/tokene;
  `mcp__Airtable__create_automation` (de trei ori, inclusiv fără secrete).
- Ce faci: nu insista, nu ocoli. Scrie artefactul în repo (script + pași de instalare) și pune-l pe lista
  de clicuri. Credențialele se citesc din `⚙️ Config`, niciodată din cod.

## 6. Raportul de seară — cum se citește o problemă

- „COMENZI (N)" cu listă mai lungă/scurtă decât N → bug de numărare (vezi `split`).
- Secțiune goală deși Airtable are rânduri → feeder partajat sau filtru pe modul; testează formula cu RPC.
- Niciun mesaj la 17:30 → `executions_list`; cauze văzute: tabel șters (403), funcție inexistentă
  (`toNumber`), mesaj > 4.096 caractere.
- Cifre duble în `📊 Zile` → rulări manuale înainte de upsert; acum upsert-ul le previne.

## 7. Când revine Antonia (secvența)

1. Ea dă `/start` botului → chat ID din `executions`/hook.
2. PUNTE 2: modulul 9 `chatId` = al ei; modulul 40 `antonia_in_concediu` = „nu"; program 08:50.
3. PUNTE 3: `antonia_in_concediu` = „nu" (scorul săptămânal se poate reintroduce din `📊 Zile`).
4. Înainte de toate: actul adițional comunicat (PLAN-ANTONIA), cont Airtable separat, `Created by`.

## 8. Motoarele SmartBill (când sunt instalate)

- Test pe client fictiv; proforma/factura sunt reale în SmartBill → se șterg după test.
- `DRAFT_MODE = da` în `⚙️ Config` până la 3 facturi de avans corecte.
- F2.3 se aliniază pe `⚙️ Config` (scoate credențialele din cod) — modificare cu `update_automation`,
  care poate fi și ea blocată; atunci e clic al lui Daniel (Airtable → Automations → F2.3 → script).

## 9. Costuri și limite

- Make: 10.000 op/lună; consum curent ~1.700. Airtable AI: Automation 1 + motorul 0 consumă credite AI ale
  bazei. Telegram: 4.096 caractere/mesaj.
- Sesiune Claude: nu re-citi; nu trage `Ofertare` întreg; un audit = un critic, nu un workflow.
