import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  InstagramLogo,
  PinterestLogo,
} from "@phosphor-icons/react/dist/ssr"
import { COMPANY } from "@lib/util/company-info"

const SHOP_LINKS = [
  { label: "Tutti i Prodotti", href: "/store" },
  { label: "Nuova Collezione", href: "/collections" },
  { label: "Studio di Design", href: "/studio" },
  { label: "Saldi", href: "/sale" },
]

const SUPPORT_LINKS = [
  { label: "Servizio Clienti", href: "/assistenza" },
  { label: "Contatti", href: "/contatti" },
  { label: "Domande Frequenti (FAQ)", href: "/faq" },
  { label: "Spedizioni e consegna", href: "/spedizioni" },
  { label: "Resi e recesso", href: "/resi" },
  { label: "Garanzia", href: "/garanzia" },
]

const LEGAL_LINKS = [
  { label: "Termini e Condizioni", href: "/termini" },
  { label: "Informativa sulla Privacy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookie" },
  { label: "Note legali", href: "/note-legali" },
]

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-24 pb-8 rounded-t-[3rem] mt-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-4">
            <LocalizedClientLink
              href="/"
              className="inline-flex mb-8"
              aria-label="Arredo Vita — Home"
            >
              <img
                src="/logo-arredo-vita-white.svg"
                alt="Arredo Vita"
                width={3233}
                height={568}
                className="h-16 md:h-20 w-auto select-none"
                draggable={false}
              />
            </LocalizedClientLink>
            <p className="text-white/60 font-medium max-w-sm mb-8">
              Il minimalismo italiano portato nel tuo spazio. Design creato per
              resistere per generazioni.
            </p>

            <div className="flex gap-4">
              <a
                href={COMPANY.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-dark transition-colors"
              >
                <InstagramLogo size={22} />
              </a>
              <a
                href={COMPANY.social.pinterest}
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand-dark transition-colors"
              >
                <PinterestLogo size={22} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-6 text-white/50 uppercase tracking-widest text-xs">
              Negozio
            </h4>
            <ul className="space-y-4 font-bold text-sm">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <LocalizedClientLink
                    href={link.href}
                    className="hover:text-brand-accent transition-colors"
                  >
                    {link.label}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-bold mb-6 text-white/50 uppercase tracking-widest text-xs">
              Servizio Clienti
            </h4>
            <ul className="space-y-4 font-bold text-sm">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <LocalizedClientLink
                    href={link.href}
                    className="hover:text-brand-accent transition-colors"
                  >
                    {link.label}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-bold mb-6 text-white/50 uppercase tracking-widest text-xs">
              Rimani aggiornato
            </h4>
            <form className="relative bg-white/10 rounded-full p-1.5 flex">
              <input
                type="email"
                placeholder="Il tuo indirizzo email"
                className="bg-transparent border-none px-4 py-2 text-sm text-white w-full focus:outline-none placeholder:text-white/40"
              />
              <button
                type="submit"
                className="bg-white text-brand-dark px-6 py-2 rounded-full text-sm font-bold hover:bg-brand-accent hover:text-white transition-colors"
              >
                Iscriviti
              </button>
            </form>
            <p className="text-xs text-white/40 mt-3 leading-relaxed">
              Iscrivendoti accetti l&apos;
              <LocalizedClientLink
                href="/privacy"
                className="underline hover:text-white"
              >
                informativa privacy
              </LocalizedClientLink>
              .
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col gap-6 text-xs font-medium text-white/40">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p>
              &copy; {new Date().getFullYear()} {COMPANY.ragioneSociale} — P.IVA{" "}
              {COMPANY.piva} — REA {COMPANY.rea}. Tutti i diritti riservati.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <LocalizedClientLink
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </LocalizedClientLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
