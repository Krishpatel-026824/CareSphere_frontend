import { Eye, LayoutList, Mail } from 'lucide-react'

const filters = [
  { id: 'all', label: 'All', icon: LayoutList },
  { id: 'unread', label: 'Unread', icon: Mail },
  { id: 'viewed', label: 'Viewed', icon: Eye },
]

export default function NotificationFilterBar({ activeFilter, counts, onSelect }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id
        const Icon = filter.icon
        const count = counts[filter.id] ?? 0

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onSelect(filter.id)}
            className={`inline-flex items-center gap-2 h-10 px-4 rounded-full text-[13px] font-semibold cursor-pointer transition-all shadow-sm ${
              isActive
                ? 'bg-teal text-white'
                : 'bg-white text-navy border border-[#E6EBF1] hover:border-teal/40 hover:shadow'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-navy'}`} strokeWidth={1.9} />
            {filter.label}
            <span
              className={`min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-bold tabular-nums flex items-center justify-center ${
                isActive ? 'bg-white/20 text-white' : 'bg-[#EEF2F6] text-navy'
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
