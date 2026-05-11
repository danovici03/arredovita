import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { Star } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const getBadge = (product: HttpTypes.StoreProduct): string | null => {
  const tags = (product.tags ?? []).map((t) => t.value?.toLowerCase() ?? "")
  if (tags.includes("new") || tags.includes("nuovo")) return "Nuovo"
  if (tags.includes("bestseller") || tags.includes("best-seller"))
    return "Best seller"
  if (tags.includes("sale") || tags.includes("saldo")) return "Saldo"
  return null
}

const getRating = (product: HttpTypes.StoreProduct): number | null => {
  const meta = (product.metadata ?? {}) as Record<string, unknown>
  const r = meta.rating
  if (typeof r === "number") return r
  if (typeof r === "string") {
    const n = Number(r)
    return Number.isNaN(n) ? null : n
  }
  return null
}

const getColorOption = (product: HttpTypes.StoreProduct) => {
  return (product.options ?? []).find((o) =>
    /color|colore|finitura|tessuto|materiale/i.test(o.title ?? "")
  )
}

type ProductCardProps = {
  product: HttpTypes.StoreProduct
  priority?: boolean
}

const ProductCard = ({ product, priority }: ProductCardProps) => {
  const { cheapestPrice } = getProductPrice({ product })
  const badge = getBadge(product)
  const rating = getRating(product)
  const colorOption = getColorOption(product)

  const swatches: { value: string; image?: string }[] = (
    colorOption?.values ?? []
  )
    .map((v) => {
      const variant = (product.variants ?? []).find((variantItem) =>
        (variantItem.options ?? []).some(
          (vo: any) => vo.option_id === colorOption?.id && vo.value === v.value
        )
      )
      const image = (variant as any)?.images?.[0]?.url as string | undefined
      return { value: v.value, image }
    })
    .slice(0, 4)

  const thumb = product.thumbnail ?? product.images?.[0]?.url
  const isSale = cheapestPrice?.price_type === "sale"

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block w-full"
      data-testid="product-wrapper"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] bg-brand-light mb-4">
        {thumb && (
          <Image
            src={thumb}
            alt={product.title ?? ""}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 33vw, 50vw"
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white text-[10px] font-bold uppercase tracking-widest text-brand-dark shadow-sm">
            {badge}
          </span>
        )}
        {rating !== null && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-xs font-bold text-brand-dark shadow-sm">
            <Star size={12} weight="fill" className="text-brand-accent" />
            {rating.toFixed(1)}
          </span>
        )}
      </div>
      <div className="px-1 flex flex-col gap-1.5">
        {product.collection && (
          <span
            className="text-[10px] uppercase tracking-[0.18em] font-bold text-brand-dark/50"
            data-testid="product-collection"
          >
            {product.collection.title}
          </span>
        )}
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className="font-bold text-brand-dark leading-tight truncate group-hover:text-brand-accent transition-colors"
            data-testid="product-title"
          >
            {product.title}
          </h3>
          {cheapestPrice && (
            <div className="flex items-baseline gap-2 shrink-0">
              {isSale && (
                <span
                  className="text-xs font-medium text-brand-dark/40 line-through"
                  data-testid="original-price"
                >
                  {cheapestPrice.original_price}
                </span>
              )}
              <span
                className={`font-bold shrink-0 ${
                  isSale ? "text-brand-accent" : "text-brand-dark"
                }`}
                data-testid="price"
              >
                {cheapestPrice.calculated_price}
              </span>
            </div>
          )}
        </div>
        {swatches.length > 0 && (
          <div className="flex items-center gap-1.5 mt-1.5">
            {swatches.map((s) =>
              s.image ? (
                <span
                  key={s.value}
                  className="relative h-5 w-5 rounded-md overflow-hidden border border-brand-dark/10"
                  title={s.value}
                >
                  <Image src={s.image} alt={s.value} fill sizes="20px" />
                </span>
              ) : (
                <span
                  key={s.value}
                  className="px-1.5 h-5 inline-flex items-center rounded-md bg-brand-light text-[10px] font-bold text-brand-dark/70"
                >
                  {s.value}
                </span>
              )
            )}
          </div>
        )}
      </div>
    </LocalizedClientLink>
  )
}

export default ProductCard
