# Poarta de delegare — CÂND scrie C.C în hub (și când NU)

Acesta e răspunsul la întrebarea: *„cum știe C.C singur când e nevoie reală de C.K și când ar fi abuz?"*.

## Principiul de aur

> **Implicit, C.C face treaba SINGUR. Delegarea către C.K este EXCEPȚIA, nu regula.**
> Dacă te trezești delegând des lucruri mărunte, greșești — majoritatea pașilor îi poți face singur. Handoff-ul e doar pentru un **zid fizic real**, nu pentru comoditate.

Fără această regulă cădem în capcană: totul trece prin C.K și nimic nu mai iese fără el. De aceea poarta de mai jos se aplică la FIECARE blocaj, automat.

## Poarta (parcurge-o în ordine, la fiecare pas pe care nu-l poți finaliza imediat)

**PASUL 0 — Încearcă singur. Ai VREO cale cu uneltele tale?**
Unelte C.C: apel API, scris/rulat cod, citire/scriere fișiere din repo, unelte MCP (Notion, GitHub, Gmail, Drive, Airtable…), web fetch.
- **DA** → fă-o singur. **STOP. Nu delega.**
  - *Exemplu real:* emiterea unei proforme SmartBill are **API** (vezi `smartbill_proforma_openapi (1).json` din acest repo). Deci C.C o cheamă prin API — **NU** trimite la C.K să dea clicuri în interfață. A delega asta ar fi abuz.
- **NU** → treci la Pasul 1.

**PASUL 1 — E un zid FIZIC real?** Trebuie unul din:
- un fișier care există **doar pe PC-ul omului** (nu în repo, nu accesibil prin API);
- clic/tastat într-un **browser sau aplicație desktop pe PC-ul omului**;
- un **login interactiv / 2FA / CAPTCHA**;
- **prezența fizică** a omului.
- **NU** (e doar mai comod/rapid să pui pe altcineva) → fă-o singur. **STOP.**
- **DA** → treci la Pasul 2.

**PASUL 2 — Acțiunea e în `CAPABILITATI.md` ca „DA"?**
- **NU** → **escaladează la om** (nu crea sarcină — ar sta blocată la infinit).
- **DA** → treci la Pasul 3.

**PASUL 3 — Pot descrie sarcina COMPLET, cu criterii verificabile?**
- **NU** → escaladează la om. (Dacă nici tu nu poți specifica clar, C.K sigur va livra greșit.)
- **DA** → **abia acum** creează sarcina în hub. Ăsta e singurul caz legitim.

## Rezumat vizual

```
blocaj → [Pot singur cu uneltele mele?] ──DA──▶ fac singur
                    │NU
                    ▼
         [Zid fizic real (PC/GUI/2FA/om)?] ──NU──▶ fac singur
                    │DA
                    ▼
         [E în CAPABILITATI „DA”?] ──NU──▶ escaladez la om
                    │DA
                    ▼
         [Pot specifica complet + criterii?] ──NU──▶ escaladez la om
                    │DA
                    ▼
              CREEZ SARCINA în hub  ← singurul caz legitim
```

## Trei rezultate posibile (nu doar „delegă / nu delegă")
1. **Fac singur** — implicit, cel mai frecvent.
2. **Deleg către C.K** — doar când poarta e trecută integral.
3. **Escaladez la om** — blocaj real dar nedelegabil, sau specificație imposibilă.

## Test rapid „e abuz?"
Întreabă-te: *„Chiar nu pot, sau doar mi-e mai comod?"* Dacă răspunsul are în el „ar fi mai rapid dacă…", „mai simplu să…", „aș prefera să…" → **nu e zid, e comoditate → fă singur.**
