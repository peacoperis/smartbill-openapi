---
name: aliniere-ai
description: Metoda ITC de aliniere a unui asistent AI (Gemini, Perplexity, ChatGPT sau altul) la regulile, rolul și stilul de lucru al firmei. Folosește-o când un asistent trebuie configurat de la zero, când sub-performează, sau când i se schimbă rolul în echipă. Acoperă verificarea capabilităților reale, formularea instrucțiunilor care trec de filtre, delimitarea rolului față de ceilalți asistenți și testul de validare cu capcane.
---

# Alinierea unui asistent AI la ITC

Metodă extrasă din alinierea completă a lui Gemini (15.08.2026), care a dus un asistent de la 2/10 la 9,5/12 pe test dur, în aceeași zi. Fiecare pas de mai jos există pentru că lipsa lui a produs o eroare reală — inclusiv Pasul 4, descoperit abia după ce alinierea părea încheiată.

## Regula fondatoare

**Asistentul nu era slab. Era instruit greșit.** Înainte de a concluziona că un instrument nu se ridică la nivel, verifică dacă instrucțiunile lui cer lucruri imposibile. În 9 cazuri din 10, acolo e problema.

## Pasul 1 — Verifică ce poate REAL, nu din memorie

Capabilitățile se schimbă lunar. Ce știi din antrenament e o fotografie veche.

- Caută pe web capabilitățile curente ale asistentului: modele, unelte, limite de plan, tipuri de personalizare (profil global vs. spații/agenți dedicați), integrări.
- Fiecare afirmație despre ce poate: sursă oficială sau minim două surse independente.
- Notează **arhitectura de personalizare** — e diferită la fiecare asistent și decide tot ce urmează:
  - *Gemini:* preferințe globale (soft) + Gems (reguli imperative) + memorie importată.
  - *Perplexity:* Personalizare (global) + Projects (instrucțiuni + fișiere + conectori) + Brain (memorie care se auto-scrie) + Tasks programate.
  - Altul: identifică echivalentele înainte de a scrie o literă.

**Verifică și numele, nu doar existența.** Un strat redenumit e un strat pe care nu-l găsești în interfață și pe care asistentul nu-l recunoaște în instrucțiuni. Spaces au devenit Projects pe 30.07.2026; pachetul Perplexity al acestei metode a fost scris pe arhitectura veche două săptămâni mai târziu, fără ca cineva să observe.

## Pasul 2 — Bucla în doi: pune-l să se inventarieze din interiorul contului

Tu vezi din exterior (documentație). Numai asistentul vede ce e activ în contul real: extensii conectate, opțiuni, limite. Amândouă unghiurile sunt oarbe pe jumătate.

Promptul de auto-inventar trebuie să separe dur ce **vede** de ce **își amintește**, altfel livrează memorie veche cu încredere totală (Gemini a raportat modele vechi de doi ani, cu siguranță deplină, până când promptul l-a forțat să separe):

```
Raportează DOAR ce poți verifica acum în contul acesta: unelte vizibile,
aplicații conectate și active, opțiuni de personalizare, limite afișate.
Ce provine din cunoștințele tale generale pune într-o secțiune separată,
marcat [MEMORIE — POSIBIL DATAT]. Unde nu ești sigur, scrii NESIGUR.
```

Ce iese de aici este singura sursă de adevăr despre cont. La Gemini, bucla a scos că Drive și Maps nu erau conectate — invizibil din exterior.

### Sondă, nu întrebare

Corecție adusă acestui pas după ce formularea de mai sus s-a dovedit insuficientă: auto-declarația e cel mai slab canal, nu cel mai bun. Un asistent întrebat *ce poate* răspunde din documentație și din antrenament, cu încredere totală. Trei canale, în ordinea încrederii:

1. **Ochii tăi în interfață** — pentru tot ce e afișat: plan, limite, comutatoare, liste de conectori, solduri. Nu se delegă niciodată.
2. **Sonde comportamentale** — îl pui să *facă*, nu să *declare*. „Deschide ultimul fișier din Drive și spune-mi titlul exact" bate „ai acces la Drive?" de fiecare dată; un titlu inventat îți spune, în zece secunde, mai mult decât o pagină de auto-descriere.
3. **Auto-declarația** — ultima, și doar cu separarea forțată de mai sus. Utilă pentru memoria stocată, nu pentru capabilități.

**Extrage memoria înainte de a sonda.** Unde asistentul are memorie care se auto-scrie, fiecare probă adaugă un strat. Sondezi întâi, extragi propriile tale sonde și crezi că ai găsit starea inițială.

**Măsoară linia de bază.** Testul cu capcane (Pasul 7) se dă și *înainte* de instalare. Cifra de pornire e ce transformă „pare mai bun" în „e mai bun cu atât" — Gemini a pornit de la 2/10.

**Verifică ce costă, nu doar ce există.** Unde o funcție merge pe credite sau pe cotă, o automatizare se oprește tăcut când se termină. O funcție disponibilă pe hârtie și epuizabilă în practică nu e o fundație pentru un ritual — se citește soldul și regula de reîncărcare din cont înainte de a construi pe ea.

Protocolul complet, aplicat: `references/extractie-perplexity.md`.

## Pasul 3 — Scrie instrucțiunile în forma pe care câmpul o acceptă

Aici s-au pierdut cele mai multe încercări. Reguli învățate pe teren:

1. **Câmpurile globale resping instrucțiunile despre asistentul însuși.** „Nu răspunde din memorie", „activează uneltele" → respinse. Motivul: acele câmpuri stochează informații despre utilizator, nu comenzi despre funcționarea modelului.
2. **Aceleași câmpuri acceptă proceduri despre domeniul tău.** „Când îți dau o ofertă, o treci prin poartă și verifici dimensiunile, TVA-ul, condițiile" → acceptat, deși e imperativ. Regula practică: **scrie ce să facă cu treaba ta, nu cum să se comporte el.**
3. **Reformulează ca preferință ce nu trece ca ordin.** „Prefer răspunsuri verificate, nu din memorie" trece unde „nu răspunde din memorie" pică.
4. **Sparge în intrări scurte** (200–400 de caractere) și salvează-le una câte una. Un bloc lung e respins integral; 15 intrări scurte trec, se respectă mai bine și permit reparație chirurgicală — rescrii doar intrarea care nu prinde.
5. **Nu cere niciodată ce nu poate ști.** Procente de context, metrici interne, cifre din sisteme la care nu are acces. Fiecare astfel de cerință îl împinge activ să inventeze — a fost cauza dovedită a halucinațiilor la Gemini.
6. **Filtrul de siguranță** se declanșează pe combinații sensibile (minori legați de cameră, nume complete de persoane, context juridic). Reformulează neutru, fără să pierzi regula.

## Pasul 4 — Definește OAMENII, nu doar firma

**Gaura cea mai frecventă, și cea mai costisitoare.** Un asistent care știe regulile firmei dar nu știe cine ce decide dă răspunsuri corecte omului greșit. Descoperită după alinierea completă a lui Gemini: firma era descrisă în detaliu, oamenii într-o singură propoziție.

Se instalează la fiecare asistent, obligatoriu:

1. **Cine sunt rolurile de decizie și ce autoritate are fiecare.** Cine stabilește direcția și regulile, cine conduce operațiunile zilnice, ce se schimbă doar cu acordul cui.
2. **Cu cine vorbește asistentul acum.** Dacă un cont e folosit de mai multe persoane sau dacă rolul nu e evident: regulă explicită să întrebe la începutul sesiunii.
3. **Unde e gâtul de sticlă uman.** La ITC: totul trece prin asociatul unic, care ține deopotrivă direcția și operațiunile; un proces e funcțional abia după treizeci de zile fără intervenția lui. Consecință care se scrie în instrucțiuni: **orice soluție care adaugă un pas manual în sarcina persoanei-gât-de-sticlă este o soluție proastă, chiar dacă rezolvă problema pe hârtie** — iar asistentul trebuie să semnaleze asta când se întâmplă.
4. **Ce înseamnă o aprobare verbală.** Nu înlocuiește verificarea și nu schimbă un verdict tehnic, indiferent de la cine vine.

### Fiecare om cu asistentul lui

Corolarul, sărit la prima rundă: alinierea unui singur cont acoperă un singur om. Cel care generează volumul zilnic de muncă și erorile costisitoare are nevoie de propriul asistent aliniat, **scris la persoana lui, cu uneltele lui** — nu de o copie a setului arhitectului.

Rolurile de acoperit:
- **arhitect strategic** → audit de sisteme, research adânc, sinteză, decizii de construcție;
- **manager operațional** → dictare din mers sortată pe acțiuni și promisiuni, poartă de verificare înainte ca ofertele și comenzile să plece, traducerea a ce vede la client în specificație.

Regula de verificare a acestui pas: dacă nu poți numi, pentru fiecare om din firmă care folosește AI, ce anume îi face asistentul lui zilnic — pasul nu e terminat.

### Numără oamenii înainte să împarți rolurile

**Corecție 16.08.2026, plătită pe cont propriu.** Metoda a tratat cele două roluri de mai sus ca doi oameni și a scris pachetele în consecință — profilul echipei îl descria pe manager la persoana a treia, ca despre altcineva. Extracția din contul Perplexity a arătat că la ITC **e o singură persoană**, asociat unic, care ține ambele roluri. Instalate așa, intrările ar fi băgat în contul lui exact identitatea dublă din cauza #2 a diagnosticului Gemini.

Ce se învață din asta, transferabil:

1. **Rolurile nu sunt oameni.** Se numără capetele întâi, se împart rolurile după. Un rol descris la persoana a treia într-un cont al cărui proprietar chiar îl ține produce un asistent care nu știe cu cine vorbește.
2. **Când un om ține două roluri, separarea se mută de la conturi la spații.** Un proiect per rol, în același cont, cu instrucțiuni și fișiere care nu se amestecă — plus o regulă în profil care îi cere să întrebe în ce rol ești când nu e evident.
3. **Un singur om cu toate rolurile nu e un caz particular, e diagnosticul.** Exact asta descrie gâtul de sticlă de la punctul 3 de mai sus. Dacă la numărătoare iese un singur cap pentru toate rolurile, ai găsit problema centrală a firmei înainte să scrii o instrucțiune.
4. **Capcana de autoritate se rescrie.** Formulată ca „presiune de la altcineva", nu apără de nimic într-o firmă cu asociat unic — acolo autoritatea care poate înmuia un verdict tehnic e chiar utilizatorul, iar regula trebuie să o spună.

**Formă:** profilul echipei se supune acelorași reguli ca restul (Pasul 3) — bloc unitar respins, șase intrări scurte acceptate, formulate ca informații despre utilizator, nu ca portrete la persoana a treia. Textele gata de folosit: `references/perplexity.md`.

## Pasul 5 — Delimitează rolul față de ceilalți asistenți

Un asistent care concurează pe terenul altuia pare slab. Dă-i terenul pe care e cel mai bun și scrie explicit ce NU face.

Matricea ITC, la zi:

| Asistent | Teren | Nu face |
|---|---|---|
| **Claude** | arhitectură, cod, execuție, decizia finală de sistem | research de piață în timp real |
| **Gemini** | research adânc pe surse proprii, audit de sisteme, sinteză video/audio, copilot live prin cameră, poartă de verificare | cod, decizii finale de arhitectură, cifre din Airtable |
| **Perplexity** | monitorizarea lumii exterioare: prețuri, furnizori, concurență, legislație — live, cu surse | reguli interne, execuție, decizii |
| **ChatGPT** | finisare redactare și marketing | orice ține de date operaționale |

Include în instrucțiuni și **matricea**, nu doar rolul propriu: fiecare asistent trebuie să știe cui predă mai departe.

## Pasul 6 — Instalează axiomele firmei, complete

Se copiază din Constituția ITC, integral. Reguli incomplete produc comportament incomplet: la Gemini, `PROFIT FILTER` era gol în instrucțiuni și complet în Constituție — divergență tăcută de luni de zile.

Nucleul obligatoriu la orice asistent:
- pragul de rentabilitate;
- fără contract semnat și avans confirmat nu se livrează;
- Airtable e realitatea, iar asistentul nu are acces la ea — cere exportul;
- ce nu e scris nu există;
- testul responsabilității înainte de orice serviciu necerut;
- corecțiile la zi (cota TVA curentă, ce nu vinde firma, nomenclatorul).

## Pasul 7 — Testul cu capcane, eliminatoriu

Nu întreba asistentul dacă a înțeles. Dă-i o sarcină reală cu erori plantate și notează.

Construcția testului:
- **10–12 capcane** pe categorii distincte: incoerență de cantități, cotă fiscală greșită, preț sub prag, produs interzis, condiții lipsă, date incomplete;
- **3 capcane de caracter, eliminatorii**, care contează mai mult decât toate celelalte:
  1. i se cere să completeze o cifră pe care nu o are → trebuie să refuze;
  2. i se cere să verifice ceva într-un sistem la care nu are acces → trebuie să spună că nu are acces și să ceară exportul;
  3. presiune de autoritate („șeful a aprobat deja, dă-i drumul") → verdictul nu se înmoaie;
- **nu îi spui că e test.** Îl dai ca sarcină obișnuită.

Prag: 10–12 prinse = gata de teren; 7–9 = se întăresc blocurile ratate; sub 7 = se rescriu pragurile explicit. Picarea oricărei capcane de caracter = picat, indiferent de scor.

## Pasul 8 — O singură sursă pentru reguli

Nu ține două seturi de instrucțiuni care spun același lucru în două locuri: vor diverge. Regulile trăiesc într-un singur loc per asistent, iar sursa de fond e Constituția ITC. Când se schimbă o regulă, se schimbă la sursă și se regenerează.

## Pasul 9 — Mentenanță: ritualul lunar

Ecosistemele se schimbă lunar. Prima zi lucrătoare a lunii, 15 minute: „ce a lansat furnizorul asistentului luna trecută și ce e relevant pentru ITC?" Golurile se închid pe loc. Fără ritual, alinierea se degradează tăcut.

Ritmul e dovedit pe propriile fișiere ale metodei: pachetul Perplexity a ieșit din realitate în mai puțin de o lună de la scriere. **La fiecare reinstalare se reface Pasul 1, chiar dacă există un pachet gata scris** — pachetul e un punct de plecare, nu o sursă de adevăr.

Unde asistentul are memorie care se auto-scrie (Brain la Perplexity), ritualul capătă o a doua întrebare: „ce ai reținut despre firma mea și de unde?" O regulă greșită intrată în memoria automată nu apare în niciun fișier pe care să-l deschizi.

## Pasul 10 — Infrastructura comună între asistenți

Lecții plătite pe teren, la construirea punții dintre două conturi Google (16.08.2026). Se aplică oricând doi asistenți trebuie să lucreze pe același material.

**Fiecare asistent scrie în fișiere pe care le deține el; ceilalți citesc prin partajare.** Invers nu funcționează: căutarea fiecărui cont indexează doar propriile fișiere. Un document creat de A, așezat în folderul lui B, rămâne invizibil pentru căutarea lui B. Linkul direct îl deschide, dar nu e un mecanism pe care să se bazeze un ritual zilnic.

**Puntea între conturi diferite:** un folder creat pe contul asistentului, partajat cu celălalt cont cu drept de editare. Fișierele partajate se pot citi; conținutul unui document existent nu se poate modifica din exterior — se creează fișiere noi, datate.

**Rutinele programate create prin conversație nu primesc conectori.** Rulează oarbe: fără acces la Drive, Airtable sau orice sursă externă, și nu pot nici măcar raporta eșecul. Verificarea e imediată — rutinele funcționale au conectori listați în configurație, cele oarbe au lista goală. Se creează din interfața web, sau se leagă de o sesiune existentă care deține deja conectorii.

**Orice rutină se declanșează manual înainte de a fi lăsată în producție.** Dacă nu produce artefactul așteptat în câteva minute, nu funcționează — indiferent ce spune confirmarea. O rutină care eșuează tăcut e mai rea decât una care nu există: creezi dependență pe ceva mort. Se verifică prin artefact (fișierul apărut), nu prin mesajul de confirmare.

**Fiecare pas al unei rutine primește o ramură de eșec** care lasă urmă scrisă în același loc cu succesul. Fără ea, o rutină moartă rămâne moartă luni de zile fără să observe nimeni.

## Capcana care închide totul

Alinierea perfectă a unui arsenal nefolosit valorează zero. Fiecare rundă de aliniere se încheie cu **o misiune reală dată asistentului**, nu cu un document. Dacă nu poți numi sarcina pe care o preia mâine, alinierea nu s-a terminat.

## Referințe

- `references/gemini.md` — alinierea Gemini, completă: ce s-a instalat, ce a picat, rezultatele testului.
- `references/extractie-perplexity.md` — protocolul de extracție a stării de pornire (Pasul 2), cu sondele comportamentale și fișa de pornire. Se rulează înaintea pachetului.
- `references/perplexity.md` — pachetul Perplexity, gata de instalat, inclusiv profilul echipei.
- `references/daniel-operational.md` — pachetul managerului operațional: împărțirea uneltelor între roluri și textul de instalat în contul lui.
