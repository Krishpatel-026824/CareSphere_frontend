const FILTERS = [
  { id: 'needs', label: 'Needs review' },
  { id: 'urgent', label: 'Urgent' },
  { id: 'verified', label: 'Verified' },
  { id: 'all', label: 'All' },
]

export default function DoctorLabReportQueueFilters({ value, counts = {}, onChange }) {
  return (
    <div className="shrink-0 flex flex-wrap gap-1.5 mb-3">
      {FILTERS.map((filter) => {
        const active = value === filter.id
        const count = counts[filter.id] ?? 0
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange?.(filter.id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold cursor-pointer transition-colors ${
              active
                ? 'bg-navy text-white'
                : 'bg-white border border-[#E6EBF1] text-body-gray hover:border-teal/40 hover:text-navy'
            }`}
          >
            {filter.label}
            <span
              className={`tabular-nums ${
                active ? 'text-white/80' : 'text-body-gray/80'
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
