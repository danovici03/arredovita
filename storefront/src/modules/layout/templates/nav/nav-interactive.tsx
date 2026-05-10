"use client"

import { ReactNode, useEffect, useRef, useState } from "react"

import MegaMenuPanel from "@modules/layout/components/mega-menu/panel"
import MegaMenuTriggers from "@modules/layout/components/mega-menu/triggers"
import NavShell from "./nav-shell"

type Props = {
  left: ReactNode
  right: ReactNode
}

export default function NavInteractive({ left, right }: Props) {
  const [active, setActive] = useState<string | null>(null)
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelDismiss = () => {
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current)
      dismissTimerRef.current = null
    }
  }

  const activate = (key: string) => {
    cancelDismiss()
    setActive(key)
  }

  // Slight delay before closing so cursor can move from trigger → panel
  // without the menu collapsing.
  const dismiss = () => {
    cancelDismiss()
    dismissTimerRef.current = setTimeout(() => setActive(null), 120)
  }

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      <NavShell
        left={left}
        center={
          <MegaMenuTriggers
            active={active}
            onActivate={activate}
            onDismiss={dismiss}
          />
        }
        right={right}
      />
      <div
        onMouseEnter={cancelDismiss}
        onMouseLeave={dismiss}
      >
        <MegaMenuPanel
          active={active}
          onActivate={activate}
          onDismiss={dismiss}
        />
      </div>
    </>
  )
}
