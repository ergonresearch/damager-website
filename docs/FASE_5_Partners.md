# FASE 5 — Partners Page

**Documento di sviluppo DAMAGER Website**  
**Versione:** 1.0 | **Data:** Marzo 2026  
**Prerequisiti:** FASE 1–4 completate  
**Obiettivo:** Implementare la pagina Partners (`/partners`) con tutte le sezioni previste nelle specifiche

---

## Checklist

- [x] F5.1 — Consortium Overview (titolo, intro, statistiche)
- [x] F5.2 — Partner Cards (5 card con logo placeholder, nome, paese, ruolo, descrizione, link)
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
| 1 | HIT09 SRL *(coordinator)* | 🇮🇹 Italia | Project Coordinator | https://www.hit09.com/advanced-design |
| 2 | LITHOZ GMBH | 🇦🇹 Austria | Expert in ceramic additive manufacturing | https://www.lithoz.com/en/ |
| 3 | AENIUM ENGINEERING SL | 🇪🇸 Spagna | Expert in metal additive manufacturing | https://aenium.es/ |
| 4 | ERGON RESEARCH SRL | 🇮🇹 Italia | Research — CFD and thermal analysis | https://www.ergonresearch.it/it/ |
| 5 | COMOTI | 🇷🇴 Romania | National R&D institute — testing and validation | https://comoti.ro/en/home-2/ |

> **Loghi placeholder:** tutti i loghi sono box `.logo-placeholder` con il nome del partner. I loghi reali verranno inseriti in FASE 0B da `resources/partners/`.  
> **Descrizioni:** testi placeholder dalle specifiche; le descrizioni ufficiali per HIT09 e Ergon Research sono ancora da fornire internamente.

---

## F5.3 — Mappa del Consorzio

**File:** `layouts/partners/list.html`  
**SCSS:** `.map-placeholder`, `.map-locations` in `assets/scss/_partners.scss`

La mappa è un placeholder visuale pronto per l'integrazione con Google Maps. La struttura HTML è già predisposta con:
- Contenitore `.map-wrapper` con attributo `data-map-embed` (letto in FASE 7)
- Overlay `.map-overlay` con il pulsante "Enable Map" (disabilitato finché non c'è cookie consent)
- Lista `.map-locations` con i Paesi dei partner

Integrazione completa (Google Maps embed + stile monocromatico + cookie consent toggle) in **FASE 7**.

> **⚠️ Indirizzi fisici mancanti:** HIT09 SRL e Ergon Research SRL non hanno ancora fornito l'indirizzo fisico della sede (vedi item #5 e #6 in `PROGETTO_DAMAGER_WEBSITE.md`). La mappa verrà completata quando questi dati saranno disponibili.

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
| `.map-placeholder` | Box placeholder visuale con altezza fissa |
| `.map-overlay` | Overlay semi-trasparente con pulsante "Enable Map" |
| `.map-locations` | Lista dei Paesi partner con bandiere |

---

## F5.5 — Asset placeholder

| Asset | Placeholder attuale | File finale (FASE 0B) |
|-------|--------------------|-----------------------|
| Logo HIT09 | Box grigio "HIT09" | `static/images/partners/hit09.svg` |
| Logo LITHOZ | Box grigio "LITHOZ" | `static/images/partners/lithoz.svg` |
| Logo AENIUM | Box grigio "AENIUM" | `static/images/partners/aenium.svg` |
| Logo ERGON | Box grigio "ERGON" | `static/images/partners/ergon.svg` |
| Logo COMOTI | Box grigio "COMOTI" | `static/images/partners/comoti.svg` |
| Google Maps embed | Placeholder visuale | Da configurare in FASE 7 (API key + indirizzi) |

---

## Note tecniche

- **`layouts/partners/list.html`**: Hugo usa `list.html` per le section page (`_index.md`). Template cercato prima in `layouts/partners/`, poi in `layouts/_default/`.
- **Coordinator badge**: implementato con `position: absolute` all'interno della `.card-partner` con `position: relative`.
- **Google Maps**: l'embed gratuito (senza API key) è disponibile tramite `https://www.google.com/maps/embed?pb=...`. Sarà configurato in FASE 7 quando gli indirizzi saranno disponibili e il cookie consent sarà attivo.
- **Cookie consent map toggle**: la logica JS per mostrare/nascondere la mappa in base alle preferenze cookie è in FASE 7.
