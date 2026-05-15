export type MegaMenuItem = {
  label: string
  href: string
  description: string
  count?: number
  image: string
}

export type MegaMenuRoot = {
  key: string
  label: string
  href: string
  caption: string
  feature: { title: string; body: string; image: string }
  items: MegaMenuItem[]
}

export type FlatLink = {
  key: string
  label: string
  href: string
}

// Stanze with dropdowns. Counts reflect the planned catalog (45 products).
export const MEGA_MENU: MegaMenuRoot[] = [
  {
    key: "soggiorno",
    label: "Soggiorno",
    href: "/categories/soggiorno",
    caption: "Pezzi selezionati per il cuore della tua casa.",
    feature: {
      title: "L'arte di vivere il living",
      body: "Tutto il Soggiorno — divani, poltrone e complementi.",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80",
    },
    items: [
      {
        label: "Divani",
        href: "/categories/divani",
        description: "Lineari, angolari e chesterfield.",
        count: 24,
        image:
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80",
      },
      {
        label: "Poltrone",
        href: "/categories/poltrone",
        description: "Comfort e design d'autore.",
        count: 8,
        image:
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    key: "sala-da-pranzo",
    label: "Sala da pranzo",
    href: "/categories/sala-da-pranzo",
    caption: "Sedute e arredi per accogliere e condividere.",
    feature: {
      title: "Il rituale della tavola",
      body: "Tutta la Sala da pranzo — sedie e set d'autore.",
      image:
        "https://images.unsplash.com/photo-1615968679312-9b7ed9f04e79?auto=format&fit=crop&q=80",
    },
    items: [
      {
        label: "Sedie",
        href: "/categories/sedie",
        description: "Set 2 sedie e modelli singoli.",
        count: 9,
        image:
          "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80",
      },
    ],
  },
]

export const FLAT_LINKS: FlatLink[] = [
  { key: "catalogo", label: "Catalogo", href: "/store" },
  { key: "assistenza", label: "Assistenza", href: "/assistenza" },
  { key: "contatti", label: "Contatti", href: "/contatti" },
]
