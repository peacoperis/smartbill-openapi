# Handoff C.C ↔ C.K — sistem de predare automată a sarcinilor

Acest folder conține „infrastructura" prin care **Claude Code (C.C)** deleagă automat, prin **Notion**, pașii manuali pe care nu-i poate face din cloud (încărcare fișiere din PC, login + clicuri pe un site, descărcări), către **Claude Cowork (C.K)** care rulează local pe PC și poate controla browserul.

Prescurtări: **C.C** = Claude Code · **C.K** = Claude Cowork · **C.A** = Claude AI (chat).

## Cum funcționează, pe scurt

```
  C.C (cloud) ── scrie sarcina ──▶  Notion HUB  ◀── C.K EXECUTANT (PC local):
       ▲                          (puntea comună)     execută + urcă PROBE,
       │                                              lasă sarcina „De verificat"
       └── VERIFICĂ independent din probe ────────────────────┘
           (deschide URL-ul, re-confirmă, apoi Gata/Respins)
```

C.C și C.K **nu vorbesc direct** — comunică doar prin baza Notion „Hub C.C ↔ C.K".
**Regula de fier:** cine execută (C.K) NU se declară singur gata; verifică C.C, independent, din probe.

## Unde e hub-ul (Notion)

- **Bază de date:** „Hub C.C ↔ C.K"
- **Link:** https://app.notion.com/p/5cd4433929464d2cab30b4f36ea15437
- **ID bază (database_id):** `5cd4433929464d2cab30b4f36ea15437`
- **Sursă de date (data_source_id):** `a5e689db-6aff-4799-8f10-6abb7115e82f`
- **Vederi:** `🛰️ Turn de control` (kanban după status) · `📥 De făcut (pentru C.K)`

## Fișierele din acest folder

| Fișier | Pentru cine | Ce e |
|---|---|---|
| `CAND-DELEGHEZ.md` | C.C | **Poarta de delegare** — regula CÂND e nevoie reală vs. abuz (esențial) |
| `PROTOCOL.md` | ambii | Regulile complete: mașina de stări, format sarcină, citire țintită, siguranță |
| `schema-notion.md` | referință | Structura exactă a bazei Notion (coloane + valori) |
| `sablon-sarcina.md` | C.C | Șablonul de „pachet de sarcină" (copy-paste) |
| `reteta-cc.md` | C.C | Instrucțiuni: cum postează C.C o sarcină și cum culege rezultatul |
| `reteta-cowork.md` | tu → C.K | Prompt-ul de pus în sarcina programată din Cowork (partea ta) |
| `CAPABILITATI.md` | ambii | Meniul cu ce știe C.K să facă (C.C verifică înainte să delege) |

## Ce ai de făcut tu (o singură dată)

1. Deschide hub-ul Notion (link mai sus) și verifică-l.
2. Deschide `reteta-cowork.md`, copiază prompt-ul și creează în **Cowork două sarcini programate zilnice**: una la **11:59** și una la **20:00**.
3. Asigură-te că în Cowork ai conectorul **Notion** și **Claude in Chrome** active.
4. Gata — de acum, când C.C se blochează, sarcina apare singură în `📥 De făcut (pentru C.K)`, C.K o execută + urcă probe (`De verificat`), iar C.C o verifică independent și continuă.

> **Roluri:** C.K = **doar executant** (maximul lui e `De verificat`). C.C = **creator + verificator**. Tu = **aprobator** doar pe acțiunile ireversibile (bani/email/ștergere).

> **Securitate:** parolele/credentialele NU se scriu niciodată în Notion. În sarcină se pune doar „folosește contul X"; login-ul efectiv îl face C.K local, pe PC-ul tău.

## Cum știe C.C *când* să delege (fără să-i spui tu)

Regula stă în **`CLAUDE.md`** (rădăcina repo-ului) — fișierul pe care C.C îl citește automat la fiecare sesiune. Acolo e „poarta de delegare": implicit C.C face singur, deleagă doar la un zid fizic real. Pentru a folosi sistemul în **alt proiect**, copiază secțiunea „Poarta de delegare" din `CLAUDE.md` în `CLAUDE.md`-ul acelui proiect (sau în `~/.claude/CLAUDE.md` global, dacă lucrezi din desktop).
