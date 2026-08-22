# Ghid: Gmail preia automat emailurile din Yahoo (POP3)

Scop: listele de preț de la furnizori ajung pe Yahoo, dar Claude citește doar
Gmail. După configurarea asta, Gmail trage singur mesajele din Yahoo și
skill-ul de actualizare a prețurilor are ce citi.

Se face O SINGURĂ DATĂ. Durează ~10-15 minute.

**Important:** configurarea se face din Gmail versiunea desktop.
Pe telefon: Chrome → mail.google.com → meniu (⋮) → bifează "Site pentru desktop".

---

## PARTEA A — Yahoo: generezi parola de aplicație

Yahoo blochează parola normală pentru conexiuni externe. Ai nevoie de o
"parolă de aplicație" (app password) — un cod de 16 caractere.

1. Deschide `login.yahoo.com` și autentifică-te pe contul de firmă
   (cel pe care vin listele de preț).
2. Click pe numele/inițiala ta (dreapta sus) → **Informații cont**
   (*Account Info*).
3. Mergi la fila **Securitate cont** (*Account Security*).
4. Caută opțiunea **Generează parolă de aplicație**
   (*Generate app password* / *Manage app passwords*).
5. La numele aplicației scrie: `Gmail`
6. Apasă **Generează** (*Generate*).
7. Yahoo afișează un cod de 16 caractere. **Copiază-l acum** — nu mai poate fi
   văzut după ce închizi fereastra. Dacă îl pierzi, generezi altul.

⚠️ Codul ăsta e o parolă. Nu îl trimite pe chat, nu îl scrie în fișiere.
Îl folosești o singură dată, la Pasul B7, și gata.

---

## PARTEA B — Gmail: adaugi contul Yahoo

1. Deschide `mail.google.com` (desktop sau Chrome cu "Site pentru desktop"),
   logat pe adresa conectată la Claude.
2. Click pe **rotița dințată** (dreapta sus) → **Vezi toate setările**
   (*See all settings*).
3. Deschide fila **Conturi și import** (*Accounts and Import*).
4. La rândul **Verifică mesajele din alte conturi**
   (*Check mail from other accounts*) → click **Adaugă un cont de e-mail**
   (*Add a mail account*).
5. Scrie adresa completă de Yahoo → **Următorul** (*Next*).
6. Alege **Importă e-mailuri din celălalt cont (POP3)**
   (*Import emails from my other account (POP3)*) → **Următorul**.
7. Completează exact așa:
   - **Nume utilizator:** adresa completă de Yahoo (cu @yahoo.com)
   - **Parolă:** codul de 16 caractere generat la Partea A
   - **Server POP:** `pop.mail.yahoo.com`
   - **Port:** `995`
8. Bifează:
   - ✅ **Lasă o copie a mesajului pe server** — IMPORTANT, ca să nu dispară
     emailurile din Yahoo
   - ✅ **Folosește întotdeauna o conexiune securizată (SSL)**
   - ✅ **Etichetează mesajele primite** → alege sau creează eticheta
     `furnizori`
   - ❌ NU bifa "Arhivează mesajele primite"
9. Click **Adaugă cont** (*Add Account*).
10. La întrebarea "Vrei să trimiți emailuri de pe această adresă?"
    → alege **Nu** (*No*). Avem nevoie doar de citire.

---

## PARTEA C — Verificare

1. Așteaptă 5-10 minute. Gmail verifică periodic, nu instant.
2. În Gmail, caută eticheta `furnizori` în bara din stânga.
3. Dacă apar mesaje acolo → funcționează.
4. Dacă nu apare nimic după 30 de minute, întoarce-te la
   Setări → Conturi și import și vezi ce scrie lângă contul Yahoo
   (acolo apare eroarea, dacă există).

---

## Ce raportezi înapoi lui Claude

- [ ] A mers sau nu?
- [ ] Ce eroare a apărut, dacă a apărut (textul exact)
- [ ] Numele etichetei folosite (dacă nu e `furnizori`)
- [ ] Câte mesaje au venit la primul import

**Nu trimite parola de aplicație.**

---

## Probleme frecvente

| Simptom | Cauză | Rezolvare |
|---|---|---|
| "Autentificare eșuată" | Ai folosit parola normală Yahoo | Reia Partea A, generează parolă de aplicație |
| Nu găsești "Generează parolă de aplicație" | Contul n-are verificare în 2 pași activă | Activează 2FA în Securitate cont, apoi reia |
| Nu vezi opțiunea în Gmail | Ești pe aplicația de telefon | Chrome → "Site pentru desktop" |
| Vin doar câteva mesaje | POP citește doar Inbox-ul | Normal — istoricul din foldere îl luăm cu Cowork |

---

## Ce urmează, după ce merge

1. Recuperarea istoricului: Cowork + Claude in Chrome intră în Yahoo și
   descarcă listele de preț vechi din foldere (POP nu le aduce).
2. Skill-ul "actualizare prețuri": citește eticheta `furnizori`, extrage
   prețurile din PDF/Excel, propune actualizarea, Daniel confirmă.
