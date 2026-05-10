import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Manrope, Playfair_Display } from "next/font/google"
import "styles/globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Arredo Vita | Design d'Interni Moderno",
    template: "%s | Arredo Vita",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="it"
      data-mode="light"
      className={`${manrope.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="font-sans bg-brand-light text-brand-dark antialiased selection:bg-brand-dark selection:text-white">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
