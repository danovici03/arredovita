import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductRating from "@modules/products/components/product-rating"

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
