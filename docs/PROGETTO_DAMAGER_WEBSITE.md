# 📋 PROGETTO DAMAGER WEBSITE — Documento Master
**Versione:** 4.6 | **Data:** Aprile 2026  
**Progetto:** DAMAGER — European Defence Fund (EDF) 2024  
**Coordinatore:** HIT09 SRL (Italy)

---

## 1. PANORAMICA DEL PROGETTO

### Obiettivo

Realizzare il sito web ufficiale del progetto di ricerca DAMAGER, gestibile da personale non tecnico, con costo di esercizio limitato al solo dominio internet.

### Requisiti chiave

| Requisito | Soluzione adottata |
|-----------|-------------------|
| Hosting gratuito | Netlify (piano free) |
| Gestione contenuti senza codice | Decap CMS (pannello web `/admin`) |
| Conformità GDPR cookie | Vanilla Cookie Consent (open source) |
| Sviluppo locale + GitHub | Hugo + Git (branch `main`/`develop`) |
| Costo massimo annuo | ~10-15€ (solo dominio `damager.eu`) |

### Ambienti

| Ambiente | URL | Stato |
|----------|-----|-------|
| Locale | `http://localhost:1313` | Sviluppo quotidiano |
| Staging | `https://damager-website.netlify.app` | Test e validazione ✅ |
| Produzione | `https://damager.eu` | Go-live dopo stabilizzazione |


---

## 2. INDICE DELLA DOCUMENTAZIONE

La documentazione di progetto è suddivisa in file specializzati:

### Setup e Preparazione

| File | Contenuto |
|------|-----------|
| [`FASE_0_Preparazione.md`](FASE_0_Preparazione.md) | Indice FASE 0 — ordine di esecuzione aggiornato |
| [`FASE_0A_Setup_Stack.md`](FASE_0A_Setup_Stack.md) | Git, Netlify, Hugo, dominio ✅ |
| [`FASE_0B_Raccolta_Asset.md`](FASE_0B_Raccolta_Asset.md) | Logo, sfondi, EU logo, loghi partner *(eseguita dopo FASE 6)* |

### Specifiche e Architettura

| File | Contenuto |
|------|-----------|
| [`SPECIFICHE_SITO.md`](SPECIFICHE_SITO.md) | Identità visiva, struttura pagine, contenuti, cookie |
| [`ARCHITETTURA_TECNICA.md`](ARCHITETTURA_TECNICA.md) | Stack, CMS, Netlify config, sicurezza, workflow |

### Fasi di sviluppo

| File | Contenuto | Stato |
|------|-----------|-------|
| [`FASE_1_Setup_Hugo_CMS.md`](FASE_1_Setup_Hugo_CMS.md) | Inizializzazione progetto Hugo + Decap CMS | ✅ Completata |
| [`FASE_2_Template.md`](FASE_2_Template.md) | Tema grafico bianco/nero | ✅ Completata |
| [`FASE_3_Home.md`](FASE_3_Home.md) | Home page — snapshot F3; dettagli F8.A–C in [`FASE_8_Riordino_Contenuti.md`](FASE_8_Riordino_Contenuti.md) | ✅ Completata |
| [`FASE_4_Project.md`](FASE_4_Project.md) | Project page — snapshot F4; dettagli F8.D in [`FASE_8_Riordino_Contenuti.md`](FASE_8_Riordino_Contenuti.md) | ✅ Completata |
| [`FASE_5_Partners.md`](FASE_5_Partners.md) | Partners page — snapshot F5; dettagli F8.C / F8.E in [`FASE_8_Riordino_Contenuti.md`](FASE_8_Riordino_Contenuti.md) | ✅ Completata |
| [`FASE_6_Media.md`](FASE_6_Media.md) | Media page (tab News/Documents/Publications + CMS) | ✅ Completata |
| [`FASE_7_Cookie.md`](FASE_7_Cookie.md) | Cookie consent + Privacy policy | ✅ Completata |
| [`FASE_8_Riordino_Contenuti.md`](FASE_8_Riordino_Contenuti.md) | Home (F8.A–C) + Project (F8.D) implementati; **F8.E** specificato (dati + partial Partners); **F8.E-code** in attesa di conferma | In corso |
| `FASE_9_Deploy.md` | Go-live, dominio, DNS, testing | ⏳ Da creare |
| `FASE_10_Formazione.md` | Guida utente CMS per editor | ⏳ Da creare |

> **Nota sull'ordine di esecuzione:** le FASI 3-6 vengono sviluppate come un unico blocco ("struttura iniziale sito") usando asset placeholder. La raccolta degli asset definitivi (FASE 0B) avviene dopo il blocco 3-6, sostituendo i placeholder con i file reali. Dopo la FASE 7, la **FASE 8** (riordino contenuti Home / Project / Partners) aggiorna layout e testi senza modificare la numerazione delle fasi 0-7 già completate.

---

## 3. PIANO DI SVILUPPO — CHECKLIST

### FASE 0A — Setup Stack Tecnologico

- [x] **F0A.1** Repository GitHub creato (`ergonresearch/damager-website`, pubblico) ✅
- [x] **F0A.2** Account Netlify + URL staging (`damager-website.netlify.app`) ✅

- [x] **F0A.3** Verifica disponibilità `damager.eu` ✅ *(disponibile — acquisto differito alla FASE 9 — Deploy)*
- [x] **F0A.4** Hugo Extended installato ✅ (`v0.158.0+extended`)


### FASE 1 — Setup Hugo + CMS

- [x] **F1.1** Progetto Hugo inizializzato (`hugo new site . --force`) ✅
- [x] **F1.2** `hugo.toml` configurato ✅
- [x] **F1.3** Tema custom creato (layouts, assets, static) ✅
- [x] **F1.4** Decap CMS configurato (`static/admin/config.yml`) ✅
- [x] **F1.5** Netlify Identity abilitato ✅ *(fatto in FASE 0A)*
- [x] **F1.6** `netlify.toml` configurato ✅
- [x] **F1.7** Primo deploy su Netlify verificato ✅

### FASE 2 — Template grafico

- [x] **F2.1** Palette bianco/nero in SCSS ✅
- [x] **F2.2** Header sticky con logo + menu ✅
- [x] **F2.3** Footer con EU disclaimer + link legali ✅
- [x] **F2.4** Componenti: card news, card documento, card partner ✅
- [x] **F2.5** Sfondi decorativi blueprint (compressore/turbina) ✅
- [x] **F2.6** Layout responsive mobile-first ✅
- [x] **F2.7** Timeline animata con aeroplano SVG ✅

### BLOCCO FASI 3-6 — Struttura iniziale sito *(con asset placeholder)*

> Le quattro pagine vengono sviluppate in sequenza come un unico blocco. I materiali grafici non ancora disponibili (logo definitivo, loghi partner, sfondi) vengono sostituiti da placeholder. Gli asset reali saranno inseriti nella fase successiva (Raccolta Asset).

#### FASE 3 — Home Page

- [x] **F3.1** Hero section (turbojet_half.png + logo DAMAGER SVG inline) ✅
- [x] **F3.2** ~~EU Disclaimer~~ *(rimossa dalla Home, spostata nel footer)* ✅
- [x] **F3.3** Project progress bar (dinamica, calcolo JS) ✅
- [x] **F3.4** Upcoming Events (DAMAGER M12 Meeting — Dec 2026) ✅
- [x] **F3.5** Form di contatto (Netlify Forms) ✅

#### FASE 4 — Project Page

- [x] **F4.1** "About the Project": header (eyebrow + titolo + intro), SVG motore turbojet, 3 card GIF con drop-line dinamiche JS, griglia 2×2 card descrittive (Mission background, Critical gaps, Technologies, Programme goals) ✅
- [x] **F4.2** Project Details (tabella dati chiave) ✅
- [x] **F4.3** Timeline General Assembly Meetings: Kickoff → M12 → M24 Review → M36 Review → M48 Meeting ✅
- [x] **F4.4** ~~Research Areas (4 card tecnologiche)~~ *(rimossa — contenuto integrato in F4.1)* ✅

#### FASE 5 — Partners Page

- [x] **F5.1** Card per i 5 partner (logo, nome, paese, ruolo) ✅
- [x] **F5.2** Loghi partner definitivi integrati (`static/images/partners/`) ✅
- [x] **F5.3** Mappa Leaflet.js con 5 marker interattivi (OpenStreetMap, etichette permanenti) ✅
- [x] **F5.4** Mappa condizionale al consenso cookie funzionali — lazy-load Leaflet ✅

#### FASE 6 — Media Page

- [x] **F6.1** Layout tab: News&Events / Documents / Publications ✅
- [x] **F6.2** Sezione News & Events con card ✅
- [x] **F6.3** Kickoff Meeting inserito come prima news ✅
- [x] **F6.4** Sezione Documents (3 categorie) ✅
- [x] **F6.5** Factsheet document entry (PDF in static/documents/ in FASE 0B) ✅
- [x] **F6.6** Sezione Publications ✅
- [x] **F6.7** CMS collegato a tutte le collezioni ✅
- [x] **F6.8** Press Release entry (Kickoff Meeting, PDF `DAMAGER-Press-Release-KOM.pdf`) ✅

---

### Raccolta Asset — FASE 0B *(eseguita dopo il blocco 3-6)*

> A questo punto il sito ha la struttura completa con placeholder. Si sostituiscono i materiali definitivi prima del go-live.

- [x] **F0B.1** Logo DAMAGER SVG + favicon ✅
- [x] **F0B.2** Decorazioni di sfondo (`g3175.svg` + `g5.svg`) integrate in `_decorations.scss` ✅
- [x] **F0B.3** Logo EU: bandiera europea nel footer ✅
- [x] **F0B.4** Loghi definitivi dei 5 partner integrati (`static/images/partners/`) ✅
- [x] **F0B.5** `turbojet_half.png` in `static/images/` (hero Home) ✅
- [x] **F0B.6** `kickoff.jpg` (alta risoluzione) → `static/images/uploads/kickoff.jpg` (news article) ✅
- [x] **F0B.7** Factsheet PDF in `static/documents/` ✅
- [x] **F0B.8** Press Release PDF (`DAMAGER - Press Release KOM.pdf`) → `static/documents/DAMAGER-Press-Release-KOM.pdf` ✅

---

### FASE 7 — Cookie Consent e Privacy ✅

- [x] **F7.1** Vanilla Cookie Consent v3 integrato (CDN jsDelivr)
- [x] **F7.2** Categorie: necessari / analitici (GA4) / funzionali (Maps)
- [x] **F7.3** Google Analytics 4 condizionale (ID da impostare in `hugo.toml` quando disponibile)
- [x] **F7.4** Mappa consorzio condizionale (Leaflet.js + OpenStreetMap, 5 marker con etichette permanenti)
- [x] **F7.5** Privacy Policy scritta → `content/privacy-policy.md`
- [x] **F7.6** Cookie Policy scritta → `content/cookie-policy.md`
- [x] **F7.7** Link "Cookie Preferences" nel footer

### FASE 8 — Riordino contenuti (Home / Project / Partners)

> Specifica dettagliata: [`FASE_8_Riordino_Contenuti.md`](FASE_8_Riordino_Contenuti.md)

- [x] **F8.1** Home — sezione tre pilastri (Scalability, Efficiency, Survivability), testi da mockup concordato
- [x] **F8.2** Home — sezione «What is DAMAGER» (testi, immagine `.webp`, didascalia GKN, acronimo, griglia 8 concetti)
- [x] **F8.3** Partial `partners-card-grid.html` + link LinkedIn su ogni card partner; inclusione Home e pagina Partners
- [x] **F8.4** SCSS Home (pilastri, figura + didascalia, griglia 8) e adeguamenti `card-partner` in `_components.scss`
- [x] **F8.5** Verifica build Hugo, responsive, accessibilità heading
- [x] **F8.6** Specifica **F8.D** (Project — mockup About): intro esteso, sei `about-card`, nota opzionale coordinate primo anchor — in `FASE_8_Riordino_Contenuti.md` + `SPECIFICHE_SITO.md`
- [x] **F8.7** Implementazione codice pagina Project secondo **F8.D**
- [x] **F8.E-spec** Partners «Our Partners» (mockup dedicato, layout a riga intera, dati centralizzati) — specificato in `FASE_8_Riordino_Contenuti.md` + `SPECIFICHE_SITO.md`  
- [ ] **F8.E-code** Implementazione **F8.E** in repository — in attesa di conferma esplicita

### FASE 9 — Deploy e Go-Live

- [ ] **F9.0** Acquisto dominio `damager.eu` (registrar OVH/Aruba, a nome HIT09 SRL)
- [ ] **F9.1** DNS configurato (`damager.eu` → Netlify)
- [ ] **F9.2** HTTPS attivato (automatico)
- [ ] **F9.3** Test cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] **F9.4** Test mobile (iOS, Android)
- [ ] **F9.5** Test form di contatto (email ricevuta)
- [ ] **F9.6** Test CMS (inserimento news, upload PDF)
- [ ] **F9.7** Test cookie consent

### FASE 10 — Formazione editor

- [ ] **F10.1** Guida utente CMS (screenshots passo-passo)
- [ ] **F10.2** Invito editor tramite Netlify Identity
- [ ] **F10.3** Sessione training

---

## 4. STIMA TEMPI E COSTI

### Stima tempi di sviluppo

| Fase | Attività | Stima |
|------|----------|-------|
| F0 | Preparazione e asset | 1 giorno |
| F1 | Setup Hugo + CMS | 1-2 giorni |
| F2 | Template grafico | 3-4 giorni |
| F3 | Home Page | 2 giorni |
| F4 | Project Page | 1-2 giorni |
| F5 | Partners Page | 1-2 giorni |
| F6 | Media Page + CMS | 2-3 giorni |
| F7 | Cookie + Privacy | 1 giorno |
| F8 | Riordino contenuti Home (+ partial partner / LinkedIn; TBD Project/Partners) | 2-4 giorni |
| F9 | Deploy + Testing | 1 giorno |
| F10 | Formazione | 0.5 giorni |
| **TOTALE** | | **~16-23 giorni lavorativi** |

### Riepilogo costi

| Voce | Costo annuo |
|------|-------------|
| Hugo, Decap CMS, GitHub | **Gratuito** |
| Netlify (hosting + forms + Identity) | **Gratuito** |
| Vanilla Cookie Consent | **Gratuito** |
| Google Analytics 4, Google Fonts / Leaflet.js + OpenStreetMap | **Gratuito** |
| SSL/HTTPS (Let's Encrypt) | **Gratuito** |
| **Dominio `damager.eu`** | **~10-15€/anno** |
| **TOTALE** | **~10-15€/anno** |

---

## 5. MANUTENZIONE

| Operazione | Chi | Come |
|------------|-----|------|
| Inserire news/eventi | Editor non tecnico | `damager.eu/admin` → CMS |
| Caricare PDF (documenti, publications) | Editor non tecnico | `damager.eu/admin` → CMS |
| Modificare testi | Editor non tecnico | `damager.eu/admin` → CMS |
| Modificare design/template | Sviluppatore | VS Code → git push → deploy auto |
| Rinnovo dominio | Coordinatore | Registrar (~10-15€/anno) |

---

## 6. MATERIALI ANCORA NECESSARI

| # | Materiale | Necessario per | Stato |
|---|-----------|----------------|-------|
| 1 | Foto del Kickoff Meeting | Media → News | ✅ `resources/kickoff.jpg` (alta risoluzione) |
| 2 | Link post LinkedIn Kickoff | Media → News | ✅ [Post LinkedIn](https://www.linkedin.com/posts/damager-edf-project_edf-europeandefencefund-damager-activity-7429165736457162752-bi3g) |
| 3 | Data DAMAGER M12 Meeting | Home → Events | ✅ Dicembre 2026 (luogo da confermare) |
| 13 | Press Release Kickoff Meeting | Media → Documents | ✅ `static/documents/DAMAGER-Press-Release-KOM.pdf` |
| 4 | URL ufficiale COMOTI | Partners | ✅ https://comoti.ro/en/home-2/ |
| 5 | Indirizzo fisico HIT09 SRL | Partners (mappa) | ⏳ Da fornire |
| 6 | Indirizzo fisico Ergon Research SRL | Partners (mappa) | ⏳ Da fornire |
| 7 | P.IVA/CF HIT09 SRL | Privacy Policy | ⏳ Da fornire |
| 8 | Email contatto pubblico progetto | Form contatto + Privacy Policy | ✅ info@hit09.com *(configurare in Netlify dashboard → Form notifications)* |
| 9 | LinkedIn progetto DAMAGER | Header/Footer | ✅ https://www.linkedin.com/company/damager-edf-project/posts/ |
| 10 | Descrizioni ufficiali partner approvate | Partners | ⏳ Da approvare |
| 11 | Publications scientifiche già disponibili | Media → Publications | ⏳ Da fornire |
| 12 | Linee guida comunicazione EDF | Tutto il sito | ⏳ Da verificare con HIT09 |
| 14 | `compressor.webm` — animazione componente AM | Project → Engine block | ✅ `static/images/engine/compressor.webm` |
| 15 | `combustor.png` — immagine componente AM | Project → Engine block | ✅ `static/images/engine/combustor.png` |
| 16 | `turbine.webm` — animazione componente AM | Project → Engine block | ✅ `static/images/engine/turbine.webm` |


---

*Progetto DAMAGER Website — Documento Master v4.6 | Aprile 2026*  
*Tutti i costi si basano sui piani gratuiti disponibili a marzo 2026.*
