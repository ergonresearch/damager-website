# ⚙️ FASE 1 — Setup Progetto Hugo + Decap CMS
**Documento di sviluppo DAMAGER Website**  
**Versione:** 1.0 | **Data:** Marzo 2026  
**Prerequisiti:** FASE 0A completata (Git, Netlify, Hugo Extended v0.158.0 installati)  
**Obiettivo:** Inizializzare il progetto Hugo, creare la struttura di cartelle, configurare Decap CMS e fare il primo deploy funzionante su Netlify

---

## Checklist di fase

- [x] F1.1 — Progetto Hugo inizializzato (`hugo new site . --force`) ✅
- [x] F1.2 — `hugo.toml` configurato ✅
- [x] F1.3 — Struttura cartelle tema custom creata (layouts, assets, static) ✅
- [x] F1.4 — Decap CMS configurato (`static/admin/config.yml`) ✅
- [x] F1.5 — Netlify Identity verificato *(già abilitato in FASE 0A)* ✅
- [x] F1.6 — `netlify.toml` configurato ✅
- [x] F1.7 — Primo deploy su Netlify verificato (sito raggiungibile su staging) ✅

---

## F1.1 — Inizializzazione progetto Hugo

> **Attenzione:** la directory del progetto contiene già file (`docs/`, `resources/`, `.gitignore`, `README.md`). Il comando `hugo new site` va eseguito con il flag `--force` per non sovrascrivere i file esistenti.

```bash
cd C:\Users\fabio.vettori\Development\damager
hugo new site . --force
```

Questo comando crea le seguenti cartelle (se non esistono già):

```
archetypes/
assets/
content/
data/
layouts/
static/
themes/
```

Verificare che la struttura sia stata creata:

```bash
dir
# Devono comparire le cartelle Hugo + docs/ e resources/ già presenti
```

---

## F1.2 — Configurazione `hugo.toml`

Sostituire il contenuto del file `hugo.toml` generato da Hugo con la configurazione del progetto:

```toml
baseURL = "https://damager.eu/"
languageCode = "en-us"
title = "DAMAGER"
theme = ""   # tema custom inline, nessun tema esterno

[params]
  description = "stuDy of Additive ManufActuring for low-cost, low-observable, hiGhly-deployable, expendablE/attritable tuRbojet engines"
  projectStart = "2025-12-01"
  projectEnd   = "2029-11-30"
  linkedin     = "https://www.linkedin.com/company/damager-edf-project/posts/"

[menu]
  [[menu.main]]
    name   = "Home"
    url    = "/"
    weight = 1
  [[menu.main]]
    name   = "Project"
    url    = "/project/"
    weight = 2
  [[menu.main]]
    name   = "Partners"
    url    = "/partners/"
    weight = 3
  [[menu.main]]
    name   = "Media"
    url    = "/media/"
    weight = 4

[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true   # permette HTML inline nei file Markdown

[outputs]
  home = ["HTML"]
  page = ["HTML"]
  section = ["HTML"]
```

---

## F1.3 — Struttura cartelle tema custom

Il progetto usa un **tema custom inline** (senza tema esterno), con tutti i layout e gli stili nella root del progetto.

### Cartelle da creare

```bash
# Layout templates
mkdir -p layouts\_default
mkdir -p layouts\partials
mkdir -p layouts\index.html   # non una cartella - vedi sotto

# SCSS
mkdir -p assets\scss

# JavaScript
mkdir -p assets\js

# Immagini statiche
mkdir -p static\images\logo
mkdir -p static\images\eu-logo
mkdir -p static\images\backgrounds
mkdir -p static\images\partners
mkdir -p static\images\uploads

# Documenti PDF scaricabili
mkdir -p static\documents

# CMS admin
mkdir -p static\admin

# Contenuti
mkdir -p content\project
mkdir -p content\partners
mkdir -p content\media\news
mkdir -p content\media\documents
mkdir -p content\media\publications
```

> Su Windows PowerShell usare `New-Item -ItemType Directory -Force -Path <path>` oppure `mkdir -p` se supportato.

### File di layout base da creare

I file verranno completati nella FASE 2 (template grafico). In questa fase si creano versioni minimali funzionanti:

**`layouts/_default/baseof.html`** — template base per tutte le pagine:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ if .IsHome }}{{ .Site.Title }}{{ else }}{{ .Title }} — {{ .Site.Title }}{{ end }}</title>
  {{ $style := resources.Get "scss/main.scss" | toCSS | minify }}
  <link rel="stylesheet" href="{{ $style.RelPermalink }}">
</head>
<body>
  {{ partial "header.html" . }}
  <main>
    {{ block "main" . }}{{ end }}
  </main>
  {{ partial "footer.html" . }}
</body>
</html>
```

**`layouts/partials/header.html`** — header placeholder (sarà completato in FASE 2):

```html
<header class="site-header">
  <div class="container">
    <a href="/" class="logo">DAMAGER</a>
    <nav>
      {{ range .Site.Menus.main }}
        <a href="{{ .URL }}">{{ .Name }}</a>
      {{ end }}
    </nav>
  </div>
</header>
```

**`layouts/partials/footer.html`** — footer placeholder (sarà completato in FASE 2):

```html
<footer class="site-footer">
  <div class="container">
    <p><em>This project has received funding from the European Defence Fund (EDF) under Grant Agreement No. 101224541. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union (EU) or European Defence Agency (EDA). Neither the European Union nor the granting authority can be held responsible for them.</em></p>
    <p>&copy; {{ now.Year }} DAMAGER Consortium</p>
  </div>
</footer>
```

**`layouts/_default/single.html`** — template pagina singola:

```html
{{ define "main" }}
<article class="page">
  <div class="container">
    <h1>{{ .Title }}</h1>
    {{ .Content }}
  </div>
</article>
{{ end }}
```

**`layouts/_default/list.html`** — template lista:

```html
{{ define "main" }}
<section class="list-page">
  <div class="container">
    <h1>{{ .Title }}</h1>
    {{ .Content }}
    {{ range .Pages }}
      <article>
        <h2><a href="{{ .RelPermalink }}">{{ .Title }}</a></h2>
        <p>{{ .Summary }}</p>
      </article>
    {{ end }}
  </div>
</section>
{{ end }}
```

**`layouts/index.html`** — template Home page (placeholder, sarà riscritto in FASE 3):

```html
{{ define "main" }}
<section class="hero">
  <div class="container">
    <h1>DAMAGER</h1>
    <p>stuDy of Additive ManufActuring for low-cost, low-observable, hiGhly-deployable, expendablE/attritable tuRbojet engines</p>
  </div>
</section>
{{ end }}
```

### File SCSS base da creare

**`assets/scss/main.scss`** — entry point (placeholder minimale):

```scss
// DAMAGER Website — Main stylesheet
// Placeholder: sarà completato nella FASE 2

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: sans-serif;
  color: #000;
  background: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.site-header {
  background: #111;
  color: #fff;
  padding: 1rem 0;

  .logo { color: #fff; text-decoration: none; font-weight: bold; font-size: 1.5rem; }

  nav {
    display: inline-block;
    margin-left: 2rem;
    a { color: #fff; text-decoration: none; margin-left: 1.5rem; }
  }
}

.site-footer {
  background: #111;
  color: #ccc;
  padding: 2rem 0;
  margin-top: 4rem;
  font-size: 0.875rem;
  p { margin-bottom: 0.5rem; }
}

main { min-height: 60vh; padding: 3rem 0; }
```

### File di contenuto da creare

**`content/_index.md`** — Home page:

```markdown
---
title: "DAMAGER"
---
```

**`content/project/_index.md`** — Project page:

```markdown
---
title: "Project"
---
```

**`content/partners/_index.md`** — Partners page:

```markdown
---
title: "Partners"
---
```

**`content/media/_index.md`** — Media page:

```markdown
---
title: "Media"
---
```

---

## F1.4 — Configurazione Decap CMS

### File `static/admin/index.html`

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DAMAGER CMS</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

### File `static/admin/config.yml`

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "static/images/uploads"
public_folder: "/images/uploads"

collections:
  - name: "news"
    label: "News & Events"
    folder: "content/media/news"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Type", name: "type", widget: "select", options: ["News", "Event"]}
      - {label: "Body", name: "body", widget: "markdown"}
      - {label: "Featured Image", name: "image", widget: "image", required: false}
      - {label: "External Link", name: "link", widget: "string", required: false}
      - {label: "Tags", name: "tags", widget: "list", required: false}

  - name: "documents"
    label: "Documents"
    folder: "content/media/documents"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Category", name: "category", widget: "select",
         options: ["Fact Sheet", "Public Deliverable", "Press Release"]}
      - {label: "Description", name: "description", widget: "text"}
      - {label: "PDF File", name: "pdf", widget: "file"}
      - {label: "Date", name: "date", widget: "datetime"}

  - name: "publications"
    label: "Publications"
    folder: "content/media/publications"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Authors", name: "authors", widget: "string"}
      - {label: "Conference/Journal", name: "venue", widget: "string"}
      - {label: "Year", name: "year", widget: "number"}
      - {label: "Abstract", name: "abstract", widget: "text"}
      - {label: "PDF File", name: "pdf", widget: "file", required: false}
      - {label: "DOI Link", name: "doi", widget: "string", required: false}
      - {label: "Tags", name: "tags", widget: "list", required: false}
```

### Aggiungere il widget Netlify Identity al template base

Aggiungere questo script nel `<head>` di `layouts/_default/baseof.html` (dopo il link al CSS):

```html
<!-- Netlify Identity Widget — necessario per il CMS -->
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
```

---

## F1.5 — Netlify Identity e Git Gateway

Netlify Identity è già stato abilitato in FASE 0A in modalità "Invite only".

Verificare che sia attivo:
- Pannello Netlify → "Site settings" → "Identity" → stato: **Enabled**
- Registration: **Invite only** ✅

### Abilitare Git Gateway

Git Gateway è il servizio Netlify che fa da ponte tra Decap CMS e il repository GitHub, permettendo al CMS di creare commit per conto degli utenti autenticati. Va abilitato separatamente da Netlify Identity:

- Pannello Netlify → "Site settings" → "Identity" → sezione **"Services"** → **"Enable Git Gateway"**

Dopo l'attivazione, il pannello mostra:
- Repository: `https://github.com/ergonresearch/damager-website`
- GitHub API access token: generato automaticamente

> **Attenzione — problema noto:** Git Gateway viene abilitato a livello di configurazione, ma le rotte interne `/.netlify/git/` vengono registrate sul CDN di Netlify **solo al deploy successivo**. Se si accede a `/admin` subito dopo l'attivazione, il CMS mostra l'errore *"Your Git Gateway backend is not returning valid settings"* e la console del browser riporta `GET /.netlify/git/settings → 404 (Not Found)`.
>
> **Soluzione:** eseguire un nuovo deploy del sito (Netlify → Deploys → "Trigger deploy" → "Deploy site") senza modifiche al codice. Dopo che il deploy raggiunge lo stato "Published", il pannello CMS diventa pienamente operativo.

### Invitare gli utenti CMS

L'accesso al pannello `/admin` non usa le credenziali dell'account Netlify, ma un sistema di autenticazione separato (Netlify Identity). Ogni utente che deve accedere al CMS deve ricevere un invito esplicito:

- Pannello Netlify → "Identity" → **"Invite users"** → inserire l'indirizzo email
- L'utente riceve un'email con un link di accettazione (`/#invite_token=...`)
- Aprendo quel link nel browser, l'utente imposta la propria password per il pannello CMS
- Da quel momento può accedere a `/admin` con email e password impostata

---

## F1.6 — Configurazione `netlify.toml`

Creare il file `netlify.toml` nella root del progetto:

```toml
[build]
  command = "hugo --minify"
  publish = "public"

[build.environment]
  HUGO_VERSION = "0.158.0"
  HUGO_ENV     = "production"

[[redirects]]
  from   = "/admin"
  to     = "/admin/index.html"
  status = 200

[context.deploy-preview]
  command = "hugo --buildFuture -b $DEPLOY_PRIME_URL"

[context.branch-deploy]
  command = "hugo -b $DEPLOY_PRIME_URL"
```

---

## F1.7 — Primo deploy e verifica

### Verifica in locale

```bash
hugo server
```

Aprire `http://localhost:1313` — devono essere visibili:
- Home page con testo "DAMAGER"
- Header con menu (Home / Project / Partners / Media)
- Footer con disclaimer EU
- Le 4 pagine raggiungibili via menu (possono essere vuote)

### Deploy su Netlify

```bash
git add .
git commit -m "feat: initialize Hugo project with base structure and Decap CMS"
git push origin develop

# Merge su main per avviare il deploy Netlify
git checkout main
git merge develop
git push origin main
git checkout develop
```

Netlify fa il build automaticamente. Dopo 1-2 minuti:
- Aprire `https://damager-website.netlify.app` — sito raggiungibile ✅
- Aprire `https://damager-website.netlify.app/admin` — pannello CMS raggiungibile ✅

### Verifica finale FASE 1

- [x] `hugo` compila senza errori (9 pagine, 223 ms) ✅
- [x] Home page visibile su `localhost:1313` ✅
- [x] Tutte e 4 le pagine del menu sono raggiungibili ✅
- [x] Build Netlify completata senza errori ✅
- [x] Sito raggiungibile su `damager-website.netlify.app` ✅
- [x] Pannello CMS raggiungibile su `/admin` ✅

---

## Riferimenti utili

| Risorsa | URL |
|---------|-----|
| Documentazione Hugo | https://gohugo.io/documentation/ |
| Hugo templates | https://gohugo.io/templates/ |
| Hugo SCSS/SASS | https://gohugo.io/hugo-pipes/transpile-sass-to-css/ |
| Decap CMS docs | https://decapcms.org/docs/ |
| Netlify Identity | https://docs.netlify.com/security/secure-access-to-sites/identity/ |

---

**File correlato:** `docs/ARCHITETTURA_TECNICA.md` — struttura repository, configurazione completa  
**Fase precedente:** `docs/FASE_0A_Setup_Stack.md`  
**Fase successiva:** `docs/FASE_2_Template.md`

---

*Documento FASE 1 — Progetto DAMAGER Website | Versione 1.0 | Marzo 2026*
