/**
 * Informazioni societarie pubblicate ai sensi:
 * - D.Lgs. 70/2003 art. 7 (commercio elettronico — informazioni generali obbligatorie)
 * - D.Lgs. 206/2005 art. 49 (informazioni precontrattuali)
 *
 * I valori contrassegnati come "TODO" devono essere confermati prima della messa
 * in produzione. Sostituire qui propaga su footer, /contatti, /note-legali ed
 * email transazionali.
 */

export const COMPANY = {
  // Identità giuridica
  ragioneSociale: "Arredo Vita S.r.l.", // TODO: confermare denominazione esatta
  marchio: "Arredo Vita",
  piva: "IT00000000000", // TODO: inserire P.IVA reale
  codiceFiscale: "00000000000", // TODO: inserire CF
  rea: "XX-000000", // TODO: numero REA (Camera di Commercio)
  capitaleSociale: "10.000,00 €", // TODO: capitale sociale i.v.

  // Sede
  sedeLegale: {
    via: "Via Esempio, 1", // TODO
    cap: "00000",
    citta: "Città",
    provincia: "XX",
    paese: "Italia",
  },

  // Contatti
  email: "ufficio@arredovita.it",
  emailPec: "arredovita@pec.it", // TODO: PEC ufficiale
  telefono: "+39 000 000 0000", // TODO: numero pubblico
  whatsapp: "+39 000 000 0000", // TODO: stesso numero o dedicato

  // Orari servizio clienti (testo libero, mostrato in /contatti e footer)
  orari: "Lun–Ven 9:00–13:00 / 14:30–18:30",
  slaRisposta: "Rispondiamo entro 24–48 ore lavorative.",

  // Social
  social: {
    instagram: "https://www.instagram.com/arredovita", // TODO
    pinterest: "https://www.pinterest.it/arredovita", // TODO
  },

  // Web
  dominio: "arredovita.it",
  baseUrl: "https://arredovita.it",
} as const

export function indirizzoCompleto(): string {
  const s = COMPANY.sedeLegale
  return `${s.via}, ${s.cap} ${s.citta} (${s.provincia}), ${s.paese}`
}
