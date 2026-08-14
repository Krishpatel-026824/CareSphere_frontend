import { CalendarDays, Clock3, MapPin } from 'lucide-react'

const iconStroke = 1.75

export default function RescheduleCurrentVisit({ appointment }) {
  if (!appointment) return null

  const facts = [
    { icon: CalendarDays, label: 'Date', value: appointment.dateLabel },
    { icon: Clock3, label: 'Time', value: appointment.timeLabel },
    { icon: MapPin, label: 'Clinic', value: appointment.clinic },
  ]

  return (
    <section className="rounded-2xl border border-teal/20 bg-white shadow-[0_8px_30px_rgba(7,26,47,0.05)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0 ring-2 ring-teal/20 bg-teal-light">
          <img src={appointment.doctorPhoto} alt={appointment.doctorName} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-teal">Current visit</p>
          <p className="text-base sm:text-lg font-bold text-navy mt-0.5 truncate">{appointment.doctorName}</p>
          <p className="text-sm text-body-gray truncate">
            {appointment.specialty} • {appointment.visitType}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full sm:w-auto sm:min-w-[420px]">
        {facts.map((item) => (
          <div key={item.label} className="rounded-xl bg-bg-gray px-3 py-2.5 min-w-0">
            <p className="inline-flex items-center gap-1 text-[11px] font-medium text-body-gray">
              <item.icon className="w-3.5 h-3.5 text-teal shrink-0" strokeWidth={iconStroke} />
              {item.label}
            </p>
            <p className="text-sm font-semibold text-navy mt-1 truncate">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
