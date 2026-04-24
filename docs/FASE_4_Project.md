# FASE 4 — Project Page

**Documento di sviluppo DAMAGER Website**  
**Versione:** 2.1 | **Data:** Aprile 2026  
**Prerequisiti:** FASE 1, 2 e 3 completate  
**Obiettivo:** Implementare la pagina Project (`/project`) con tutte le sezioni previste nelle specifiche

> **Nota:** questo file resta uno **snapshot** al completamento della **FASE 4**. Le modifiche alla sezione About nella **FASE 8** (**F8.D**) sono descritte in [`FASE_8_Riordino_Contenuti.md`](FASE_8_Riordino_Contenuti.md) e **non** vengono replicate qui.

---

## Checklist

- [x] F4.1 — About the Project: header (eyebrow + titolo + intro), blocco motore (foto turbojet + drop-line + card media), griglia 2×2 card descrittive
- [x] F4.2 — Project Details (tabella dati chiave)
- [x] F4.3 — Timeline animata con milestone M00–M48
- [x] F4.4 — ~~Research Areas~~ *(rimossa — contenuto integrato nelle 4 card di F4.1)*
- [x] F4.5 — SCSS: `_project.scss` aggiornato (engine block, gif-card, about-card, project-table)
- [x] F4.6 — JS: `initEngineDroplines()` in `assets/js/main.js`
- [x] F4.7 — Build, verifica e deploy

---

## Struttura implementata

### Sezioni (top → bottom)

| Sezione | Classe CSS | Note |
|---------|-----------|------|
| A — About the Project | `section bg-blueprint` | Header + blocco motore + 4 card descrittive |
| B — Project Details | `.project-table` | Tabella dati ufficiali del progetto |
| C — Timeline | `{{ partial "timeline.html" . }}` | Riutilizzo del partial già creato in FASE 2 |

---

## F4.1 — About the Project

**File:** `layouts/project/list.html`

La sezione è strutturata in tre blocchi verticali all'interno di un'unica `<section class="section bg-blueprint">`:

### Blocco 1 — Header

Pattern standard del sito:

```html
<span class="section-eyebrow">EDF 2024 — Research Action</span>
<h1 class="section-title">About the Project</h1>
<p class="section-intro">Study of additive manufacturing for low-cost, low-observable,
  highly-deployable expendable turbojet engines.</p>
```

### Blocco 2 — Engine block (motore turbojet)

Contenitore `<div class="engine-block" id="engine-block">` con tre sotto-elementi:

**a) Overlay SVG per drop-lines (disegnato da JavaScript):**

```html
<svg class="engine-droplines" id="engine-droplines" aria-hidden="true"></svg>
```

Posizionato `position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible`.
Le linee tratteggiate che collegano i dot SVG alle card GIF sono iniettate dinamicamente da `initEngineDroplines()`.

**b) Immagine turbojet reale + anchor points:**

```html
<div class="engine-diagram">
  <img src="/images/engine/turbojet.png"
       alt="Turbojet engine cross-section: compressor, combustor, turbine"
       class="engine-photo">
  <div id="dot-compressor" class="engine-anchor" style="left:28%;top:93%"></div>
  <div id="dot-combustor"  class="engine-anchor" style="left:53%;top:86%"></div>
  <div id="dot-turbine"    class="engine-anchor" style="left:76%;top:78%"></div>
</div>
```

`turbojet.png` è l'immagine CAD reale della sezione trasversale del motore (`static/images/engine/turbojet.png`). Al suo interno, tre `<div class="engine-anchor">` invisibili (1×1 px, `position: absolute`) fungono da anchor point per le drop-line. Le percentuali `left`/`top` sono calibrate sul layout visivo dell'immagine:

| Componente | left | top | Riferimento visivo |
|------------|------|-----|--------------------|
| Compressore | 28% | 93% | Bordo inferiore del'impeller centrifugo (area teal) |
| Combustore | 53% | 86% | Bordo inferiore della camera di combustione |
| Turbina | 76% | 78% | Bordo inferiore dello stadio turbina |

**c) Tre card media (`<div class="engine-gifs">`):**

```html
<div class="gif-card" id="gif-compressor">
  <div class="gif-media">
    <video autoplay loop muted playsinline>
      <source src="/images/engine/compressor.webm" type="video/webm">
    </video>
  </div>
  <span class="gif-label">Compressor</span>
</div>
```

I file risiedono in `static/images/engine/` e vengono referenziate con path statici diretti:
- `/images/engine/compressor.webm` → animazione compressore centrifugo (video loop)
- `/images/engine/combustor.png` → immagine camera di combustione
- `/images/engine/turbine.webm` → animazione stadio turbina (video loop)

I video `.webm` usano `autoplay loop muted playsinline` per riproduzione automatica continua senza audio e senza controlli.

### Blocco 3 — Quattro card descrittive (`<div class="about-cards">`)

Griglia 2×2 su desktop, 1×4 su mobile:

| # | Titolo | Contenuto |
|---|--------|-----------|
| 01 | Mission background | Contesto operativo delle UAV e limiti delle soluzioni propulsive attuali |
| 02 | Critical gaps | Limiti della produzione sottrattiva; stealth e design attritable non risolti |
| 03 | Technologies | AM applicata a compressore, combustore e turbina per batch rapido e RCS ridotto |
| 04 | Programme goals | Validare le technology bricks AM e consegnare un sistema propulsivo scalabile e low-observable |

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

Milestone:

| Mese | Data | Nome |
|------|------|------|
| M0  | Dec 2025 | Kickoff Meeting |
| M12 | Dec 2026 | M12 Meeting |
| M24 | Dec 2027 | M24 Review |
| M36 | Dec 2028 | M36 Review |
| M48 | Nov 2029 | M48 Meeting |

Il marcatore drone SVG viene posizionato dinamicamente da `initTimeline()` in base alla data corrente.

**Implementazione tecnica:**
- L'icona aeroplano è il drone SVG DAMAGER (`assets/images/damager_drone.svg`), incluso inline nel partial tramite `resources.Get`.
- Il drone è ruotato a 90° tramite CSS (`@keyframes plane-float` con `rotate(90deg)`).
- L'animazione di galleggiamento usa `translateX` nel frame ruotato per ottenere un movimento verticale sullo schermo.
- Ciascuna milestone è posizionata assolutamente con `left: X%` (calcolato da Hugo: `month/48 × 100`) e centrata tramite `transform: translateX(-50%)` in CSS.
- Linea e container milestone usano un inset orizzontale di `80px` per lato (`$timeline-inset` in `_timeline.scss`).
- Il drone è posizionato in pixel dal JS: `left = 80px + pct × (timeline_width − 160px)`.
- Le milestone passate ricevono la classe `is-past` (dot nero pieno); quella corrente riceve `is-current`.

---

## F4.5 — SCSS: `_project.scss`

**File:** `assets/scss/_project.scss`  
**Import:** presente in `assets/scss/main.scss`

Classi definite:

| Classe | Descrizione |
|--------|-------------|
| `.engine-block` | Container relativo per il blocco motore; `margin-bottom: $space-16` |
| `.engine-droplines` | Overlay SVG assoluto per le drop-line JS; `pointer-events: none` |
| `.engine-diagram` | Wrapper `position: relative`; `width: 70%; margin: 0 auto` — riduce e centra l'immagine rispetto al container |
| `.engine-photo` | Immagine turbojet: `width: 100%; height: auto; display: block` |
| `.engine-anchor` | Anchor 1×1 px `position: absolute` per i punti di partenza delle drop-line |
| `.engine-gifs` | Griglia 3 colonne (≥768px) / 1 colonna (mobile) |
| `.gif-card` | Card singola: bordo 0.5px, border-radius 2px, background bianco |
| `.gif-media` | Area media 16:9; `img` → `object-fit: contain`; `video` → `object-fit: cover` |
| `.gif-label` | Label monospace uppercase sotto il media |
| `.about-cards` | Griglia 2 colonne (≥768px) / 1 colonna (mobile) |
| `.about-card` | Card descrittiva: bordo 0.5px, `border-radius: 2px`, hover con `box-shadow` + `translateY(-1px)` |
| `.about-card__num` | Numero progressivo (01–04): monospace, grigio, uppercase |
| `.about-card__title` | Titolo card: 18px, font-weight 700 |
| `.about-card__body` | Testo card: 16px, `$gray-600` |
| `.project-table` | Tabella dati progetto con righe zebrate |

**Note di stile:**
- Nessun gradiente, nessuna ombra (eccetto l'hover delle about-card).
- Bordi: 0.5px su gif-card e about-card (stile militare/tecnico).
- `border-radius` massimo: 4px (`$radius-sm` = 2px usato effettivamente).
- Testo in sentence case tranne le label monospace in UPPERCASE.

---

## F4.6 — JavaScript: `initEngineDroplines()`

**File:** `assets/js/main.js`

Funzione che disegna le drop-line dinamiche (linee tratteggiate dall'SVG engine alle card GIF):

```javascript
function initEngineDroplines() {
  var block   = document.getElementById('engine-block');
  var overlay = document.getElementById('engine-droplines');
  if (!block || !overlay) return;

  function draw() {
    var blockRect  = block.getBoundingClientRect();
    var components = ['compressor', 'combustor', 'turbine'];
    var lines = '';

    components.forEach(function (comp) {
      var dot  = document.getElementById('dot-' + comp);
      var card = document.getElementById('gif-' + comp);
      if (!dot || !card) return;

      var dotRect  = dot.getBoundingClientRect();
      var cardRect = card.getBoundingClientRect();

      var x1 = dotRect.left  + dotRect.width  / 2 - blockRect.left;
      var y1 = dotRect.bottom                      - blockRect.top;
      var x2 = cardRect.left + cardRect.width / 2  - blockRect.left;
      var y2 = cardRect.top                        - blockRect.top;

      lines += '<line x1="' + x1 + '" y1="' + y1 +
               '" x2="' + x2 + '" y2="' + y2 +
               '" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/>';
    });

    overlay.innerHTML = lines;
  }

  draw();
  var ro = new ResizeObserver(draw);
  ro.observe(block);
}
```

Principio: `getBoundingClientRect()` restituisce la posizione renderizzata in pixel CSS degli anchor `<div>` (1×1 px, `position: absolute` dentro `.engine-diagram`). Sottraendo `blockRect` si ottengono coordinate relative al container, coincidenti con il sistema di coordinate dell'overlay SVG (`width: 100%; height: 100%` su `position: relative`). Le linee hanno `stroke-width="2"` per buona visibilità su sfondo chiaro.

La funzione è chiamata da `DOMContentLoaded` insieme a `initProgressBar()`, `initTimeline()`, `initTabs()`.

---

## Asset media engine block ✅

| File | Posizione nel repository | URL pubblico | Stato |
|------|--------------------------|--------------|-------|
| `compressor.webm` | `static/images/engine/compressor.webm` | `/images/engine/compressor.webm` | ✅ Integrato |
| `combustor.png` | `static/images/engine/combustor.png` | `/images/engine/combustor.png` | ✅ Integrato |
| `turbine.webm` | `static/images/engine/turbine.webm` | `/images/engine/turbine.webm` | ✅ Integrato |

Convenzione: coerente con tutti gli altri file immagine del progetto (`static/images/partners/`, `static/images/eu-logo/`, `static/images/flags/`, ecc.). Non è necessario nessun processing Hugo — i file vengono copiati direttamente in `public/images/engine/` durante la build.

---

## Note tecniche

- **`layouts/project/list.html`**: Hugo usa il template `list.html` per le section page (`_index.md`). Il template viene cercato prima in `layouts/project/`, poi in `layouts/_default/`.
- **Riutilizzo partial**: la timeline viene inclusa con `{{ partial "timeline.html" . }}` — nessuna duplicazione di codice.
- **GIF e loop**: le GIF si animano in loop infinito per default nei browser — nessun CSS `animation: none` o `animation-play-state: paused` applicato.
- **Responsive**: engine-gifs passa a 1 colonna sotto `$bp-md` (768px); about-cards idem. L'SVG del motore scala con `width: 100%; height: auto`.
