"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import { unsplashLoader } from "@lib/util/unsplash-loader"
import { MEGA_MENU, MegaMenuRoot } from "./data"

type Props = {
  active: string | null
  onActivate: (key: string) => void
  onDismiss: () => void
}

const RIGHT_COLS = 3 // sub-categories + feature share a 3-col grid

export default function MegaMenuPanel({
  active,
  onActivate,
  onDismiss,
}: Props) {
  const visible = !!active
  const activeRoot = MEGA_MENU.find((r) => r.key === active)

  return (
    <>
      <div
        aria-hidden={!visible}
        onClick={onDismiss}
        className={`fixed inset-x-0 top-20 bottom-0 z-30 bg-brand-dark/30 backdrop-blur-sm transition-opacity duration-200 ${
          visible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        onMouseLeave={onDismiss}
        className={`hidden lg:block fixed inset-x-0 top-20 z-40 transition-all duration-300 ease-out ${
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        // Pre-mount so triggers can hover into a known panel area before
        // the active state propagates.
        onMouseEnter={() => activeRoot && onActivate(activeRoot.key)}
      >
        <div className="bg-white border-b border-brand-dark/5 shadow-[0_24px_48px_rgba(0,0,0,0.08)]">
          <div className="max-w-[1440px] mx-auto px-8 py-10">
            {activeRoot ? (
              <PanelLayout root={activeRoot} />
            ) : (
              // Sizer keeps the panel from collapsing while it fades out.
              <div className="invisible">
                <PanelLayout root={MEGA_MENU[0]} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function PanelLayout({ root }: { root: MegaMenuRoot }) {
  const featureSpan = Math.max(1, RIGHT_COLS - root.items.length)

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Left: caption + CTA */}
      <div className="col-span-3 flex flex-col justify-between py-2">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-brand-dark/50">
            Stanza
          </span>
          <h3 className="font-serif text-4xl xl:text-5xl text-brand-dark mt-3 leading-[1.05]">
            {root.label}
          </h3>
          <p className="text-brand-dark/60 text-sm mt-4 leading-relaxed max-w-[28ch]">
            {root.caption}
          </p>
        </div>

        <LocalizedClientLink
          href={root.href}
          className="group/cta inline-flex items-center justify-between gap-4 self-start mt-8 bg-brand-dark text-white rounded-full pl-5 pr-2 py-2 text-sm font-bold hover:bg-brand-accent transition-colors"
        >
          <span>Tutto il {root.label}</span>
          <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover/cta:bg-white/25 transition-colors">
            <ArrowRight
              size={14}
              weight="bold"
              className="group-hover/cta:translate-x-0.5 transition-transform"
            />
          </span>
        </LocalizedClientLink>
      </div>

      {/* Right: 3-col grid where feature stretches across the unused cells */}
      <div
        className="col-span-9 grid gap-5"
        style={{
          gridTemplateColumns: `repeat(${RIGHT_COLS}, minmax(0, 1fr))`,
        }}
      >
        {root.items.map((item) => (
          <SubCategoryCard key={item.href} item={item} />
        ))}
        <FeatureCard root={root} span={featureSpan} />
      </div>
    </div>
  )
}

function SubCategoryCard({
  item,
}: {
  item: MegaMenuRoot["items"][number]
}) {
  return (
    <LocalizedClientLink
      href={item.href}
      className="group/card flex flex-col"
    >
      <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-brand-light img-zoom-wrapper">
        <Image
          loader={unsplashLoader}
          src={item.image}
          alt={item.label}
          fill
          sizes="(min-width: 1280px) 18vw, 22vw"
          className="object-cover"
        />
        <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center text-brand-dark opacity-0 group-hover/card:opacity-100 transition-opacity">
          <ArrowRight size={14} weight="bold" />
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-2">
        <h4 className="font-bold text-base text-brand-dark group-hover/card:text-brand-accent transition-colors">
          {item.label}
        </h4>
        {item.count !== undefined && (
          <span className="text-xs font-medium text-brand-dark/40 shrink-0">
            {item.count} prodotti
          </span>
        )}
      </div>
      <p className="text-sm text-brand-dark/60 mt-1 leading-snug">
        {item.description}
      </p>
    </LocalizedClientLink>
  )
}

function FeatureCard({ root, span }: { root: MegaMenuRoot; span: number }) {
  return (
    <LocalizedClientLink
      href={root.href}
      className="group/feature relative rounded-[1.5rem] overflow-hidden img-zoom-wrapper bg-brand-dark"
      style={{ gridColumn: `span ${span} / span ${span}` }}
    >
      {/* Match height of aspect-[4/5] sub-cat siblings via grid row stretch.
          Use absolute layered image + content. */}
      <Image
        loader={unsplashLoader}
        src={root.feature.image}
        alt={root.feature.title}
        fill
        sizes="(min-width: 1280px) 38vw, 45vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/90 via-brand-dark/30 to-transparent" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/70 mb-2">
          Esplora
        </span>
        <h4 className="font-serif text-2xl xl:text-3xl leading-[1.1] max-w-[18ch]">
          {root.feature.title}
        </h4>
        <p className="text-white/70 text-sm mt-3 max-w-[32ch] leading-relaxed">
          {root.feature.body}
        </p>
        <span className="inline-flex items-center gap-2 mt-5 text-xs font-bold uppercase tracking-wider self-start">
          Scopri
          <ArrowRight
            size={12}
            weight="bold"
            className="group-hover/feature:translate-x-1 transition-transform"
          />
        </span>
      </div>
    </LocalizedClientLink>
  )
}
