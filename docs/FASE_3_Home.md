# FASE 3 — Home Page

**Documento di sviluppo DAMAGER Website**  
**Versione:** 1.0 | **Data:** Marzo 2026  
**Prerequisiti:** FASE 1 (Hugo + CMS) e FASE 2 (Template grafico) completate  
**Obiettivo:** Implementare la Home page (`/`) con tutte le sezioni previste nelle specifiche

---

## Checklist

- [x] F3.1 — Hero section (turbojet_half.png + logo DAMAGER SVG + sottotitolo)
- [x] ~~F3.2 — EU Funding Disclaimer section~~ *(rimossa dalla Home — contenuto spostato nel footer)*
- [x] F3.3 — Project Progress Bar (dinamica via JS)
- [x] F3.4 — Upcoming Events (prima card: M06 Meeting)
- [x] F3.5 — Contact us (Netlify Forms + coordinator card)
- [x] F3.6 — Pagina di conferma invio form (`/contact-success/`)
- [x] F3.7 — SCSS home page (`_home.scss`)
- [x] F3.8 — Build, verifica e deploy

---

## Struttura implementata

### Sezioni (top → bottom)

| Sezione | Classe CSS | Note |
|---------|-----------|------|
| A — Hero | `.hero` | `turbojet_half.png` flush al fondo; logo DAMAGER SVG inline come `<h1>` |
| ~~B — EU Disclaimer~~ | ~~`.eu-disclaimer`~~ | *Rimossa — testo regolatorio spostato nel footer* |
| C — Progress Bar | `[data-progress-bar]` | Calcolata da `main.js` su date 01/12/2025–30/11/2029 |
| D — Upcoming Events | `.event-card` | M06 Meeting — Polonia — giugno 2026 |
| E — Contact us | `.contact-form` + `.coordinator-card` | Netlify Forms, layout bicolonna con card coordinatrice |

---

## F3.1 — Hero Section

**File:** `layouts/index.html`

La hero section occupa almeno l'88% dell'altezza visibile (88vh) con:

- **Sfondo:** `#111111` (nero) come fallback CSS
- **Immagine di sfondo:** `turbojet_half.png` — immagine pre-ritagliata (metà superiore del turbojet), `width: 100%`, `height: auto`, ancorata al fondo dell'hero (`bottom: 0`) senza spazio nero prima della sezione successiva. Gradiente sovrapposto per leggibilità del testo in alto.
- **Logo/Titolo:** `<h1 class="hero__logo">` con SVG DAMAGER inline (`damager-logo-white.svg`) — font Ethnocentric caricato via `@font-face`. Dimensione: `max-width: 520px`, scalabile su mobile.
- **Sottotitolo:** acronimo espanso in corsivo, bianco a ridotta opacità (`$font-size-xl`). Le lettere che compongono l'acronimo DAMAGER (D, A, M, A, G, E, R) sono marcate con `<strong>` — rese in bianco pieno (`$white`) e grassetto 800, non corsivo, per risaltare sul testo circostante.

```html
<section class="hero">
  <div class="hero__bg">
    <img class="hero__bg-img" src="/images/turbojet_half.png" alt="" aria-hidden="true">
    <div class="hero__bg-gradient" aria-hidden="true"></div>
  </div>
  <div class="container">
    <div class="hero__content">
      <h1 class="hero__logo" aria-label="DAMAGER">
        <!-- damager-logo-white.svg inline via resources.Get -->
      </h1>
      <p class="hero__subtitle">stuDy of Additive ManufActuring ...</p>
    </div>
  </div>
</section>
```

---

## F3.2 — EU Funding Disclaimer *(rimossa dalla Home)*

La sezione EU Disclaimer è stata rimossa dalla Home page su richiesta. Il testo regolatorio obbligatorio (EDF) è riportato nel footer del sito, visibile su tutte le pagine.

> *"Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or DG DEFIS. Neither the European Union nor the granting authority can be held responsible for them."*

---

## F3.3 — Project Progress Bar

**File:** `layouts/index.html` — `[data-progress-bar]`  
**Logica:** `assets/js/main.js` — funzione `initProgressBar()`

La barra calcola automaticamente la percentuale di avanzamento:

```
01 Dec 2025 ─────████░░░░░░░░░░░░░░ 30 Nov 2029
            Project Progress      X%
            N of 48 months completed
```

Attributi HTML letti da JS:

| Attributo | Destinazione |
|-----------|-------------|
| `data-progress-bar` | elemento contenitore |
| `data-progress-fill` | larghezza CSS della barra |
| `data-progress-label` | percentuale testuale |
| `data-progress-months` | "N of 48 months completed" |

---

## F3.4 — Upcoming Events

**File:** `layouts/index.html` — section `#events`

Prima card preconfigurata:

| Campo | Valore |
|-------|--------|
| Titolo | DAMAGER M06 Meeting |
| Mese | Jun |
| Anno | 2026 |
| Luogo | Poland |
| Descrizione | First project review meeting — consortium partners will present progress on all work packages. |

Link **"View all events"** → `/media/#events`

**Struttura date block (`.event-card__date-block`):**

| Elemento | Classe | Note |
|----------|--------|------|
| Mese | `.event-card__month` | Sempre presente (testo breve, uppercase) |
| Giorno | `.event-card__day` | Opzionale — da aggiungere solo se il giorno è noto (es. `<span class="event-card__day">15</span>`) |
| Anno | `.event-card__year` | Sempre presente — dimensionato per stare nel box (72px) |

---

## F3.5 — Contact Form (Netlify Forms) + Coordinator Info

**File:** `layouts/index.html` — section `#contact`  
**Layout:** due colonne su desktop — form a sinistra, coordinator card a destra  
**SCSS:** `.contact-layout`, `.coordinator-card` in `assets/scss/_home.scss`; `.contact-form` in `assets/scss/_components.scss`

### Titolo sezione
`Contact us` (in precedenza "Contact the Project Coordinator")

### Form — Campi

| Campo | Tipo | Required |
|-------|------|---------|
| Name | `text` | ✅ |
| Email | `email` | ✅ |
| Subject | `text` | ✅ |
| Message | `textarea` | ✅ |

Attributi Netlify Forms:

```html
<form name="contact" method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      action="/contact-success/">
  <input type="hidden" name="form-name" value="contact">
  <input type="hidden" name="_subject" value="DAMAGER Website — New message from contact form">
  <div hidden><input name="bot-field"></div>
  <!-- campi ... -->
</form>
```

> **Email destinatario:** `info@hit09.com` — configurata in **Netlify dashboard → Site configuration → Notifications → Form submission notifications → Add notification → Email notification**. Il campo `_subject` imposta l'oggetto dell'email di notifica.

> **Nota configurazione:** al momento della prima configurazione, il dropdown "Form" mostrava solo l'opzione **"Any form"** (il form viene registrato per nome da Netlify solo dopo la prima submission reale). Selezionare "Any form" è sufficiente: funziona correttamente poiché sul sito è presente un solo form. Dopo la prima submission il form `contact` comparirà nell'elenco e potrà essere selezionato specificatamente se necessario. ✅ Configurato.

Dopo l'invio Netlify redirige a `/contact-success/`.

### Coordinator Card (colonna destra)

Card `.coordinator-card` con sfondo bianco e bordo:

| Elemento | Valore |
|----------|--------|
| Logo | Placeholder "HIT09" (→ `static/images/partners/hit09.svg` in FASE 0B) |
| Nome | Rita Ponza |
| Ruolo | Project Coordinator |
| LinkedIn | https://www.linkedin.com/company/hit09-srl |

---

## F3.6 — Pagina di conferma form

**File:** `content/contact-success.md`

Pagina semplice con messaggio di conferma all'utente:

> *"Thank you! Your message has been sent to the project coordinator."*

Usa il layout `layouts/_default/single.html` standard.

---

## F3.7 — SCSS: `_home.scss`

**File:** `assets/scss/_home.scss`  
**Import:** aggiunto in `assets/scss/main.scss`

Classi definite:

| Classe | Descrizione |
|--------|-------------|
| `.hero` | Sezione hero full-height con overlay immagine |
| `.hero__bg` | Contenitore assoluto per l'immagine di sfondo |
| `.hero__content` | Contenuto testuale relativo, sopra l'immagine |
| `.hero__title` | Titolo extra-large con `clamp()` responsive |
| `.hero__subtitle` | Testo in corsivo, bianco semitrasparente (`$font-size-xl`); `strong` interno: bianco pieno, `font-weight: 800`, non corsivo |
| `.eu-disclaimer` | Layout flex per logo + testo |
| `.eu-disclaimer__logo` | Contenitore logo (o placeholder) |
| `.eu-disclaimer__logo--placeholder` | Box testuale quando SVG non disponibile |
| `.eu-disclaimer__text` | Testo disclaimer con font ridotto |
| `.events-cta` | Margine superiore per il link "View all events" |

---

## F3.8 — Asset placeholder

| Asset | Placeholder attuale | File finale (FASE 0B) |
|-------|--------------------|-----------------------|
| Immagine hero | `background: $dark` (CSS nero) | `static/images/turbojet.png` |
| Logo EU | Box testuale con bordo | `static/images/eu-logo/eu-funded.svg` |

---

## Note tecniche

- **`fileExists`**: funzione Hugo che controlla l'esistenza di un file nel filesystem del progetto. Usata per il logo EU: `{{ if fileExists "static/images/eu-logo/eu-funded.svg" }}`.
- **Netlify Forms**: il form viene rilevato da Netlify durante il deploy statico. Non è necessario un server backend. Le submission sono visibili nel pannello Netlify → Forms.
- **Progress Bar**: il calcolo JS usa date UTC (`T00:00:00Z`) per evitare offset di fuso orario.
