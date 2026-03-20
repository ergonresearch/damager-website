# 🎨 FASE 2 — Template Grafico
**Documento di sviluppo DAMAGER Website**  
**Versione:** 1.0 | **Data:** Marzo 2026  
**Prerequisiti:** FASE 1 completata (progetto Hugo funzionante su Netlify)  
**Obiettivo:** Costruire il design system completo (SCSS, layout, componenti) su cui poggeranno tutte le pagine del sito

---

## Checklist di fase

- [x] F2.1 — Palette bianco/nero in SCSS (`_variables.scss`, `_base.scss`) ✅
- [x] F2.2 — Header sticky con logo + menu + hamburger mobile ✅
- [x] F2.3 — Footer con EU disclaimer + link legali ✅
- [x] F2.4 — Componenti: card news, card documento, card partner, form, pulsanti ✅
- [x] F2.5 — Sfondi decorativi blueprint (CSS placeholder — SVG reali in FASE 0B) ✅
- [x] F2.6 — Layout responsive mobile-first ✅
- [x] F2.7 — Timeline animata con aeroplano SVG (partial Hugo riutilizzabile) ✅

---

## Architettura SCSS

```
assets/scss/
├── _variables.scss   ← palette, font, spaziature, breakpoint
├── _base.scss        ← reset, tipografia, container, sezioni
├── _header.scss      ← header sticky, nav desktop, hamburger, mobile nav
├── _footer.scss      ← footer, EU disclaimer, link legali
├── _components.scss  ← card news, doc, partner, pulsanti, form
├── _timeline.scss    ← timeline milestone con aeroplano SVG animato
└── main.scss         ← entry point — importa tutti i parziali
```

Il foglio di stile viene compilato da Hugo Extended via SCSS pipeline:
```hugo
{{ $style := resources.Get "scss/main.scss" | toCSS | minify }}
```

---

## F2.1 — Palette e variabili

**File:** `assets/scss/_variables.scss`

Palette monocromatica bianco/nero coerente con il logo DAMAGER:

| Variabile | Valore | Utilizzo |
|-----------|--------|----------|
| `$black` | `#000000` | Testo principale, sfondo sezioni scure |
| `$white` | `#ffffff` | Sfondo principale |
| `$gray-100` | `#f5f5f5` | Sfondo sezioni alternate |
| `$gray-200` | `#e8e8e8` | Bordi, separatori |
| `$gray-600` | `#666666` | Testo secondario |
| `$gray-800` | `#333333` | Testo corpo |
| `$dark` | `#111111` | Header, footer |

Font principale: **Inter** (Google Fonts) — pesi 400, 600, 700, 900.

---

## F2.2 — Header

**File:** `layouts/partials/header.html` + `assets/scss/_header.scss`

- Sfondo `#111` sticky in cima alla pagina (z-index 200)
- Logo "DAMAGER" a sinistra (placeholder testo — logo SVG in FASE 0B)
- Menu 4 voci a destra su desktop, nascosto su mobile
- Hamburger a 3 linee su mobile → drawer full-width con le stesse voci
- Voce attiva evidenziata con sottolineatura bianca
- JavaScript minimale per toggle hamburger (accessibile con `aria-expanded`)

---

## F2.3 — Footer

**File:** `layouts/partials/footer.html` + `assets/scss/_footer.scss`

- Sfondo `#111`
- Sezione EU disclaimer: logo EU placeholder (testo) a sinistra, testo obbligatorio a destra
  - Il logo placeholder viene sostituito con l'SVG ufficiale in FASE 0B
- Link legali: Privacy Policy, Cookie Policy, LinkedIn
- Copyright
- Layout a colonna su mobile, affiancato su desktop

---

## F2.4 — Componenti

**File:** `assets/scss/_components.scss`

### Card News (`card-news`)
- Immagine 16:9 in cima (con sfondo grigio se assente)
- Tag tipologia (News / Event), data, titolo, estratto
- Link "Read more" nel footer della card

### Card Documento (`card-doc`)
- Icona PDF a sinistra, categoria + titolo + data a destra
- Download link

### Card Partner (`card-partner`)
- Area logo con `.logo-placeholder` (box grigio con nome) — sostituito in FASE 0B
- Paese, nome, ruolo, descrizione, link sito
- Bordo e hover shadow

### Pulsanti (`btn`)
- `btn--primary`: sfondo nero, testo bianco
- `btn--outline`: bordo nero, testo nero, hover riempimento
- `btn--white`: per contesti su sfondo scuro

### Form contatto (`contact-form`)
- Campo input/textarea con bordo grigio → bordo nero al focus
- Label, placeholder, validazione nativa HTML5

---

## F2.5 — Sfondi decorativi

**File:** `assets/scss/_base.scss` — classe `.bg-blueprint`

In assenza degli SVG definitivi (disponibili in FASE 0B dopo elaborazione di `background_template.pdf`), viene usato un pattern CSS a punti/griglia come sfondo decorativo:

```scss
.bg-blueprint::before {
  background-image: radial-gradient(circle, $gray-200 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.6;
}
```

In FASE 0B, il pattern CSS viene sostituito con:
```scss
background-image: url('/images/backgrounds/compressor-bg.svg');
```

---

## F2.6 — Responsive mobile-first

Breakpoint usati in tutto il progetto:

| Variabile SCSS | Valore | Dispositivo target |
|----------------|--------|--------------------|
| `$bp-sm` | 576px | Mobile landscape |
| `$bp-md` | 768px | Tablet |
| `$bp-lg` | 1024px | Desktop piccolo |
| `$bp-xl` | 1280px | Desktop grande |

Approccio: stili base per mobile, `@media (min-width: ...)` per desktop.

---

## F2.7 — Timeline con aeroplano SVG

**File:** `layouts/partials/timeline.html` + `assets/scss/_timeline.scss`

Componente riutilizzabile incluso con `{{ partial "timeline.html" . }}`.

### Funzionamento
- Milestones: M00 (Kickoff), M06, M12, M24, M36, M48 (End)
- La linea di progresso è calcolata in JavaScript in base alla data corrente
- L'aeroplano SVG è posizionato sulla linea alla percentuale corrente e animato con CSS (`plane-float`)
- Milestone passate: punto pieno nero
- Milestone future: cerchio vuoto con bordo grigio
- Su mobile: scroll orizzontale (min-width 700px, poi overflow-x: auto)

### Calcolo progresso (JavaScript)
```javascript
const start = new Date('2025-12-01');
const end   = new Date('2029-11-30');
const pct   = Math.max(0, Math.min(100,
  Math.round((Date.now() - start) / (end - start) * 100)
));
```

---

## Riferimenti utili

| Risorsa | URL |
|---------|-----|
| Inter (Google Fonts) | https://fonts.google.com/specimen/Inter |
| Hugo SCSS pipeline | https://gohugo.io/hugo-pipes/transpile-sass-to-css/ |
| SPECIFICHE_SITO.md | Identità visiva, palette, layout |

---

**Fase precedente:** `docs/FASE_1_Setup_Hugo_CMS.md`  
**Fase successiva:** `docs/FASE_3_Home.md` *(parte del blocco FASI 3-6)*

---

*Documento FASE 2 — Progetto DAMAGER Website | Versione 1.0 | Marzo 2026*
