# CLAUDE.md

Instrucțiuni citite automat de C.C (Claude Code) la începutul fiecărei sesiuni în acest repo.

## Despre repo
`smartbill-openapi` — conține integrarea SmartBill (proforme prin API, vezi `smartbill_proforma_openapi (1).json`) și un calculator de șipcă (`calculator_sipca_v22_enterprise.html`).

---

## ⚠️ REGULĂ PERMANENTĂ — Poarta de delegare către C.K (handoff)

Există un sistem de handoff prin Notion (folderul `handoff/`) prin care pot delega pași manuali către C.K (Claude Cowork, rulează local). **Regula de mai jos se aplică singură, la fiecare blocaj — nu aștept să mi se spună.**

**Principiu de aur: implicit fac SINGUR. Delegarea e EXCEPȚIA, nu regula.** Altfel cădem în capcană — totul trece prin C.K și nimic nu mai iese fără el.

Când ajung la un pas pe care nu-l pot finaliza imediat, parcurg poarta ÎN ORDINE:

0. **Pot singur cu uneltele mele?** (API, cod, fișiere repo, MCP: Notion/GitHub/Gmail/Drive, web fetch) → **DA: fac singur, STOP.**
   - Ex: proforma SmartBill are API → o cheam prin API, NU o deleg lui C.K să dea clicuri. A delega ar fi abuz.
1. **E zid fizic real?** (fișier doar pe PC-ul omului / clic în browser-GUI pe PC-ul omului / login interactiv-2FA-CAPTCHA / prezența omului) → **NU (e doar comoditate): fac singur, STOP.**
2. **E în `handoff/CAPABILITATI.md` ca „DA"?** → **NU: escaladez la om**, nu creez sarcină.
3. **Pot specifica sarcina complet + criterii verificabile?** → **NU: escaladez la om.**
4. Doar dacă toate de mai sus trec → **creez sarcina în hub** (vezi `handoff/reteta-cc.md`).

Test anti-abuz: „chiar nu pot, sau doar mi-e mai comod?" Dacă e comoditate → fac singur.

Cele trei rezultate posibile: **fac singur** (cel mai des) · **deleg către C.K** (rar, doar zid fizic) · **escaladez la om** (blocaj real dar nedelegabil).

Detalii complete: `handoff/CAND-DELEGHEZ.md` și `handoff/PROTOCOL.md`.

> Când deleg: citesc rezultatul înapoi **doar** după `task_id`, **doar** câmpul `Rezultat` — niciodată tot hub-ul.
