# FASE 4 — Project Page

**Documento di sviluppo DAMAGER Website**  
**Versione:** 2.0 | **Data:** Marzo 2026  
**Prerequisiti:** FASE 1, 2 e 3 completate  
**Obiettivo:** Implementare la pagina Project (`/project`) con tutte le sezioni previste nelle specifiche

---

## Checklist

- [x] F4.1 — About the Project: header (eyebrow + titolo + intro), blocco motore SVG + card GIF, griglia 2×2 card descrittive
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

**b) SVG schematico del turbojet:**

Elemento `<svg id="engine-svg" viewBox="0 0 860 220">` con:

| Componente | Forma | Coordinate chiave |
|------------|-------|-------------------|
| AIR IN | testo + freccia | x=4–63, y=100 |
| Compressore (AM) | Poligono trapezoidale (si allarga verso destra) | `65,82 195,57 195,143 65,118` |
| Combustore (AM) | Rettangolo | x=225, y=57, w=283, h=86 |
| Freccia FUEL | Tratteggiata dall'alto | x=366, y=22→55 |
| Turbina (AM) | Poligono trapezoidale invertito (si restringe verso destra) | `541,57 691,82 691,118 541,143` |
| Ugello | Poligono convergente | `723,82 807,91 807,109 723,118` |
| EXH. | testo + freccia | x=807–848, y=100 |
| Linea albero | Tratteggiata orizzontale | x=65→692, y=100, opacity=0.3 |
| Dot AM (×3) | `<circle>` vuoto con stelo tratteggiato | cy=168, id=dot-compressor/combustor/turbine |

Il flag `currentColor` su stroke/fill permette adattamento al colore CSS del container.

**c) Tre card GIF (`<div class="engine-gifs">`):**

```html
<div class="gif-card" id="gif-compressor">
  <div class="gif-media">
    <img src="{{ with $compGif }}{{ .RelPermalink }}{{ end }}"
         onerror="this.style.display='none';this.nextElementSibling.removeAttribute('hidden')">
    <div class="gif-fallback" hidden>compressor.gif</div>
  </div>
  <span class="gif-label">Compressor</span>
</div>
```

Le GIF risiedono in `static/images/engine/` e vengono referenziate con path statici diretti (come tutti gli altri file immagine del progetto):
- `/images/engine/compressor.gif` → componente compressore centrifugo
- `/images/engine/combustor.gif` → camera di combustione
- `/images/engine/turbine.gif` → stadio turbina

Se il file non è ancora presente, il browser genera un errore di caricamento → `onerror` nasconde l'`<img>` e rivela il `div.gif-fallback` con bordo tratteggiato e nome file.

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
| `.engine-diagram` | Wrapper del SVG schematico; `margin-bottom: $space-6` |
| `.engine-gifs` | Griglia 3 colonne (≥768px) / 1 colonna (mobile) |
| `.gif-card` | Card singola GIF: bordo 0.5px, border-radius 2px, background bianco |
| `.gif-media` | Area media 16:9 con fallback flex centrato |
| `.gif-fallback` | Placeholder con bordo tratteggiato, nascosto via `[hidden]` finché `onerror` non lo mostra |
| `.gif-label` | Label monospace uppercase sotto la GIF |
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
               '" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3"/>';
    });

    overlay.innerHTML = lines;
  }

  draw();
  var ro = new ResizeObserver(draw);
  ro.observe(block);
}
```

Principio: `getBoundingClientRect()` funziona sui `<circle>` SVG esattamente come sugli elementi HTML — restituisce la posizione renderizzata in pixel CSS. Sottraendo `blockRect` si ottengono coordinate relative al container, coincidenti con il sistema di coordinate dell'overlay SVG (che ha `width: 100%; height: 100%` sul container `position: relative`).

La funzione è chiamata da `DOMContentLoaded` insieme a `initProgressBar()`, `initTimeline()`, `initTabs()`.

---

## Asset GIF (in attesa)

| File | Posizione nel repository | URL pubblico | Stato |
|------|--------------------------|--------------|-------|
| `compressor.gif` | `static/images/engine/compressor.gif` | `/images/engine/compressor.gif` | ⏳ Da fornire |
| `combustor.gif` | `static/images/engine/combustor.gif` | `/images/engine/combustor.gif` | ⏳ Da fornire |
| `turbine.gif` | `static/images/engine/turbine.gif` | `/images/engine/turbine.gif` | ⏳ Da fornire |

Convenzione: coerente con tutti gli altri file immagine del progetto (`static/images/partners/`, `static/images/eu-logo/`, `static/images/flags/`, ecc.). Non è necessario nessun processing Hugo — i file vengono copiati direttamente in `public/images/engine/` durante la build.

Fino all'inserimento dei file, le card mostrano automaticamente il placeholder visivo (bordo tratteggiato + nome file), attivato dall'attributo `onerror` sull'`<img>` quando il browser non riesce a caricare l'immagine.

---

## Note tecniche

- **`layouts/project/list.html`**: Hugo usa il template `list.html` per le section page (`_index.md`). Il template viene cercato prima in `layouts/project/`, poi in `layouts/_default/`.
- **Riutilizzo partial**: la timeline viene inclusa con `{{ partial "timeline.html" . }}` — nessuna duplicazione di codice.
- **GIF e loop**: le GIF si animano in loop infinito per default nei browser — nessun CSS `animation: none` o `animation-play-state: paused` applicato.
- **Responsive**: engine-gifs passa a 1 colonna sotto `$bp-md` (768px); about-cards idem. L'SVG del motore scala con `width: 100%; height: auto`.
