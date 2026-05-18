import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, AdminProduct } from "@medusajs/types"
import { Tag } from "@medusajs/icons"
import { Container, Heading, Switch, Text, toast } from "@medusajs/ui"
import { useState } from "react"

const OUTLET_TAG = "outlet"

const ProductOutletWidget = ({
  data: product,
}: DetailWidgetProps<AdminProduct>) => {
  const initialOutlet = (product.tags ?? []).some(
    (t) => (t.value ?? "").toLowerCase() === OUTLET_TAG
  )
  const [isOutlet, setIsOutlet] = useState(initialOutlet)
  const [saving, setSaving] = useState(false)

  const toggle = async (next: boolean) => {
    setSaving(true)
    try {
      const currentTags = (product.tags ?? []).map((t) => ({ value: t.value }))
      const tagsWithoutOutlet = currentTags.filter(
        (t) => (t.value ?? "").toLowerCase() !== OUTLET_TAG
      )
      const nextTags = next
        ? [...tagsWithoutOutlet, { value: OUTLET_TAG }]
        : tagsWithoutOutlet

      const res = await fetch(`/admin/products/${product.id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags: nextTags }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message || `Errore ${res.status}`)
      }
      setIsOutlet(next)
      toast.success(
        next
          ? "Prodotto contrassegnato come Outlet (garanzia ridotta a 12 mesi)"
          : "Prodotto rimosso dall'Outlet (garanzia ripristinata a 24 mesi)"
      )
    } catch (err: any) {
      toast.error(err.message || "Errore nel salvataggio")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Tag />
          <Heading level="h2">Outlet / Ex esposizione</Heading>
        </div>
      </div>
      <div className="px-6 py-4 flex items-start justify-between gap-6">
        <div className="flex flex-col gap-1 max-w-2xl">
          <Text>
            Contrassegna il prodotto come <strong>Outlet</strong> se è stato
            esposto in showroom o utilizzato a fini espositivi.
          </Text>
          <Text size="small" className="text-ui-fg-subtle">
            Sullo storefront comparirà il badge &laquo;Outlet&raquo; e la
            garanzia legale di conformità sarà ridotta a 12 mesi (anziché 24)
            ai sensi dell&apos;art. 134 c. 2 Cod. Cons. Tecnicamente, applica
            o rimuove il tag <code>outlet</code> sul prodotto.
          </Text>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Switch
            checked={isOutlet}
            disabled={saving}
            onCheckedChange={toggle}
            id="outlet-toggle"
          />
          <label
            htmlFor="outlet-toggle"
            className="text-sm font-medium cursor-pointer"
          >
            {isOutlet ? "Prodotto Outlet" : "Prodotto standard"}
          </label>
        </div>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.side.before",
})

export default ProductOutletWidget
