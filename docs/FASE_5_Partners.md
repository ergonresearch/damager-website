# FASE 5 — Partners Page

**Documento di sviluppo DAMAGER Website**  
**Versione:** 2.0 | **Data:** Marzo 2026  
**Prerequisiti:** FASE 1–4 completate  
**Obiettivo:** Implementare la pagina Partners (`/partners`) con tutte le sezioni previste nelle specifiche

---

## Checklist

- [x] F5.1 — Consortium Overview (titolo, intro, statistiche)
- [x] F5.2 — Partner Cards (5 card con logo definitivo, nome, paese, ruolo, descrizione, link)
- [x] F5.3 — Mappa placeholder (pronta per integrazione Google Maps in FASE 7)
- [x] F5.4 — SCSS: `_partners.scss` (overview stats, coordinator badge, map placeholder)
- [x] F5.5 — Build, verifica e deploy

---

## Struttura implementata

### Sezioni (top → bottom)

| Sezione | Classe CSS | Note |
|---------|-----------|------|
| A — Consortium Overview | `.consortium-stats` | Titolo, intro, 3 stat boxes (partners, countries, budget) |
| B — Partner Cards | `.card-partner` × 5 | Riutilizzo stili FASE 2; coordinatore con badge visual |
| C — Mappa | `.map-placeholder` | Placeholder pronto per Google Maps (FASE 7 + cookie consent) |

---

## F5.1 — Consortium Overview

**File:** `layouts/partners/list.html`

- **Titolo:** "The DAMAGER Consortium"  
- **Intro:** breve testo descrittivo del consorzio europeo
- **Stat boxes** (3 valori chiave in evidenza):

| Stat | Valore |
|------|--------|
| Partners | 5 |
| Countries | 4 |
| Total Budget | €3.99M |

---

## F5.2 — Partner Cards

**File:** `layouts/partners/list.html`  
**SCSS:** `.card-partner` in `assets/scss/_components.scss` (già definito in FASE 2)  
**Override coordinatore:** `.card-partner--coordinator` in `assets/scss/_partners.scss`

Griglia: 1 colonna mobile → 2 colonne tablet (md+) → 3 colonne desktop (lg+)  
Il partner coordinatore (HIT09) ha un badge "Coordinator" e bordo nero più spesso.

| # | Partner | Paese | Ruolo | Sito |
|---|---------|-------|-------|------|
| 1 | HIT09 SRL *(coordinator)* | 🇮🇹 Italy | Project Coordinator | https://www.hit09.com/advanced-design |
| 2 | LITHOZ GMBH | 🇦🇹 Austria | Expert in ceramic additive manufacturing | https://www.lithoz.com/en/ |
| 3 | AENIUM ENGINEERING SL | 🇪🇸 Spain | Expert in metal additive manufacturing | https://aenium.es/ |
| 4 | ERGON RESEARCH SRL | 🇮🇹 Italy | Research — CFD and thermal analysis | https://www.ergonresearch.it/it/ |
| 5 | COMOTI | 🇷🇴 Romania | National R&D institute — testing and validation | https://comoti.ro/en/home-2/ |

> **Bandiere:** le emoji delle bandiere nazionali non vengono renderizzate nei browser desktop Windows. Sostituite con `<img>` SVG locali (`static/images/flags/it.svg`, `at.svg`, `es.svg`, `ro.svg`) scaricati da [flagcdn.com](https://flagcdn.com). Stilizzate con classe `.country-flag` (20px larghezza, bordo sottile).

> **Loghi definitivi:** tutti i loghi partner sono stati integrati in `static/images/partners/` (FASE 0B completata). I file sono `hit09.png`, `lithoz.jpg`, `aenium.png`, `ergon.jpg`, `comoti.png`.  
> **Descrizioni:** testi placeholder dalle specifiche; le descrizioni ufficiali per HIT09 e Ergon Research sono ancora da fornire internamente.

---

## F5.3 — Mappa del Consorzio

**File:** `layouts/partners/list.html`  
**SCSS:** `.map-placeholder`, `.map-locations` in `assets/scss/_partners.scss`

La mappa utilizza **Leaflet.js v1.9.4** (lazy-loaded da jsDelivr CDN) con tile **OpenStreetMap**. La struttura HTML è predisposta con:
- Contenitore `div#map-embed.map-placeholder` con attributo `data-map-embed` (target Leaflet)
- Overlay `.map-overlay` con link "Enable Map" che apre la modale VCC (cookie consent funzionali)
- Lista `.map-locations` con i Paesi dei partner (visibile senza consenso)

Quando l'utente accetta i cookie funzionali, `enableMap()` in `baseof.html` carica Leaflet e inizializza la mappa con **5 marker** e **etichette permanenti** (nome + città). Vedi `docs/FASE_7_Cookie.md` per i dettagli.

> **⚠️ Coordinate a livello città:** la mappa usa coordinate del centro città. Gli indirizzi fisici precisi di HIT09 SRL e Ergon Research SRL non sono ancora stati forniti (item #5 e #6 in `PROGETTO_DAMAGER_WEBSITE.md`).

---

## F5.4 — SCSS: `_partners.scss`

**File:** `assets/scss/_partners.scss`  
**Import:** aggiunto in `assets/scss/main.scss`

Classi definite:

| Classe | Descrizione |
|--------|-------------|
| `.consortium-intro` | Layout intro + stat boxes |
| `.consortium-stats` | Griglia stat boxes: 1 colonna su mobile, 3 colonne da 576px, 1 colonna (sidebar) da 1024px |
| `.stat-box` | Box singola statistica (numero grande + label) |
| `.card-partner--coordinator` | Override: bordo nero, badge "Coordinator" |
| `.coordinator-badge` | Label "Coordinator" in alto a destra sulla card |
| `.map-section` | Sezione mappa con titolo |
| `.map-wrapper` | Contenitore con posizionamento relativo per overlay |
| `.map-placeholder` | Box placeholder visuale; `&.leaflet-container` override a `display:block` quando Leaflet inizializza |
| `.map-overlay` | Overlay semi-trasparente con link "Enable Map" → apre modale VCC |
| `.map-locations` | Lista dei Paesi partner con bandiere SVG (visibile senza consenso) |
| `.map-label` | Etichette permanenti Leaflet (`bindTooltip`): B&W, `font-size-xs`, nessun box-shadow |
| `.country-flag` | Immagine SVG bandiera (20px, bordo sottile) — sostituisce emoji per compatibilità Windows |
| `.partners-cards-section` | Modificatore sulla section "Consortium Members": riduce `padding-top` (`$space-8` mobile, `$space-10` desktop) per accorciare il gap visivo tra la sezione Overview e quella dei partner |

---

## F5.5 — Asset

| Asset | Stato | File |
|-------|-------|------|
| Logo HIT09 | ✅ Integrato | `static/images/partners/hit09.png` |
| Logo LITHOZ | ✅ Integrato | `static/images/partners/lithoz.jpg` |
| Logo AENIUM | ✅ Integrato | `static/images/partners/aenium.png` |
| Logo ERGON | ✅ Integrato | `static/images/partners/ergon.jpg` |
| Logo COMOTI | ✅ Integrato | `static/images/partners/comoti.png` |
| Mappa Leaflet.js + OSM | ✅ Implementata | 5 marker con etichette permanenti — vedi `docs/FASE_7_Cookie.md` |

---

## Note tecniche

- **`layouts/partners/list.html`**: Hugo usa `list.html` per le section page (`_index.md`). Template cercato prima in `layouts/partners/`, poi in `layouts/_default/`.
- **Coordinator badge**: implementato con `position: absolute` all'interno della `.card-partner` con `position: relative`.
- **Leaflet.js**: la mappa interattiva è implementata con Leaflet.js + OpenStreetMap tiles. Non richiede API key. I dettagli implementativi sono in `docs/FASE_7_Cookie.md`.
- **Cookie consent map toggle**: la logica JS per mostrare/nascondere la mappa in base alle preferenze cookie è in FASE 7.
