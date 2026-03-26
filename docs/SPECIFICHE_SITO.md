# 🎨 SPECIFICHE DEL SITO — DAMAGER Website
**Documento di sviluppo DAMAGER Website**  
**Versione:** 1.0 | **Data:** Marzo 2026  
**Destinatari:** Committente (HIT09), Designer, Sviluppatore  
**Obiettivo:** Definire identità visiva, struttura di navigazione e contenuti di ogni pagina

---

## 1. IDENTITÀ VISIVA

### 1.1 Palette colori — Bianco e Nero

Il sito adotta una palette **bianco e nero** coerente con il logo ufficiale DAMAGER:

| Ruolo | Colore | Hex |
|-------|--------|-----|
| Sfondo principale | Bianco puro | `#FFFFFF` |
| Sfondo sezioni alternate | Grigio chiarissimo | `#F5F5F5` |
| Testo principale | Nero | `#000000` |
| Testo secondario | Grigio scuro | `#333333` |
| Accenti / bordi | Grigio medio | `#666666` |
| Hover / link attivi | Nero con sottolineatura | `#000000` |
| Sfondo header/footer | Nero | `#111111` |
| Testo su sfondo scuro | Bianco | `#FFFFFF` |

> La palette monocromatica trasmette serietà istituzionale e tecnologica, coerente con un progetto di difesa EU.

### 1.2 Layout generale

- **Full-width** su tutte le pagine
- **Header fisso (sticky)** in alto: logo a sinistra, navigazione a destra
- **Font:** Sans-serif moderno — Inter, Roboto o Montserrat (Google Fonts, gratuiti)
- **Navigazione:** menu orizzontale con 4 voci principali, nessuno scroll infinito

### 1.3 Asset grafici disponibili

| File | Utilizzo |
|------|----------|
| `resources/DAMAGER_logo.pdf` | Logo nell'header (da convertire in SVG/PNG) |
| `resources/background_template.pdf` | Riferimento per sfondi decorativi (compressore/turbina) |
| `resources/turbojet.png` | Immagine hero della Home page |
| `resources/FACTSHEET_EDF_2024_...pdf` | Testi del progetto + documento scaricabile |

### 1.4 Immagini di sfondo — Blueprint tecnico

Dalle geometrie del `background_template.pdf` si creano immagini decorative (SVG o PNG ad alta risoluzione):
- **Sezione trasversale di un compressore** (pale stilizzate, cerchi concentrici)
- **Ruota di turbina** (profili alari, geometria radiale)

Utilizzo: sfondo semitrasparente nelle sezioni principali del sito.  
Stile consigliato: **wireframe monocromatico** — linee grigio chiaro su sfondo bianco, opacità CSS al 5-10%.

### 1.5 Logo EU/EDF — Disclaimer obbligatorio

Il disclaimer EU deve apparire nella **Home page** e nel **footer** di ogni pagina:

```
Logo: "Funded by the European Union"
Fonte: https://commission.europa.eu/resources-and-tools/resources/logos-and-visual-identity_en

Testo obbligatorio (parola per parola):
"This project has received funding from the European Defence Fund (EDF) under Grant Agreement No. 101224541.
Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those
of the European Union (EU) or European Defence Agency (EDA). Neither the European Union nor the granting
authority can be held responsible for them."
```

Layout: logo EU a sinistra, testo a destra (su desktop); impilati verticalmente su mobile.

---

## 2. STRUTTURA HEADER E NAVIGAZIONE

### 2.1 Header (fisso, sticky)

```
┌─────────────────────────────────────────────────────────────────────┐
│  [DAMAGER LOGO]          Home  |  Project  |  Partners  |  Media   │
│   (sfondo nero, testo bianco)                                       │
└─────────────────────────────────────────────────────────────────────┘
```

- **Logo** a sinistra: versione bianca del logo DAMAGER su sfondo nero
- **Menu** a destra: 4 voci — `Home | Project | Partners | Media`
- Su mobile: menu hamburger
- L'header rimane **sticky** durante lo scroll

### 2.2 Mappa del sito

| Voce menu | URL | Descrizione |
|-----------|-----|-------------|
| Home | `/` | Landing page principale |
| Project | `/project` | Descrizione tecnica del progetto |
| Partners | `/partners` | Consorzio e partner |
| Media | `/media` | News, documenti, eventi, publications |

---

## 3. HOME PAGE (`/`)

Sezioni dall'alto verso il basso:

---

### A) Hero Section

- **Immagine di sfondo full-width:** `turbojet.png`
- **Overlay:** leggero overlay nero semitrasparente per leggibilità
- **Titolo:** `DAMAGER` (grande, bianco, grassetto)
- **Sottotitolo:** *stuDy of Additive ManufActuring for low-cost, low-observable, hiGhly-deployable, expendablE/attritable tuRbojet engines*
- Nessun bottone call-to-action (il menu è sufficiente)

---

### B) EU Funding Disclaimer

- Sfondo bianco o grigio chiarissimo
- Logo EU "Funded by the European Union" (dal sito ufficiale della Commissione Europea)
- Testo disclaimer completo obbligatorio (vedi sezione 1.5)
- Layout: logo a sinistra, testo a destra

---

### C) Project Progress Bar

Barra di avanzamento dinamica calcolata automaticamente in base alla data corrente:

```
Project Progress
01/12/2025 ████░░░░░░░░░░░░░░░░░░ 30/11/2029
           12% — 6 of 48 months completed
```

- **Durata totale:** 48 mesi (01/12/2025 – 30/11/2029)
- **Mostra:** percentuale completata, data inizio/fine, mesi trascorsi su totale
- **Stile:** barra orizzontale bianco/nero con bordo elegante
- La percentuale si aggiorna automaticamente ogni volta che qualcuno carica la pagina

---

### D) Upcoming Events

- Titolo: **"Upcoming Events"**
- Card stilizzata per ogni evento futuro:
  - Bordo nero, sfondo bianco, data in evidenza
  - Titolo, luogo, data, descrizione breve
- Primo evento preconfigurato:
  - **DAMAGER M06 Meeting** — Polonia — data indicativa giugno 2026
- Link "View all events" → `/media#events`


---

### E) Contact us

Form di contatto con i campi:

| Campo | Tipo | Obbligatorio |
|-------|------|-------------|
| Name | Testo | ✅ |
| Email | Email | ✅ |
| Subject | Testo | ✅ |
| Message | Textarea | ✅ |
| [SEND] | Button | — |

- I messaggi vengono inviati a: **info@hit09.com** (Netlify Forms — configurare notifica in dashboard Netlify → Form notifications)
- **Referente:** Rita Ponza — Project Coordinator
- **LinkedIn coordinatore:** https://www.linkedin.com/company/hit09-srl
- Implementazione: Netlify Forms (nessun server necessario)
- Anti-spam: campo honeypot nascosto
- Messaggio di conferma: *"Thank you! Your message has been sent to the project coordinator."*

---

## 4. PROJECT PAGE (`/project`)

---

### A) Intro e Context

Testo estratto dal factsheet EDF ufficiale:

> *"The aim of the project is validating and de-risking of some fundamental technological bricks for the rapid deployment of turbojet-propelled small to medium size, expendable uncrewed aerial vehicles (UAV). Key to reducing the cost and time of manufacturing and deployment of large numbers of UAVs is the development of a low-cost yet high-performance, scalable propulsion system that can be manufactured rapidly in large quantities. Turbojet engines are the ideal candidates, due to their high specific thrust and ease of integration into multiple platforms. Several enabling technologies for highly efficient and low-cost small turbojet engines will be investigated."*

Layout: testo a colonne con immagine decorativa (turbina in stile blueprint) a lato.

---

### B) Project Details

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

### C) Timeline con Aeroplano Stilizzato

Visualizzazione grafica ad alto impatto:

```
[▶ Start]──────[M06]──────[M12]──────[M24]──────[M36]──────[M48 End]
01/12/2025    06/2026    12/2026    12/2027    12/2028    30/11/2029
  Kickoff    First     Mid-term    Second    Pre-final   Project
  Meeting   Review    Review      Review     Review       End
```

- **Aeroplano SVG animato** (CSS animation) che indica la posizione attuale sulla linea
- Milestone completate: cerchio pieno nero
- Milestone future: cerchio vuoto con bordo nero
- Su mobile: layout verticale

---

### D) Research Areas / Technology Focus

4 card con le aree tecnologiche principali:

1. **Additive Manufacturing** — Produzione additiva per componenti turbojet
2. **Low-Cost Propulsion** — Sistemi propulsivi economici ad alte prestazioni
3. **Low-Observable Design** — Riduzione della segnatura radar/termica
4. **Scalable Manufacturing** — Produzione rapida su larga scala

Ogni card: icona tecnica SVG, titolo, breve descrizione.

---

## 5. PARTNERS PAGE (`/partners`)

---

### A) Consortium Overview

- Titolo: **"The DAMAGER Consortium"**
- Intro: 5 partner da 4 Paesi europei (Italia, Austria, Spagna, Romania)

---

### B) Partner Cards

Per ogni partner: logo, nome, paese (con bandiera SVG da `static/images/flags/`), ruolo, descrizione, link al sito ufficiale. Le emoji di bandiera non vengono renderizzate su browser desktop Windows.

---

**Partner 1 — HIT09 SRL** *(Coordinatore)*

| Campo | Valore |
|-------|--------|
| Sito | https://www.hit09.com/advanced-design |
| Paese | 🇮🇹 Italia |
| Ruolo | Project Coordinator |
| Logo | `resources/partners/hit09-logo.png` |
| Descrizione placeholder | *"HIT09 SRL is an Italian SME specialized in advanced design and engineering for aerospace and defence applications. As coordinator of DAMAGER, HIT09 leads the consortium and oversees all technical and administrative activities."* |

⚠️ Indirizzo fisico sede e descrizione ufficiale: **da fornire internamente**.

---

**Partner 2 — LITHOZ GMBH**

| Campo | Valore |
|-------|--------|
| Sito | https://www.lithoz.com/en/ |
| Paese | 🇦🇹 Austria |
| Ruolo | Expert in ceramic additive manufacturing |
| Logo | `resources/partners/lithoz-logo.png` |
| Descrizione placeholder | *"Lithoz GmbH is a world-leading Austrian company in high-performance ceramic additive manufacturing. Within DAMAGER, Lithoz contributes expertise in 3D printing of ceramic components for high-temperature turbine applications."* |

---

**Partner 3 — AENIUM ENGINEERING SL**

| Campo | Valore |
|-------|--------|
| Sito | https://aenium.es/ |
| Paese | 🇪🇸 Spagna |
| Ruolo | Expert in metal additive manufacturing |
| Logo | `resources/partners/aenium-logo.png` |
| Descrizione placeholder | *"Aenium Engineering SL is a Spanish company specializing in metal additive manufacturing and advanced materials. In DAMAGER, Aenium focuses on manufacturing of metallic turbojet components using cutting-edge AM processes."* |

---

**Partner 4 — ERGON RESEARCH SRL**

| Campo | Valore |
|-------|--------|
| Sito | https://www.ergonresearch.it/it/ |
| Paese | 🇮🇹 Italia |
| Ruolo | Research — CFD and thermal analysis |
| Logo | `resources/partners/ergon-logo.png` |
| Descrizione placeholder | *"Ergon Research SRL is an Italian research company with expertise in aerodynamics, CFD and thermal management. Within DAMAGER, Ergon Research leads the aerodynamic design and simulation activities."* |

⚠️ Indirizzo fisico sede e descrizione ufficiale: **da fornire internamente**.

---

**Partner 5 — COMOTI**

| Campo | Valore |
|-------|--------|
| Sito | https://comoti.ro/en/home-2/ |
| Paese | 🇷🇴 Romania |
| Ruolo | National R&D institute — testing and validation |
| Logo | `resources/partners/comoti-logo.png` |
| Descrizione placeholder | *"COMOTI is the Romanian National R&D Institute for Gas Turbines. In DAMAGER, COMOTI contributes unique expertise in turbojet testing, experimental validation and performance assessment."* |

✅ URL confermato: https://comoti.ro/en/home-2/ — versione EN disponibile.


---

### C) Mappa del Consorzio (Google Maps)

- Mappa interattiva Google Maps (embed gratuito) con marker per ogni sede partner
- Stile mappa: monocromatico grigio (Snazzy Maps, coerente con la palette del sito)
- Clic su marker → popup con nome partner e link al sito
- Se l'utente non ha accettato i cookie funzionali → placeholder statico con bottone "Enable Map"

---

## 6. MEDIA PAGE (`/media`)

La sezione Media è gestita interamente tramite il pannello CMS — nessuna conoscenza tecnica necessaria.

Organizzata in sottosezioni accessibili tramite tab:

```
/media
├── News & Events     → news, comunicati, eventi del progetto
├── Documents         → Fact Sheet, Deliverable, Press Release
└── Publications      → pubblicazioni scientifiche
```

---

### A) News & Events

**Chi gestisce:** editor non tecnico tramite pannello CMS  
**Come appare:** lista di card con immagine (opzionale), titolo, data, tipo (News / Event), estratto

Ogni elemento del CMS ha i campi:
- Titolo, Data, Tipo (News / Event), Testo (WYSIWYG), Immagine (opzionale), Link esterno, Tags

**Contenuto iniziale disponibile:**
- 🗞️ **DAMAGER Kickoff Meeting** ✅
  - Foto: `resources/foto_kickoff.jpg`
  - Link LinkedIn: https://www.linkedin.com/posts/damager-edf-project_edf-europeandefencefund-damager-activity-7429165736457162752-bi3g


---

### B) Documents

Ispirazione stilistica: sezione Documents del progetto GARUDA (https://garuda-project.eu/)

Organizzata in **3 categorie**:

**📋 Fact Sheet**
- `FACTSHEET_EDF_2024_LS_RA_SMERO_NT_101224541_DAMAGER.pdf` — già disponibile
- Data: Dicembre 2024

**📦 Public Deliverables**
- Inizialmente vuota: *"Public deliverables will be published here as they become available."*
- Ogni deliverable: numero (es. D1.1), titolo, data, PDF scaricabile

**📰 Press Releases**
- Inizialmente vuota con placeholder

---

### C) Publications

Ogni publication mostra:

```
┌────────────────────────────────────────────────────────────┐
│ [PDF]  Additive Manufacturing of Turbojet Components...    │
│        Authors: Rossi, Bianchi, García et al.              │
│        ASME TurboExpo 2026 — GT2026-XXXXX                  │
│        [Abstract ▼]  [Download PDF]  [DOI Link]            │
└────────────────────────────────────────────────────────────┘
```

Campi CMS: titolo, autori, journal/conference, anno, abstract, PDF (upload), DOI link, tags.  
Inizialmente vuota: *"Publications will appear here as they are accepted and cleared for public release."*

---

## 7. GESTIONE DEI COOKIE — CONFORMITÀ GDPR E LEGGE ITALIANA

### 7.1 Riferimenti normativi

- **Regolamento UE 2016/679** (GDPR)
- **D.Lgs. 196/2003** (Codice Privacy italiano, aggiornato con D.Lgs. 101/2018)
- **Provvedimento Garante Privacy** dell'8 gennaio 2015 sui cookie
- **Linee guida EDPB 05/2020** sui consensi

### 7.2 Tipologie di cookie sul sito

| Categoria | Cookie | Consenso richiesto |
|-----------|--------|-------------------|
| Tecnici / Strettamente necessari | Cookie di sessione Netlify, preferenze consenso | ❌ NO |
| Analitici (anonimizzati) | Google Analytics 4 (IP anonimizzato) | ✅ SÌ |
| Funzionali | Google Maps embed | ✅ SÌ |
| Marketing/Profilazione | Nessuno previsto | — |

### 7.3 Comportamento del banner cookie

**Strumento:** Vanilla Cookie Consent (open source, gratuito — https://cookieconsent.orestbida.com/)

1. Al primo accesso → banner in basso con: **"Accept All"** / **"Reject Non-Essential"** / **"Preferences"**
2. Google Analytics si carica **solo dopo** consenso analitici
3. Google Maps si carica **solo dopo** consenso funzionali (altrimenti: immagine statica + bottone "Enable Map")
4. Il form di contatto (Netlify Forms) è tecnico → **nessun consenso richiesto**
5. Preferenze salvate per **12 mesi**
6. Link nel footer: **"Cookie Preferences"** per modificare le scelte in qualsiasi momento

### 7.4 Pagine legali da creare

| Pagina | URL | Contenuto |
|--------|-----|-----------|
| Privacy Policy | `/privacy-policy` | Informativa GDPR completa |
| Cookie Policy | `/cookie-policy` | Elenco cookie: nome, finalità, durata, titolare |

---

*Documento Specifiche Sito — Progetto DAMAGER Website | Versione 1.0 | Marzo 2026*  
**File correlato:** `docs/ARCHITETTURA_TECNICA.md` — stack, CMS, hosting, sicurezza
