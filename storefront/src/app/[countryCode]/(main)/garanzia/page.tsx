import { Metadata } from "next"
import InfoPageLayout from "@modules/assistenza/components/info-page-layout"
import { COMPANY } from "@lib/util/company-info"

export const metadata: Metadata = {
  title: "Garanzia | Arredo Vita",
  description:
    "Garanzia legale di conformità di 24 mesi (12 mesi per i prodotti Outlet) ai sensi del Codice del Consumo. Come attivarla e cosa copre.",
}

export default function GaranziaPage() {
  return (
    <InfoPageLayout
      eyebrow="Servizio Clienti"
      title="Garanzia"
      description="Tutti i nostri prodotti sono coperti dalla garanzia legale di conformità di 24 mesi prevista dal Codice del Consumo."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Assistenza", href: "/assistenza" },
        { label: "Garanzia" },
      ]}
    >
      <h2>Garanzia legale di conformità — 24 mesi</h2>
      <p>
        Ai sensi degli articoli 128 e seguenti del D.Lgs. 206/2005 (Codice del
        Consumo), come modificato dal D.Lgs. 170/2021 in attuazione della
        Direttiva (UE) 2019/771, tutti i beni venduti a consumatori sono
        coperti da <strong>garanzia legale di conformità</strong> per un
        periodo di <strong>24 mesi</strong> a decorrere dalla data di consegna.
      </p>
      <p>
        La garanzia è prestata da Arredo Vita in qualità di venditore e si
        applica ai prodotti che presentano difetti di conformità presenti al
        momento della consegna.
      </p>

      <h2>Cosa significa &laquo;difetto di conformità&raquo;</h2>
      <p>
        Un bene è conforme al contratto quando, in particolare:
      </p>
      <ul>
        <li>
          corrisponde alla descrizione, al tipo, alla quantità e alla qualità
          previsti dal contratto;
        </li>
        <li>
          è idoneo all&apos;uso al quale è stato destinato e a quello
          tipicamente proprio di beni dello stesso tipo;
        </li>
        <li>
          è fornito con tutti gli accessori, le istruzioni e gli aggiornamenti
          eventualmente previsti.
        </li>
      </ul>

      <h2>Presunzione di esistenza del difetto — 12 mesi</h2>
      <p>
        Per i difetti che si manifestano entro <strong>12 mesi</strong> dalla
        consegna, si presume — salvo prova contraria — che essi esistessero già
        al momento della consegna stessa (art. 135 Cod. Cons.). Nei restanti
        12 mesi, l&apos;onere di provare l&apos;esistenza del difetto al momento
        della consegna ricade sul consumatore.
      </p>
      <p>
        <strong>Importante</strong>: dal 2022 non è più previsto l&apos;obbligo
        di denunciare il difetto entro 2 mesi dalla scoperta.
      </p>

      <h2>I tuoi diritti</h2>
      <p>
        In presenza di un difetto di conformità hai diritto, a tua scelta:
      </p>
      <ol>
        <li>
          <strong>al ripristino della conformità</strong> mediante riparazione
          o sostituzione, senza spese a tuo carico;
        </li>
        <li>
          a una <strong>congrua riduzione del prezzo</strong> o alla{" "}
          <strong>risoluzione del contratto</strong> nei casi previsti
          dall&apos;art. 135-bis Cod. Cons. (es. il rimedio richiesto è
          impossibile o eccessivamente oneroso, il venditore non lo esegue
          entro tempi ragionevoli, il difetto è di gravità tale da
          giustificarlo).
        </li>
      </ol>
      <p>
        Il rimedio richiesto sarà attuato entro un termine ragionevole dalla
        comunicazione e senza notevoli inconvenienti.
      </p>

      <h2>Come attivare la garanzia</h2>
      <p>Per attivare la garanzia legale è sufficiente:</p>
      <ol>
        <li>
          Contattarci tramite il <a href="/contatti">modulo di contatto</a>{" "}
          selezionando come oggetto <em>&laquo;Garanzia&raquo;</em>, oppure
          scrivendo a{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </li>
        <li>
          Indicare il <strong>numero d&apos;ordine</strong> o gli estremi di
          acquisto, descrivere il difetto e allegare{" "}
          <strong>foto/video</strong> che lo documentino.
        </li>
        <li>
          Ti risponderemo entro 24–48 ore lavorative con le indicazioni sul
          rimedio: ritiro per riparazione/sostituzione, invio di parti di
          ricambio o, ove applicabile, rimborso parziale o totale.
        </li>
      </ol>

      <h2>Garanzia legale vs garanzia commerciale</h2>
      <p>
        La <strong>garanzia legale di conformità</strong> sopra descritta è
        offerta da Arredo Vita in qualità di venditore ed è{" "}
        <em>obbligatoria per legge</em>: non puoi rinunciarvi e nessuna
        clausola contrattuale può limitarla a tuo svantaggio.
      </p>
      <p>
        La <strong>garanzia commerciale (o convenzionale)</strong> è invece
        un&apos;eventuale garanzia aggiuntiva offerta su base volontaria dal
        produttore o dal venditore, con condizioni, durata ed estensione
        definite nel relativo certificato. La garanzia commerciale, quando
        prestata, <em>si aggiunge</em> e non sostituisce la garanzia legale.
      </p>

      <h2>Esclusioni</h2>
      <p>
        Non sono coperti dalla garanzia i difetti dovuti a:
      </p>
      <ul>
        <li>uso improprio, negligente o non conforme alle istruzioni;</li>
        <li>
          normale usura conseguente all&apos;uso (es. attenuazione di colore,
          piccole irregolarità di materiali naturali come legno e pelle);
        </li>
        <li>
          interventi di riparazione o modifica effettuati da terzi non
          autorizzati;
        </li>
        <li>
          danni causati da cause esterne (cadute, urti, esposizione a fonti di
          calore, allagamenti, ecc.).
        </li>
      </ul>

      <h2>Prodotti Outlet / Ex esposizione</h2>
      <p>
        Per i prodotti contrassegnati nella scheda articolo come{" "}
        <strong>&laquo;Outlet&raquo;</strong> o{" "}
        <strong>&laquo;Ex esposizione&raquo;</strong>, in quanto beni
        usati ai sensi dell&apos;art. 134 c. 2 Cod. Cons., la durata della
        garanzia legale di conformità è ridotta a{" "}
        <strong>12 mesi</strong> dalla consegna. La disciplina completa è
        dettagliata all&apos;art. 8 dei{" "}
        <a href="/termini">Termini e Condizioni</a>.
      </p>

      <hr />
      <p className="text-xs text-brand-dark/50">
        Documento informativo aggiornato. Per ogni chiarimento consulta i{" "}
        <a href="/termini">Termini e Condizioni</a> oppure{" "}
        <a href="/contatti">scrivici</a>.
      </p>
    </InfoPageLayout>
  )
}
