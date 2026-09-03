import { Eye, LayoutList, Mail } from 'lucide-react'

const filters = [
  { id: 'all', label: 'All', icon: LayoutList },
  { id: 'unread', label: 'Unread', icon: Mail },
  { id: 'viewed', label: 'Viewed', icon: Eye },
]

export default function NotificationFilterBar({ activeFilter, counts, onSelect }) {
  return (
    <div className="inline-flex w-full max-w-md p-1 rounded-xl bg-white border border-border-gray shadow-[0_1px_4px_rgba(7,26,47,0.05)]">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id
        const Icon = filter.icon
        const count = counts[filter.id] ?? 0

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onSelect(filter.id)}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-3.5 rounded-lg text-[12px] font-semibold cursor-pointer transition-all ${
              isActive
                ? 'bg-teal text-white shadow-sm'
                : 'text-body-gray hover:text-navy hover:bg-teal-light/60'
            }`}
          >
            <Icon className="w-3.5 h-3.5" strokeWidth={1.9} />
            {filter.label}
            <span
              className={`min-w-[18px] h-[18px] px-1 rounded-md text-[10px] font-bold tabular-nums flex items-center justify-center ${
                isActive ? 'bg-white/25 text-white' : 'bg-[#E8EEF4] text-navy'
              }`}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
