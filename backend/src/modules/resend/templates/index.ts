// Template registry for the Resend notification provider.
// Each template returns a subject + rendered HTML (and optional text fallback).
// Keep templates small and self-contained; localize when we add multi-language support.

export type RenderedEmail = {
  subject: string
  html: string
  text?: string
}

type Renderer = (data: Record<string, any>) => RenderedEmail

const BRAND = "Arredovita"
const LEGAL = "Premium Transport S.r.l."

const layout = (heading: string, bodyHtml: string) => `
<!doctype html>
<html lang="it">
  <body style="margin:0;padding:0;background:#f6f6f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#111;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f4;padding:32px 0;">
      <tr><td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:32px;max-width:600px;">
          <tr><td>
            <h1 style="margin:0 0 24px;font-size:20px;font-weight:600;">${heading}</h1>
            ${bodyHtml}
            <hr style="border:none;border-top:1px solid #eee;margin:32px 0 16px;">
            <p style="font-size:12px;color:#888;margin:0;">
              ${BRAND} — ${LEGAL}<br>
              Questa email è stata inviata automaticamente, non rispondere a questo indirizzo.
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`

const money = (amount: number | undefined, currency = "EUR") => {
  if (amount == null) return ""
  try {
    return new Intl.NumberFormat("it-IT", { style: "currency", currency }).format(amount)
  } catch {
    return `${amount} ${currency}`
  }
}

const escape = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")

const renderOrderItems = (items: any[] | undefined) => {
  if (!items?.length) return ""
  const rows = items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #eee;">
          <strong>${escape(i.product_title || i.title)}</strong>
          ${i.variant_title ? `<br><span style="color:#666;font-size:13px;">${escape(i.variant_title)}</span>` : ""}
        </td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center;">${i.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">${money(i.total, i.currency_code)}</td>
      </tr>`,
    )
    .join("")
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;font-size:14px;">
      <thead><tr>
        <th align="left" style="padding:8px 0;border-bottom:2px solid #111;">Prodotto</th>
        <th style="padding:8px 0;border-bottom:2px solid #111;">Q.tà</th>
        <th align="right" style="padding:8px 0;border-bottom:2px solid #111;">Totale</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>`
}

const orderPlacedCustomer: Renderer = ({ order, storefront_url }) => {
  const display = order.display_id ?? order.id
  const orderUrl = storefront_url
    ? `${storefront_url}/it/order/confirmed/${order.id}`
    : null
  const body = `
    <p>Ciao ${escape(order.email || "")},</p>
    <p>grazie per il tuo ordine <strong>#${escape(display)}</strong>. Lo abbiamo ricevuto correttamente e lo stiamo preparando.</p>
    ${renderOrderItems(order.items)}
    <p style="font-size:15px;">
      <strong>Totale: ${money(order.total, order.currency_code)}</strong>
    </p>
    ${orderUrl ? `<p><a href="${orderUrl}" style="background:#111;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;display:inline-block;">Vedi il tuo ordine</a></p>` : ""}
    <p>Ti avviseremo via email non appena la spedizione partirà.</p>`
  return {
    subject: `Conferma ordine #${display} — ${BRAND}`,
    html: layout(`Ordine confermato #${display}`, body),
  }
}

const orderPlacedAdmin: Renderer = ({ order, admin_url }) => {
  const display = order.display_id ?? order.id
  const adminLink = admin_url ? `${admin_url}/app/orders/${order.id}` : null
  const body = `
    <p>Nuovo ordine ricevuto: <strong>#${escape(display)}</strong></p>
    <ul style="font-size:14px;line-height:1.7;">
      <li>Cliente: ${escape(order.email)}</li>
      <li>Totale: <strong>${money(order.total, order.currency_code)}</strong></li>
      <li>Articoli: ${order.items?.length ?? 0}</li>
      ${order.shipping_address ? `<li>Spedizione: ${escape(order.shipping_address.first_name)} ${escape(order.shipping_address.last_name)} — ${escape(order.shipping_address.city)}, ${escape(order.shipping_address.country_code)}</li>` : ""}
    </ul>
    ${renderOrderItems(order.items)}
    ${adminLink ? `<p><a href="${adminLink}" style="background:#111;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;display:inline-block;">Apri in admin</a></p>` : ""}`
  return {
    subject: `[${BRAND}] Nuovo ordine #${display} — ${money(order.total, order.currency_code)}`,
    html: layout(`Nuovo ordine #${display}`, body),
  }
}

const shipmentCreated: Renderer = ({ order, shipment, storefront_url }) => {
  const display = order?.display_id ?? order?.id ?? ""
  const tracking = shipment?.labels?.[0]?.tracking_number || shipment?.tracking_numbers?.[0]
  const trackingUrl = shipment?.labels?.[0]?.url
  const orderUrl = storefront_url && order
    ? `${storefront_url}/it/order/confirmed/${order.id}`
    : null
  const body = `
    <p>Il tuo ordine <strong>#${escape(display)}</strong> è stato spedito.</p>
    ${tracking ? `<p>Numero di tracking: <strong>${escape(tracking)}</strong></p>` : ""}
    ${trackingUrl ? `<p><a href="${escape(trackingUrl)}">Traccia la spedizione</a></p>` : ""}
    ${orderUrl ? `<p><a href="${orderUrl}" style="background:#111;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;display:inline-block;">Vedi i dettagli</a></p>` : ""}
    <p>Grazie per aver scelto ${BRAND}.</p>`
  return {
    subject: `Il tuo ordine #${display} è in viaggio — ${BRAND}`,
    html: layout("Spedizione in viaggio", body),
  }
}

const inviteCreated: Renderer = ({ invite, admin_url }) => {
  const link = admin_url
    ? `${admin_url}/app/invite?token=${encodeURIComponent(invite.token)}`
    : `(token: ${invite.token})`
  const body = `
    <p>Sei stato invitato a collaborare nell'admin di ${BRAND}.</p>
    <p><a href="${link}" style="background:#111;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;display:inline-block;">Accetta l'invito</a></p>
    <p style="font-size:13px;color:#666;">Se il pulsante non funziona, copia questo link nel browser:<br><span style="word-break:break-all;">${escape(link)}</span></p>
    <p style="font-size:13px;color:#666;">L'invito scade in 7 giorni.</p>`
  return {
    subject: `Invito a collaborare in ${BRAND} admin`,
    html: layout("Invito amministratore", body),
  }
}

const returnRequestedAdmin: Renderer = ({ order, request, admin_url }) => {
  const display = order?.display_id ?? order?.id ?? ""
  const itemsHtml = (request?.items ?? [])
    .map((it: any) => {
      const orderItem = order?.items?.find((i: any) => i.id === it.item_id)
      const title = orderItem?.product_title || orderItem?.title || it.item_id
      return `<li style="margin-bottom:4px;">
          <strong>${escape(title)}</strong> × ${it.quantity}
          ${it.reason ? ` — <span style="color:#666;">${escape(it.reason)}</span>` : ""}
          ${it.note ? `<br><span style="font-size:12px;color:#888;">${escape(it.note)}</span>` : ""}
        </li>`
    })
    .join("")
  const adminLink = admin_url ? `${admin_url}/app/orders/${order.id}` : null
  const body = `
    <p>Nuova richiesta di reso per l'ordine <strong>#${escape(display)}</strong>.</p>
    <ul style="font-size:14px;line-height:1.6;">
      <li>Cliente: ${escape(order.email)}</li>
      <li>Richiesta il: ${escape(new Date(request.requested_at).toLocaleString("it-IT"))}</li>
    </ul>
    <h3 style="margin:16px 0 8px;font-size:15px;">Articoli richiesti per il reso:</h3>
    <ul style="font-size:14px;padding-left:20px;">${itemsHtml}</ul>
    ${request.note ? `<p style="background:#f6f6f4;padding:12px;border-radius:8px;font-size:13px;"><strong>Nota cliente:</strong><br>${escape(request.note)}</p>` : ""}
    ${adminLink ? `<p><a href="${adminLink}" style="background:#111;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;display:inline-block;">Apri l'ordine in admin</a></p>` : ""}
    <p style="font-size:13px;color:#666;">Processa il reso in admin entro 48 ore e contatta il cliente per il ritiro.</p>`
  return {
    subject: `[${BRAND}] Richiesta reso — Ordine #${display}`,
    html: layout(`Richiesta reso — #${display}`, body),
  }
}

const passwordReset: Renderer = ({ token, entity_id, actor_type, storefront_url, admin_url }) => {
  const isAdmin = actor_type === "user"
  const baseUrl = isAdmin ? admin_url : storefront_url
  const path = isAdmin
    ? `/app/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(entity_id)}`
    : `/it/account/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(entity_id)}`
  const link = baseUrl ? `${baseUrl}${path}` : `(token: ${token})`
  const body = `
    <p>Ciao,</p>
    <p>abbiamo ricevuto una richiesta di reimpostazione della password per <strong>${escape(entity_id)}</strong>.</p>
    <p><a href="${link}" style="background:#111;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;display:inline-block;">Reimposta la password</a></p>
    <p style="font-size:13px;color:#666;">Se non hai richiesto tu questa email, ignorala. Il link scade tra 15 minuti.</p>
    <p style="font-size:13px;color:#666;">Link diretto: <span style="word-break:break-all;">${escape(link)}</span></p>`
  return {
    subject: `Reimposta la tua password — ${BRAND}`,
    html: layout("Reimposta password", body),
  }
}

export const TEMPLATES = {
  "order-placed-customer": orderPlacedCustomer,
  "order-placed-admin": orderPlacedAdmin,
  "shipment-created": shipmentCreated,
  "invite-created": inviteCreated,
  "password-reset": passwordReset,
  "return-requested-admin": returnRequestedAdmin,
} as const

export type TemplateName = keyof typeof TEMPLATES

export const renderTemplate = (
  name: string,
  data: Record<string, any>,
): RenderedEmail | null => {
  const renderer = (TEMPLATES as Record<string, Renderer>)[name]
  if (!renderer) return null
  return renderer(data)
}
