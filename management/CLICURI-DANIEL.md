# Lista de clicuri — o singură listă, 5 minute, nu prin rapoarte

> De ce există: cinci acțiuni au așteptat 2–3 zile pentru că au fost cerute în rapoartele de seară, pe
> telefon, la ore când nu se pot face. Aici sunt toate, în ordinea impactului, cu termen. Când e făcut,
> se taie. Nimic din sistem nu mai depinde de un clic nou care nu e pe lista asta.

| # | Ce | De ce contează | Cum | Termen |
|---|---|---|---|---|
| 1 | **Un mail real de comandă către furnizor** (forward la mine, sau captură de ecran cu subiect + destinatar + atașament) | Fără el nu se poate construi captura automată a comenzilor din folderul „Trimise" — singura piesă care îți dă timp înapoi | forward | azi |
| 2 | **Data întoarcerii Antoniei** | Fără ea nu se poate aplica regula „minim 4 săptămâni pline de măsurare, altfel se mută data deciziei o singură dată" | un mesaj | azi |
| 3 | **Cont Airtable separat pentru Antonia** (nu login comun) | `Created by` / `Last modified by` sunt inutile dacă amândoi intrați pe același cont | Airtable → Share → invită adresa ei ca Editor | înainte de #4 |
| 4 | **`Created by` + `Last modified by` în `Ofertare`** | Singura cale de a vedea cine a tastat ce. API-ul nu le poate crea | Ofertare → „+" la capătul coloanelor → tip *Created by* → nume `Creat de` → Create. La fel *Last modified by* → `Modificat de` | după #3 |
| 5 | **Actul adițional la Regulamentul Intern** (procedura de evaluare) | Fără el, pragurile din PLAN-ANTONIA nu au forță legală; **măsurarea contează doar după ce procedura e comunicată** | cu juristul/contabila; model în PROTOCOL-DISCIPLINAR.md | **prima zi de lucru a Antoniei**, nu 15.09 |
| 6 | **Deploy `PUNTE — Livrare mâine`** | Alerta instant la «Livrare mâine» nu există până nu apeși | Airtable → Automations → „PUNTE — Livrare mâine" → Turn on | 1 min |
| 7 | **Oprește `Automation 2`** | E moartă (cron unic 23.03.2026); API-ul nu poate șterge o automatizare pornită. După ce o oprești, o șterg eu | Airtable → Automations → Automation 2 → Off | 30 s |
| 8 | **Șterge cele 14 coloane `🗑️ STERGE - …`** din 6 tabele | Coloane moarte rămase după ștergerea tabelelor; API-ul nu poate șterge câmpuri | clic dreapta pe cap de coloană → Delete field | 3 min |
| 9 | **Adresa și programul biroului** pentru șablonul WhatsApp «de ridicat» | Fără ele mesajul spune „biroul nostru din Pitești" și atât | un mesaj | când poți |
| 10 | Corecturi de date: 2 telefoane în format `(07x) xxx-xxxx`, o valoare lipsă la livrarea parțială, typo „Colabortor" în `Responsabil Comanda`, un rând dublat în lista facturilor neemise (rândurile 9–10 din CSV) | igienă; raportul le normalizează, dar sursa rămâne murdară | în Airtable | când poți |
| 11 | **Notificările de eroare Make pe email** — verifică în profilul Make că sunt pornite („Errors and warnings") | Când un scenariu pică, să afli tu, nu Antonia a doua zi | make.com → profil → Notifications | 1 min |
| 12 | Decizie: **rescriem istoricul git** pentru datele personale din `RAPORT-SEARA-V2.md` (comise 02.09, anonimizate 03.09)? | GDPR: repo privat, dar istoricul le păstrează | un „da"/„nu" | când poți |
| 0a | **Motoarele fluxului de comandă** (`management/motoare/`): completează `SB_EMAIL` și `SB_TOKEN` în tabelul `⚙️ Config` (tokenul din SmartBill → Integrări → API) | fără ele motorul A și B nu pot vorbi cu SmartBill; parolele nu mai stau în cod | Airtable → ⚙️ Config → coloana Valoare | 2 min |
| 0b | **Instalează cele 3 motoare** din `management/motoare/README.md` (copy-paste, ~3 min fiecare) SAU permite în sesiune acțiunea `create_automation` și le creez eu, oprite, ca să le pornești tu | filtrul de siguranță al sesiunii a blocat crearea lor prin API; scripturile sunt gata și verificate pe structura bazei | Airtable → Automations | 10 min |
| 14 | **Schimbarea modelului.** Pachetul de predare e în repo (`CLAUDE.md` se citește singur la pornire). Prima comandă pentru noua instanță: **„Citește CLAUDE.md și spune-mi starea într-un rând."** | evită recitirea a 8 MB de transcript; noua instanță pornește cu toate ID-urile, regulile și capcanele | Claude Code → model → mesajul de mai sus | când vrei |
| 13 | Testul `/c`: trimite botului `/c Test Client | 0700000000 | Pitesti | 1` | confirmă că `Introdus prin` și `Data Comanda` se scriu corect; apoi șterg rândul | 20 s | când poți |

## Făcute (se mută aici, cu data)

- 03.09 — dashboardul «Comenzi în lucru» există și e publicat: https://airtable.com/appdbikkM2awYhpoM/pagW48gNn8LNQ9eS7 (deschide-l o dată de pe telefon și pune-l pe ecranul principal).
