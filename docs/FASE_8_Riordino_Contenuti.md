# FASE 8 — Riordino contenuti (Home, Project, Partners)

> **Versione:** 2.0 | **Data:** Aprile 2026  
> **Stato:** **Home (F8.A–C)**, **Project About (F8.D)**, **Partners — Our Partners (F8.E)** e **Reveal sezioni (F8.F)** completate in codice. Restano eventuali evoluzioni redazionali sui testi in `data/partners.yaml`.  
> **Branch:** develop

---

## Obiettivo

Riallineare il sito ai **mockup contenutistici** concordati in fase di progetto: per la **Home** (pilastri SES, What is DAMAGER, anteprima partner con LinkedIn); per la pagina **Project** / sezione «About the Project» (intro esteso, sei card sotto il blocco motore); per la pagina **Partners** / sezione «Our Partners» (layout e testi distinti dalla Home, contenuti dal mockup Partners concordato, vedi **F8.E**). I dettagli testuali e l’ordine dei blocchi seguono le **modifiche richieste e discusse** con il coordinamento (nessun riferimento a file o percorsi esterni in questo documento).

---

## Riferimenti

| Risorsa | Note |
|---------|------|
| Mockup contenuti Home | Testi e struttura concordati (pilastri, What is DAMAGER, partner) |
| Mockup contenuti Project — About | Testi e struttura concordati (intro About, sei card sotto il motore) |
| Project attuale | [`layouts/project/list.html`](../layouts/project/list.html) |
| Stili Project | [`assets/scss/_project.scss`](../assets/scss/_project.scss) |
| Drop-line motore | [`assets/js/main.js`](../assets/js/main.js) — `initEngineDroplines` |
| Home attuale | [`layouts/index.html`](../layouts/index.html) |
| Partners attuale | [`layouts/partners/list.html`](../layouts/partners/list.html) |
| Stili Home | [`assets/scss/_home.scss`](../assets/scss/_home.scss) |
| Stili Partners | [`assets/scss/_partners.scss`](../assets/scss/_partners.scss) |
| Stili card condivise (mixin rilievo) | [`assets/scss/_components.scss`](../assets/scss/_components.scss) — `card-base` |
| Reveal sezioni (logica JS) | [`assets/js/main.js`](../assets/js/main.js) — `initSectionReveal()` |
| Reveal sezioni (stili globali) | [`assets/scss/_base.scss`](../assets/scss/_base.scss) |
| Hook early class reveal | [`layouts/_default/baseof.html`](../layouts/_default/baseof.html) — classe `has-reveal` in `<head>` |
| Partial pilastri | [`layouts/partials/home-pillars.html`](../layouts/partials/home-pillars.html) |
| Partial What is DAMAGER | [`layouts/partials/home-what-is-damager.html`](../layouts/partials/home-what-is-damager.html) |
| Dati partner | [`data/partners.yaml`](../data/partners.yaml) — unica fonte: URL, logo, `description_home` / `description_partners`, ecc. (vedi **F8.E**) |
| Partial Home partner | [`layouts/partials/partners-card-grid.html`](../layouts/partials/partners-card-grid.html) — griglia `.card-grid` multi-colonna; `range` + `partners-card-inner` con `variant: home`; chiamata con `sectionAlt` true |
| Partial Partners «Our Partners» | [`layouts/partials/partners-page-rows.html`](../layouts/partials/partners-page-rows.html) — sezione dedicata pagina `/partners`; griglia **`.partners-page-rows__grid`** (1 colonna); `variant: partners` |
| Partial card singola | [`layouts/partials/partners-card-inner.html`](../layouts/partials/partners-card-inner.html) — corpo `.card-partner`; descrizione via **`markdownify`** (liste Markdown per i contributi DAMAGER sulla variante Partners) |
| Immagine UAV Home | `static/images/home/uav-sweden-concept.webp` |
| Documento master indice fasi | [`PROGETTO_DAMAGER_WEBSITE.md`](PROGETTO_DAMAGER_WEBSITE.md) |

### Sintesi implementativa (Home)

- **Sfondi alternati** dopo l’hero: pilastri `section--alt` (grigio) → What is DAMAGER bianco → Our Partners `section--alt` sulla sola Home → timeline bianca → eventi `section--alt` → contact blueprint. La pagina **Partners** (`/partners`): sezione «Our Partners» con **layout dedicato** (una riga per partner), non la stessa sezione della Home — vedi **F8.E**.
- **Rilievo schede:** celle pilastri (`.home-pillars__cell`) e celle concetti (`.home-what-is__concept-cell`) usano `@include card-base` come le `.card-partner`.
- **What is DAMAGER:** nessun eyebrow (solo `<h2>`); **testo sopra l’immagine:** blocco intro a **larghezza piena** del contenitore (allineato all’immagine); prima frase in **`.home-what-is__intro-lead`** tutta in grassetto (`font-weight: 700`), dimensione intro `$font-size-lg`.
- **Partner card:** riga `.card-partner__footer` con *Visit website* a sinistra e *LinkedIn* a destra (`justify-content: space-between`).

### Sintesi specifica (Project — mockup About concordato)

- **Intro «About the Project»:** blocco **`.project-about-lead`** in [`layouts/project/list.html`](../layouts/project/list.html) — paragrafi con **`<strong>`** sulle frasi guida, due liste **`.project-about-lead__list`** (criticità e tecnologie abilitanti), paragrafo finale di chiusura; sostituisce la tagline unica storica (*Study of additive manufacturing…*).
- **Collegamenti motore → card (SVG):** linee tratteggiate generate da JavaScript dagli anchor alle card media. Coordinate **attuali** nel markup: `#dot-compressor` **`left: 17%; top: 70%`**, `#dot-combustor` **53% / 86%**, `#dot-turbine` **76% / 78%** (ritocchi futuri solo sugli `style` inline degli anchor).
- **Card sotto il motore:** **sei** `.about-card` con una sola **`<h3 class="about-card__title about-card__title--standalone">`** per cella (testo verbatim del mockup); griglia in `_project.scss` (1 colonna mobile, 2 da `md`, 3 da `lg`).

---

## F8.A — Home: tre pilastri (Scalability, Efficiency, Survivability)

**Posizione:** subito dopo la sezione Hero, prima di «What is DAMAGER».

**Contenuto (dal mockup Home concordato):**

- Titolo di sezione: **Scalability. Efficiency. Survivability.**
- Tre celle su una riga (responsive: colonna unica su mobile), ciascuna con:
  - titolo (Scalability / Efficiency / Survivability);
  - tagline in grassetto (testi concordati);
  - paragrafo descrittivo completo (testi concordati).

**Nota redazionale:** non pubblicare stringhe di appoggio presenti nei materiali di lavorazione (es. «Preso qui», «Add link to LinkedIn pages»).

---

## F8.B — Home: «What is DAMAGER»

**Eyebrow:** nessuno — il titolo `<h2>What is DAMAGER</h2>` è sufficiente; si evita il duplicato semantico con la sezione Project «About the Project».

**Ordine dei blocchi:**

1. Testo introduttivo dal mockup concordato (finanziamento EC / European Defence Fund, bisogni, paragrafi su swarm/larger UAV, ecc.). La **prima frase** è resa in grassetto intero (`.home-what-is__intro-lead`); il blocco intro ha la **stessa larghezza** dell’immagine sotto (full width del `.container`). Includere il blocco **«To answer these challenges…»** con le **quattro aree tecnologiche** (coppie titolo + continuazione «to improve…» / «to reduce…» / ecc.) e la chiusura su modellazione numerica e test sperimentali, come sul mockup.
2. **Immagine** (formato wide ~2:1).  
   - **Sorgente file:** `https://nextgendefense.com/wp-content/uploads/2025/12/uav-sweden-concept.webp`  
   - In repository: copiare l’asset sotto `static/images/home/` (nome stabile, es. `uav-sweden-concept.webp`) per indipendenza dal CDN esterno.  
   - **Non** mostrare alcun link di riferimento accanto all’immagine in pagina.
3. **Didascalia** sotto l’immagine (testo letterale concordato):  
   `Concept photo of GKN Aerospace’s UAV. Photo: GKN Aerospace`
4. **Nome esteso / acronimo DAMAGER:** stesso schema della hero (`hero__subtitle` con lettere evidenziate in `<strong>`), come in [`layouts/index.html`](../layouts/index.html) (classe `.home-what-is__acronym`).
5. **Griglia 8 concetti** (2 righe × 4 colonne da breakpoint `md`/`lg`; impilamento su mobile), testi esatti concordati:
   - Low-cost, high-performance turbojet propulsion for future UAV platforms  
   - Scalable solutions for mass deployment and rapid manufacturing  
   - Improved fuel efficiency and reduced specific fuel consumption  
   - Advanced additive manufacturing for shorter lead times and lower cost  
   - Reduced infrared signature for improved survivability  
   - Innovative combustion concepts for enhanced fuel flexibility  
   - Numerical and experimental validation of next-generation turbojet technologies  
   - Strategic support for future European autonomous air-power capabilities  

**Accessibilità:** un solo `<h1>` (logo in hero); queste sezioni usano `<h2>` / `<h3>` coerenti con il resto del sito.

---

## F8.C — Home: «Our Partners» + LinkedIn

**Markup di partenza (F5 / prima di F8):** sezione *Partner Cards* inline in [`layouts/partners/list.html`](../layouts/partners/list.html) (eyebrow «Consortium Members», titolo «Our Partners», `card-grid`, cinque `card-partner`). **Oggi:** la Home usa [`partners-card-grid.html`](../layouts/partials/partners-card-grid.html); `/partners` usa [`partners-page-rows.html`](../layouts/partials/partners-page-rows.html); `list.html` include solo il partial, non duplica il markup delle cinque card.

**Implementazione attuale (Home):** griglia in [`layouts/partials/partners-card-grid.html`](../layouts/partials/partners-card-grid.html), inclusa dalla Home con `sectionAlt` true.

**Pagina `/partners` (F8.E):** la sezione «Our Partners» usa il partial dedicato **`partners-page-rows.html`** (non `partners-card-grid.html`). Home e Partners condividono **`data/partners.yaml`** e **`partners-card-inner.html`**. Gli URL **LinkedIn** in tabella restano la fonte di verità (duplicati nel YAML).

**Aggiunta obbligatoria su ogni card:** link alla company page LinkedIn, `target="_blank"`, `rel="noopener noreferrer"` (stesso approccio del link LinkedIn nella contact card HIT09 sulla Home). Nella riga azioni (`.card-partner__footer`), **Visit website →** è allineato a sinistra e **LinkedIn** all’estrema destra (`flex` + `justify-content: space-between`).

| Partner | URL LinkedIn |
|---------|----------------|
| HIT09 SRL | https://www.linkedin.com/company/hit09-srl/ |
| LITHOZ GMBH | https://www.linkedin.com/company/lithoz/ |
| AENIUM ENGINEERING SL | https://www.linkedin.com/company/aenium-engineering/ |
| ERGON RESEARCH SRL | https://www.linkedin.com/company/ergon-research |
| COMOTI | https://www.linkedin.com/company/comoti-incdt/ |

---

## F8.D — Project page («About the project») — mockup About concordato

**Ambito:** modifiche richieste e discusse per la sezione About (testo introduttivo lungo + sei blocchi descrittivi sotto lo schema motore), da riflettere nel template senza citare percorsi o file sorgente esterni.

**Obiettivo:** aggiornare solo la prima sezione della pagina [`/project`](../layouts/project/list.html) (`About the Project` su `bg-blueprint`), lasciando invariate (salvo necessità redazionale futura) **Project Details**, **Timeline** e il resto del template.

### D1 — Introduttivo prima del blocco motore

- **Posizione:** tra il titolo `About the Project` e `<div class="engine-block">`.
- **Implementazione:** wrapper **`.project-about-lead`** in [`layouts/project/list.html`](../layouts/project/list.html) — paragrafi con **`<strong>`** sulle frasi guida, due **`<ul class="project-about-lead__list">`**, paragrafo finale senza grassetto; stili in `_project.scss` (larghezza piena del contenitore, allineata a griglia engine + `about-cards`; tipografia).
- **Sostituisce:** il vecchio `section-intro` a una riga (*Study of additive manufacturing for low-cost…*).

### D2 — Engine block e linee di collegamento

- Struttura: `engine-droplines` SVG + immagine `turbojet.png` + tre `.engine-anchor` con coordinate **inline** nel markup + tre `.gif-card` (compressor / combustor / turbine).
- **Anchor attuali** nel template: `#dot-compressor` **`left: 17%; top: 70%`**; `#dot-combustor` **`left: 53%; top: 86%`**; `#dot-turbine` **`left: 76%; top: 78%`**. Le drop-line sono disegnate da `initEngineDroplines()` in `main.js` a partire da questi punti.

### D3 — Griglia `about-cards` (sei contenuti)

- Rimuovere le quattro card tematiche storiche (Mission background, Critical gaps, Technologies, Programme goals).
- **Sei** `.about-card` con testo **verbatim** del mockup (ordine rispettato), senza prefisso numerico; una frase per cella in `<h3 class="about-card__title about-card__title--standalone">` con **`font-weight: 700`** (nessun `about-card__body` separato).
- **Layout (indicazione implementativa):** `.about-cards` con `grid-template-columns`: 1fr (base); da breakpoint `md` due colonne; da `lg` (o `xl`) tre colonne per ottenere due file da tre card sotto il blocco motore.

### File da toccare (implementazione)

| File | Modifica |
|------|----------|
| [`layouts/project/list.html`](../layouts/project/list.html) | `.project-about-lead`, anchor motore (incl. compressore 17%/70%), sei `about-card` |
| [`assets/scss/_project.scss`](../assets/scss/_project.scss) | Griglia `.about-cards`; `.gif-card` / `.about-card` con `@include card-base`; `about-card__title--standalone` |
| [`docs/SPECIFICHE_SITO.md`](SPECIFICHE_SITO.md) | § Project — About (allineato alla specifica F8.D) |

**Stato:** implementazione allineata al mockup in [`layouts/project/list.html`](../layouts/project/list.html) + [`assets/scss/_project.scss`](../assets/scss/_project.scss) — intro `.project-about-lead`, anchor come sopra, sei card standalone in grassetto, hover rilievo su `.gif-card` e `.about-card`.

---

## F8.E — Partners page: sezione «Our Partners» (distinta dalla Home)

> **Stato implementazione:** completata in repository — vedi file in tabella «Componente» sotto. I testi lunghi della pagina Partners si aggiornano in **`data/partners.yaml`** (`description_partners`, elenchi Markdown).

### Requisiti (mockup contenuti Partners concordato)

1. **Sezione diversa dalla Home** — La sezione «Our Partners» su `/partners` non deve essere il riuso dello stesso partial/layout della Home: markup e/o layout dedicati.
2. **Una riga per partner** — Ciascun partner occupa **un’intera riga** (griglia a colonna singola a tutti i breakpoint, nessuna griglia 2/3 colonne come sulla Home).
3. **Testi** — Ruolo e descrizione (e ogni altro testo previsto dal mockup) **verbatim** concordato; trascritti in un unico file dati (vedi sotto), campo dedicato alla variante **partners**.
4. **LinkedIn** — Stessi URL company già usati sulla Home (**F8.C**, tabella sotto); nessun nuovo arricchimento URL: si riallinea il markup Partners a questa tabella.

| Partner | URL LinkedIn |
|---------|----------------|
| HIT09 SRL | https://www.linkedin.com/company/hit09-srl/ |
| LITHOZ GMBH | https://www.linkedin.com/company/lithoz/ |
| AENIUM ENGINEERING SL | https://www.linkedin.com/company/aenium-engineering/ |
| ERGON RESEARCH SRL | https://www.linkedin.com/company/ergon-research |
| COMOTI | https://www.linkedin.com/company/comoti-incdt/ |

**Invariato:** intro consorzio in cima alla pagina, statistiche, mappa Leaflet (FASE 5 / FASE 7) salvo nuove indicazioni.

---

### Architettura (ordinata, DRY, mantenibile)

Obiettivo: **un solo posto** per sito, LinkedIn, logo, paese, flag; **due testi** dove serve (anteprima Home vs copy completo su Partners); **due shell** di pagina (griglia vs righe) che delegano a un **unico** partial per il corpo della card.

```mermaid
flowchart TB
  subgraph data [data/partners.yaml]
    P[5 partner records]
  end
  subgraph shells [Partials shell]
    G[partners-card-grid.html Home]
    R[partners-page-rows.html Partners]
  end
  subgraph inner [Partial condiviso]
    I[partners-card-inner.html]
  end
  P --> G
  P --> R
  G --> I
  R --> I
```

| Componente | Ruolo |
|------------|--------|
| **`data/partners.yaml`** | Lista ordinata di partner. Campi minimi suggeriti: `id`, `name`, `country_label`, `flag` (path SVG), `coordinator` (bool), `role_home`, `role_partners` *(se il mockup unifica ruolo+descrizione, un solo campo `role_partners` + `description_partners`)*, `description_home`, `description_partners`, `website`, `linkedin`, `logo`, `logo_alt`. I testi **Partners** devono riflettere il **mockup Partners** concordato; i testi **Home** possono restare più brevi finché il mockup Home non li aggiorna. |
| **`partners-card-inner.html`** | Dizionario `partner` + `variant` (`home` \| `partners`). Struttura `.card-partner`; descrizione con **`markdownify`** in **`<div class="card-partner__desc">`** (paragrafi e liste Markdown). Footer Visit website + LinkedIn. |
| **`partners-card-grid.html`** | Solo Home: `<section>`, **`.card-grid`**, `range site.Data.partners` → `partners-card-inner` con `variant: home`. Parametro `sectionAlt`. |
| **`partners-page-rows.html`** | Solo Partners: sezione **`.partners-page-rows`**, griglia **`.partners-page-rows__grid`** (1 colonna), `variant: partners`. |
| **`layouts/partners/list.html`** | Blocco B: `partners-page-rows.html` (non `partners-card-grid.html`). |
| **SCSS** | `_partners.scss`: **`.partners-page-rows__grid`**; bullet elenchi descrizione Partners — **`🚀`** via **`::before`** su **`ul li`** dentro **`.partners-page-rows .card-partner__desc`**. `_components.scss`: annidamento **`p` / `ul` / `li`** sotto **`.card-partner__desc`**. |

**Schema YAML** (il file [`data/partners.yaml`](../data/partners.yaml) è una **lista radice** di mappe — `site.Data.partners` in Hugo; ogni voce: `id`, `name`, `coordinator`, `country_label`, `country_flag_alt`, `flag`, `logo`, `logo_alt`, `role_home`, `description_home`, `role_partners`, `description_partners` con blocco letterale `|` per testi lunghi e liste Markdown, `website`, `linkedin`).

**Implementazione (completata):** dati centralizzati; partial inner + griglia Home + righe Partners; `list.html` aggiornato; `description_partners` allineato al mockup Partners; elenchi con marcatori razzo in CSS sulla sola pagina Partners.

---

## F8.F — Comparsa graduale sezioni (on-load + on-scroll)

**Obiettivo:** introdurre una transizione di comparsa graduale delle sezioni all'ingresso in viewport, mantenendo comportamento coerente sia all'apertura pagina sia durante lo scroll.

### Implementazione tecnica

- **Selettore target:** tutte le `section` dentro `main` (hero inclusa).
- **Stato iniziale/visibile:** definito in `assets/scss/_base.scss` con transizione `opacity + translateY` e delay progressivo tramite variabile CSS `--reveal-delay`.
- **Trigger viewport:** `IntersectionObserver` in `initSectionReveal()` (`assets/js/main.js`), con reveal una sola volta per sezione (`unobserve` dopo attivazione).
- **Prime sezioni visibili al load:** rilevate subito e attivate dopo il primo paint (doppio `requestAnimationFrame`) per applicare la stessa durata della comparsa anche in cima pagina.
- **No flash bianco iniziale:** classe `has-reveal` applicata già in `<head>` (`layouts/_default/baseof.html`) prima del caricamento CSS, così lo stato iniziale è coerente dal primo frame.

### Comportamento specifico hero

- La **sezione hero** resta con sfondo subito visibile (nero), senza transizione sulla superficie della sezione.
- La comparsa graduale è applicata ai **contenuti interni** della hero (`.hero > *`), per evitare l'effetto di apertura su sfondo bianco.

### Accessibilità / fallback

- Se `prefers-reduced-motion: reduce` è attivo, le animazioni vengono disabilitate e il contenuto resta immediatamente visibile.
- In assenza di `IntersectionObserver`, le sezioni vengono mostrate subito (fallback progressivo).

---

## Ordine sezioni Home (risultato atteso)

```
Hero
  → Tre pilastri (SES)
  → What is DAMAGER
  → Our Partners (partial + LinkedIn)
  → Project Timeline / progress bar
  → Upcoming Events
  → Contact
```

---

## Checklist implementazione

- [x] **F8.1** Sezione tre pilastri in Home (markup + testi concordati)  
- [x] **F8.2** Sezione What is DAMAGER: testi, immagine da `.webp` in `static/images/home/`, didascalia, acronimo, griglia 8  
- [x] **F8.3** Partial `partners-card-grid.html` + link LinkedIn; inclusione **solo Home** (griglia da `data/partners.yaml`)  
- [x] **F8.4** Stili in `_home.scss` (pilastri, figura+didascalia, griglia 8); ritocchi `card-partner` in `_components.scss`  
- [x] **F8.5** Verifica build Hugo, responsive, heading hierarchy  
- [x] **F8.6** Specifica **F8.D** (Project — mockup About): intro `.project-about-lead`, sei `about-card`, coordinate anchor (compressore 17%/70%) — documentata in questo file e in `SPECIFICHE_SITO.md`  
- [x] **F8.7** Implementazione codice pagina Project secondo **F8.D** (intro `.project-about-lead`, 6 card, griglia SCSS)  
- [x] **F8.E-spec** Specifica **F8.E**: Partners «Our Partners» distinta dalla Home, una riga per partner, testi mockup Partners, architettura dati + partial (documentato qui e in `SPECIFICHE_SITO.md`)  
- [x] **F8.E-code** Implementazione **F8.E**: `data/partners.yaml`, `partners-card-inner.html`, `partners-page-rows.html`, refactor `partners-card-grid.html`, `_partners.scss` (griglia a una colonna + bullet razzo), `partners-card-inner` + `markdownify` e annidamento in `_components.scss`  
- [x] **F8.F** Reveal graduale sezioni (on-load + on-scroll), hero inclusa con sfondo nero immediato e animazione sui contenuti interni, supporto `prefers-reduced-motion`

---

## Rinumera fasi successive (contesto)

Con l’introduzione di questa FASE 8, nel documento master **Deploy e Go-Live** diventa **FASE 9** e **Formazione editor** diventa **FASE 10**. I file markdown dedicati andranno nominati di conseguenza al momento della creazione (es. `FASE_9_Deploy.md`, `FASE_10_Formazione.md`).

---

*FASE 8 — Riordino contenuti | DAMAGER Website v2.2 | Aprile 2026*
