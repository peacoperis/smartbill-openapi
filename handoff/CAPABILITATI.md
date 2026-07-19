# Registru de capabilități C.K

Meniul cu ce știe C.K să facă sigur. **C.C verifică aici înainte să delege.** Dacă acțiunea nu e `DA`, C.C nu creează sarcina — escaladează direct la om.

Actualizează acest fișier pe măsură ce C.K învață acțiuni noi.

| Acțiune | Poate C.K? | Note |
|---|---|---|
| Login pe un site + navigare (Claude in Chrome) | ✅ DA | Credentiale salvate în browser, local |
| Clicuri prin interfața unui site | ✅ DA | Cu etichete de butoane clare în sarcină |
| Upload fișier din PC într-un site/portal | ✅ DA | Fișierul trebuie să existe deja pe PC |
| Descărcare fișier și salvare pe PC | ✅ DA | Se indică folderul țintă |
| Copiere text/link dintr-o pagină | ✅ DA | — |
| Completare formular web | ✅ DA | Toate câmpurile precizate în sarcină |
| Citire dintr-un email deschis în browser | ⚠️ PARȚIAL | Doar dacă e logat deja; de testat |
| Rezolvare CAPTCHA / 2FA | ❌ NU | Necesită om → escaladare |
| Instalare programe pe PC | ❌ NU | Escaladare la om |
| Decizii de business / alegeri fără reguli | ❌ NU | Rămâne la C.C sau reguli explicite |

## Cum se folosește (C.C)

1. Identifică tipul acțiunii blocate.
2. Caută-l în tabel.
3. `DA` → creează sarcina în hub. `PARȚIAL` → creează cu criterii stricte + fallback `Blocat`. `NU` → NU crea sarcină, anunță omul.
