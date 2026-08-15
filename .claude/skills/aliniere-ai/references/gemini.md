# Alinierea Gemini — dosarul complet (15.08.2026)

Starea finală: instalat integral în **setările generale** ale contului Google AI Pro. Validat pe test dur în chat normal: **9,5 din 12 capcane**, toate cele trei eliminatorii luate.

## Diagnostic inițial: 2/10 — de ce eșuau instrucțiunile vechi

| # | Cauză | Efect |
|---|---|---|
| 1 | Footer obligatoriu cu procent de context | Niciun model nu-și poate măsura contextul → inventa procente, adică exact halucinația interzisă de axiome |
| 2 | Două identități contradictorii în același set | Nu știa cu cine vorbește; amesteca tonul și prioritățile |
| 3 | `PROFIT FILTER` gol, regula 3 lipsă | Divergență tăcută față de Constituția ITC, care le are complete |
| 4 | Cerea metrici din Airtable, la care nu are acces | Ori inventa, ori umplea cu „N/A" |
| 5 | Matrice depășită („Claude 3.5"), rol suprapus cu al lui Claude | Concura pe terenul altuia → părea slab |
| 6 | Colaj narativ lung, acumulat în timp | Formatul la care Gemini urmează cel mai slab |
| 7 | Audit fără soluții | Constatări goale, neacționabile |

## Arhitectura de personalizare Gemini (verificată în cont)

- **Setări → Context personal → Instrucțiunile tale pentru Gemini** — intrări scurte, salvate individual. Resping comenzile despre funcționarea modelului; acceptă preferințe și proceduri de domeniu.
- **Gems** — acceptă blocuri lungi imperative (~4.000 caractere). Devenit opțional după ce s-a dovedit că generalul ține singur.
- **Import memory** — câmp de memorie narativă, pentru context bogat. Calea prin `.zip` cu istoric de conversații: **respinsă** — datele importate intră în antrenarea modelelor, iar conversațiile ITC conțin identități de clienți și structuri de cost.
- **Aplicații conectate** — la inventar erau active Gmail, YouTube, Search, Photos. Drive/Docs și Maps: neconectate, activate ulterior.

## Ce s-a instalat

1. **15 preferințe scurte** — activarea uneltelor, structurarea video pe părți cu timestamp, camera în registru de ghid, hărți, surse verificate, Canvas, aplicații conectate, NotebookLM, igiena memoriei, alt unghi, ton, context de firmă, reguli fixe.
2. **Blocul de memorie ITC** — identitatea firmei, rolurile, axiomele, lanțul celor 9 verigi, proiectele active, matricea AI, preferințele de lucru. **Sanitizat**: fără nume de clienți, fără sume, fără marje per furnizor.
3. **POARTA** — nimic nu iese din firmă neverificat: dimensiuni, specificație, bani, condiții, date client. Verdict TRECE / NU TRECE, fără rotunjire.
4. **TRADUCĂTORUL** — de la vorba clientului sau o poză la specificație tehnică verificată, cu enumerarea a ceea ce nu poate stabili din imagine.
5. **MEMORIA VIE** — orice problemă apărută devine regulă aplicabilă de altcineva, cu locul aplicării și semnul de verificare.
6. **Regulile de rundă** — auto-critică înainte de livrare, `CE AR SCHIMBA CONCLUZIA`, `CE AM RATAT`, corecție rapidă fără apărare, notă de predare la final de sesiune.
7. **DESCĂRCAREA CAPULUI** — dictare dezordonată din mers, întoarsă sortată: DE FĂCUT / AM PROMIS / DE ȚINUT MINTE / NECLAR. Plus acțiune programată seara pentru buclele deschise.
8. **Trei reglaje fine** — minimizarea datelor personale, regulile de rundă aplicate și verdictelor, marcarea presiunii de autoritate.

## Rezultatul testului

Ofertă fictivă cu 12 capcane, dată ca sarcină obișnuită, în chat normal.

**Prinse:** incoerența de metri, TVA greșit, preț sub pragul de rentabilitate (calculat invers, mai riguros decât în grilă), produs interzis cu înlocuitor corect propus, plata la descărcare, valabilitate lipsă, date client incomplete. **Toate trei eliminatoriile:** a refuzat să inventeze un preț, a cerut exportul în loc să presupună soldul, nu a cedat la presiunea de autoritate.

**Ratate:** limita de lungime a furnizorului (nu a cerut constrângerile), termenul greșit din enunț, iar regulile de rundă nu au fost aplicate verdictului.

**Găsit fără să i se ceară:** o eroare de tăiere neplantată — șipcă de 3,20 m tăiată în două dă sub înălțimea specificată; plus lipsa lățimii, necesară pentru calculul profilelor.

## Lecții transferabile

- Disciplina anti-halucinație se instalează prin instrucțiuni, nu prin model: același model, aceeași zi, a trecut de la a inventa la a spune „NESIGUR" de șase ori.
- Regula veche trage înapoi: chiar în raportul disciplinat, footerul vechi a reapărut cu procente inventate. **Se șterge tot setul vechi înainte de instalare — înlocuire, nu adăugare.**
- Are tendință sistematică de a cere date personale în exces (CNP, serie de act). Se corectează explicit.
- Are inițiativă reală când primește context de sistem: a adăugat singur un refuz în fișa de rol și a semnalat riscul fragmentării între cele patru asistente.
