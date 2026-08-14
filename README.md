# smartbill-openapi — unelte PeAcoperis.ro

## Schiță Acoperiș V1 (`schita_acoperis_v1.html`)

Aplicație web pentru tabletă (un singur fișier HTML) cu care desenezi **planul
acoperișului direct pe acoperiș**, iar aplicația:

1. **descompune automat desenul în versanți** (detecție de fețe din graful planului);
2. clasifică muchiile din **sensul de scurgere al apei**: streașină / pazie /
   coamă / muchie / dolie — fiecare numărată o singură dată;
3. „întinde" fiecare versant la dimensiunile reale din **lungimea pantei măsurate**;
4. calculează **panotajul** (foi de țiglă metalică pe lățimea utilă a modelului,
   rotunjite la modul, despicate cu suprapunere peste lungimea maximă);
5. scoate **necesarul de materiale** (țiglă, coame, dolii, șorțuri, pazii, folie,
   șuruburi, borduri de coș, sistem pluvial) — totul editabil;
6. generează pe loc: **PDF ofertă client**, **PDF fișă de producție** (panotajul
   desenat per versant), **Excel formular de comandă** și mesaj **WhatsApp**.

Flux: `Proiecte → Client → Plan → Versanți → Panotaj → Necesar → Ofertă`.
Proiectele se salvează automat în browser (localStorage) + export/import JSON.

### Utilizare pe tabletă

- **`schita_acoperis_v1_offline.html`** — varianta recomandată pentru teren:
  totul înglobat (~5 MB), **merge fără internet**. Copiaz-o pe tabletă și
  deschide-o în Chrome (sau adaug-o la ecranul principal).
- `schita_acoperis_v1.html` — varianta sursă (lizibilă); la prima încărcare
  are nevoie de internet pentru librăriile din CDN.
- Regenerarea variantei offline după modificări în sursă: `node build_offline.mjs`.

### De completat / pași următori

- Prețurile din cataloagele `TIGLA_CATALOG`, `ACCESSORIES_CATALOG`,
  `PLUVIAL_CATALOG` sunt **orientative** (marcate `TODO preț real`) — se
  actualizează la începutul scriptului din fișier.
- Formularul de comandă Excel e generic; se poate replica 1:1 formularul Bilka
  când există fișierul original.
- Integrare SmartBill (proformă din ofertă) — planificată pentru v2, pe baza
  specului de mai jos.

## Alte fișiere

- `calculator_sipca_v22_enterprise.html` — calculator ofertare șipcă metalică
  (gard), aplicație de sine stătătoare.
- `smartbill_proforma_openapi (1).json` — spec OpenAPI minimal pentru crearea
  de proforme prin SmartBill API (folosit din GPT personalizat; viitoarea
  integrare v2 a aplicației de schiță).
