import { CalendarDays, ChevronRight, Clock, MessageCircle } from 'lucide-react'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'

const patientStatusStyles = {
  Upcoming: 'bg-sky-100 text-sky-700 border border-sky-200',
  Confirmed: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  Completed: 'bg-slate-100 text-slate-600 border border-slate-200',
}

export default function DoctorPatientCard({ patient, onSelect, onMessage }) {
  const next = patient.nextVisit
  const isCompleted = next?.status === 'Completed'
  const showMessage = Boolean(onMessage) && !isCompleted

  return (
    <div className="group w-full min-w-0 rounded-2xl border border-[#E6EBF1] bg-[#FAFBFC] hover:bg-white hover:border-teal/30 hover:shadow-sm px-4 py-3.5 flex items-center gap-3.5 transition-colors">
      <button
        type="button"
        onClick={() => onSelect?.(patient)}
        className="min-w-0 flex-1 text-left flex items-center gap-3.5 cursor-pointer bg-transparent"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-teal-light ring-2 ring-white">
          <img src={patient.avatar} alt="" className="w-full h-full object-cover object-top" />
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold text-navy truncate leading-snug">{patient.name}</h2>
          <p className="text-xs text-body-gray truncate leading-snug mt-1">
            {patient.ageLabel} • {patient.city}
            {patient.visitCount
              ? ` · ${patient.visitCount} visit${patient.visitCount === 1 ? '' : 's'}`
              : ''}
          </p>
          {next ? (
            <>
              <p className="text-xs text-body-gray truncate leading-snug mt-1">
                {next.visitType} • {next.clinic}
              </p>
              <p className="text-xs text-body-gray mt-1 flex items-center gap-3 leading-snug">
                <span className="inline-flex items-center gap-1.5 min-w-0 truncate">
                  <CalendarDays className="w-3.5 h-3.5 shrink-0 text-teal" strokeWidth={1.75} />
                  {next.dateLabel}
                </span>
                <span className="inline-flex items-center gap-1.5 shrink-0">
                  <Clock className="w-3.5 h-3.5 shrink-0 text-teal" strokeWidth={1.75} />
                  {next.timeLabel}
                </span>
              </p>
            </>
          ) : null}
        </div>
      </button>

      <div className="flex items-center gap-2 shrink-0">
        {next ? (
          <span
            className={`inline-flex items-center justify-center min-w-[86px] h-8 text-[11px] font-semibold tracking-[0.01em] rounded-full ${
              patientStatusStyles[next.status] || appointmentStatusStyles[next.status] || patientStatusStyles.Upcoming
            }`}
          >
            {next.status}
          </span>
        ) : null}
        {showMessage ? (
          <button
            type="button"
            onClick={() => onMessage(patient)}
            className="w-8 h-8 rounded-full bg-teal-light text-teal flex items-center justify-center cursor-pointer hover:bg-teal hover:text-white"
            aria-label={`Chat with ${patient.name}`}
          >
            <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.9} />
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => onSelect?.(patient)}
          className="w-8 h-8 rounded-full bg-[#F1F5F9] text-body-gray group-hover:text-teal flex items-center justify-center cursor-pointer"
          aria-label={`Open ${patient.name}`}
        >
          <ChevronRight className="w-4 h-4" strokeWidth={1.9} />
        </button>
      </div>
    </div>
  )
}
