import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-brand-dark/60">{title}</span>
        {current && (
          <span className="font-bold text-brand-dark">{current}</span>
        )}
      </div>
      <div
        className="flex flex-wrap gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          const isActive = v === current
          return (
            <button
              key={v}
              onClick={() => updateOption(option.id, v)}
              disabled={disabled}
              data-testid="option-button"
              className={clx(
                "px-5 py-2.5 rounded-full text-sm font-bold border transition-all",
                {
                  "bg-brand-dark text-white border-brand-dark": isActive,
                  "bg-white text-brand-dark border-brand-dark/15 hover:border-brand-dark/40":
                    !isActive,
                  "opacity-50 cursor-not-allowed": disabled,
                }
              )}
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
