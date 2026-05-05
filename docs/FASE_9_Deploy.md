# 🚀 FASE 9 — Deploy e Go-Live
**Documento di sviluppo DAMAGER Website**  
**Versione:** 0.91 (bozza) | **Data:** Maggio 2026  
**Prerequisiti:** FASI 1–8 completate; sito stabile su staging Netlify  
**Obiettivo:** Acquistare e blindare il dominio `damager.eu`, collegarlo a Netlify, verificare HTTPS e i flussi critici in produzione

---

## Checklist di fase

| ID | Attività | Stato |
|----|----------|-------|
| **F9.0** | Acquisto dominio `damager.eu` (intestazione **HIT09 SRL**) + copertura **≥ 5 anni** dalla registrazione | ⏳ |
| **F9.1** | DNS: `damager.eu` e `www` puntano al sito Netlify di produzione | ⏳ |
| **F9.2** | HTTPS attivo (certificato Netlify / Let's Encrypt) | ⏳ |
| **F9.3** | Test cross-browser (Chrome, Firefox, Safari, Edge) | ⏳ |
| **F9.4** | Test mobile (iOS, Android) | ⏳ |
| **F9.5** | Test form di contatto (email di notifica ricevuta) | ⏳ |
| **F9.6** | Test CMS (news, upload PDF) su URL di produzione | ⏳ |
| **F9.7** | Test cookie consent (categorie, preferenze, mappa condizionale) | ⏳ |

---

## F9.0 — Acquisto dominio `damager.eu` e copertura pluriennale (≥ 5 anni)

### Requisito progetto: almeno 5 anni di disponibilità

Per il sito DAMAGER si richiede che il nome `damager.eu` resti **registrato e rinnovabile** per un orizzonte minimo di **5 anni** a partire dall’acquisto. In pratica si possono combinare due leve (non esclusive):

1. **Registrazione iniziale multi-anno** — pagare subito più anni di registrazione (es. 5 o 10 anni), così la data di scadenza slitta in avanti e si riduce il rischio di dimenticanze nei primi anni del progetto.
2. **Rinnovo automatico + metodo di pagamento valido** — con durata iniziale anche a 1 anno, purché il rinnovo sia garantito (auto-renew attivo, carta/SEPA non in scadenza, email di fatturazione monitorate).

**Politica tecnica del TLD `.eu`:** il registro **EURid** gestisce il ciclo di vita; i singoli **registrar** accreditati offrono durate e prezzi diversi. Per **OVHcloud** (Italia), la scheda tecnica del TLD `.eu` indica esplicitamente registrazione e rinnovo per **1, 2, … fino a 10 anni** ([pagina TLD .eu OVHcloud Italia](https://www.ovhcloud.com/it/domains/tld/eu/)). Per altri registrar occorre verificare nel carrello quanti anni sono selezionabili per `.eu`.

> **Nota:** «Disponibile per 5 anni» non significa che il dominio sia *riservato* senza pagamento: significa che la **registrazione resta attiva** (pagando i periodi successivi o anticipandoli all’acquisto).

### Idoneità al `.eu` per HIT09 SRL

Il `.eu` è riservato a cittadini/residenti o imprese/organizzazioni stabilite nell’UE (e Spazio economico europeo, con le eccezioni note, es. post-Brexit). **HIT09 SRL**, coordinatore italiano del progetto, rientra nei criteri ([EURid — Get your .eu](https://www.eurid.eu/en/get-your-eu/), [guida Aruba su requisiti .eu](https://guide.aruba.it/hosting-e-domini/gestione-domini/acquisto-e-rinnovo/acquisto-registrazione/dominio-eu)).

### Intestazione e dati WHOIS

- **Registrant (intestatario):** **HIT09 SRL**, con dati societari corretti e P.IVA coerente con la documentazione del progetto.
- **Email di registrant:** casella **monitorata** (EURid e il registrar inviano avvisi di scadenza, verifica identità, problemi di pagamento).  
- Dopo la registrazione, **EURid** può avviare una **verifica dei dati** anti-abuso: in tal caso possono richiedere documentazione in pochi giorni; finché la pratica è aperta il dominio può restare in stato non operativo (`Server Hold` secondo la documentazione di alcuni registrar). Pianificare un referente che risponda rapidamente ([guida Aruba — convalida EURid](https://guide.aruba.it/hosting-e-domini/gestione-domini/acquisto-e-rinnovo/whois-privacy/convalida-dati-dominio-eu)).

### Valutazione registrar (dove conviene acquistare)

Criteri usati per DAMAGER: **supporto al `.eu` con durata ≥ 5 anni**, **trasparenza prezzi rinnovo**, **gestione DNS** per puntare a Netlify senza vincoli assurdi, **fatturazione B2B italiana/EU**, **affidabilità e assistenza** per un dominio istituzionale (progetto EDF), **costo totale sul periodo** (non solo il primo anno promozionale).

| Registrar | Registrazione multi-anno `.eu` | Indicazione economica (indicativa, Maggio 2026) | Punti di forza | Limiti / attenzioni |
|-----------|-------------------------------|-----------------------------------------------|----------------|---------------------|
| **OVHcloud** (Italia) | Sì: **1–10 anni** (scheda TLD ufficiale) | Primo anno **9,14 € IVA incl.**; rinnovo **10,48 € IVA incl./anno** ([fonte](https://www.ovhcloud.com/it/domains/tld/eu/)) | Prezzi pubblicati per primo anno e rinnovo; DNS, DNSSEC, protezione trasferimento; consolidamento con altri servizi OVH se già clienti | UI e supporto non sempre al livello “consumer semplice”; verificare totale carrello per 5 anni (il promo può applicarsi solo al primo anno) |
| **Aruba** | Da confermare nel flusso d’ordine (Aruba supporta `.eu` con verifica EURid) | Listino spesso intorno a **11,99 € + IVA/anno** per estensioni di massa (controllare listino aggiornato) | Supporto in italiano molto diffuso; molte PMI italiane già clienti | Prezzo e **anni massimi selezionabili** vanno verificati al momento dell’ordine; attenzione alle verifiche EURid post-registrazione |
| **Altri (Namecheap, Ionos, Register.it, …)** | Variabile | Spesso promo bassa al primo anno e rinnovo più alto | Utili se già in uso in azienda | Confrontare **sempre** prezzo al **quinto anno** e politica privacy/transfer |

> **Cloudflare Registrar:** la registrazione e il trasferimento del TLD **`.eu` non sono supportati** (verifica effettuata su dashboard / documentazione Cloudflare, Maggio 2026). **Non** è quindi un’opzione per acquistare `damager.eu`. Eventuale uso di **Cloudflare solo come DNS** (zona delegata da un altro registrar) resta tecnicamente possibile ma non è necessario per questo progetto: la configurazione minima documentata è DNS presso **OVHcloud**, **Aruba** o registrar equivalente.

**Acquisto tramite Netlify:** Netlify consente di collegare domini **già posseduti** oppure di acquistare alcuni TLD tramite il flusso “Buy a new domain”; l’elenco dei TLD acquistabili è **ristretto** e **non** assume che `.eu` sia disponibile per acquisto diretto. Per DAMAGER la strada documentata resta: **registrar esterno + DNS verso Netlify** (come in [`ARCHITETTURA_TECNICA.md`](ARCHITETTURA_TECNICA.md) § 4).

### Raccomandazione operativa per DAMAGER

1. **Scelta primaria consigliata: OVHcloud** — combinazione documentata di **multi-anno fino a 10 anni**, prezzi di rinnovo dichiarati, DNS adatto a puntare al load balancer Netlify, contesto europeo. Allineata alla nota già presente in architettura (~9–11 €/anno come ordine di grandezza, aggiornabile al listino corrente).
2. **Scelta alternativa sensata: Aruba** se HIT09 ha già **tutti** i domini e la fatturazione centralizzati lì, accettando il confronto prezzi sul **totale 5 anni** e confermando la durata massima selezionabile per `.eu`.

**Passi operativi minimi (indipendentemente dal registrar):**

1. Verificare disponibilità su [EURid](https://www.eurid.eu/it/ottieni-il-tuo-eu/) o sul motore del registrar scelto.
2. Registrare **a nome HIT09 SRL** con dati verificabili.
3. Nel carrello, selezionare **durata 5 anni** (o **10 anni** se il budget lo consente e si vuole massima continuità oltre il minimo richiesto).
4. Abilitare **rinnovo automatico** e conservare una **copia delle fatture** e della conferma d’ordine nel fascicolo progetto EDF.
5. Annotare in calendario interno la **data di scadenza** e il referente DNS anche oltre il quinto anno (gestione del patrimonio dominio).

---

## F9.1 — DNS: `damager.eu` → Netlify

Procedura di alto livello (dettaglio record in [`ARCHITETTURA_TECNICA.md`](ARCHITETTURA_TECNICA.md) § 4.2):

1. Nel pannello Netlify del sito di produzione: **Domain management** → aggiungere `damager.eu` (e, se usato, `www.damager.eu`) come dominio di produzione.
2. Presso il **registrar** che ospita la zona DNS (o il **provider DNS** esterno, solo se i nameserver del dominio sono delegati fuori dal registrar): creare i record indicati in architettura (**record A** sull’apex `@` verso l’IP Netlify corrente; **CNAME** per `www` verso `damager-website.netlify.app`, salvo aggiornamenti documentati da Netlify).
3. Attendere la propagazione DNS; rimuovere record **AAAA** o **A** conflittuali sull’apex se causano errori di provisioning SSL (vedi [troubleshooting SSL Netlify](https://docs.netlify.com/manage/domains/troubleshooting/troubleshoot-ssl-and-https/)).

---

## F9.2 — HTTPS

Dopo propagazione DNS corretta, Netlify provvede al certificato **Let's Encrypt** in automatico. Verificare in **Domain management** che il dominio risulti **“HTTPS enabled”** senza errori di mixed content (il sito è statico; le risorse esterne sono già HTTPS nel template).

---

## F9.3 — F9.7 — Test pre e post go-live

Eseguire i test dall’URL **di produzione** (`https://damager.eu`), non solo da staging.

| ID | Cosa verificare | Note |
|----|-----------------|------|
| **F9.3** | Chrome, Firefox, Safari, Edge — home, navigazione menu, Media (tab), Project (animazioni leggere) | Controllare anche `www` se attivo |
| **F9.4** | Layout mobile, menu, mappa (dopo consenso cookie funzionali), form | Dispositivi reali preferibili agli emulatori |
| **F9.5** | Form contatto: invio, redirect a `/contact-success/`, email a `info@hit09.com` | Notifiche solo su submission **verificate** (filtro spam Netlify) — vedi [`ARCHITETTURA_TECNICA.md`](ARCHITETTURA_TECNICA.md) § 5.1 |
| **F9.6** | Login `/admin`, pubblicazione bozza news, caricamento PDF in una collezione Media | Git Gateway attivo; stesso flusso già validato su staging |
| **F9.7** | Banner cookie, modifica preferenze, blocco/sblocco mappa e eventuali script analitici | Coerente con [`FASE_7_Cookie.md`](FASE_7_Cookie.md) |

---

## Riferimenti incrociati

| Documento | Sezione |
|-----------|---------|
| [`ARCHITETTURA_TECNICA.md`](ARCHITETTURA_TECNICA.md) | § 4 Dominio e DNS; § 5.1 Form / spam |
| [`PROGETTO_DAMAGER_WEBSITE.md`](PROGETTO_DAMAGER_WEBSITE.md) | Checklist F9 nel piano master |
| [`FASE_0A_Setup_Stack.md`](FASE_0A_Setup_Stack.md) | Staging Netlify, differimento acquisto dominio |

---

*DAMAGER Website — FASE 9 Deploy (bozza v0.91) | Maggio 2026. I prezzi dei registrar sono indicativi e vanno confermati al momento dell’ordine.*
