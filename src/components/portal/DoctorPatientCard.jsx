import { CalendarDays, ChevronRight, MessageCircle } from 'lucide-react'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'

export default function DoctorPatientCard({ patient, onSelect, onMessage }) {
  const next = patient.nextVisit
  return (
    <div className="w-full min-w-0 rounded-2xl border border-border-gray bg-white px-3.5 py-3 flex items-center gap-3 hover:border-teal/30 hover:shadow-sm">
      <button
        type="button"
        onClick={() => onSelect?.(patient)}
        className="min-w-0 flex-1 text-left flex items-center gap-3 cursor-pointer bg-transparent"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-teal-light">
          <img src={patient.avatar} alt="" className="w-full h-full object-cover object-top" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-sm font-bold text-navy truncate">{patient.name}</h2>
            {next ? (
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                  appointmentStatusStyles[next.status] || appointmentStatusStyles.Upcoming
                }`}
              >
                {next.status}
              </span>
            ) : null}
          </div>
          <p className="text-[12px] text-body-gray truncate leading-tight mt-1">
            {patient.ageLabel} • {patient.city}
          </p>
          {next ? (
            <p className="text-[12px] text-body-gray mt-1 inline-flex items-center gap-1.5 leading-tight">
              <CalendarDays className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
              <span className="truncate">
                {next.dateLabel} · {next.timeLabel}
              </span>
            </p>
          ) : null}
        </div>
      </button>
      {onMessage ? (
        <button
          type="button"
          onClick={() => onMessage(patient)}
          className="w-9 h-9 rounded-full bg-teal-light text-teal flex items-center justify-center shrink-0 cursor-pointer hover:bg-teal hover:text-white"
          aria-label={`Chat with ${patient.name}`}
        >
          <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
        </button>
      ) : null}
      <ChevronRight className="w-5 h-5 text-body-gray shrink-0" />
    </div>
  )
}
