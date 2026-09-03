# Audit „schimbăm locurile" — ce livrează sistemul, văzut de pe cele 4 scaune

03.09.2026. Cerut de Daniel: „exact valoarea pe care o livrează către Daniel și ITC, posibilitatea de
blocaj, slăbiciunile, gândește profund, găsește soluții". Metoda: schimb de locuri — el e „Claude" și
livrează ce s-a stabilit; auditorul se așază pe scaunul Antoniei, al Vioricăi, al lui Ion și al lui Daniel.

Presupunere: Viorica și Ion = clienții-tip (ca „Vasile, Tica, Vica" din exemplele lui): Viorica în faza
ofertă → proformă → avans, Ion în faza livrare → paleți → factură finală. Toate faptele sunt citite prin
API (Make, Airtable) și din repo, nu din memorie. Auditul a trecut printr-un critic independent: 20 de
observații, 14 acceptate, 3 respinse cu dovadă, 3 parțial. Fără date personale în acest document.

---

## 0. Fapte găsite în audit

| # | Fapt |
|---|---|
| F1 | **Botul `/o` `/c` (PUNTE 4) a rulat o singură dată de la lansare — testul.** Zero folosiri reale în 2 zile. Comenzile din 02.09 au fost tastate direct în Airtable |
| F2 | **Alerta instant (PUNTE 1): 3 execuții, toate teste.** Automatizarea-sursă din Airtable e *undeployed* → alerta nu există. RUTINA-ANTONIA o promitea necondiționat |
| F3 | **Bug de numărare în rapoarte:** `length(split(text; "▪️")) - 1` dă cu 1 mai puțin (Make `split()` aruncă elementele goale). Raportul din 02.09 seara spunea „COMENZI (3)" și lista 4; snapshot-ul avea „Livrări = −1" |
| F4 | Briefingul de dimineață: punctele 1 și 3 nu aveau filtru de 7 zile → aceleași 15 facturi din martie și aceiași 15 clienți din februarie, în fiecare dimineață |
| F5 | `Jurnal Antonia` = 1 rând (test). Baseline-ul walk-in din rodaj = **0 rânduri** în vârf de sezon → ramura „valoarea prezenței la birou" a deciziei din 20.10 nu are termen de comparație pentru septembrie |
| F6 | `Created by` tot nu există. A treia cerere. **Nag-ul zilnic din raport nu produce clicuri** |
| F7 | Rularea programată a raportului din 02.09 **a picat** (tabel șters cu o oră înainte); Daniel l-a primit doar din rularea manuală. Nimic nu semnala o seară fără raport |
| F8 | **Date personale reale în repo** (`RAPORT-SEARA-V2.md`, macheta cu nume și telefoane), comise pe branch. Anonimizate la 03.09; istoricul git le păstrează |
| F9 | **184 de comenzi deschise**, din care: 51 livrate/finalizate **fără factură emisă** (≈264 mii lei cu valoare completată; 20 marcate «încasat - nefacturat»), **49 facturate și neîncasate integral sau parțial** (până la ≈420 mii lei valoare de comandă), 61 livrate **fără niciun status financiar completat** (mai–august), 14 comandate, 3 livrare mâine, 2 parțiale, 4 în avans. Nimic din astea nu era vizibil nicăieri |

---

## 1. Scaunul lui Daniel

Primesc la 08:50 un mesaj „BUNĂ DIMINEAȚA, ANTONIA" (nu sunt Antonia) cu liste care nu se schimbă de la o zi
la alta, și la 17:30 un raport în care îmi raportez mie ce am tastat eu, cu 3 rânduri de explicații
identice în fiecare seară, un steag „fără factură furnizor" mereu roșu (bifa e 0 din 518 → informație
zero), un backlog 94/51 care nu se mișcă, și vineri „0/5 zile curate — e baseline". Alerta instant cred că
există; nu există. Botul îmi cere a treia tastare, cu sintaxă cu bare, la 07:00, când am deja mailul
către furnizor deschis — de-asta nu-l folosesc.

**Ce-mi lipsește:** fluxul meu de comandă (~20 min/comandă) n-a pierdut nicio tastă. Sistemul mă
observă, nu mă scutește. Iar ceea ce nu văd deloc — s-a facturat? livrarea a fost completă? s-a încasat?
— e exact unde stau banii (F9).

## 2. Scaunul Antoniei

La întoarcere: Telegram, /start, o rutină de 60 de rânduri, un act adițional cu praguri de part-time —
nimic pregătit; și numele meu într-un repo GitHub cu rapoarte care mă notează. Dimineața: 15 facturi din
martie pe care nu le pot termina azi; mâine le văd iar — **o listă care nu poate ajunge la zero se ignoră**.
„Analiza Facebook zilnic cu captură" ca dovadă mă învață să fabric dovezi. Primesc un briefing calibrat
săptămâni pe obiceiurile lui Daniel. Țin Excelul și Airtable-ul în paralel = dublarea muncii, exact ce a
omorât încercarea din mai. Ce vreau: munca mea reală să se vadă singură — cere `Created by`/`Last modified
by` **și cont Airtable propriu**.

## 3. Scaunul Vioricăi (ofertă → avans)

Plătesc avansul, apoi tăcere până sun eu „ați primit?". Ce vreau nu e un SMS de status, e **factura
fiscală pentru avans**. Dacă Daniel apasă linkul din raport primesc „Vă contactez pentru comanda Smeura
HOD0001x" — n-am comandat „Smeura", locuiesc acolo; mesajul nu spune și nu întreabă nimic; răspund „Da?"
și am făcut încă un drum. Și nu mi-a cerut nimeni acordul pentru follow-up-uri.

## 4. Scaunul lui Ion (livrare → paleți → factură)

Mâine vine camionul; nimeni nu m-a întrebat dacă sunt acasă sau dacă intră camionul pe uliță. La livrare
parțială nu știu ce lipsește și când vine restul. Paleții: 8 paleți din august stau la clienți (3.824
lei), niciunul încă peste 30 de zile — în două săptămâni vor fi, și raportul îi va arăta fără telefonul
meu lângă; „garanția de palet e pe factura mea?". Factura finală: sunt unul din cei 51 care au plătit și
n-au factură. **Nu e tapet, e expunere fiscală** (factura de avans se emite până pe 15 ale lunii
următoare încasării).

## 5. ITC — ce a primit firma

| Ce | Realitate la 03.09 dimineața |
|---|---|
| Timp recuperat | 0 min/zi — fluxul de comandă neatins |
| Bani | 0 lei direct; indirect, solduri corecte pe 2 furnizori (Excelul le dădea greșit) — pe mostră |
| Risc redus | steag „fără factură furnizor" mereu roșu → informație zero |
| Risc rămas / nou | 51 facturi neemise + 49 neîncasate (F9); credențiale SmartBill în clar; date personale în repo; date de clienți în Telegram fără minimizare; evaluarea angajatei fără procedură în RI |
| Cunoaștere | cea mai mare valoare: **știm de ce au murit încercările anterioare** |

Concluzie onestă: sistemul livra *vizibilitate și igienă*, nu *timp*, și avea deja tiparul „idee bună,
0 utilizări" (bot, alertă).

---

## 6. Blocaje și slăbiciuni — și ce s-a făcut cu ele

| # | Blocaj | Soluție | Stare |
|---|---|---|---|
| B1 | Sistemul depinde de clicurile omului pe care trebuie să-l scutească (0/6 executate, cerute prin rapoarte pe telefon) | o singură listă: `CLICURI-DANIEL.md`; **clicul #0**: cont Airtable separat pentru Antonia, altfel `Created by` e inutil | făcut (lista) |
| B2 | Adopția capturii = 0 | **captura fără obicei nou**: Make urmărește folderul „Trimise" (IMAP există) filtrat pe domeniile furnizorilor, fereastră 06:30–10:30; rând-schiță `Comandata ` + `Introdus prin = Email — Daniel`, upsert (fără dubluri), filtru expeditor; atașamentul prin `uploadAttachment` în faza 2; BCC ca rezervă | așteaptă un mail-exemplu |
| B3 | Măsurarea pentru 20.10 stă pe lucruri inexistente | numărare corectată; `Zi curată` = doar „restanțe 7 zile = 0" (dovezile → sondajul de vineri); scor săptămânal suprimat în concediu; **termenul actului adițional = prima ei zi de lucru** (procedura trebuie să fie în RI înainte de perioada evaluată; part-time cere acord); data întoarcerii de stabilit | parțial (formula `Zi curată` — schimbare refuzată în Airtable, rămâne AND cu dovezi până spune Daniel) |
| B4 | Tăcerea nu se vede | handler Break cu 3 reîncercări pe fiecare citire Airtable + „store incomplete executions" + scenariile marcate confidențiale; notificările de eroare Make = clic în profil; santinela de 18:00 amânată | făcut |
| B5 | Paralelul pe registru moare ca în mai | 2 săptămâni, un furnizor, o persoană tastează doar în Airtable, criteriu scris de trecere | de aplicat la import |
| B6 | Zgomotul repetat antrenează ignorarea | linii fixe doar lunea; „👉" doar la liste nevide; scor vineri suprimat; **delta backlog** față de ultimul snapshot (se afișează doar când s-a mișcat sau lunea) | făcut |
| B7 | Ora mesajelor ≠ ora muncii | briefing la 07:30 cât merge la Daniel, titlu de rodaj; revine la 08:50 pe Telegramul Antoniei | făcut |
| B8 | Bus factor = 1 (expresii de 1.000 de caractere copiate în 6 module) | logica în Airtable: `Etapă comandă` (făcut); `Tel E164`/`Link WhatsApp` după numărarea telefoanelor invalide | parțial |
| B9 | Schimbare netestată în producție | run-once înainte de orice programare | făcut |
| B10 | Bot care pedepsește tăcut | nu se mai investește în bot; captura din mail îl înlocuiește pentru comenzi | decis |
| B11 | Statusuri cu spațiu la coadă | avertisment în descrierea câmpurilor; formula `Etapă` documentează dependența | făcut |
| B12 | Date personale și legal | V2 anonimizat; minimizare în Telegram (ID + telefon + localitate; nume doar la livrări); scenarii Make „confidential"; informarea Antoniei la întoarcere; mailuri cu .xlsm (posibil CNP) fără atașament în faza 1; rescrierea istoricului = decizia lui Daniel | parțial |
| B14 | **Bug Make găsit la verificarea finală** (diagnostic corectat de două ori, notat aici cu tot cu greșeli): raportul număra 0 livrări mâine cu 3 comenzi pe «livrare mâine». Ipoteza 1 (TRIM) și ipoteza 2 (slash-ul din numele statusului) au fost **infirmate** testând formulele direct prin conexiunea Airtable din Make (RPC): toate întorc cele 3 rânduri. Cauza reală: **două agregatoare de text hrănite din același modul de căutare** (rândurile de livrări + contorul „fără factură furnizor", ambele cu feeder = modulul 1). Make golește ieșirea primului când al doilea reia aceleași bundle-uri. v1 avea un singur agregator și mergea; v2 și v3 aveau două | contorul primește propria căutare (`AND(FIND('LIVARE MAINE', …), NOT({Factura_Furnizor_OK}))`); regulă nouă: **un feeder = un agregator** | făcut, verificat prin re-rulare |
| B13 | 51 facturi neemise + 49 neîncasate + 61 fără status = cea mai mare expunere reală | lista CSV trimisă lui Daniel (nu în repo); briefingul cere „cele mai vechi 3 pe zi"; **dashboardul «Comenzi în lucru»**; D2 (factura finală) urcă imediat după captura din mail | făcut (vizibilitate); D2 urmează |

---

## 7. Ce s-a construit în urma auditului (03.09)

- **`Etapă comandă`** (formulă în `Ofertare`): 0 anulată/pierdută · 1 ofertă · 2 avans/de comandat ·
  3 comandată (✓/fără factură furnizor) · 4 livrare mâine · 5 livrată parțial · 6 livrată — DE FACTURAT ·
  7 facturată — neîncasată · 8 încasată ✅ · 9 finalizată fără status financiar. Răspunde dintr-o
  privire la întrebarea lui Daniel: „văd comanda luni, livrarea miercuri, și atât".
- **Dashboard Airtable «Comenzi în lucru»** (interfață publicată): lista comenzilor deschise grupată pe
  etapă, cu file: Comandate / Livrare mâine / Parțiale / De facturat / Neîncasate / Avans.
- **Raportul de seară v3**: numărare corectă; șablon WhatsApp cu întrebarea de prezență și acces la
  livrări; „de ridicat" cu mesaj util; linia **ÎN LUCRU** cu numărătoarea pe etape + linkul
  dashboardului; delta backlog; **sâmbătă la 17:30 „Săptămâna în cifre"** — pe zi: comenzi · livrări ·
  facturi client · încasări · oferte noi · restanțe (din `📊 Zile`, scris zilnic prin upsert, fără dubluri).
- **Briefingul v3**: 07:30, filtru 7 zile + „cele mai vechi 3 din backlog" (listă care poate ajunge la
  zero), textul fix doar lunea, șabloane WhatsApp corecte.
- **`📊 Zile`** cu 7 coloane noi (backlog facturi, backlog de emis, livrări făcute, facturi client emise,
  încasări, oferte noi, facturi furnizor intrate) — contorul săptămânal cerut de Daniel.
- Handler de reîncercare pe toate citirile Airtable; scenarii marcate confidențiale.

## 8. Ce NU s-a făcut și de ce

- Captura din mail (B2): fără un mail-exemplu nu se poate stabili convenția de subiect.
- Formula `Zi curată` și câmpul de backlog: două modificări de schemă au fost **refuzate** la
  permisiune; câmpurile au fost apoi create la cererea explicită a contorului săptămânal, formula nu.
- `Tel E164` / `Link WhatsApp` în Airtable: după numărarea telefoanelor care ar pica pe gardă.
- Santinela de 18:00: dacă handlerele + notificările Make nu ajung.
- Scorul săptămânal al Antoniei: reintrodus la întoarcere, din `📊 Zile`, după actul adițional.

## 9. Observații rămase din critică, neînchise

- Când chat ID-ul trece la Antonia, Daniel pierde blocul „Livrările de azi" de dimineață — îl are de cu
  seară la LIVRĂRI MÂINE; de decis dacă vrea și copia de dimineață.
- Grupul „livrate fără status financiar" (61) e probabil un amestec de încasate și neîncasate — nu se
  poate ști din date; e prima sesiune de curățenie pentru Antonia la întoarcere (2–3 pe zi).
- Baseline-ul walk-in pentru septembrie e pierdut dacă nu începe azi.
