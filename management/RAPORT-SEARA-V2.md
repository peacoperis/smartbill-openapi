# Raportul de seară v2 — machetă în așteptarea aprobării

> **Stare la 02.09.2026: PROPUNERE.** Nimic nu e construit în Make. Se construiește o singură dată,
> după ce Daniel aprobă forma și răspunde la cele două întrebări de la final.
> Regula lui: „măsurăm de 100 de ori, tăiem o dată".

## De ce s-a refăcut

Daniel a citit raportul din 02.09 și a cerut: comenzile să nu mai apară ca „oferte noi"; să se vadă
cine dă fiecare comandă, separat; la livrări câmpurile unul sub altul, nu pe un rând cu liniuțe;
ID + telefon la liniuță, ca să poată copia și trimite mesaj clientului.

Macheta v1 a trecut prin 3 critici independenți (cerințe / lizibilitate pe telefon / corectitudinea
datelor și fezabilitate Make) și un sintetizator: 12 probleme confirmate, 10 respinse cu motiv.

## Ce spun datele (verificat prin API, 02.09)

| Fapt | Valoare |
|---|---|
| `Data Comanda` = 02.09 | **4** înregistrări, toate `Comandata`, create direct așa (comenzi de colaboratori) |
| Modificate azi | aceleași 4 |
| View „Comenzi efectuate" | 14 total: 4 azi · 5 ieri · 2 pe 31.08 · 3 mai vechi |
| Livrări mâine | **3**, nu 2 — „Scafa - Sipca Tuca" are status `COMANDA PARTIALA / LIVARE MAINE`, nefiltrat de raportul vechi |
| Toate 3 livrările | puse pe «livrare mâine» **ieri, 01.09** (ultima modificare 15:24–15:26) |
| `LIVRATA DE RIDICAT` | 1: Stoenescu Gheorghe, 150 lei, Pitesti Birou — nu apărea nicăieri |
| `Factura_Furnizor_OK` bifat | **0 din 518** — avertismentul apărea la fiecare livrare, mereu |
| `Responsabil Comanda` pe cele 4 | Mugurel Colabortor, Dumitru Marian ×2, Mihai Targoviste = **de la cine vine comanda**, nu cine a tastat |
| `Id Client operational` | **există**: `UPPER(LEFT(nume,3) & RIGHT(cifre telefon,5))` → `HOD52528`. Exact convenția din mailuri |
| `Creat de` / `Modificat de` | **nu există**; API-ul nu le poate crea. Singura cale spre „cine a tastat" |
| Telefon Scafa / Stoenescu | stocate `(072) 129-7391`, `(072) 341-1035` — alt format decât restul |

**Eroarea reală din raportul vechi:** cele 4 comenzi de azi apăreau la „OFERTE NOI" deși erau deja
`Comandata`. Nu număra greșit — eticheta greșit. Dacă s-au dat mai multe comenzi decât 4, ele nu sunt
în Airtable; raportul vede doar ce e tastat.

## Macheta v2 — cu datele reale de azi, exact cum sunt scrise în Airtable

Fără diacritice inventate, cu typo-ul „Colabortor" inclus: Make trimite valorile brute, iar exemplul
aprobat trebuie să fie identic cu ce va primi.

```
🌙 RAPORT ZI — 02.09.2026 · sistem OK

📦 COMENZI DATE AZI (4)
(împărțite după «Responsabil Comanda» = de la cine vine comanda, nu cine a tastat-o)
👤 Mugurel Colabortor (1)
▪️ HOD52528   +40740552528
   Smeura
   HODOBAȘA IONUT COSMIN
👤 Dumitru Marian (2)
▪️ DUM39727   +40742539727
   Hintesti
   Dumitru Marian
▪️ DUM39727   +40742539727
   Pitesti
   Dumitru Marian
   (a 2-a comandă, același client)
👤 Mihai Targoviste (1)
▪️ MIH66162   +40736066162
   Targoviste
   Mihai Targoviste
ℹ️ În view «Comenzi efectuate» sunt 14 rânduri; cu Data Comanda = azi sunt exact 4, restul sunt din zilele trecute. Raportul vede doar ce e tastat în Airtable.
ℹ️ Cine le-a TASTAT (tu / Antonia) nu se vede încă: lipsește câmpul «Created by», pe care doar tu îl poți adăuga (tabelul Ofertare → + câmp → tip Created by). Din ziua următoare, raportul le împarte și pe persoană.

🆕 Azi: nicio ofertă nouă rămasă la Ofertat, nicio altă schimbare la oferte mai vechi, niciun rând nou în Jurnal Antonia.

🚚 LIVRĂRI MÂINE — 03.09 (3)
▪️ FLA74171   +40754474171
   Pitesti
   Flavius profile hala
   1.680 lei
▪️ GEO03167   +40745803167
   Vulpesti
   George Vulpesti
   3.870 lei
▪️ SCA97391   +40721297391
   Negrasi
   Scafa - Sipca Tuca
   ⚠️ comandă parțială
   ⚠️ valoare lipsă — completeaz-o în Airtable
⚠️ toate 3 sunt pe «livrare mâine» încă de ieri (01.09) — dacă s-au livrat deja, schimbă-le statusul
⚠️ toate 3: fără factură furnizor bifată
👉 confirmă transport/șofer pentru fiecare

🏢 DE RIDICAT DE LA BIROU (1)
▪️ STO11035   +40723411035
   Pitesti Birou
   Stoenescu Gheorghe
   150 lei
👉 anunță clientul că poate ridica

✅ ULTIMELE 7 ZILE: nimic de rezolvat (facturi furnizori neclasificate 0 · de emis factură 0 · paleți deschiși peste 30 de zile 0)

📦 BACKLOG VECHI (sesiune separată)
▪️ Facturi neclasificate: 94, cea mai veche 20.03.2026
▪️ De emis factură: 51, cea mai veche 09.02.2026
```

### Ce s-a schimbat față de v1 și de ce

- **La ▪️ doar ID + telefon** — exact ce copiază el. Telefonul fără spații: o apăsare lungă îl
  selectează întreg și Telegram îl face apăsabil. Localitatea și numele imediat sub, fiecare pe rândul
  lui. Zero „·".
- **Comenzile grupate pe persoană** după `Responsabil Comanda` — se poate de mâine, cu datele
  existente. Ce nu se poate încă: cine a tastat. Raportul îi spune exact ce are de făcut.
- **Secțiunile goale comasate** într-un rând; când au conținut, își reiau titlul și lista.
- **„Fără factură furnizor"** o singură dată sub listă — bifa e goală peste tot, avertismentul repetat
  era zgomot.
- **Secțiune nouă „De ridicat de la birou"** — cazul cel mai bun pentru „ID + telefon ca să trimit
  mesaj", și era invizibil.
- **Data la livrări** + avertismentul „pe livrare mâine de ieri" — statusul e static, cele 3 riscau să
  apară la nesfârșit.
- **„sistem OK" în titlu** — tăierea la 3.900 de caractere ar fi tăiat exact santinela de la coadă.

Lungime: azi ~1.900 de caractere. Zi de vârf (12 comenzi, 6 livrări, 3 oferte, 3 rânduri jurnal)
~3.000–3.200. Plafon în Make: 15 comenzi / 10 livrări, apoi „…și încă N". Peste 4.096: două mesaje.

### Cum va arăta COMENZI după ce există «Created by» — FORMĂ, cu date INVENTATE

```
📦 COMENZI DATE AZI (3)
👤 tastate de Daniel (2)
▪️ EXE00001   +40700000001
   Localitate exemplu
   Client Exemplu 1
   de la: Colaborator exemplu
👤 tastate de Antonia (1)
▪️ EXE00002   +40700000002
   Localitate exemplu
   Client Exemplu 2
👤 Altcineva / necunoscut (0)
```

Regula de atribuire în Make, în ordine: (1) `Responsabil Comanda` = Daniel/Antonia → acea persoană
„(prin Telegram)" — PUNTE 4 scrie acolo cine a trimis; (2) altfel `Creat de`; (3) restul → „Altcineva
/ necunoscut", niciodată omis. Înregistrările create prin API primesc la `Created by` contul
token-ului, nu expeditorul — de aceea regula (1) vine prima.

## Logica secțiunilor (de implementat după aprobare)

| Secțiune | Filtru Make — toate cu `TRIM()` pe status, datele în `Europe/Bucharest` |
|---|---|
| COMENZI DATE AZI | `IS_SAME({Data Comanda}, azi, 'day')`; sortat după `Responsabil Comanda`; agregator cu grupare |
| count view | un Search pe view „Comenzi efectuate", doar numărat |
| OFERTE NOI AZI | `CREATED_TIME()` = azi **și** status ∈ {De ofertat, Ofertat} |
| ALTE SCHIMBĂRI AZI | `LAST_MODIFIED_TIME({Status Oferta F1})` = azi **și** creat ≠ azi **și** `Data Comanda` ≠ azi — doar schimbări de status, nu scrierile automate |
| LIVRĂRI MÂINE | status ∈ {`Livare maine`, `COMANDA PARTIALA / LIVARE MAINE`}; „parțială" derivată din status; vechimea din `LAST_MODIFIED_TIME({Status Oferta F1})` |
| DE RIDICAT | status = `LIVRATA DE RIDICAT` |
| Telefon | doar cifre; `0…` → `+4`+cifre; `40…` → `+`+cifre |
| Valoare | `formatNumber(v; 0; ','; '.') & ' lei'`; gol → „⚠️ valoare lipsă — completeaz-o în Airtable" |
| Pas 2, după acceptare | Parse Mode HTML cu ID + telefon în `<code>` → o atingere = copiat. Obligatoriu escape `& < >` pe toate valorile |

Câmpuri — toate existente: `Id Client operational`, `Nume Beneficiar`, `Locatie proiect`,
`Telefon / Nr Contact`, `Valoare Oferta acceptata`, `Responsabil Comanda`, `Data Comanda`,
`Status Oferta F1`, `Factura_Furnizor_OK`. Aceeași formă de rând se aplică și în briefingul de
dimineață (PUNTE 2) la livrări.

## Cele două întrebări pentru Daniel

1. **„Cine le dă"** înseamnă colaboratorul de la care vine comanda (Mugurel, Dumitru — **se poate de
   mâine**), sau cine a tastat-o în Airtable (Daniel / Antonia — **doar după ce adaugă câmpul
   Created by**)? Sau amândouă?
2. **Bifa `Factura_Furnizor_OK`** e goală pe toate cele 518 rânduri. O folosește cineva (Antonia, când
   vine factura Bilka), sau scoatem avertismentul din raport până când e folosită?

## Verificare (după aprobare)

- Run-once pe PUNTE 3; mesajul de pe Telegram se compară cu macheta aprobată rând cu rând.
- Cele 4 comenzi la COMENZI, nu la OFERTE; cele 3 livrări toate prezente; Stoenescu la DE RIDICAT.
- Toate telefoanele în același format; niciun „·" pe rândurile de date.

## Corecturi de date semnalate (ale lui Daniel, nu se fac prin raport)

- Telefoanele Scafa și Stoenescu în alt format în Airtable — raportul le normalizează, dar ar fi bine
  corectate în tabel.
- „Mugurel Colabortor" — typo în opțiunile câmpului `Responsabil Comanda`.
- Scafa: `Valoare Oferta acceptata` necompletată.
