import { RotateCcw, Trash2 } from 'lucide-react'

const icons = {
  trash: Trash2,
  restore: RotateCcw,
}

export default function HealthRecordRowActions({ options = [], onAction }) {
  if (!options.length) return null

  return (
    <div className="flex items-center gap-2">
      {options.map((option) => {
        const Icon = icons[option.icon] || Trash2
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onAction?.(option.id)}
            className={`h-10 px-3.5 rounded-xl bg-white/95 backdrop-blur-[2px] border text-[13px] font-semibold cursor-pointer inline-flex items-center gap-1.5 ${
              option.danger
                ? 'border-red-400 text-red-500 hover:bg-red-50'
                : 'border-teal text-teal hover:bg-teal-light'
            }`}
          >
            <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
