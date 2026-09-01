import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo } from 'react'
import { buildBookVisitCalendarMonth } from '../../data/generators/doctorBookVisitGenerator'

export default function BookVisitCalendar({ viewDate, selectedLabel, onViewDateChange, onSelectDate }) {
  const calendar = useMemo(() => buildBookVisitCalendarMonth(viewDate), [viewDate])

  function shiftMonth(offset) {
    const next = new Date(viewDate)
    next.setDate(1)
    next.setMonth(viewDate.getMonth() + offset)
    onViewDateChange?.(next)
  }

  return (
    <div className="rounded-xl border border-[#E6EBF1] bg-white overflow-hidden">
      <div className="px-3 py-2.5 border-b border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          className="w-8 h-8 rounded-lg border border-[#E6EBF1] bg-white text-navy flex items-center justify-center cursor-pointer hover:border-teal/40 hover:text-teal"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2} />
        </button>
        <p className="text-sm font-bold text-navy">{calendar.monthLabel}</p>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          className="w-8 h-8 rounded-lg border border-[#E6EBF1] bg-white text-navy flex items-center justify-center cursor-pointer hover:border-teal/40 hover:text-teal"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      <div className="p-3">
        <div className="grid grid-cols-7 gap-1 mb-1">
          {calendar.weekdayHeaders.map((header, index) => (
            <span
              key={`${header}-${index}`}
              className="text-[10px] font-bold uppercase tracking-[0.08em] text-body-gray text-center py-1"
            >
              {header}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendar.cells.map((cell) => {
            if (cell.empty) {
              return <span key={cell.key} className="aspect-square" aria-hidden="true" />
            }

            const active = cell.label === selectedLabel
            const disabled = cell.isPast

            return (
              <button
                key={cell.key}
                type="button"
                disabled={disabled}
                onClick={() => onSelectDate?.(cell.label)}
                className={`aspect-square rounded-lg text-sm font-semibold tabular-nums transition-colors ${
                  disabled
                    ? 'text-body-gray/35 cursor-not-allowed'
                    : active
                      ? 'bg-teal text-white shadow-sm cursor-pointer'
                      : cell.isToday
                        ? 'bg-[#E8F7F6] text-teal border border-teal/30 cursor-pointer hover:bg-teal hover:text-white'
                        : 'text-navy hover:bg-[#F0F9F8] cursor-pointer'
                }`}
              >
                {cell.day}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
