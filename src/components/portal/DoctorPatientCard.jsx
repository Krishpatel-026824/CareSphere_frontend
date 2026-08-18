import { CalendarDays, ChevronRight } from 'lucide-react'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'

export default function DoctorPatientCard({ patient, onSelect }) {
  const next = patient.nextVisit
  return (
    <button
      type="button"
      onClick={() => onSelect?.(patient)}
      className="w-full h-full min-h-[88px] min-w-0 text-left rounded-2xl border border-border-gray bg-white p-3.5 flex items-center gap-3 cursor-pointer hover:border-teal/30 hover:shadow-sm"
    >
      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-teal-light">
        <img src={patient.avatar} alt="" className="w-full h-full object-cover object-top" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-navy truncate">{patient.name}</h2>
          {next ? (
            <span
              className={`text-[9px] font-semibold px-1.5 py-px rounded-full shrink-0 ${
                appointmentStatusStyles[next.status] || appointmentStatusStyles.Upcoming
              }`}
            >
              {next.status}
            </span>
          ) : null}
        </div>
        <p className="text-[12px] text-body-gray truncate mt-0.5">
          {patient.ageLabel} • {patient.city}
        </p>
        {next ? (
          <p className="text-[11px] text-body-gray mt-0.5 inline-flex items-center gap-1">
            <CalendarDays className="w-3 h-3" strokeWidth={1.75} />
            {next.dateLabel} · {next.timeLabel}
          </p>
        ) : null}
      </div>
      <ChevronRight className="w-4 h-4 text-body-gray shrink-0" />
    </button>
  )
}
