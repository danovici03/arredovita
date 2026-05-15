import { Metadata } from "next"
import InfoPageLayout from "@modules/assistenza/components/info-page-layout"
import { COMPANY, indirizzoCompleto } from "@lib/util/company-info"

export const metadata: Metadata = {
  title: "Resi e diritto di recesso | Arredo Vita",
  description:
    "14 giorni per il diritto di recesso ai sensi del Codice del Consumo. Procedura, rimborsi, modulo di recesso.",
}

export default function ResiPage() {
  return (
    <InfoPageLayout
      eyebrow="Servizio Clienti"
      title="Resi e diritto di recesso"
      description="Hai 14 giorni dalla consegna per ripensarci, senza alcuna motivazione. Ecco come funziona."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Assistenza", href: "/assistenza" },
        { label: "Resi" },
      ]}
    >
      <h2>Diritto di recesso — 14 giorni</h2>
      <p>
        Ai sensi degli articoli 52 e seguenti del D.Lgs. 206/2005 (Codice del
        Consumo), hai il diritto di recedere dal contratto entro{" "}
        <strong>14 giorni</strong> dal ricevimento della merce, senza fornire
        alcuna motivazione e senza spese, salvo i costi diretti di
        restituzione.
      </p>
      <p>
        Il termine di 14 giorni decorre dal giorno in cui tu o un terzo da te
        designato (diverso dal vettore) prendete fisicamente possesso
        dell&apos;ultimo bene dell&apos;ordine.
      </p>

      <h2>Come esercitare il recesso</h2>
      <p>Per esercitare il diritto di recesso è sufficiente:</p>
      <ol>
        <li>
          Inviarci una dichiarazione esplicita di recesso tramite il{" "}
          <a href="/contatti">modulo di contatto</a> selezionando come oggetto{" "}
          <em>&laquo;Reso / Diritto di recesso&raquo;</em>, oppure compilando il{" "}
          <a href="#modulo-recesso">modulo di recesso tipo</a> riportato in
          fondo a questa pagina.
        </li>
        <li>
          Riceverai conferma con istruzioni e l&apos;indirizzo a cui spedire la
          merce.
        </li>
        <li>
          Restituire il prodotto, integro e nel suo imballo originale, entro{" "}
          <strong>14 giorni</strong> dalla comunicazione di recesso.
        </li>
      </ol>
      <p>
        L&apos;onere della prova circa il corretto e tempestivo esercizio del
        recesso è a tuo carico (art. 54 c. 4 Cod. Cons.). Conserva la ricevuta
        di spedizione.
      </p>

      <h2>Spese di restituzione</h2>
      <p>
        Salvo diversa indicazione in offerta o promozione, le spese di
        restituzione sono a tuo carico ai sensi dell&apos;art. 57 Cod. Cons. Ti
        consigliamo di utilizzare un corriere assicurato, in particolare per
        articoli di valore o ingombranti.
      </p>

      <h2>Rimborso</h2>
      <p>
        Effettueremo il rimborso entro <strong>14 giorni</strong> dal
        ricevimento della tua comunicazione di recesso, utilizzando lo stesso
        metodo di pagamento da te scelto per l&apos;acquisto (art. 56 Cod.
        Cons.), salvo che tu abbia espressamente concordato diversamente.
      </p>
      <p>
        Possiamo sospendere il rimborso fino al ricevimento del bene oppure
        fino alla prova della tua avvenuta spedizione, a seconda di quale
        situazione si verifichi per prima (art. 56 c. 3 Cod. Cons.).
      </p>

      <h2>Tua responsabilità sui beni</h2>
      <p>
        Sei responsabile unicamente della diminuzione del valore dei beni
        risultante da una manipolazione del bene diversa da quella necessaria
        per stabilirne natura, caratteristiche e funzionamento (art. 57 c. 2
        Cod. Cons.). In altre parole, puoi <em>provare</em> il prodotto come in
        un negozio fisico, ma non utilizzarlo.
      </p>

      <h2>Eccezioni al diritto di recesso</h2>
      <p>
        Ai sensi dell&apos;art. 59 Cod. Cons., il diritto di recesso{" "}
        <strong>è escluso</strong> in alcuni casi. Per i nostri prodotti, le
        principali esclusioni riguardano:
      </p>
      <ul>
        <li>
          <strong>Beni confezionati su misura o chiaramente personalizzati</strong>{" "}
          (art. 59 lett. c) — dimensioni custom, tessuti su ordinazione,
          finiture non a catalogo, incisioni o stampe personalizzate. La scheda
          prodotto lo segnala esplicitamente quando applicabile. La semplice
          scelta di un colore o tessuto da una gamma a catalogo{" "}
          <em>non</em> costituisce personalizzazione e <em>non</em> esclude il
          diritto di recesso.
        </li>
        <li>
          Beni che, dopo la consegna, risultino non più idonei a essere
          restituiti per motivi igienici o connessi alla protezione della
          salute, qualora siano stati aperti (art. 59 lett. e).
        </li>
      </ul>

      <h2>Garanzia legale</h2>
      <p>
        Il diritto di recesso è cosa distinta dalla{" "}
        <a href="/garanzia">garanzia legale di conformità</a>, che dura{" "}
        <strong>24 mesi</strong> e copre i difetti del prodotto presenti al
        momento della consegna.
      </p>

      <h2 id="modulo-recesso">Modulo di recesso tipo</h2>
      <p>
        Puoi utilizzare il modulo seguente (Allegato I parte B D.Lgs. 206/2005).
        Compilalo e inviacelo via email a{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>, via PEC a{" "}
        <a href={`mailto:${COMPANY.emailPec}`}>{COMPANY.emailPec}</a>, o
        allegandolo al modulo di contatto.
      </p>

      <div className="not-prose rounded-3xl bg-brand-dark/[0.03] p-6 my-6 font-mono text-sm whitespace-pre-wrap text-brand-dark/80 leading-relaxed">
        {`Destinatario: ${COMPANY.ragioneSociale}
${indirizzoCompleto()}
Email: ${COMPANY.email}
PEC: ${COMPANY.emailPec}

Con la presente io/noi (*) notifico/notifichiamo (*) il recesso
dal mio/nostro (*) contratto di vendita dei seguenti beni:

Ordinato il ___________________ / Ricevuto il ___________________
Nome del/dei consumatore/i: _______________________________________
Indirizzo del/dei consumatore/i: __________________________________
Firma del/dei consumatore/i (solo se modulo cartaceo): ____________
Data: ___________________

(*) Cancellare la dicitura inutile.`}
      </div>

      <hr />
      <p className="text-xs text-brand-dark/50">
        Documento informativo aggiornato. In caso di dubbi consulta i{" "}
        <a href="/termini">Termini e Condizioni</a> oppure{" "}
        <a href="/contatti">contattaci</a>.
      </p>
    </InfoPageLayout>
  )
}
