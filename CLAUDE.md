# CLAUDE.md — manualul de operare al acestui repo (citește-l întreg, sunt 2 minute)

> **Gardă: ești în proiectul potrivit?** Doar dacă există `management/STARE-SISTEM.md` și `git remote -v`
> arată `peacoperis/smartbill-openapi`, iar branch-ul e `claude/antonia-delegation-management-vvt3xe`.
> Dacă vezi `_PULS.txt`, `sync-blindaj.ps1`, `STARE.md` (fără „-SISTEM") sau `APP/tetto-rc-2d*`, ești în
> **alt proiect** al lui Daniel, cu alt ritual: spune-i asta în prima propoziție și oprește-te. Branch-ul
> de lucru e singurul adevăr: din 03.09 `main` are o copie a pachetului, deci fișierele pot exista și pe
> `main`, dar munca merge pe branch. Dacă nu ești pe el: `git fetch origin && git checkout
> claude/antonia-delegation-management-vvt3xe`, apoi reia de la început.

Ești continuarea unei colaborări de 4 zile intense cu **Daniel Neacsu**, patronul PeAcoperis.ro / Invest
Tetto Construct SRL (Pitești, acoperișuri și garduri metalice). Nu redescoperi nimic: tot ce s-a învățat e
scris aici și în `management/`. Nu citi transcripturi vechi. Nu trage tabele întregi din Airtable.

## Misiunea (două fire, în ordinea asta)

1. **Automatizarea fluxului de comandă** — „să rămână doar golul lipsei": PDF atașat → câmpuri completate
   singure; CNP → proformă SmartBill; dovadă de plată → factură de avans + status «De Comandat»; captura
   comenzilor din mailul către furnizor. Motoarele sunt scrise în `management/motoare/`, **neinstalate**.
2. **Managementul Antoniei** (angajata, în concediu; decizie pe 20.10.2026): rapoarte automate pe
   Telegram, dashboard, măsurare corectă și legală. Vezi `management/PLAN-ANTONIA.md`.

## Regulile nenegociabile (încălcate o dată fiecare, de-asta sunt aici)

1. **Machetă înainte de Make, run-once după.** Nimic nu se schimbă într-un scenariu Make fără o rulare de
   probă imediat după și verificarea rezultatului în `📊 Zile` sau pe Telegram. „Măsurăm de 100 de ori,
   tăiem o dată."
2. **Zero date personale și zero secrete în repo.** Înainte de orice commit:
   `grep -rn -E "\+40[0-9]{9}|\b07[0-9]{8}\b" management/` trebuie să dea 0 (exemplele `0700000000`,
   `+4070000000x` sunt permise). Tokenul SmartBill nu apare nicăieri; scripturile îl citesc din tabelul
   Airtable `⚙️ Config`.
3. **O singură listă de clicuri pentru Daniel**: `management/CLICURI-DANIEL.md`. Niciodată cereri picurate
   în rapoarte sau în mesaje lungi. El lucrează de pe telefon.
4. **Greșelile se scriu pe față, cu cauza reală**, chiar dacă diagnosticul s-a schimbat de două ori (vezi
   B14 în `AUDIT-4-SCAUNE.md`). Fără „probabil", fără laude.
5. **Nu întreba ce poți verifica prin API.** Decizii de rutină le iei tu („tu decizi" e răspunsul lui
   standard). Întrebi doar când două interpretări duc la lucrări diferite.
6. **Răspunsuri scurte**, în română, cu cifre verificate în aceeași sesiune. Fără em-dash decorativ, fără
   liste de 30 de puncte. Ce a mers, ce a picat, ce urmează, ce are el de apăsat.
7. **Un feeder = un agregator** în Make, și alte capcane tehnice: toate în `CARTEA-DE-MISCARI.md`. Citește-l
   înainte de a atinge un blueprint.

## Harta: unde e ce

| Întrebare | Fișier |
|---|---|
| Toate ID-urile (bază, tabele, câmpuri, scenarii, conexiuni, automatizări), ce e live | `management/STARE-SISTEM.md` |
| Cum fac o operațiune (modific un scenariu, adaug un câmp, verific o rulare) + capcanele | `management/CARTEA-DE-MISCARI.md` |
| Cum lucrează și comunică Daniel, ce vrea, ce îl irită | `management/PROFIL-LUCRU-DANIEL.md` |
| Ce are Daniel de apăsat, în ordinea impactului | `management/CLICURI-DANIEL.md` |
| Ce livrează sistemul, blocaje, decizii (auditul „4 scaune") | `management/AUDIT-4-SCAUNE.md` |
| Motoarele fluxului de comandă (scripturi + instalare) | `management/motoare/README.md` |
| Blueprint-urile Make curente, editabile local | `management/make/*.json` |
| Raportul de seară: machetă, decizii, ce s-a schimbat | `management/RAPORT-SEARA-V2.md` |
| Registrul de furnizori în Airtable (sold, paleți, storno) | `management/REGISTRU-AIRTABLE.md` |
| Ce e fiecare tabel Airtable, ce s-a șters și de ce | `management/INVENTAR-AIRTABLE.md`, `naftalina/` |
| Antonia: rutina, planul, praguri, legal | `RUTINA-ANTONIA.md`, `PLAN-ANTONIA.md`, `PROTOCOL-DISCIPLINAR.md` |
| Arhitectura țintă a pipeline-ului (motoare A–D) | `management/ARHITECTURA-ITC-PIPELINE.md` |
| Ce a făcut fiecare sesiune + protocolul evaluării de seară | `management/JURNAL-SESIUNI.md` |

## Primele 10 minute ale unei sesiuni noi

1. Citește `management/STARE-SISTEM.md` și `management/CLICURI-DANIEL.md`.
2. Trei verificări read-only, cu uneltele MCP Make/Airtable: ultimele execuții ale scenariilor 9737881
   (briefing) și 9737514 (raport) — `status: 1` și numărul de operații; ultimul rând din tabelul `📊 Zile`
   (`tblJ0IUiG4uQ5VNYM`); lista automatizărilor Airtable (ce e deployed).
3. Salută-l pe Daniel cu starea într-un singur mesaj scurt: ce a rulat, ce e roșu, ce are de apăsat. Nu
   povesti ce ai citit.
4. **La închiderea sesiunii**: adaugă intrarea ta în `management/JURNAL-SESIUNI.md` (format acolo) și comite.

## Economia de tokeni (motivul pentru care exiști tu și nu predecesorul)

- Nu citi transcripturi, nu citi `tool-results` vechi. Tot ce contează e în `management/`.
- `Ofertare` are 518 rânduri × 87 de câmpuri. Cere întotdeauna filtre și 5–8 câmpuri (`fieldIds`).
- Blueprint-urile Make se editează din `management/make/` cu un script Python local și se trimit o dată;
  `scenarios_get` doar când bănuiești că s-a schimbat ceva în interfața Make.
- `executions_get-detail` nu întoarce intrările/ieșirile modulelor pe acest cont — nu-l folosi. Diagnoza
  se face prin efecte: rândul din `📊 Zile`, mesajul Telegram, un RPC de test (`rpc_execute`).
- Fără workflow-uri cu mulți agenți. Un singur critic (agent `Plan`) e suficient pentru un audit.
- Nu re-explica ce e deja scris; trimite la fișier.

## Git

Branch de lucru: `claude/antonia-delegation-management-vvt3xe`. Commit-uri mici, mesaj în română fără
diacritice, fără PR (Daniel nu a cerut). Push cu `git push -u origin <branch>`. Trailerele de commit cerute
de harness se adaugă automat; nu pune identificatori de model în commit-uri sau documente.

## Ce e în afara repo-ului

**Celălalt hub al lui Daniel** (`peacoperis/itc-hub`, local `C:\Users\danie\OneDrive\Documente\ITC`):
acolo trăiesc regulile de meserie, ofertarea, dosarele clienților, aplicația TETTO-RC și **arhiva bazei
Airtable dinainte de ștergerile din 02.09** (branch `arhiva-airtable`). Din 03.09 acest repo e înregistrat
acolo la adresa 70 din `00_HARTA-ATELIER.md`. Sesiuni separate, dar **aceeași bază Airtable**: vezi regula
scriitorului unic din `CARTEA-DE-MISCARI.md`, punctul 10.

Baza Airtable „test #" `appdbikkM2awYhpoM` (conector MCP Airtable); echipa Make 1521547 (conector MCP
Make); botul Telegram (chat Daniel `7486183573`); dashboardul «Comenzi în lucru»
`https://airtable.com/appdbikkM2awYhpoM/pagW48gNn8LNQ9eS7`; SmartBill (CIF RO34325848, serie facturi
FFITC) — accesat doar din scripturile Airtable, cu credențialele din `⚙️ Config`.
