# PROTOCOL Handoff C.C ↔ C.K (v2)

Regulile pe care **ambii** agenți (C.C și C.K) le respectă identic. La schimbare de format se urcă versiunea (v2 → v3).

> **Noutate v2:** verificare independentă (MEV). Cine execută NU se declară singur „gata". Vezi §5.

---

## 1. Mașina de stări (obligatorie)

```
De facut ──▶ In lucru ──▶ De verificat ──┬─▶ Gata  (probe confirmă TOATE criteriile)
  ▲           (executant   (verificator   │
  │            urcă probe)   independent)  └─▶ Respins ──▶ De facut (Runde+1)
  │
  │   Ireversibil:  De verificat ──▶ Asteapta aprobare ──(om: Aprobare=DA)──▶ Gata
  │
  └── oricând: In lucru/De verificat ──▶ Blocat (nu poate / neclar) ──▶ om
```

**REGULA DE FIER:** actorul care face `De verificat → Gata` este **ÎNTOTDEAUNA diferit** de cel care a făcut `In lucru → De verificat`. Executantul nu se verifică singur.

**Tranziții:**
- `De facut` → C.K-executant, atomic, `In lucru` (revendicare). Al doilea tur care vede sarcina deja `In lucru` o ignoră.
- `In lucru` → `De verificat` **doar după** ce `Probe` + `Rezultat` sunt complete. Executantul NU pune niciodată `Gata`.
- `De verificat` → `Gata`/`Respins` — de către **verificator** (C.C, sau tur C.K separat), pe bază de probe.
- `In lucru`/`De verificat` → `Blocat` dacă e neclar/imposibil. NU ghici.
- `Respins` → refacere: `De facut`, `Runde` + 1. **Limită 2** → apoi `Blocat` + om.
- `Ireversibil` → după `De verificat`, trece prin `Asteapta aprobare` (vezi §6).

---

## 2. Citirea țintită (regula anti-„haos de context")

**C.C nu citește NICIODATĂ tot hub-ul.**
1. La creare, C.C își notează `task_id`-ul.
2. La revenire (ca verificator/consumator), interoghează filtrat: `task_id = <al lui>` + stare `De verificat`/`Gata`.
3. Citește doar câmpurile de care are nevoie: `Probe`, `Criterii de gata`, `Rezultat`. NU alte rânduri.
4. Consum = 1 rând, indiferent câte proiecte/sarcini există.

**Interzis:** „list all", citit fără filtru pe `task_id`.

---

## 3. Adresarea (izolarea proiectelor paralele)

- `task_id` — cheie unică `<PROJECT>-<NNNN>`, ex: `PROJ-A-0007`. C.C o generează crescător per proiect și o notează.
- `project_id`, `cc_session` — pentru izolare și recunoaștere.

Trei proiecte scriu simultan fără să se amestece; fiecare își cere înapoi doar `task_id`-ul lui.

---

## 4. Pachetul de sarcină + intensitate + formă (regula anti-„intensitate C.K")

C.K nu cunoaște proiectul → sarcina e **auto-suficientă**. C.C completează (vezi `sablon-sarcina.md`):
- `Pachet sarcina`: Obiectiv · Pași exacți · Intrări · Interdicții.
- `Nivel` (cât apasă C.K): **N1 Reflex** (mecanic pur) · **N2 Executor** (pași + mici variații + verifică) · **N3 Analiza ghidata** (aplică reguli explicite). Judecata reală (N4) NU se deleagă.
- `Forma livrare` (ce întoarce): `LINK` · `FISIER` · `TEXT` · `CONFIRMARE` · `PT-APROBARE`.
- `Criterii de gata`: checklist **obiectiv** (vezi §5.4).

---

## 5. MEV — Metoda de execuție și verificare (miezul)

**Principiu: probe, nu vorbe. Cine execută nu se verifică singur.**

**5.1** Executantul (C.K tur #1) face treaba, **urcă probe**, trece în `De verificat`. Nu pune `Gata`.

**5.2** Verifică ALTCINEVA, din probe:
- **Principal: C.C** — alt agent, altă sesiune. Re-verifică singur ce poate de la distanță (deschide URL-ul → 200?, citește proba urcată, cheamă API-ul → starea reală?). Nu crede pe cuvânt.
- **Rezervă (doar lucruri pur locale):** al doilea tur C.K, context proaspăt, care NU a executat.

**5.3 Probe obligatorii** (câmpul `Probe`): URL live · captură urcată în hub · nr./ID confirmare · dimensiune+nume fișier · text extras · răspuns API. Fără probă → nu iese din `In lucru`.

**5.4 Criterii = contract obiectiv**, măsurabil din probă (NU „arată bine"): „URL 200, tip application/pdf" · „fișier > 10 KB" · „total = 2220 RON" · „nr. confirmare format SB-\d+".

**5.5 Completitudine:** criteriile cer acoperirea totală („toate N pozițiile", „toate fișierele"). Verificatorul **numără**.

---

## 6. Siguranță: anti-dublare + poartă de aprobare

**Idempotență:** `cheie_idempotenta` (ex: `smartbill:proforma:client=RO123:2026-07`). Înainte de execuție, C.K verifică dacă acțiunea s-a făcut deja; dacă da → nu repetă. (Previne dubla factură când write-back-ul pică.)

**Aprobare (ireversibil):** sarcinile cu `Ireversibil` bifat, după `De verificat`, trec în `Asteapta aprobare` + `Aprobare = Ceruta`. Omul pune `DA`/`NU`. Doar la `DA` C.K face pasul final → `Gata`.

---

## 7. Programare + supraveghere

**Program C.K (Cowork):** două tururi fixe pe zi — **11:59** (prinde ce s-a strâns în prima parte a zilei) și **20:00** (partea a doua). Sistem batch.
**Revenire C.C:** verifică după ~un tur; backoff pe ore (tur următor → ziua următoare); timeout ~2–3 tururi → om.
**Watchdog:** `In lucru`/`De verificat` neatins mai mult de un tur → readus la `De facut`. `De facut` neluat după 2 tururi → alertă (C.K oprit). `Asteapta aprobare`/`Blocat` → alertă imediată.
**Turn de control:** vederea kanban după `Status` arată tot ce cere atenție.

---

## 8. Capabilități (evită delegarea imposibilă)

Înainte de a delega, C.C verifică `CAPABILITATI.md`. Dacă acțiunea nu e „DA" → nu creează sarcină, escaladează la om.

---

## 9. Reguli de aur

1. Cine execută NU se verifică singur. `De verificat → Gata` = alt actor. Probe, nu vorbe.
2. C.C citește înapoi doar după `task_id`, doar câmpurile necesare. Niciodată tot hub-ul.
3. Sarcină auto-suficientă + `Nivel` + `Forma livrare` + criterii obiective. Neclar → `Blocat`.
4. Ireversibil → aprobare umană. Efect real → `cheie_idempotenta` verificată întâi.
5. `Runde ≥ 2`, `Blocat`, `Asteapta aprobare` → escaladare la om.
