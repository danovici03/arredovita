"use client"

import { useEffect, useState } from "react"

type Props = {
  left: React.ReactNode
  center: React.ReactNode
  right: React.ReactNode
}

const NavShell = ({ left, center, right }: Props) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    let lastScrolled = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const top = window.pageYOffset || document.documentElement.scrollTop
        const next = top > 40
        if (next !== lastScrolled) {
          lastScrolled = next
          setScrolled(next)
        }
        ticking = false
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const Inner = (
    <>
      <div className="flex items-center gap-4 shrink-0">{left}</div>
      <div className="hidden lg:flex items-center gap-8 font-bold text-sm text-brand-dark">
        {center}
      </div>
      <div className="flex items-center gap-5 sm:gap-6 text-brand-dark">
        {right}
      </div>
    </>
  )

  const fadeStyle = (visible: boolean) => ({
    opacity: visible ? 1 : 0,
    transition: "opacity 200ms ease-out",
    willChange: "opacity",
    pointerEvents: visible ? ("auto" as const) : ("none" as const),
  })

  return (
    <header
      id="site-header"
      className="w-full sticky top-0 z-50 h-20"
    >
      {/* Layer A: full-width white bar (top of page) */}
      <nav
        aria-hidden={scrolled}
        style={fadeStyle(!scrolled)}
        className="absolute inset-x-0 top-0 w-full h-20 px-4 sm:px-8 flex items-center bg-white border-b border-brand-dark/5"
      >
        <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between">
          {Inner}
        </div>
      </nav>

      {/* Layer B: floating pill (after scroll) */}
      <nav
        aria-hidden={!scrolled}
        style={fadeStyle(scrolled)}
        className="absolute left-1/2 -translate-x-1/2 top-3 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] max-w-6xl h-14 px-6 sm:px-8 flex items-center justify-between bg-white/85 backdrop-blur-md border border-white/60 rounded-full shadow-xl"
      >
        {Inner}
      </nav>
    </header>
  )
}

export default NavShell
