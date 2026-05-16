// Italian strings for the customer account section.
// Single source of truth so we can plug in a real i18n layer later
// without hunting through every component.

export const account = {
  // Layout
  layout: {
    helpTitle: "Hai bisogno di aiuto?",
    helpSubtitle:
      "Il nostro team è a disposizione per qualsiasi domanda su ordini, resi e prodotti.",
    helpCta: "Contattaci",
  },

  // Navigation
  nav: {
    section: "Il mio account",
    overview: "Panoramica",
    profile: "Profilo",
    addresses: "Indirizzi",
    orders: "Ordini",
    returns: "Resi",
    preferences: "Preferenze",
    logout: "Esci",
    back: "Indietro",
  },

  // Common
  common: {
    save: "Salva",
    cancel: "Annulla",
    edit: "Modifica",
    delete: "Elimina",
    add: "Aggiungi",
    confirm: "Conferma",
    loading: "Caricamento…",
    saving: "Salvataggio…",
    saved: "Salvato",
    error: "Si è verificato un errore. Riprova.",
    requiredField: "Campo obbligatorio",
    optional: "(opzionale)",
    seeAll: "Vedi tutto",
    backToAccount: "Torna al mio account",
  },

  // Auth (login / register / forgot / reset)
  auth: {
    welcomeBack: "Bentornato",
    welcomeBackSubtitle: "Accedi per gestire i tuoi ordini e i tuoi dati.",
    createAccount: "Crea il tuo account",
    createAccountSubtitle:
      "Registrati per ordinare in modo più rapido e seguire i tuoi acquisti.",
    email: "Email",
    password: "Password",
    firstName: "Nome",
    lastName: "Cognome",
    phone: "Telefono",
    signIn: "Accedi",
    signUp: "Registrati",
    signingIn: "Accesso in corso…",
    signingUp: "Registrazione in corso…",
    forgotPassword: "Password dimenticata?",
    noAccount: "Non hai un account?",
    haveAccount: "Hai già un account?",
    invalidCredentials:
      "Email o password non valide. Verifica i dati e riprova.",
    marketingConsent:
      "Voglio ricevere offerte e novità da Arredovita. Posso disiscrivermi in qualsiasi momento.",
    termsConsent:
      "Creando un account accetti i nostri {terms} e prendi visione della nostra {privacy}.",
    termsLink: "Termini e Condizioni",
    privacyLink: "Informativa sulla Privacy",
    forgotTitle: "Recupera la tua password",
    forgotSubtitle:
      "Inserisci la tua email e ti invieremo un link per reimpostare la password.",
    forgotSubmit: "Invia link di reset",
    forgotSent:
      "Se l'indirizzo è registrato riceverai a breve un'email con le istruzioni.",
    resetTitle: "Imposta una nuova password",
    resetSubtitle: "Scegli una password sicura di almeno 8 caratteri.",
    newPassword: "Nuova password",
    confirmPassword: "Conferma password",
    passwordsMismatch: "Le password non coincidono.",
    passwordTooShort: "La password deve avere almeno 8 caratteri.",
    resetSubmit: "Aggiorna password",
    resetSuccess:
      "Password aggiornata. Ora puoi accedere con le nuove credenziali.",
    resetInvalidToken:
      "Il link è scaduto o non valido. Richiedi un nuovo link di reset.",
  },

  // Overview
  overview: {
    hello: "Ciao",
    helloFallback: "Bentornato",
    intro:
      "Da qui puoi gestire i tuoi dati, gli indirizzi di spedizione e seguire i tuoi ordini.",
    profileCompletion: "Profilo completo",
    profileCompletionHint:
      "Completa il tuo profilo per un checkout più rapido.",
    defaultAddress: "Indirizzo predefinito",
    noDefaultAddress: "Nessun indirizzo predefinito impostato.",
    addAddress: "Aggiungi indirizzo",
    recentOrders: "Ordini recenti",
    noOrders: "Non hai ancora effettuato ordini.",
    noOrdersCta: "Scopri il catalogo",
  },

  // Profile
  profile: {
    title: "Profilo",
    subtitle: "Gestisci i tuoi dati personali.",
    nameLabel: "Nome e cognome",
    emailLabel: "Email",
    phoneLabel: "Telefono",
    passwordLabel: "Password",
    billingLabel: "Indirizzo di fatturazione",
    passwordPlaceholder: "Per sicurezza la password non viene mostrata.",
    emailReadonlyHint:
      "Per cambiare email contatta l'assistenza clienti.",
    oldPassword: "Password attuale",
    newPassword: "Nuova password",
    confirmPassword: "Conferma nuova password",
    passwordUpdated: "Password aggiornata con successo.",
  },

  // Addresses
  addresses: {
    title: "Rubrica indirizzi",
    subtitle:
      "Aggiungi gli indirizzi di spedizione che usi più spesso per velocizzare il checkout.",
    addNew: "Aggiungi indirizzo",
    edit: "Modifica indirizzo",
    defaultBadge: "Predefinito",
    setDefault: "Imposta come predefinito",
    company: "Azienda",
    address1: "Indirizzo",
    address2: "Interno, scala, presso… (opzionale)",
    city: "Città",
    province: "Provincia",
    postalCode: "CAP",
    country: "Paese",
    deleteConfirm: "Sei sicuro di voler eliminare questo indirizzo?",
    invalidCap: "Il CAP deve essere di 5 cifre.",
    noAddresses: "Non hai ancora salvato indirizzi.",
  },

  // Orders
  orders: {
    title: "I miei ordini",
    subtitle: "Tutti gli ordini effettuati con il tuo account.",
    empty: "Non hai ancora effettuato ordini.",
    emptyCta: "Inizia a fare acquisti",
    orderNumber: "Ordine",
    placedOn: "Effettuato il",
    total: "Totale",
    items: "Articoli",
    seeDetails: "Vedi dettagli",
    detailsTitle: "Dettagli ordine",
    backToOrders: "Torna ai miei ordini",
    requestReturn: "Richiedi un reso",
    downloadInvoice: "Scarica fattura PDF",
    shippingAddress: "Indirizzo di spedizione",
    billingAddress: "Indirizzo di fatturazione",
    paymentMethod: "Metodo di pagamento",
    summary: "Riepilogo",
    subtotal: "Subtotale",
    shipping: "Spedizione",
    tax: "IVA",
    discount: "Sconto",
    status: {
      pending: "In attesa",
      completed: "Completato",
      archived: "Archiviato",
      canceled: "Annullato",
      requires_action: "Richiede azione",
    },
    fulfillmentStatus: {
      not_fulfilled: "Da preparare",
      partially_fulfilled: "Parzialmente preparato",
      fulfilled: "Preparato",
      partially_shipped: "Parzialmente spedito",
      shipped: "Spedito",
      delivered: "Consegnato",
      canceled: "Annullato",
      returned: "Restituito",
    },
  },

  // Returns
  returns: {
    title: "Resi",
    subtitle:
      "Richiedi la restituzione di uno o più articoli entro 14 giorni dalla consegna.",
    empty: "Non hai ancora richieste di reso.",
    requestTitle: "Richiedi un reso",
    requestSubtitle: "Seleziona gli articoli che vuoi restituire.",
    selectItems: "Articoli",
    quantity: "Q.tà",
    reason: "Motivo",
    note: "Note (opzionale)",
    submit: "Invia richiesta",
    submitting: "Invio in corso…",
    reasons: {
      defective: "Articolo difettoso",
      wrong_item: "Articolo non corrispondente",
      not_wanted: "Non più desiderato",
      damaged_in_transit: "Danneggiato durante il trasporto",
      other: "Altro",
    },
    windowExpired:
      "Il periodo di reso di 14 giorni è scaduto. Contatta l'assistenza per casi particolari.",
    submitted: "Richiesta inviata. Ti contatteremo entro 48 ore.",
  },

  // Order confirmed (thank-you page after checkout)
  orderConfirmed: {
    metaTitle: "Ordine confermato",
    metaDescription: "Il tuo acquisto è andato a buon fine",
    badge: "Ordine confermato",
    title: "Grazie!",
    subtitle: "Il tuo ordine è stato registrato con successo.",
    emailNotice: "Abbiamo inviato la conferma a",
    orderNumber: "Ordine n.",
    placedOn: "Effettuato il",
    downloadInvoice: "Scarica fattura PDF",
    viewOrders: "Vai ai miei ordini",
    itemsTitle: "Articoli",
    summaryTitle: "Riepilogo",
    shippingAddress: "Indirizzo di spedizione",
    shippingMethod: "Metodo di spedizione",
    paymentMethod: "Metodo di pagamento",
    paidAt: "Pagato il",
    nextStepsTitle: "Cosa succede ora?",
    nextStepsBody:
      "Riceverai una nuova email non appena il tuo ordine sarà preparato e spedito. Puoi seguire lo stato dell'ordine dalla tua area personale.",
    onboardingTitle: "Ordine di prova creato con successo",
    onboardingBody:
      "Puoi ora completare la configurazione del tuo negozio dall'area admin.",
    onboardingCta: "Completa la configurazione",
    paymentTitles: {
      card: "Carta di credito",
      paypal: "PayPal",
      ideal: "iDeal",
      bancontact: "Bancontact",
      manual: "Pagamento manuale",
      fallback: "Pagamento",
    },
  },

  // Preferences
  preferences: {
    title: "Preferenze",
    subtitle: "Gestisci come e quando ricevere comunicazioni da Arredovita.",
    marketingEmails: "Email promozionali e novità",
    marketingHint:
      "Offerte, nuovi arrivi e contenuti dedicati. Puoi disiscriverti in qualsiasi momento.",
    transactionalEmails: "Email transazionali",
    transactionalHint:
      "Conferme d'ordine, spedizioni e comunicazioni sui tuoi acquisti. Necessarie e non disattivabili.",
    smsNotifications: "Notifiche via SMS",
    smsHint:
      "Avvisi di spedizione e consegna via SMS. Servizio non ancora disponibile.",
    updated: "Preferenze aggiornate.",
  },
} as const

export type AccountStrings = typeof account
