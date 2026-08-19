# smartbill-openapi

Instrumente de ofertare pentru șipcă metalică — PeAcoperis.

| Componentă | Descriere |
|---|---|
| `calculator_sipca_v22_enterprise.html` | Calculatorul de ofertare (configurator, motor de calcul, generare PDF) |
| `smartbill_proforma_openapi (1).json` | Schema OpenAPI pentru emiterea proformelor prin SmartBill |
| `caiet-de-lucru/` | **Caietul de lucru** — regulile după care se măsoară, se calculează, se ofertează și se montează |

## Caietul de lucru

Toate regulile (legile montajului, regulile de calcul, de preț, de catalog și
de ofertare) sunt ținute într-un registru unic, cu cod pentru fiecare regulă,
ca să poată fi citate și adnotate: [`caiet-de-lucru/`](caiet-de-lucru/).

```bash
python3 caiet-de-lucru/caiet.py lista            # toate regulile
python3 caiet-de-lucru/caiet.py arata MNT-005    # o regulă
python3 caiet-de-lucru/caiet.py valideaza        # verifică registrul
python3 caiet-de-lucru/caiet.py genereaza        # rescrie documentele
```

Ce nu acoperă încă motorul de calcul este listat în
[`caiet-de-lucru/abateri.md`](caiet-de-lucru/abateri.md).
