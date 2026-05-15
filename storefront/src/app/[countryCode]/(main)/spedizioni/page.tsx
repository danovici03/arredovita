import { Metadata } from "next"
import InfoPageLayout from "@modules/assistenza/components/info-page-layout"
import { COMPANY } from "@lib/util/company-info"

export const metadata: Metadata = {
  title: "Spedizioni e consegna | Arredo Vita",
  description:
    "Tempi, costi e modalità di consegna. Differenza tra consegna stradale e al piano. Cosa fare in caso di pacco danneggiato.",
}

export default function SpedizioniPage() {
  return (
    <InfoPageLayout
      eyebrow="Servizio Clienti"
      title="Spedizioni e consegna"
      description="Tutto quello che ti serve sapere sui tempi, i costi e le modalità di consegna dei nostri prodotti."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Assistenza", href: "/assistenza" },
        { label: "Spedizioni" },
      ]}
    >
      <h2>Tempi di consegna</h2>
      <p>
        I tempi di consegna dipendono dal tipo di prodotto e dalla destinazione.
        La data stimata viene sempre indicata nella scheda prodotto e
        riconfermata in fase di carrello, ai sensi dell&apos;art. 49 D.Lgs.
        206/2005 (Codice del Consumo).
      </p>
      <ul>
        <li>
          <strong>Prodotti pronti in magazzino</strong>: spedizione entro 48–72
          ore lavorative dall&apos;ordine. Consegna in Italia continentale in
          genere entro 2–5 giorni lavorativi.
        </li>
        <li>
          <strong>Prodotti realizzati su ordinazione</strong>: tempi indicati in
          scheda prodotto, tipicamente 3–6 settimane. Per articoli su misura,
          fino a 8 settimane.
        </li>
        <li>
          <strong>Isole maggiori, Calabria e zone disagiate</strong>: possono
          essere previsti 1–3 giorni aggiuntivi.
        </li>
      </ul>

      <h2>Costi di spedizione</h2>
      <p>
        I costi dipendono dal volume e dal peso della merce e dalla
        destinazione. Sono sempre indicati in modo trasparente prima del
        pagamento, come previsto dall&apos;art. 49 lett. e) Cod. Cons. Eventuali
        supplementi per isole e zone particolari sono mostrati al checkout.
      </p>

      <h2>Consegna stradale o al piano</h2>
      <p>
        Per i prodotti voluminosi sono disponibili due modalità di consegna.
      </p>
      <h3>Consegna stradale (standard)</h3>
      <p>
        Il corriere consegna a piano strada, davanti all&apos;ingresso o al
        portone, con un solo operatore. È la modalità più economica ed è
        applicata di default quando non specificato diversamente.
      </p>
      <h3>Consegna al piano</h3>
      <p>
        Servizio aggiuntivo selezionabile in checkout: due operatori portano la
        merce all&apos;interno dell&apos;abitazione, anche ai piani superiori,
        su appuntamento telefonico. Non è incluso il montaggio salvo diversa
        indicazione.
      </p>
      <p>
        Il costo della consegna al piano è mostrato in fase di carrello e
        dipende dall&apos;ingombro della merce.
      </p>

      <h2>Tracking dell&apos;ordine</h2>
      <p>
        Quando il corriere prende in carico il pacco riceverai una mail con il
        link di tracciamento. Puoi seguire la spedizione anche dalla tua{" "}
        <a href="/account/orders">Area Personale</a>.
      </p>

      <h2>Pacco danneggiato o aperto: cosa fare</h2>
      <p>
        Prima di firmare la bolla di consegna, ispeziona attentamente
        l&apos;imballo. In caso di danni evidenti hai due opzioni:
      </p>
      <ol>
        <li>
          <strong>Rifiutare la consegna</strong> motivando &laquo;imballo
          danneggiato&raquo; sulla bolla. Il pacco rientra a noi e ti
          contatteremo per organizzare la sostituzione.
        </li>
        <li>
          <strong>Accettare con riserva</strong>: firma la bolla aggiungendo la
          dicitura &laquo;accetto con riserva di controllo per danni
          esterni&raquo;. Questa formula è essenziale per poter contestare
          successivamente il danno al corriere.
        </li>
      </ol>
      <p>
        In entrambi i casi, <strong>scatta foto al pacco</strong> e contattaci
        entro <strong>48 ore</strong> dalla consegna a{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> o tramite il{" "}
        <a href="/contatti">modulo di contatto</a>, allegando le immagini e il
        numero d&apos;ordine.
      </p>
      <p>
        Ricordiamo che, ai sensi della normativa vigente, la responsabilità per
        il danno durante il trasporto è del venditore fino al momento della
        presa in consegna da parte del consumatore (artt. 63 e 129 Cod. Cons.).
      </p>

      <h2>Mancata consegna o ritardo</h2>
      <p>
        Se il corriere non riesce a consegnare per tua assenza, ti lascerà
        avviso e potrai ricontattarlo per concordare un nuovo appuntamento. Se
        rilevi un ritardo significativo rispetto alla data stimata, scrivici
        subito: verificheremo lo stato della spedizione con il corriere.
      </p>

      <hr />
      <p className="text-xs text-brand-dark/50">
        Documento informativo aggiornato. Per ogni dubbio consulta i{" "}
        <a href="/termini">Termini e Condizioni di vendita</a> o{" "}
        <a href="/contatti">scrivici</a>.
      </p>
    </InfoPageLayout>
  )
}
