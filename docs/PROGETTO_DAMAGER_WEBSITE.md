# 📋 PROGETTO DAMAGER WEBSITE — Documento Master
**Versione:** 3.0 | **Data:** Marzo 2026  
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
| Conformità GDPR cookie | Osano Cookie Consent (open source) |
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
| [`FASE_0_Preparazione.md`](FASE_0_Preparazione.md) | Indice FASE 0 |
| [`FASE_0A_Setup_Stack.md`](FASE_0A_Setup_Stack.md) | Git, Netlify, Hugo, dominio |
| [`FASE_0B_Raccolta_Asset.md`](FASE_0B_Raccolta_Asset.md) | Logo, sfondi, EU logo, loghi partner |

### Specifiche e Architettura

| File | Contenuto |
|------|-----------|
| [`SPECIFICHE_SITO.md`](SPECIFICHE_SITO.md) | Identità visiva, struttura pagine, contenuti, cookie |
| [`ARCHITETTURA_TECNICA.md`](ARCHITETTURA_TECNICA.md) | Stack, CMS, Netlify config, sicurezza, workflow |

### Fasi di sviluppo *(documenti da creare)*

| File | Contenuto |
|------|-----------|
| `FASE_1_Setup_Hugo_CMS.md` | Inizializzazione progetto Hugo + Decap CMS |
| `FASE_2_Template.md` | Tema grafico bianco/nero |
| `FASE_3_Home.md` | Home page |
| `FASE_4_Project.md` | Project page |
| `FASE_5_Partners.md` | Partners page + mappa |
| `FASE_6_Media.md` | Media page + CMS integration |
| `FASE_7_Cookie.md` | Cookie consent + Privacy policy |
| `FASE_8_Deploy.md` | Go-live, dominio, DNS, testing |
| `FASE_9_Formazione.md` | Guida utente CMS per editor |

---

## 3. PIANO DI SVILUPPO — CHECKLIST

### FASE 0A — Setup Stack Tecnologico

- [x] **F0A.1** Repository GitHub creato (`ergonresearch/damager-website`, pubblico) ✅
- [x] **F0A.2** Account Netlify + URL staging (`damager-website.netlify.app`) ✅

- [ ] **F0A.3** Verifica disponibilità `damager.eu` *(acquisto differito alla FASE 8)*
- [ ] **F0A.4** Hugo Extended installato

### FASE 0B — Raccolta Asset

- [ ] **F0B.1** Logo DAMAGER convertito in SVG/PNG/favicon
- [ ] **F0B.2** Immagini di sfondo create da `background_template.pdf`
- [ ] **F0B.3** Logo EU "Funded by the European Union" scaricato
- [ ] **F0B.4** Loghi e descrizioni dei 5 partner raccolti

### FASE 1 — Setup Hugo + CMS

- [ ] **F1.1** Progetto Hugo inizializzato (`hugo new site .`)
- [ ] **F1.2** `hugo.toml` configurato
- [ ] **F1.3** Tema custom creato (layouts, assets, static)
- [ ] **F1.4** Decap CMS configurato (`static/admin/config.yml`)
- [ ] **F1.5** Netlify Identity abilitato
- [ ] **F1.6** `netlify.toml` configurato
- [ ] **F1.7** Primo deploy su Netlify verificato

### FASE 2 — Template grafico

- [ ] **F2.1** Palette bianco/nero in SCSS
- [ ] **F2.2** Header sticky con logo + menu
- [ ] **F2.3** Footer con EU disclaimer + link legali
- [ ] **F2.4** Componenti: card news, card documento, card partner
- [ ] **F2.5** Sfondi decorativi blueprint (compressore/turbina)
- [ ] **F2.6** Layout responsive mobile-first
- [ ] **F2.7** Timeline animata con aeroplano SVG

### FASE 3 — Home Page

- [ ] **F3.1** Hero section (turbojet.png + titolo)
- [ ] **F3.2** EU Disclaimer (logo + testo obbligatorio)
- [ ] **F3.3** Project progress bar (dinamica, calcolo JS)
- [ ] **F3.4** Upcoming Events (DAMAGER M06 Meeting)
- [ ] **F3.5** Form di contatto (Netlify Forms)

### FASE 4 — Project Page

- [ ] **F4.1** Intro/context (testo factsheet EDF)
- [ ] **F4.2** Project Details (tabella dati chiave)
- [ ] **F4.3** Timeline animata con milestone M06–M48
- [ ] **F4.4** Research Areas (4 card tecnologiche)

### FASE 5 — Partners Page

- [ ] **F5.1** Card per i 5 partner (logo, nome, paese, ruolo)
- [ ] **F5.2** Loghi partner inseriti
- [ ] **F5.3** Mappa Google Maps con marker consorzio
- [ ] **F5.4** Stile mappa monocromatico

### FASE 6 — Media Page

- [ ] **F6.1** Layout tab: News&Events / Documents / Papers
- [ ] **F6.2** Sezione News & Events con card
- [ ] **F6.3** Kickoff Meeting inserito come prima news
- [ ] **F6.4** Sezione Documents (3 categorie)
- [ ] **F6.5** Factsheet PDF caricato
- [ ] **F6.6** Sezione Academic Papers
- [ ] **F6.7** CMS collegato a tutte le collezioni

### FASE 7 — Cookie Consent e Privacy

- [ ] **F7.1** Osano Cookie Consent integrato
- [ ] **F7.2** Categorie: necessari / analitici / funzionali
- [ ] **F7.3** Google Analytics 4 condizionale
- [ ] **F7.4** Google Maps condizionale (placeholder se non accettato)
- [ ] **F7.5** Privacy Policy scritta
- [ ] **F7.6** Cookie Policy scritta
- [ ] **F7.7** Link "Cookie Preferences" nel footer

### FASE 8 — Deploy e Go-Live

- [ ] **F8.0** Acquisto dominio `damager.eu` (registrar OVH/Aruba, a nome HIT09 SRL)
- [ ] **F8.1** DNS configurato (`damager.eu` → Netlify)
- [ ] **F8.2** HTTPS attivato (automatico)
- [ ] **F8.3** Test cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] **F8.4** Test mobile (iOS, Android)
- [ ] **F8.5** Test form di contatto (email ricevuta)
- [ ] **F8.6** Test CMS (inserimento news, upload PDF)
- [ ] **F8.7** Test cookie consent

### FASE 9 — Formazione editor

- [ ] **F9.1** Guida utente CMS (screenshots passo-passo)
- [ ] **F9.2** Invito editor tramite Netlify Identity
- [ ] **F9.3** Sessione training

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
| F8 | Deploy + Testing | 1 giorno |
| F9 | Formazione | 0.5 giorni |
| **TOTALE** | | **~14-18 giorni lavorativi** |

### Riepilogo costi

| Voce | Costo annuo |
|------|-------------|
| Hugo, Decap CMS, GitHub | **Gratuito** |
| Netlify (hosting + forms + Identity) | **Gratuito** |
| Osano Cookie Consent | **Gratuito** |
| Google Analytics 4, Maps, Fonts | **Gratuito** |
| SSL/HTTPS (Let's Encrypt) | **Gratuito** |
| **Dominio `damager.eu`** | **~10-15€/anno** |
| **TOTALE** | **~10-15€/anno** |

---

## 5. MANUTENZIONE

| Operazione | Chi | Come |
|------------|-----|------|
| Inserire news/eventi | Editor non tecnico | `damager.eu/admin` → CMS |
| Caricare PDF (documenti, paper) | Editor non tecnico | `damager.eu/admin` → CMS |
| Modificare testi | Editor non tecnico | `damager.eu/admin` → CMS |
| Modificare design/template | Sviluppatore | VS Code → git push → deploy auto |
| Rinnovo dominio | Coordinatore | Registrar (~10-15€/anno) |

---

## 6. MATERIALI ANCORA NECESSARI

| # | Materiale | Necessario per | Stato |
|---|-----------|----------------|-------|
| 1 | Foto del Kickoff Meeting | Media → News | ✅ `resources/foto_kickoff.jpg` |
| 2 | Link post LinkedIn Kickoff | Media → News | ✅ [Post LinkedIn](https://www.linkedin.com/posts/damager-edf-project_edf-europeandefencefund-damager-activity-7429165736457162752-bi3g) |
| 3 | Data DAMAGER M06 Meeting (Polonia) | Home → Events | ✅ Indicativa giugno 2026 |
| 4 | URL ufficiale COMOTI | Partners | ✅ https://comoti.ro/en/home-2/ |
| 5 | Indirizzo fisico HIT09 SRL | Partners (mappa) | ⏳ Da fornire |
| 6 | Indirizzo fisico Ergon Research SRL | Partners (mappa) | ⏳ Da fornire |
| 7 | P.IVA/CF HIT09 SRL | Privacy Policy | ⏳ Da fornire |
| 8 | Email contatto pubblico progetto | Privacy Policy | ⏳ Da fornire |
| 9 | LinkedIn progetto DAMAGER | Header/Footer | ✅ https://www.linkedin.com/company/damager-edf-project/posts/ |
| 10 | Descrizioni ufficiali partner approvate | Partners | ⏳ Da approvare |
| 11 | Paper scientifici già disponibili | Media → Papers | ⏳ Da fornire |
| 12 | Linee guida comunicazione EDF | Tutto il sito | ⏳ Da verificare con HIT09 |


---

*Progetto DAMAGER Website — Documento Master v3.0 | Marzo 2026*  
*Tutti i costi si basano sui piani gratuiti disponibili a marzo 2026.*
