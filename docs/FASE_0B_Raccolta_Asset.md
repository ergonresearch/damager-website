# 🗂️ FASE 0B — Raccolta e Preparazione degli Asset
**Documento di sviluppo DAMAGER Website**  
**Versione:** 2.0 | **Data:** Marzo 2026  
**Prerequisiti:** FASE 1-6 completate (struttura Hugo e tutte le pagine con placeholder)  
**Obiettivo:** Raccogliere e convertire i materiali grafici e testuali definitivi, sostituendo i placeholder inseriti durante il blocco FASI 3-6

> **Nota sull'ordine:** questa fase è stata spostata dopo il completamento della struttura del sito (ex FASE 3-6). Il sito viene costruito prima con asset placeholder per accelerare lo sviluppo; i materiali definitivi vengono integrati in questa fase.

---

## Checklist di fase

- [x] F0B.1 — Sostituzione logo placeholder con logo DAMAGER definitivo (SVG path-based/favicon) ✅
- [ ] F0B.2 — Sostituzione sfondi placeholder con immagini da `background_template.pdf`
- [x] F0B.3 — Logo EU: `resources/Flag_of_Europe.png` → `static/images/eu-logo/flag-of-europe.png` (footer)
- [x] F0B.4 — Sostituzione loghi partner placeholder con loghi definitivi dei 5 partner ✅
- [x] F0B.5 — Immagine hero Home: `resources/turbojet_half.png` → `static/images/turbojet_half.png` *(usata al posto di turbojet.png: immagine pre-ritagliata alla metà superiore, anchored bottom)*
- [x] F0B.6 — `resources/kickoff.jpg` (alta risoluzione) → `static/images/uploads/kickoff.jpg` + `image:` aggiornato in `content/media/news/2025-12-01-kickoff-meeting.md`
- [x] F0B.7 — Factsheet PDF copiato in `static/documents/` (percorso configurato nel CMS entry `content/media/documents/factsheet-2024.md`)
- [ ] Verifica finale struttura cartelle

---

## Asset placeholder usati nel blocco FASI 3-6

Durante lo sviluppo delle pagine (FASI 3-6) vengono usati i seguenti placeholder, che questa fase andrà a sostituire:

| Asset | Placeholder usato durante sviluppo | File definitivo da creare |
|-------|------------------------------------|--------------------------|
| Logo DAMAGER (header) | SVG inline con testo "DAMAGER" | `static/images/logo/damager-logo.svg` |
| Logo DAMAGER (versione bianca) | CSS `filter: invert(1)` sul placeholder | `static/images/logo/damager-logo-white.svg` |
| Favicon | Emoji ✈ o lettera "D" | `static/images/logo/favicon.ico` |
| Logo EU "Funded by the EU" | Testo semplice con link | `static/images/eu-logo/funded-by-eu-en.svg` |
| Sfondi decorativi | Assenti (sezioni senza sfondo) | `static/images/backgrounds/compressor-bg.svg`, `turbine-bg.svg` |
| Logo HIT09 | Box grigio con testo "HIT09" | `static/images/partners/hit09-logo.png` |
| Logo Lithoz | Box grigio con testo "LITHOZ" | `static/images/partners/lithoz-logo.png` |
| Logo Aenium | Box grigio con testo "AENIUM" | `static/images/partners/aenium-logo.png` |
| Logo Ergon Research | Box grigio con testo "ERGON" | `static/images/partners/ergon-logo.png` |
| Logo COMOTI | Box grigio con testo "COMOTI" | `static/images/partners/comoti-logo.png` |

> `turbojet.png` è già disponibile in `resources/` e viene usato direttamente nella hero section — non richiede placeholder.

---

---

## Struttura cartelle da creare

Prima di iniziare, creare le sottocartelle per gli asset:

```bash
mkdir -p resources/logo
mkdir -p resources/eu-logo
mkdir -p resources/backgrounds
mkdir -p resources/partners
```

Struttura attesa al termine di questa fase:

```
resources/
├── DAMAGER_logo.pdf          ✅ Presente (sorgente originale PDF)
├── damager_logo_plain.svg    ✅ Presente (sorgente SVG path-based — usato per logo sito)
├── background_template.pdf   ✅ Presente (sorgente)
├── turbojet.png              ✅ Presente
├── FACTSHEET_EDF_...pdf      ✅ Presente
├── foto_kickoff.jpg          ✅ Presente (versione originale bassa risoluzione)
├── kickoff.jpg               ✅ Presente (versione alta risoluzione — usata nel sito)
├── logo/

│   ├── damager-logo.svg      ⬜ Da creare (F0B.1)
│   ├── damager-logo-white.svg ⬜ Da creare (F0B.1)
│   ├── damager-logo-512.png  ⬜ Da creare (F0B.1)
│   ├── damager-logo-192.png  ⬜ Da creare (F0B.1)
│   └── favicon.ico           ⬜ Da creare (F0B.1)
├── eu-logo/
│   ├── funded-by-eu-en.svg   ⬜ Da scaricare (F0B.3)
│   └── funded-by-eu-en.png   ⬜ Da scaricare (F0B.3)
├── backgrounds/
│   ├── compressor-bg.svg     ⬜ Da creare (F0B.2)
│   └── turbine-bg.svg        ⬜ Da creare (F0B.2)
└── partners/
    ├── hit09-logo.png         ⬜ Da scaricare (F0B.4)
    ├── lithoz-logo.png        ⬜ Da scaricare (F0B.4)
    ├── aenium-logo.png        ⬜ Da scaricare (F0B.4)
    ├── ergon-logo.png         ⬜ Da scaricare (F0B.4)
    └── comoti-logo.png        ⬜ Da scaricare (F0B.4)
```

---

## F0B.1 — Logo DAMAGER definitivo ✅ Completata

**File sorgente fornito:** `resources/damager_logo_plain.svg` (SVG vettoriale con lettere come path puri, senza font)

**Soluzione adottata — SVG inline con path puri (no font-dependency):**  
Il file sorgente `damager_logo_plain.svg` è stato esportato da Inkscape con tutte le lettere convertite in path vettoriali (nessuna dipendenza da font). Il logo viene inserito come SVG inline nel template (`resources.Get ... .Content | safeHTML`). La versione bianca mantiene la struttura e i transform originali del file sorgente, rimuovendo solo il rettangolo di sfondo (`BACKGROUND`). La versione nera inverte tutti i colori (`#ffffff` ↔ `#000000`).

**Caratteristica chiave — SWOOSH con bordo:** lo SWOOSH ha `stroke:#000000;stroke-width:12.5px` (versione bianca) che, disegnato sopra le lettere, crea l'effetto visivo della scia che passa "sotto" le lettere. Nella versione nera lo stroke è invertito in `stroke:#ffffff`.

> **Nota — Font Ethnocentric:** i file font (`static/fonts/ethnocentric-italic.otf`, `static/fonts/ethnocentric-regular.otf`) e il relativo `@font-face` in `_base.scss` sono presenti nel progetto ma **non più necessari** per il logo SVG, che usa path vettoriali. Possono essere mantenuti per eventuali usi tipografici futuri.

**File prodotti:**

| File | Percorso | Utilizzo |
|------|----------|----------|
| Logo bianco (sfondo trasparente) | `assets/images/logo/damager-logo-white.svg` | Header (sfondo nero) |
| Logo nero (sfondo trasparente) | `assets/images/logo/damager-logo.svg` | Sfondi chiari |
| Copia statica bianco | `static/images/logo/damager-logo-white.svg` | Riferimenti diretti |
| Copia statica nero | `static/images/logo/damager-logo.svg` | Riferimenti diretti |
| Favicon SVG | `static/images/logo/favicon.svg` | Tab del browser (lettera D su sfondo nero) |
| File sorgente plain | `resources/damager_logo_plain.svg` | Sorgente per derivazione varianti |

**Modifiche tecniche:**

- `layouts/partials/header.html`: logo reso con `resources.Get ... .Content | safeHTML` (SVG inline)
- `assets/scss/_header.scss`: `.logo svg` con `height: 36px; width: auto`
- `layouts/_default/baseof.html`: aggiunto `<link rel="icon" href="/images/logo/favicon.svg" type="image/svg+xml">`
- `hugo.toml`: aggiunto `favicon = "/images/logo/favicon.svg"`

> **Nota:** I PNG (512×512, 192×192) e il `.ico` tradizionale sono opzionali e possono essere generati in un secondo momento tramite https://favicon.io/favicon-converter/ se necessario per PWA o compatibilità browser datati.

---

### Come derivare nuove varianti dal sorgente `damager_logo_plain.svg`

Il file `resources/damager_logo_plain.svg` è il sorgente ufficiale da cui derivare tutte le varianti. La struttura del file è:

```
<svg viewBox="0 0 500.00003 156.25004">
  <g id="layer1" transform="translate(...)">
    <g id="g7" transform="matrix(0.26458333,...)">
      <path id="BACKGROUND" .../>   ← RIMUOVERE nelle varianti
      <path id="text1" .../>        ← Lettera D (path)
      <g id="text2" .../>           ← Lettere AMAGER (3 path)
      <path id="SWOOSH" style="fill:#ffffff;stroke:#000000;stroke-width:12.5px"/>
      <path id="path2" .../>        ← Drone/aereo
    </g>
  </g>
</svg>
```

**Per la variante bianca** (su sfondo scuro): rimuovere `BACKGROUND`, mantenere tutto il resto invariato.  
**Per la variante nera** (su sfondo chiaro): rimuovere `BACKGROUND`, sostituire `fill:#ffffff` → `fill:#000000` e `stroke:#000000` → `stroke:#ffffff`.

> ⚠️ Non modificare i path data o i transform. Qualsiasi reinterpretazione geometrica può alterare proporzioni e allineamento tra scia e aereo.

---

## F0B.2 — Creazione immagini di sfondo da `background_template.pdf`

**File sorgente:** `resources/background_template.pdf`  
**Obiettivo:** creare immagini decorative in stile "blueprint tecnico" da usare come sfondo semitrasparente nelle sezioni del sito

**File da produrre:**

```
resources/backgrounds/
├── compressor-bg.svg    (sezione compressore)
└── turbine-bg.svg       (sezione turbina/generale)
```

---

### Passo 1 — Analizzare il contenuto del PDF

Aprire `background_template.pdf` e determinare il tipo di contenuto:

| Tipo di contenuto | Approccio consigliato |
|-------------------|-----------------------|
| Disegni tecnici vettoriali (linee nette al massimo zoom) | Estrarre in SVG con Inkscape |
| Fotografie o rendering 3D | Esportare come PNG ad alta risoluzione (300 DPI) |
| Layout misto (vettoriale + foto) | Estrarre le parti vettoriali, PNG per le foto |

---

### Passo 2 — Estrazione con Inkscape

1. Aprire il PDF in Inkscape
2. Identificare le geometrie della turbina e del compressore
3. Selezionare gli elementi da usare come sfondo decorativo
4. Semplificare il tracciato se necessario (rimuovere dettagli troppo fini — uno sfondo deve essere leggero)
5. Cambiare i colori in grigio chiaro (`#E0E0E0`) per l'uso come sfondo
6. Esportare come SVG Plain in `resources/backgrounds/`

---

### Passo 3 — Utilizzo CSS nel tema Hugo

Le immagini verranno applicate via CSS con bassa opacità:

```css
.section-with-bg {
  background-image: url('/images/backgrounds/turbine-bg.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.08; /* quasi invisibile, solo texture */
}
```

---

### ⚠️ Punti aperti F0B.2

**[APERTO — critico] Tipo di contenuto del PDF**

Il metodo di estrazione dipende interamente dal contenuto:
- Geometrie vettoriali (tipico CAD) → SVG ottimale, leggero, scalabile
- Fotografie/rendering → solo PNG ad alta risoluzione
- Template PowerPoint convertito → probabilmente misto

**[APERTO] Stile delle immagini di sfondo**

Tre opzioni stilistiche:

| Opzione | Descrizione | Coerenza con palette |
|---------|-------------|----------------------|
| **A** — Blueprint classico | Sfondo blu scuro, linee bianche | ❌ Non coerente con bianco/nero |
| **B** — Wireframe monocromatico | Sfondo bianco, linee grigio chiarissimo | ✅ Coerente |
| **C** — Outline scuro | Sfondo bianco, contorni grigi medi | ✅ Coerente, più visibile |

**Raccomandazione: Opzione B** — wireframe monocromatico con opacità CSS al 5-10%.

---

## F0B.3 — Download logo EU "Funded by the European Union"

**Obbligatorio per legge (Grant Agreement EDF).**

### Passi dettagliati

**1. Scaricare il logo dalla Commissione Europea**

URL ufficiale:  
https://commission.europa.eu/resources-and-tools/resources/logos-and-visual-identity_en

Cercare la sezione **"Funded by the European Union"** e scaricare:
- Formato **SVG** (preferito)
- Formato **PNG** (fallback)
- Versione **EN** (inglese)

**2. Verificare la disponibilità di loghi EDF-specifici**

Il programma EDF potrebbe fornire un kit di comunicazione con loghi dedicati:
- Portale EDF/DEFIS: https://defence-industry-space.ec.europa.eu/european-defence-fund_en
- Verificare se HIT09 ha ricevuto un kit di comunicazione dalla Commissione al momento dell'approvazione del progetto

**3. Salvare i file**

```
resources/eu-logo/
├── funded-by-eu-en.svg       (logo principale)
├── funded-by-eu-en.png       (fallback PNG)
└── edf-logo.svg              (logo EDF specifico, se disponibile)
```

**4. Testo disclaimer da usare sul sito**

Testo obbligatorio da inserire nella Home page e nel footer di ogni pagina:

> *"Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or DG DEFIS. Neither the European Union nor the granting authority can be held responsible for them."*

---

### ⚠️ Punti aperti F0B.3

**[APERTO] Linee guida EDF per la comunicazione**

I progetti EDF hanno obblighi di visibilità definiti nel Grant Agreement, che possono includere:
- Dimensione minima del logo EU sul sito
- Posizione obbligatoria (es. visibile in ogni pagina)
- Wording esatto del disclaimer

Verificare con HIT09 se esistono linee guida specifiche per DAMAGER o se si fa riferimento alle linee guida standard EDF.

**[PARZIALMENTE CHIUSO] Social media del progetto**

✅ **LinkedIn DAMAGER confermato:** https://www.linkedin.com/company/damager-edf-project/posts/

Il programma EDF usa ufficialmente: `@defis_eu` su Twitter/X, hashtag `#StrongerEurope`, `#EUDefenceIndustry`.  
⚠️ Verificare se è previsto anche un canale Twitter/X per DAMAGER.


---

## F0B.4 — Loghi definitivi dei 5 partner ✅ Completata

**File sorgente forniti:** 5 immagini aggiunte in `resources/` dal cliente.

**File prodotti:**

| Partner | File sorgente | File destinazione | Formato |
|---------|--------------|-------------------|---------|
| HIT09 SRL | `resources/logo hit09.png` | `static/images/partners/hit09.png` | PNG |
| LITHOZ GMBH | `resources/zlithoz_logo_cut-out-scaled.jpg` | `static/images/partners/lithoz.jpg` | JPG |
| AENIUM ENGINEERING SL | `resources/Aenium-2048x649.png` | `static/images/partners/aenium.png` | PNG |
| ERGON RESEARCH SRL | `resources/Logo Ergon_highres.jpg` | `static/images/partners/ergon.jpg` | JPG |
| COMOTI | `resources/COMOTI-Logo-PNG-EN-3.png` | `static/images/partners/comoti.png` | PNG |

**Modifiche tecniche:**

- `layouts/partners/list.html`: rimossi i blocchi `fileExists`/`logo-placeholder` — ogni `.card-partner__logo` usa direttamente `<img>` con il percorso definitivo.
- `layouts/index.html`: rimosso il blocco `fileExists`/`coordinator-card__logo-placeholder` — la coordinator card nella Home Page usa ora direttamente `hit09.png`.
- Lo SCSS in `_components.scss` (`.card-partner__logo img`) gestisce il sizing: `max-height: 60px; max-width: 200px; object-fit: contain;`

---

### Partner 1 — HIT09 SRL *(Coordinatore)*

| Campo | Valore |
|-------|--------|
| Sito | https://www.hit09.com/advanced-design |
| Paese | 🇮🇹 Italia |
| Ruolo | Project Coordinator |
| File logo | `resources/partners/hit09-logo.png` |

**Descrizione placeholder:**
*"HIT09 SRL is an Italian SME specialized in advanced design and engineering for aerospace and defence applications. As coordinator of DAMAGER, HIT09 leads the consortium and oversees all technical and administrative activities."*

**⚠️ Da fornire internamente:**
- Indirizzo fisico sede HIT09 (per marker sulla mappa)
- Descrizione ufficiale approvata (in sostituzione del placeholder)

---

### Partner 2 — LITHOZ GMBH

| Campo | Valore |
|-------|--------|
| Sito | https://www.lithoz.com/en/ |
| Paese | 🇦🇹 Austria |
| Ruolo | Expert in ceramic additive manufacturing |
| File logo | `resources/partners/lithoz-logo.png` |

**Descrizione placeholder:**
*"Lithoz GmbH is a world-leading Austrian company in the field of high-performance ceramic additive manufacturing. Within DAMAGER, Lithoz contributes its expertise in 3D printing of ceramic components for high-temperature turbine applications."*

**⚠️ Da verificare:**
- Indirizzo preciso sede a Vienna (per marker sulla mappa)
- Conferma che il logo può essere usato sul sito del progetto

---

### Partner 3 — AENIUM ENGINEERING SL

| Campo | Valore |
|-------|--------|
| Sito | https://aenium.es/ |
| Paese | 🇪🇸 Spagna |
| Ruolo | Expert in metal additive manufacturing |
| File logo | `resources/partners/aenium-logo.png` |

**Descrizione placeholder:**
*"Aenium Engineering SL is a Spanish company specializing in metal additive manufacturing and advanced materials. In DAMAGER, Aenium focuses on the manufacturing of metallic turbojet components using cutting-edge AM processes."*

**⚠️ Da verificare:**
- Città e indirizzo sede (per marker sulla mappa) — verificabile sul sito
- Descrizione ufficiale in inglese

---

### Partner 4 — ERGON RESEARCH SRL

| Campo | Valore |
|-------|--------|
| Sito | https://www.ergonresearch.it/it/ |
| Paese | 🇮🇹 Italia |
| Ruolo | Research — CFD and thermal analysis |
| File logo | `resources/partners/ergon-logo.png` |

**Descrizione placeholder:**
*"Ergon Research SRL is an Italian research company with expertise in aerodynamics, computational fluid dynamics (CFD) and thermal management. Within DAMAGER, Ergon Research leads the aerodynamic design and simulation activities."*

**⚠️ Da fornire internamente:**
- Indirizzo fisico sede Ergon Research (per marker sulla mappa)
- Descrizione ufficiale approvata

---

### Partner 5 — COMOTI

| Campo | Valore |
|-------|--------|
| Sito | https://comoti.ro/en/home-2/ |
| Paese | 🇷🇴 Romania |
| Ruolo | National R&D institute — testing and validation |
| File logo | `resources/partners/comoti-logo.png` |

**Descrizione placeholder:**
*"COMOTI is the Romanian National R&D Institute for Gas Turbines, specialized in turbomachinery research. In DAMAGER, COMOTI contributes its unique expertise in turbojet testing, experimental validation and performance assessment."*

✅ URL confermato: https://comoti.ro/en/home-2/ — versione EN disponibile.

**⚠️ Da verificare:**
- Indirizzo fisico sede a Bucarest (per marker sulla mappa)


---

### Tabella riepilogativa ✅

| Partner | Logo | Indirizzo | Descrizione EN | Stato |
|---------|------|-----------|----------------|-------|
| HIT09 SRL | ⬜ Da scaricare | ⚠️ Da fornire | ⚠️ Da approvare | In corso |
| LITHOZ GMBH | ⬜ Da scaricare | ⚠️ Da verificare | ⚠️ Placeholder | In corso |
| AENIUM ENGINEERING | ⬜ Da scaricare | ⚠️ Da verificare | ⚠️ Placeholder | In corso |
| ERGON RESEARCH | ⬜ Da scaricare | ⚠️ Da fornire | ⚠️ Da approvare | In corso |
| COMOTI | ⬜ Da scaricare | ⚠️ Da verificare indirizzo | ⚠️ Placeholder | ✅ URL confermato |


---

### ⚠️ Punto aperto generale F0B.4

**[CHIUSO] Loghi integrati nel sito**

I loghi sono stati forniti direttamente dal cliente. Gli indirizzi fisici per la mappa interattiva saranno raccolti in **FASE 7** (Google Maps con cookie consent). Le descrizioni placeholder sono già visibili sul sito — i partner potranno richiedere modifiche prima del go-live.

---

## Verifica finale FASE 0B

### Struttura cartelle

- [x] Cartelle `static/images/logo/`, `static/images/eu-logo/`, `static/images/partners/`, `static/images/uploads/`, `static/documents/` create ✅
- [x] Logo DAMAGER SVG (`assets/images/logo/damager-logo.svg` + copia in `static/`) ✅
- [x] Logo DAMAGER versione bianca (`assets/images/logo/damager-logo-white.svg`) ✅
- [ ] Logo DAMAGER in PNG 512px (opzionale, da generare se necessario per PWA)
- [x] Favicon SVG generato (`static/images/logo/favicon.svg`) ✅
- [ ] Immagini di sfondo create (`compressor-bg.svg`, `turbine-bg.svg`) — da fare in FASE futura
- [x] Logo EU: `resources/Flag_of_Europe.png` → `static/images/eu-logo/flag-of-europe.png` ✅
- [x] Loghi dei 5 partner in `static/images/partners/` ✅

### Informazioni da raccogliere

- [ ] Indirizzo fisico HIT09 SRL (per mappa consorzio — FASE 7)
- [ ] Indirizzo fisico Ergon Research SRL (per mappa consorzio — FASE 7)
- [ ] Indirizzi Lithoz, Aenium e COMOTI (per mappa consorzio — FASE 7)
- [x] URL ufficiale COMOTI → https://comoti.ro/en/home-2/ ✅
- [ ] Descrizioni partner approvate dai partner (i placeholder sono attivi, da confermare prima del go-live)
- [x] LinkedIn DAMAGER → https://www.linkedin.com/company/damager-edf-project/posts/ ✅
- [ ] Twitter/X DAMAGER (verificare se esiste)
- [ ] Linee guida di comunicazione EDF da HIT09


---

## Riferimenti utili

| Risorsa | URL |
|---------|-----|
| Inkscape (download) | https://inkscape.org/release/ |
| favicon.io converter | https://favicon.io/favicon-converter/ |
| Cloudconvert PDF→SVG | https://cloudconvert.com/pdf-to-svg |
| Logo EU ufficiali | https://commission.europa.eu/resources-and-tools/resources/logos-and-visual-identity_en |
| Portale EDF/DEFIS | https://defence-industry-space.ec.europa.eu/european-defence-fund_en |

---

## Nota per la FASE 1 — Migrazione degli asset nel progetto Hugo

Al termine di questa fase, gli asset si trovano in `resources/` (cartella sorgente, esterna al progetto Hugo).

Quando nella **FASE 1** verrà inizializzato il progetto Hugo con `hugo new site .`, gli asset elaborati dovranno essere copiati in `static/images/`, che è la directory pubblica di Hugo (tutto ciò che si trova in `static/` viene servito direttamente dal sito).

La corrispondenza tra le cartelle è la seguente:

| Cartella sorgente (FASE 0B) | Destinazione nel progetto Hugo (FASE 1) |
|-----------------------------|------------------------------------------|
| `resources/logo/` | `static/images/logo/` |
| `resources/eu-logo/` | `static/images/eu-logo/` |
| `resources/backgrounds/` | `static/images/backgrounds/` |
| `resources/partners/` | `static/images/partners/` |
| `resources/turbojet.png` | `static/images/turbojet.png` |
| `resources/kickoff.jpg` | `static/images/uploads/kickoff.jpg` |
| `resources/FACTSHEET_EDF_...pdf` | `static/documents/` |

> La cartella `resources/` nella root del repository rimane come archivio dei file sorgente originali (PDF, ecc.). Le sottocartelle con gli asset elaborati vengono copiate in `static/images/` durante la FASE 1.

---

**File correlato:** `docs/FASE_0A_Setup_Stack.md` — configurazione Git, Netlify, Hugo  
**Fase successiva:** `docs/FASE_1_Setup_Hugo_CMS.md`

---

*Documento FASE 0B — Progetto DAMAGER Website | Versione 1.0 | Marzo 2026*
