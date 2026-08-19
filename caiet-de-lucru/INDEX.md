<!-- GENERAT AUTOMAT din reguli.json — nu edita manual. Rulează: python3 caiet.py genereaza -->

# Index reguli

Registru versiunea 1.0.0 · 49 reguli

| ID | Titlu | Stare | Prioritate | În aplicație |
|---|---|---|---|---|
| ACC-001 | Consumul de fixare se calculează pe puncte reale de prindere | propusa | importanta | partiala |
| ACC-002 | Ambalarea consumabilelor: șuruburile la cutie, niturile la bucată | activa | importanta | implementata |
| ACC-003 | Culoarea consumabilelor urmează RAL-ul comenzii | activa | importanta | neimplementata |
| ACC-004 | Un tub de vopsea de retuș per RAL din comandă | propusa | importanta | neimplementata |
| CALC-001 | Număr de șipci pe segment | activa | blocanta | implementata |
| CALC-002 | Ultima șipcă nu are interspațiu după ea | propusa | importanta | neimplementata |
| CALC-003 | Metri liniari totali | activa | blocanta | implementata |
| CALC-004 | Prețul se calculează pe metru liniar, nu pe bucată | activa | blocanta | implementata |
| CALC-005 | Lungimea comandată se rotunjește la multiplu de 10 cm | propusa | importanta | neimplementata |
| CALC-006 | Lungime minimă comandabilă 0.50 m | activa | blocanta | neimplementata |
| CALC-007 | Lungime maximă pe furnizor | activa | blocanta | implementata |
| CALC-008 | Rezervă de manoperă 3% pe cantitate | propusa | importanta | neimplementata |
| CALC-009 | Segmentele se calculează independent și se însumează la final | activa | importanta | implementata |
| CALC-010 | Maxim 10 segmente per ofertă | activa | informativa | implementata |
| CALC-011 | Modul cantitate directă ocolește regulile de repartiție | activa | importanta | implementata |
| CALC-012 | Rotunjirea monetară se face doar la afișare | activa | importanta | implementata |
| CALC-013 | Cantitățile se rotunjesc întotdeauna în sus | activa | blocanta | implementata |
| CALC-014 | Măsurătoarea de teren se ia pe fiecare tronson, cu 3 cote pe verticală | propusa | importanta | neimplementata |
| CAT-001 | Combinația grosime + finisaj + culoare trebuie să existe la furnizor | activa | blocanta | implementata |
| CAT-002 | Filtrele se aplică în cascadă: vopsire -> grosime -> finisaj -> culoare | activa | importanta | implementata |
| CAT-003 | Modelele nu dispar niciodată din listă | activa | importanta | implementata |
| CAT-004 | Dublu vopsit se cere obligatoriu când gardul e vizibil pe ambele fețe | propusa | importanta | partiala |
| MNT-001 | Orientarea montajului decide ce dimensiune devine lungimea șipcii | activa | blocanta | implementata |
| MNT-002 | Pasul de repetiție = lățime utilă + interspațiu | activa | blocanta | implementata |
| MNT-003 | Interspațiu admis 0-5 cm; peste 5 cm se cere confirmare scrisă | propusa | importanta | neimplementata |
| MNT-004 | Restul de la capăt se redistribuie, nu se taie longitudinal | propusa | importanta | neimplementata |
| MNT-005 | Număr minim de rigle (traverse) în funcție de lungimea șipcii | de-confirmat | blocanta | neimplementata |
| MNT-006 | Două puncte de prindere pe fiecare intersecție șipcă-riglă | activa | importanta | partiala |
| MNT-007 | Sistemul de fixare este impus de model, nu ales de montator | activa | blocanta | implementata |
| MNT-008 | Garnitura EPDM se comprimă ușor, fără deformarea profilului | activa | importanta | neimplementata |
| MNT-009 | Distanța minimă de la sol: 50 mm | propusa | importanta | neimplementata |
| MNT-010 | Găurile de fixare la minim 15 mm de marginea șipcii | de-confirmat | importanta | neimplementata |
| MNT-011 | Interdicție de tăiere cu disc abraziv (flex) | activa | blocanta | neimplementata |
| MNT-012 | Retușarea obligatorie a muchiilor tăiate | activa | importanta | neimplementata |
| MNT-013 | Folia de protecție se îndepărtează imediat după montaj | activa | importanta | neimplementata |
| MNT-014 | Deschiderea maximă între stâlpi: 2.50 m | de-confirmat | importanta | neimplementata |
| MNT-015 | Sensul de montaj pentru profilele dublu vopsite și cu textură lemn | activa | importanta | neimplementata |
| MNT-016 | Verificarea verticalității la fiecare 5 șipci | propusa | informativa | neimplementata |
| OFR-001 | Comparația de prețuri este validă doar între modele cu status disponibil | activa | importanta | partiala |
| OFR-002 | Valabilitatea ofertei este de 7 zile calendaristice | activa | blocanta | implementata |
| OFR-003 | Oferta conține defalcarea pe segmente, nu doar totalul | activa | importanta | implementata |
| OFR-004 | Prețul de cost nu părăsește aplicația | activa | blocanta | implementata |
| OFR-005 | Trecerea în proformă păstrează exact valorile din ofertă | propusa | blocanta | neimplementata |
| PRET-001 | Conversia valutară se aplică înainte de orice marjă | activa | blocanta | implementata |
| PRET-002 | Cursul valutar se revizuiește lunar și se blochează pe durata ofertei | propusa | importanta | neimplementata |
| PRET-003 | Marja de furnizor se aplică multiplicativ pe prețul în RON | activa | blocanta | implementata |
| PRET-004 | Marja de partener se compune peste prețul de cost, nu peste cel de catalog | activa | blocanta | implementata |
| PRET-005 | Prețurile din ofertă sunt fără TVA | activa | blocanta | partiala |
| PRET-006 | Transportul și manopera nu sunt incluse în prețul din calculator | activa | importanta | implementata |
