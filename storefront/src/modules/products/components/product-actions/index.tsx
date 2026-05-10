"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import {
  EnvelopeSimple,
  FacebookLogo,
  Minus,
  Plus,
  ShoppingBag,
  Storefront,
  Truck,
  WhatsappLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import MobileActions from "./mobile-actions"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [isBuyingNow, setIsBuyingNow] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) return true
    if (selectedVariant?.allow_backorder) return true
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    )
      return true
    return false
  }, [selectedVariant])

  const lowStockCount = useMemo(() => {
    if (!selectedVariant?.manage_inventory) return null
    if (selectedVariant?.allow_backorder) return null
    const qty = selectedVariant?.inventory_quantity ?? 0
    if (qty > 0 && qty <= 10) return qty
    return null
  }, [selectedVariant])

  const maxStock = useMemo(() => {
    if (!selectedVariant?.manage_inventory) return 99
    if (selectedVariant?.allow_backorder) return 99
    return Math.max(1, selectedVariant?.inventory_quantity ?? 1)
  }, [selectedVariant])

  useEffect(() => {
    setQuantity((q) => Math.min(q, maxStock))
  }, [maxStock])

  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: selectedVariant?.id,
  })
  const selectedPrice = selectedVariant ? variantPrice : cheapestPrice
  const onSale = selectedPrice?.price_type === "sale"

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null
    setIsAdding(true)
    await addToCart({
      variantId: selectedVariant.id,
      quantity,
      countryCode,
    })
    setIsAdding(false)
  }

  const handleBuyNow = async () => {
    if (!selectedVariant?.id) return null
    setIsBuyingNow(true)
    await addToCart({
      variantId: selectedVariant.id,
      quantity,
      countryCode,
    })
    router.push(`/${countryCode}/cart`)
  }

  const ctaLabel = !selectedVariant
    ? "Seleziona opzioni"
    : !inStock || !isValidVariant
    ? "Esaurito"
    : "Aggiungi al carrello"

  const cartDisabled =
    !inStock || !selectedVariant || !!disabled || isAdding || !isValidVariant

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ?? ""
  const shareText = encodeURIComponent(product.title ?? "")
  const encodedUrl = encodeURIComponent(`${baseUrl}${pathname}`)

  return (
    <>
      <div className="flex flex-col gap-y-6" ref={actionsRef}>
        <div className="flex items-baseline gap-3 pb-6 border-b border-brand-dark/10">
          {selectedPrice ? (
            <>
              <span
                className={clx(
                  "font-serif text-3xl lg:text-4xl",
                  onSale ? "text-brand-accent" : "text-brand-dark"
                )}
                data-testid="product-price"
                data-value={selectedPrice.calculated_price_number}
              >
                {!selectedVariant && (
                  <span className="text-base font-sans text-brand-dark/50 mr-2">
                    Da
                  </span>
                )}
                {selectedPrice.calculated_price}
              </span>
              {onSale && (
                <>
                  <span
                    className="text-brand-dark/40 line-through text-lg"
                    data-testid="original-product-price"
                    data-value={selectedPrice.original_price_number}
                  >
                    {selectedPrice.original_price}
                  </span>
                  <span className="bg-brand-accent text-white px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                    -{selectedPrice.percentage_diff}%
                  </span>
                </>
              )}
            </>
          ) : (
            <span className="block w-32 h-9 bg-brand-light animate-pulse rounded-md" />
          )}
        </div>

        {(product.variants?.length ?? 0) > 1 && (
          <div className="flex flex-col gap-y-5">
            {(product.options || []).map((option) => (
              <OptionSelect
                key={option.id}
                option={option}
                current={options[option.id]}
                updateOption={setOptionValue}
                title={option.title ?? ""}
                data-testid="product-options"
                disabled={!!disabled || isAdding}
              />
            ))}
          </div>
        )}

        {lowStockCount !== null && (
          <div className="flex items-center gap-2.5 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
            </span>
            <span className="text-brand-dark/80">
              Affrettati, restano solo{" "}
              <span className="font-bold text-brand-dark">
                {lowStockCount} pezzi
              </span>{" "}
              in magazzino.
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="flex items-center justify-between bg-brand-light rounded-full px-2 py-2 sm:py-0 sm:w-36">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={cartDisabled || quantity <= 1}
              className="w-10 h-10 rounded-full flex items-center justify-center text-brand-dark hover:bg-white transition-colors disabled:opacity-40"
              aria-label="Diminuisci quantità"
            >
              <Minus size={16} weight="bold" />
            </button>
            <span
              className="font-bold text-brand-dark min-w-[1.5rem] text-center"
              data-testid="quantity-display"
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
              disabled={cartDisabled || quantity >= maxStock}
              className="w-10 h-10 rounded-full flex items-center justify-center text-brand-dark hover:bg-white transition-colors disabled:opacity-40"
              aria-label="Aumenta quantità"
            >
              <Plus size={16} weight="bold" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={cartDisabled}
            data-testid="add-product-button"
            className="flex-1 bg-brand-dark text-white rounded-full px-6 py-4 font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand-accent transition-colors disabled:opacity-50 disabled:hover:bg-brand-dark"
          >
            {isAdding ? (
              <span
                className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"
                aria-label="Caricamento"
              />
            ) : (
              <ShoppingBag size={18} weight="bold" />
            )}
            <span>{ctaLabel}</span>
            {selectedPrice && inStock && isValidVariant && (
              <span className="opacity-70">
                · {selectedPrice.calculated_price}
              </span>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={cartDisabled || isBuyingNow}
          className="w-full py-4 rounded-full border border-brand-dark text-brand-dark font-bold text-sm hover:bg-brand-dark hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-brand-dark"
        >
          {isBuyingNow ? "Reindirizzamento…" : "Acquista ora"}
        </button>

        <div className="bg-brand-light rounded-2xl p-4 flex flex-col gap-3 text-sm">
          <div className="flex items-start gap-3">
            <Storefront
              size={20}
              weight="regular"
              className="text-brand-dark mt-0.5 shrink-0"
            />
            <div>
              <p className="font-bold text-brand-dark">
                Ritiro disponibile in showroom
              </p>
              <p className="text-brand-dark/60 mt-0.5">
                Pronto in 2 giorni lavorativi
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Truck
              size={20}
              weight="regular"
              className="text-brand-dark mt-0.5 shrink-0"
            />
            <div>
              <p className="font-bold text-brand-dark">
                Spedizione gratuita in Italia
              </p>
              <p className="text-brand-dark/60 mt-0.5">
                Per ordini superiori a 250€ — consegna in 3–5 giorni
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 text-sm">
          <span className="text-brand-dark/60">Condividi</span>
          <div className="flex items-center gap-2">
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Condividi su X"
              className="w-9 h-9 rounded-full border border-brand-dark/15 flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-colors"
            >
              <XLogo size={14} weight="bold" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Condividi su Facebook"
              className="w-9 h-9 rounded-full border border-brand-dark/15 flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-colors"
            >
              <FacebookLogo size={14} weight="bold" />
            </a>
            <a
              href={`https://wa.me/?text=${shareText}%20${encodedUrl}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Condividi su WhatsApp"
              className="w-9 h-9 rounded-full border border-brand-dark/15 flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-colors"
            >
              <WhatsappLogo size={14} weight="bold" />
            </a>
            <a
              href={`mailto:?subject=${shareText}&body=${encodedUrl}`}
              aria-label="Condividi via email"
              className="w-9 h-9 rounded-full border border-brand-dark/15 flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-colors"
            >
              <EnvelopeSimple size={14} weight="bold" />
            </a>
          </div>
        </div>

        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
