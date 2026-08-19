<!-- GENERAT AUTOMAT din reguli.json — nu edita manual. Rulează: python3 caiet.py genereaza -->

# Reguli de calcul, preț și accesorii

Registru versiunea 1.0.0 · actualizat 2026-08-19 · 24 reguli

Reguli care produc cifre. Se aplică la ofertare și trebuie să dea același rezultat indiferent cine calculează.

## CALC — Reguli de calcul - cantități, dimensiuni, rotunjiri

### CALC-001 — Număr de șipci pe segment

**Stare:** activa · **Prioritate:** blocanta · **În aplicație:** implementata

Numărul de șipci dintr-un segment se obține împărțind dimensiunea de repartiție (în mm) la pasul de repetiție și rotunjind în sus.

```
pcs = ceil(baza_mm / (w_useful_mm + gap_cm * 10))
```

| Parametru | Descriere | Valoare | UM | Sursă |
|---|---|---|---|---|
| `baza_mm` | L*1000 la vertical, h*1000 la orizontal | — | mm | — |

**Exemplu:** Segment 20 m vertical, model Oslo (115 mm), gap 2 cm => ceil(20000/135) = 149 buc

**Verificare:** Recalcul manual pe un segment din ofertă.

**Referință:** `calculator_sipca_v22_enterprise.html:394-398`

---

### CALC-002 — Ultima șipcă nu are interspațiu după ea

**Stare:** propusa · **Prioritate:** importanta · **În aplicație:** neimplementata

Formula curentă rezervă un interspațiu și după ultima șipcă, ceea ce poate supraestima cantitatea cu 1 bucată pe segment. Formula corectă adaugă un gap la baza de calcul înainte de împărțire.

```
pcs = ceil((baza_mm + gap_mm) / (w_useful_mm + gap_mm))
```

**Exemplu:** Segment 2.00 m, model 72 mm, gap 2 cm: actual ceil(2000/92)=22 buc; corect ceil(2020/92)=22 buc. Diferența apare la lungimi care cad exact pe pas.

**Verificare:** Se compară cele două formule pe 3 segmente reale înainte de a schimba motorul.

**Referință:** `abatere față de calculator_sipca_v22_enterprise.html:394`

**Note:** Decizie de luat: se păstrează varianta acoperitoare sau se trece pe formula exactă + rezervă CALC-008.

---

### CALC-003 — Metri liniari totali

**Stare:** activa · **Prioritate:** blocanta · **În aplicație:** implementata

Metrii liniari comandați de la furnizor sunt numărul de bucăți înmulțit cu lungimea unei șipci, însumat pe toate segmentele.

```
ml_total = suma(pcs_i * len_i)
```

**Verificare:** ml_total împărțit la pcs_total trebuie să dea lungimea medie a șipcii.

**Referință:** `calculator_sipca_v22_enterprise.html:406-412`

---

### CALC-004 — Prețul se calculează pe metru liniar, nu pe bucată

**Stare:** activa · **Prioritate:** blocanta · **În aplicație:** implementata

Prețurile din catalog sunt exprimate pe metru liniar de șipcă. Valoarea unei poziții se obține înmulțind numărul de bucăți cu lungimea și cu prețul pe metru liniar.

```
valoare = pcs * len * pret_ml
```

**Verificare:** Preț/bucată afișat = pret_ml * len.

**Referință:** `calculator_sipca_v22_enterprise.html:378, 405`

---

### CALC-005 — Lungimea comandată se rotunjește la multiplu de 10 cm

**Stare:** propusa · **Prioritate:** importanta · **În aplicație:** neimplementata

Furnizorii debitează la pas de 10 cm. Lungimea rezultată din măsurătoare se rotunjește în sus la cel mai apropiat multiplu de 0.10 m înainte de a fi trimisă în comandă.

```
len_comanda = ceil(len_masurat * 10) / 10
```

**Exemplu:** 1.63 m măsurat => 1.70 m comandat

**Verificare:** Toate lungimile din comandă au o singură zecimală.

**Referință:** `aplicația acceptă orice zecimală`

**Note:** De confirmat pasul de debitare la fiecare furnizor; unii lucrează la 1 cm.

---

### CALC-006 — Lungime minimă comandabilă 0.50 m

**Stare:** activa · **Prioritate:** blocanta · **În aplicație:** neimplementata

Nicio poziție nu poate avea lungimea sub minLen-ul furnizorului (0.50 m la toți cei 4). Sub această valoare, poziția se comandă la 0.50 m și se debitează pe șantier.

**Verificare:** Se introduce o înălțime de 0.30 m: oferta trebuie să semnaleze regula.

**Referință:** `minLen există în PROVIDERS dar nu este verificat nicăieri`

**Note:** Abatere confirmată în cod - vezi abateri.md.

---

### CALC-007 — Lungime maximă pe furnizor

**Stare:** activa · **Prioritate:** blocanta · **În aplicație:** implementata

Lungimea unei șipci nu poate depăși maxLen-ul furnizorului: Caretta 6.00 m, TPS 6.00 m, Arkada 6.00 m, Bilka 2.50 m. Modelele care depășesc limita se marchează indisponibile, nu se împart automat.

**Verificare:** Înălțime 3 m => toate modelele Bilka trebuie să iasă din listă.

**Referință:** `calculator_sipca_v22_enterprise.html:331-350`

---

### CALC-008 — Rezervă de manoperă 3% pe cantitate

**Stare:** propusa · **Prioritate:** importanta · **În aplicație:** neimplementata

La cantitatea rezultată din calcul se adaugă o rezervă de 3% (minim 2 bucăți per comandă) pentru pierderi la debitare, deteriorări la transport și corecții de aliniere.

```
pcs_comanda = pcs + max(2, ceil(pcs * 0.03))
```

**Exemplu:** 149 buc calculate => 149 + max(2, 5) = 154 buc comandate

**Verificare:** Rezerva se afișează ca poziție distinctă în ofertă, nu se ascunde în cantitate.

**Referință:** `nu există factor de rezervă în motor`

**Note:** De agreat procentul: 3% la garduri drepte, propunere 5% la garduri cu pante sau unghiuri.

---

### CALC-009 — Segmentele se calculează independent și se însumează la final

**Stare:** activa · **Prioritate:** importanta · **În aplicație:** implementata

Fiecare segment se calculează separat (are propriul număr de bucăți și propria lungime). Nu se însumează lungimile segmentelor înainte de calcul, pentru că restul de la capăt se pierde pe fiecare segment în parte.

**Verificare:** 2 segmente de 10 m dau cu 1-2 bucăți mai mult decât 1 segment de 20 m. Este corect.

**Referință:** `calculator_sipca_v22_enterprise.html:386-419`

---

### CALC-010 — Maxim 10 segmente per ofertă

**Stare:** activa · **Prioritate:** informativa · **În aplicație:** implementata

O ofertă conține maxim 10 segmente. Peste această limită lucrarea se împarte pe tronsoane cu oferte separate, pentru trasabilitate la montaj.

**Verificare:** Butonul de adăugare segment se blochează la 10.

**Referință:** `calculator_sipca_v22_enterprise.html:513-517`

---

### CALC-011 — Modul cantitate directă ocolește regulile de repartiție

**Stare:** activa · **Prioritate:** importanta · **În aplicație:** implementata

În modul 'cantitate directă' se folosesc bucățile și lungimea introduse manual. Regulile MNT-002, MNT-004 și CALC-001 nu se aplică; rămân valabile CALC-006, CALC-007 și toate regulile de preț.

```
valoare = pcs_introdus * len_introdusa * pret_ml
```

**Verificare:** Se folosește doar pentru recomandă sau completare, nu pentru ofertare de la zero.

**Referință:** `calculator_sipca_v22_enterprise.html:381-393`

---

### CALC-012 — Rotunjirea monetară se face doar la afișare

**Stare:** activa · **Prioritate:** importanta · **În aplicație:** implementata

Toate calculele intermediare (curs valutar, marje) se păstrează cu precizie completă. Rotunjirea la 2 zecimale se aplică exclusiv la afișare și la tipărirea ofertei.

**Verificare:** Suma pozițiilor rotunjite poate diferi cu maxim 0.05 RON de totalul rotunjit; diferența e acceptabilă.

**Referință:** `toFixed(2) apare doar în randare`

---

### CALC-013 — Cantitățile se rotunjesc întotdeauna în sus

**Stare:** activa · **Prioritate:** blocanta · **În aplicație:** implementata

Bucăți, șuruburi, nituri și cutii se rotunjesc în sus (ceil), niciodată la cel mai apropiat întreg. O jumătate de bucată nu se poate comanda.

**Verificare:** Nicio cantitate din ofertă nu are zecimale.

**Referință:** `calculator_sipca_v22_enterprise.html:394, 398, 421-425`

---

### CALC-014 — Măsurătoarea de teren se ia pe fiecare tronson, cu 3 cote pe verticală

**Stare:** propusa · **Prioritate:** importanta · **În aplicație:** neimplementata

Pentru fiecare segment se măsoară lungimea între axele stâlpilor de capăt și înălțimea în 3 puncte (stânga, mijloc, dreapta). Se folosește în calcul înălțimea MAXIMĂ. Diferența dintre cote se notează în fișa de șantier; peste 5 cm terenul se tratează în trepte.

```
h_calcul = max(h_stanga, h_mijloc, h_dreapta)
```

**Verificare:** Fișa de șantier conține 3 cote pentru fiecare segment.

**Referință:** `aplicația acceptă o singură înălțime per segment`

---

## PRET — Reguli de preț - marje, curs valutar, TVA

### PRET-001 — Conversia valutară se aplică înainte de orice marjă

**Stare:** activa · **Prioritate:** blocanta · **În aplicație:** implementata

Pentru furnizorii cu preț în EUR (Bilka), prețul de catalog se convertește în RON cu cursul din fișa furnizorului, apoi se aplică marjele. Nu se aplică marja pe valoarea în EUR.

```
pret_ron = pret_eur * curs
```

| Parametru | Descriere | Valoare | UM | Sursă |
|---|---|---|---|---|
| `curs` | — | 4.97 | RON/EUR | PROVIDERS.Bilka.exchange |

**Verificare:** Bilka Sofia 0.96 EUR/ml => 4.77 RON/ml înainte de marjă.

**Referință:** `calculator_sipca_v22_enterprise.html:370-373`

---

### PRET-002 — Cursul valutar se revizuiește lunar și se blochează pe durata ofertei

**Stare:** propusa · **Prioritate:** importanta · **În aplicație:** neimplementata

Cursul folosit este cel din fișa furnizorului, actualizat în prima zi lucrătoare a lunii. Cursul valabil la data emiterii se blochează pentru perioada de valabilitate a ofertei (OFR-002). Dacă cursul BNR crește cu peste 2% față de cel din fișă, oferta se recalculează.

**Verificare:** Data ultimei actualizări a cursului se notează în caiet la fiecare revizie.

**Referință:** `cursul este constantă hardcodată`

**Note:** Curs în fișă la 2026-08-19: 4.97 RON/EUR.

---

### PRET-003 — Marja de furnizor se aplică multiplicativ pe prețul în RON

**Stare:** activa · **Prioritate:** blocanta · **În aplicație:** implementata

Prețul de cost se obține aplicând marja fixă a furnizorului: Caretta 10.00%, Bilka 6.98%, TPS 8.50%, Arkada 10.00%.

```
pret_cost = pret_ron * (1 + marja_furnizor / 100)
```

**Verificare:** Marjele se modifică doar din panoul Admin, cu consemnare în caiet.

**Referință:** `calculator_sipca_v22_enterprise.html:376`

---

### PRET-004 — Marja de partener se compune peste prețul de cost, nu peste cel de catalog

**Stare:** activa · **Prioritate:** blocanta · **În aplicație:** implementata

Marja partenerului (ghost margin) se aplică peste prețul de cost, deci marjele se compun multiplicativ, nu se adună. Marja de partener nu este vizibilă clientului.

```
pret_vanzare = pret_ron * (1 + marja_furnizor/100) * (1 + marja_partener/100)
```

**Exemplu:** Marjă furnizor 10% + partener 10% => 21% total, nu 20%.

**Verificare:** Se compară prețul de vânzare cu prețul de cost afișat în panoul Admin.

**Referință:** `calculator_sipca_v22_enterprise.html:379`

---

### PRET-005 — Prețurile din ofertă sunt fără TVA

**Stare:** activa · **Prioritate:** blocanta · **În aplicație:** partiala

Toate valorile calculate și afișate sunt fără TVA. TVA-ul (19%) se aplică o singură dată, la emiterea proformei/facturii, pe totalul general. Mențiunea 'fără TVA' este obligatorie pe orice document trimis clientului.

```
total_cu_tva = total_fara_tva * (1 + 19/100)
```

**Verificare:** Totalul din proforma SmartBill = total ofertă * 1.19.

**Referință:** `cota există (adminSettings.defaultVAT) dar nu se aplică nicăieri în calcul; PDF-ul afișează corect 'fără TVA'`

---

### PRET-006 — Transportul și manopera nu sunt incluse în prețul din calculator

**Stare:** activa · **Prioritate:** importanta · **În aplicație:** implementata

Calculatorul returnează exclusiv valoarea materialului și a consumabilelor de fixare. Transportul, manopera de montaj și structura de susținere se ofertează separat și se menționează explicit ca neincluse.

**Verificare:** Subsolul ofertei conține mențiunea.

**Referință:** `calculator_sipca_v22_enterprise.html:1472 (mențiune în subsol)`

---

## ACC — Reguli accesorii - fixare, consumabile

### ACC-001 — Consumul de fixare se calculează pe puncte reale de prindere

**Stare:** propusa · **Prioritate:** importanta · **În aplicație:** partiala

Numărul de șuruburi sau nituri este numărul de șipci înmulțit cu numărul de rigle (MNT-005) și cu 2 puncte pe intersecție (MNT-006). Formula actuală folosește un consum pe metru liniar înmulțit cu 2, fără a ține cont de lungimea șipcii, ceea ce subestimează consumul la șipci lungi.

```
buc_fixare = pcs * nr_rigle * 2
```

**Exemplu:** 149 șipci de 1.65 m, 2 rigle => 149 * 2 * 2 = 596 șuruburi. Formula actuală dă 149 * 6 * 2 = 1788.

**Verificare:** Se compară consumul estimat cu cel real de pe ultimele 3 șantiere înainte de schimbarea formulei.

**Referință:** `calculator_sipca_v22_enterprise.html:420-425 foloseste pcs * screwsPerM * 2`

**Note:** Abatere dimensională confirmată: screwsPerM este declarat pe metru dar nu se înmulțește cu lungimea.

---

### ACC-002 — Ambalarea consumabilelor: șuruburile la cutie, niturile la bucată

**Stare:** activa · **Prioritate:** importanta · **În aplicație:** implementata

Șuruburile autoforante se comandă în cutii de 250 bucăți, la 45 RON cutia, cu rotunjire în sus la cutie întreagă. Pop-niturile 4.8x12 se comandă la bucată, 0.25 RON/bucată.

```
cutii = ceil(buc_suruburi / 250); valoare = cutii * 45 | valoare_nituri = buc_nituri * 0.25
```

**Verificare:** 596 șuruburi => 3 cutii => 135 RON.

**Referință:** `calculator_sipca_v22_enterprise.html:180-183, 422-425`

---

### ACC-003 — Culoarea consumabilelor urmează RAL-ul comenzii

**Stare:** activa · **Prioritate:** importanta · **În aplicație:** neimplementata

Șuruburile și niturile se comandă vopsite în RAL-ul șipcii. Dacă RAL-ul nu este disponibil la consumabil, se alege cea mai apropiată nuanță și se consemnează în ofertă, cu acordul clientului.

**Verificare:** RAL-ul consumabilului apare pe comanda către furnizor.

**Referință:** `prețul consumabilului este unic, indiferent de culoare`

**Note:** De verificat dacă există diferență de preț pe RAL-uri speciale (Wood).

---

### ACC-004 — Un tub de vopsea de retuș per RAL din comandă

**Stare:** propusa · **Prioritate:** importanta · **În aplicație:** neimplementata

Fiecare comandă include minim un tub de vopsea de retuș pentru fiecare RAL comandat, necesar pentru aplicarea MNT-012. La comenzi peste 500 ml se adaugă câte un tub la fiecare 500 ml.

```
tuburi = nr_RAL_distincte + floor(ml_total / 500)
```

**Verificare:** Poziția apare pe deviz chiar dacă nu se prevăd tăieri.

**Referință:** `consumabil inexistent în ACCESSORIES`

**Note:** De adăugat prețul de achiziție în fișa de accesorii.

---
