# 🚀 FASE 9 — Deploy e Go-Live
**Documento di sviluppo DAMAGER Website**  
**Versione:** 0.96 (bozza) | **Data:** Maggio 2026  
**Prerequisiti:** FASI 1–8 completate; sito stabile su staging Netlify  
**Obiettivo:** Completare il go-live su `damager.eu` (registrato tramite **Aruba**): DNS verso Netlify, HTTPS e test dei flussi critici in produzione *(F9.1–F9.2 completati; restano i test F9.3–F9.7)*  
**Nota privacy:** non annotare in questi file credenziali, token, indirizzi di fatturazione o altri dati riservati del registrar o di Netlify; basta lo stato delle attività e riferimenti ai pannelli ufficiali.

---

## Checklist di fase

| ID | Attività | Stato |
|----|----------|-------|
| **F9.0** | Acquisto dominio `damager.eu` (intestazione **Ergon Research SRL**) + continuità **≥ 5 anni** (rinnovo **automatico annuale** Aruba attivo) — **Registrar: Aruba** (`damager.eu` registrato) | ✅ |
| **F9.1** | DNS: `damager.eu` (e `www` se previsto) risolve verso il sito Netlify di produzione | ✅ |
| **F9.2** | HTTPS attivo (certificato Netlify / Let's Encrypt) | ✅ |
| **F9.3** | Test cross-browser (Chrome, Firefox, Safari, Edge) | ⏳ |
| **F9.4** | Test mobile (iOS, Android) | ⏳ |
| **F9.5** | Test form di contatto (email di notifica ricevuta) | ⏳ |
| **F9.6** | Test CMS (news, upload PDF) su URL di produzione | ⏳ |
| **F9.7** | Test cookie consent (categorie, preferenze, mappa condizionale) | ⏳ |

---

### Decisione registrar e stato registrazione

- **Registrar scelto:** **Aruba** (EURid-accreditato).
- **Stato:** il dominio **`damager.eu`** risulta **registrato ufficialmente** (Maggio 2026).
- **Rinnovo:** **automatico**, con ciclo **annuale** (adeguato al requisito progetto **≥ 5 anni** tramite leva *rinnovo automatico + pagamento valido* — vedi § F9.0).
- **DNS e HTTPS** (F9.1–F9.2) risultano **completati**; il sito pubblico è raggiungibile su produzione. Restano i **test di produzione** (F9.3–F9.7).

---

## F9.0 — Acquisto dominio `damager.eu` e copertura pluriennale (≥ 5 anni)

### Requisito progetto: almeno 5 anni di disponibilità

Per il sito DAMAGER si richiede che il nome `damager.eu` resti **registrato e rinnovabile** per un orizzonte minimo di **5 anni** a partire dall’acquisto. In pratica si possono combinare due leve (non esclusive):

1. **Registrazione iniziale multi-anno** — pagare subito più anni di registrazione (es. 5 o 10 anni), così la data di scadenza slitta in avanti e si riduce il rischio di dimenticanze nei primi anni del progetto.
2. **Rinnovo automatico + metodo di pagamento valido** — con periodo di registrazione **annuale**, purché la registrazione **si rinnovi ogni anno** senza interruzioni (rinnovo automatico attivo, carta/SEPA non in scadenza, email di fatturazione monitorate). **Per DAMAGER su Aruba** è impostato proprio questo schema: **rinnovo automatico annuale**.

**Politica tecnica del TLD `.eu`:** il registro **EURid** gestisce il ciclo di vita; i singoli **registrar** accreditati offrono durate e prezzi diversi. Per **OVHcloud** (Italia), la scheda tecnica del TLD `.eu` indica esplicitamente registrazione e rinnovo per **1, 2, … fino a 10 anni** ([pagina TLD .eu OVHcloud Italia](https://www.ovhcloud.com/it/domains/tld/eu/)). Per altri registrar occorre verificare nel carrello quanti anni sono selezionabili per `.eu`.

> **Nota:** «Disponibile per 5 anni» non significa che il dominio sia *riservato* senza pagamento: significa che la **registrazione resta attiva** (pagando i periodi successivi o anticipandoli all’acquisto).

### Idoneità al `.eu` per Ergon Research SRL

Il `.eu` è riservato a cittadini/residenti o imprese/organizzazioni stabilite nell’UE (e Spazio economico europeo, con le eccezioni note, es. post-Brexit). **Ergon Research SRL** (società italiana, partner del consorzio e responsabile per communication/dissemination, nonché soggetto che realizza e mantiene il sito) rientra nei criteri ([EURid — Get your .eu](https://www.eurid.eu/en/get-your-eu/), [guida Aruba su requisiti .eu](https://guide.aruba.it/hosting-e-domini/gestione-domini/acquisto-e-rinnovo/acquisto-registrazione/dominio-eu)).

> **Ruoli progetto:** il **coordinatore** del progetto DAMAGER finanziato dall’EDF resta **HIT09 SRL**; la **registrazione del dominio** e la **gestione operativa del sito** sono documentate a carico di **Ergon Research SRL**, in linea con il ruolo di communication/dissemination e con la titolarità del trattamento sul sito (vedi [`content/privacy-policy.md`](../content/privacy-policy.md)).

### Intestazione e dati WHOIS

- **Registrant (intestatario):** **Ergon Research SRL**, con dati societari corretti e P.IVA coerente con la documentazione aziendale e di progetto.
- **Email di registrant:** casella **monitorata** (EURid e il registrar inviano avvisi di scadenza, verifica identità, problemi di pagamento).  
- Dopo la registrazione, **EURid** può avviare una **verifica dei dati** anti-abuso: in tal caso possono richiedere documentazione in pochi giorni; finché la pratica è aperta il dominio può restare in stato non operativo (`Server Hold` secondo la documentazione di alcuni registrar). Pianificare un referente che risponda rapidamente ([guida Aruba — convalida EURid](https://guide.aruba.it/hosting-e-domini/gestione-domini/acquisto-e-rinnovo/whois-privacy/convalida-dati-dominio-eu)).

### Valutazione registrar (dove conviene acquistare)

Criteri usati per DAMAGER: **supporto al `.eu` con durata ≥ 5 anni**, **trasparenza prezzi rinnovo**, **gestione DNS** per puntare a Netlify senza vincoli assurdi, **fatturazione B2B italiana/EU**, **affidabilità e assistenza** per un dominio istituzionale (progetto EDF), **costo totale sul periodo** (non solo il primo anno promozionale).

| Registrar | Registrazione multi-anno `.eu` | Indicazione economica (indicativa, Maggio 2026) | Punti di forza | Limiti / attenzioni |
|-----------|-------------------------------|-----------------------------------------------|----------------|---------------------|
| **OVHcloud** (Italia) | Sì: **1–10 anni** (scheda TLD ufficiale) | Primo anno **9,14 € IVA incl.**; rinnovo **10,48 € IVA incl./anno** ([fonte](https://www.ovhcloud.com/it/domains/tld/eu/)) | Prezzi pubblicati per primo anno e rinnovo; DNS, DNSSEC, protezione trasferimento; consolidamento con altri servizi OVH se già clienti | UI e supporto non sempre al livello “consumer semplice”; verificare totale carrello per 5 anni (il promo può applicarsi solo al primo anno) |
| **Aruba** | Supporta `.eu` con verifica EURid — **registrar effettivo per DAMAGER** (Maggio 2026); rinnovo **automatico annuale** configurato | Listino spesso intorno a **11,99 € + IVA/anno** per estensioni di massa (controllare listino aggiornato) | Supporto in italiano molto diffuso; molte PMI italiane già clienti; pannello DNS per delega a Netlify | Attenzione alle verifiche EURid post-registrazione; mantenere **pagamento e contatti** aggiornati per il rinnovo ricorrente |
| **Altri (Namecheap, Ionos, Register.it, …)** | Variabile | Spesso promo bassa al primo anno e rinnovo più alto | Utili se già in uso in azienda | Confrontare **sempre** prezzo al **quinto anno** e politica privacy/transfer |

> **Cloudflare Registrar:** la registrazione e il trasferimento del TLD **`.eu` non sono supportati** (verifica effettuata su dashboard / documentazione Cloudflare, Maggio 2026). **Non** è quindi un’opzione per acquistare `damager.eu`. Eventuale uso di **Cloudflare solo come DNS** (zona delegata da un altro registrar) resta tecnicamente possibile ma non è in uso per DAMAGER. **Configurazione attuale:** registrar **Aruba**; **zona DNS autoritativa** gestita da **Netlify** (nameserver delegati da Aruba secondo il wizard Netlify — i valori esatti restano solo nei rispettivi pannelli, non in questo documento).

**Acquisto tramite Netlify:** Netlify consente di collegare domini **già posseduti** oppure di acquistare alcuni TLD tramite il flusso “Buy a new domain”; l’elenco dei TLD acquistabili è **ristretto** e **non** assume che `.eu` sia disponibile per acquisto diretto. Per DAMAGER la strada documentata resta: **registrar esterno + DNS verso Netlify** (come in [`ARCHITETTURA_TECNICA.md`](ARCHITETTURA_TECNICA.md) § 4).

### Scelta effettiva per DAMAGER

**Registrar in uso:** **Aruba.** La registrazione di **`damager.eu`** è stata completata nel rispetto del piano progetto (intestazione **Ergon Research SRL**). Il vincolo **≥ 5 anni** di continuità registrazionale è coperto dal percorso **rinnovo automatico annuale** (leva 2 sopra), non da un acquisto multi-anno unico: occorre mantenere **rinnovo automatico**, **metodo di pagamento valido** e **posta del registrant** monitorata per tutta la durata del progetto.

Il confronto storico tra **OVHcloud** e **Aruba** (tabella sopra e note su Cloudflare Registrar) resta utile come riferimento. Per **record del sito** (`damager.eu`, `www`, certificato) la configurazione operativa avviene nel **pannello Netlify** del progetto; su **Aruba** restano registrazione dominio, **nameserver** e rinnovo (§ F9.1).

**Passi operativi (check post-acquisto, da tenere aggiornati):**

1. ~~Verificare disponibilità~~ *(completato; dominio acquisito).*
2. ~~Registrare **a nome Ergon Research SRL**~~ *(completato su Aruba).*
3. ~~Copertura tecnica del requisito **≥ 5 anni**~~ *(soddisfatta tramite **rinnovo automatico annuale** Aruba; nessun ordine multi-anno obbligatorio nel modello scelto).*
4. **Rinnovo automatico annuale** confermato nel pannello Aruba; **copia fatture** / conferma ordine nel fascicolo progetto EDF; verificare periodicamente che carta/SEPA e dati di fatturazione restino validi *(manutenzione continua)*.
5. **Data di scadenza** e referente DNS annotati anche oltre il quinto anno *(manutenzione del patrimonio dominio)*.

Se **EURid** richiedesse **convalida dati** post-registrazione, gestire la pratica dal pannello Aruba senza ritardi ([guida convalida](https://guide.aruba.it/hosting-e-domini/gestione-domini/acquisto-e-rinnovo/whois-privacy/convalida-dati-dominio-eu)).

---

## F9.1 — DNS: `damager.eu` → Netlify

**Stato:** completato — il dominio punta al deploy Netlify di produzione.

Due modelli possibili (documentati per chi rilegge in futuro); per DAMAGER è stato usato il **primo**:

1. **Delega DNS a Netlify** — Nel sito Netlify: **Domain management** / flusso DNS; presso **Aruba**: sezione **Name server**, sostituzione con i nameserver indicati dal wizard Netlify (copiarli dal pannello al momento dell’operazione; **non** versionare hostname o screenshot con dati account in questo repository). In fase guidata Aruba può chiedere come gestire **MX** sul DNS esterno: allineare la scelta alla presenza o assenza di posta su `@damager.eu`.
2. **Zona DNS sul registrar** — Senza cambiare nameserver: creare in zona i record descritti in [`ARCHITETTURA_TECNICA.md`](ARCHITETTURA_TECNICA.md) § 4.2 (**A** su apex, **CNAME** per `www` verso il sottodominio Netlify del sito, salvo aggiornamenti documentati da Netlify).

Dopo ogni modifica: attendere la **propagazione DNS**; in caso di errori sul certificato, seguire [troubleshooting SSL Netlify](https://docs.netlify.com/manage/domains/troubleshooting/troubleshoot-ssl-and-https/) (record **AAAA** / **A** conflittuali sull’apex, ecc.).

---

## F9.2 — HTTPS

**Stato:** completato insieme alla risoluzione DNS corretta.

Netlify emette il certificato **Let's Encrypt** in automatico. Verifiche occasionali: in **Domain management** il dominio deve restare **HTTPS** senza mixed content (il sito è statico; le risorse esterne del template sono già servite in HTTPS).

---

## F9.3 — F9.7 — Test pre e post go-live

Eseguire i test dall’URL **di produzione** (`https://damager.eu`), non solo da staging.

| ID | Cosa verificare | Note |
|----|-----------------|------|
| **F9.3** | Chrome, Firefox, Safari, Edge — home, navigazione menu, Media (tab), Project (animazioni leggere) | Controllare anche `www` se attivo |
| **F9.4** | Layout mobile, menu, mappa (dopo consenso cookie funzionali), form | Dispositivi reali preferibili agli emulatori |
| **F9.5** | Form contatto: invio, redirect a `/contact-success/`, notifica a **`info@hit09.com`** (scelta progettuale: casella coordinatore; vedi Privacy Policy § 2.1) | Notifiche solo su submission **verificate** (filtro spam Netlify) — vedi [`ARCHITETTURA_TECNICA.md`](ARCHITETTURA_TECNICA.md) § 5.1 |
| **F9.6** | Login `/admin`, pubblicazione bozza news, caricamento PDF in una collezione Media | Git Gateway attivo; stesso flusso già validato su staging |
| **F9.7** | Banner cookie, modifica preferenze, blocco/sblocco mappa e script GA4 | Con **`GA_MEASUREMENT_ID`** su Netlify: dopo deploy, verificare `data-ga-id` nel sorgente, assenza di `googletagmanager.com` se analytics rifiutati, presenza in **GA4 → Tempo reale** dopo “Accept all”. Vedi [`FASE_7_Cookie.md`](FASE_7_Cookie.md) § Configurazione GA4 |

---

## Riferimenti incrociati

| Documento | Sezione |
|-----------|---------|
| [`ARCHITETTURA_TECNICA.md`](ARCHITETTURA_TECNICA.md) | § 4 Dominio e DNS; § 5.1 Form / spam |
| [`PROGETTO_DAMAGER_WEBSITE.md`](PROGETTO_DAMAGER_WEBSITE.md) | Checklist F9 nel piano master |
| [`FASE_0A_Setup_Stack.md`](FASE_0A_Setup_Stack.md) | Staging Netlify, differimento acquisto dominio |

---

*DAMAGER Website — FASE 9 Deploy (bozza v0.96) | Maggio 2026. Registrar **Aruba**; rinnovo **automatico annuale**; DNS di produzione su **Netlify**. I prezzi nella tabella comparativa sono indicativi (listino al momento dell’ordine).*
