<!-- GENERAT AUTOMAT din reguli.json — nu edita manual. Rulează: python3 caiet.py genereaza -->

# Legile montajului

Registru versiunea 1.0.0 · actualizat 2026-08-19 · 16 reguli

Reguli fizice de execuție. Se aplică pe șantier și se verifică la recepție. Orice abatere se notează în fișa de șantier cu identificatorul regulii.

### MNT-001 — Orientarea montajului decide ce dimensiune devine lungimea șipcii

**Stare:** activa · **Prioritate:** blocanta · **În aplicație:** implementata

La montaj VERTICAL lungimea comandată a șipcii este ÎNĂLȚIMEA segmentului, iar numărul de bucăți se calculează pe LUNGIMEA segmentului. La montaj ORIZONTAL se inversează: lungimea șipcii este LUNGIMEA segmentului, iar numărul de bucăți se calculează pe ÎNĂLȚIME.

```
vertical: len = h, baza_repartitie = L | orizontal: len = L, baza_repartitie = h
```

| Parametru | Descriere | Valoare | UM | Sursă |
|---|---|---|---|---|
| `L` | lungimea segmentului de gard | — | m | — |
| `h` | înălțimea segmentului de gard | — | m | — |

**Verificare:** Schimbă tipul montajului: numărul de bucăți și lungimea trebuie să se inverseze.

**Referință:** `calculator_sipca_v22_enterprise.html:389-401`

---

### MNT-002 — Pasul de repetiție = lățime utilă + interspațiu

**Stare:** activa · **Prioritate:** blocanta · **În aplicație:** implementata

Distanța dintre axele a două șipci consecutive (pasul) este lățimea utilă a modelului plus interspațiul ales. Lățimea utilă este cea din fișa modelului, NU lățimea totală a tablei.

```
pas_mm = w_useful_mm + gap_cm * 10
```

| Parametru | Descriere | Valoare | UM | Sursă |
|---|---|---|---|---|
| `w_useful` | lățime utilă model (72 / 90 / 96 / 105 / 107 / 115 / 118) | — | mm | MODELS_DB |
| `gap` | interspațiu între șipci | — | cm | — |

**Verificare:** Pentru Y109 (72 mm) cu gap 2 cm, pasul = 92 mm.

**Referință:** `calculator_sipca_v22_enterprise.html:394`

---

### MNT-003 — Interspațiu admis 0-5 cm; peste 5 cm se cere confirmare scrisă

**Stare:** propusa · **Prioritate:** importanta · **În aplicație:** neimplementata

Interspațiul standard este 2 cm. Sub 1 cm montajul devine sensibil la toleranțe și dilatare. Peste 5 cm gardul pierde intimitatea vizuală, iar clientul trebuie să confirme în scris pe ofertă că acceptă vizibilitatea rezultată.

**Condiții:** gap >= 0 cm; gap <= 5 cm fără confirmare

**Excepții:** Montaj tip jaluzea sau panou decorativ, unde gap-ul este parte din design

**Verificare:** Se notează în fișa de șantier valoarea gap agreată și cine a confirmat-o.

**Referință:** `gap este liber în interfață`

---

### MNT-004 — Restul de la capăt se redistribuie, nu se taie longitudinal

**Stare:** propusa · **Prioritate:** importanta · **În aplicație:** neimplementata

Numărul de șipci se rotunjește în sus. Dacă ultima șipcă ar rămâne mai îngustă de 1/3 din lățimea utilă, NU se taie longitudinal: se redistribuie diferența mărind uniform interspațiul pe tot segmentul.

```
rest_mm = baza_mm - (pcs - 1) * pas_mm; dacă rest_mm < w_useful/3 => gap_real = (baza_mm - pcs * w_useful) / (pcs - 1)
```

**Verificare:** Segment 5.00 m, model 115 mm, gap 2 cm => pas 135 mm, pcs = 38, rest vizibil se distribuie.

**Referință:** `codul aplică doar Math.ceil, fără redistribuire`

---

### MNT-005 — Număr minim de rigle (traverse) în funcție de lungimea șipcii

**Stare:** de-confirmat · **Prioritate:** blocanta · **În aplicație:** neimplementata

Fiecare șipcă se sprijină pe minim 2 rigle. Pasul maxim între rigle este 1.20 m. Pentru șipci mai lungi de 2.40 m sunt obligatorii 3 rigle, iar peste 3.60 m sunt obligatorii 4 rigle.

```
nr_rigle = max(2, ceil(len_m / 1.20) + 1)
```

| Parametru | Descriere | Valoare | UM | Sursă |
|---|---|---|---|---|
| `pas_rigla_max` | — | 1.2 | m | — |

**Verificare:** Șipcă de 1.65 m => 2 rigle. Șipcă de 2.50 m => 3 rigle.

**Referință:** `riglele nu sunt calculate în aplicație`

**Note:** De confirmat pasul pentru grosimea 0.40 mm, care e mai flexibilă.

---

### MNT-006 — Două puncte de prindere pe fiecare intersecție șipcă-riglă

**Stare:** activa · **Prioritate:** importanta · **În aplicație:** partiala

La fiecare intersecție dintre o șipcă și o riglă se execută 2 puncte de fixare (2 rânduri de prindere), pe cele două nervuri exterioare ale profilului.

```
puncte_pe_sipca = 2 * nr_rigle
```

**Verificare:** Vezi ACC-001 pentru transformarea în cantitate de consumabile.

**Referință:** `calculator_sipca_v22_enterprise.html:421 (factorul 2 = 2 rânduri)`

---

### MNT-007 — Sistemul de fixare este impus de model, nu ales de montator

**Stare:** activa · **Prioritate:** blocanta · **În aplicație:** implementata

Modelele cu fixType 'screw' se prind cu șuruburi autoforante cu garnitură EPDM. Modelele cu fixType 'rivet' (Tisa, Indiana) se prind cu pop-nituri 4.8x12. Nu se substituie sistemul fără acordul furnizorului, altfel se pierde garanția.

**Verificare:** Modelul din ofertă și consumabilul din deviz trebuie să corespundă.

**Referință:** `calculator_sipca_v22_enterprise.html:103-114, 419-426`

---

### MNT-008 — Garnitura EPDM se comprimă ușor, fără deformarea profilului

**Stare:** activa · **Prioritate:** importanta · **În aplicație:** neimplementata

Șurubul se strânge până când garnitura EPDM iese uniform 0.5-1 mm de sub șaibă. Strângerea excesivă deformează tabla, sparge stratul de vopsea și creează punct de coroziune.

**Verificare:** Control vizual la fiecare 10 șipci montate.

**Referință:** `regulă de execuție`

---

### MNT-009 — Distanța minimă de la sol: 50 mm

**Stare:** propusa · **Prioritate:** importanta · **În aplicație:** neimplementata

Capătul inferior al șipcii se montează la minim 50 mm față de sol sau soclu, pentru a evita contactul permanent cu apa și pornirea coroziunii pe muchia tăiată.

```
h_sipca = h_gard - 0.05 m (dacă h_gard include cota de la sol)
```

**Verificare:** La preluarea măsurătorii se notează dacă h include sau nu garda de 5 cm.

**Referință:** `aplicația folosește direct înălțimea introdusă`

---

### MNT-010 — Găurile de fixare la minim 15 mm de marginea șipcii

**Stare:** de-confirmat · **Prioritate:** importanta · **În aplicație:** neimplementata

Punctul de fixare se execută la minim 15 mm de marginea longitudinală și minim 20 mm de capătul șipcii, pentru a nu rupe tabla în timp.

**Verificare:** Se verifică pe prima șipcă montată din fiecare segment.

**Referință:** `regulă de execuție`

**Note:** De confirmat cu fișa tehnică a fiecărui furnizor.

---

### MNT-011 — Interdicție de tăiere cu disc abraziv (flex)

**Stare:** activa · **Prioritate:** blocanta · **În aplicație:** neimplementata

Șipca metalică NU se taie cu flexul. Temperatura arde stratul de zinc și vopseaua, iar scânteile se lipesc de suprafață. Se taie exclusiv cu foarfece de tablă, nibbler sau fierăstrău cu pânză pentru metal la turație mică.

**Verificare:** Tăietură cu margine curată, fără decolorare pe zona adiacentă.

**Referință:** `regulă de execuție`

**Note:** Tăierea cu flex anulează garanția anticorozivă la toți cei 4 furnizori.

---

### MNT-012 — Retușarea obligatorie a muchiilor tăiate

**Stare:** activa · **Prioritate:** importanta · **În aplicație:** neimplementata

Orice tăietură executată pe șantier se retușează cu vopsea de retuș în RAL-ul comenzii, în aceeași zi. Se aplică și pe capetele rezultate din debitare la lungime.

**Verificare:** Se adaugă 1 tub retuș la fiecare RAL din comandă (vezi ACC-004).

**Referință:** `consumabil neinclus în deviz`

---

### MNT-013 — Folia de protecție se îndepărtează imediat după montaj

**Stare:** activa · **Prioritate:** importanta · **În aplicație:** neimplementata

Folia de protecție se îndepărtează cel târziu la finalul zilei de montaj și în maxim 30 de zile de la livrare. Depășirea termenului duce la lipirea adezivului de vopsea.

**Verificare:** Se consemnează în procesul-verbal de recepție.

**Referință:** `regulă de execuție`

---

### MNT-014 — Deschiderea maximă între stâlpi: 2.50 m

**Stare:** de-confirmat · **Prioritate:** importanta · **În aplicație:** neimplementata

Distanța între axele stâlpilor nu depășește 2.50 m. La montaj ORIZONTAL această valoare devine și lungimea maximă utilă a șipcii, deoarece șipca trebuie să reazeme pe stâlpi.

```
orizontal: len_sipca <= deschidere_stalpi <= 2.50 m
```

**Verificare:** La montaj orizontal, segmentele mai lungi de 2.50 m se împart în tronsoane.

**Referință:** `aplicația limitează doar la maxLen furnizor`

---

### MNT-015 — Sensul de montaj pentru profilele dublu vopsite și cu textură lemn

**Stare:** activa · **Prioritate:** importanta · **În aplicație:** neimplementata

La profilele 'Dublu Mat' ambele fețe sunt finisate și se montează cu fața de catalog spre exterior. La finisajele Wood (Stejar Auriu, Nuc) toate șipcile se montează cu textura în același sens, altfel modelul lemnului apare inversat.

**Verificare:** Se marchează sensul pe prima șipcă și se folosește ca referință.

**Referință:** `paintType există în CATALOG_DATA, sensul nu e tratat`

---

### MNT-016 — Verificarea verticalității la fiecare 5 șipci

**Stare:** propusa · **Prioritate:** informativa · **În aplicație:** neimplementata

Se trasează prima șipcă cu bolobocul și se verifică abaterea la fiecare 5 șipci montate. Abaterea admisă este 3 mm pe înălțimea gardului; peste această valoare se corectează prin interspațiu, nu prin înclinarea șipcii.

**Verificare:** Măsurare cu boloboc de 1 m sau fir cu plumb.

**Referință:** `regulă de execuție`

---
