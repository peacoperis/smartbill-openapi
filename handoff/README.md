# Handoff C.C ↔ C.K — sistem de predare automată a sarcinilor

Acest folder conține „infrastructura" prin care **Claude Code (C.C)** deleagă automat, prin **Notion**, pașii manuali pe care nu-i poate face din cloud (încărcare fișiere din PC, login + clicuri pe un site, descărcări), către **Claude Cowork (C.K)** care rulează local pe PC și poate controla browserul.

Prescurtări: **C.C** = Claude Code · **C.K** = Claude Cowork · **C.A** = Claude AI (chat).

## Cum funcționează, pe scurt

```
  C.C (cloud) ── scrie sarcina ──▶  Notion HUB  ◀── C.K (PC local) ia sarcina,
       ▲                          (puntea comună)     execută, scrie rezultatul
       └──── citește DOAR rezultatul sarcinii lui ─────────────┘
```

C.C și C.K **nu vorbesc direct** — comunică doar prin baza de date Notion „Hub C.C ↔ C.K".

## Unde e hub-ul (Notion)

- **Bază de date:** „Hub C.C ↔ C.K"
- **Link:** https://app.notion.com/p/5cd4433929464d2cab30b4f36ea15437
- **ID bază (database_id):** `5cd4433929464d2cab30b4f36ea15437`
- **Sursă de date (data_source_id):** `a5e689db-6aff-4799-8f10-6abb7115e82f`
- **Vederi:** `🛰️ Turn de control` (kanban după status) · `📥 De făcut (pentru C.K)`

## Fișierele din acest folder

| Fișier | Pentru cine | Ce e |
|---|---|---|
| `PROTOCOL.md` | ambii | Regulile complete: mașina de stări, format sarcină, citire țintită, siguranță |
| `schema-notion.md` | referință | Structura exactă a bazei Notion (coloane + valori) |
| `sablon-sarcina.md` | C.C | Șablonul de „pachet de sarcină" (copy-paste) |
| `reteta-cc.md` | C.C | Instrucțiuni: cum postează C.C o sarcină și cum culege rezultatul |
| `reteta-cowork.md` | tu → C.K | Prompt-ul de pus în sarcina programată din Cowork (partea ta) |
| `CAPABILITATI.md` | ambii | Meniul cu ce știe C.K să facă (C.C verifică înainte să delege) |

## Ce ai de făcut tu (o singură dată)

1. Deschide hub-ul Notion (link mai sus) și verifică-l.
2. Deschide `reteta-cowork.md`, copiază prompt-ul și creează în **Cowork** o sarcină programată (ex: la 10 min) cu el.
3. Asigură-te că în Cowork ai conectorul **Notion** și **Claude in Chrome** active.
4. Gata — de acum, când C.C se blochează, sarcina apare singură în `📥 De făcut (pentru C.K)`, C.K o rezolvă, iar C.C continuă.

> **Securitate:** parolele/credentialele NU se scriu niciodată în Notion. În sarcină se pune doar „folosește contul X"; login-ul efectiv îl face C.K local, pe PC-ul tău.
