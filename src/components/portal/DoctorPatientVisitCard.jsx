import { Building2, CalendarDays, Clock3, DoorOpen } from 'lucide-react'

const statusStyles = {
  Upcoming: 'bg-sky-50 text-sky-700 border-sky-200',
  Confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Completed: 'bg-slate-100 text-slate-600 border-slate-200',
  Cancelled: 'bg-rose-50 text-rose-600 border-rose-200',
}

const statusDot = {
  Upcoming: 'bg-sky-500',
  Confirmed: 'bg-emerald-500',
  Completed: 'bg-slate-400',
  Cancelled: 'bg-rose-500',
}

export default function DoctorPatientVisitCard({
  visit,
  selected,
  onSelect,
  displayOnly = false,
}) {
  const statusClass = statusStyles[visit.status] || statusStyles.Upcoming
  const dotClass = statusDot[visit.status] || statusDot.Upcoming

  const content = (
    <>
      <div className="flex flex-col items-center gap-1 shrink-0 w-4 self-stretch pt-1">
        <span className={`w-2 h-2 rounded-full ring-4 ring-white ${dotClass}`} />
        <span className="w-px flex-1 min-h-[16px] bg-[#E2E8F0]" />
      </div>

      <div className="flex-1 min-w-0 rounded-xl border border-[#EAF0F5] bg-gradient-to-br from-[#F8FBFC] to-white px-2.5 py-2">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex items-center gap-2 flex-wrap">
            <p className="font-display text-[13px] font-bold text-navy leading-none">
              {visit.timeLabel}
            </p>
            <p className="text-[11px] font-semibold text-body-gray inline-flex items-center gap-1">
              <CalendarDays className="w-3 h-3 text-teal" strokeWidth={1.9} />
              {visit.dateLabel}
            </p>
          </div>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border shrink-0 ${statusClass}`}>
            {visit.status}
          </span>
        </div>

        <p className="text-[12px] font-bold text-navy mt-1.5">{visit.visitType}</p>

        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
          <p className="text-[11px] text-body-gray inline-flex items-center gap-1 min-w-0">
            <DoorOpen className="w-3 h-3 text-teal shrink-0" strokeWidth={1.9} />
            <span className="truncate">{visit.room}</span>
          </p>
          <p className="text-[11px] text-body-gray inline-flex items-center gap-1 min-w-0">
            <Building2 className="w-3 h-3 text-teal shrink-0" strokeWidth={1.9} />
            <span className="truncate">{visit.clinic}</span>
          </p>
          <p className="text-[11px] text-body-gray inline-flex items-center gap-1 min-w-0">
            <Clock3 className="w-3 h-3 text-teal shrink-0" strokeWidth={1.9} />
            <span className="truncate">30 min consult</span>
          </p>
        </div>
      </div>
    </>
  )

  if (displayOnly) {
    return <div className="w-full flex items-stretch gap-2">{content}</div>
  }

  return (
    <button
      type="button"
      onClick={() => onSelect?.(visit)}
      className={`w-full text-left flex items-stretch gap-2 cursor-pointer transition-opacity ${
        selected ? 'opacity-100' : 'hover:opacity-95'
      }`}
    >
      {content}
    </button>
  )
}
