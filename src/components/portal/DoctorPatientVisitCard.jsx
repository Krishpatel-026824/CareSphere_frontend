import { Building2, ChevronRight, Clock } from 'lucide-react'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'

export default function DoctorPatientVisitCard({ visit, selected, onSelect, onOpenMenu }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(visit)}
      onContextMenu={(event) => {
        event.preventDefault()
        onOpenMenu?.(visit, event)
      }}
      className={`relative w-full shrink-0 text-left rounded-xl border px-3 py-2.5 flex items-center gap-2.5 cursor-pointer transition-all ${
        selected
          ? 'bg-[#E8F7F6] border-teal shadow-sm'
          : 'bg-white border-[#E6EBF1] hover:border-teal/30'
      }`}
    >
      {selected ? <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-teal" /> : null}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <p className="text-[13px] font-bold text-navy truncate">{visit.dateLabel}</p>
          <span
            className={`text-[9px] font-semibold px-1.5 py-px rounded-full shrink-0 ${
              appointmentStatusStyles[visit.status] || appointmentStatusStyles.Upcoming
            }`}
          >
            {visit.status}
          </span>
        </div>
        <p className="text-[11px] text-body-gray truncate leading-tight mt-0.5">
          {visit.visitType} • {visit.room}
        </p>
        <p className="text-[11px] text-body-gray mt-0.5 inline-flex items-center gap-2.5 leading-tight">
          <span className="inline-flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" strokeWidth={1.75} />
            {visit.timeLabel}
          </span>
          <span className="inline-flex items-center gap-1 min-w-0">
            <Building2 className="w-3 h-3 shrink-0" strokeWidth={1.75} />
            <span className="truncate">{visit.clinic}</span>
          </span>
        </p>
      </div>
      <ChevronRight className="w-3.5 h-3.5 text-body-gray shrink-0" strokeWidth={1.75} />
    </button>
  )
}
