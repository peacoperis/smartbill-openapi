# PROTOCOL Handoff C.C ↔ C.K (v1)

Regulile pe care **ambii** agenți (C.C și C.K) trebuie să le respecte identic. Dacă se schimbă formatul, se urcă versiunea (v1 → v2) în această linie și în sarcini.

---

## 1. Mașina de stări (obligatorie)

```
        C.C creează                C.K lucrează                 C.C revine
  ┌──────────────┐   claim   ┌──────────┐   scrie rezultat  ┌────────────────┐
  │  De facut    │──────────▶│ In lucru │──────────────────▶│  Gata          │
  └──────────────┘           └────┬─────┘                    └───────┬────────┘
                                  │ nu poate / neclar               │ C.C validează
                                  ▼                                 │
                             ┌──────────┐                    ┌──────┴───────┐
                             │  Blocat  │                    ▼              ▼
                             └──────────┘               ┌────────┐    ┌──────────┐
        (acțiune ireversibilă) │                        │ Inchis │    │ Respins  │
                               ▼                         └────────┘    └────┬─────┘
                        ┌──────────────────┐                                │ refacere
                        │ Asteapta aprobare│──(om: DA)──▶ In lucru          ▼
                        └──────────────────┘                          De facut (Runde+1)
```

**Reguli de tranziție:**
- `De facut` → doar C.K, atomic, o trece pe `In lucru` (o „revendică"). Dacă două tururi C.K văd aceeași sarcină, primul care o trece pe `In lucru` o ține; al doilea o ignoră.
- `In lucru` → `Gata` **doar după** ce câmpul `Rezultat` e complet scris. Niciodată invers.
- `In lucru` → `Blocat` dacă C.K nu poate / e neclar / lipsește ceva. NU ghici.
- `Asteapta aprobare` → pentru orice sarcină cu `Ireversibil = bifat`, înainte de pasul final (vezi §5).
- `Gata` → C.C validează pe criterii: dacă e bun → `Inchis`; dacă e greșit → `Respins` + note de corecție.
- `Respins` → C.K reface: `De facut` cu `Runde` + 1.
- **Limită `Runde` = 2.** La a 3-a nereușită → `Blocat` + escaladare la om (vezi §6).

---

## 2. Citirea țintită (regula anti-„haos de context")

**C.C nu citește NICIODATĂ tot hub-ul.** Reguli stricte:

1. Când C.C creează o sarcină, își **notează `task_id`-ul** în notele sesiunii lui.
2. La revenire, C.C interoghează filtrat: `task_id = <al lui> AND Status = Gata` → întoarce **un singur rând**.
3. C.C citește **doar câmpul `Rezultat`** (+ `Status`). NU citește `Pachet sarcina`, NU alte rânduri.
4. Consumul de context = 1 rând, indiferent câte proiecte/sarcini există în hub.

**Interzis:** „list all", „arată-mi toate sarcinile", citit fără filtru pe `task_id`.

---

## 3. Adresarea (izolarea proiectelor paralele)

Fiecare sarcină e identificată unic prin:
- `task_id` — cheie unică, format `<PROJECT>-<NNNN>`, ex: `PROJ-A-0007`. **C.C o generează crescător per proiect.**
- `project_id` — care proiect (PROJ-A / PROJ-B / PROJ-C).
- `cc_session` — ce sesiune C.C a creat-o.

Trei proiecte pot scrie simultan în același hub fără să se amestece, fiindcă fiecare își cere înapoi **doar** `task_id`-ul lui.

---

## 4. Formatul „pachetului de sarcină" (regula anti-„intensitate C.K")

C.K **nu** cunoaște proiectul. Deci sarcina trebuie să fie **auto-suficientă**. C.C scrie în câmpul `Pachet sarcina`, în această ordine fixă (vezi `sablon-sarcina.md`):

1. **Obiectiv** — o frază.
2. **Pași** — numerotați, exacți, fără interpretare.
3. **Intrări** — URL-uri exacte, nume fișiere, „folosește contul X" (fără parolă), etichete de butoane.
4. **Interdicții** — ce să NU facă.
5. **Format rezultat** — exact ce să întoarcă.

Iar în câmpul `Criterii de gata` — un **checklist verificabil** (miezul): fiecare rând e o condiție DA/NU pe care C.K o bifează înainte de `Gata`. Ex: „link începe cu https ✔ / fișier are extensia .pdf ✔ / apare mesajul «salvat» ✔". Dacă **oricare** nu e bifat → `Blocat`, nu `Gata`.

**Regula de intensitate:** deleagă spre C.K mai ales `Tip = MECANIC`. Sarcinile `JUDECATA` fie rămân la C.C, fie sunt convertite într-un arbore de reguli explicit (C.K urmează reguli, nu intuiție).

---

## 5. Siguranță: anti-dublare + poartă de aprobare

**Idempotență (anti dublă-execuție):**
- Fiecare sarcină cu efect real are `cheie_idempotenta` (ex: `smartbill:proforma:client=RO123:luna=2026-07`).
- Înainte să execute, C.K verifică dacă acțiunea a fost deja făcută (caută rezultatul acelei chei). Dacă da → nu repetă, doar raportează „deja făcut".
- Motiv: dacă write-back-ul în Notion pică, sarcina pare neterminată → fără idempotență ar produce **dublă factură**.

**Poartă de aprobare (acțiuni ireversibile):**
- Sarcinile cu `Ireversibil = bifat` (bani, trimis email, ștergere, submit final în SmartBill) NU se finalizează automat.
- C.K pregătește tot până la ultimul pas, apoi setează `Status = Asteapta aprobare`, `Aprobare = Ceruta`, și lasă în `Rezultat` un rezumat „gata de trimis: …".
- Omul pune `Aprobare = DA` (sau `NU`). Doar la `DA` C.K face pasul final → `Gata`. La `NU` → `Blocat`.
- Acțiunile inofensive (upload, citire, descărcare) NU trec prin poartă.

---

## 6. Supraveghere: turn de control + escaladare

- Vederea `🛰️ Turn de control` (kanban după `Status`) arată dintr-o privire ce e `Blocat` / `Asteapta aprobare` / `Respins`.
- **Timeout:** dacă o sarcină stă în `In lucru` peste ~30 min (câmpul `Actualizat` nu s-a mișcat) → probabil C.K a picat; se readuce la `De facut`.
- **Escaladare la om:** orice `Blocat`, orice `Asteapta aprobare`, sau `Runde ≥ 2` → notificare către om (push/email). Nimic nu moare în tăcere.

---

## 7. Capabilități (evită delegarea imposibilă)

Înainte să creeze o sarcină, C.C verifică `CAPABILITATI.md`: dacă acțiunea nu e pe lista „C.K poate", C.C **nu** creează sarcina — escaladează direct la om. Așa nu rămâne o sarcină `De facut` la infinit.

---

## 8. Rezumat reguli de aur

1. C.C citește înapoi **doar** după `task_id`, **doar** câmpul `Rezultat`. Niciodată tot hub-ul.
2. C.K trece sarcina pe `In lucru` înainte s-o lucreze; scrie `Gata` doar după rezultat complet.
3. Sarcina e auto-suficientă + are checklist de acceptare. Neclar → `Blocat`, nu ghici.
4. Ireversibil → aprobare umană. Efect real → `cheie_idempotenta` verificată întâi.
5. `Runde ≥ 2`, `Blocat`, `Asteapta aprobare` → escaladare la om.
