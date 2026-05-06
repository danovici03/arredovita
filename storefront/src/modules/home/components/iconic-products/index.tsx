"use client"

import { ArrowRight, Heart, ShoppingBag } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import { unsplashLoader } from "@lib/util/unsplash-loader"

type Product = {
  name: string
  description: string
  price: string
  priceValue: number
  image: string
  badge?: string
  category: "chairs" | "sofas" | "other"
}

const PRODUCTS: Product[] = [
  {
    name: "Poltrona Lumina",
    description: "Legno di noce & Bouclé",
    price: "1.250€",
    priceValue: 1250,
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80",
    badge: "Nuovo",
    category: "chairs",
  },
  {
    name: "Sgabello Milano",
    description: "Pelle & Acciaio",
    price: "480€",
    priceValue: 480,
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80",
    category: "chairs",
  },
  {
    name: "Divano Venezia",
    description: "Lino lavato",
    price: "3.230€",
    priceValue: 3230,
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80",
    category: "sofas",
  },
  {
    name: "Tavolino Roma",
    description: "Travertino & Ottone",
    price: "1.850€",
    priceValue: 1850,
    image:
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80",
    category: "other",
  },
]

const FILTERS = [
  { key: "all", label: "Tutti" },
  { key: "chairs", label: "Sedie" },
  { key: "sofas", label: "Divani" },
] as const

type FilterKey = (typeof FILTERS)[number]["key"]

const IconicProducts = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all")
  const [toast, setToast] = useState<string | null>(null)
  const rootRef = useRef<HTMLElement | null>(null)
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )
    root.querySelectorAll(".reveal-up").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const showToast = (message: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    setToast(message)
    toastTimeoutRef.current = setTimeout(() => setToast(null), 3500)
  }

  const addToCart = (product: Product) => {
    showToast(`"${product.name}" (${product.price}) è stato aggiunto.`)
  }

  const visibleProducts =
    activeFilter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeFilter)

  return (
    <section
      ref={rootRef}
      className="py-16 px-4 sm:px-8 max-w-[1800px] mx-auto bg-white rounded-[3rem] sm:rounded-[4rem] my-8 shadow-sm"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-16 reveal-up">
          <h2 className="font-serif text-4xl text-brand-dark mb-6 sm:mb-0">
            Pezzi Iconici
          </h2>

          <div className="flex items-center p-1 bg-brand-light rounded-full">
            {FILTERS.map((filter) => {
              const active = activeFilter === filter.key
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${
                    active
                      ? "bg-white shadow-sm text-brand-dark"
                      : "text-brand-dark/60 hover:bg-white/50"
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {visibleProducts.map((product, index) => (
            <div
              key={product.name}
              className="product-modern-card group reveal-up"
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-brand-light mb-6">
                <Image
                  loader={unsplashLoader}
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                />

                {product.badge && (
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-dark">
                      {product.badge}
                    </span>
                  </div>
                )}

                <div className="absolute inset-x-4 bottom-4 glass-action rounded-2xl p-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-brand-dark text-white py-3 rounded-xl text-sm font-bold hover:bg-brand-accent transition-colors flex justify-center items-center gap-2"
                  >
                    <ShoppingBag size={20} /> Aggiungi
                  </button>
                  <button
                    type="button"
                    aria-label={`Aggiungi ${product.name} ai preferiti`}
                    className="w-12 h-12 flex items-center justify-center rounded-xl text-brand-dark hover:bg-white transition-colors ml-2"
                  >
                    <Heart size={22} />
                  </button>
                </div>
              </div>
              <div className="px-2 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-brand-dark mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-brand-dark/50">
                    {product.description}
                  </p>
                </div>
                <p className="font-serif text-xl text-brand-dark">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 bg-brand-light text-brand-dark px-8 py-4 rounded-full font-bold text-sm hover:bg-brand-dark hover:text-white transition-all duration-300 group"
          >
            Esplora tutto il catalogo{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed bottom-6 right-6 bg-brand-dark text-white px-6 py-4 rounded-2xl shadow-2xl transition-all duration-500 z-[100] flex items-center gap-4 ${
          toast
            ? "translate-y-0 opacity-100"
            : "translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M229.66 77.66l-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold">Aggiunto al carrello</p>
          <span className="text-xs text-brand-light/70">
            {toast ?? "Il prodotto è stato aggiunto con successo."}
          </span>
        </div>
      </div>
    </section>
  )
}

export default IconicProducts
