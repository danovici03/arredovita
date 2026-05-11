import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementBar from "@modules/store/components/refinement-bar"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents: HttpTypes.StoreProductCategory[] = []
  const collectParents = (cat: HttpTypes.StoreProductCategory) => {
    if (cat.parent_category) {
      parents.unshift(cat.parent_category)
      collectParents(cat.parent_category)
    }
  }
  collectParents(category)

  const children = category.category_children ?? []
  const hasChildren = children.length > 0

  return (
    <section
      className="content-container py-12 lg:py-20"
      data-testid="category-container"
    >
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.2em] font-bold text-brand-dark/50 mb-10"
      >
        <LocalizedClientLink
          href="/store"
          className="hover:text-brand-dark transition-colors"
        >
          Catalogo
        </LocalizedClientLink>
        {parents.map((parent) => (
          <span key={parent.id} className="flex items-center gap-2">
            <span className="text-brand-dark/30">/</span>
            <LocalizedClientLink
              href={`/categories/${parent.handle}`}
              className="hover:text-brand-dark transition-colors"
              data-testid="sort-by-link"
            >
              {parent.name}
            </LocalizedClientLink>
          </span>
        ))}
        <span className="flex items-center gap-2">
          <span className="text-brand-dark/30">/</span>
          <span className="text-brand-dark/80">{category.name}</span>
        </span>
      </nav>

      <header className="flex flex-col gap-5 mb-12 lg:mb-16 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-brand-dark/50">
          Stanza
        </span>
        <h1
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-dark leading-[1.05]"
          data-testid="category-page-title"
        >
          {category.name}
        </h1>
        {category.description && (
          <p className="text-brand-dark/60 font-medium text-base sm:text-lg leading-relaxed">
            {category.description}
          </p>
        )}
      </header>

      {hasChildren && (
        <div className="mb-12 lg:mb-16">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-brand-dark/50 mb-5">
            Sotto-categorie
          </h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {children.map((c) => (
              <li key={c.id}>
                <LocalizedClientLink
                  href={`/categories/${c.handle}`}
                  className="group flex items-center justify-between gap-3 px-5 py-4 rounded-[1.25rem] bg-brand-light hover:bg-brand-dark transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-brand-dark group-hover:text-white transition-colors truncate">
                    {c.name}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/60 group-hover:bg-white/15 flex items-center justify-center text-brand-dark group-hover:text-white shrink-0 transition-colors">
                    <ArrowRight
                      size={14}
                      weight="bold"
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </span>
                </LocalizedClientLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      <RefinementBar sortBy={sort} />

      <Suspense
        fallback={
          <SkeletonProductGrid
            numberOfProducts={category.products?.length ?? 8}
          />
        }
      >
        <PaginatedProducts
          sortBy={sort}
          page={pageNumber}
          categoryId={category.id}
          countryCode={countryCode}
        />
      </Suspense>
    </section>
  )
}
