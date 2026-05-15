import { Metadata } from "next"
import {
  Question,
  Envelope,
  Truck,
  ArrowsClockwise,
  ShieldCheck,
  Scroll,
  Lock,
  Cookie,
  Buildings,
} from "@phosphor-icons/react/dist/ssr"
import InfoPageLayout from "@modules/assistenza/components/info-page-layout"
import InfoCard from "@modules/assistenza/components/info-card"

export const metadata: Metadata = {
  title: "Servizio Clienti — Assistenza | Arredo Vita",
  description:
    "FAQ, contatti, spedizioni, resi, garanzia e documenti legali. Il nostro Servizio Clienti è qui per aiutarti.",
}

const CARDS = [
  {
    href: "/faq",
    icon: <Question size={22} />,
    title: "Domande Frequenti",
    description:
      "Risposte rapide su ordini, spedizioni, pagamenti, resi e garanzia.",
  },
  {
    href: "/contatti",
    icon: <Envelope size={22} />,
    title: "Contattaci",
    description:
      "Modulo, email, telefono e WhatsApp. Risposta entro 24–48 ore lavorative.",
  },
  {
    href: "/spedizioni",
    icon: <Truck size={22} />,
    title: "Spedizioni e consegna",
    description:
      "Tempi, costi, zone servite, consegna stradale o al piano.",
  },
  {
    href: "/resi",
    icon: <ArrowsClockwise size={22} />,
    title: "Resi e diritto di recesso",
    description:
      "14 giorni per ripensarci, rimborso entro 14 giorni dal ricevimento.",
  },
  {
    href: "/garanzia",
    icon: <ShieldCheck size={22} />,
    title: "Garanzia",
    description:
      "Garanzia legale di conformità di 24 mesi su tutti i prodotti.",
  },
  {
    href: "/termini",
    icon: <Scroll size={22} />,
    title: "Termini e Condizioni",
    description: "Le condizioni di vendita applicabili ai tuoi acquisti.",
  },
  {
    href: "/privacy",
    icon: <Lock size={22} />,
    title: "Privacy Policy",
    description:
      "Come trattiamo i tuoi dati personali ai sensi del GDPR.",
  },
  {
    href: "/cookie",
    icon: <Cookie size={22} />,
    title: "Cookie Policy",
    description:
      "I cookie utilizzati sul sito e come gestire le preferenze.",
  },
  {
    href: "/note-legali",
    icon: <Buildings size={22} />,
    title: "Note legali",
    description:
      "Dati societari obbligatori ai sensi del D.Lgs. 70/2003.",
  },
]

export default function AssistenzaPage() {
  return (
    <InfoPageLayout
      eyebrow="Servizio Clienti"
      title="Siamo qui per aiutarti"
      description="Trova in pochi click la risposta alle domande più frequenti, oppure scrivici direttamente. Il nostro team risponde entro 24–48 ore lavorative."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Assistenza" }]}
    >
      <div className="not-prose grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CARDS.map((c) => (
          <InfoCard key={c.href} {...c} />
        ))}
      </div>
    </InfoPageLayout>
  )
}
