import { RotateCcw, Trash2 } from 'lucide-react'

const icons = {
  trash: Trash2,
  restore: RotateCcw,
}

export default function HealthRecordRowActions({ open, x = 0, y = 0, options = [], onAction, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div
        role="menu"
        aria-label="Record options"
        className="absolute w-48 rounded-md bg-white shadow-[0_2px_10px_rgba(11,20,26,0.26)] py-1 overflow-hidden"
        style={{ top: y, left: x }}
        onClick={(event) => event.stopPropagation()}
      >
        {options.map((option) => {
          const Icon = icons[option.icon] || Trash2
          return (
            <button
              key={option.id}
              type="button"
              role="menuitem"
              onClick={() => onAction?.(option.id)}
              className={`w-full px-4 py-2.5 flex items-center gap-3 text-left text-[14.5px] cursor-pointer hover:bg-[#F5F6F6] ${
                option.danger ? 'text-[#EA0038]' : 'text-[#3B4A54]'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
