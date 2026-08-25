import { ArrowLeft, Building2, CalendarDays, Check, Clock3, MapPin } from 'lucide-react'

const statusStyles = {
  Confirmed: 'bg-emerald-100 text-emerald-700',
  Upcoming: 'bg-sky-100 text-sky-700',
  Completed: 'bg-slate-100 text-slate-600',
}

export default function AppointmentDetailsScreen({ appointment, onBack, onReschedule }) {
  if (!appointment) return null

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-3xl mx-auto page-pad py-4 sm:py-6 flex flex-col gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal cursor-pointer hover:opacity-70 w-fit"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
          Back
        </button>

        <section className="bg-white rounded-2xl border border-border-gray shadow-sm p-4 sm:p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-violet-200/80 shrink-0">
              <img src={appointment.doctorPhoto} alt={appointment.doctorName} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-bold text-navy">{appointment.doctorName}</h1>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                    statusStyles[appointment.status] || statusStyles.Upcoming
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
              <p className="text-sm text-body-gray mt-0.5">
                {appointment.specialty} • {appointment.clinic}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl bg-bg-gray p-4">
            {[
              { label: 'Date', value: appointment.dateLabel, icon: CalendarDays },
              { label: 'Time', value: appointment.timeLabel, icon: Clock3 },
              { label: 'Type', value: appointment.visitType || 'In-clinic', icon: Building2 },
              { label: 'City', value: appointment.location, icon: MapPin },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[11px] font-medium text-body-gray">{item.label}</p>
                <p className="text-sm font-semibold text-navy mt-1">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border-gray overflow-hidden">
            <img src={appointment.clinicImage || appointment.heroImage} alt={`${appointment.clinic} building`} className="w-full h-32 sm:h-36 object-cover" />
            <div className="p-4 bg-bg-gray">
              <p className="text-sm font-bold text-navy">{appointment.address}</p>
              <p className="text-sm font-semibold text-teal mt-1">{appointment.room}</p>
              <p className="text-xs text-body-gray mt-1">{appointment.landmark}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-amber/25 bg-amber-light/70 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-body-gray">Visit prep</p>
            <p className="text-sm font-semibold text-navy mt-2">{appointment.prepNote}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {appointment.prepItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-navy/85">
                  <span className="w-5 h-5 rounded-full bg-amber/25 text-amber flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {appointment.status !== 'Completed' ? (
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => onReschedule?.(appointment)}
                className="flex-1 min-h-11 rounded-xl border border-border-gray bg-bg-gray text-navy text-sm font-semibold cursor-pointer hover:bg-white"
              >
                Reschedule
              </button>
              <button
                type="button"
                className="flex-[1.35] min-h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer shadow-sm hover:bg-teal-dark inline-flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" strokeWidth={1.75} />
                Clinic directions
              </button>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  )
}
