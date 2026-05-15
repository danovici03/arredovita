import { Metadata } from "next"
import {
  Envelope,
  Phone,
  WhatsappLogo,
  MapPin,
  Clock,
} from "@phosphor-icons/react/dist/ssr"
import InfoPageLayout from "@modules/assistenza/components/info-page-layout"
import ContattiForm from "@modules/assistenza/components/contatti-form"
import { COMPANY, indirizzoCompleto } from "@lib/util/company-info"

export const metadata: Metadata = {
  title: "Contatti | Arredo Vita",
  description:
    "Scrivici tramite modulo di contatto, email, telefono o WhatsApp. Risposta entro 24–48 ore lavorative.",
}

const CHANNELS = [
  {
    icon: <Envelope size={22} weight="duotone" />,
    label: "Email",
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
  },
  {
    icon: <Phone size={22} weight="duotone" />,
    label: "Telefono",
    value: COMPANY.telefono,
    href: `tel:${COMPANY.telefono.replace(/\s+/g, "")}`,
  },
  {
    icon: <WhatsappLogo size={22} weight="duotone" />,
    label: "WhatsApp",
    value: COMPANY.whatsapp,
    href: `https://wa.me/${COMPANY.whatsapp.replace(/[^\d]/g, "")}`,
  },
]

export default function ContattiPage() {
  return (
    <InfoPageLayout
      eyebrow="Servizio Clienti"
      title="Contattaci"
      description="Scegli il canale che preferisci. Rispondiamo entro 24–48 ore lavorative (lun–ven)."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Assistenza", href: "/assistenza" },
        { label: "Contatti" },
      ]}
    >
      <div className="not-prose grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold text-brand-dark mb-2">
            Scrivici un messaggio
          </h2>
          <p className="text-brand-dark/60 mb-8">
            Compila il modulo e ti contatteremo al più presto.
          </p>
          <ContattiForm />
        </div>

        <aside className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl bg-brand-dark/[0.03] p-6">
            <h3 className="text-lg font-bold text-brand-dark mb-4">
              Altri canali
            </h3>
            <ul className="space-y-4">
              {CHANNELS.map((c) => (
                <li key={c.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-brand-dark flex items-center justify-center shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-dark/50">
                      {c.label}
                    </p>
                    <a
                      href={c.href}
                      className="text-brand-dark hover:text-brand-accent font-medium break-all"
                    >
                      {c.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-brand-dark/[0.03] p-6">
            <h3 className="text-lg font-bold text-brand-dark mb-4">Orari</h3>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-brand-dark flex items-center justify-center shrink-0">
                <Clock size={22} weight="duotone" />
              </div>
              <div>
                <p className="text-brand-dark font-medium">{COMPANY.orari}</p>
                <p className="text-sm text-brand-dark/60 mt-1">
                  {COMPANY.slaRisposta}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-brand-dark/[0.03] p-6">
            <h3 className="text-lg font-bold text-brand-dark mb-4">
              Sede legale
            </h3>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-brand-dark flex items-center justify-center shrink-0">
                <MapPin size={22} weight="duotone" />
              </div>
              <div>
                <p className="font-semibold text-brand-dark">
                  {COMPANY.ragioneSociale}
                </p>
                <p className="text-sm text-brand-dark/70 mt-1">
                  {indirizzoCompleto()}
                </p>
                <p className="text-xs text-brand-dark/50 mt-2">
                  P.IVA {COMPANY.piva} — REA {COMPANY.rea}
                </p>
                <p className="text-xs text-brand-dark/50 mt-1">
                  PEC: {COMPANY.emailPec}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </InfoPageLayout>
  )
}
