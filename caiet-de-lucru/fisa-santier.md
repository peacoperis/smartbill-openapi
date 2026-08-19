# Fișă de șantier — măsurătoare, ofertare, montaj

Se completează un exemplar per lucrare. Câmpurile marcate cu `[!]` sunt
obligatorii; fără ele nu se emite ofertă. Coloana "Regulă" arată codul din
caietul de lucru care impune câmpul — se folosește la orice discuție ulterioară.

---

## 1. Identificare lucrare

| Câmp | Valoare | Regulă |
|---|---|---|
| Client | | |
| Telefon | | |
| Locație | | |
| Data măsurătorii | | |
| Agent | | |
| Nr. ofertă | | |

---

## 2. Context (decide ce se poate oferta)

| Întrebare | Răspuns | Regulă |
|---|---|---|
| `[!]` Gardul e vizibil pe ambele fețe? | DA / NU | CAT-004 |
| `[!]` Montaj vertical sau orizontal? | | MNT-001 |
| `[!]` Interspațiu agreat (cm) | | MNT-003 |
| Cine a confirmat interspațiul, dacă > 5 cm | | MNT-003 |
| Înălțimea include garda de 5 cm de la sol? | DA / NU | MNT-009 |
| Deschiderea între stâlpi (m) | | MNT-014 |
| Structura de rigle există deja? | DA / NU | MNT-005 |
| Teren în pantă / în trepte? | | CALC-014 |

---

## 3. Măsurători pe segmente

Înălțimea se ia în 3 puncte pe fiecare segment; în calcul intră valoarea
maximă (CALC-014). Lungimea se măsoară între axele stâlpilor de capăt.

| Seg. | Lungime (m) | h stânga | h mijloc | h dreapta | h calcul (max) | Observații |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

- Maxim 10 segmente per ofertă — CALC-010
- Diferență între cote > 5 cm ⇒ se tratează în trepte — CALC-014
- La montaj orizontal, segmentele peste 2.50 m se împart în tronsoane — MNT-014

---

## 4. Configurație aleasă

| Câmp | Valoare | Regulă |
|---|---|---|
| `[!]` Tip vopsire (simplu / dublu) | | CAT-004 |
| `[!]` Grosime (mm) | | CAT-001, CAT-002 |
| `[!]` Finisaj | | CAT-001 |
| `[!]` Culoare RAL | | CAT-001, ACC-003 |
| Model ales | | |
| Furnizor | | |
| Lungime șipcă (m) | | CALC-006, CALC-007 |

Verificări înainte de ofertare:

- [ ] Lungimea șipcii ≥ 0.50 m — CALC-006
- [ ] Lungimea șipcii ≤ maxLen furnizor (Bilka 2.50 m, restul 6.00 m) — CALC-007
- [ ] Lungimea rotunjită la multiplu de 10 cm — CALC-005
- [ ] Combinația grosime + finisaj + culoare există la furnizor — CAT-001

---

## 5. Cantități

| Poziție | Formula | Rezultat | Regulă |
|---|---|---|---|
| Pas de repetiție | `w_useful + gap×10` (mm) | | MNT-002 |
| Bucăți per segment | `ceil(bază_mm / pas_mm)` | | CALC-001 |
| Rezervă | `max(2, ceil(pcs × 3%))` | | CALC-008 |
| Total bucăți comandate | | | |
| Metri liniari | `Σ(pcs × len)` | | CALC-003 |
| Rigle necesare per șipcă | `max(2, ceil(len/1.20)+1)` | | MNT-005 |
| Puncte de fixare | `pcs × rigle × 2` | | MNT-006, ACC-001 |
| Cutii șuruburi | `ceil(buc/250)` | | ACC-002 |
| Nituri (buc) | | | ACC-002 |
| Tuburi retuș | `nr_RAL + floor(ml/500)` | | ACC-004, MNT-012 |

Restul de la capătul segmentului: ______ mm.
Dacă < 1/3 din lățimea utilă ⇒ se redistribuie interspațiul, NU se taie
longitudinal — MNT-004. Interspațiu real rezultat: ______ cm.

---

## 6. Preț (fără TVA)

| Element | Valoare | Regulă |
|---|---|---|
| Curs folosit (dacă furnizor EUR) | | PRET-001, PRET-002 |
| Total material | | CALC-004 |
| Total consumabile | | ACC-002 |
| **TOTAL GENERAL fără TVA** | | PRET-005 |
| Valabilitate ofertă (zile) | 7 | OFR-002 |

- Prețurile nu includ TVA, transport, manoperă și structură — PRET-005, PRET-006
- Prețul de cost și marja de partener NU apar pe document — OFR-004

---

## 7. Control la montaj

| Verificare | OK | Regulă |
|---|---|---|
| Tăierile făcute cu foarfece/nibbler, fără flex | | MNT-011 |
| Muchiile tăiate retușate în aceeași zi | | MNT-012 |
| Garnitura EPDM comprimată uniform, tabla nedeformată | | MNT-008 |
| Fixare la ≥ 15 mm de margine | | MNT-010 |
| Minim 2 rigle per șipcă, pas ≤ 1.20 m | | MNT-005 |
| 2 puncte pe fiecare intersecție șipcă-riglă | | MNT-006 |
| Capăt inferior la ≥ 50 mm de sol | | MNT-009 |
| Sensul texturii / feței finisate identic pe tot gardul | | MNT-015 |
| Verticalitate verificată la fiecare 5 șipci (abatere ≤ 3 mm) | | MNT-016 |
| Folia de protecție îndepărtată | | MNT-013 |
| Sistem de fixare conform modelului (șurub / nit) | | MNT-007 |

---

## 8. Abateri constatate

Orice abatere se scrie aici cu codul regulii, apoi se trece în caiet cu
`python3 caiet.py noteaza COD "text"`.

| Regulă | Ce s-a constatat | Măsură luată | Trecut în caiet |
|---|---|---|---|
| | | | ☐ |
| | | | ☐ |
| | | | ☐ |

Semnătură agent: ______________  Semnătură client: ______________
