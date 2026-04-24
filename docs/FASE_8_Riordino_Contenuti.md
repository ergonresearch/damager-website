# FASE 8 — Riordino contenuti (Home, Project, Partners)

> **Versione:** 1.6 | **Data:** Aprile 2026  
> **Stato:** In corso — **Home (F8.A–C) completata** in codice; **F8.D** specificata (documentazione); implementazione codice Project e **F8.E** (Partners) ancora da completare.  
> **Branch:** develop

---

## Obiettivo

Riallineare il sito ai **mockup contenutistici** concordati in fase di progetto: per la **Home** (pilastri SES, What is DAMAGER, anteprima partner con LinkedIn); per la pagina **Project** / sezione «About the Project» (intro esteso, sei card sotto il blocco motore). I dettagli testuali e l’ordine dei blocchi seguono le **modifiche richieste e discusse** con il coordinamento (nessun riferimento a file o percorsi esterni in questo documento). Prevedere inoltre eventuali evoluzioni della pagina **Partners** (`/partners`) — **F8.E**.

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
| Partial pilastri | [`layouts/partials/home-pillars.html`](../layouts/partials/home-pillars.html) |
| Partial What is DAMAGER | [`layouts/partials/home-what-is-damager.html`](../layouts/partials/home-what-is-damager.html) |
| Partial griglia partner | [`layouts/partials/partners-card-grid.html`](../layouts/partials/partners-card-grid.html) — chiamata con `dict` (`sectionAlt` true sulla Home, false su Partners) |
| Immagine UAV Home | `static/images/home/uav-sweden-concept.webp` |
| Documento master indice fasi | [`PROGETTO_DAMAGER_WEBSITE.md`](PROGETTO_DAMAGER_WEBSITE.md) |

### Sintesi implementativa (Home)

- **Sfondi alternati** dopo l’hero: pilastri `section--alt` (grigio) → What is DAMAGER bianco → Our Partners `section--alt` sulla sola Home → timeline bianca → eventi `section--alt` → contact blueprint. La pagina Partners mantiene la griglia partner su fondo bianco (`sectionAlt` false nel partial).
- **Rilievo schede:** celle pilastri (`.home-pillars__cell`) e celle concetti (`.home-what-is__concept-cell`) usano `@include card-base` come le `.card-partner`.
- **What is DAMAGER:** nessun eyebrow (solo `<h2>`); **testo sopra l’immagine:** blocco intro a **larghezza piena** del contenitore (allineato all’immagine); prima frase in **`.home-what-is__intro-lead`** tutta in grassetto (`font-weight: 700`), dimensione intro `$font-size-lg`.
- **Partner card:** riga `.card-partner__footer` con *Visit website* a sinistra e *LinkedIn* a destra (`justify-content: space-between`).

### Sintesi specifica (Project — mockup About concordato)

- **Intro «About the Project»:** sostituire la tagline attuale (*Study of additive manufacturing…*) con il testo continuo **concordato**, dall’inizio *«The rapid evolution…»* fino a *«…future propulsion-system development.»* (stesso ordine e paragrafi del mockup; se più paragrafi, markup con più `<p>` o wrapper dedicato prima di `engine-block`).
- **Collegamenti motore → card (SVG):** linee tratteggiate generate da JavaScript dagli anchor alle card media. Se la prima linea (compressore) va meglio allineata al mockup, si possono correggere **a mano** le percentuali `left` / `top` inline di `#dot-compressor` in [`layouts/project/list.html`](../layouts/project/list.html).
- **Card sotto il motore:** sostituire le **quattro** `about-card` con **sei** contenuti (titolo + corpo) secondo il mockup concordato; griglia responsive da aggiornare in `_project.scss` (es. 1 colonna mobile, 2 colonne `md`, 3 colonne `lg` per 2×3).

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

## F8.C — Home: «Our Partners» + partial condiviso e LinkedIn

**Markup di partenza:** stessa struttura della sezione *Partner Cards* in [`layouts/partners/list.html`](../layouts/partners/list.html) (eyebrow «Consortium Members», titolo «Our Partners», `card-grid`, cinque `card-partner`).

**Implementazione consigliata:** estrarre la griglia in [`layouts/partials/partners-card-grid.html`](../layouts/partials/partners-card-grid.html) e includerla nella pagina Partners e nella Home.

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
- **Sostituzione:** rimuovere il paragrafo unico attuale (`section-intro` con *Study of additive manufacturing for low-cost…*) e inserire il testo concordato da *«The rapid evolution…»* a *«…future propulsion-system development.»*
- **Markup:** supportare **più paragrafi** se previsti dal testo approvato; riusare o estendere le classi tipografiche esistenti (coerenza con `.section-intro` / max-width leggibile sul blueprint).

### D2 — Engine block e linee di collegamento

- Struttura attuale: `engine-droplines` SVG + immagine `turbojet.png` + tre `.engine-anchor` + tre card media (compressor / combustor / turbine).
- **Allineamento (opzionale):** se il tratto dal compressore non coincide col mockup, correggere **a mano** le coordinate percentuali del primo anchor (`#dot-compressor`) nel markup HTML.

### D3 — Griglia `about-cards` (sei contenuti)

- Rimuovere le quattro card tematiche attuali (Mission background, Critical gaps, Technologies, Programme goals).
- Aggiungere **sei** `.about-card` con numerazione **01–06**, titoli e paragrafi **esattamente** come nel mockup concordato (ordine rispettato).
- **Layout (indicazione implementativa):** `.about-cards` con `grid-template-columns`: 1fr (base); da breakpoint `md` due colonne; da `lg` (o `xl`) tre colonne per ottenere due file da tre card sotto il blocco motore.

### File da toccare (implementazione)

| File | Modifica |
|------|----------|
| [`layouts/project/list.html`](../layouts/project/list.html) | Intro, sei card, eventuali `style` su `#dot-compressor` |
| [`assets/scss/_project.scss`](../assets/scss/_project.scss) | Griglia `.about-cards` per 6 elementi; commenti |
| [`docs/SPECIFICHE_SITO.md`](SPECIFICHE_SITO.md) | § Project — About (allineato alla specifica F8.D) |

**Stato:** specifica redazionale e layout **documentata**; implementazione HTML/SCSS = task di sviluppo successivo (checklist **F8.7** sotto).

---

## F8.E — Partners page (oltre alla griglia condivisa)

> **Stato: TBD** — La Home replicherà temporaneamente la sezione «Our Partners» con le card aggiornate (LinkedIn). In un secondo momento la **pagina** `/partners` potrà essere sostituita o ampliata con contenuti più approfonditi; le specifiche verranno aggiunte in questa sezione.

**Nota:** intro consorzio, statistiche e mappa Leaflet restano per ora come implementate in FASE 5 e FASE 7 salvo nuove indicazioni.

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
- [x] **F8.3** Partial `partners-card-grid.html` + link LinkedIn su tutte e 5 le card; inclusione in Partners e Home  
- [x] **F8.4** Stili in `_home.scss` (pilastri, figura+didascalia, griglia 8); ritocchi `card-partner` in `_components.scss`  
- [x] **F8.5** Verifica build Hugo, responsive, heading hierarchy  
- [x] **F8.6** Specifica **F8.D** (Project — mockup About): intro, sei `about-card`, nota opzionale su coordinate primo anchor — documentata in questo file e in `SPECIFICHE_SITO.md`  
- [ ] **F8.7** Implementazione codice pagina Project secondo **F8.D** (intro, 6 card, griglia SCSS)  
- [ ] **F8.TBD** Completare sezione F8.E (Partners page) quando disponibili i dettagli  

---

## Rinumera fasi successive (contesto)

Con l’introduzione di questa FASE 8, nel documento master **Deploy e Go-Live** diventa **FASE 9** e **Formazione editor** diventa **FASE 10**. I file markdown dedicati andranno nominati di conseguenza al momento della creazione (es. `FASE_9_Deploy.md`, `FASE_10_Formazione.md`).

---

*FASE 8 — Riordino contenuti | DAMAGER Website v1.6 | Aprile 2026*
