import { Metadata } from "next"

import BestSellers from "@modules/home/components/best-sellers"
import Hero from "@modules/home/components/hero"
import IconicProducts from "@modules/home/components/iconic-products"
import Rooms from "@modules/home/components/rooms"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Arredo Vita | Design d'Interni Moderno",
  description:
    "Il minimalismo italiano portato nel tuo spazio. Design creato per resistere per generazioni.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <>
      <Hero />
      <Rooms />
      <IconicProducts />
      <BestSellers countryCode={countryCode} />
    </>
  )
}
