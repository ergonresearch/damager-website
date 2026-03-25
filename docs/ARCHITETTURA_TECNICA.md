# 🏗️ ARCHITETTURA TECNICA — DAMAGER Website
**Documento di sviluppo DAMAGER Website**  
**Versione:** 1.0 | **Data:** Marzo 2026  
**Destinatari:** Sviluppatori, Responsabile tecnico  
**Obiettivo:** Descrivere stack tecnologico, architettura, CMS, hosting e sicurezza

---

## 1. STACK TECNOLOGICO

### 1.1 Motivazioni della scelta

#### Vincoli progettuali di partenza

Le scelte tecnologiche sono state guidate da tre vincoli non negoziabili:

1. **Costo zero per l'hosting** — il budget disponibile copre solo il dominio (~10-15€/anno)
2. **Gestione contenuti senza codice** — personale non tecnico deve poter inserire news, PDF e informazioni autonomamente
3. **Conformità GDPR automatica** — la gestione dei cookie deve essere corretta per legge senza configurazioni complesse

#### Perché non le alternative popolari

**WordPress:**

| Aspetto | WordPress | Hugo + Decap CMS |
|---------|-----------|-----------------|
| Hosting | A pagamento (~5-10€/mese) | Gratuito (Netlify) |
| Sicurezza | PHP + DB + plugin — aggiornamenti costanti | Sito statico, nessuna superficie di attacco |
| Velocità | Variabile, spesso lenta | Velocissima (HTML pre-generato) |
| Manutenzione | Aggiornamenti mensili obbligatori | Zero manutenzione software |
| Costo 4 anni | ~240-480€ (solo hosting) | ~40-60€ (solo dominio) |

**Webflow / Wix / Squarespace:** dominio personalizzato a pagamento (min. 16-23$/mese), vendor lock-in totale — esclusi.

**Ghost:** richiede un server Node.js (min. 9$/mese managed) — escluso.

**HTML statico puro:** gratuito e veloce, ma impossibile da gestire senza sviluppatore — escluso.

#### Perché Hugo

| Generatore | Linguaggio | Velocità build | Note |
|------------|-----------|----------------|------|
| **Hugo** ✅ | Go | Eccellente (ms/pagina) | Binary singolo, nessuna dipendenza npm/Ruby |
| Jekyll | Ruby | Lenta su siti grandi | Dipendenze complesse su Windows |
| Eleventy | JavaScript | Buona | Richiede Node.js |
| Astro / Next.js | JavaScript | Buona | Sovradimensionato per sito istituzionale |

Hugo è stato scelto perché:
- **Eseguibile singolo** — nessuna dipendenza esterna, funziona subito su qualsiasi OS
- **Build più veloce** tra tutti i generatori statici
- **Maturo e stabile** — usato da CERN, Kubernetes, Let's Encrypt
- Su Windows: `winget install Hugo.Hugo.Extended` (un solo comando)
- **Decap CMS si integra nativamente** con Hugo

#### Perché Decap CMS

| CMS | Costo | Richiede server | Note |
|-----|-------|-----------------|------|
| **Decap CMS** ✅ | Gratuito | No (Git-based) | Open source, integrazione Hugo nativa |
| Contentful / Sanity | Gratuito (limitato) | Sì (SaaS) | Vendor lock-in, limiti nel free |
| Forestry / Tina | Gratuito (limitato) | Sì (SaaS) | Forestry chiuso, Tina richiede account |
| Strapi | Gratuito (self-hosted) | Sì (Node.js) | Richiede VPS, costi hosting |

Decap CMS è stato scelto perché:
- **Git-based**: i contenuti vivono come file Markdown nel repository GitHub — backup automatico, nessun database, nessun vendor lock-in
- **Pannello admin via browser** — nessun software da installare per gli editor
- **Gratuito e open source** — il progetto non dipende da nessuna azienda
- Integrazione nativa con **Netlify Identity**
- Supporta **upload file** (PDF, immagini) direttamente dal pannello
- Interfaccia **WYSIWYG** — accessibile a personale non tecnico

#### Perché Netlify

| Hosting | Form | Identity/Auth | Deploy auto | CDN |
|---------|------|---------------|-------------|-----|
| **Netlify** ✅ | Sì (100/mese) | Sì | Sì | Sì |
| GitHub Pages | No | No | Sì (Actions) | Limitato |
| Vercel | No | No | Sì | Eccellente |
| Cloudflare Pages | No | No | Sì | Eccellente |

Netlify è l'**unica piattaforma** che include gratuitamente: hosting + form processing + Identity management + deploy automatico.

> Vercel e Cloudflare Pages hanno CDN superiore, ma senza form processing né Identity. Per le stesse funzionalità richiederebbero Formspree (form) + Auth0 (Identity) — complessità aggiuntiva e limiti nel piano gratuito.

#### Sito statico vs. dinamico

| Aspetto | Sito statico (Hugo) | Sito dinamico (WordPress) |
|---------|---------------------|--------------------------|
| Sicurezza | Nessun DB, nessun PHP, nessun attacco SQL/XSS | Vulnerabile senza aggiornamenti costanti |
| Velocità | Pagine pre-generate su CDN globale | Generazione server-side a ogni richiesta |
| Affidabilità | Nessun server da gestire | Dipende dall'uptime del server |
| Costo | Hosting gratuito (Netlify) | Hosting a pagamento |
| Longevità | Funziona per anni senza aggiornamenti | Richiede manutenzione continua |

L'unico limite: le modifiche ai contenuti richiedono un rebuild (1-2 minuti). Per un sito istituzionale di ricerca aggiornato qualche volta al mese, è completamente accettabile.

---

### 1.2 Stack completo

```
┌──────────────────────┬──────────────────────────────────────────────┐
│ Static Site Generator│ Hugo Extended (SCSS incluso)                 │
├──────────────────────┼──────────────────────────────────────────────┤
│ CMS pannello admin   │ Decap CMS — accessibile su /admin            │
├──────────────────────┼──────────────────────────────────────────────┤
│ Hosting              │ Netlify (piano gratuito)                     │
│                      │ 100 GB banda/mese, HTTPS, CDN, deploy auto   │
├──────────────────────┼──────────────────────────────────────────────┤
│ Autenticazione CMS   │ Netlify Identity (gratuito, fino a 1.000 ut.)│
├──────────────────────┼──────────────────────────────────────────────┤
│ Form contatti        │ Netlify Forms (gratuito, 100 sub/mese)       │
├──────────────────────┼──────────────────────────────────────────────┤
│ Repository           │ GitHub (pubblico)                            │
├──────────────────────┼──────────────────────────────────────────────┤
│ Cookie Consent       │ Vanilla Cookie Consent (open source)         │
├──────────────────────┼──────────────────────────────────────────────┤
│ Analytics            │ Google Analytics 4 (gratuito)                │
├──────────────────────┼──────────────────────────────────────────────┤
│ Mappe                │ Google Maps Embed (gratuito)                 │
├──────────────────────┼──────────────────────────────────────────────┤
│ Font                 │ Google Fonts — Inter / Montserrat            │
├──────────────────────┼──────────────────────────────────────────────┤
│ Dominio              │ damager.eu (~10-15€/anno) — acquisto FASE 8  │
└──────────────────────┴──────────────────────────────────────────────┘
```

---

### 1.3 Strategia a tre ambienti

| Ambiente | URL | Quando si usa |
|----------|-----|---------------|
| **Locale** | `http://localhost:1313` | Sviluppo quotidiano (hugo server) |
| **Staging** | `https://damager-website.netlify.app` | Test CMS, form, Identity, Maps |
| **Produzione** | `https://damager.eu` | Solo quando il sito è stabile (FASE 8) |


Il form di contatto e il pannello CMS funzionano **solo** sull'ambiente Netlify (non in locale).  
Il passaggio da staging a produzione richiede solo la configurazione DNS — il sito rimane identico.

---

### 1.4 Architettura del flusso

```
Editor non tecnico
     │
     ▼ (browser)
damager.eu/admin  ←─── Decap CMS
     │
     │ Salva contenuto come file Markdown + assets
     ▼
GitHub Repository  ←─── File .md + immagini/PDF in /content
     │
     │ Webhook automatico
     ▼
Netlify Build  ←─── Hugo compila il sito (~1-2 minuti)
     │
     │ Deploy
     ▼
damager.eu  ←─── Sito aggiornato live
```

---

### 1.5 Struttura del repository Hugo

```
damager-website/
├── hugo.toml                  # Configurazione Hugo (baseURL, menu, params)
├── netlify.toml               # Configurazione build Netlify + redirects
├── .gitignore
├── content/
│   ├── _index.md              # Home page (front matter)
│   ├── contact-success.md     # Pagina conferma form di contatto
│   ├── project/
│   │   └── _index.md          # Project page
│   ├── partners/
│   │   └── _index.md          # Partners page
│   └── media/
│       ├── _index.md          # Media page
│       ├── news/
│       │   ├── _index.md
│       │   └── 2025-12-01-kickoff-meeting.md  # Primo news item
│       ├── documents/
│       │   ├── _index.md
│       │   ├── factsheet-2024.md              # Factsheet EDF 2024
│       │   └── press-release-2025.md          # Press Release Kickoff Meeting
│       └── papers/
│           └── _index.md
├── layouts/
│   ├── _default/
│   │   ├── baseof.html        # Template base HTML (head, header, footer, JS)
│   │   ├── single.html        # Template pagina singola generica
│   │   └── list.html          # Template lista generica
│   ├── partials/
│   │   ├── header.html        # Header sticky con menu + hamburger mobile
│   │   ├── footer.html        # Footer con EU disclaimer + link legali
│   │   └── timeline.html      # Partial timeline con aeroplano SVG
│   ├── index.html             # Template Home page (5 sezioni)
│   ├── project/
│   │   └── list.html          # Template Project page (4 sezioni)
│   ├── partners/
│   │   └── list.html          # Template Partners page (3 sezioni)
│   └── media/
│       ├── list.html          # Template Media page (tab navigation)
│       └── news/
│           └── single.html    # Template articolo singolo news
├── assets/
│   ├── scss/
│   │   ├── main.scss          # Entry point — importa tutti i partial
│   │   ├── _variables.scss    # Palette colori, font, spacing, breakpoints
│   │   ├── _base.scss         # Reset, tipografia, container, helper
│   │   ├── _header.scss       # Header sticky, menu desktop, hamburger mobile
│   │   ├── _footer.scss       # Footer EU disclaimer, link legali
│   │   ├── _components.scss   # Card (news, doc, partner), bottoni, form, progress bar, tab nav
│   │   ├── _timeline.scss     # Timeline animata con aeroplano SVG
│   │   ├── _home.scss         # Stili specifici Home page (hero, eu-disclaimer)
│   │   ├── _project.scss      # Stili specifici Project page (tabella, intro, quote)
│   │   ├── _partners.scss     # Stili specifici Partners page (stat box, coordinator badge, mappa)
│   │   └── _media.scss        # Stili specifici Media page (news list, doc groups, paper entries)
│   └── js/
│       └── main.js            # JS: hamburger menu, progress bar, timeline, tab navigation
├── static/
│   ├── admin/
│   │   ├── index.html         # Pannello Decap CMS
│   │   └── config.yml         # Configurazione CMS (3 collezioni: news, documents, papers)
│   ├── images/
│   │   ├── logo/              # Logo DAMAGER (placeholder — file definitivi in FASE 0B)
│   │   ├── backgrounds/       # Sfondi blueprint (placeholder — file definitivi in FASE 0B)
│   │   ├── eu-logo/           # Logo EU (placeholder — file definitivi in FASE 0B)
│   │   ├── partners/          # Loghi partner (placeholder — file definitivi in FASE 0B)
│   │   └── uploads/           # Immagini caricate da CMS (foto news, ecc.)
│   └── documents/             # PDF scaricabili (factsheet, press release, deliverable, ecc.)
└── docs/                      # Documentazione di progetto
    ├── PROGETTO_DAMAGER_WEBSITE.md
    ├── SPECIFICHE_SITO.md
    ├── ARCHITETTURA_TECNICA.md
    ├── FASE_0_Preparazione.md
    ├── FASE_0A_Setup_Stack.md
    ├── FASE_0B_Raccolta_Asset.md
    ├── FASE_1_Setup_Hugo_CMS.md
    ├── FASE_2_Template.md
    ├── FASE_3_Home.md
    ├── FASE_4_Project.md
    ├── FASE_5_Partners.md
    └── FASE_6_Media.md
```

---

## 2. CMS — PANNELLO ADMIN (Decap CMS)

### 2.1 Accesso

- **URL:** `https://damager.eu/admin`
- **Autenticazione:** Netlify Identity (email + password)
- **Nessun account GitHub richiesto** per gli editor
- **Invito:** il coordinatore HIT09 invita gli editor via email dal pannello Netlify

### 2.2 Configurazione `static/admin/config.yml`

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "static/images/uploads"
public_folder: "/images/uploads"

collections:
  # News & Events
  - name: "news"
    label: "News & Events"
    folder: "content/media/news"
    create: true
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Type", name: "type", widget: "select", options: ["News", "Event"]}
      - {label: "Body", name: "body", widget: "markdown"}
      - {label: "Featured Image", name: "image", widget: "image", required: false}
      - {label: "External Link", name: "link", widget: "string", required: false}
      - {label: "Tags", name: "tags", widget: "list", required: false}

  # Documents
  - name: "documents"
    label: "Documents"
    folder: "content/media/documents"
    create: true
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Category", name: "category", widget: "select",
         options: ["Fact Sheet", "Public Deliverable", "Press Release"]}
      - {label: "Description", name: "description", widget: "text"}
      - {label: "PDF File", name: "pdf", widget: "file", media_library: {config: {multiple: false}}}
      - {label: "Date", name: "date", widget: "datetime"}

  # Academic Papers
  - name: "papers"
    label: "Academic Papers"
    folder: "content/media/papers"
    create: true
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Authors", name: "authors", widget: "string"}
      - {label: "Conference/Journal", name: "venue", widget: "string"}
      - {label: "Year", name: "year", widget: "number"}
      - {label: "Abstract", name: "abstract", widget: "text"}
      - {label: "PDF File", name: "pdf", widget: "file", required: false}
      - {label: "DOI Link", name: "doi", widget: "string", required: false}
      - {label: "Tags", name: "tags", widget: "list", required: false}

  # Partners
  - name: "partners"
    label: "Partners"
    folder: "content/partners"
    create: false
    fields:
      - {label: "Name", name: "title", widget: "string"}
      - {label: "Country", name: "country", widget: "string"}
      - {label: "Logo", name: "logo", widget: "image"}
      - {label: "Website", name: "website", widget: "string"}
      - {label: "Role", name: "role", widget: "string"}
      - {label: "Description", name: "body", widget: "markdown"}
```

### 2.3 Funzionamento Git Gateway

Decap CMS usa **Netlify Identity + Git Gateway** per scrivere nel repository:
- L'editor si autentica tramite Netlify Identity (email + password)
- Decap CMS chiama Git Gateway (un servizio Netlify) che ha accesso al repository GitHub
- Il contenuto viene salvato come commit nel branch `main`
- Netlify fa il build automaticamente e pubblica il sito aggiornato

> **Nota importante sul flusso dei contenuti CMS:**  
> La configurazione `branch: main` nel `config.yml` fa sì che ogni salvataggio dal pannello CMS produca un commit direttamente su `main`, bypassando il branch `develop`. Questo comportamento è **intenzionale e standard** per Decap CMS: gli editor non tecnici pubblicano su produzione direttamente dal pannello web, senza interazione con Git.  
> Il flusso `develop → main` riguarda esclusivamente lo **sviluppatore tecnico** che lavora su layout, template e SCSS. I due flussi sono indipendenti e non si sovrappongono.

### Problema noto — Git Gateway e ordine di attivazione

Dopo aver abilitato Git Gateway nel pannello Netlify (Identity → Services → Enable Git Gateway), il pannello CMS (`/admin`) può mostrare l'errore:

> *"Your Git Gateway backend is not returning valid settings. Please make sure it is enabled."*

La console del browser riporta: `GET /.netlify/git/settings → 404 (Not Found)`

**Causa:** Git Gateway viene abilitato a livello di configurazione, ma le rotte interne `/.netlify/git/` vengono registrate sul CDN di Netlify soltanto al **deploy successivo** all'attivazione.

**Soluzione:** eseguire un nuovo deploy manuale del sito senza modifiche al codice:
- Pannello Netlify → **Deploys** → **"Trigger deploy"** → **"Deploy site"**
- Attendere che il deploy raggiunga lo stato "Published"
- Ricaricare `/admin` — il CMS sarà pienamente operativo

> Nota: questo problema si manifesta solo la prima volta che Git Gateway viene abilitato, oppure dopo una sua disattivazione e riattivazione. Non si ripresenta nei deploy ordinari.

---

## 3. CONFIGURAZIONE NETLIFY

### 3.1 File `netlify.toml`

```toml
[build]
  command = "hugo --minify"
  publish = "public"

[build.environment]
  HUGO_VERSION = "0.158.0"   # ← versione installata: v0.158.0+extended (marzo 2026)

  HUGO_ENV = "production"
  HUGO_ENABLEGITINFO = "true"

[[redirects]]
  from = "/admin"
  to = "/admin/index.html"
  status = 200

[context.deploy-preview]
  command = "hugo --buildFuture -b $DEPLOY_PRIME_URL"

[context.branch-deploy]
  command = "hugo -b $DEPLOY_PRIME_URL"
```

### 3.2 Configurazione branch

| Branch | Deploy | URL |
|--------|--------|-----|
| `main` | Produzione automatica | `damager-website.netlify.app` (poi `damager.eu`) |
| `develop` | No deploy automatico | Solo locale |


### 3.3 Variabili d'ambiente Netlify

Configurate nel pannello Netlify → "Site settings" → "Environment variables":

| Variabile | Contenuto | Note |
|-----------|-----------|------|
| `HUGO_VERSION` | `0.158.0` | Versione Hugo da usare in build |
| `GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Google Analytics 4 tracking ID |

> Le chiavi API non devono mai essere committate nel repository.

### 3.4 Limiti piano gratuito Netlify

| Risorsa | Limite free | Sufficiente? |
|---------|-------------|-------------|
| Banda | 100 GB/mese | ✅ Sì |
| Build minutes | 300 min/mese (~100 build) | ✅ Sì |
| Form submissions | 100/mese | ✅ Sì |
| Netlify Identity | Fino a 1.000 utenti | ✅ Sì |
| URL staging `*.netlify.app` | Gratuito, permanente | ✅ Sì |

---

## 4. CONFIGURAZIONE DOMINIO E DNS

> ⏸️ **Acquisto differito alla FASE 8.** Il sito si sviluppa e testa su `damager-website.netlify.app`.


### 4.1 Registrazione `damager.eu`

- Registrante: **HIT09 SRL** (coordinatore del progetto, sede in Italia ✅)
- Registrar consigliato: **OVH** (~9-11€/anno) o **Aruba** (~10-13€/anno, supporto IT)
- Pre-verifica disponibilità: https://www.eurid.eu/it/ottieni-il-tuo-eu/


### 4.2 Record DNS → Netlify

```
Tipo    Nome    Valore
A       @       75.2.60.5
CNAME   www     damager-website.netlify.app

```

### 4.3 HTTPS

Automatico via **Let's Encrypt** — Netlify gestisce il certificato SSL senza configurazione manuale.

---

## 5. SICUREZZA

| Aspetto | Soluzione |
|---------|-----------|
| HTTPS | Automatico via Let's Encrypt (Netlify) |
| SQL injection | Impossibile — sito statico, nessun database |
| XSS | Mitigato da assenza di PHP e rendering server-side |
| Accesso CMS | Netlify Identity + password — "Invite only" |
| File upload | Solo tramite CMS autenticato → commit firmato su GitHub |
| Form spam | Honeypot nascosto nel form HTML |
| Credenziali | Mai nel codice — variabili d'ambiente Netlify |
| Aggiornamenti | Nessun software da aggiornare (no WordPress, no PHP, no plugin) |

---

## 6. IMPLEMENTAZIONE COOKIE CONSENT

### 6.1 Integrazione Vanilla Cookie Consent

```html
<!-- Da inserire in layouts/_default/baseof.html o in un partial dedicato -->
<!-- Inserire nel <head> di baseof.html -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vanilla-cookieconsent/dist/cookieconsent.css"/>
<script defer src="https://cdn.jsdelivr.net/npm/vanilla-cookieconsent/dist/cookieconsent.umd.js"></script>
```

### 6.2 Caricamento condizionale Google Analytics

Google Analytics viene caricato **solo** dopo il consenso dell'utente per la categoria "analytics":

```javascript
// In assets/js/cookie-init.js
CookieConsent.run({
  categories: {
    necessary: { enabled: true, readOnly: true },
    analytics: {
      autoClear: { cookies: [{name: /^(_ga)/}] },
      onAccept: function() {
        // Carica GA4 solo dopo consenso
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(script);
      }
    },
    maps: {
      onAccept: function() {
        // Riabilita gli iframe Google Maps nascosti
        document.querySelectorAll('.maps-placeholder').forEach(el => {
          el.style.display = 'none';
        });
        document.querySelectorAll('.maps-iframe').forEach(el => {
          el.style.display = 'block';
        });
      }
    }
  }
});
```

### 6.3 Google Maps con consenso condizionale

```html
<!-- Nella template della Partners Page -->
<!-- Mostrato PRIMA del consenso: -->
<div class="maps-placeholder">
  <img src="/images/maps-placeholder.png" alt="Map placeholder">
  <button onclick="CookieConsent.acceptCategory('maps')">Enable Map</button>
</div>

<!-- Mostrato DOPO il consenso: -->
<div class="maps-iframe" style="display:none">
  <iframe src="https://www.google.com/maps/embed?..."></iframe>
</div>
```

---

## 7. WORKFLOW QUOTIDIANO

### Sviluppatore

```bash
git checkout develop          # sempre su develop

# ... modifiche a layout, SCSS, template ...

hugo server                   # anteprima su localhost:1313

git add .
git commit -m "feat: descrizione della modifica"
git push origin develop

# Quando pronti per pubblicare su staging/produzione:
git checkout main
git merge develop
git push origin main          # → Netlify fa il build automaticamente
git checkout develop          # tornare su develop
```

### Editor non tecnico (inserimento contenuti)

1. Aprire `https://damager-website.netlify.app/admin` (o `damager.eu/admin`)

2. Accedere con email e password (invitati dal coordinatore)
3. Selezionare la collezione: News & Events / Documents / Papers
4. Cliccare "New entry" → compilare il form → salvare
5. Il sito si aggiorna automaticamente in 1-2 minuti

---

## Riferimenti tecnici

| Risorsa | URL |
|---------|-----|
| Documentazione Hugo | https://gohugo.io/documentation/ |
| Decap CMS docs | https://decapcms.org/docs/ |
| Netlify docs | https://docs.netlify.com/ |
| Vanilla Cookie Consent | https://cookieconsent.orestbida.com/ |
| Google Analytics 4 | https://analytics.google.com/ |
| Google Maps Embed | https://developers.google.com/maps/documentation/embed/ |

---

*Documento Architettura Tecnica — Progetto DAMAGER Website | Versione 1.0 | Marzo 2026*  
**File correlato:** `docs/SPECIFICHE_SITO.md` — identità visiva, struttura pagine, contenuti
