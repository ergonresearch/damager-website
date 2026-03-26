# FASE 7 — Cookie Consent e Privacy

> **Versione:** 1.0 | **Data:** Marzo 2026  
> **Stato:** ✅ Completata  
> **Branch:** develop

---

## Obiettivo

Implementare il sistema di gestione dei consensi cookie in conformità GDPR (Reg. UE 2016/679) e alla normativa italiana (D.Lgs. 196/2003), integrare Google Analytics 4 in modo condizionale, rendere la mappa del consorzio condizionale, e creare le pagine legali Privacy Policy e Cookie Policy.

---

## Checklist

- [x] **F7.1** Vanilla Cookie Consent v3 integrato (CDN)
- [x] **F7.2** Categorie: necessari / analitici (GA4) / funzionali (Maps)
- [x] **F7.3** Google Analytics 4 — caricato solo dopo consenso `analytics`
- [x] **F7.4** Mappa consorzio — condizionata al consenso `functional`
- [x] **F7.5** Privacy Policy scritta e pubblicata (`/privacy-policy/`)
- [x] **F7.6** Cookie Policy scritta e pubblicata (`/cookie-policy/`)
- [x] **F7.7** Link "Cookie Preferences" nel footer

---

## Libreria utilizzata

**Vanilla Cookie Consent v3** (open source, MIT License)  
- Homepage: https://cookieconsent.orestbida.com/  
- GitHub: https://github.com/orestbida/cookieconsent  
- Caricata via jsDelivr CDN (nessuna dipendenza npm):
  - CSS: `https://cdn.jsdelivr.net/npm/vanilla-cookieconsent@3/dist/cookieconsent.css`
  - JS: `https://cdn.jsdelivr.net/npm/vanilla-cookieconsent@3/dist/cookieconsent.umd.js`

---

## Architettura implementata

### Layout del banner (F7.1 + F7.2)

Il banner appare in basso in stile "bar" al primo accesso. Offre tre opzioni:

| Pulsante | Effetto |
|----------|---------|
| **Accept all** | Abilita analytics + functional |
| **Reject non-essential** | Solo cookie necessari |
| **Manage preferences** | Apre modale di dettaglio |

La modale di preferenze mostra tre sezioni:
1. **Strictly necessary** — read-only, sempre abilitati
2. **Analytics** — opt-in, con tabella cookie GA4
3. **Functional** — opt-in, con tabella cookie Maps

Le preferenze vengono salvate per **12 mesi** nel cookie `cc_cookie`.

### Google Analytics 4 (F7.3)

GA4 viene caricato dinamicamente via JavaScript solo dopo che l'utente ha accettato la categoria `analytics`. Il Measurement ID è configurabile in `hugo.toml`:

```toml
[params]
  googleAnalyticsId = ""  # Impostare con "G-XXXXXXXXXX" quando disponibile
```

Funzionamento in `layouts/_default/baseof.html`:

- Il tag `<body>` espone il parametro tramite un attributo `data-ga-id="{{ .Site.Params.googleAnalyticsId | default "" }}"` (approccio HTML, evita problemi di escaping nel contesto `<script>`)
- Lo script VCC legge `document.body.dataset.gaId` a runtime
- La funzione `loadGA4()` viene chiamata nelle callback `onConsent` e `onChange`
- IP anonymisation abilitata di default: `gtag('config', gaId, { anonymize_ip: true })`

### Mappa del consorzio (F7.4)

Nella pagina Partners (`layouts/partners/list.html`), la mappa è gestita dal div con `data-map-embed`:

- **Senza consenso functional** → placeholder con lista partner + pulsante "Enable Map" che apre la modale VCC
- **Con consenso functional** → il placeholder viene sostituito da un `<iframe>` con la mappa OpenStreetMap

L'URL della mappa è configurabile in `hugo.toml` e viene iniettato tramite attributo `data-map-url` sul tag `<body>` (stessa tecnica usata per GA4, per evitare double-encoding Hugo nel contesto script):

```toml
[params]
  mapsEmbedUrl = "https://www.openstreetmap.org/export/embed.html?bbox=-8.0,39.0,30.0,51.0&layer=mapnik"
```

La funzione `enableMap()` in `baseof.html`:
1. Legge `document.body.dataset.mapUrl`
2. Crea un `<iframe>` con altezza calcolata da `placeholder.offsetHeight`
3. Sostituisce il `innerHTML` del div `.map-placeholder`

**Limitazione attuale:** L'embed OSM con `bbox` mostra solo la regione geografica senza marker o pin. La migrazione a **Leaflet.js** (marker interattivi per i 5 partner) è pianificata come step successivo — le coordinate città sono già note e non richiedono indirizzi precisi.

### Footer — Cookie Preferences (F7.7)

In `layouts/partials/footer.html` è stato aggiunto un `<button>` che richiama `CookieConsent.showPreferences()`. Stilizzato con la classe `.footer-cookie-btn` per apparire come un link.

---

## File modificati / creati

| File | Tipo | Modifiche |
|------|------|-----------|
| `hugo.toml` | Config | Aggiunto `googleAnalyticsId` e `mapsEmbedUrl` in `[params]` |
| `layouts/_default/baseof.html` | Layout | CSS VCC in `<head>`; attributi `data-ga-id` e `data-map-url` su `<body>`; VCC JS + script init inline a fine `<body>` |
| `layouts/partials/footer.html` | Partial | Aggiunto `<button class="footer-cookie-btn">` con `onclick="CookieConsent.showPreferences()"` |
| `layouts/partners/list.html` | Layout | Rimosso `disabled` dal pulsante "Enable Map"; aggiunto `onclick="CookieConsent.showPreferences()"` |
| `assets/scss/_cookie-consent.scss` | SCSS | Nuovo file — theme overrides B&W per VCC v3 (usa `$font-primary`, `$radius-sm`, palette monocromatica) |
| `assets/scss/main.scss` | SCSS | Aggiunto `@import 'cookie-consent'` |
| `content/privacy-policy.md` | Content | Nuovo file — Privacy Policy GDPR-conforme |
| `content/cookie-policy.md` | Content | Nuovo file — Cookie Policy con tabella cookie |

---

## Pagine legali (F7.5 + F7.6)

### Privacy Policy — `/privacy-policy/`

Contenuto: `content/privacy-policy.md`  
Layout: `layouts/_default/single.html` (default Hugo)

Sezioni:
1. Titolare del trattamento (HIT09 SRL)
2. Dati raccolti (form contatto, analytics)
3. Servizi di terze parti (tabella: Netlify, GA4, Maps, Fonts)
4. Tempi di conservazione
5. Diritti dell'interessato (artt. 15-22 GDPR)
6. Sicurezza (HTTPS, Netlify CDN)
7. Aggiornamenti alla policy

### Cookie Policy — `/cookie-policy/`

Contenuto: `content/cookie-policy.md`  
Layout: `layouts/_default/single.html` (default Hugo)

Sezioni:
1. Definizione di cookie
2. Categorie (necessari / analitici / funzionali) con tabella completa
3. Cookie di terze parti
4. Come gestire le preferenze (banner + browser + GA opt-out)
5. Contatti

---

## Configurazione GA4 (pendente)

Quando il progetto sarà live e il GA4 Measurement ID sarà disponibile:

1. Accedere a [analytics.google.com](https://analytics.google.com) e creare una proprietà GA4
2. Copiare il Measurement ID (formato: `G-XXXXXXXXXX`)
3. In `hugo.toml`, impostare:
   ```toml
   googleAnalyticsId = "G-XXXXXXXXXX"
   ```
4. Verificare che IP anonymisation sia attiva (già configurata nello script)
5. Testare il funzionamento con il browser in modalità incognito (nessun cookie presente)

---

## Conformità normativa

| Requisito | Stato |
|-----------|-------|
| Consenso preventivo per cookie non tecnici | ✅ Implementato |
| Possibilità di rifiuto ugualmente semplice all'accettazione | ✅ "Reject non-essential" in prima schermata |
| Granularità per categoria | ✅ Analytics / Functional separati |
| Revoca del consenso in qualsiasi momento | ✅ Pulsante "Cookie Preferences" nel footer |
| Privacy Policy disponibile | ✅ `/privacy-policy/` |
| Cookie Policy disponibile | ✅ `/cookie-policy/` |
| IP anonymisation per analytics | ✅ `anonymize_ip: true` |
| Durata consenso ≤ 12 mesi | ✅ VCC default |

---

*Documento FASE 7 — Progetto DAMAGER Website | Versione 1.1 | Marzo 2026*  
**File correlato:** `docs/ARCHITETTURA_TECNICA.md` — stack, CMS, hosting, sicurezza
