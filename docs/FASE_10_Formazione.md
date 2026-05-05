# 🎓 FASE 10 — Formazione editor CMS
**Documento di sviluppo DAMAGER Website**  
**Versione:** 1.0 | **Data:** Maggio 2026  
**Prerequisiti:** Sito pubblicato o stabile su Netlify staging; Netlify Identity e Git Gateway attivi ([`ARCHITETTURA_TECNICA.md`](ARCHITETTURA_TECNICA.md) § 2, [`FASE_1_Setup_Hugo_CMS.md`](FASE_1_Setup_Hugo_CMS.md) § Netlify Identity)  
**Obiettivo:** Abilitare personale comunicazione/consorzio alla gestione autonoma di news, documenti e pubblicazioni tramite Decap CMS, senza uso di Git o editor di codice

---

## Checklist di fase

| ID | Attività | Stato |
|----|----------|-------|
| **F10.1** | Guida utente CMS (procedura testuale; screenshot passo-passo da integrare al termine del primo training o al go-live) | ⏳ |
| **F10.2** | Invito editor tramite Netlify Identity (email verificate, ruolo appropriato) | ⏳ |
| **F10.3** | Sessione training (live o registrata) + Q&A | ⏳ |

---

## Ambienti e URL

| Ambiente | URL pannello CMS |
|----------|------------------|
| Staging | `https://damager-website.netlify.app/admin/` |
| Produzione | `https://damager.eu/admin/` |

> Gli editor usano **sempre** l’URL `/admin/` del sito dove devono pubblicare. Le credenziali sono legate a **Netlify Identity** del sito Netlify collegato a quel dominio, non all’account personale degli sviluppatori.

---

## F10.2 — Invito utenti Netlify Identity (prima della formazione)

Operazioni riservate a chi amministra il sito su Netlify (tipicamente **Ergon Research** / comunicazione).

1. **Netlify dashboard** → sito DAMAGER → **Site configuration** → **Identity**.
2. Verificare che **Identity** sia **Enabled** e che **Git Gateway** sia attivo (**Identity** → tab **Services** → Git Gateway **Enabled**) — prerequisito per salvare dal CMS ([`FASE_1_Setup_Hugo_CMS.md`](FASE_1_Setup_Hugo_CMS.md) § F1.5).
3. In **Invite users**, inserire l’email di ogni editor e inviare l’invito.
4. L’utente riceve email, definisce password, conferma account.
5. Dopo il login, può aprire `/admin/` e caricare Decap CMS.

**Modalità consigliata:** Identity in **Invite only** (nessuna auto-registrazione pubblica) — come documentato in [`FASE_0A_Setup_Stack.md`](FASE_0A_Setup_Stack.md).

> **Nota:** il limite del piano Netlify free per Identity è generoso per questo progetto (ordine di centinaia / fino a 1.000 utenti secondo documentazione Netlify; vedi riepilogo in [`ARCHITETTURA_TECNICA.md`](ARCHITETTURA_TECNICA.md)).

---

## F10.1 — Guida operativa Decap CMS (editor)

Questa sezione è la **guida di riferimento** per chi aggiorna i contenuti della pagina **Media** (tab News & Events, Documents, Publications). La configurazione delle collezioni è definita in `static/admin/config.yml` — riepilogo campi sotto.

### 1. Accesso e prima schermata

1. Aprire il browser (Chrome o Edge consigliati per il pannello admin).
2. Andare a `https://damager.eu/admin/` (o staging se si sta ancora testando).
3. Cliccare su **Login** (widget Netlify Identity) e accedere con email e password ricevute dall’invito.
4. Se richiesto, confermare di restare collegati solo su dispositivi affidabili.

**Dopo il login** compare l’interfaccia Decap con le voci di menu delle collezioni (in inglese, come in config): **News & Events**, **Documents**, **Publications**.

*(Screenshot da aggiungere: schermata login Identity + dashboard Decap con le tre collezioni.)*

### 2. Comportamento salvataggio e sito pubblico

- Il CMS **non** modifica file sul PC dell’utente: ogni **Save** / pubblicazione crea un **commit** sul branch configurato (`main` nel repository) tramite **Git Gateway**.
- Netlify esegue un **nuovo deploy** automatico: dopo 1–3 minuti (tipicamente) le modifiche sono visibili sul sito.
- In caso di errore di rete o di Git Gateway, il CMS mostra un messaggio; non assumere che il contenuto sia online finché il deploy non è completato (controllare il sito o lo stato deploy su Netlify).

### 3. Collezione **News & Events**

**Percorso contenuti:** `content/media/news/` (file Markdown con front matter).

| Campo | Obbligo | Note |
|-------|---------|------|
| **Title** | Sì | Titolo mostrato in elenco e nella scheda |
| **Date** | Sì | Data pubblicazione / evento |
| **Type** | Sì | `News` oppure `Event` — **non** usare il nome di campo `type` (riservato da Hugo); il CMS espone già `news_type` |
| **Body** | Sì | Testo principale (Markdown: titoli, elenchi, link, grassetto) |
| **Featured Image** | No | Caricamento in `static/images/uploads/` (URL pubblico `/images/uploads/...`) |
| **External Link** | No | Es. link a post LinkedIn o pagina esterna |
| **Tags** | No | Elenco etichette opzionali |

**Creare una news:** collezione **News & Events** → **New News & Events** → compilare → salvare.

**Modificare:** selezionare la voce nell’elenco → edit → salvare.

*(Screenshot da aggiungere: form nuova news con tutti i campi visibili.)*

### 4. Collezione **Documents**

**Percorso contenuti:** `content/media/documents/`.

| Campo | Obbligo | Note |
|-------|---------|------|
| **Title** | Sì | Titolo della scheda documento |
| **Category** | Sì | `Fact Sheet`, `Public Deliverable`, `Press Release` |
| **Description** | Sì | Breve testo descrittivo (testo semplice / multilinea) |
| **PDF File** | Sì | Upload del PDF; verificare nome file leggibile e dimensione ragionevole |
| **Date** | Sì | Data associata al documento |

**PDF:** il file viene memorizzato secondo le regole Decap/Netlify per gli upload; in produzione il link nel sito punta al percorso pubblico del file caricato. Dopo il deploy, aprire la pagina Media → Documents e scaricare il PDF per un controllo rapido.

*(Screenshot da aggiungere: elenco documenti + dettaglio upload PDF.)*

### 5. Collezione **Publications**

**Percorso contenuti:** `content/media/publications/`.

| Campo | Obbligo | Note |
|-------|---------|------|
| **Title** | Sì | Titolo pubblicazione |
| **Authors** | Sì | Autori (stringa libera, es. «Mario Rossi, Jane Smith») |
| **Conference/Journal** | Sì | Venue |
| **Year** | Sì | Anno (numero) |
| **Abstract** | Sì | Riassunto |
| **PDF File** | No | Opzionale se la pubblicazione è solo con link esterno |
| **DOI Link** | No | URL DOI o pagina editore |
| **Tags** | No | Opzionale |

*(Screenshot da aggiungere: form publications compilato di esempio.)*

### 6. Buone pratiche per gli editor

- **Lingua e tono:** allinearsi alle linee guida comunicazione del progetto EDF / DAMAGER (confermare testi con HIT09 quando richiesto).
- **Immagini:** preferire file ottimizzati (peso contenuto); formati comuni JPG, PNG, WebP dove applicabile.
- **PDF:** evitare di ripubblicare versioni obsolete: se si sostituisce un file, aggiornare titolo/descrizione se il contenuto cambia in modo rilevante.
- **Link esterni:** verificare che aprano il sito corretto (HTTPS, permalink LinkedIn stabili).
- **Cosa non gestire dal CMS:** testi delle pagine statiche principali (Home, Project, Partners), dati partner centralizzati, impostazioni cookie e privacy sono in repository / file di configurazione — richiedono intervento sviluppatore (vedi [`PROGETTO_DAMAGER_WEBSITE.md`](PROGETTO_DAMAGER_WEBSITE.md) § Manutenzione).

### 7. Problemi frequenti

| Sintomo | Verifica |
|---------|----------|
| «Git Gateway» / errore salvataggio | Git Gateway attivo; attendere deploy dopo modifica Identity; eventualmente nuovo deploy vuoto dal pannello Netlify ([`FASE_1_Setup_Hugo_CMS.md`](FASE_1_Setup_Hugo_CMS.md)). |
| Login non disponibile | URL corretto (`/admin/`); Identity abilitato; utente invitato e email confermata. |
| Modifiche non visibili | Attendere fine build Netlify; svuotare cache browser; verificare di aver guardato il sito giusto (staging vs produzione). |

---

## F10.3 — Sessione training (contenuto suggerito)

Durata indicativa **2–4 ore** (compresa Q&A), eventualmente suddivisa in due incontri. Adattare al numero di persone e al livello di familiarità con strumenti web.

| Blocco | Contenuto |
|--------|-----------|
| **A — Contesto** | Ruolo del sito DAMAGER; differenza tra contenuto «editoriale» (Media/CMS) e pagine gestite da sviluppo. |
| **B — Accesso** | Login Netlify Identity; gestione password; uso staging vs produzione. |
| **C — Laboratorio News** | Creazione bozza news di prova su **staging** (se disponibile); immagine in evidenza; link esterno; cancellazione o lascito come esempio. |
| **D — Laboratorio Documents** | Upload PDF di prova; categoria; controllo sul sito dopo deploy. |
| **E — Publications** | Inserimento voce dimostrativa; DOI opzionale. |
| **F — Qualità** | Revisione contenuti; conformità EDF; chi contattare per problemi tecnici (Ergon Research / referente sito). |
| **G — Registro** | Elenco partecipanti, date, materiale consegnato (link a questo documento + eventuale PDF guidato con screenshot). |

**Output consigliati al termine di F10.3:**

- Slides o registrazione schermo (solo se compatibile con policy interne e GDPR).
- **Aggiornamento F10.1:** inserire nella presente guida gli **screenshot** catturati durante la sessione (interfaccia reale del sito in produzione), rinominati in modo chiaro (`admin-login.png`, `cms-news-new.png`, …).
- Eventuale **canale** (email o ticket) per escalation tecniche post-training.

---

## Riferimenti incrociati

| Documento | Contenuto |
|-----------|-----------|
| [`PROGETTO_DAMAGER_WEBSITE.md`](PROGETTO_DAMAGER_WEBSITE.md) | Indice fasi, checklist F10, manutenzione |
| [`FASE_1_Setup_Hugo_CMS.md`](FASE_1_Setup_Hugo_CMS.md) | Decap, Identity, Git Gateway, redirect `/admin` |
| [`FASE_6_Media.md`](FASE_6_Media.md) | Pagina Media, tab, integrazione collezioni |
| [`ARCHITETTURA_TECNICA.md`](ARCHITETTURA_TECNICA.md) | Stack CMS, sicurezza, workflow deploy |
| [`FASE_9_Deploy.md`](FASE_9_Deploy.md) | Test F9.6 CMS su produzione |

---

*FASE 10 — Formazione editor | DAMAGER Website | v1.0 Maggio 2026*
