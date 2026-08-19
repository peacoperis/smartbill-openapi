<!-- GENERAT AUTOMAT din reguli.json — nu edita manual. Rulează: python3 caiet.py genereaza -->

# Abateri și lucruri de decis

Generat din registru. Prima listă = reguli **active** pe care aplicația nu le acoperă, deci se aplică manual. A doua listă = reguli care așteaptă o decizie.

## Reguli active neacoperite de aplicație (10)

- **ACC-003** (neimplementata) — Culoarea consumabilelor urmează RAL-ul comenzii  
  prețul consumabilului este unic, indiferent de culoare
- **CALC-006** (neimplementata) — Lungime minimă comandabilă 0.50 m  
  minLen există în PROVIDERS dar nu este verificat nicăieri
- **MNT-006** (partiala) — Două puncte de prindere pe fiecare intersecție șipcă-riglă  
  calculator_sipca_v22_enterprise.html:421 (factorul 2 = 2 rânduri)
- **MNT-008** (neimplementata) — Garnitura EPDM se comprimă ușor, fără deformarea profilului  
  regulă de execuție
- **MNT-011** (neimplementata) — Interdicție de tăiere cu disc abraziv (flex)  
  regulă de execuție
- **MNT-012** (neimplementata) — Retușarea obligatorie a muchiilor tăiate  
  consumabil neinclus în deviz
- **MNT-013** (neimplementata) — Folia de protecție se îndepărtează imediat după montaj  
  regulă de execuție
- **MNT-015** (neimplementata) — Sensul de montaj pentru profilele dublu vopsite și cu textură lemn  
  paintType există în CATALOG_DATA, sensul nu e tratat
- **OFR-001** (partiala) — Comparația de prețuri este validă doar între modele cu status disponibil  
  calculator_sipca_v22_enterprise.html:442-455, 460-466 (quickStats ia primul rezultat, indiferent de sortare)
- **PRET-005** (partiala) — Prețurile din ofertă sunt fără TVA  
  cota există (adminSettings.defaultVAT) dar nu se aplică nicăieri în calcul; PDF-ul afișează corect 'fără TVA'

## Reguli care așteaptă decizie (16)

- **ACC-001** (propusa) — Consumul de fixare se calculează pe puncte reale de prindere
  - Abatere dimensională confirmată: screwsPerM este declarat pe metru dar nu se înmulțește cu lungimea.
- **ACC-004** (propusa) — Un tub de vopsea de retuș per RAL din comandă
  - De adăugat prețul de achiziție în fișa de accesorii.
- **CALC-002** (propusa) — Ultima șipcă nu are interspațiu după ea
  - Decizie de luat: se păstrează varianta acoperitoare sau se trece pe formula exactă + rezervă CALC-008.
- **CALC-005** (propusa) — Lungimea comandată se rotunjește la multiplu de 10 cm
  - De confirmat pasul de debitare la fiecare furnizor; unii lucrează la 1 cm.
- **CALC-008** (propusa) — Rezervă de manoperă 3% pe cantitate
  - De agreat procentul: 3% la garduri drepte, propunere 5% la garduri cu pante sau unghiuri.
- **CALC-014** (propusa) — Măsurătoarea de teren se ia pe fiecare tronson, cu 3 cote pe verticală
- **CAT-004** (propusa) — Dublu vopsit se cere obligatoriu când gardul e vizibil pe ambele fețe
- **MNT-003** (propusa) — Interspațiu admis 0-5 cm; peste 5 cm se cere confirmare scrisă
- **MNT-004** (propusa) — Restul de la capăt se redistribuie, nu se taie longitudinal
- **MNT-005** (de-confirmat) — Număr minim de rigle (traverse) în funcție de lungimea șipcii
  - De confirmat pasul pentru grosimea 0.40 mm, care e mai flexibilă.
- **MNT-009** (propusa) — Distanța minimă de la sol: 50 mm
- **MNT-010** (de-confirmat) — Găurile de fixare la minim 15 mm de marginea șipcii
  - De confirmat cu fișa tehnică a fiecărui furnizor.
- **MNT-014** (de-confirmat) — Deschiderea maximă între stâlpi: 2.50 m
- **MNT-016** (propusa) — Verificarea verticalității la fiecare 5 șipci
- **OFR-005** (propusa) — Trecerea în proformă păstrează exact valorile din ofertă
  - De stabilit convenția pentru codul produsului (products[].code) - propunere: MODEL-GROSIME-RAL.
- **PRET-002** (propusa) — Cursul valutar se revizuiește lunar și se blochează pe durata ofertei
  - Curs în fișă la 2026-08-19: 4.97 RON/EUR.
