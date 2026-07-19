# Schema Notion — baza „Hub C.C ↔ C.K"

Referință exactă a coloanelor. Baza există deja (creată automat).

- **Link bază:** https://app.notion.com/p/5cd4433929464d2cab30b4f36ea15437
- **database_id:** `5cd4433929464d2cab30b4f36ea15437`
- **data_source_id:** `a5e689db-6aff-4799-8f10-6abb7115e82f`

## Coloane

| Coloană | Tip | Cine scrie | Rol |
|---|---|---|---|
| `Titlu` | Titlu | C.C | Nume scurt, citibil, al sarcinii |
| `task_id` | Text | C.C | Cheie unică de rutare, ex: `PROJ-A-0007` |
| `project_id` | Select | C.C | `PROJ-A` / `PROJ-B` / `PROJ-C` |
| `cc_session` | Text | C.C | ID-ul sesiunii C.C |
| `Status` | Select | ambii | `De facut`→`In lucru`→`Asteapta aprobare`→`Gata`/`Blocat`/`Respins`→`Inchis` |
| `Tip` | Select | C.C | `MECANIC` / `JUDECATA` |
| `Prioritate` | Select | C.C | `Urgent` / `Normal` / `Poate astepta` |
| `Ireversibil` | Checkbox | C.C | Bifat = cere aprobare umană înainte de pasul final |
| `Aprobare` | Select | om + C.K | `-` / `Ceruta` / `DA` / `NU` |
| `Pachet sarcina` | Text | C.C | Instrucțiunile auto-suficiente (vezi `sablon-sarcina.md`) |
| `Criterii de gata` | Text | C.C | Checklist de acceptare |
| `Rezultat` | Text | C.K | Rezultatul; **singurul câmp citit de C.C la revenire** |
| `cheie_idempotenta` | Text | C.C | Anti-dublare pentru acțiuni cu efect real |
| `Runde` | Number | C.K | Contor de refaceri (limită 2) |
| `Creat` | Created time | auto | — |
| `Actualizat` | Last edited time | auto | Folosit pentru timeout |

## Valori Status (exacte, fără diacritice — a se scrie identic)

`De facut` · `In lucru` · `Asteapta aprobare` · `Gata` · `Blocat` · `Respins` · `Inchis`

> Notă: valorile de Select sunt scrise **fără diacritice** intenționat, ca filtrele C.C/C.K să nu dea greș din cauza codării. A se folosi exact aceste șiruri.

## Cum se scrie/citește prin conectorul Notion (MCP)

- **Creare sarcină (C.C):** `notion-create-pages` cu `parent.data_source_id = a5e689db-6aff-4799-8f10-6abb7115e82f` și proprietățile de mai sus. Checkbox: `"__YES__"`/`"__NO__"`.
- **Citire țintită (C.C):** `notion-search` / query filtrat pe `task_id` + `Status = Gata`, apoi se citește doar `Rezultat`.
- **Revendicare / rezultat (C.K):** `notion-update-page` cu `command: update_properties` — setează `Status`, `Rezultat`, `Runde`, `Aprobare`.
