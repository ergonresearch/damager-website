# FASE 6 — Media Page

**Documento di sviluppo DAMAGER Website**  
**Versione:** 1.0 | **Data:** Marzo 2026  
**Prerequisiti:** FASE 1–5 completate  
**Obiettivo:** Implementare la pagina Media (`/media`) con navigazione a tab e integrazione CMS

---

## Checklist

- [x] F6.1 — Layout tab: News & Events / Documents / Papers
- [x] F6.2 — Sezione News & Events con lista card orizzontali
- [x] F6.3 — Kickoff Meeting inserito come primo elemento news
- [x] F6.4 — Sezione Documents con 3 categorie (Fact Sheet, Deliverables, Press Release)
- [x] F6.5 — Factsheet document entry (PDF da aggiungere in FASE 0B)
- [x] F6.6 — Sezione Academic Papers con abstract espandibile
- [x] F6.7 — CMS collegato a tutte e 3 le collezioni (`config.yml` già completo da FASE 1)
- [x] F6.8 — Layout articolo singolo (`layouts/media/news/single.html`)
- [x] F6.9 — SCSS: `_media.scss` (news list, doc groups, paper entries, empty states)
- [x] F6.10 — Build, verifica e deploy

---

## Struttura implementata

### Architettura Hugo

```
content/media/
├── _index.md           → sezione principale (usa layouts/media/list.html)
├── news/
│   ├── _index.md       → sottosezione news
│   └── 2025-12-01-kickoff-meeting.md
├── documents/
│   ├── _index.md       → sottosezione documenti
│   └── factsheet-2024.md
└── papers/
    └── _index.md       → sottosezione paper (vuota)
```

```
layouts/media/
├── list.html           → pagina /media/ con tab navigation
└── news/
    └── single.html     → articolo singolo /media/news/<slug>/
```

### Logica di caricamento contenuti (Hugo template)

In `layouts/media/list.html`, le pagine vengono caricate per sottosezione:

```hugo
{{ $news    := slice }}
{{ with .Site.GetPage "/media/news"      }}{{ $news   = .RegularPages.ByDate.Reverse }}{{ end }}
{{ with .Site.GetPage "/media/documents" }}{{ $docs   = .RegularPages.ByDate.Reverse }}{{ end }}
{{ with .Site.GetPage "/media/papers"    }}{{ $papers = .RegularPages.ByDate.Reverse }}{{ end }}
```

---

## F6.1 — Tab Navigation

**File:** `layouts/media/list.html`  
**SCSS:** `.tab-nav`, `.tab-panel` già in `assets/scss/_components.scss`  
**JS:** `initTabs()` in `assets/js/main.js`

```
[ News & Events (1) ]  [ Documents (1) ]  [ Academic Papers ]
```

Ogni tab ha un badge con il conteggio degli elementi. Il tab attivo mostra il suo pannello `.tab-panel.is-active`; gli altri hanno `display: none`.

**Responsive (mobile):** la `.tab-nav` ha `overflow-x: auto` con scrollbar nascosta — i tab scorrono orizzontalmente senza wrapping. Ogni `.tab-nav__item` ha `white-space: nowrap` e padding ridotto sotto i 576px.

---

## F6.2–F6.3 — News & Events

**Stile:** lista verticale di `.news-item` (card orizzontali con immagine opzionale a sinistra)  
**Tipo badge:** grigio per "News", nero per "Event"  
**Azioni:** "Read more" → articolo completo | "External link →" → link LinkedIn/esterno

### Kickoff Meeting (pre-caricato)

| Campo | Valore |
|-------|--------|
| Titolo | DAMAGER Kickoff Meeting |
| Data | 1 December 2025 |
| Tipo | Event |
| Immagine | — (da aggiungere: `static/images/uploads/kickoff.jpg` in FASE 0B) |
| Link esterno | https://www.linkedin.com/posts/damager-edf-project_... |

> **Immagine:** `resources/kickoff.jpg` (versione ad alta risoluzione) è stata copiata in `static/images/uploads/kickoff.jpg` e il campo `image` dell'articolo è aggiornato in FASE 0B. ✅

---

## F6.4–F6.5 — Documents

La sezione Documents è divisa in **3 categorie** con intestazioni separate:

| Categoria | Icona | Contenuto iniziale |
|-----------|-------|-------------------|
| Fact Sheets | 📋 | 1 elemento: Factsheet EDF 2024 |
| Public Deliverables | 📦 | Vuota — placeholder testuale |
| Press Releases | 📰 | Vuota — placeholder testuale |

### Factsheet (pre-caricato)

| Campo | Valore |
|-------|--------|
| Titolo | DAMAGER Fact Sheet |
| Categoria | Fact Sheet |
| Data | December 2024 |
| PDF | `/documents/FACTSHEET_EDF_2024_LS_RA_SMERO_NT_101224541_DAMAGER.pdf` |

> **⚠️ PDF:** il file `FACTSHEET_EDF_2024_LS_RA_SMERO_NT_101224541_DAMAGER.pdf` deve essere copiato in `static/documents/` — da fare in **FASE 0B** quando si raccolgono gli asset.

---

## F6.6 — Academic Papers

Sezione inizialmente vuota con messaggio placeholder:

> *"Academic papers will be published here as they are accepted and cleared for public release."*

Ogni paper mostrerà:
- Titolo, autori, conference/journal + anno
- Abstract espandibile con `<details>` HTML nativo (nessun JS necessario)
- Pulsanti "Download PDF" e "DOI →"

---

## F6.7 — CMS Integration

Le tre collezioni CMS erano già configurate in `static/admin/config.yml` da FASE 1:

| Collezione | Cartella content | Campi |
|------------|-----------------|-------|
| `news` | `content/media/news/` | title, date, news_type, body, image, link, tags |
| `documents` | `content/media/documents/` | title, category, description, pdf, date |
| `papers` | `content/media/papers/` | title, authors, venue, year, abstract, pdf, doi, tags |

L'editor non tecnico può aggiungere/modificare tutti i contenuti dal pannello CMS a `/admin/`.

---

## F6.8 — Articolo singolo news (`/media/news/<slug>/`)

**File:** `layouts/media/news/single.html`

Struttura:
- Header con sfondo scuro (`article-header-section`): breadcrumb "← Back to Media", badge tipo, data, titolo. Padding-bottom ridotto per minimizzare il gap con il contenuto.
- Sezione body (`article-body-section`): immagine featured opzionale (full-width, con gap ridotto rispetto al titolo), poi Hugo `.Content` con tipografia aumentata.
- Footer con "← All News & Events" e "View on LinkedIn →" (se link presente)
- Tags in fondo come chip

> **Fix campo `type` (Hugo reserved word):** il campo front-matter `type` è riservato da Hugo per la risoluzione del layout. Era impostato a `type: "Event"` nel file `content/media/news/2025-12-01-kickoff-meeting.md`, causando il fallback al layout generico `_default/single.html` (senza immagini né header personalizzato). Rinominato in `news_type` in tutti i file interessati: content, template (`layouts/media/news/single.html`, `layouts/media/list.html`) e CMS config (`static/admin/config.yml`). ✅

---

## F6.9 — SCSS: `_media.scss`

**File:** `assets/scss/_media.scss`

Classi definite:

| Classe | Descrizione |
|--------|-------------|
| `.tab-badge` | Badge conteggio elementi nel tab header |
| `.doc-empty-note` | Nota in corsivo per categorie documenti vuote |
| `.news-list` | Contenitore flex verticale per news items |
| `.news-item` | Card orizzontale: immagine sx + corpo dx |
| `.news-item__type` | Badge tipo News/Event |
| `.news-item__type--event` | Variante nera per eventi |
| `.doc-group` | Gruppo documenti per categoria |
| `.doc-group-header` | Intestazione categoria con icona, titolo, count |
| `.paper-list` | Lista paper verticale |
| `.paper-entry` | Entry singolo paper con icona PDF |
| `.paper-entry__abstract` | `<details>` espandibile |
| `.empty-state` | Placeholder centrato con icona, titolo, testo |
| `.article-header` | Header articolo singolo |
| `.article-header-section` | Modificatore sulla section header: riduce `padding-bottom` per minimizzare il gap verso il body |
| `.article-image` | Immagine featured full-width |
| `.article-body` | Corpo articolo con tipografia aumentata |
| `.article-body-section` | Modificatore sulla section body: riduce `padding-top` per avvicinare l'immagine al titolo |
| `.article-footer` | Footer con link navigazione |
| `.media-page-header` | Modificatore sulla section header della pagina lista Media: riduce `padding-bottom` per accorciare il gap sopra i tab |

---

## F6.10 — Asset (FASE 0B)

| File | Cartella destinazione | Stato |
|------|-----------------------|-------|
| `resources/kickoff.jpg` (alta risoluzione) | `static/images/uploads/kickoff.jpg` | ✅ Completato (F0B.6) |
| `FACTSHEET_EDF_2024_...pdf` | `static/documents/` | ✅ Completato (F0B.7) |

---

## Note tecniche

- **`.Site.GetPage "/media/news"`**: Hugo restituisce la section page della sottosezione. Funziona se esiste `content/media/news/_index.md`.
- **`.RegularPages.ByDate.Reverse`**: ordina le pagine dalla più recente alla meno recente.
- **`where $docs ".Params.category" "Fact Sheet"`**: filtra le pagine per valore del parametro front matter — Hugo template function.
- **`<details>` per abstract**: elemento HTML nativo, nessun JS richiesto, accessibile, supportato da tutti i browser moderni.
- **`initTabs()`**: funzione in `main.js` già attiva — intercetta i click sui `.tab-nav__item` e mostra/nasconde i `.tab-panel`.
