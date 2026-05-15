import { Metadata } from "next"
import InfoPageLayout from "@modules/assistenza/components/info-page-layout"
import { COMPANY, indirizzoCompleto } from "@lib/util/company-info"

export const metadata: Metadata = {
  title: "Informativa sulla Privacy | Arredo Vita",
  description:
    "Informativa sul trattamento dei dati personali ai sensi del Regolamento (UE) 2016/679 (GDPR).",
}

const REVISION_DATE = "novembre 2026"

export default function PrivacyPage() {
  return (
    <InfoPageLayout
      eyebrow="Documenti"
      title="Informativa sulla Privacy"
      description={`Resa ai sensi degli articoli 13 e 14 del Regolamento (UE) 2016/679 (GDPR). Documento aggiornato al ${REVISION_DATE}.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Privacy" },
      ]}
    >
      <h2>1. Titolare del trattamento</h2>
      <p>
        Il Titolare del trattamento è <strong>{COMPANY.ragioneSociale}</strong>,
        con sede legale in {indirizzoCompleto()}, P.IVA {COMPANY.piva}.{" "}
        <br />
        Email: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> · PEC:{" "}
        <a href={`mailto:${COMPANY.emailPec}`}>{COMPANY.emailPec}</a>.
      </p>

      <h2>2. Responsabile della Protezione dei Dati (DPO)</h2>
      <p>
        Il Titolare non ha designato un DPO, non ricorrendo i presupposti
        dell&apos;art. 37 GDPR. Per esercitare i tuoi diritti puoi contattare
        direttamente il Titolare agli indirizzi sopra indicati.
      </p>

      <h2>3. Categorie di dati trattati</h2>
      <ul>
        <li>
          <strong>Dati anagrafici e di contatto</strong>: nome, cognome, email,
          telefono, indirizzi di spedizione e fatturazione.
        </li>
        <li>
          <strong>Dati di pagamento</strong>: gestiti direttamente dai provider
          di pagamento (es. Stripe). Non memorizziamo i numeri completi delle
          carte.
        </li>
        <li>
          <strong>Dati fiscali</strong>: ragione sociale, P.IVA / Codice
          Fiscale, codice destinatario o PEC (per emissione fattura).
        </li>
        <li>
          <strong>Dati di navigazione</strong>: log, indirizzo IP, dispositivo,
          pagine visitate (limitatamente ai cookie tecnici e, previo consenso,
          analitici o di profilazione — vedi <a href="/cookie">Cookie Policy</a>).
        </li>
        <li>
          <strong>Comunicazioni</strong>: contenuto dei messaggi che ci invii
          tramite il modulo di contatto, email, telefono.
        </li>
      </ul>

      <h2>4. Finalità e basi giuridiche del trattamento</h2>
      <table>
        <thead>
          <tr>
            <th>Finalità</th>
            <th>Base giuridica</th>
            <th>Conservazione</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gestione dell&apos;ordine, spedizione, assistenza</td>
            <td>Esecuzione del contratto (art. 6.1.b GDPR)</td>
            <td>10 anni (obbligo fiscale)</td>
          </tr>
          <tr>
            <td>Fatturazione e adempimenti contabili</td>
            <td>Obbligo legale (art. 6.1.c GDPR)</td>
            <td>10 anni</td>
          </tr>
          <tr>
            <td>Risposta a richieste tramite modulo di contatto</td>
            <td>Esecuzione di misure precontrattuali (art. 6.1.b GDPR)</td>
            <td>2 anni dall&apos;ultima interazione</td>
          </tr>
          <tr>
            <td>Marketing diretto (newsletter)</td>
            <td>Consenso (art. 6.1.a GDPR)</td>
            <td>Fino a revoca</td>
          </tr>
          <tr>
            <td>Statistiche aggregate / miglioramento del sito</td>
            <td>Legittimo interesse o consenso (cookie)</td>
            <td>Fino a 14 mesi</td>
          </tr>
          <tr>
            <td>Difesa di un diritto in sede giudiziaria</td>
            <td>Legittimo interesse (art. 6.1.f GDPR)</td>
            <td>Fino a esaurimento dell&apos;azione</td>
          </tr>
        </tbody>
      </table>

      <h2>5. Destinatari dei dati</h2>
      <p>I dati possono essere comunicati a:</p>
      <ul>
        <li>
          <strong>Fornitori IT</strong> in qualità di responsabili del
          trattamento ex art. 28 GDPR: Vercel Inc. (hosting storefront),
          Hetzner Online GmbH (hosting backend e database), Resend Inc. (invio
          email transazionali), provider di pagamento (es. Stripe Payments
          Europe Ltd).
        </li>
        <li>
          <strong>Corrieri</strong> per la consegna degli ordini.
        </li>
        <li>
          <strong>Consulenti professionali</strong> (commercialista, legale)
          per gli adempimenti di legge.
        </li>
        <li>
          <strong>Autorità pubbliche</strong> nei casi previsti dalla legge.
        </li>
      </ul>
      <p>
        I dati <strong>non</strong> sono oggetto di cessione o diffusione a
        terzi a fini commerciali.
      </p>

      <h2>6. Trasferimento dati extra SEE</h2>
      <p>
        Alcuni dei fornitori sopra elencati (es. Resend Inc., Vercel Inc.) sono
        stabiliti negli Stati Uniti. Il trasferimento è garantito dalle
        decisioni di adeguatezza della Commissione Europea (Data Privacy
        Framework, ove applicabile) e dalle Clausole Contrattuali Standard
        (Decisione 2021/914/UE).
      </p>

      <h2>7. Diritti dell&apos;interessato</h2>
      <p>Ai sensi degli artt. 15–22 GDPR hai diritto di:</p>
      <ul>
        <li>accedere ai tuoi dati (art. 15);</li>
        <li>rettificarli (art. 16);</li>
        <li>chiederne la cancellazione (art. 17);</li>
        <li>limitarne il trattamento (art. 18);</li>
        <li>ricevere i dati in formato strutturato (portabilità, art. 20);</li>
        <li>
          opporti al trattamento basato sul legittimo interesse o per finalità
          di marketing (art. 21);
        </li>
        <li>
          revocare in qualsiasi momento il consenso prestato (senza
          pregiudicare la liceità del trattamento basato sul consenso prima
          della revoca).
        </li>
      </ul>
      <p>
        Per esercitare questi diritti scrivi a{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Risponderemo
        entro 30 giorni (prorogabili fino a 60 in casi complessi, art. 12.3
        GDPR).
      </p>

      <h2>8. Reclamo al Garante</h2>
      <p>
        Se ritieni che il trattamento dei tuoi dati violi il GDPR puoi
        proporre reclamo all&apos;Autorità Garante per la protezione dei dati
        personali (Piazza Venezia 11, 00187 Roma —{" "}
        <a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer">
          garanteprivacy.it
        </a>
        ).
      </p>

      <h2>9. Modifiche</h2>
      <p>
        La presente informativa può essere aggiornata in qualsiasi momento.
        L&apos;ultima revisione è indicata a fondo pagina.
      </p>

      <hr />
      <p className="text-xs text-brand-dark/50">
        Documento aggiornato al {REVISION_DATE}. Revisione legale a cura di
        [DPO / avvocato di riferimento — da inserire].
      </p>
    </InfoPageLayout>
  )
}
