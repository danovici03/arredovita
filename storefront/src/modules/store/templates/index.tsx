import { Suspense } from "react"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"

import { listCategories } from "@lib/data/categories"
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

      {topCategories.length > 0 && (
        <div className="mb-12 lg:mb-16">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-brand-dark/50 mb-5">
            Sfoglia per stanza
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {topCategories.map((cat: any) => {
              const childCount = cat.category_children?.length ?? 0
              const productCount = cat.products?.length ?? 0
              const thumb =
                cat.products?.find((p: any) => p.thumbnail)?.thumbnail ??
                cat.products?.[0]?.images?.[0]?.url
              return (
                <li key={cat.id}>
                  <LocalizedClientLink
                    href={`/categories/${cat.handle}`}
                    className="group relative block aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-brand-light"
                  >
                    {thumb ? (
                      <>
                        <Image
                          src={thumb}
                          alt={cat.name}
                          fill
                          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/20 to-transparent" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-brand-light" />
                    )}
                    <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-brand-dark opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={14} weight="bold" />
                    </span>
                    <div
                      className={`absolute inset-x-0 bottom-0 p-5 flex flex-col gap-1 ${
                        thumb ? "text-white" : "text-brand-dark"
                      }`}
                    >
                      <h3 className="font-bold text-lg sm:text-xl leading-tight">
                        {cat.name}
                      </h3>
                      <span
                        className={`text-[11px] uppercase tracking-[0.18em] font-bold ${
                          thumb ? "text-white/70" : "text-brand-dark/50"
                        }`}
                      >
                        {childCount > 0
                          ? `${childCount} ${
                              childCount === 1
                                ? "sotto-categoria"
                                : "sotto-categorie"
                            }`
                          : `${productCount} ${
                              productCount === 1 ? "prodotto" : "prodotti"
                            }`}
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
