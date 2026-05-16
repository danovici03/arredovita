/**
 * Informazioni societarie pubblicate ai sensi:
 * - D.Lgs. 70/2003 art. 7 (commercio elettronico — informazioni generali obbligatorie)
 * - D.Lgs. 206/2005 art. 49 (informazioni precontrattuali)
 *
 * Fonte: Visura Camerale CCIAA di Bolzano.
 */

export const COMPANY = {
  // Identità giuridica
  ragioneSociale: "Premium Transport S.r.l.",
  marchio: "Arredo Vita",
  formaGiuridica: "Società a responsabilità limitata",
  piva: "03264470216",
  codiceFiscale: "03264470216",
  rea: "BZ-245628",
  capitaleSociale: "10.000,00 € i.v.",
  amministratoreUnico: "Mircea Andrei Croitor",

  // Sede legale (da visura — Camera di Commercio di Bolzano)
  sedeLegale: {
    via: "Via Niccolò Copernico 4",
    cap: "39100",
    citta: "Bolzano",
    provincia: "BZ",
    paese: "Italia",
  },

  // Sede operativa / punto vendita / contatto clienti
  sedeOperativa: {
    via: "Via Michelangelo 9",
    cap: "25013",
    citta: "Carpenedolo",
    provincia: "BS",
    paese: "Italia",
  },

  // Contatti
  email: "info@arredovita.it",
  emailPec: "premiumtransportsrl@pecpdcna.it",
  telefono: "+39 349 827 7727",
  whatsapp: "+39 349 827 7727",

  // Orari servizio clienti
  orari: "Lun–Ven 9:00–13:00 / 14:30–18:30",
  slaRisposta: "Rispondiamo entro 24–48 ore lavorative.",

  // Social
  social: {
    instagram: "https://www.instagram.com/arredovita",
    pinterest: "https://www.pinterest.it/arredovita",
  },

  // Web
  dominio: "arredovita.it",
  baseUrl: "https://arredovita.it",
} as const

type Indirizzo = {
  readonly via: string
  readonly cap: string
  readonly citta: string
  readonly provincia: string
  readonly paese: string
}

function format(s: Indirizzo): string {
  return `${s.via}, ${s.cap} ${s.citta} (${s.provincia}), ${s.paese}`
}

export function indirizzoLegale(): string {
  return format(COMPANY.sedeLegale)
}

export function indirizzoOperativo(): string {
  return format(COMPANY.sedeOperativa)
}

/** @deprecated Usa `indirizzoLegale()` o `indirizzoOperativo()` — questa funzione punta alla sede legale per retro-compatibilità. */
export function indirizzoCompleto(): string {
  return indirizzoLegale()
}
