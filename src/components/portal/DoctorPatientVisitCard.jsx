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

export default function DoctorPatientVisitCard({ visit, selected, onSelect, displayOnly = false }) {
  const statusClass = statusStyles[visit.status] || statusStyles.Upcoming
  const dotClass = statusDot[visit.status] || statusDot.Upcoming

  const content = (
    <>
      <div className="flex flex-col items-center gap-1 shrink-0 w-5">
        <span className={`w-2.5 h-2.5 rounded-full ring-4 ring-white ${dotClass}`} />
        <span className="w-px flex-1 min-h-[28px] bg-[#E2E8F0]" />
      </div>

      <div className="flex-1 min-w-0 rounded-2xl border border-[#EAF0F5] bg-gradient-to-br from-[#F8FBFC] to-white px-3.5 py-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-display text-[15px] font-bold text-navy leading-tight">{visit.timeLabel}</p>
            <p className="text-[12px] font-semibold text-body-gray mt-1 inline-flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-teal" strokeWidth={1.9} />
              {visit.dateLabel}
            </p>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${statusClass}`}>
            {visit.status}
          </span>
        </div>

        <p className="text-sm font-bold text-navy mt-2.5">{visit.visitType}</p>

        <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          <p className="text-[12px] text-body-gray inline-flex items-center gap-1.5 min-w-0">
            <DoorOpen className="w-3.5 h-3.5 text-teal shrink-0" strokeWidth={1.9} />
            <span className="truncate">{visit.room}</span>
          </p>
          <p className="text-[12px] text-body-gray inline-flex items-center gap-1.5 min-w-0">
            <Building2 className="w-3.5 h-3.5 text-teal shrink-0" strokeWidth={1.9} />
            <span className="truncate">{visit.clinic}</span>
          </p>
          <p className="text-[12px] text-body-gray inline-flex items-center gap-1.5 min-w-0 sm:col-span-2">
            <Clock3 className="w-3.5 h-3.5 text-teal shrink-0" strokeWidth={1.9} />
            <span className="truncate">30 min consult</span>
          </p>
        </div>
      </div>
    </>
  )

  if (displayOnly) {
    return <div className="w-full shrink-0 flex items-stretch gap-2.5">{content}</div>
  }

  return (
    <button
      type="button"
      onClick={() => onSelect?.(visit)}
      className={`w-full shrink-0 text-left flex items-stretch gap-2.5 cursor-pointer transition-opacity ${
        selected ? 'opacity-100' : 'hover:opacity-95'
      }`}
    >
      {content}
    </button>
  )
}
