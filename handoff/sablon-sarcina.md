# Șablon „pachet de sarcină" (pentru C.C)

C.C completează câmpurile din hub + blocul de mai jos în `Pachet sarcina`. Scop: C.K execută **fără să cunoască proiectul**.

## Câmpuri de setat în hub (pe lângă text)
- `Nivel`: **N1 Reflex** (mecanic pur) / **N2 Executor** (majoritatea) / **N3 Analiza ghidata** (doar cu reguli scrise).
- `Forma livrare`: **LINK** / **FISIER** / **TEXT** / **CONFIRMARE** / **PT-APROBARE**.
- `Ireversibil`, `cheie_idempotenta`, `Prioritate` — după caz.

## `Pachet sarcina`
```
PROTOCOL: v2
OBIECTIV: <o singură frază: ce rezultat și de ce>

PAȘI:
1. <acțiune exactă, fără interpretare>
2. <...>

INTRĂRI:
- URL: <adresa exactă>
- Cont: <„folosește contul X" — NICIODATĂ parola>
- Fișier: <nume/loc exact>

REGULI (doar dacă Nivel = N3):
- <regula 1 / arborele de decizie explicit>

INTERDICȚII:
- Nu șterge nimic. Nu modifica alte date.
- Neclar/lipsă → Status = Blocat. NU ghici.
```

## `Criterii de gata` (checklist OBIECTIV — verificabil din probă)
```
[ ] <condiție măsurabilă, ex: URL întoarce 200 și tip application/pdf>
[ ] <condiție de completitudine, ex: toate cele 3 poziții prezente>
[ ] <condiție numerică, ex: total = 2220 RON>
```

## Ce va pune C.K în `Probe` (ca să știi ce aștepți)
Potrivit cu `Forma livrare`: URL live · captură urcată în hub · nr./ID confirmare · dimensiune+nume fișier · text extras · răspuns API.

---

## Exemplu (Nivel N2, Forma LINK, nu ireversibil)

`Pachet sarcina`:
```
PROTOCOL: v2
OBIECTIV: Urcă oferta PDF în portalul clientului ca C.C să preia link-ul public.

PAȘI:
1. Deschide https://portal.client.ro/upload
2. Login cu contul „ofertare" (credentiale salvate în browser).
3. „Încarcă document" → Descărcări/oferta-2026-07.pdf
4. Copiază link-ul public.

INTRĂRI:
- URL: https://portal.client.ro/upload
- Cont: ofertare (parola salvată local, NU o cere)
- Fișier: Descărcări/oferta-2026-07.pdf

INTERDICȚII:
- Nu șterge documente. Neclar → Blocat.
```
`Criterii de gata`:
```
[ ] Există un link public care începe cu https și se deschide
[ ] Link-ul arată exact fișierul oferta-2026-07.pdf (tip PDF)
```
`Probe` (completat de C.K):
```
link: https://portal.client.ro/f/9f3a2b  (deschis, 200, PDF)
cheie_idempotenta: portal.client:upload:oferta-2026-07
```
→ C.K setează `De verificat`. **C.C** deschide link-ul, confirmă 200 + PDF, pune `Gata`.
