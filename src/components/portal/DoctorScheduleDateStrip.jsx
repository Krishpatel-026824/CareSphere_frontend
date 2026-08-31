export default function DoctorScheduleDateStrip({ days = [], selectedId, onSelect }) {
  if (!days.length) return null

  const rangeLabel = formatRangeLabel(days)
  const totalVisits = days.reduce((sum, day) => sum + (day.count || 0), 0)

  return (
    <div className="w-full rounded-2xl border border-[#E6EBF1] bg-white shadow-sm overflow-hidden">
      <div className="h-1 shrink-0 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark" />

      <div className="px-4 sm:px-5 py-3 border-b border-[#E6EBF1] bg-gradient-to-b from-[#F8FAFC] to-white flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[15px] sm:text-base font-bold text-navy tracking-tight">10-day calendar</p>
          <p className="text-[12px] sm:text-[13px] text-body-gray mt-0.5 tabular-nums">{rangeLabel}</p>
        </div>
        <span className="shrink-0 text-[12px] font-bold text-teal bg-[#E8F7F6] border border-teal/15 px-3 py-1.5 rounded-full tabular-nums">
          {totalVisits} visit{totalVisits === 1 ? '' : 's'}
        </span>
      </div>

      <div className="p-2 sm:p-2.5 bg-[#DDE4EC]">
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
          {days.map((day) => {
            const active = day.id === selectedId
            const count = day.count || 0

            return (
              <button
                key={day.id}
                type="button"
                onClick={() => onSelect?.(day.id)}
                className={`min-h-[72px] sm:min-h-[76px] rounded-lg px-1 py-2 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all ${
                  active
                    ? 'bg-teal-dark text-white shadow-md shadow-teal-dark/25'
                    : day.isToday
                      ? 'bg-[#E8F7F6] text-navy hover:bg-white/80'
                      : 'bg-white/70 text-navy hover:bg-white'
                }`}
              >
                <span
                  className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wide leading-none ${
                    active ? 'text-white/85' : day.isToday ? 'text-teal' : 'text-body-gray'
                  }`}
                >
                  {day.isToday ? 'Today' : day.weekday}
                </span>

                <span
                  className={`text-[17px] sm:text-[19px] font-bold leading-none tabular-nums ${
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
                            active ? 'bg-white/90' : 'bg-teal'
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
