# Profil ITC / Peaco Peris — v1

Sursa: interviu adaptiv, sesiunea "agenți și subagenți" (22.08.2026).
Status: parțial — completat pe zona ofertare/prețuri. Restul secțiunilor
din `chestionar-profil-itc.md` rămân de completat.

---

## Profilul operatorului (Daniel)

- **Decide pe instinct/experiență**, nu pe cifre.
- **Nu are frâne declarate** la automatizare — deschis la orice.
- Vrea informația: **vizual (tabele/dashboard) + întrebări punctuale + explicat pas cu pas**.
- **Se pierde în vorbire liberă.** Regula de lucru: nu i se cer povești, i se pun
  întrebări cu variante. Interviul adaptiv funcționează, formularul lung nu.
- Are **Cowork + Claude in Chrome** pe birou. Treaba murdară din browser
  (navigat, exportat, click-uri) se deleagă acolo, NU la Daniel.

**Consecință pentru sistem:** instinct + zero frâne = viteză mare și risc mare.
Echilibrarea nu se face frânând omul, ci livrându-i date vizuale înainte de
decizie, și păstrând confirmarea umană pe ce pleacă din firmă.

---

## Business

- Produs principal: **table, tablă cutată, acoperișuri** (peste 50% din oferte).
- **Șipca metalică: sub 50%** din oferte.
- Peste **5 furnizori** principali.
- Conversie oferte estimată (din burtă): **3-5 din 10**.

---

## Procesul de ofertare (starea reală, azi)

1. Cererea vine **telefonic / WhatsApp / pe teren** — niciodată structurat.
2. Datele clientului: **Daniel le ține minte.** Nu există captare scrisă.
3. Oferta se face în **Excel/Sheets**, manual.
4. Partea cea mai consumatoare de timp: **calculul efectiv**.

### Punctele rupte ale lanțului

- **Veriga 0 lipsește:** cererea nu are urmă digitală. Nimic nu poate porni
  automat dintr-o informație care există doar în memoria lui Daniel.
- **Unealta există dar e moartă:** `calculator_sipca_v22_enterprise.html` face
  deja date client + tip vopsire + mod calcul + orientare + gap + dimensiuni +
  accesorii + ofertă cu total. **Nu e folosit dintr-un singur motiv: prețurile
  din el nu mai sunt actuale.**
- Calculatorul acoperă doar șipca, adică segmentul minoritar. Tablele —
  majoritatea businessului — n-au echivalent.

---

## Prețurile (rădăcina problemei)

- Vin ca **liste de la furnizori, pe email**, în **PDF și Excel atașat**.
- Se schimbă **de câteva ori pe an**.
- Ajung pe **altă adresă decât oferta@peacoperis.com** (adresa conectată la Claude).
- Daniel confirmă: dacă prețurile s-ar menține singure actualizate,
  **ar folosi calculatorul**.

### Blocaj de deblocat (acțiune pentru Daniel)

Adresa pe care vin listele de preț nu e conectată la Claude. Fără ea, skill-ul
de actualizare a prețurilor nu are ce citi. Variante: conectarea acelei căsuțe,
sau redirecționarea automată a emailurilor de la furnizori către o adresă
conectată.

---

## Concluzia care schimbă planul

Prioritatea declarată de Daniel a fost **ofertarea**. Interviul arată că
ofertarea nu e primul lucru de construit — e al doilea. Primul este
**alimentarea cu prețuri**, pentru că lipsa ei a omorât deja o unealtă
funcțională.

Ordinea reală:

1. **Skill "actualizare prețuri"** — citește emailurile cu liste de la furnizori,
   extrage prețurile din PDF/Excel, propune actualizarea, Daniel confirmă,
   fișierul de prețuri se actualizează. (Deblochează calculatorul existent.)
2. **Captarea cererii** — o cale prin care discuția de la telefon/teren devine
   dată structurată în 30 de secunde.
3. **Extinderea calculatorului la table/tablă cutată** — segmentul majoritar.
4. Abia apoi: automatizarea ofertei cap-coadă.

Lecție generalizabilă, deja demonstrată la ITC: **o unealtă nealimentată moare.**
Orice skill construit de acum trebuie să aibă răspuns la întrebarea
"cine îl ține la zi?" înainte să fie scris.
