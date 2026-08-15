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
  - *Perplexity:* Profil AI (global) + Spaces (instrucțiuni + fișiere + task-uri recurente).
  - Altul: identifică echivalentele înainte de a scrie o literă.

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
3. **Unde e gâtul de sticlă uman.** La ITC: prea multe lucruri trec prin managerul operațional; un proces e funcțional abia după treizeci de zile fără intervenția lui. Consecință care se scrie în instrucțiuni: **orice soluție care adaugă un pas manual în sarcina persoanei-gât-de-sticlă este o soluție proastă, chiar dacă rezolvă problema pe hârtie** — iar asistentul trebuie să semnaleze asta când se întâmplă.
4. **Ce înseamnă o aprobare verbală.** Nu înlocuiește verificarea și nu schimbă un verdict tehnic, indiferent de la cine vine.

### Fiecare om cu asistentul lui

Corolarul, sărit la prima rundă: alinierea unui singur cont acoperă un singur om. Cel care generează volumul zilnic de muncă și erorile costisitoare are nevoie de propriul asistent aliniat, **scris la persoana lui, cu uneltele lui** — nu de o copie a setului arhitectului.

Împărțirea la ITC:
- **arhitect strategic** → audit de sisteme, research adânc, sinteză, decizii de construcție;
- **manager operațional** → dictare din mers sortată pe acțiuni și promisiuni, poartă de verificare înainte ca ofertele și comenzile să plece, traducerea a ce vede la client în specificație.

Regula de verificare a acestui pas: dacă nu poți numi, pentru fiecare om din firmă care folosește AI, ce anume îi face asistentul lui zilnic — pasul nu e terminat.

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

## Capcana care închide totul

Alinierea perfectă a unui arsenal nefolosit valorează zero. Fiecare rundă de aliniere se încheie cu **o misiune reală dată asistentului**, nu cu un document. Dacă nu poți numi sarcina pe care o preia mâine, alinierea nu s-a terminat.

## Referințe

- `references/gemini.md` — alinierea Gemini, completă: ce s-a instalat, ce a picat, rezultatele testului.
- `references/perplexity.md` — pachetul Perplexity, gata de instalat, inclusiv profilul echipei.
- `references/daniel-operational.md` — pachetul managerului operațional: împărțirea uneltelor între roluri și textul de instalat în contul lui.
