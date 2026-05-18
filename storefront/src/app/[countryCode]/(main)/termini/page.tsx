import { Metadata } from "next"
import InfoPageLayout from "@modules/assistenza/components/info-page-layout"
import { COMPANY, indirizzoLegale } from "@lib/util/company-info"

export const metadata: Metadata = {
  title: "Termini e Condizioni di Vendita | Arredo Vita",
  description:
    "Termini e Condizioni di vendita ai sensi del Codice del Consumo italiano.",
}

const REVISION_DATE = "novembre 2026"

export default function TerminiPage() {
  return (
    <InfoPageLayout
      eyebrow="Documenti"
      title="Termini e Condizioni di Vendita"
      description={`Documento aggiornato al ${REVISION_DATE}. In caso di modifiche, le condizioni applicabili sono quelle vigenti al momento dell'ordine.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Termini" },
      ]}
    >
      <h2>1. Informazioni sul venditore</h2>
      <p>
        Il presente sito è gestito da <strong>{COMPANY.ragioneSociale}</strong>{" "}
        (di seguito il &laquo;Venditore&raquo; o &laquo;noi&raquo;), con sede
        legale in {indirizzoLegale()}, P.IVA e Codice Fiscale{" "}
        {COMPANY.piva}, iscrizione REA {COMPANY.rea}, capitale sociale{" "}
        {COMPANY.capitaleSociale}, indirizzo email{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>, PEC{" "}
        <a href={`mailto:${COMPANY.emailPec}`}>{COMPANY.emailPec}</a>, telefono{" "}
        {COMPANY.telefono}.
      </p>

      <h2>2. Ambito di applicazione</h2>
      <p>
        Le presenti Condizioni Generali di Vendita (di seguito &laquo;
        Condizioni&raquo;) disciplinano l&apos;offerta e la vendita dei
        prodotti pubblicati sul sito {COMPANY.baseUrl} (di seguito il &laquo;
        Sito&raquo;). Le Condizioni si applicano agli acquisti effettuati da
        consumatori — persone fisiche che agiscono per scopi estranei alla
        propria attività imprenditoriale o professionale (art. 3 D.Lgs.
        206/2005) — nonché, salvo deroghe espresse, agli acquisti effettuati da
        professionisti.
      </p>
      <p>
        L&apos;effettuazione di un ordine implica la presa visione e
        l&apos;accettazione integrale delle presenti Condizioni nella versione
        vigente al momento dell&apos;ordine.
      </p>

      <h2>3. Procedura d&apos;ordine e conclusione del contratto</h2>
      <p>
        Per acquistare è sufficiente aggiungere i prodotti al carrello e
        seguire la procedura guidata di checkout. Prima dell&apos;invio
        dell&apos;ordine, ti sarà mostrata una pagina di riepilogo contenente:
        descrizione dei beni, prezzo totale comprensivo di imposte, spese di
        spedizione, tempi di consegna, metodi di pagamento, condizioni di
        recesso e garanzia legale.
      </p>
      <p>
        Il contratto si conclude nel momento in cui ricevi via email la nostra
        conferma d&apos;ordine. Ci riserviamo il diritto di non accettare
        ordini incompleti o inseriti da clienti con cui sussistano controversie
        pendenti.
      </p>

      <h2>4. Prezzi e pagamenti</h2>
      <p>
        Tutti i prezzi sono espressi in Euro e comprendono l&apos;IVA. Le
        eventuali spese di spedizione sono indicate separatamente nel carrello
        prima del pagamento. Sono accettati i metodi di pagamento elencati al
        checkout (carte di credito/debito, bonifico bancario, eventuali servizi
        terzi). I pagamenti con carta sono gestiti da provider PCI-DSS Level 1
        e sono protetti dall&apos;autenticazione forte SCA ai sensi della
        direttiva PSD2.
      </p>

      <h2>5. Spedizione e consegna</h2>
      <p>
        Le modalità, i tempi e i costi di spedizione sono descritti nella
        pagina <a href="/spedizioni">Spedizioni e consegna</a> e sono
        comunicati prima della conclusione del contratto. La consegna avviene
        di norma in Italia entro i termini ivi indicati. Eventuali ritardi
        derivanti da cause di forza maggiore (scioperi dei vettori, eventi
        naturali, restrizioni amministrative) non costituiscono inadempimento.
      </p>

      <h2>6. Diritto di recesso</h2>
      <p>
        Hai il diritto di recedere dal contratto entro <strong>14 giorni</strong>{" "}
        dal ricevimento della merce, senza fornire alcuna motivazione, ai
        sensi degli artt. 52–59 D.Lgs. 206/2005. La procedura, i tempi di
        rimborso, le eccezioni (in particolare i beni su misura o
        personalizzati) e il modulo di recesso tipo sono descritti nella
        pagina dedicata <a href="/resi">Resi</a>, che costituisce parte
        integrante delle presenti Condizioni.
      </p>

      <h2>7. Garanzia legale di conformità</h2>
      <p>
        Tutti i prodotti venduti a consumatori beneficiano della garanzia
        legale di conformità della durata di <strong>24 mesi</strong> dalla
        consegna, ai sensi degli artt. 128 e seguenti D.Lgs. 206/2005, come
        modificati dal D.Lgs. 170/2021. Per i prodotti contrassegnati come
        Outlet / Ex esposizione si applica la disciplina speciale di cui al
        successivo art. 8. Per le modalità di attivazione e i rimedi
        disponibili consulta la pagina <a href="/garanzia">Garanzia</a>.
      </p>

      <h2 id="prodotti-outlet">8. Prodotti Outlet / Ex esposizione</h2>
      <p>
        Alcuni prodotti presenti sul Sito sono contrassegnati nella scheda
        articolo con il badge <strong>&laquo;Outlet&raquo;</strong> o{" "}
        <strong>&laquo;Ex esposizione&raquo;</strong>. Si tratta di beni che
        sono stati esposti nel nostro showroom o impiegati a fini espositivi
        e che sono pertanto qualificabili come beni <em>usati</em> ai sensi
        dell&apos;art. 134 c. 2 D.Lgs. 206/2005.
      </p>
      <p>
        La scheda prodotto degli articoli Outlet riporta espressamente: (i)
        il prezzo di listino e il prezzo scontato applicato; (ii) lo{" "}
        <strong>stato del bene</strong>, con fotografie degli eventuali
        segni d&apos;uso, graffi o piccole imperfezioni; (iii) la durata
        ridotta della garanzia legale di conformità.
      </p>
      <p>
        Su tali articoli la durata della garanzia legale di conformità è{" "}
        <strong>ridotta a 12 mesi</strong> dalla consegna, in deroga al
        termine ordinario di 24 mesi, ai sensi dell&apos;art. 134 c. 2 Cod.
        Cons. Accettando le presenti Condizioni in fase di checkout, il
        consumatore presta accordo espresso a tale riduzione limitatamente
        agli articoli Outlet eventualmente presenti nell&apos;ordine. La
        riduzione non incide sui rimedi disponibili (riparazione,
        sostituzione, riduzione del prezzo, risoluzione del contratto) né
        sui diritti inderogabili del consumatore.
      </p>
      <p>
        I difetti, segni d&apos;uso e imperfezioni{" "}
        <strong>dichiarati e documentati</strong> nella scheda prodotto al
        momento dell&apos;acquisto non costituiscono difetti di conformità
        e non sono coperti dalla garanzia, ai sensi dell&apos;art. 1491
        c.c.
      </p>
      <p>
        Gli articoli Outlet beneficiano comunque del{" "}
        <strong>diritto di recesso di 14 giorni</strong> alle medesime
        condizioni degli altri prodotti (vedi pagina{" "}
        <a href="/resi">Resi</a>). In caso di recesso, il bene deve essere
        restituito nello stesso stato in cui è stato consegnato, completo
        di imballo originale e di tutti i componenti; la diminuzione di
        valore derivante da manipolazione ulteriore rispetto a quella
        necessaria per verificarne natura, caratteristiche e funzionamento
        sarà addebitata sul rimborso (art. 57 c. 2 Cod. Cons.).
      </p>

      <h2>9. Responsabilità</h2>
      <p>
        Adottiamo la massima cura nella descrizione e nella rappresentazione
        dei prodotti. Lievi differenze cromatiche o di finitura, in particolare
        su materiali naturali (legno, pelle, marmo), non costituiscono difetto
        di conformità.
      </p>
      <p>
        Nei limiti consentiti dalla legge, la nostra responsabilità verso il
        consumatore è limitata al prezzo del prodotto. Restano fermi i diritti
        inderogabili del consumatore previsti dal Codice del Consumo.
      </p>

      <h2>10. Risoluzione delle controversie</h2>
      <p>
        Per qualunque controversia ti invitiamo a contattarci preventivamente
        per cercare una soluzione bonaria. Ai sensi dell&apos;art. 141 e
        seguenti D.Lgs. 206/2005 puoi rivolgerti su base volontaria a un
        organismo di risoluzione alternativa delle controversie (ADR) iscritto
        presso il Ministero competente, ad esempio la Camera di Commercio.
      </p>
      <p>
        Si ricorda che la <strong>Piattaforma europea di risoluzione delle
        controversie online (ODR)</strong> è stata dismessa il 20 luglio 2025
        ai sensi del Regolamento (UE) 2024/3228.
      </p>

      <h2>11. Legge applicabile e foro competente</h2>
      <p>
        Le presenti Condizioni e i contratti conclusi tramite il Sito sono
        regolati dalla legge italiana. Per le controversie derivanti dal
        contratto è competente in via esclusiva il giudice del luogo di
        residenza o di domicilio del consumatore, se ubicati nel territorio
        dello Stato (art. 66-bis Cod. Cons.).
      </p>

      <h2>12. Modifiche</h2>
      <p>
        Ci riserviamo di modificare le presenti Condizioni in qualunque
        momento; le modifiche entrano in vigore al momento della pubblicazione
        sul Sito e si applicano agli ordini effettuati successivamente. La
        versione applicabile al tuo ordine è quella vigente al momento della
        conferma d&apos;ordine.
      </p>

      <hr />
      <p className="text-xs text-brand-dark/50">
        Documento aggiornato al {REVISION_DATE}. Revisione legale a cura di
        [avvocato di riferimento — da inserire]. Prima della messa in
        produzione si raccomanda la validazione del testo da parte di un
        professionista abilitato.
      </p>
    </InfoPageLayout>
  )
}
