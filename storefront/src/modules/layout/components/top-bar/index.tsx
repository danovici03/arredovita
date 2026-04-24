import {
  ArrowLeft,
  ArrowRight,
  CaretDown,
  Coins,
  FacebookLogo,
  GlobeHemisphereWest,
  InstagramLogo,
  Truck,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr"

const TopBar = () => {
  return (
    <div className="bg-brand-dark text-white/90 text-[11px] sm:text-xs py-2.5 px-4 sm:px-8 flex items-center justify-between font-medium">
      <div className="hidden md:flex items-center gap-5">
        <a href="#" className="hover:text-white transition-colors">
          <FacebookLogo size={18} />
        </a>
        <a href="#" className="hover:text-white transition-colors">
          <XLogo size={18} />
        </a>
        <a href="#" className="hover:text-white transition-colors">
          <InstagramLogo size={18} />
        </a>
        <a href="#" className="hover:text-white transition-colors">
          <YoutubeLogo size={18} />
        </a>
      </div>

      <div className="flex-1 flex items-center justify-center gap-4">
        <button className="hover:text-white transition-colors">
          <ArrowLeft size={14} />
        </button>
        <span className="tracking-widest uppercase flex items-center gap-2">
          <Truck size={16} className="hidden sm:inline-block" />
          Risparmia fino al 60% con il codice ARREDO26
        </span>
        <button className="hover:text-white transition-colors">
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <button className="flex items-center gap-1.5 hover:text-white transition-colors">
          <GlobeHemisphereWest size={16} /> Italiano <CaretDown size={12} />
        </button>
        <button className="flex items-center gap-1.5 hover:text-white transition-colors">
          <Coins size={16} /> EUR (€) <CaretDown size={12} />
        </button>
      </div>
    </div>
  )
}

export default TopBar
