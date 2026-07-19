# Șablon „pachet de sarcină" (pentru C.C)

C.C copiază acest bloc în câmpul `Pachet sarcina` și îl completează. Scopul: C.K să poată executa **fără să cunoască proiectul**.

```
PROTOCOL: v1
OBIECTIV: <o singură frază: ce rezultat și de ce>

PAȘI:
1. <acțiune exactă, fără interpretare>
2. <...>
3. <...>

INTRĂRI:
- URL: <adresa exactă>
- Cont: <„folosește contul X" — NICIODATĂ parola>
- Fișier: <nume/loc exact>
- Butoane/etichete: <„butonul verde Salvează">

INTERDICȚII:
- Nu șterge nimic.
- Nu modifica alte date.
- Dacă ceva e neclar sau lipsește → Status = Blocat + motiv. NU ghici.
```

Iar în câmpul `Criterii de gata` (checklist verificabil):

```
[ ] <condiție 1, ex: link-ul începe cu https>
[ ] <condiție 2, ex: fișierul are extensia .pdf>
[ ] <condiție 3, ex: apare mesajul „salvat cu succes">
```

## Exemplu complet (sarcină MECANICĂ)

`Pachet sarcina`:
```
PROTOCOL: v1
OBIECTIV: Urcă oferta PDF în portalul clientului ca C.C să poată prelua link-ul public.

PAȘI:
1. Deschide https://portal.client.ro/upload
2. Login cu contul „ofertare" (credentiale salvate în browser).
3. Apasă „Încarcă document", alege fișierul oferta-2026-07.pdf din folderul Descărcări.
4. După încărcare, copiază link-ul public afișat.

INTRĂRI:
- URL: https://portal.client.ro/upload
- Cont: ofertare (parola e salvată local, NU o cere)
- Fișier: Descărcări/oferta-2026-07.pdf

INTERDICȚII:
- Nu șterge documente existente. Neclar → Blocat.
```

`Criterii de gata`:
```
[ ] Fișierul apare în listă cu numele oferta-2026-07.pdf
[ ] Există un link public care începe cu https
[ ] Link-ul se deschide și arată PDF-ul
```

`Rezultat` (completat de C.K):
```
SUCCES
link: https://portal.client.ro/f/9f3a2b
verificat: DA (toate 3 criteriile bifate)
cheie_idempotenta: portal.client:upload:oferta-2026-07
```
