import { CalendarDays, ChevronRight } from 'lucide-react'
const statusStyles = {
  Confirmed: 'bg-emerald-100 text-emerald-700',
  Upcoming: 'bg-sky-100 text-sky-700',
  Completed: 'bg-slate-100 text-slate-600',
}

export default function AppointmentsScreen({ appointments = [], onSelectAppointment }) {
  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-3xl mx-auto page-pad py-4 sm:py-6 flex flex-col gap-4">
        <header>
          <h1 className="text-xl sm:text-2xl font-bold text-navy tracking-tight">Appointments</h1>
          <p className="text-sm text-body-gray mt-1">{appointments.length} total appointments</p>
        </header>

        <div className="flex flex-col gap-3">
          {appointments.map((appointment) => (
            <button
              key={appointment.id}
              type="button"
              onClick={() => onSelectAppointment?.(appointment)}
              className="w-full text-left bg-white border border-border-gray rounded-2xl p-4 shadow-sm flex items-center gap-3.5 cursor-pointer hover:border-teal/40 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 ring-2 ring-violet-200/60">
                <img src={appointment.doctorPhoto} alt={appointment.doctorName} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-sm font-semibold text-navy truncate">{appointment.doctorName}</h2>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      statusStyles[appointment.status] || statusStyles.Upcoming
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>
                <p className="text-xs text-body-gray mt-0.5 truncate">
                  {appointment.specialty} • {appointment.clinic}
                </p>
                <p className="text-xs text-body-gray mt-1 inline-flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                  {appointment.dateLabel} · {appointment.timeLabel}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.75} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
