<!-- GENERAT AUTOMAT din reguli.json — nu edita manual. Rulează: python3 caiet.py genereaza -->

# Reguli de catalog și ofertare

Registru versiunea 1.0.0 · actualizat 2026-08-19 · 9 reguli

Reguli care decid ce se poate oferta și cum arată documentul trimis clientului.

## CAT — Reguli de catalog - disponibilitate configurații

### CAT-001 — Combinația grosime + finisaj + culoare trebuie să existe la furnizor

**Stare:** activa · **Prioritate:** blocanta · **În aplicație:** implementata

Un model este ofertabil doar dacă furnizorul lui are în catalog exact combinația grosime + finisaj selectată, iar culoarea cerută se află în lista acelei combinații. Nu se substituie grosimea sau finisajul fără acordul clientului.

**Verificare:** Modelele indisponibile rămân vizibile în listă, cu motivul afișat.

**Referință:** `calculator_sipca_v22_enterprise.html:322-330`

---

### CAT-002 — Filtrele se aplică în cascadă: vopsire -> grosime -> finisaj -> culoare

**Stare:** activa · **Prioritate:** importanta · **În aplicație:** implementata

Selecțiile se fac strict în ordinea vopsire, grosime, finisaj, culoare. Schimbarea unui filtru din amonte resetează automat filtrele din aval, pentru a nu rămâne cu o combinație imposibilă.

**Verificare:** Schimbă grosimea: finisajul și culoarea trebuie să se golească dacă nu mai sunt valide.

**Referință:** `calculator_sipca_v22_enterprise.html:274-300`

---

### CAT-003 — Modelele nu dispar niciodată din listă

**Stare:** activa · **Prioritate:** importanta · **În aplicație:** implementata

Toate cele 10 modele rămân afișate indiferent de filtre. Cele care nu satisfac configurația se marchează 'indisponibil' cu motivul explicit. Ascunderea modelelor împiedică agentul să propună alternative.

**Verificare:** Lista are mereu 10 rânduri.

**Referință:** `calculator_sipca_v22_enterprise.html:309, 429-440`

---

### CAT-004 — Dublu vopsit se cere obligatoriu când gardul e vizibil pe ambele fețe

**Stare:** propusa · **Prioritate:** importanta · **În aplicație:** partiala

Dacă la preluarea comenzii se constată că gardul este vizibil din ambele părți (gard la stradă, între vecini, balustradă), se ofertează exclusiv finisaje cu paintType 'double'. Ofertarea unui profil single în această situație este eroare de ofertare, nu opțiune de preț.

**Verificare:** Fișa de șantier are câmpul 'vizibil pe ambele fețe: DA/NU' completat obligatoriu.

**Referință:** `filtrul există (filterPaintType) dar alegerea nu este condiționată de context`

---

## OFR — Reguli de ofertare - document, valabilitate, prezentare

### OFR-001 — Comparația de prețuri este validă doar între modele cu status disponibil

**Stare:** activa · **Prioritate:** importanta · **În aplicație:** partiala

Sortarea afișează întâi modelele disponibile, apoi cele incomplete, apoi cele indisponibile. Statisticile de tip 'cel mai ieftin' se referă exclusiv la modelele disponibile și sunt corecte doar când sortarea este crescătoare după preț.

**Verificare:** Comută sortarea pe descrescător: eticheta 'cel mai ieftin' nu mai corespunde.

**Referință:** `calculator_sipca_v22_enterprise.html:442-455, 460-466 (quickStats ia primul rezultat, indiferent de sortare)`

**Note:** Abatere confirmată - vezi abateri.md.

---

### OFR-002 — Valabilitatea ofertei este de 7 zile calendaristice

**Stare:** activa · **Prioritate:** blocanta · **În aplicație:** implementata

Orice ofertă are valabilitate 7 zile de la data emiterii. După expirare, prețurile se recalculează cu catalogul și cursul curente. Valabilitatea se modifică doar din panoul Admin, cu consemnare în caiet.

**Verificare:** Data emiterii și termenul apar pe documentul PDF.

**Referință:** `calculator_sipca_v22_enterprise.html:207, 1351, 1471`

---

### OFR-003 — Oferta conține defalcarea pe segmente, nu doar totalul

**Stare:** activa · **Prioritate:** importanta · **În aplicație:** implementata

Documentul trimis clientului listează fiecare segment cu dimensiunile, numărul de bucăți, lungimea și valoarea. Totalul general include consumabilele de fixare dacă acestea au fost bifate.

**Verificare:** Suma valorilor pe segmente + consumabile = total general.

**Referință:** `calculator_sipca_v22_enterprise.html:1400-1465`

---

### OFR-004 — Prețul de cost nu părăsește aplicația

**Stare:** activa · **Prioritate:** blocanta · **În aplicație:** implementata

Prețul de cost și marja de partener se afișează exclusiv în panourile protejate și nu apar niciodată în documentul PDF, în proforma SmartBill sau în comunicarea cu clientul.

**Verificare:** Se generează un PDF cu showCostPrice activ: costul nu trebuie să apară.

**Referință:** `adminSettings.showCostPrice controlează doar afișarea internă`

---

### OFR-005 — Trecerea în proformă păstrează exact valorile din ofertă

**Stare:** propusa · **Prioritate:** blocanta · **În aplicație:** neimplementata

La emiterea proformei prin SmartBill, denumirea, cantitatea și prețul unitar se preiau identic din oferta acceptată. Cantitatea trimisă este în metri liniari, iar prețul unitar este prețul de vânzare pe metru liniar, fără TVA.

```
products[i].quantity = ml_pozitie; products[i].price = pret_vanzare_ml
```

**Verificare:** Totalul proformei fără TVA = totalul ofertei.

**Referință:** `smartbill_proforma_openapi (1).json - schema ProformaRequest`

**Note:** De stabilit convenția pentru codul produsului (products[].code) - propunere: MODEL-GROSIME-RAL.

---
