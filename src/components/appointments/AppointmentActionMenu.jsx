import { CalendarX2, CircleCheck } from 'lucide-react'

export default function AppointmentActionMenu({ open, x, y, options = [], onSelect, onClose }) {
  if (!open || options.length === 0) return null

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div
        role="menu"
        aria-label="Appointment options"
        className="absolute w-52 rounded-xl bg-white shadow-lg border border-border-gray overflow-hidden"
        style={{ top: y, left: x }}
        onClick={(event) => event.stopPropagation()}
      >
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            role="menuitem"
            onClick={() => onSelect?.(option.id)}
            className={`w-full px-3.5 py-2.5 flex items-center gap-3 text-left cursor-pointer hover:bg-bg-gray ${
              option.danger ? 'text-rose-600' : 'text-navy'
            }`}
          >
            {option.id === 'confirm' ? (
              <CircleCheck className="w-4 h-4 shrink-0" strokeWidth={1.75} />
            ) : (
              <CalendarX2 className="w-4 h-4 shrink-0" strokeWidth={1.75} />
            )}
            <span className="text-[13px] font-semibold">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
