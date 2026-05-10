"use client"

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import { clx, useToggleState } from "@medusajs/ui"
import { ArrowRightMini } from "@medusajs/icons"
import {
  ArrowRight,
  CaretDown,
  List,
  ShoppingBag,
  User,
  X,
} from "@phosphor-icons/react/dist/ssr"
import { Fragment, ReactNode, useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"
import { FLAT_LINKS, MEGA_MENU } from "@modules/layout/components/mega-menu/data"

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
  cartIndicator?: ReactNode
}

const SideMenu = ({
  regions,
  locales,
  currentLocale,
  cartIndicator,
}: SideMenuProps) => {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(MEGA_MENU[0]?.key ?? null)
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  const close = () => setOpen(false)

  return (
    <>
      <button
        type="button"
        data-testid="nav-menu-button"
        aria-label="Apri menu"
        onClick={() => setOpen(true)}
        className="flex items-center text-brand-dark hover:text-brand-accent transition-colors"
      >
        <List size={24} weight="regular" />
      </button>

      <Transition show={open} as={Fragment}>
        <Dialog onClose={close} className="relative z-[60]">
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              as={Fragment}
              enter="transition-transform ease-[cubic-bezier(0.16,1,0.3,1)] duration-500"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition-transform ease-in duration-300"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel
                data-testid="nav-menu-popup"
                className="relative flex flex-col w-[88vw] max-w-[420px] h-full bg-brand-light text-brand-dark rounded-r-[2rem] shadow-[0_24px_60px_rgba(0,0,0,0.18)] overflow-hidden"
              >
                <div className="flex items-center justify-between px-7 pt-7">
                  <LocalizedClientLink
                    href="/"
                    onClick={close}
                    className="font-serif text-2xl font-black tracking-tighter uppercase text-brand-dark hover:text-brand-dark"
                  >
                    ARREDO VITA
                    <span className="text-brand-accent">.</span>
                  </LocalizedClientLink>
                  <button
                    type="button"
                    data-testid="close-menu-button"
                    onClick={close}
                    aria-label="Chiudi menu"
                    className="w-10 h-10 rounded-full border border-brand-dark/15 flex items-center justify-center hover:bg-brand-dark hover:text-brand-light transition-colors"
                  >
                    <X size={16} weight="regular" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-7 pt-10 pb-6">
                  <ul className="flex flex-col gap-2">
                    {MEGA_MENU.map((root) => {
                      const isOpen = expanded === root.key
                      return (
                        <li key={root.key}>
                          <button
                            type="button"
                            onClick={() =>
                              setExpanded(isOpen ? null : root.key)
                            }
                            aria-expanded={isOpen}
                            className="w-full flex items-center justify-between py-2 font-serif text-3xl text-brand-dark hover:text-brand-accent transition-colors text-left"
                          >
                            <span>{root.label}</span>
                            <CaretDown
                              size={18}
                              weight="bold"
                              className={`transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <div
                            className={`grid transition-all duration-300 ease-out ${
                              isOpen
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <ul className="flex flex-col gap-1 pl-1 pt-2 pb-3">
                                <li>
                                  <LocalizedClientLink
                                    href={root.href}
                                    onClick={close}
                                    className="group flex items-center justify-between py-1.5 text-sm font-bold uppercase tracking-[0.15em] text-brand-dark/70 hover:text-brand-dark transition-colors"
                                  >
                                    <span>Tutto il {root.label}</span>
                                    <ArrowRight
                                      size={14}
                                      weight="bold"
                                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                                    />
                                  </LocalizedClientLink>
                                </li>
                                {root.items.map((item) => (
                                  <li key={item.href}>
                                    <LocalizedClientLink
                                      href={item.href}
                                      onClick={close}
                                      className="group flex items-baseline justify-between py-1.5 text-lg text-brand-dark hover:text-brand-accent transition-colors"
                                    >
                                      <span className="flex items-baseline gap-2">
                                        <span>{item.label}</span>
                                        {item.count !== undefined && (
                                          <span className="text-xs text-brand-dark/40">
                                            {item.count}
                                          </span>
                                        )}
                                      </span>
                                      <ArrowRight
                                        size={14}
                                        weight="bold"
                                        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                                      />
                                    </LocalizedClientLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </li>
                      )
                    })}

                    {FLAT_LINKS.map((link) => (
                      <li key={link.key}>
                        <LocalizedClientLink
                          href={link.href}
                          onClick={close}
                          data-testid={`${link.key}-link`}
                          className="group flex items-baseline justify-between py-2 font-serif text-3xl text-brand-dark hover:text-brand-accent transition-colors"
                        >
                          <span>{link.label}</span>
                          <ArrowRightMini className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 pt-6 border-t border-brand-dark/10 flex flex-col gap-3">
                    <LocalizedClientLink
                      href="/cart"
                      onClick={close}
                      data-testid="cart-link"
                      className="group flex items-center justify-between bg-brand-dark text-brand-light rounded-full pl-5 pr-4 py-3.5 hover:bg-brand-accent transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <span className="relative">
                          <ShoppingBag size={22} weight="light" />
                          {cartIndicator}
                        </span>
                        <span className="text-base font-medium">
                          Vai al carrello
                        </span>
                      </span>
                      <span className="w-9 h-9 rounded-full bg-brand-light/15 flex items-center justify-center group-hover:bg-brand-light/25 transition-colors">
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                      </span>
                    </LocalizedClientLink>

                    <LocalizedClientLink
                      href="/account"
                      onClick={close}
                      data-testid="account-link"
                      className="group flex items-center justify-between border border-brand-dark/15 rounded-full pl-5 pr-4 py-3 hover:border-brand-dark transition-colors"
                    >
                      <span className="flex items-center gap-3 text-brand-dark">
                        <User size={20} weight="light" />
                        <span className="text-sm font-medium">Account</span>
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-brand-dark/60 group-hover:translate-x-0.5 group-hover:text-brand-dark transition-all"
                      />
                    </LocalizedClientLink>
                  </div>
                </nav>

                <div className="px-7 pt-5 pb-7 border-t border-brand-dark/10 bg-brand-light">
                  <div className="flex flex-col gap-3 text-sm text-brand-dark/70">
                    {!!locales?.length && (
                      <div
                        className="flex items-center justify-between"
                        onMouseEnter={languageToggleState.open}
                        onMouseLeave={languageToggleState.close}
                      >
                        <LanguageSelect
                          toggleState={languageToggleState}
                          locales={locales}
                          currentLocale={currentLocale}
                        />
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            languageToggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                    )}
                    {regions && (
                      <div
                        className="flex items-center justify-between"
                        onMouseEnter={countryToggleState.open}
                        onMouseLeave={countryToggleState.close}
                      >
                        <CountrySelect
                          toggleState={countryToggleState}
                          regions={regions}
                        />
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            countryToggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                    )}
                    <p className="text-xs text-brand-dark/50 mt-2">
                      © {new Date().getFullYear()} Arredo Vita. Tutti i diritti
                      riservati.
                    </p>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default SideMenu
