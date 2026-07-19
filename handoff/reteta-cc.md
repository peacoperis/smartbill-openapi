# Rețetă pentru C.C (Claude Code)

Instrucțiuni pe care le urmează o sesiune C.C când se blochează la un pas manual. Poți lipi acest bloc în promptul unei sesiuni C.C (sau într-un CLAUDE.md de proiect).

---

## Când te blochezi la un pas manual, NU cere omului. Fă așa:

**1. Verifică dacă e delegabil.** Deschide `handoff/CAPABILITATI.md`. Dacă acțiunea e `NU` → oprește-te și anunță omul. Dacă e `DA`/`PARȚIAL` → continuă.

**2. Creează sarcina în hub** (Notion `notion-create-pages`, parent `data_source_id = a5e689db-6aff-4799-8f10-6abb7115e82f`):
- `Titlu`: nume scurt.
- `task_id`: `<PROJECT>-<NNNN>` unic crescător (ex: `PROJ-A-0007`). **Notează-l în notele tale de sesiune.**
- `project_id`, `cc_session`: completează.
- `Status`: `De facut`.
- `Tip`: `MECANIC` (implicit) sau `JUDECATA`.
- `Prioritate`: `Urgent` / `Normal` / `Poate astepta`.
- `Ireversibil`: bifează dacă are efect real (bani/email/ștergere/submit final).
- `cheie_idempotenta`: dacă are efect real (ex: `smartbill:proforma:client=RO123:2026-07`).
- `Pachet sarcina`: șablonul din `sablon-sarcina.md`, complet.
- `Criterii de gata`: checklist verificabil.

**3. Intră în așteptare (fără a bloca omul).** Programează-ți o auto-verificare (self check-in) la intervalul turului C.K (ex: 10–15 min). NU executa tu pasul manual.

**4. La revenire, citește ȚINTIT.** Interoghează hub-ul filtrat: `task_id = <al tău> AND Status = Gata`. Citește **doar** câmpul `Rezultat`.
- **Niciodată** nu lista tot hub-ul, nu citi alte rânduri, nu citi `Pachet sarcina`.

**5. Validează pe criterii.**
- Rezultat corect (bifează criteriile tale) → preia informația, setează `Status = Inchis`, **continuă treaba** de unde rămăsese.
- Rezultat greșit → setează `Status = Respins` + note de corecție în `Rezultat`. C.K va reface.
- `Status = Blocat` sau `Asteapta aprobare` sau `Runde ≥ 2` → escaladează la om.

**6. Dacă sarcina e `Ireversibil`,** știi că C.K se va opri la `Asteapta aprobare` — anunță omul că trebuie să pună `Aprobare = DA`.

---

## Reguli de aur (nu le încălca)
- Citire înapoi = **1 rând, după `task_id`, doar câmpul `Rezultat`**.
- Pachet auto-suficient + criterii verificabile, altfel C.K livrează prost.
- Nu delega ce nu e în `CAPABILITATI.md`.
