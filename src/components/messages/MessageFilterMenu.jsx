import { Check } from 'lucide-react'
import { messageFilterOptions } from '../../data/mocks/messageFilters'

export default function MessageFilterMenu({ open, listFilter, onSelect, onClose }) {
  if (!open) return null

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-20 cursor-default"
        aria-label="Close filters"
        onClick={onClose}
      />
      <div
        role="menu"
        className="absolute right-0 top-[calc(100%+8px)] z-30 w-56 rounded-2xl border border-border-gray bg-white shadow-lg p-1.5"
      >
        {messageFilterOptions.map((option) => {
          const isActive = listFilter === option.id
          return (
            <button
              key={option.id}
              type="button"
              role="menuitem"
              onClick={() => {
                onSelect(option.id)
                onClose()
              }}
              className={`w-full text-left rounded-xl px-3 py-2.5 flex items-center gap-2 cursor-pointer ${
                isActive ? 'bg-teal-light text-navy' : 'hover:bg-bg-gray text-navy'
              }`}
            >
              <span className="flex-1 min-w-0">
                <span className="block text-sm font-semibold">{option.label}</span>
                <span className="block text-[11px] text-body-gray mt-0.5">{option.hint}</span>
              </span>
              {isActive ? <Check className="w-4 h-4 text-teal shrink-0" strokeWidth={2} /> : null}
            </button>
          )
        })}
      </div>
    </>
  )
}
