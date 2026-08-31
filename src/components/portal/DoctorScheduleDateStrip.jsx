export default function DoctorScheduleDateStrip({ days = [], selectedId, onSelect }) {
  if (!days.length) return null

  const rangeLabel = formatRangeLabel(days)
  const totalVisits = days.reduce((sum, day) => sum + (day.count || 0), 0)
  const daySpan = days.length

  return (
    <div className="w-full rounded-2xl border border-[#E6EBF1] bg-white shadow-sm overflow-hidden">
      <div className="h-1 shrink-0 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark" />

      <div className="px-4 sm:px-5 py-3 border-b border-[#E6EBF1] bg-gradient-to-b from-[#F8FAFC] to-white flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[15px] sm:text-base font-bold text-navy tracking-tight">
            {daySpan}-day calendar
          </p>
          <p className="text-[12px] sm:text-[13px] text-body-gray mt-0.5 tabular-nums">{rangeLabel}</p>
        </div>
        <span className="shrink-0 text-[12px] font-bold text-teal bg-[#E8F7F6] border border-teal/15 px-3 py-1.5 rounded-full tabular-nums">
          {totalVisits} visit{totalVisits === 1 ? '' : 's'}
        </span>
      </div>

      <div className="p-2 sm:p-2.5 bg-[#DDE4EC]">
        <div
          className={`grid gap-1.5 ${
            daySpan <= 5
              ? 'grid-cols-5'
              : daySpan <= 7
                ? 'grid-cols-7'
                : 'grid-cols-5 sm:grid-cols-10'
          }`}
        >
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

                <span
                  className={`mt-1 min-h-[16px] min-w-[18px] px-1 rounded-full text-[10px] font-bold tabular-nums inline-flex items-center justify-center ${
                    count > 0
                      ? active
                        ? 'bg-white/20 text-white'
                        : 'bg-teal/15 text-teal-dark'
                      : 'text-transparent'
                  }`}
                  aria-label={count > 0 ? `${count} visits` : 'No visits'}
                >
                  {count > 0 ? count : '·'}
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
