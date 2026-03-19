# 🗂️ FASE 0B — Raccolta e Preparazione degli Asset
**Documento di sviluppo DAMAGER Website**  
**Versione:** 1.0 | **Data:** Marzo 2026  
**Prerequisiti:** FASE 0A completata (Git, Netlify, Hugo installati)  
**Obiettivo:** Raccogliere e convertire tutti i materiali grafici e testuali necessari al sito prima di iniziare lo sviluppo

---

## Checklist di fase

- [ ] F0B.1 — Estrazione e conversione logo DAMAGER da PDF
- [ ] F0B.2 — Creazione immagini di sfondo da `background_template.pdf`
- [ ] F0B.3 — Download logo ufficiale EU "Funded by the European Union"
- [ ] F0B.4 — Raccolta loghi e descrizioni dei 5 partner del consorzio
- [ ] Verifica finale struttura cartelle

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
├── DAMAGER_logo.pdf          ✅ Presente (sorgente)
├── background_template.pdf   ✅ Presente (sorgente)
├── turbojet.png              ✅ Presente
├── FACTSHEET_EDF_...pdf      ✅ Presente
├── foto_kickoff.jpg          ✅ Presente (usata in Media → Kickoff Meeting news)
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

## F0B.1 — Estrazione e conversione logo DAMAGER da PDF

**File sorgente:** `resources/DAMAGER_logo.pdf`

**Formati da produrre:**

| File da creare | Formato | Utilizzo |
|----------------|---------|----------|
| `resources/logo/damager-logo.svg` | Vettoriale SVG | Header, documenti |
| `resources/logo/damager-logo-white.svg` | Vettoriale SVG bianco | Header su sfondo nero |
| `resources/logo/damager-logo-512.png` | PNG 512×512 px | Favicon grande, PWA |
| `resources/logo/damager-logo-192.png` | PNG 192×192 px | PWA manifest |
| `resources/logo/favicon.ico` | ICO 32+16 px | Tab del browser |

---

### Metodo A — Inkscape *(raccomandato, gratuito)*

1. Scaricare Inkscape da https://inkscape.org/release/ (versione Windows 64-bit)
2. Aprire il file: `File` → `Open` → selezionare `resources/DAMAGER_logo.pdf`
3. Inkscape chiederà quale pagina importare → selezionare pagina 1
4. Ispezionare il contenuto: il logo è vettoriale (linee nette) o raster (pixelato al massimo zoom)?
5. Selezionare tutti gli elementi del logo (`Ctrl+A`)
6. Rimuovere eventuali rettangoli di sfondo bianchi non necessari
7. `File` → `Save As` → formato "Plain SVG" → salvare come `damager-logo.svg`
8. Per la versione bianca: selezionare tutti gli elementi → cambiare fill e stroke a `#FFFFFF` → salvare come `damager-logo-white.svg`
9. Per il PNG 512×512: `File` → `Export PNG Image` → width=512, height=512 → `damager-logo-512.png`
10. Per favicon `.ico`: caricare il PNG su https://favicon.io/favicon-converter/

---

### Metodo B — Strumento online *(alternativa rapida)*

Se Inkscape non è disponibile:
1. https://cloudconvert.com/pdf-to-svg oppure https://convertio.co/pdf-svg/
2. Caricare `DAMAGER_logo.pdf` → convertire in SVG → scaricare in `resources/logo/`

> ⚠️ I convertitori online possono produrre SVG con elementi ridondanti. Il file potrebbe richiedere pulizia manuale in Inkscape o in un editor di testo.

---

### Metodo C — Python *(solo PNG, senza SVG)*

```bash
pip install pdf2image pillow
python -c "
from pdf2image import convert_from_path
imgs = convert_from_path('resources/DAMAGER_logo.pdf', dpi=300)
imgs[0].save('resources/logo/damager-logo-512.png')
"
```

> Produce solo PNG (raster), non SVG vettoriale. Usare come fallback se i metodi A e B non sono disponibili.

---

### ⚠️ Punti aperti F0B.1

**[APERTO — da verificare prima di procedere] Tipo di contenuto del PDF**

Aprire `DAMAGER_logo.pdf` con un visualizzatore PDF e zoomare al massimo:
- Se le linee rimangono nette → il logo è **vettoriale** → Metodo A produce SVG perfetto
- Se il logo diventa pixelato → è un'immagine raster incorporata → Metodo A produce SVG di qualità limitata

In caso raster, contattare chi ha creato il logo per ottenere il file sorgente in formato **AI (Adobe Illustrator)**, **EPS** o **SVG nativo**.

**[APERTO] Versione bianca del logo**

Per l'header con sfondo nero servono elementi bianchi. Tre approcci:
1. **CSS `filter: invert(1)`** — rapido, funziona se il logo è solo nero su sfondo trasparente. Nessun file aggiuntivo necessario.
2. **SVG separato con fill `#FFFFFF`** — più pulito, necessario se il logo ha più colori.
3. **Richiedere al designer il file white** — soluzione ideale.

**Raccomandazione:** partire con il CSS filter come soluzione rapida. Se il risultato non è soddisfacente, creare una versione SVG dedicata.

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

## F0B.4 — Raccolta loghi e descrizioni dei 5 partner

**Per ogni partner servono:** logo (PNG/SVG), indirizzo fisico per la mappa, descrizione approvata in inglese.

### Come scaricare i loghi

**Metodo manuale consigliato** (rispetto dei termini d'uso dei siti):

1. Aprire il sito del partner nel browser
2. Tasto destro sul logo → "Salva immagine" se è un PNG/JPG visibile
3. Oppure: `F12` → Inspector → trovare il tag `<img>` o `<svg>` del logo → copiare l'URL → scaricare
4. Salvare in `resources/partners/`

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

### Tabella riepilogativa

| Partner | Logo | Indirizzo | Descrizione EN | Stato |
|---------|------|-----------|----------------|-------|
| HIT09 SRL | ⬜ Da scaricare | ⚠️ Da fornire | ⚠️ Da approvare | In corso |
| LITHOZ GMBH | ⬜ Da scaricare | ⚠️ Da verificare | ⚠️ Placeholder | In corso |
| AENIUM ENGINEERING | ⬜ Da scaricare | ⚠️ Da verificare | ⚠️ Placeholder | In corso |
| ERGON RESEARCH | ⬜ Da scaricare | ⚠️ Da fornire | ⚠️ Da approvare | In corso |
| COMOTI | ⬜ Da scaricare | ⚠️ Da verificare indirizzo | ⚠️ Placeholder | ✅ URL confermato |


---

### ⚠️ Punto aperto generale F0B.4

**[APERTO] Autorizzazione uso loghi**

I loghi sono di proprietà delle rispettive aziende. È buona pratica inviare a ciascun partner una breve email con:
- Richiesta di utilizzare il logo sul sito DAMAGER
- La descrizione placeholder per revisione/approvazione
- La conferma dell'indirizzo fisico per la mappa

Questo evita problemi legali e garantisce informazioni accurate.

---

## Verifica finale FASE 0B

### Struttura cartelle

- [ ] Cartelle create: `resources/logo/`, `resources/eu-logo/`, `resources/backgrounds/`, `resources/partners/`
- [ ] Logo DAMAGER convertito in SVG (`damager-logo.svg`)
- [ ] Logo DAMAGER versione bianca (`damager-logo-white.svg`)
- [ ] Logo DAMAGER in PNG 512px (`damager-logo-512.png`)
- [ ] Favicon generato (`favicon.ico`)
- [ ] Immagini di sfondo create (`compressor-bg.svg`, `turbine-bg.svg`)
- [ ] Logo EU scaricato in SVG e PNG
- [ ] Loghi dei 5 partner scaricati in `resources/partners/`

### Informazioni da raccogliere

- [ ] Indirizzo fisico HIT09 SRL (per mappa consorzio)
- [ ] Indirizzo fisico Ergon Research SRL (per mappa consorzio)
- [ ] Indirizzi Lithoz, Aenium e COMOTI (da verificare online)
- [x] URL ufficiale COMOTI → https://comoti.ro/en/home-2/ ✅
- [ ] Descrizioni partner approvate (o conferma di usare i placeholder)
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

**File correlato:** `docs/FASE_0A_Setup_Stack.md` — configurazione Git, Netlify, Hugo  
**Fase successiva:** `docs/FASE_1_Setup_Hugo_CMS.md`

---

*Documento FASE 0B — Progetto DAMAGER Website | Versione 1.0 | Marzo 2026*
