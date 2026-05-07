import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import SideMenuCartCount from "@modules/layout/components/side-menu/cart-count"
import {
  List,
  MagnifyingGlass,
  ShoppingBag,
  User,
} from "@phosphor-icons/react/dist/ssr"
import NavShell from "./nav-shell"

const NAV_LINKS = [
  { label: "Negozio", href: "/store" },
  { label: "Collezioni", href: "/collections" },
  { label: "Esplora", href: "/categories" },
  { label: "Confronta", href: "/compare" },
  { label: "Contatti", href: "/contact" },
  { label: "Caratteristiche", href: "/features" },
]

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  const left = (
    <>
      <div className="lg:hidden">
        <SideMenu
          regions={regions}
          locales={locales}
          currentLocale={currentLocale}
          links={NAV_LINKS}
          cartIndicator={
            <Suspense fallback={null}>
              <SideMenuCartCount />
            </Suspense>
          }
        />
      </div>
      <LocalizedClientLink
        href="/"
        className="font-serif text-2xl lg:text-3xl font-black tracking-tighter text-brand-dark uppercase hover:text-brand-dark"
        data-testid="nav-store-link"
      >
        ARREDO VITA<span className="text-brand-accent">.</span>
      </LocalizedClientLink>
    </>
  )

  const center = (
    <>
      {NAV_LINKS.map((link) => (
        <LocalizedClientLink
          key={link.href}
          href={link.href}
          className="hover:text-brand-accent transition-colors"
        >
          {link.label}
        </LocalizedClientLink>
      ))}
    </>
  )

  const right = (
    <>
      <button
        type="button"
        className="hover:text-brand-accent transition-colors"
        aria-label="Cerca"
      >
        <MagnifyingGlass size={26} weight="light" />
      </button>
      <LocalizedClientLink
        href="/account"
        className="hidden sm:block hover:text-brand-accent transition-colors"
        data-testid="nav-account-link"
        aria-label="Account"
      >
        <User size={26} weight="light" />
      </LocalizedClientLink>
      <Suspense
        fallback={
          <LocalizedClientLink
            href="/cart"
            className="hover:text-brand-accent transition-colors relative"
            data-testid="nav-cart-link"
            aria-label="Carrello"
          >
            <ShoppingBag size={26} weight="light" />
            <span className="absolute -top-1 -right-1 bg-brand-dark text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </LocalizedClientLink>
        }
      >
        <CartButton />
      </Suspense>
    </>
  )

  return <NavShell left={left} center={center} right={right} />
}
