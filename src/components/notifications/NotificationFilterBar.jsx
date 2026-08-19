import { Eye, LayoutList, Mail } from 'lucide-react'

const filters = [
  { id: 'all', label: 'All', icon: LayoutList },
  { id: 'unread', label: 'Unread', icon: Mail },
  { id: 'viewed', label: 'Viewed', icon: Eye },
]

export default function NotificationFilterBar({ activeFilter, counts, onSelect }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id
        const Icon = filter.icon
        const count = counts[filter.id]

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onSelect(filter.id)}
            className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-semibold cursor-pointer transition-all ${
              isActive
                ? 'bg-teal text-white shadow-sm'
                : 'bg-white border border-[#E6EBF1] text-[#475569] hover:border-teal/30'
            }`}
          >
            <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
            {filter.label}
            <span
              className={`min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center ${
                isActive ? 'bg-white/25 text-white' : 'bg-[#F1F5F9] text-[#64748B]'
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
