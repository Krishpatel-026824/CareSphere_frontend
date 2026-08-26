export default function DoctorScheduleDateStrip({ days = [], selectedId, onSelect }) {
  if (!days.length) return null

  return (
    <div className="shrink-0 flex items-center justify-end gap-1.5 overflow-x-auto max-w-full">
      {days.map((day) => {
        const active = day.id === selectedId
        const count = day.count || 0

        return (
          <button
            key={day.id}
            type="button"
            onClick={() => onSelect?.(day.id)}
            className={`shrink-0 w-[52px] sm:w-[56px] rounded-xl px-1.5 py-1.5 text-center cursor-pointer transition-all border ${
              active
                ? 'bg-teal text-white border-teal shadow-sm'
                : 'bg-white border-[#E6EBF1] text-navy hover:border-teal/40 hover:bg-[#F0FDFA]'
            }`}
          >
            <p
              className={`text-[9px] font-bold uppercase tracking-wide leading-none ${
                active ? 'text-white/80' : 'text-body-gray'
              }`}
            >
              {day.isToday ? 'Today' : day.weekday}
            </p>
            <p className="text-[15px] sm:text-base font-bold leading-none mt-1 tabular-nums">
              {day.day}
            </p>
            <p
              className={`text-[9px] font-semibold mt-1 leading-none ${
                active ? 'text-white/75' : 'text-body-gray'
              }`}
            >
              {day.month}
              {count > 0 ? ` · ${count}` : ''}
            </p>
          </button>
        )
      })}
    </div>
  )
}
