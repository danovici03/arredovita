import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementBar from "@modules/store/components/refinement-bar"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
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
