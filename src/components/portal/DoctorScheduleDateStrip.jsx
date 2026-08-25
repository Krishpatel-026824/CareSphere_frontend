export default function DoctorScheduleDateStrip({ days = [], selectedId, onSelect }) {
  if (!days.length) return null

  return (
    <div className="shrink-0 flex items-center gap-2 overflow-x-auto pb-0.5">
      {days.map((day) => {
        const active = day.id === selectedId
        return (
          <button
            key={day.id}
            type="button"
            onClick={() => onSelect?.(day.id)}
            className={`shrink-0 min-w-[72px] rounded-2xl px-3 py-2.5 text-center cursor-pointer transition-all ${
              active
                ? 'bg-teal text-white shadow-sm'
                : 'bg-white/85 border border-white text-navy hover:border-teal/40'
            }`}
          >
            <p className={`text-[10px] font-semibold uppercase tracking-wide ${active ? 'text-white/80' : 'text-body-gray'}`}>
              {day.isToday ? 'Today' : day.weekday}
            </p>
            <p className="text-lg font-bold leading-none mt-1">{day.day}</p>
            <p className={`text-[10px] font-semibold mt-1 ${active ? 'text-white/80' : 'text-body-gray'}`}>
              {day.month}
              {day.count ? ` · ${day.count}` : ''}
            </p>
          </button>
        )
      })}
    </div>
  )
}
