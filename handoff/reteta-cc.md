# Rețetă pentru C.C (Claude Code) — CREATOR + VERIFICATOR

C.C are două roluri: **creează** sarcina și, la revenire, **o verifică independent** (C.C nu e cel care a executat-o → verificarea e legitimă). Respectă PROTOCOL v2.

---

## A. Când te blochezi la un pas manual (creare sarcină)

**1. E delegabil?** Verifică `CAPABILITATI.md`. `NU` → anunță omul. `DA`/`PARȚIAL` → continuă.
Verifică întâi și poarta din `CAND-DELEGHEZ.md` (poți face singur? atunci NU delega).

**2. Creează sarcina** (Notion `notion-create-pages`, parent `data_source_id = a5e689db-6aff-4799-8f10-6abb7115e82f`):
- `Titlu`, `task_id` (`<PROJECT>-<NNNN>` unic — **notează-l**), `project_id`, `cc_session`.
- `Status = De facut`.
- `Tip`, `Nivel` (N1/N2/N3), `Prioritate`, `Forma livrare` (LINK/FISIER/TEXT/CONFIRMARE/PT-APROBARE).
- `Ireversibil` (bifat dacă are efect real), `cheie_idempotenta` (dacă are efect real).
- `Pachet sarcina` (șablon din `sablon-sarcina.md`), `Criterii de gata` (checklist **obiectiv**).

**3. Intră în așteptare, nu bloca omul.** Programează-ți o revenire după ~un tur C.K (tururile sunt la 11:59 și 20:00). Backoff pe ore. NU executa tu pasul manual.

---

## B. La revenire — VERIFICĂ independent (nu consuma, verifică)

**1. Citește țintit:** filtrează `task_id = <al tău>`. Interesează-te de starea:
- `De verificat` → e treaba ta să validezi.
- `Blocat` / `Asteapta aprobare` / `Runde ≥ 2` → escaladează la om.

**2. VERIFICĂ din probe, nu pe cuvânt.** Citește `Probe` + `Criterii de gata`. Pentru fiecare criteriu:
- Confirmă-l din probă. Și **re-verifică singur ce poți de la distanță**: deschide URL-ul (întoarce 200? tipul corect?), citește artefactul urcat, cheamă API-ul ca să confirmi starea reală (ex: SmartBill API), numără elementele pentru completitudine.
- NU accepta „verificat: DA" scris de C.K ca dovadă — dovada e proba.

**3. Verdict:**
- Toate criteriile confirmate → `Status = Gata`, apoi preia rezultatul și **continuă treaba**. La final `Status = Inchis`.
- Vreun criteriu pică → `Status = Respins` + în `Rezultat` scrie exact ce criteriu a picat și de ce. C.K va reface (Runde+1).
- `Runde` ajunge la 2 și tot pică → `Status = Blocat` + escaladează la om.

**4. Ireversibil:** dacă sarcina e în `Asteapta aprobare`, verifică probele pregătite și anunță omul să pună `Aprobare = DA/NU`. Nu decide tu în locul lui.

---

## Reguli de aur
- **Nu ești cel care a executat → de aceea tu verifici.** Verifică din probe + re-confirmă independent.
- Citire înapoi = 1 rând după `task_id`, doar câmpurile necesare. Niciodată tot hub-ul.
- Nu delega ce poți face singur (SmartBill are API → cheamă API, nu deleg clicuri).
