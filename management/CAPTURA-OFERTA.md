# Captura ofertei în 10 secunde (PUNTE 4)

## Problema pe care o rezolvă

Airtable era arhiva, nu sistemul de lucru: ofertele plecau pe WhatsApp, iar înregistrarea se
făcea retroactiv, a doua zi, după ce banii intrau — de către Daniel, plimbând comanda prin 4
statusuri în ~20 de minute. Consecințe: 15 oferte/zi netrasabile, „cine a făcut" imposibil de
răspuns (tot ce intra în Airtable era tastat de Daniel), și peste o oră pe zi de retastat istorie.

## Cum funcționează acum

Imediat după ce trimiți oferta pe WhatsApp, trimiți botului de Telegram UN mesaj:

```
/o Nume client | telefon | localitate | valoare
```

Exemplu: `/o Ion Popescu | 0722111222 | Pitesti | 4500`

În câteva secunde se creează automat înregistrarea în `Ofertare`:
- Nume Beneficiar, Telefon, Locație proiect, Valoare
- Data Ofertării = azi
- Status = `Ofertat`
- **`Introdus prin` = cine a trimis mesajul** („Telegram — Daniel" / „Telegram — Antonia", după contul de Telegram). *Corectat 02.09:* PUNTE 4 **nu mai scrie** `Responsabil Comanda` — acel câmp înseamnă „de la ce colaborator vine comanda".
- `/c Nume | telefon | localitate | valoare` = aceeași captură, dar direct ca `Comandata ` cu `Data Comanda` = azi.
- **Stare 03.09:** botul a rulat o singură dată de la lansare (test). Următorul pas nu e botul, ci **captura din mail**: fiecare comandă pleacă oricum prin mail către furnizor; Make poate urmări folderul „Trimise" și crea rândul singur (vezi AUDIT-4-SCAUNE.md, B2). Botul rămâne pentru oferte.
- Observații = numele real al expeditorului + mesajul original (urmă de audit)

Primești confirmare pe Telegram cu datele înregistrate. Dacă nu vine confirmarea, mesajul n-a
fost preluat (verifică formatul: bara verticală `|` între cele 4 câmpuri).

## De ce rezolvă problema atribuirii

Împărțirea muncii e fluidă („depinde cine e la calculator"), deci sistemul nu presupune — el
**înregistrează cine a operat**, din contul care a trimis comanda. Pentru ca asta să fie valabil
și la modificările făcute direct în Airtable, e nevoie de:
1. cont propriu de Airtable pentru fiecare persoană (nu login comun);
2. cele două coloane calculate în `Ofertare`, create din interfață (API-ul Airtable le refuză):
   „Created by" cu numele `Creat de` și „Last modified by" cu numele `Modificat de`.
   Rapoartele le afișează automat imediat ce există.

## Ce urmează în același sens (reduce și mai mult tastarea)
- Statusurile să avanseze din evenimente, nu din tastare: proformă emisă → `Procedura de avans`;
  plată încasată → `De comandat` (motoarele A/C/D2 din ARHITECTURA-ITC-PIPELINE.md).
- Regula „fără înregistrare, fără proformă": oricine e la calculator deschide întâi înregistrarea.

## Raport: restanțe recente vs backlog

Raportul de seară separă acum ce e din **ultimele 7 zile** (trebuie să ajungă la zero) de
**backlogul vechi** (doar număr + cea mai veche dată). Motivul: restanțele afișate erau din
februarie–martie, iar o listă care nu poate ajunge la zero face scorul „zi curată" imposibil și
antrenează ignorarea raportului.
