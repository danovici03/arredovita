"use client"

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr"
import { useEffect, useRef, useState } from "react"

type Slide = {
  image: string
  alt: string
  titleLine1: string
  titleLine2: string
  cta: string
}

const SLIDES: Slide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80",
    alt: "Divano Lumina",
    titleLine1: "VIVI UN'ELEGANZA",
    titleLine2: "SENZA PARAGONI",
    cta: "Esplora la Collezione",
  },
  {
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80",
    alt: "Letto Sogno",
    titleLine1: "IL TUO RIFUGIO",
    titleLine2: "DI PACE QUOTIDIANO",
    cta: "Scopri Linea Notte",
  },
  {
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80",
    alt: "Soggiorno Design",
    titleLine1: "FORME PURE E",
    titleLine2: "DESIGN FUNZIONALE",
    cta: "Acquista Ora",
  },
]

const AUTOPLAY_MS = 6000
const SCROLL_SETTLE_MS = 180

// Extended: [clone of last, ...real slides, clone of first]
// So the real first slide sits at displayIndex=1, and at displayIndex=0
// the user sees a preview of the last slide (and vice versa at the end).
const EXTENDED: Slide[] = [SLIDES[SLIDES.length - 1], ...SLIDES, SLIDES[0]]
const FIRST_REAL = 1
const LAST_REAL = SLIDES.length

const Hero = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const slideRefs = useRef<Array<HTMLDivElement | null>>([])
  const [current, setCurrent] = useState(0) // real-slide index for dots
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const scrollSettleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  )
  const isTeleportingRef = useRef(false)

  const scrollToDisplay = (
    displayIndex: number,
    behavior: ScrollBehavior = "smooth"
  ) => {
    const container = sliderRef.current
    const target = slideRefs.current[displayIndex]
    if (!container || !target) return
    const left =
      target.offsetLeft - (container.clientWidth - target.offsetWidth) / 2
    if (behavior === "smooth") {
      container.scrollTo({ left, behavior: "smooth" })
    } else {
      // Teleport without any animation, ignoring the container's
      // CSS scroll-behavior: smooth (set on .snap-container).
      const prev = container.style.scrollBehavior
      container.style.scrollBehavior = "auto"
      container.scrollLeft = left
      container.style.scrollBehavior = prev
    }
  }

  const getNearestDisplayIndex = () => {
    const container = sliderRef.current
    if (!container) return FIRST_REAL
    const center = container.scrollLeft + container.clientWidth / 2
    let nearest = FIRST_REAL
    let minDist = Infinity
    slideRefs.current.forEach((el, idx) => {
      if (!el) return
      const slideCenter = el.offsetLeft + el.offsetWidth / 2
      const dist = Math.abs(slideCenter - center)
      if (dist < minDist) {
        minDist = dist
        nearest = idx
      }
    })
    return nearest
  }

  const resetAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      const currentDisplay = getNearestDisplayIndex()
      scrollToDisplay(currentDisplay + 1)
    }, AUTOPLAY_MS)
  }

  const next = () => {
    const currentDisplay = getNearestDisplayIndex()
    scrollToDisplay(currentDisplay + 1)
    resetAutoplay()
  }
  const prev = () => {
    const currentDisplay = getNearestDisplayIndex()
    scrollToDisplay(currentDisplay - 1)
    resetAutoplay()
  }

  // Initial position: jump to the first real slide without animation.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      isTeleportingRef.current = true
      scrollToDisplay(FIRST_REAL, "auto")
      setCurrent(0)
      requestAnimationFrame(() => {
        isTeleportingRef.current = false
      })
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    resetAutoplay()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Detect scroll settle; when landed on a clone, teleport to the matching real slide.
  useEffect(() => {
    const container = sliderRef.current
    if (!container) return

    const onScroll = () => {
      if (isTeleportingRef.current) return
      if (scrollSettleTimerRef.current)
        clearTimeout(scrollSettleTimerRef.current)

      scrollSettleTimerRef.current = setTimeout(() => {
        const displayIndex = getNearestDisplayIndex()

        if (displayIndex === 0) {
          // Landed on clone of last → teleport to real last
          isTeleportingRef.current = true
          scrollToDisplay(LAST_REAL, "auto")
          setCurrent(SLIDES.length - 1)
          requestAnimationFrame(() => {
            isTeleportingRef.current = false
          })
          return
        }

        if (displayIndex === EXTENDED.length - 1) {
          // Landed on clone of first → teleport to real first
          isTeleportingRef.current = true
          scrollToDisplay(FIRST_REAL, "auto")
          setCurrent(0)
          requestAnimationFrame(() => {
            isTeleportingRef.current = false
          })
          return
        }

        setCurrent(displayIndex - 1)
      }, SCROLL_SETTLE_MS)
    }

    container.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      container.removeEventListener("scroll", onScroll)
      if (scrollSettleTimerRef.current)
        clearTimeout(scrollSettleTimerRef.current)
    }
  }, [])

  return (
    <section className="py-4 sm:py-8 w-full max-w-[1920px] mx-auto overflow-hidden">
      <div className="relative w-full">
        <div
          ref={sliderRef}
          className="snap-container flex gap-4 sm:gap-6 px-[5vw] lg:px-[10vw] overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        >
          {EXTENDED.map((slide, index) => {
            const isClone = index === 0 || index === EXTENDED.length - 1
            return (
              <div
                key={index}
                ref={(el) => {
                  slideRefs.current[index] = el
                }}
                aria-hidden={isClone}
                className="w-[90vw] lg:w-[80vw] h-[70vh] lg:h-[80vh] flex-shrink-0 snap-center rounded-[2rem] sm:rounded-[3rem] overflow-hidden relative isolate"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-16 lg:p-20">
                  <h2 className="font-sans font-black uppercase text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-8 max-w-4xl">
                    {slide.titleLine1}
                    <br />
                    {slide.titleLine2}
                  </h2>
                  <div>
                    <button
                      type="button"
                      tabIndex={isClone ? -1 : 0}
                      className="bg-white text-brand-dark px-8 py-4 rounded-full text-sm font-bold hover:bg-brand-accent hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                      {slide.cta}
                    </button>
                  </div>
                </div>

                <div className="absolute bottom-10 left-8 sm:left-16 flex items-center z-20">
                  <button
                    type="button"
                    onClick={prev}
                    tabIndex={isClone ? -1 : 0}
                    aria-label="Slide precedente"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <ArrowLeft size={24} weight="light" />
                  </button>
                </div>
                <div className="absolute bottom-10 right-8 sm:right-16 flex items-center z-20">
                  <button
                    type="button"
                    onClick={next}
                    tabIndex={isClone ? -1 : 0}
                    aria-label="Slide successiva"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <ArrowRight size={24} weight="light" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-none z-30">
          {SLIDES.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full border border-white transition-colors duration-300 ${
                index === current ? "bg-white" : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
