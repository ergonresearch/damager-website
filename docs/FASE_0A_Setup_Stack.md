# ⚙️ FASE 0A — Setup dello Stack Tecnologico
**Documento di sviluppo DAMAGER Website**  
**Versione:** 1.0 | **Data:** Marzo 2026  
**Prerequisiti:** Nessuno — è la fase iniziale  
**Obiettivo:** Configurare Git, Netlify e Hugo prima di scrivere una sola riga di codice

---

## Checklist di fase

- [x] F0A.1 — Configurazione repository GitHub e Git locale ✅ *(10/10 passi completati)*


- [x] F0A.2 — Account Netlify e collegamento GitHub ✅

- [ ] F0A.3 — Verifica disponibilità dominio `damager.eu` *(acquisto differito alla FASE 8)*
- [ ] F0A.4 — Installazione Hugo Extended
- [ ] Verifica finale

---

## F0A.1 — Configurazione repository GitHub e Git locale

**Repository:** `https://github.com/ergonresearch/damager-website.git`  
**Visibilità:** Pubblico ✅  
**Organizzazione GitHub:** `ergonresearch`  
**Nome repository:** `damager-website`

> **Perché il repository è pubblico:** vedere la sezione "Punti aperti" in fondo a questa sezione per la motivazione completa.

> **Situazione di partenza:** la directory del progetto contiene già dei file (`docs/`, `resources/`). Il repository remoto su GitHub potrebbe essere vuoto oppure contenere già un `README.md` generato automaticamente. I passi seguenti devono essere eseguiti **nell'ordine esatto indicato**.

---

### Passo 1 — Creare il file `.gitignore`

Creare `.gitignore` nella root della directory del progetto **prima di qualsiasi operazione Git**, in modo che i file da ignorare non vengano mai tracciati:

```gitignore
# Hugo build output
/public/
/resources/_gen/
hugo_stats.json

# Temp files
.hugo_build.lock

# OS files
.DS_Store
Thumbs.db
desktop.ini

# Editor
.vscode/settings.json
*.swp
*.swo

# Node (per tool ausiliari eventuali)
node_modules/
npm-debug.log

# Netlify
.netlify/
```

---

### Passo 2 — Creare il `README.md`

Creare `README.md` nella root della directory:

```markdown
# DAMAGER Website

Official website for the DAMAGER project — stuDy of Additive ManufActuring 
for low-cost, low-observable, hiGhly-deployable, expendablE/attritable 
tuRbojet engines.

**Funded by the European Union — European Defence Fund (EDF) 2024**

## Tech Stack
- Static Site Generator: [Hugo](https://gohugo.io/)
- CMS: [Decap CMS](https://decapcms.org/)
- Hosting: [Netlify](https://www.netlify.com/)

## Local Development
Run locally with:
    hugo server
Then open: http://localhost:1313

## CMS Access (after deploy)
https://damager.eu/admin
```

---

### Passo 3 — Inizializzare il repository Git locale

```bash
cd [PROJECT_DIR]
git init
```

> Questo comando crea la cartella nascosta `.git/`. Da questo momento in poi i comandi `git config --local` diventano disponibili, perché richiedono che un repository esista nella directory corrente.

---

### Passo 4 — Configurare le credenziali locali

Su questa macchina esistono già credenziali Git globali per altri progetti. Le credenziali locali sovrascrivono quelle globali **solo** per questo repository.

#### ⚠️ Proteggere l'email dai commit pubblici

Poiché il repository è **pubblico**, l'email usata nei commit è visibile a chiunque nella history di GitHub.  
Per evitarlo, usare l'**indirizzo noreply privato** che GitHub genera automaticamente:

1. GitHub → **Settings** → **Emails**
2. Spuntare **"Keep my email addresses private"**
3. Spuntare anche **"Block command line pushes that expose my email"**
4. Copiare l'indirizzo noreply fornito da GitHub (formato: `ID+username@users.noreply.github.com`)

```bash
git config --local user.name "Your Name"
git config --local user.email "ID+username@users.noreply.github.com"
```

> Sostituire `"Your Name"` e `"ID+username"` con i propri valori.  
> Il valore noreply è visibile nella pagina GitHub → Settings → Emails dopo aver attivato la privacy.

Verificare che la configurazione locale sia attiva:

```bash
git config --local user.name
git config --local user.email
```

> La configurazione locale viene salvata in `.git/config`, che non viene mai committato.


---

### Passo 5 — Configurare l'autenticazione per il push su GitHub

Con più account GitHub sulla stessa macchina, senza configurazione aggiuntiva Git potrebbe usare l'account sbagliato. Scegliere **una** delle due soluzioni:

**Soluzione A — `useHttpPath`** *(raccomandato per chi usa HTTPS)*

```bash
git config --local credential.useHttpPath true
```

Al primo `git push`, Git chiederà username e Personal Access Token specifici per `github.com/ergonresearch/damager-website`, separatamente dagli altri account già salvati nel Credential Manager.

**Soluzione B — SSH con chiave dedicata** *(più robusta per uso frequente)*

1. Generare una coppia di chiavi SSH dedicata:

```bash
ssh-keygen -t ed25519 -C "damager-project" -f ~/.ssh/id_ed25519_damager
```


2. Aggiungere la chiave pubblica a GitHub `ergonresearch`:
   - Copiare il contenuto di `~/.ssh/id_ed25519_damager.pub`
   - GitHub → Settings → SSH and GPG keys → New SSH key → incollare

3. Creare o aggiornare `~/.ssh/config`:

```
# Account ergonresearch (DAMAGER project)
Host github-damager
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_damager

# Account default (altri progetti)
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519
```

> Se si sceglie la Soluzione B, al Passo 8 usare l'URL SSH invece di HTTPS (vedi note al Passo 8).

---

### Passo 6 — Aggiungere tutti i file all'area di staging

```bash
git add .
```

Verificare cosa verrà incluso nel commit:

```bash
git status
# Devono comparire: docs/, resources/, .gitignore, README.md
# NON devono comparire: /public/, node_modules/ (esclusi dal .gitignore)
```

---

### Passo 7 — Fare il primo commit

```bash
git commit -m "chore: initial commit — project documentation and resources"
```

---

### Passo 8 — Rinominare il branch in `main` e aggiungere il remote

```bash
# Rinominare il branch (git init può creare 'master' su alcuni sistemi)
git branch -M main

# Aggiungere il repository remoto — HTTPS (se scelta Soluzione A al Passo 5):
git remote add origin https://github.com/ergonresearch/damager-website.git

# Oppure SSH (se scelta Soluzione B al Passo 5):
# git remote add origin git@github-damager:ergonresearch/damager-website.git
```

Verificare il remote:

```bash
git remote -v
# Output atteso (HTTPS):
# origin  https://github.com/ergonresearch/damager-website.git (fetch)
# origin  https://github.com/ergonresearch/damager-website.git (push)
```

---

### Passo 9 — Push su GitHub

Il comportamento dipende dallo stato del repository remoto al momento della sua creazione su GitHub:

**Se il repository remoto è VUOTO** (creato senza README né file):

```bash
git push -u origin main
```

**Se il repository remoto contiene già un `README.md`** (aggiunto da GitHub alla creazione):

Il remote ha una history Git indipendente — un `push` diretto verrebbe rifiutato. Occorre prima integrare le due history:

```bash
git pull origin main --allow-unrelated-histories -m "chore: merge remote initial commit with local files"
```

> Se Git apre comunque un editor di testo (vim o nano) per il messaggio di merge:
> - **vim**: `i` → scrivere → `Esc` → `:wq` → `Invio`
> - **nano**: scrivere → `Ctrl+X` → `Y` → `Invio`

Se compaiono conflitti (es. entrambi hanno un `README.md`):

```bash
git status          # i file in conflitto sono marcati "both modified"
# Aprire il file in conflitto, risolvere manualmente, poi:
git add README.md
git commit -m "chore: resolve merge conflict on README"
```

Infine:

```bash
git push -u origin main
```

---

### Passo 10 — Creare e pubblicare la branch `develop`

```bash
git checkout -b develop
git push -u origin develop
```

Verificare su GitHub: `https://github.com/ergonresearch/damager-website/branches`  
Devono comparire sia `main` che `develop`.

**Da questo momento in poi tutto il lavoro avviene su `develop`.** La branch `main` si aggiorna solo tramite merge esplicito quando si vuole pubblicare sul sito.

**Workflow quotidiano:**

```bash
git checkout develop          # assicurarsi di essere su develop

# ... modifiche ...

git add .
git commit -m "feat: descrizione della modifica"
git push origin develop

# Quando pronti per pubblicare:
git checkout main
git merge develop
git push origin main          # → Netlify fa il build automaticamente
git checkout develop          # tornare su develop
```

---

### ⚠️ Punti aperti F0A.1

**[✅ RISOLTO] Visibilità del repository → PUBBLICO**

**Motivazioni tecniche:**
- Decap CMS funziona nativamente con repo pubblici (OAuth standard) — con un repo privato servirebbero una GitHub OAuth App, redirect URI e client secret
- L'accesso al CMS `/admin` è protetto da Netlify Identity indipendentemente dalla visibilità del repo
- Nessun dato sensibile nel codice: chiavi API gestite tramite variabili d'ambiente Netlify, mai nel codice

**Motivazioni di progetto:**
- I progetti EDF hanno obblighi di trasparenza verso i cittadini europei
- La Commissione Europea incoraggia il rilascio open source del software finanziato con fondi pubblici (EU Open Source Software Strategy 2020-2023)
- Partner, revisori EDF e la comunità scientifica possono verificare il codice del sito

**Cosa rimane protetto con repo pubblico:**

| Elemento | Protezione |
|----------|------------|
| Pannello CMS `/admin` | Netlify Identity (email + password) |
| Deploy su `main` | Solo via merge da `develop` |
| Chiavi API | Variabili d'ambiente Netlify, mai nel codice |
| Form submissions | Gestite da Netlify server-side |

**[✅ RISOLTO] Strategia branch → `main` + `develop`**

- **`main`**: branch di produzione, Netlify deploya solo questa
- **`develop`**: branch di lavoro quotidiano

**Configurare Netlify per deployare SOLO `main`:**  
Pannello Netlify → "Site settings" → "Build & deploy" → "Branches" → "Production branch" = `main` (default, nessuna modifica necessaria).

---

## F0A.2 — Account Netlify e collegamento GitHub

> **Strategia:** sviluppo in locale → staging su `*.netlify.app` (gratuito, permanente) → dominio `damager.eu` solo quando il sito è stabile.

### Ambienti di sviluppo

| Ambiente | URL | Quando si usa |
|----------|-----|---------------|
| **Locale** | `http://localhost:1313` | Sviluppo quotidiano |
| **Staging** | `https://damager-website.netlify.app` | Test CMS, form, Identity |
| **Produzione** | `https://damager.eu` | Solo quando il sito è stabile (FASE 8) |


> Il form di contatto e il pannello CMS funzionano **solo** sull'ambiente Netlify, non in locale.

### Passi dettagliati

**1. Creare account Netlify**

- https://www.netlify.com → "Sign up with GitHub"

> **Email da usare:** preferire un'email di progetto condivisa (es. email HIT09) per garantire accesso continuato indipendentemente dal responsabile tecnico.

**2. Importare il repository**

- Pannello Netlify → "Add new site" → "Import an existing project"
- Selezionare GitHub → autorizzare l'accesso a `ergonresearch/damager-website`

**3. Configurare il build**

```
Build command:     hugo --minify
Publish directory: public
Branch to deploy:  main
```

> I valori esatti verranno fissati nel file `netlify.toml` durante la FASE 1.

**4. Ottenere l'URL di staging**

Netlify assegna automaticamente un URL tipo `random-name-123456.netlify.app`:
- Gratuito e permanente
- Non richiede configurazione DNS
- Usato per tutto il periodo di sviluppo e testing

**5. Rinominare il sito di staging**

- "Site settings" → "General" → "Site details" → "Change site name"
- Impostare `damager-website`
- Risultato: `https://damager-website.netlify.app`


**6. Attivare Netlify Identity**

- "Site settings" → "Identity" → "Enable Identity"
- In "Registration" → selezionare "**Invite only**"

**7. Attivare Netlify Forms**

Si attiva automaticamente al primo deploy con form HTML annotati con `data-netlify="true"`. Nessuna configurazione manuale necessaria.

---

### ⚠️ Punti aperti F0A.2

**[✅ RISOLTO] Email per account Netlify**

Account Netlify creato e collegato al repository `ergonresearch/damager-website`.

**[INFORMATIVO] Limiti piano gratuito Netlify**


| Risorsa | Limite free |
|---------|-------------|
| Banda | 100 GB/mese |
| Build minutes | 300 min/mese (~100 deploy) |
| Form submissions | 100/mese |
| Netlify Identity | Fino a 1.000 utenti |
| URL staging `*.netlify.app` | Gratuito, permanente |

---

## F0A.3 — Dominio `damager.eu` *(DIFFERITO)*

> ⏸️ **Acquisto differito alla FASE 8.** Non è necessario alcun acquisto per iniziare lo sviluppo. Il sito viene sviluppato e testato completamente sull'URL di staging gratuito.

### Pre-verifica da fare ora

Verificare subito la disponibilità per evitare sorprese al momento del go-live:

- EURID: https://www.eurid.eu/it/ottieni-il-tuo-eu/


Alternative se `damager.eu` fosse occupato: `damager-project.eu`, `damager-edf.eu`, `project-damager.eu`.

### Registrar consigliati (per il futuro acquisto)

| Registrar | Prezzo/anno | Supporto | Note |
|-----------|-------------|----------|------|
| **OVH** | ~9-11€ | IT, EN | Miglior rapporto qualità/prezzo |
| **Aruba** | ~10-13€ | IT | Supporto telefonico italiano |
| **Gandi** | ~15-18€ | IT, EN | WHOIS privacy inclusa |

Il dominio va registrato a nome di **HIT09 SRL** (coordinatore del progetto). Dettagli nell'documento **FASE 8 — Deploy e Go-Live**.

---

## F0A.4 — Installazione Hugo Extended

### Passi dettagliati

**1. Verificare se Hugo è già installato**

```bash
hugo version
```

L'output deve contenere la parola `extended`:
```
hugo v0.XXX.0+extended windows/amd64 BuildDate=...
```

Se manca `extended`, procedere con la reinstallazione.

**2. Installare Hugo Extended**

```bash
winget install Hugo.Hugo.Extended
```

**3. Verificare dopo aver riaperto il terminale**

```bash
hugo version
# Output atteso: hugo v0.144.0+extended windows/amd64 ...
```

**4. Annotare il numero di versione**

Il numero di versione (es. `0.144.0`) sarà inserito in `netlify.toml` nella FASE 1 per garantire build identiche in locale e su Netlify.

---

### ⚠️ Punti aperti F0A.4

**[INFORMATIVO] Perché la versione Extended?**

La versione Extended include il processore SASS/SCSS integrato. Il tema usa SCSS per i fogli di stile — la versione standard di Hugo non supporta SCSS.

**Metodi di installazione alternativi:**

| Metodo | Comando | Pro | Contro |
|--------|---------|-----|--------|
| **winget** ✅ | `winget install Hugo.Hugo.Extended` | Nativo Windows 11 | Aggiorna sempre all'ultima versione |
| Scoop | `scoop install hugo-extended` | Gestione versioni multipla | Richiede Scoop |
| Download manuale | Da github.com/gohugoio/hugo/releases | Controllo versione esatto | Aggiornamenti manuali |

Per controllo preciso della versione (consigliato per stabilità a lungo termine): scaricare `hugo_extended_X.XX.X_windows-amd64.zip` dalla pagina releases di Hugo.

---

## Verifica finale FASE 0A

- [x] `.gitignore` presente nella root del progetto ✅
- [x] `README.md` presente nella root del progetto ✅
- [x] `git init` eseguito — repository locale inizializzato ✅
- [x] Credenziali locali configurate *(aggiornare con noreply GitHub — vedi Passo 4)* ✅

- [x] `git status` — tutto committato su `main` ✅ (commit `1372568`)
- [x] Branch `develop` creata e pubblicata su GitHub ✅
- [x] `git remote -v` mostra `origin` → `ergonresearch/damager-website` ✅
- [x] Account Netlify creato e collegato al repository ✅
- [x] URL staging Netlify: `https://damager-website.netlify.app` ✅
- [x] Netlify Identity abilitato in modalità "Invite only" ✅
- [ ] Disponibilità `damager.eu` verificata su EURID Whois
- [ ] Hugo Extended installato: `hugo version` mostra `extended`
- [ ] Numero di versione Hugo annotato


---

## Riferimenti utili

| Risorsa | URL |
|---------|-----|
| Hugo releases | https://github.com/gohugoio/hugo/releases |
| Netlify | https://www.netlify.com |
| EURID .eu | https://www.eurid.eu/it/ottieni-il-tuo-eu/ |
| GitHub repository | https://github.com/ergonresearch/damager-website |


---

**File correlato:** `docs/FASE_0B_Raccolta_Asset.md` — raccolta logo, sfondi, loghi partner e materiali EU  
**Fase successiva:** `docs/FASE_1_Setup_Hugo_CMS.md`

---

*Documento FASE 0A — Progetto DAMAGER Website | Versione 1.0 | Marzo 2026*
