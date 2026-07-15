# Workflow: Cowork exportă datele din SmartBill (2024–2025)

Rolurile:
- **Cowork + Claude in Chrome** (pe biroul lui Daniel) = mâinile: navighează în
  SmartBill Cloud ca Daniel și descarcă exporturile.
- **Sesiunea de analiză** (Claude Code / Cowork) = creierul: primește fișierele
  și produce analiza + raportul decalajelor.
- **Daniel** = doar pornește treaba și stă logat în SmartBill. Atât.

Condiții: Daniel e logat în SmartBill Cloud în Chrome, extensia Claude in
Chrome e activă, Cowork are voie să folosească browserul.

---

## Promptul de dat lui Cowork (copiază tot blocul de mai jos)

```
Deschide SmartBill Cloud (cloud.smartbill.ro) în Chrome — sunt deja logat.
Mergi la secțiunea Rapoarte și exportă următoarele, pe rând, pentru
perioada 01.01.2024 – 31.12.2025 (dacă un raport permite doar un an,
exportă separat 2024 și 2025):

1. Facturile emise — export Excel/CSV, cu client, dată, valoare, status încasare
2. Raportul de vânzări pe clienți
3. Raportul de vânzări pe produse/servicii
4. Încasările (ca să vedem întârzierile la plată)
5. Facturile storno/anulate, dacă există raport separat

Salvează toate fișierele într-un folder nou numit "export-smartbill-analiza"
pe Desktop. Nu modifica nimic în SmartBill — doar citești și exporți.
Dacă un raport nu există sau nu se poate exporta, notează și treci mai
departe; la final spune-mi exact ce ai obținut și ce a lipsit.
```

---

## După export — analiza

Daniel îi spune lui Cowork (sau sesiunii de analiză), dând folderul cu exporturile:

```
Analizează fișierele din export-smartbill-analiza și răspunde cu cifre exacte
la cele 10 întrebări din Secțiunea 8 a chestionarului profil-itc
(chestionar-profil-itc.md din repo-ul smartbill-openapi):
cifră de afaceri pe an, % cel mai mare client, % top 3 clienți, produsul cu
cei mai mulți bani, valoarea medie a facturii, luna cea mai bună/slabă,
% facturi încasate cu întârziere, evoluția pe categorii de cheltuieli dacă
există date. Apoi pune răspunsurile față în față cu estimările lui Daniel
din Secțiunea 8 și marchează decalajele mai mari de 20%.
```

Rezultatul = **raportul decalajelor**: percepție vs. realitate.

---

## Reguli de siguranță (rămân valabile oricât de automat e fluxul)

- Cowork în SmartBill: **doar citește și exportă**. Nu emite, nu modifică,
  nu șterge nimic. E scris explicit în prompt — rămâne scris în orice
  variantă viitoare a acestui workflow.
- Ordinea rămâne sacră: Daniel completează Secțiunea 8 DIN BURTĂ înainte
  ca cineva să se uite în exporturi.
