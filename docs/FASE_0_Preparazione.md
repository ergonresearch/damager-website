# 📁 FASE 0 — Preparazione (Indice)
**Documento di sviluppo DAMAGER Website**  
**Versione:** 3.0 | **Data:** Marzo 2026

---

La FASE 0 è suddivisa in due documenti separati in base alla natura delle attività:

---

## 📄 FASE 0A — Setup dello Stack Tecnologico
**File:** `docs/FASE_0A_Setup_Stack.md`

Contiene le istruzioni per configurare tutti gli strumenti tecnici necessari allo sviluppo:

- **F0A.1** — Configurazione repository GitHub e Git locale (credenziali, .gitignore, README, init, remote, branch)
- **F0A.2** — Creazione account Netlify e collegamento al repository GitHub
- **F0A.3** — Pre-verifica disponibilità dominio `damager.eu` *(acquisto differito alla FASE 8)*
- **F0A.4** — Installazione Hugo Extended

→ [Apri FASE_0A_Setup_Stack.md](FASE_0A_Setup_Stack.md)

---

## 📄 FASE 0B — Raccolta e Preparazione degli Asset *(eseguita dopo FASE 6)*
**File:** `docs/FASE_0B_Raccolta_Asset.md`

> **Ordine aggiornato:** la FASE 0B è stata spostata **dopo il completamento del blocco FASI 3-6**. Il sito viene sviluppato prima con asset placeholder; i materiali definitivi vengono raccolti e sostituiti successivamente.

Contiene le istruzioni per raccogliere i materiali grafici definitivi e sostituire i placeholder:

- **F0B.1** — Sostituzione logo placeholder con logo DAMAGER definitivo (SVG, PNG, favicon)
- **F0B.2** — Sostituzione sfondi placeholder con immagini da `background_template.pdf`
- **F0B.3** — Sostituzione logo EU placeholder con logo ufficiale "Funded by the European Union"
- **F0B.4** — Sostituzione loghi partner placeholder con loghi definitivi dei 5 partner

→ [Apri FASE_0B_Raccolta_Asset.md](FASE_0B_Raccolta_Asset.md)

---

## Ordine di esecuzione

```
FASE 0A (Setup Stack)           ← COMPLETATA ✅
    │
    ▼
FASE 1 (Setup Hugo + CMS)
    │
    ▼
FASE 2 (Template grafico)
    │
    ▼
BLOCCO FASI 3-6                 ← con asset placeholder
  ├── FASE 3 (Home Page)
  ├── FASE 4 (Project Page)
  ├── FASE 5 (Partners Page)
  └── FASE 6 (Media Page)
    │
    ▼
FASE 0B (Raccolta Asset)        ← sostituzione placeholder con asset reali
    │
    ▼
FASE 7 (Cookie Consent + Privacy)
    │
    ▼
FASE 8 (Deploy e Go-Live)
    │
    ▼
FASE 9 (Formazione editor)
```

> La FASE 0B può essere avviata non appena Inkscape è installato (primo passo di F0B.1). Inkscape non fa parte della FASE 0A — va scaricato separatamente come da istruzioni in F0B.1.

---

*Documento indice FASE 0 — Progetto DAMAGER Website | Versione 2.0 | Marzo 2026*
