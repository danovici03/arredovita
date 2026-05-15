import { Metadata } from "next"
import { listFaq } from "@lib/data/faq"
import InfoPageLayout from "@modules/assistenza/components/info-page-layout"
import FaqClient from "@modules/assistenza/components/faq-client"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Domande Frequenti (FAQ) | Arredo Vita",
  description:
    "Tutte le risposte su ordini, spedizioni, pagamenti, resi e garanzia. Cerca tra le FAQ o naviga per categoria.",
}

export default async function FaqPage() {
  const categories = await listFaq()

  return (
    <InfoPageLayout
      eyebrow="Servizio Clienti"
      title="Domande Frequenti"
      description="Cerca tra le domande più comuni o naviga per categoria. Se non trovi quello che cerchi, contattaci."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Assistenza", href: "/assistenza" },
        { label: "FAQ" },
      ]}
    >
      {categories.length === 0 ? (
        <div className="not-prose rounded-3xl bg-brand-dark/[0.03] p-8 text-center">
          <p className="text-brand-dark/70 mb-4">
            Le FAQ sono in fase di popolamento. Nel frattempo puoi scriverci
            tramite il modulo di contatto.
          </p>
          <LocalizedClientLink
            href="/contatti"
            className="inline-block px-6 py-2.5 rounded-full bg-brand-dark text-white font-semibold hover:bg-brand-accent transition-colors"
          >
            Vai ai contatti
          </LocalizedClientLink>
        </div>
      ) : (
        <div className="not-prose">
          <FaqClient categories={categories} />

          <div className="mt-16 rounded-3xl bg-brand-dark text-white p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Non hai trovato la tua risposta?
            </h2>
            <p className="text-white/70 mb-6">
              Il nostro team è a disposizione per aiutarti.
            </p>
            <LocalizedClientLink
              href="/contatti"
              className="inline-block px-8 py-3 rounded-full bg-white text-brand-dark font-semibold hover:bg-brand-accent hover:text-white transition-colors"
            >
              Contattaci
            </LocalizedClientLink>
          </div>
        </div>
      )}
    </InfoPageLayout>
  )
}
