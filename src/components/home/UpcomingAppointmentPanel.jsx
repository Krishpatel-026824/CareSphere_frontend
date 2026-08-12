import { Check, Clock3, MapPin, Video } from 'lucide-react'

const iconStroke = 1.75

export default function UpcomingAppointmentPanel({
  appointment,
  onViewAll,
  onReschedule,
  onJoinDetails,
}) {
  return (
    <section className="bg-white rounded-2xl border border-border-gray shadow-sm p-4 sm:p-5 xl:p-6 flex flex-col gap-3.5 sm:gap-4 h-full">
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-sm sm:text-base font-semibold text-navy">Upcoming appointment</h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-semibold text-teal cursor-pointer hover:opacity-70 transition-opacity"
        >
          View all →
        </button>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden ring-2 ring-violet-200/80 shadow-sm shrink-0 bg-violet-100">
          <img src={appointment.doctorPhoto} alt={appointment.doctorName} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-base sm:text-lg font-bold text-navy leading-tight">{appointment.doctorName}</p>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              {appointment.status}
            </span>
          </div>
          <p className="text-sm text-body-gray mt-0.5">
            {appointment.specialty} • {appointment.clinic}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl bg-bg-gray p-3.5 sm:p-4 shrink-0">
        {[
          { label: 'Date', value: appointment.dateLabel },
          { label: 'Time', value: appointment.timeLabel },
          { label: 'Type', value: appointment.visitType },
          { label: 'City', value: appointment.location },
        ].map((item) => (
          <div key={item.label} className="min-w-0">
            <p className="text-[11px] font-medium text-body-gray">{item.label}</p>
            <p className="text-sm font-semibold text-navy mt-1 truncate">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1 min-h-0">
        <div className="rounded-2xl border border-border-gray bg-bg-gray overflow-hidden flex flex-col min-h-[200px]">
          <div className="h-24 sm:h-28 shrink-0 overflow-hidden">
            <img
              src={appointment.clinicImage}
              alt="Clinic building"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 sm:p-5 flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-light text-teal flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" strokeWidth={iconStroke} />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-body-gray">Clinic location</p>
            </div>
            <p className="text-sm sm:text-base font-bold text-navy leading-snug">{appointment.address}</p>
            <p className="text-sm font-semibold text-teal">{appointment.room}</p>
            <p className="text-xs text-body-gray leading-relaxed">{appointment.landmark}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-amber/25 bg-amber-light/70 p-4 sm:p-5 flex flex-col gap-3 min-h-[200px]">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-amber/20 text-amber flex items-center justify-center shrink-0">
              <Clock3 className="w-4 h-4" strokeWidth={iconStroke} />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-body-gray">Visit prep</p>
          </div>
          <p className="text-sm font-semibold text-navy leading-snug">{appointment.prepNote}</p>
          <ul className="flex flex-col gap-2 mt-auto">
            {appointment.prepItems.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium text-navy/85">
                <span className="w-5 h-5 rounded-full bg-amber/25 text-amber flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={onReschedule}
          className="flex-1 min-h-11 rounded-xl border border-border-gray bg-bg-gray text-navy text-sm font-semibold cursor-pointer hover:bg-white transition-colors"
        >
          Reschedule
        </button>
        <button
          type="button"
          onClick={onJoinDetails}
          className="flex-[1.35] min-h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer shadow-sm hover:bg-teal-dark inline-flex items-center justify-center gap-2 transition-colors"
        >
          <Video className="w-4 h-4" strokeWidth={iconStroke} />
          Join / details
        </button>
      </div>
    </section>
  )
}
