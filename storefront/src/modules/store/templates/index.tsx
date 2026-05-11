import { Suspense } from "react"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"

import { listCategories } from "@lib/data/categories"
import { listProducts } from "@lib/data/products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementBar from "@modules/store/components/refinement-bar"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const topCategories = await listCategories({ parent_category_id: "null" })

  // "Stanze" — only top-level categories that have sub-categories.
  // This naturally excludes the Medusa starter demo categories (merch,
  // sweatshirts, pants, shirts) which are flat with no children.
  const stanze = (topCategories as any[]).filter(
    (c) => (c.category_children?.length ?? 0) > 0
  )

  // Fetch a representative product thumbnail for each stanza, looking at
  // the stanza itself and all its immediate sub-categories.
  const stanzaThumbs = new Map<string, string>()
  await Promise.all(
    stanze.map(async (c) => {
      const catIds = [
        c.id,
        ...((c.category_children ?? []) as any[]).map((cc) => cc.id),
      ]
      const {
        response: { products },
      } = await listProducts({
        countryCode,
        queryParams: { category_id: catIds, limit: 1 } as any,
      })
      const thumb = products[0]?.thumbnail ?? products[0]?.images?.[0]?.url
      if (thumb) stanzaThumbs.set(c.id, thumb)
    })
  )

  return (
    <section
      className="content-container py-12 lg:py-20"
      data-testid="category-container"
    >
      <header className="flex flex-col gap-5 mb-12 lg:mb-16 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-brand-dark/50">
          Catalogo
        </span>
        <h1
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-dark leading-[1.05]"
          data-testid="store-page-title"
        >
          Tutto l'arredamento
        </h1>
        <p className="text-brand-dark/60 font-medium text-base sm:text-lg leading-relaxed">
          Esplora la collezione completa firmata Arredo Vita — pezzi selezionati
          per ogni stanza della tua casa.
        </p>
      </header>

      {stanze.length > 0 && (
        <div className="mb-12 lg:mb-16">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-brand-dark/50 mb-5">
            Sfoglia per stanza
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-5">
            {stanze.map((cat) => {
              const childCount = cat.category_children?.length ?? 0
              const thumb = stanzaThumbs.get(cat.id)
              return (
                <li key={cat.id}>
                  <LocalizedClientLink
                    href={`/categories/${cat.handle}`}
                    className="group relative block aspect-[5/4] sm:aspect-[4/5] lg:aspect-[5/4] rounded-[1.5rem] overflow-hidden bg-brand-light"
                  >
                    {thumb ? (
                      <>
                        <Image
                          src={thumb}
                          alt={cat.name}
                          fill
                          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 33vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/20 to-transparent" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-light to-brand-dark/10" />
                    )}
                    <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-brand-dark opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={14} weight="bold" />
                    </span>
                    <div
                      className={`absolute inset-x-0 bottom-0 p-5 flex flex-col gap-1 ${
                        thumb ? "text-white" : "text-brand-dark"
                      }`}
                    >
                      <h3 className="font-serif text-2xl sm:text-3xl leading-tight">
                        {cat.name}
                      </h3>
                      <span
                        className={`text-[11px] uppercase tracking-[0.18em] font-bold ${
                          thumb ? "text-white/75" : "text-brand-dark/50"
                        }`}
                      >
                        {childCount}{" "}
                        {childCount === 1 ? "tipologia" : "tipologie"}
                      </span>
                    </div>
                  </LocalizedClientLink>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <RefinementBar sortBy={sort} />

      <Suspense fallback={<SkeletonProductGrid />}>
        <PaginatedProducts
          sortBy={sort}
          page={pageNumber}
          countryCode={countryCode}
        />
      </Suspense>
    </section>
  )
}

export default StoreTemplate
