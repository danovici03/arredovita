import {
  OUTLET_BADGE_LABEL,
  OUTLET_DESCRIPTION,
  isOutletProduct,
} from "@lib/util/outlet"
import {
  SHOWROOM_BADGE_LABEL,
  SHOWROOM_DESCRIPTION,
  isShowroomProduct,
} from "@lib/util/showroom"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductRating from "@modules/products/components/product-rating"
import { Storefront, Tag } from "@phosphor-icons/react/dist/ssr"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const meta = (product.metadata ?? {}) as Record<string, unknown>
  const ratingRaw =
    typeof meta.rating === "number"
      ? meta.rating
      : typeof meta.rating === "string"
      ? Number(meta.rating)
      : null
  const reviewCountRaw =
    typeof meta.review_count === "number"
      ? meta.review_count
      : typeof meta.review_count === "string"
      ? Number(meta.review_count)
      : null
  const rating = ratingRaw && !Number.isNaN(ratingRaw) ? ratingRaw : null
  const reviewCount =
    reviewCountRaw && !Number.isNaN(reviewCountRaw) ? reviewCountRaw : undefined
  const outlet = isOutletProduct(product)
  const showroom = !outlet && isShowroomProduct(product)

  return (
    <div id="product-info" className="flex flex-col gap-y-4">
      {product.collection && (
        <LocalizedClientLink
          href={`/collections/${product.collection.handle}`}
          className="text-xs uppercase tracking-[0.2em] font-bold text-brand-dark/50 hover:text-brand-dark transition-colors"
        >
          {product.collection.title}
        </LocalizedClientLink>
      )}
      <h1
        className="font-serif text-4xl lg:text-5xl text-brand-dark leading-tight"
        data-testid="product-title"
      >
        {product.title}
      </h1>
      {rating !== null && (
        <ProductRating rating={rating} reviewCount={reviewCount} />
      )}
      {outlet && (
        <div
          className="flex items-start gap-3 rounded-2xl border border-brand-accent/40 bg-brand-accent/10 p-4"
          data-testid="product-outlet-note"
        >
          <Tag
            size={20}
            weight="duotone"
            className="text-brand-accent shrink-0 mt-0.5"
          />
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.18em] font-bold text-brand-accent">
              {OUTLET_BADGE_LABEL} · Ex esposizione
            </span>
            <p className="text-sm text-brand-dark/70 leading-relaxed">
              {OUTLET_DESCRIPTION}
            </p>
            <p className="text-xs text-brand-dark/50 leading-relaxed mt-1">
              Maggiori dettagli all&apos;
              <LocalizedClientLink
                href="/termini#prodotti-outlet"
                className="underline hover:text-brand-accent"
              >
                art. 8 dei Termini e Condizioni
              </LocalizedClientLink>
              .
            </p>
          </div>
        </div>
      )}
      {showroom && (
        <div
          className="flex items-start gap-3 rounded-2xl border border-brand-accent/30 bg-brand-accent/5 p-4"
          data-testid="product-showroom-note"
        >
          <Storefront
            size={20}
            weight="duotone"
            className="text-brand-accent shrink-0 mt-0.5"
          />
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.18em] font-bold text-brand-accent">
              {SHOWROOM_BADGE_LABEL}
            </span>
            <p className="text-sm text-brand-dark/70 leading-relaxed">
              {SHOWROOM_DESCRIPTION}
            </p>
          </div>
        </div>
      )}
      {product.description && (
        <p
          className="text-brand-dark/60 leading-relaxed whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </p>
      )}
    </div>
  )
}

export default ProductInfo
