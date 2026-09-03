# Profilul de lucru al lui Daniel — cum se colaborează cu el

Scris la predarea către modelul următor (03.09.2026). Nu e un portret, e un manual de interfață.

## Cum comunică

- De pe telefon, în română, cu greșeli de tastare și fără diacritice („sa faci testul clar de
  functionare sa u cumva sa ma trezesc iar cu un madar de informatii"). Nu corecta, nu comenta forma.
  Reconstituie sensul și confirmă-l în două rânduri când e ambiguu.
- Scrie dimineața devreme (06–08) și seara târziu (22–01). Răspunde cu latență de la minute la ore.
  Mesajele lui vin adesea *în timp ce* lucrezi — integrează-le fără să oprești ce e în curs, spune ce
  schimbă.
- Trimite mesaje scurte care conțin decizii mari („Aici tu decizi nici să rupem tot nici să avem
  zgomot", „Construiește acum tot ce nu depinde de câmp"). Ia-le ca atare.
- Când cere ceva prin „Concluzii?" sau „Cât mai durează" vrea starea în 5 rânduri, nu o analiză.

## Ce vrea, în cuvintele lui

- **„Să rămână doar golul lipsei"** — automatizează ce e mecanic; ce cere prezență și judecată rămâne uman.
- **„Măsurăm de 100 de ori și tăiem o dată"** — machetă aprobată înainte de construcție; construcție o
  singură dată; test imediat.
- **„Nici să rupem tot, nici să avem zgomot"** — curățenie cu documentare, nu ștergere oarbă; niciun
  mesaj care nu aduce informație nouă.
- **„Tu decizi"** — nu-i cere permisiuni pentru lucruri de rutină. Vrea propuneri, nu opțiuni.
- **„Dacă e haos, mai bine tokeni arși"** — preferă să nu se construiască nimic decât să apară încă un
  strat pe care nu-l înțelege.
- **„Adu 3 lucruri care aduc plus valoare cu adevărat"** — răspunde bine la propuneri creative concrete,
  cu efectul măsurabil pentru el, și le alege pe toate dacă sunt bune.
- **„Am început invers"** — își vede singur greșelile de strategie și le spune pe față; așteaptă același
  lucru de la tine.

## Ce îl irită (observat)

- Haos informațional: tabele/coloane/scenarii pe care nu le-a cerut și nu le înțelege („10 tabele cu
  lucruri care nu știu ce sunt").
- „Idee bună, 0 utilizări" — a trăit-o cu OLX; recunoaște tiparul imediat (botul `/o`, alerta instant).
- Planuri „frumos scrise, cu goluri imense mascate" — vrea să știi cap-coadă ce presupune fiecare pas
  înainte să-l promiți.
- Rapoarte care îi arată ce a făcut el însuși, sau aceleași cifre în fiecare zi.
- Să i se ceară același clic de trei ori prin trei canale.

## Cum vrea rapoartele și mesajele

- Scurt, cu **ce s-a făcut, ce a picat și de ce, ce urmează, ce are el de apăsat**. Lista lui de clicuri
  e una singură: `CLICURI-DANIEL.md`.
- Cifre verificate în aceeași sesiune prin API, niciodată din memorie. Când o cifră e estimare, spune-o.
- Greșelile tale se spun pe față, cu cauza reală. Exemplu bun: B14 din `AUDIT-4-SCAUNE.md`, unde
  diagnosticul a fost greșit de două ori și s-a scris tot.
- Nu-l lăuda, nu te scuza în lanț. „Ai dreptate" urmat de corecție e suficient.
- Pe Telegram vrea: liniuță = ID + telefon (ca să trimită mesaj), câmpurile unul sub altul, fără „·" între
  ele, numerele corecte, link WhatsApp cu mesaj util, nu generic.

## Contextul afacerii, pe scurt

- Vinde și montează acoperișuri/garduri (Bilka, Wetterbest/SAF, Caretta, Unimat, Top Profil). Ofertele
  vin din calculatorul Bilka (.xlsm + PDF) și dintr-un calculator propriu de șipcă (`calculator_sipca_v22`).
- Fluxul lui de comandă (descris de el): ofertă → proformă → avans → CNP copiat din PDF → dovadă plată →
  «Procedura de comandă» → .xlsm din atașament pus în mail către furnizor → «Comandată». Ziua 1 măsurători,
  ziua 2 oferte dimineața, ziua 3 comenzi la prima oră pentru ziua 4. **90% din comenzi se dau dimineața
  devreme.**
- Colaboratori care aduc comenzi (numele lor apar în `Responsabil Comanda`); clienți-tip în exemplele lui:
  Vasile, Tica, Vica/Viorica, Ion.
- Antonia: angajată de birou, în concediu la 03.09 (data întoarcerii necunoscută). Decizia despre postul ei
  pe 20.10.2026, pe cifre (`PLAN-ANTONIA.md`). Actul adițional la RI trebuie comunicat înainte de prima ei
  zi. Nimic cu limbaj de scor nu ajunge la ea până atunci.
- Registrul de furnizori în Excel are formule cu intervale fixe care dau solduri greșite; reproducerea în
  Airtable e dovedită pe mostră (`REGISTRU-AIRTABLE.md`), importul așteaptă OK-ul lui explicit.

## Ce a aprobat deja (nu redeschide)

- Gruparea comenzilor doar după cine a tastat (Daniel/Antonia), nu după colaborator.
- Bifa `Factura_Furnizor_OK` rămâne; o bifează Antonia.
- Cele 3 adăugiri la raport: link WhatsApp, `/c` din raport, scor săptămânal din `📊 Zile` (suprimat cât
  e în concediu).
- Auditul „4 scaune" și toate acțiunile din el; contorul săptămânal (sâmbătă 17:30); dashboardul.
- Strategia: motoarele fluxului de comandă înaintea oricărui alt raport.

## Ce a refuzat sau blocat (respectă)

- Două modificări de schemă refuzate la permisiune (formula `Zi curată`; un câmp de backlog, creat ulterior
  la cererea lui explicită). Regula: schimbările de schemă se anunță într-o propoziție înainte.
- Filtrul de siguranță al sesiunii blochează: apeluri cu secrete în ele (curl cu token) și
  `create_automation` în Airtable. Nu insista; oferă calea manuală documentată.
