import { CalendarDays } from 'lucide-react'

export default function DoctorScheduleDateStrip({ days = [], selectedId, onSelect }) {
  if (!days.length) return null

  const rangeLabel = formatRangeLabel(days)
  const totalVisits = days.reduce((sum, day) => sum + (day.count || 0), 0)
  const daySpan = days.length

  return (
    <section
      className="w-full rounded-2xl border border-[#E6EBF1] bg-white shadow-[0_8px_30px_-12px_rgba(7,26,47,0.12)] overflow-hidden"
    >
      <div className="h-1 shrink-0 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark" />

      <div className="px-4 sm:px-5 py-3.5 border-b border-[#E6EBF1] bg-gradient-to-b from-[#F8FAFC] via-white to-white flex items-center justify-between gap-3">
        <div className="min-w-0 flex items-center gap-3">
          <span
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8F7F6] to-white border border-teal/15 text-teal flex items-center justify-center shrink-0 shadow-sm"
          >
            <CalendarDays className="w-[18px] h-[18px]" strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] sm:text-[17px] font-bold text-navy tracking-tight leading-tight">
              {daySpan}-day calendar
            </p>
            <p className="text-[12px] sm:text-[13px] text-body-gray mt-0.5 tabular-nums">{rangeLabel}</p>
          </div>
        </div>
        <span className="shrink-0 text-[12px] font-bold text-teal-dark bg-[#E8F7F6] border border-teal/20 px-3 py-1.5 rounded-full tabular-nums shadow-sm">
          {totalVisits} visit{totalVisits === 1 ? '' : 's'}
        </span>
      </div>

      <div className="px-3 sm:px-4 py-3.5 sm:py-4 bg-[#FAFCFD]">
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-2.5 w-full">
          {days.map((day) => (
            <DayCell
              key={day.id}
              day={day}
              active={day.id === selectedId}
              onSelect={() => onSelect?.(day.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function DayCell({ day, active, onSelect }) {
  const count = day.count || 0

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`${day.isToday ? 'Today' : day.weekday} ${day.day} ${day.month}${
        count ? `, ${count} visits` : ''
      }`}
      className={`group relative w-full min-w-0 rounded-xl sm:rounded-2xl px-1.5 py-2.5 sm:py-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 border ${
        active
          ? 'bg-gradient-to-br from-[#0D9488] via-teal to-[#0B6E6A] border-transparent text-white shadow-lg shadow-teal/30 ring-2 ring-teal/20 ring-offset-2 ring-offset-[#FAFCFD]'
          : day.isToday
            ? 'bg-white border-teal/40 shadow-sm hover:border-teal/55 hover:shadow-md'
            : 'bg-white border-[#E6EBF1] shadow-sm hover:border-teal/30 hover:shadow-md hover:bg-white'
      }`}
    >
      {day.isToday && !active ? (
        <span className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-teal" />
      ) : null}

      <span
        className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.08em] leading-none ${
          active ? 'text-white/90' : day.isToday ? 'text-teal' : 'text-body-gray/80'
        }`}
      >
        {day.isToday ? 'Today' : day.weekday}
      </span>

      <span
        className={`text-[17px] sm:text-xl font-bold leading-none tabular-nums mt-1 ${
          active ? 'text-white' : 'text-navy'
        }`}
      >
        {day.day}
      </span>

      <span
        className={`text-[9px] sm:text-[10px] font-semibold leading-none mt-0.5 ${
          active ? 'text-white/80' : 'text-body-gray'
        }`}
      >
        {day.month}
      </span>

      <span
        className={`mt-2 min-h-[18px] min-w-[22px] px-1.5 rounded-full text-[10px] font-bold tabular-nums inline-flex items-center justify-center transition-colors ${
          count > 0
            ? active
              ? 'bg-white/25 text-white'
              : 'bg-[#E8F7F6] text-teal-dark border border-teal/15 group-hover:bg-teal/10'
            : ''
        }`}
      >
        {count > 0 ? count : null}
      </span>
    </button>
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
