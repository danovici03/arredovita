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
  MagnifyingGlass,
  ShoppingBag,
  User,
} from "@phosphor-icons/react/dist/ssr"
import NavInteractive from "./nav-interactive"

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
          cartIndicator={
            <Suspense fallback={null}>
              <SideMenuCartCount />
            </Suspense>
          }
        />
      </div>
      <LocalizedClientLink
        href="/"
        className="flex items-center shrink-0"
        data-testid="nav-store-link"
        aria-label="Arredo Vita — Home"
      >
        <img
          src="/logo-arredo-vita.svg"
          alt="Arredo Vita"
          width={3233}
          height={568}
          className="h-[var(--logo-h,2.5rem)] w-auto select-none"
          draggable={false}
        />
      </LocalizedClientLink>
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

  return <NavInteractive left={left} right={right} />
}
