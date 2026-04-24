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
    const onScroll = () => {
      const top = window.pageYOffset || document.documentElement.scrollTop
      setScrolled(top > 40)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const headerClass = scrolled
    ? "pt-4 px-4 sm:px-8 pointer-events-none"
    : ""

  const navClass = scrolled
    ? "max-w-6xl bg-white/85 h-16 backdrop-blur-xl border border-white/60 rounded-full shadow-xl pointer-events-auto"
    : "max-w-[1800px] bg-white h-20 border-b border-brand-dark/5"

  return (
    <header
      id="site-header"
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${headerClass}`}
    >
      <nav
        className={`mx-auto w-full px-4 sm:px-8 flex items-center justify-between transition-all duration-500 ${navClass}`}
      >
        <div className="flex items-center gap-4 shrink-0">{left}</div>
        <div className="hidden lg:flex items-center gap-8 font-bold text-sm text-brand-dark">
          {center}
        </div>
        <div className="flex items-center gap-5 sm:gap-6 text-brand-dark">
          {right}
        </div>
      </nav>
    </header>
  )
}

export default NavShell
