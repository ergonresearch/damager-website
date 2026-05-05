# 🎨 SPECIFICHE DEL SITO — DAMAGER Website
**Documento di sviluppo DAMAGER Website**  
**Versione:** 2.4 | **Data:** Aprile 2026  
**Destinatari:** Coordinatore progetto (HIT09), Ergon Research (communication/dissemination e gestione sito), Designer, Sviluppatore  
**Obiettivo:** Definire identità visiva, struttura di navigazione e contenuti di ogni pagina

---

## 1. IDENTITÀ VISIVA

### 1.1 Palette colori — Bianco e Nero

Il sito adotta una palette **bianco e nero** coerente con il logo ufficiale DAMAGER:

| Ruolo | Colore | Hex |
|-------|--------|-----|
| Sfondo principale | Bianco puro | `#FFFFFF` |
| Sfondo sezioni alternate | Grigio chiarissimo | `#F5F5F5` |
| Testo principale | Nero | `#000000` |
| Testo secondario | Grigio scuro | `#333333` |
| Accenti / bordi | Grigio medio | `#666666` |
| Hover / link attivi | Nero con sottolineatura | `#000000` |
| Sfondo header/footer | Nero | `#111111` |
| Testo su sfondo scuro | Bianco | `#FFFFFF` |

> La palette monocromatica trasmette serietà istituzionale e tecnologica, coerente con un progetto di difesa EU.

### 1.2 Layout generale

- **Full-width** su tutte le pagine
- **Header fisso (sticky)** in alto: logo a sinistra, navigazione a destra
- **Font:** Sans-serif moderno — Inter, Roboto o Montserrat (Google Fonts, gratuiti)
- **Navigazione:** menu orizzontale con 4 voci principali, nessuno scroll infinito

### 1.3 Asset grafici disponibili

| File | Utilizzo |
|------|----------|
| `resources/DAMAGER_logo.pdf` | Logo nell'header (da convertire in SVG/PNG) |
| `resources/background_template.pdf` | Riferimento per sfondi decorativi (compressore/turbina) |
| `resources/turbojet.png` | Sezione motore Project (CAD); variante `turbojet_half.png` in `static/images/` per la hero Home |
| `resources/FACTSHEET_EDF_2024_...pdf` | Testi del progetto + documento scaricabile |

### 1.4 Immagini di sfondo — Blueprint tecnico

Dalle geometrie del `background_template.pdf` si creano immagini decorative (SVG o PNG ad alta risoluzione):
- **Sezione trasversale di un compressore** (pale stilizzate, cerchi concentrici)
- **Ruota di turbina** (profili alari, geometria radiale)

Utilizzo: sfondo semitrasparente nelle sezioni principali del sito.  
Stile consigliato: **wireframe monocromatico** — linee grigio chiaro su sfondo bianco, opacità CSS al 5-10%.

### 1.5 Logo EU/EDF — Disclaimer obbligatorio

Il testo del disclaimer EU è **obbligatorio**; in implementazione attuale compare nel **footer** di ogni pagina (con logo EU). Una sezione dedicata in Home non è più prevista — vedi nota in §3.B.

```
Logo: "Funded by the European Union"
Fonte: https://commission.europa.eu/resources-and-tools/resources/logos-and-visual-identity_en

Testo obbligatorio (parola per parola):
"This project has received funding from the European Defence Fund (EDF) under Grant Agreement No. 101224541.
Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those
of the European Union (EU) or European Defence Agency (EDA). Neither the European Union nor the granting
authority can be held responsible for them."
```

Layout: logo EU a sinistra, testo a destra (su desktop); impilati verticalmente su mobile.

### 1.6 Sistema tipografico (F8.G)

Il lavoro di allineamento tipografico è **implementato in codice** e riassunto qui per committente e designer; la **tabella ruolo → classe** (con riferimento file) resta nella sezione **F8.G** di [`FASE_8_Riordino_Contenuti.md`](FASE_8_Riordino_Contenuti.md), aggiornata allo stesso stato.

#### 1.6.1 File SCSS

| File | Ruolo |
|------|--------|
| `assets/scss/_variables.scss` | Palette, scala font base (`$font-size-xs` … `$font-size-4xl`), variabili aggiuntive per micro-dimensioni e spacing: `$font-size-2xs`, `$font-size-micro`, `$font-size-logo`, `$font-size-lead-max`, `$font-size-icon-xl`, `$line-height-snug`, `$font-size-root`, `$space-7`, … |
| `assets/scss/_typography.scss` | Token e mixin condivisi: titolo sezione (`type-section-title`), eyebrow sezione/UI, lead (blocco + accent), corpo articolo, caption, display hero (italic + `$type-display-strong-track-start` su `<strong>` nelle lettere acronimo), gap paragrafi / indent liste prose |
| `assets/scss/main.scss` | Ordine import: `_variables` → **`_typography`** → `_base` → … |

#### 1.6.2 Titoli e display

- **Titoli di sezione marketing** (`.section-title`, anche `<h1>` in testate pagina e `<h2>` in Home) e **titolo principale pagine Markdown** (`.page h1`): stessa scala tramite **`@mixin type-section-title`**; differiscono margini e contesto (vedi F8.G).
- **Hero Home:** logo SVG; sottotitolo (`.hero__subtitle`) e riga acronimo in What is (`.home-what-is__acronym`) condividono **`@mixin type-display-italic-emphasis`**, `$type-hero-subtitle-font-size`, `$type-hero-acronym-font-size` e **`$type-display-strong-track-start`** (`padding-inline-start` su ogni `<strong>` che marca le lettere dell’acronimo).

#### 1.6.3 Eyebrow (due livelli)

- **Sezione / brand:** `.section-eyebrow` e tracking del wordmark **`.logo`** → **`$type-eyebrow-section-tracking`** + **`@mixin type-eyebrow-section`** (solo sezione).
- **UI compatta:** navigazione (desktop + drawer), etichetta progress bar, mese in card evento, tab Media → **`@mixin type-eyebrow-ui`** e **`$type-eyebrow-ui-tracking`**.

#### 1.6.4 Corpo testo: quattro contesti

| Contesto | Classi / scope | Comportamento |
|----------|----------------|---------------|
| **Markdown / pagine legali** | `.page` (`p`, liste, tabelle) | Corpo **base** 16px, colore e interlinea da **`$type-body-copy-*`**; liste con `padding-left` più largo (`$space-6`). |
| **Intro sotto titolo di sezione** | `.section-intro` | Scala **lead blocco** (`$type-lead-block-*`), **`$type-intro-max-width`**. |
| **Fascia About Project** | `.project-about-lead` | Paragrafi base + interlinea rilassata **`$type-body-relaxed-line-height`**; prime righe intro con classe **`.lead-accent`** (stile in `_typography.scss`); liste con **`$type-prose-list-indent`**. |
| **Articolo news** | `.article-body` | Corpo **articolo** (`$type-article-*`), colonna **`$type-article-column-max-width`**, spazio tra paragrafi **`$type-prose-paragraph-gap`**. |

Il blocco «What is DAMAGER» (Home) usa **`.lead-accent`** per la prima riga introduttiva (come in About the Project) e gli stessi token **copy** per i paragrafi standard e per la lista tecnica, in coerenza con il sistema sopra.

#### 1.6.5 Liste e micro-dimensioni

- **Indent liste** allineate al corpo (card partner, liste interne, Project/Home dove applicabile): **`$type-prose-list-indent`** (= `$space-5`); liste Markdown in `.page`: `$space-6`.
- **Badge / etichette molto piccole:** tab conteggio (`$font-size-2xs`), tag card news (`$font-size-micro`), **line-height titoli compatti** in card e timeline: **`$line-height-snug`**.

---


## 2. STRUTTURA HEADER E NAVIGAZIONE

### 2.1 Header (fisso, sticky)

```
┌─────────────────────────────────────────────────────────────────────┐
│  [DAMAGER LOGO]          Home  |  Project  |  Partners  |  Media   │
│   (sfondo nero, testo bianco)                                       │
└─────────────────────────────────────────────────────────────────────┘
```

- **Logo** a sinistra: versione bianca del logo DAMAGER su sfondo nero
- **Menu** a destra: 4 voci — `Home | Project | Partners | Media`
- Su mobile: menu hamburger
- L'header rimane **sticky** durante lo scroll

### 2.2 Mappa del sito

| Voce menu | URL | Descrizione |
|-----------|-----|-------------|
| Home | `/` | Landing page principale |
| Project | `/project` | Descrizione tecnica del progetto |
| Partners | `/partners` | Consorzio e partner |
| Media | `/media` | News, documenti, eventi, publications |

---

## 3. HOME PAGE (`/`)

Sezioni dall'alto verso il basso (**ordine implementato**). Il dettaglio markup dei blocchi aggiunti dopo la FASE 3 è in [`FASE_8_Riordino_Contenuti.md`](FASE_8_Riordino_Contenuti.md).

---

### A) Hero Section

- **Immagine di sfondo full-width:** `turbojet_half.png` (`/images/turbojet_half.png`) — metà superiore pre-ritagliata, ancorata al fondo della hero
- **Overlay:** gradiente scuro per leggibilità del testo in alto
- **Titolo:** logo **DAMAGER** come SVG bianco inline (`<h1 class="hero__logo">`, `damager-logo-white.svg`)
- **Sottotitolo:** acronimo espanso; lettere **DAMAGER** evidenziate in grassetto bianco pieno
- Nessun bottone call-to-action (il menu è sufficiente)

---

### B) EU Funding Disclaimer

> ⚠️ **Rispetto alle specifiche originali:** il blocco EU disclaimer non è una sezione della Home; il testo obbligatorio e il logo EU sono nel **footer** su ogni pagina.

---

### C) Tre pilastri — Scalability, Efficiency, Survivability

Sezione introduttiva a tre colonne (contenuti da mockup progetto). Sfondo alternato grigio chiaro (`section--alt`). Vedi **F8.A** in `FASE_8_Riordino_Contenuti.md`.

---

### D) What is DAMAGER

Blocco testuale (finanziamento EDF, bisogni, aree tecnologiche), immagine UAV wide, didascalia GKN, riga acronimo DAMAGER, griglia di 8 concetti. Sfondo bianco. Nessun eyebrow sopra il titolo. Vedi **F8.B** in `FASE_8_Riordino_Contenuti.md`.

---

### E) Our Partners (anteprima consorzio)

Cinque card partner (testi brevi `description_home` in data/partners.yaml), link sito e LinkedIn, griglia responsiva. Sfondo alternato sulla Home. Partial layouts/partials/partners-card-grid.html; vedi **F8.C** in `FASE_8_Riordino_Contenuti.md`. La pagina `/partners` usa copy e layout distinti (**F8.E**).

---

### F) Project Progress Bar

Eyebrow **Project Timeline**. Barra di avanzamento dinamica calcolata automaticamente in base alla data corrente:

```
Project Progress
01/12/2025 ████░░░░░░░░░░░░░░░░░░ 30/11/2029
           12% — 6 of 48 months completed
```

- **Durata totale:** 48 mesi (01/12/2025 – 30/11/2029)
- **Mostra:** percentuale completata, data inizio/fine, mesi trascorsi su totale
- **Stile:** barra orizzontale bianco/nero con bordo elegante
- La percentuale si aggiorna automaticamente ogni volta che qualcuno carica la pagina

---

### G) Upcoming Events

- Eyebrow: **Upcoming Events** — titolo di sezione: **Mark your calendar**
- Card stilizzata per ogni evento futuro:
  - Bordo nero, sfondo bianco, data in evidenza
  - Titolo, data (mese/anno; giorno opzionale se noto), descrizione breve
- Primo evento preconfigurato:
  - **DAMAGER M12 Meeting** — dicembre 2026 (luogo da confermare)
- Link "View all events" → `/media/#events`

---

### H) Contact us

- Eyebrow: **Get in touch** — titolo: **Contact us**

Form di contatto con i campi:

| Campo | Tipo | Obbligatorio |
|-------|------|-------------|
| Name | Testo | ✅ |
| Email | Email | ✅ |
| Subject | Testo | ✅ |
| Message | Textarea | ✅ |
| Send Message | Button | — |

- I messaggi vengono notificati a: **`info@hit09.com`** (casella coordinatore **HIT09 SRL**; indirizzo **definitivo** anche con gestione Netlify/sito affidata a Ergon Research). Netlify Forms — notifica in dashboard Netlify → Form notifications.
- **Referente:** Rita Ponza — Project Coordinator
- **LinkedIn coordinatore:** https://www.linkedin.com/company/hit09-srl
- Implementazione: Netlify Forms (nessun server necessario)
- Anti-spam (stack Netlify, senza backend proprio):
  - **Akismet** — filtro automatico su ogni submission; lo spam finisce nell’elenco *Spam submissions* nel pannello Netlify, le altre in *Verified submissions* ([documentazione](https://docs.netlify.com/manage/forms/spam-filters/)).
  - **Honeypot** — campo nascosto `bot-field` con `data-netlify-honeypot`; se compilato, Netlify rifiuta la richiesta senza registrarla.
  - **Notifiche email** (es. verso `info@hit09.com`) legate alle **submission verificate**, non allo stream spam filtrato da Akismet ([notifiche](https://docs.netlify.com/manage/forms/notifications/)).
  - **Opzionale:** reCAPTCHA 2 fornito o custom da Netlify, se in futuro servisse un ulteriore ostacolo ai bot ([stessa pagina spam filters](https://docs.netlify.com/manage/forms/spam-filters/)).
- Messaggio di conferma: *"Thank you! Your message has been sent to the project coordinator."*

---

### I) Comparsa graduale sezioni (Reveal on load/scroll)

Dettaglio implementativo e note accessibilità: sezione **F8.F** in [`FASE_8_Riordino_Contenuti.md`](FASE_8_Riordino_Contenuti.md).

- Tutte le sezioni `main section` usano una comparsa graduale (`opacity + translateY`) con timing progressivo.
- Trigger via `IntersectionObserver` in `assets/js/main.js` (`initSectionReveal()`), con attivazione una sola volta per sezione.
- Anche le sezioni già parzialmente visibili all'apertura pagina vengono animate con lo stesso timing (attivazione post-paint), evitando discrepanze tra on-load e on-scroll.
- **Hero:** sfondo nero visibile subito; la transizione è applicata ai contenuti interni della hero per evitare flash iniziale su fondo chiaro.
- Accessibilità: con `prefers-reduced-motion: reduce` il reveal viene disattivato (contenuti visibili senza animazione).

---

## 4. PROJECT PAGE (`/project`)

---

### A) About the Project

La sezione è strutturata in tre blocchi verticali su sfondo blueprint. **Contenuti e layout della prima sezione** riflettono le **modifiche richieste e discusse** con il coordinamento (mockup contenutistico concordato; dettaglio operativo in [`FASE_8_Riordino_Contenuti.md`](FASE_8_Riordino_Contenuti.md) — **F8.D**).

**1 — Header** (pattern standard del sito): eyebrow *EDF 2024 — Research Action*, titolo *About the Project*, blocco **`.project-about-lead`** (implementazione in layouts/project/list.html): più paragrafi con enfasi in **`<strong>`** (contesto UAV / propulsione / sfide), due elenchi **`.project-about-lead__list`** (quattro criticità, quattro tecnologie abilitanti DAMAGER), paragrafo di chiusura senza grassetto su analisi numeriche/sperimentali e *future propulsion-system development*. Sostituisce la precedente tagline unica *Study of additive manufacturing for low-cost…*. **Layout:** il blocco intro usa la **stessa larghezza orizzontale** del contenitore (`.container`) condiviso con la griglia delle tre card media del motore e con le sei `about-cards` sotto (nessuna colonna di testo più stretta rispetto a quella fascia).

**2 — Blocco motore turbojet:**
- Fotografia CAD della sezione trasversale reale del motore (`static/images/engine/turbojet.png`), con tre anchor point invisibili (`div.engine-anchor`, `position: absolute`) con coordinate **inline** nel template: compressore **`left: 17%; top: 70%`** (`#dot-compressor`), combustore **53% / 86%**, turbina **76% / 78%** (allineamento drop-line al mockup; eventuali ritocchi futuri solo su questi `style` nel markup).
- Tre linee tratteggiate SVG (`stroke-width: 2`) generate da JavaScript dagli anchor al bordo superiore di ciascuna card media sottostante; ricalcolo su `ResizeObserver`.
- Tre card media in griglia 3 colonne (1 colonna su mobile): `compressor.webm` (video loop, `object-fit: cover`), `combustor.png` (immagine, `object-fit: contain`), `turbine.webm` (video loop, `object-fit: cover`). Stile hover «rilievo» come le altre card del sito: **`@include card-base`** in `_project.scss` su **`.gif-card`**.

**3 — Sei card descrittive** (griglia responsive sotto il blocco motore: 1 colonna mobile, 2 da `md`, 3 da `lg`):

- Sei celle senza indice numerico; testo **verbatim** del mockup in **`<h3 class="about-card__title about-card__title--standalone">`** (`font-weight: 700`, una frase per card, senza `about-card__body` separato).
- Le quattro card storiche (*Mission background*, *Critical gaps*, *Technologies*, *Programme goals*) sono **sostituite** da questa serie.

---

### B) Project Details

| Campo | Valore |
|-------|--------|
| Full title | stuDy of Additive ManufActuring for low-cost, low-observable, hiGhly-deployable, expendablE/attritable tuRbojet engines |
| Acronym | DAMAGER |
| Programme | European Defence Fund (EDF) 2024 |
| Call type | Research actions focused on SMEs and research organisations |
| Duration | 48 months (01/12/2025 – 30/11/2029) |
| Total cost | €3,994,444.98 |
| EU Contribution | €3,994,444.98 (100%) |
| Activities | Generating knowledge, Integrating knowledge, Studies, Design |
| Coordinator | HIT09 SRL (Italy) |

---

### C) Timeline con Aeroplano Stilizzato

Visualizzazione grafica ad alto impatto:

```
[▶ Start]──────[M06]──────[M12]──────[M24]──────[M36]──────[M48 End]
01/12/2025    06/2026    12/2026    12/2027    12/2028    30/11/2029
  Kickoff    First     Mid-term    Second    Pre-final   Project
  Meeting   Review    Review      Review     Review       End
```

- **Aeroplano SVG animato** (CSS animation) che indica la posizione attuale sulla linea
- Milestone completate: cerchio pieno nero
- Milestone future: cerchio vuoto con bordo nero
- Su mobile: layout verticale

---

### D) Research Areas / Technology Focus

> ⚠️ **Sezione rimossa:** la sezione "Research Areas" con le 4 card tecnologiche è stata eliminata dalla Project page in fase iniziale. L’inquadramento testuale sotto il blocco motore è evoluto secondo **F8.D**: **sei** card descrittive dal mockup concordato (non più le quattro card *Mission background* / *Critical gaps* / *Technologies* / *Programme goals*).

---

## 5. PARTNERS PAGE (`/partners`)

---

### A) Consortium Overview

- Titolo: **"The DAMAGER Consortium"**
- Intro: 5 partner da 4 Paesi europei (Italia, Austria, Spagna, Romania)

---

### B) Partner — Home vs pagina Partners

**Fonte dati:** data/partners.yaml — un record per partner: logo, nome, paese, bandiera SVG (`static/images/flags/`), link sito, link **LinkedIn** (company), **`description_home`** (anteprima Home) e **`description_partners`** (testo esteso pagina Partners, Markdown con paragrafi e liste). Le emoji di bandiera non si usano in pagina (solo SVG). Partial: **F8.E** in [`FASE_8_Riordino_Contenuti.md`](FASE_8_Riordino_Contenuti.md).

#### B1) Home — «Our Partners» (anteprima)

- Partial: layouts/partials/partners-card-grid.html — griglia **responsiva** (1 → 2 → 3 colonne, `.card-grid` in assets/scss/_components.scss), `range` su **`site.Data.partners`**, variante `home` nel partial layouts/partials/partners-card-inner.html.
- Contenuti: `role_home`, `description_home` nel YAML; descrizione resa con **`markdownify`** (tipicamente un solo paragrafo).
- Footer card: *Visit website →* e **LinkedIn** (`justify-content: space-between`); URL nel YAML (tabella **F8** in `FASE_8_Riordino_Contenuti.md`).

#### B2) Pagina `/partners` — «Our Partners» (mockup dedicato)

- **Partial:** layouts/partials/partners-page-rows.html — **non** la griglia Home.
- **Layout:** **`.partners-page-rows__grid`** — una colonna, una card per riga (assets/scss/_partners.scss).
- **Contenuti:** `role_partners`, **`description_partners`** (Markdown: paragrafi + elenco «In DAMAGER … contributes to»); allineamento al mockup Partners concordato.
- **Elenchi:** marcatori a **emoji razzo** (`🚀`) in CSS solo sotto **`.partners-page-rows .card-partner__desc ul`** (come mockup).
- **LinkedIn:** stessi URL della Home (campo `linkedin` nel YAML).

#### Elenco partner e asset logo (invariati)

| # | Partner | Logo in `static/images/partners/` |
|---|---------|--------------------------------------|
| 1 | HIT09 SRL *(coordinator)* | `hit09.png` |
| 2 | LITHOZ GMBH | `lithoz.jpg` |
| 3 | AENIUM ENGINEERING SL | `aenium.png` |
| 4 | ERGON RESEARCH SRL | `ergon.jpg` |
| 5 | COMOTI | `comoti.png` |

Siti ufficiali e note redazionali (indirizzi mappa, ecc.) restano come in precedenza; i testi lunghi della sezione partner vivono nel **YAML** (nessun HTML duplicato per le cinque card).

**Implementazione:** **F8.E-code** completata — vedi checklist in [`PROGETTO_DAMAGER_WEBSITE.md`](PROGETTO_DAMAGER_WEBSITE.md) e **F8.E** in [`FASE_8_Riordino_Contenuti.md`](FASE_8_Riordino_Contenuti.md).

---

### C) Mappa del Consorzio (Leaflet + OpenStreetMap)

- Mappa interattiva **Leaflet.js** con tile **OpenStreetMap** (nessuna API key), marker per sede (coordinate a livello città)
- Se l'utente non ha accettato i cookie **funzionali** → overlay con invito ad abilitare la mappa (coerente con cookie policy / FASE 7)

---

## 6. MEDIA PAGE (`/media`)

La sezione Media è gestita interamente tramite il pannello CMS — nessuna conoscenza tecnica necessaria.

Organizzata in sottosezioni accessibili tramite tab:

```
/media
├── News & Events     → news, comunicati, eventi del progetto
├── Documents         → Fact Sheet, Deliverable, Press Release
└── Publications      → pubblicazioni scientifiche
```

---

### A) News & Events

**Chi gestisce:** editor non tecnico tramite pannello CMS  
**Come appare:** lista di card con immagine (opzionale), titolo, data, tipo (News / Event), estratto

Ogni elemento del CMS ha i campi:
- Titolo, Data, Tipo (News / Event), Testo (WYSIWYG), Immagine (opzionale), Link esterno, Tags

**Contenuto iniziale disponibile:**
- 🗞️ **DAMAGER Kickoff Meeting** ✅
  - Foto: `resources/foto_kickoff.jpg`
  - Link LinkedIn: https://www.linkedin.com/posts/damager-edf-project_edf-europeandefencefund-damager-activity-7429165736457162752-bi3g


---

### B) Documents

Ispirazione stilistica: sezione Documents del progetto GARUDA (https://garuda-project.eu/)

Organizzata in **3 categorie**:

**📋 Fact Sheet**
- `FACTSHEET_EDF_2024_LS_RA_SMERO_NT_101224541_DAMAGER.pdf` — già disponibile
- Data: Dicembre 2024

**📦 Public Deliverables**
- Inizialmente vuota: *"Public deliverables will be published here as they become available."*
- Ogni deliverable: numero (es. D1.1), titolo, data, PDF scaricabile

**📰 Press Releases**
- Inizialmente vuota con placeholder

---

### C) Publications

Ogni publication mostra:

```
┌────────────────────────────────────────────────────────────┐
│ [PDF]  Additive Manufacturing of Turbojet Components...    │
│        Authors: Rossi, Bianchi, García et al.              │
│        ASME TurboExpo 2026 — GT2026-XXXXX                  │
│        [Abstract ▼]  [Download PDF]  [DOI Link]            │
└────────────────────────────────────────────────────────────┘
```

Campi CMS: titolo, autori, journal/conference, anno, abstract, PDF (upload), DOI link, tags.  
Inizialmente vuota: *"Publications will appear here as they are accepted and cleared for public release."*

---

## 7. GESTIONE DEI COOKIE — CONFORMITÀ GDPR E LEGGE ITALIANA

### 7.1 Riferimenti normativi

- **Regolamento UE 2016/679** (GDPR)
- **D.Lgs. 196/2003** (Codice Privacy italiano, aggiornato con D.Lgs. 101/2018)
- **Provvedimento Garante Privacy** dell'8 gennaio 2015 sui cookie
- **Linee guida EDPB 05/2020** sui consensi

### 7.2 Tipologie di cookie sul sito

| Categoria | Cookie | Consenso richiesto |
|-----------|--------|-------------------|
| Tecnici / Strettamente necessari | Cookie di sessione Netlify, preferenze consenso | ❌ NO |
| Analitici (anonimizzati) | Google Analytics 4 (IP anonimizzato) | ✅ SÌ |
| Funzionali | Leaflet.js + OpenStreetMap tiles | ✅ SÌ |
| Marketing/Profilazione | Nessuno previsto | — |

### 7.3 Comportamento del banner cookie

**Strumento:** Vanilla Cookie Consent (open source, gratuito — https://cookieconsent.orestbida.com/)

1. Al primo accesso → banner in basso con: **"Accept All"** / **"Reject Non-Essential"** / **"Preferences"**
2. Google Analytics si carica **solo dopo** consenso analitici
3. La mappa Leaflet.js si carica **solo dopo** consenso funzionali (altrimenti: placeholder con lista partner + link "Enable Map")
4. Il form di contatto (Netlify Forms) è tecnico → **nessun consenso richiesto**
5. Preferenze salvate per **12 mesi**
6. Link nel footer: **"Cookie Preferences"** per modificare le scelte in qualsiasi momento

### 7.4 Pagine legali ✅

| Pagina | URL | Contenuto |
|--------|-----|-----------|
| Privacy Policy | `/privacy-policy/` | Informativa GDPR completa (`content/privacy-policy.md`) |
| Cookie Policy | `/cookie-policy/` | Elenco cookie: nome, finalità, durata, titolare (`content/cookie-policy.md`) |

---

*Documento Specifiche Sito — Progetto DAMAGER Website | Versione 2.4 | Aprile 2026*  
**File correlato:** [`ARCHITETTURA_TECNICA.md`](ARCHITETTURA_TECNICA.md) — stack, CMS, hosting, sicurezza; [`FASE_8_Riordino_Contenuti.md`](FASE_8_Riordino_Contenuti.md) — F8.G (mappatura ruoli → classi)
