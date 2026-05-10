import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
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
