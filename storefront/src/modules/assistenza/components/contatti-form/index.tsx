"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { sendContactMessage, type ContactState } from "@lib/data/contact"
import { CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SUBJECT_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Seleziona un oggetto…" },
  { value: "ordine", label: "Domanda su un ordine" },
  { value: "spedizione", label: "Spedizione" },
  { value: "resi", label: "Reso / Diritto di recesso" },
  { value: "garanzia", label: "Garanzia" },
  { value: "informazioni", label: "Richiesta di informazioni" },
  { value: "altro", label: "Altro" },
]

const initialState: ContactState = { ok: false, message: "" }

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors || errors.length === 0) return null
  return (
    <p className="text-xs text-red-600 mt-1" role="alert">
      {errors[0]}
    </p>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full md:w-auto px-8 py-3.5 rounded-full bg-brand-dark text-white font-semibold hover:bg-brand-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Invio in corso…" : "Invia messaggio"}
    </button>
  )
}

export default function ContattiForm() {
  const [state, formAction] = useActionState(sendContactMessage, initialState)

  if (state.ok) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle size={48} weight="fill" className="text-emerald-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-brand-dark mb-2">
          Grazie per averci scritto
        </h3>
        <p className="text-brand-dark/70">{state.message}</p>
      </div>
    )
  }

  const fe = state.fieldErrors

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {state.message && !state.ok && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <WarningCircle size={20} weight="fill" className="shrink-0 mt-0.5" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nome" className="block text-sm font-semibold text-brand-dark mb-1.5">
            Nome e cognome <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            autoComplete="name"
            className="w-full px-4 py-3 rounded-xl border border-brand-dark/15 bg-white focus:outline-none focus:border-brand-dark transition-colors"
          />
          <FieldError errors={fe?.nome} />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-brand-dark mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl border border-brand-dark/15 bg-white focus:outline-none focus:border-brand-dark transition-colors"
          />
          <FieldError errors={fe?.email} />
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-semibold text-brand-dark mb-1.5">
            Telefono
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            autoComplete="tel"
            className="w-full px-4 py-3 rounded-xl border border-brand-dark/15 bg-white focus:outline-none focus:border-brand-dark transition-colors"
          />
          <FieldError errors={fe?.telefono} />
        </div>

        <div>
          <label htmlFor="numeroOrdine" className="block text-sm font-semibold text-brand-dark mb-1.5">
            Numero ordine (se applicabile)
          </label>
          <input
            type="text"
            id="numeroOrdine"
            name="numeroOrdine"
            className="w-full px-4 py-3 rounded-xl border border-brand-dark/15 bg-white focus:outline-none focus:border-brand-dark transition-colors"
          />
          <FieldError errors={fe?.numeroOrdine} />
        </div>
      </div>

      <div>
        <label htmlFor="oggetto" className="block text-sm font-semibold text-brand-dark mb-1.5">
          Oggetto <span className="text-red-500">*</span>
        </label>
        <select
          id="oggetto"
          name="oggetto"
          required
          defaultValue=""
          className="w-full px-4 py-3 rounded-xl border border-brand-dark/15 bg-white focus:outline-none focus:border-brand-dark transition-colors"
        >
          {SUBJECT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
              {opt.label}
            </option>
          ))}
        </select>
        <FieldError errors={fe?.oggetto} />
      </div>

      <div>
        <label htmlFor="messaggio" className="block text-sm font-semibold text-brand-dark mb-1.5">
          Messaggio <span className="text-red-500">*</span>
        </label>
        <textarea
          id="messaggio"
          name="messaggio"
          required
          rows={6}
          minLength={10}
          maxLength={5000}
          className="w-full px-4 py-3 rounded-xl border border-brand-dark/15 bg-white focus:outline-none focus:border-brand-dark transition-colors resize-y"
        />
        <FieldError errors={fe?.messaggio} />
      </div>

      <div className="flex items-start gap-3 rounded-2xl bg-brand-dark/[0.03] p-4">
        <input
          type="checkbox"
          id="consensoPrivacy"
          name="consensoPrivacy"
          required
          className="mt-1 w-4 h-4 accent-brand-dark"
        />
        <label htmlFor="consensoPrivacy" className="text-sm text-brand-dark/80 leading-relaxed">
          Ho letto e accetto l&apos;
          <LocalizedClientLink href="/privacy" className="text-brand-accent hover:underline">
            informativa sulla privacy
          </LocalizedClientLink>{" "}
          e acconsento al trattamento dei miei dati per rispondere alla mia richiesta
          (art. 13 GDPR). <span className="text-red-500">*</span>
        </label>
      </div>
      <FieldError errors={fe?.consensoPrivacy} />

      {/* Honeypot — hidden from real users, attractive to bots. Lascia vuoto. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Sito web (non compilare)</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  )
}
