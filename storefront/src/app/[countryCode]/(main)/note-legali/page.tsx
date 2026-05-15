import { Metadata } from "next"
import InfoPageLayout from "@modules/assistenza/components/info-page-layout"
import { COMPANY, indirizzoCompleto } from "@lib/util/company-info"

export const metadata: Metadata = {
  title: "Note legali | Arredo Vita",
  description:
    "Informazioni obbligatorie ai sensi dell'art. 7 D.Lgs. 70/2003 sul commercio elettronico.",
}

export default function NoteLegaliPage() {
  return (
    <InfoPageLayout
      eyebrow="Documenti"
      title="Note legali"
      description="Informazioni obbligatorie ai sensi dell'art. 7 D.Lgs. 70/2003 in materia di commercio elettronico."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Note legali" },
      ]}
    >
      <h2>Titolare del sito</h2>
      <p>
        Il sito <strong>{COMPANY.baseUrl}</strong> è di proprietà di e gestito
        da:
      </p>

      <div className="not-prose rounded-3xl bg-brand-dark/[0.03] p-6 my-6">
        <p className="font-bold text-brand-dark text-lg mb-2">
          {COMPANY.ragioneSociale}
        </p>
        <p className="text-brand-dark/80 mb-1">{indirizzoCompleto()}</p>
        <ul className="text-sm text-brand-dark/70 space-y-1 mt-3">
          <li>
            <strong>P.IVA / Codice Fiscale</strong>: {COMPANY.piva}
          </li>
          <li>
            <strong>Iscrizione REA</strong>: {COMPANY.rea}
          </li>
          <li>
            <strong>Capitale sociale</strong>: {COMPANY.capitaleSociale}
          </li>
          <li>
            <strong>Email</strong>:{" "}
            <a href={`mailto:${COMPANY.email}`} className="text-brand-accent hover:underline">
              {COMPANY.email}
            </a>
          </li>
          <li>
            <strong>PEC</strong>:{" "}
            <a href={`mailto:${COMPANY.emailPec}`} className="text-brand-accent hover:underline">
              {COMPANY.emailPec}
            </a>
          </li>
          <li>
            <strong>Telefono</strong>: {COMPANY.telefono}
          </li>
        </ul>
      </div>

      <h2>Proprietà intellettuale</h2>
      <p>
        Tutti i contenuti pubblicati sul sito (testi, immagini, fotografie,
        grafica, logo, marchi, codice) sono di proprietà di{" "}
        {COMPANY.ragioneSociale} o dei rispettivi titolari di diritti e sono
        protetti dalle norme in materia di diritto d&apos;autore (L. 633/1941),
        marchi e altri diritti di proprietà intellettuale.
      </p>
      <p>
        È vietata la riproduzione, modifica, distribuzione, trasmissione o uso
        commerciale dei contenuti senza espressa autorizzazione scritta.
      </p>

      <h2>Comunicazioni commerciali</h2>
      <p>
        Le comunicazioni commerciali eventualmente inviate da Arredo Vita sono
        identificate come tali ai sensi dell&apos;art. 8 D.Lgs. 70/2003 e
        contengono sempre indicazione su come opporsi all&apos;invio di
        successive comunicazioni.
      </p>

      <h2>Limitazione di responsabilità</h2>
      <p>
        Pur impegnandoci a garantire l&apos;esattezza e l&apos;aggiornamento
        delle informazioni pubblicate, non possiamo assumere responsabilità per
        eventuali errori od omissioni nei contenuti del sito, fatti salvi i
        diritti del consumatore previsti dalla legge.
      </p>

      <h2>Link a siti di terzi</h2>
      <p>
        Il sito può contenere link a siti web di terzi. Non controlliamo i
        contenuti di tali siti né siamo responsabili delle loro pratiche di
        privacy o dei contenuti pubblicati. Ti invitiamo a leggere le
        condizioni d&apos;uso e l&apos;informativa privacy dei siti che
        eventualmente visiti tramite tali link.
      </p>

      <h2>Documenti correlati</h2>
      <ul>
        <li>
          <a href="/termini">Termini e Condizioni di Vendita</a>
        </li>
        <li>
          <a href="/privacy">Informativa sulla Privacy</a>
        </li>
        <li>
          <a href="/cookie">Cookie Policy</a>
        </li>
      </ul>
    </InfoPageLayout>
  )
}
