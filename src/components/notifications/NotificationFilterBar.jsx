import { Eye, LayoutList, Mail } from 'lucide-react'

const filters = [
  { id: 'all', label: 'All', icon: LayoutList },
  { id: 'unread', label: 'Unread', icon: Mail },
  { id: 'viewed', label: 'Viewed', icon: Eye },
]

export default function NotificationFilterBar({ activeFilter, counts, onSelect }) {
  return (
    <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[#E8F6F5] w-fit max-w-full">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id
        const Icon = filter.icon
        const count = counts[filter.id]

        const inactiveClass = {
          all: 'bg-[#E8F6F5] text-teal',
          unread: 'bg-[#E8F6F5] text-teal',
          viewed: 'bg-amber-light text-amber-700',
        }[filter.id]

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onSelect(filter.id)}
            className={`inline-flex items-center gap-2 min-h-11 px-4 rounded-full cursor-pointer transition-all duration-200 ${
              isActive ? 'bg-teal text-white shadow-sm' : inactiveClass
            }`}
          >
            <Icon className="w-4 h-4" strokeWidth={1.75} />
            <span className="text-sm font-semibold">{filter.label}</span>
            <span
              className={`min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                isActive ? 'bg-white/25 text-white' : 'bg-white/70'
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
