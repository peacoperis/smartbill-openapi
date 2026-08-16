# Perplexity — starea de pornire, extrasă din cont (16.08.2026)

Rezultatul Fazei 1 din `extractie-perplexity.md`, pe contul Pro. Faza 0 (ochii în interfață), sondele P4–P8 și P9 **nu sunt încă rulate** — concluziile de mai jos sunt valabile doar pe ce a ieșit din memorie.

**Cele patru contradicții au fost lămurite de titularul contului pe 16.08.2026.** Răspunsurile sunt marcate ▸ la fiecare secțiune și au fost deja aplicate în `perplexity.md`.

Verdict scurt: **terenul nu e liber.** Memoria e dens populată, conține două seturi de reguli care se contrazic, și — cel mai grav — **defectul care a dus Gemini la 2/10 este instalat aici, în două exemplare.**

---

## 1. Footerul cu procente inventate — reinstalat, în două locuri

Cauza #1 din dosarul Gemini: *„Footer obligatoriu cu procent de context → niciun model nu-și poate măsura contextul → inventa procente, adică exact halucinația interzisă de axiome."*

Este stocat la Perplexity de două ori:

**În blocul de profil (`<summary>`):**
```
FOOTER:
[💾 MEMORIE: [X]% | 🚦 MODE: Research]
[🎯 PROMPT: [X]% | 💾 THREAD: [X]%]
```

**Într-o notă separată (`memory/notes/preferences/ai_response_format.md`):**
```
[🎯 PROMPT: [X]% (Claritate) | 💾 THREAD: [X]% (Lungime) | 🚦 MOD: Research]
[💾 MEMORIE: [X]% (Relevanță: [Mare/Scăzută]) | 🚦 MODE: Research]
```

Trei cifre imposibile la fiecare răspuns: procentul de memorie consumată, procentul de thread, procentul de claritate a promptului. Niciuna nu e măsurabilă din interiorul modelului. Regula 5 de la Pasul 3: *nu cere niciodată ce nu poate ști — fiecare astfel de cerință îl împinge activ să inventeze.*

**Agravant, și demonstrația vie a Pasului 8:** cele două copii **au divergit deja**. `MODE` într-una, `MOD` în cealaltă; etichetele „(Claritate)", „(Lungime)", „(Relevanță)" există doar în notă; nota adaugă un avertisment RED FLAG care lipsește din profil. Aceeași regulă, ținută în două locuri, s-a desincronizat singură — exact mecanismul pentru care metoda cere o singură sursă.

**Contradicția internă:** același bloc de profil conține și
```
ANTI-HALLUCINATION: nu inventa prețuri, discounturi, termene, stoc, legal.
```
Setul conține deopotrivă interdicția de a inventa și obligația de a inventa trei cifre la fiecare răspuns. Asistentul nu poate respecta ambele.

**▸ Confirmat activ.** Titularul contului a verificat: footerul apare în răspunsuri, cu procente completate. Nu e o regulă moartă în memorie — e halucinație în funcțiune, trei cifre inventate la fiecare răspuns, în ciuda regulii `ANTI-HALLUCINATION` din același bloc.

**De rezolvat înainte de orice instalare:** se șterg ambele exemplare, plus `THREAD MONITOR`, care cere aceeași măsurătoare imposibilă. Înlocuire, nu adăugare — lecția din dosarul Gemini, unde footerul vechi a reapărut cu procente inventate chiar în raportul disciplinat. Procedura de ștergere: `perplexity.md`, secțiunea 0b.

---

## 2. Identitate contradictorie — cauza #2 de la Gemini

Memoria spune că **utilizatorul este Daniel**:

- `memory/notes/work/company/management.md`: „The user is Daniel Neacșu-Cristea, the founder and sole decision-maker"
- `<demographics>`: „Profession: administrator invest tetto construct"
- `<work_and_education>`: „Current Company: Invest Tetto Construct SRL - owner/administrator"

Pachetul de aliniere din `perplexity.md` spune că utilizatorul **nu** este Daniel:

- „Sunt arhitectul strategic al firmei… Nu execut operațiunile zilnice."
- „Daniel este administratorul și managerul operațional… Deciziile operaționale îi aparțin."

Blocul `<summary>` sugerează a treia citire: *asistentul* e „STAT MAJOR / Architect Operațional", iar Daniel e „COMMANDER" — adică utilizatorul e Daniel, iar textul descrie persona asistentului, nu a omului.

**▸ Lămurit: memoria avea dreptate. Utilizatorul este Daniel** — asociat unic și administrator, care ține deopotrivă rolul strategic și pe cel operațional. Nu există un al doilea om.

Consecințe, deja aplicate:

- cele șase intrări din `perplexity.md` **rescrise la persoana întâi**; instalate în forma veche, ar fi produs în contul lui exact identitatea dublă din diagnosticul Gemini;
- capcana de autoritate reformulată: într-o firmă cu asociat unic, autoritatea care poate înmuia un verdict tehnic e chiar utilizatorul, deci regula trebuie să-l numească pe el;
- separarea rolurilor se mută de la conturi la proiecte, în același cont;
- `SKILL.md`, Pasul 4, corectat: metoda trata cele două roluri ca doi oameni. Se numără capetele înainte de a împărți rolurile.

Diagnosticul Gemini pentru exact această situație: *„Două identități contradictorii în același set → nu știa cu cine vorbește; amesteca tonul și prioritățile."*

---

## 3. Matricea AI veche, în conflict cu cea din metodă

`memory/sessions/2026-02-02…Ecosystem_Architecture_Role_Clarification`:
> „The ecosystem is structured around **Gemini as the integrator/architect**… with Claude, ChatGPT, Perplexity, DeepSeek, Grok, and Kimi as specialized partners — **all equal in importance, none subordinate**."

Matricea din Pasul 5 spune altceva: Claude ține arhitectura, codul și **decizia finală de sistem**; Gemini explicit **nu** ia decizii finale de arhitectură; rolurile sunt delimitate, nu egale. Plus, matricea veche include patru asistenți care nu apar în metodă (DeepSeek, Grok, Kimi).

Instalarea matricei noi fără ștergerea celei vechi = divergență tăcută, garantată.

---

## 4. Locația — trei variante, semnalate de asistentul însuși

| Sursă | Locație |
|---|---|
| `<demographics>` | Voluntari, Ilfov |
| `management.md` | Pitești |
| rezumat de sesiune | București |
| pachetul din `perplexity.md` | punct de lucru Pitești, județul Argeș |

Numărul de înmatriculare din memorie, `J40/4051/2015`, indică **registrul comerțului București** (J40).

**▸ Confirmat: sediu social în București, punct de lucru și piață în Pitești, județul Argeș.** Cele trei surse se împacă — Voluntari e reședința administratorului, nu a firmei. Radarul rămâne pe Argeș și județele vecine, cum era scris. Mențiunile care prezintă Voluntari sau București ca loc al firmei se șterg din memorie: nu sunt neutre, dezorientează un asistent pus să monitorizeze concurența locală.

**De notat ca semn bun:** întrebat la P3, asistentul **nu a ales una** — a enumerat contradicția și a scris „NU ȘTIU cu certitudine". Comportamentul corect.

---

## 5. Date sensibile deja urcate la furnizorul extern

Regula din pachet: *fără prețuri de achiziție, fără marje, fără date de clienți — fișierele urcă la un furnizor extern.* În memorie se află deja:

- linia de credit ING (230.000 lei, ~23.000 lei trasi), credit IMM Invest 12.000 lei/lună, covenant 115.000 lei minim trimestrial;
- praguri de comision cu nume: Daniel 100k, Antonia 50k, colaboratori 80k RON/lună fără TVA;
- identificatorul bazei Airtable `appdbikkM2awYhpoM`;
- cifra de afaceri și ținta.

Nu sunt date de client, dar sunt structura financiară a firmei și expunerea ei la bancă. Decizia dacă rămân e a firmei — dar trebuie luată explicit, nu prin uitare.

Separat, memoria amestecă viața personală cu firma (planuri de nuntă, console de jocuri, portofoliul personal de investiții). Nu e periculos; e zgomot care diluează un asistent pe care îl vrem specializat pe radar de piață.

---

## 6. Cifra de afaceri — două valori incompatibile

- `<summary>`: „MISSION: … CA ≥10M RON" (țintă)
- `company.md`: „a 10M RON revenue target"
- rezumat de sesiune: „~€2.58M annual revenue" ≈ **12,9M RON**

Dacă cifra reală e deja ~12,9M RON, o „misiune" de ≥10M RON e o țintă depășită, iar asistentul o va folosi ca reper în raționamente. De clarificat care e realitatea și care e ținta.

---

## 7. Ce a ieșit bine — nu se strică

- **`ANTI-HALLUCINATION` funcționează.** La P1 a scris curat „NU POT CITA" pentru conectori, în loc să inventeze o sursă.
- **P3: a semnalat contradicția** în loc să aleagă comod o variantă.
- **La P9 formulat greșit** (fără fișier încărcat, cu `[produs]` necompletat) a refuzat să continue și a cerut ce-i lipsește. Nu a inventat nici fișier, nici produs.

Caracterul de bază e decent **la rece**, înainte de orice aliniere. Asta schimbă prioritatea: instalarea e mai puțin despre disciplina anti-halucinație și mai mult despre focalizare pe piață și despre curățarea contradicțiilor.

---

## 8. Ce lipsește din pachetul actual, descoperit din memorie

Pachetul din `perplexity.md` descrie ITC ca **comerț** cu materiale. Memoria adaugă două lucruri pe care radarul le ignoră complet:

- **montajul.** „IDENTITY: expert montator", „servicii de montaj", „roofing company". Dacă firma vinde și manoperă, radarul trebuie să urmărească și piața execuției, nu doar prețul materialului.
- **OLX.** Apare de patru ori în memorie ca și canal de vânzare și temă de optimizare. Concurența locală se vede public pe OLX mai bine decât oriunde — e cea mai bogată sursă de monitorizare din piața asta și nu e menționată nicăieri în pachet.

**▸ Confirmat: firma vinde material și execută și montajul.** Ambele intră în radar. Aplicat în `perplexity.md`: instrucțiunile proiectului acoperă acum tarifele de manoperă, disponibilitatea echipelor pe sezon și garanția la execuție; OLX devine sursă de monitorizare, cu regula ca fiecare anunț să fie raportat cu data lui — un anunț vechi de șase luni nu e preț curent.

---

## Ce rămâne de rulat

| Ce | Stare |
|---|---|
| Faza 0 — plan, credite, comutatoare, conectori, limite, Spaces vechi | **nerulat** |
| P2 — comparația textului reprodus cu cel din interfață | **imposibil de validat** fără Faza 0 |
| P4–P8 — sondele comportamentale | **nerulate** |
| **P9 — căutarea unificată fișier + web** | **nerulat corect** — poarta care blochează instalarea |
| Faza 3 — scorul de bază pe testul cu capcane | **nerulat** |

P9 trebuie reluat cu un fișier real încărcat într-un Project și cu numele produsului completat. Până trece, arhitectura din `perplexity.md` rămâne nevalidată.
