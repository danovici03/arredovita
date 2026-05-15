import { Metadata } from "next"
import InfoPageLayout from "@modules/assistenza/components/info-page-layout"

export const metadata: Metadata = {
  title: "Cookie Policy | Arredo Vita",
  description:
    "Informativa estesa sull'uso dei cookie e di altri strumenti di tracciamento, ai sensi del Provvedimento del Garante 10 giugno 2021.",
}

const REVISION_DATE = "novembre 2026"

export default function CookiePage() {
  return (
    <InfoPageLayout
      eyebrow="Documenti"
      title="Cookie Policy"
      description={`Informativa estesa ai sensi del Provvedimento del Garante per la protezione dei dati personali del 10 giugno 2021 n. 231 e del Regolamento (UE) 2016/679 (GDPR). Documento aggiornato al ${REVISION_DATE}.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Cookie Policy" },
      ]}
    >
      <h2>1. Cosa sono i cookie</h2>
      <p>
        I cookie sono piccoli file di testo che i siti web visitati
        dall&apos;utente inviano al suo terminale, dove vengono memorizzati e
        ritrasmessi al sito alla visita successiva. Strumenti analoghi
        (pixel, local storage, fingerprinting) sono trattati alla stregua dei
        cookie quando svolgono funzioni simili.
      </p>

      <h2>2. Tipologie di cookie utilizzati</h2>

      <h3>2.1 Cookie tecnici</h3>
      <p>
        Indispensabili per il funzionamento del sito (es. login, carrello,
        preferenza regione, sicurezza). Non richiedono consenso ai sensi
        dell&apos;art. 122 D.Lgs. 196/2003. I principali cookie tecnici
        utilizzati sono:
      </p>
      <ul>
        <li>
          <code>_medusa_cache_id</code>, <code>_medusa_cart_id</code>,{" "}
          <code>_medusa_jwt</code> — gestione della sessione di acquisto e
          autenticazione.
        </li>
        <li>
          Cookie di bilanciamento del carico e protezione anti-CSRF impostati
          dall&apos;infrastruttura di hosting.
        </li>
      </ul>

      <h3>2.2 Cookie analitici</h3>
      <p>
        Utilizzati, ove attivi, per raccogliere informazioni in forma
        aggregata sull&apos;uso del sito. Sono installati solo dopo aver
        ottenuto il tuo consenso espresso tramite l&apos;apposito banner.
      </p>
      <p>
        <em>
          Al momento il sito non utilizza cookie analitici; questa sezione sarà
          aggiornata qualora venissero introdotti.
        </em>
      </p>

      <h3>2.3 Cookie di profilazione e marketing</h3>
      <p>
        Cookie che creano profili sull&apos;utente per inviare messaggi
        pubblicitari in linea con gli interessi manifestati nella navigazione.
        Sono installati solo dopo il tuo consenso espresso.
      </p>
      <p>
        <em>
          Al momento il sito non utilizza cookie di profilazione; questa
          sezione sarà aggiornata qualora venissero introdotti.
        </em>
      </p>

      <h2>3. Come gestire le preferenze</h2>
      <p>
        Puoi gestire le tue preferenze in qualunque momento tramite il pulsante
        &laquo;Gestisci preferenze cookie&raquo; presente in fondo a ogni
        pagina (in implementazione). In alternativa puoi configurare il tuo
        browser per accettare, rifiutare o cancellare i cookie:
      </p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie"
            target="_blank"
            rel="noreferrer"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noreferrer"
          >
            Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/it-it/help/4027947"
            target="_blank"
            rel="noreferrer"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>
      <p>
        La disabilitazione dei cookie tecnici può compromettere il corretto
        funzionamento del sito.
      </p>

      <h2>4. Rinnovo delle preferenze</h2>
      <p>
        Ai sensi del Provvedimento del Garante del 10 giugno 2021, il banner di
        consenso viene riproposto non più frequentemente di una volta ogni 6
        mesi, salvo modifiche significative delle condizioni del trattamento.
      </p>

      <h2>5. Titolare del trattamento e contatti</h2>
      <p>
        Per maggiori informazioni sulle finalità del trattamento, la base
        giuridica, la conservazione, i destinatari e i diritti
        dell&apos;interessato consulta l&apos;
        <a href="/privacy">Informativa sulla Privacy</a>.
      </p>

      <hr />
      <p className="text-xs text-brand-dark/50">
        Documento aggiornato al {REVISION_DATE}. Le informazioni su cookie
        analitici e di profilazione saranno integrate in seguito a un audit
        tecnico completo e all&apos;eventuale attivazione di servizi terzi.
      </p>
    </InfoPageLayout>
  )
}
