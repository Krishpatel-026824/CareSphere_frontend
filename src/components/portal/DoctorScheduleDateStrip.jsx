export default function DoctorScheduleDateStrip({ days = [], selectedId, onSelect }) {
  if (!days.length) return null

  const rangeLabel = formatRangeLabel(days)

  return (
    <div className="w-full rounded-2xl border border-[#E6EBF1] bg-white shadow-sm overflow-hidden">
      <div className="px-3.5 sm:px-4 py-2.5 border-b border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-between gap-3">
        <p className="text-[13px] sm:text-sm font-semibold text-navy">10-day calendar</p>
        <p className="text-[12px] sm:text-[13px] font-medium text-body-gray tabular-nums">{rangeLabel}</p>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-10 gap-px bg-[#E6EBF1] p-px">
        {days.map((day) => {
          const active = day.id === selectedId
          const count = day.count || 0

          return (
            <button
              key={day.id}
              type="button"
              onClick={() => onSelect?.(day.id)}
              className={`min-h-[72px] sm:min-h-[78px] px-1.5 py-2 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
                active
                  ? 'bg-teal text-white'
                  : day.isToday
                    ? 'bg-[#F0FDFA] text-navy hover:bg-[#CCFBF1]/70'
                    : 'bg-white text-navy hover:bg-[#F8FAFC]'
              }`}
            >
              <span
                className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wide leading-none ${
                  active ? 'text-white/85' : 'text-body-gray'
                }`}
              >
                {day.isToday ? 'Today' : day.weekday}
              </span>

              <span
                className={`text-[18px] sm:text-[20px] font-bold leading-none tabular-nums ${
                  active ? 'text-white' : 'text-navy'
                }`}
              >
                {day.day}
              </span>

              <span
                className={`text-[10px] sm:text-[11px] font-semibold leading-none ${
                  active ? 'text-white/80' : 'text-body-gray'
                }`}
              >
                {day.month}
              </span>

              <span className="h-2.5 flex items-center justify-center gap-0.5 mt-0.5" aria-hidden="true">
                {count > 0
                  ? Array.from({ length: Math.min(count, 3) }).map((_, index) => (
                      <span
                        key={`${day.id}-dot-${index}`}
                        className={`w-1.5 h-1.5 rounded-full ${
                          active ? 'bg-white' : 'bg-teal'
                        }`}
                      />
                    ))
                  : (
                    <span className="w-1.5 h-1.5" />
                  )}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function formatRangeLabel(days) {
  const first = days[0]
  const last = days[days.length - 1]
  if (!first || !last) return ''
  if (first.month === last.month) {
    return `${first.day}–${last.day} ${first.month}`
  }
  return `${first.day} ${first.month} – ${last.day} ${last.month}`
}
