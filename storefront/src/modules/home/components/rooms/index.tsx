"use client"

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr"
import { useEffect, useRef } from "react"

type Room = {
  href: string
  title: string
  count: string
  description: string
  image: string
  alt: string
  variant: "dark" | "light"
}

const ROOMS: Room[] = [
  {
    href: "/categories",
    title: "Tutte le stanze",
    count: "59",
    description: "Scopri tutti i nostri ambienti",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80",
    alt: "Tutte le stanze",
    variant: "dark",
  },
  {
    href: "/categories/soggiorno",
    title: "Soggiorno",
    count: "15",
    description: "Il cuore della tua casa",
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80",
    alt: "Soggiorno",
    variant: "light",
  },
  {
    href: "/categories/cucina",
    title: "Cucina",
    count: "8",
    description: "Design e funzionalità",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80",
    alt: "Cucina",
    variant: "light",
  },
  {
    href: "/categories/camera-da-letto",
    title: "Camera da Letto",
    count: "11",
    description: "Il tuo rifugio perfetto",
    image:
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80",
    alt: "Camera da Letto",
    variant: "light",
  },
]

const Rooms = () => {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const rootRef = useRef<HTMLElement | null>(null)

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

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8 * direction
    el.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <section
      ref={rootRef}
      className="py-12 px-4 sm:px-8 max-w-[1800px] mx-auto overflow-hidden"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 reveal-up">
        <div className="max-w-xl">
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-dark mb-4">
            Trova la tua estetica.
          </h2>
          <p className="text-brand-dark/60 font-medium">
            Esplora le nostre collezioni organizzate perfettamente per ogni
            spazio della tua casa.
          </p>
        </div>

        <div className="flex items-center gap-4 mt-6 md:mt-0">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scorri a sinistra"
            className="w-12 h-12 rounded-full border border-brand-dark/20 flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scorri a destra"
            className="w-12 h-12 rounded-full bg-brand-dark text-white flex items-center justify-center hover:bg-brand-accent transition-all"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {ROOMS.map((room, index) => {
          const isDark = room.variant === "dark"
          return (
            <a
              key={room.href}
              href={room.href}
              className={`group relative flex-none w-[280px] sm:w-[360px] h-[480px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden snap-start reveal-up ${
                isDark
                  ? "img-zoom-wrapper"
                  : "bg-brand-light border border-brand-dark/5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 flex flex-col"
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {isDark ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={room.image}
                    alt={room.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end text-white">
                    <div>
                      <h3 className="font-bold text-3xl flex items-start gap-1">
                        {room.title}{" "}
                        <span className="text-sm font-medium mt-1">
                          {room.count}
                        </span>
                      </h3>
                      <p className="text-white/80 mt-2 text-sm">
                        {room.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={24}
                      className="group-hover:translate-x-2 transition-transform mb-1"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full h-[65%] overflow-hidden img-zoom-wrapper">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={room.image}
                      alt={room.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex justify-between items-end p-6 sm:p-8">
                    <div>
                      <h3 className="font-bold text-2xl text-brand-dark flex items-start gap-1">
                        {room.title}{" "}
                        <span className="text-xs font-bold mt-1 text-brand-dark/50">
                          {room.count}
                        </span>
                      </h3>
                      <p className="text-brand-dark/60 text-sm mt-1">
                        {room.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-brand-dark group-hover:translate-x-2 transition-transform mb-1"
                    />
                  </div>
                </>
              )}
            </a>
          )
        })}
      </div>
    </section>
  )
}

export default Rooms
