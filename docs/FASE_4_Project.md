# FASE 4 — Project Page

**Documento di sviluppo DAMAGER Website**  
**Versione:** 1.0 | **Data:** Marzo 2026  
**Prerequisiti:** FASE 1, 2 e 3 completate  
**Obiettivo:** Implementare la pagina Project (`/project`) con tutte le sezioni previste nelle specifiche

---

## Checklist

- [x] F4.1 — Intro & Context (testo factsheet EDF + layout bicolonna con visual blueprint)
- [x] F4.2 — Project Details (tabella dati chiave)
- [x] F4.3 — Timeline animata con milestone M00–M48
- [x] F4.4 — Research Areas (4 card tecnologiche con icone SVG)
- [x] F4.5 — SCSS: `_project.scss` (tabella, intro, blockquote, blueprint visual)
- [x] F4.6 — Build, verifica e deploy

---

## Struttura implementata

### Sezioni (top → bottom)

| Sezione | Classe CSS | Note |
|---------|-----------|------|
| A — Intro & Context | `.project-intro` + `.project-quote` | Testo factsheet EDF; visual blueprint placeholder (FASE 0B) |
| B — Project Details | `.project-table` | Tabella dati ufficiali del progetto |
| C — Timeline | `{{ partial "timeline.html" . }}` | Riutilizzo del partial già creato in FASE 2 |
| D — Research Areas | `.card-research` × 4 | Icone SVG inline, titolo, descrizione |

---

## F4.1 — Intro & Context

**File:** `layouts/project/list.html`

Layout bicolonna (testo sx, visual dx) su desktop. Il testo include:

- **Titolo:** `<h1>About the Project</h1>` — il titolo "DAMAGER" e il sottotitolo con acronimo espanso sono stati rimossi da questa sezione (già presenti nell'hero della Home e nella tabella F4.2).
- **Corpo:** estratto ufficiale dal factsheet EDF in forma di `<blockquote>`

Il pannello visivo destro è un **placeholder blueprint** (bordo + sfondo grigio chiaro + label "Blueprint Visual") che in FASE 0B verrà sostituito con un'immagine SVG estratta da `resources/background_template.pdf`.

---

## F4.2 — Project Details

**File:** `layouts/project/list.html`

Tabella con dati ufficiali del progetto:

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

## F4.3 — Timeline animata

**Partial:** `layouts/partials/timeline.html` (già implementato in FASE 2)  
**SCSS:** `assets/scss/_timeline.scss`  
**JS:** `assets/js/main.js` — funzione `initTimeline()`

Milestone (corrispondono esattamente alla struttura nel partial `timeline.html`):

| Mese | Data | Nome |
|------|------|------|
| M0  | Dec 2025 | Kickoff Meeting |
| M12 | Dec 2026 | M12 Meeting |
| M24 | Dec 2027 | M24 Review |
| M36 | Dec 2028 | M36 Review |
| M48 | Nov 2029 | M48 Meeting |

Il marcatore SVG viene posizionato dinamicamente da `initTimeline()` in base alla data corrente.

**Implementazione tecnica:**
- L'icona aeroplano è il drone SVG DAMAGER (`assets/images/damager_drone.svg`), incluso inline nel partial tramite `resources.Get`.
- Il drone è ruotato a 90° tramite CSS (`@keyframes plane-float` con `rotate(90deg)`).
- L'animazione di galleggiamento usa `translateX` nel frame ruotato per ottenere un movimento verticale sullo schermo.
- Ciascuna milestone è posizionata assolutamente con `left: X%` (calcolato da Hugo: `month/48 × 100`) e centrata tramite `transform: translateX(-50%)` in CSS — il centro del dot corrisponde esattamente al punto temporale sulla barra.
- Linea e container milestone usano un inset orizzontale di `80px` per lato (`$timeline-inset` in `_timeline.scss`), così le etichette di M0 e M48 non escono dall'area scrollabile su schermi stretti.
- Il drone è posizionato in pixel dal JS: `left = 80px + pct × (timeline_width − 160px)`, coerente con l'inset del container milestone.
- I label usano `white-space: nowrap` per evitare il wrapping del testo.
- Le milestone passate ricevono la classe `is-past` (dot nero pieno); quella corrente riceve `is-current`.

---

## F4.4 — Research Areas

**File:** `layouts/project/list.html`  
**SCSS:** `.card-research` in `assets/scss/_components.scss`

4 card con icone SVG inline (24×24 viewBox, stroke monocromatico). Le descrizioni sono in inglese:


| # | Titolo | Descrizione |
|---|--------|-------------|
| 1 | Additive Manufacturing | Additive manufacturing of high-performance turbojet components with complex geometries that cannot be achieved through conventional machining methods. |
| 2 | Low-Cost Propulsion | Development of affordable yet high-performance propulsion systems enabling rapid production of large quantities of UAVs at low unit cost. |
| 3 | Low-Observable Design | Reduction of radar and thermal signature through integrated design of advanced materials, optimised geometries and selective coatings. |
| 4 | Scalable Manufacturing | Scalable production processes for the rapid manufacturing of propulsion units in large quantities with controlled quality and reduced costs. |

---

## F4.5 — SCSS: `_project.scss`

**File:** `assets/scss/_project.scss`  
**Import:** aggiunto in `assets/scss/main.scss`

Classi definite:

| Classe | Descrizione |
|--------|-------------|
| `.project-intro` | Grid bicolonna testo/visual |
| `.project-intro__text` | Colonna sinistra con testo |
| `.project-intro__visual` | Colonna destra con placeholder blueprint |
| `.project-quote` | Blockquote con bordo sinistro nero |
| `.blueprint-visual` | Placeholder per SVG blueprint (FASE 0B) |
| `.project-table` | Tabella dati progetto con righe zebrate |
| `.card-research` (override) | `background: $white` su sfondo `--alt` |

---

## F4.6 — Asset placeholder

| Asset | Placeholder attuale | File finale (FASE 0B) |
|-------|--------------------|-----------------------|
| Visual blueprint dx | Box grigio con label | SVG da `background_template.pdf` |

---

## Note tecniche

- **`layouts/project/list.html`**: Hugo usa il template `list.html` per le section page (`_index.md`). Il template viene cercato prima in `layouts/project/`, poi in `layouts/_default/`.
- **Riutilizzo partial**: la timeline viene inclusa con `{{ partial "timeline.html" . }}` — nessuna duplicazione di codice.
- **Icone SVG inline**: `viewBox="0 0 24 24"`, stroke monocromatico `currentColor`, dimensione controllata da CSS (`.card-research__icon`).
