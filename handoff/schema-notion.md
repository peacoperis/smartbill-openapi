# Schema Notion — baza „Hub C.C ↔ C.K" (v2)

Referință exactă. Baza există deja.

- **Link:** https://app.notion.com/p/5cd4433929464d2cab30b4f36ea15437
- **database_id:** `5cd4433929464d2cab30b4f36ea15437`
- **data_source_id:** `a5e689db-6aff-4799-8f10-6abb7115e82f`

## Coloane

| Coloană | Tip | Cine scrie | Rol |
|---|---|---|---|
| `Titlu` | Titlu | C.C | Nume scurt |
| `task_id` | Text | C.C | Cheie unică de rutare, ex: `PROJ-A-0007` |
| `project_id` | Select | C.C | `PROJ-A` / `PROJ-B` / `PROJ-C` |
| `cc_session` | Text | C.C | ID sesiune C.C |
| `Status` | Select | ambii | vezi mai jos |
| `Tip` | Select | C.C | `MECANIC` / `JUDECATA` |
| `Nivel` | Select | C.C | `N1 Reflex` / `N2 Executor` / `N3 Analiza ghidata` |
| `Forma livrare` | Select | C.C | `LINK` / `FISIER` / `TEXT` / `CONFIRMARE` / `PT-APROBARE` |
| `Prioritate` | Select | C.C | `Urgent` / `Normal` / `Poate astepta` |
| `Ireversibil` | Checkbox | C.C | Bifat = cere aprobare umană |
| `Aprobare` | Select | om + C.K | `-` / `Ceruta` / `DA` / `NU` |
| `Pachet sarcina` | Text | C.C | Instrucțiunile auto-suficiente |
| `Criterii de gata` | Text | C.C | Checklist obiectiv de acceptare |
| `Probe` | Text | C.K | **Dovezi** (URL/captură/ID/dimensiune/text). Fără ele nu iese din `In lucru` |
| `Rezultat` | Text | C.K | Rezultatul în forma cerută |
| `cheie_idempotenta` | Text | C.C | Anti-dublare |
| `Runde` | Number | verificator | Contor de refaceri (limită 2) |
| `Creat` / `Actualizat` | Time | auto | Creat + timeout |

## Valori `Status` (exacte, fără diacritice)

`De facut` · `In lucru` · `De verificat` · `Asteapta aprobare` · `Gata` · `Blocat` · `Respins` · `Inchis`

Fluxul: `De facut →(C.K)→ In lucru →(C.K, cu probe)→ De verificat →(C.C, independent)→ Gata | Respins`.
**Regula de fier:** cine trece `De verificat → Gata` ≠ cine a executat.

## Cine atinge ce
- **C.C creează** (`notion-create-pages`, parent `data_source_id`). Checkbox: `"__YES__"`/`"__NO__"`.
- **C.K-executant** setează `In lucru`, `Probe`, `Rezultat`, apoi `De verificat` (sau `Asteapta aprobare` la ireversibil / `Blocat`). Nu pune `Gata`.
- **C.C-verificator** citește țintit `task_id`, verifică din `Probe`, setează `Gata`/`Respins`/`Inchis`.
