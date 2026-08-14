import { CalendarDays, CalendarPlus, Check, MapPin, Phone, Video } from 'lucide-react'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'

export default function UpcomingAppointmentPanel({
  appointment,
  visitSignals,
  onReschedule,
  onJoinDetails,
  onBook,
}) {
  if (!appointment) {
    return (
      <section className="bg-white rounded-2xl border border-border-gray shadow-sm p-5 sm:p-6 flex flex-col items-start justify-center gap-3 h-full">
        <span className="w-12 h-12 rounded-2xl bg-teal-light text-teal flex items-center justify-center">
          <CalendarPlus className="w-6 h-6" strokeWidth={1.75} />
        </span>
        <h2 className="text-base font-semibold text-navy">No upcoming visit</h2>
        <p className="text-sm text-body-gray max-w-md">
          Book a doctor and your next appointment will show up here.
        </p>
        <button
          type="button"
          onClick={onBook}
          className="min-h-11 px-4 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark"
        >
          Book appointment
        </button>
      </section>
    )
  }

  const isVideo = String(appointment.visitType || '').toLowerCase().includes('video')
  const prepItems = [...(appointment.prepItems || []), ...(visitSignals?.prepLabels || [])]

  return (
    <section className="bg-white rounded-2xl border border-border-gray shadow-sm p-4 sm:p-5 flex flex-col gap-3.5 h-full">
      <div className="flex items-start justify-between gap-3 shrink-0">
        <h2 className="text-sm sm:text-base font-semibold text-navy">Upcoming appointment</h2>
        <span
          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${
            appointmentStatusStyles[appointment.status] || appointmentStatusStyles.Upcoming
          }`}
        >
          {appointment.status}
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-teal-light shadow-sm shrink-0 bg-teal-light">
          <img
            src={appointment.doctorPhoto}
            alt={appointment.doctorName}
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="min-w-0">
          <p className="text-base sm:text-lg font-bold text-navy leading-tight truncate">{appointment.doctorName}</p>
          <p className="text-sm text-body-gray truncate mt-0.5">
            {appointment.specialty} • {appointment.clinic}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 rounded-xl bg-bg-gray p-3 shrink-0">
        {[
          { label: 'Date', value: appointment.dateLabel },
          { label: 'Time', value: appointment.timeLabel },
          { label: 'Type', value: appointment.visitType },
          { label: 'City', value: appointment.location },
        ].map((item) => (
          <div key={item.label} className="min-w-0">
            <p className="text-[11px] font-medium text-body-gray">{item.label}</p>
            <p className="text-sm font-semibold text-navy mt-0.5 truncate">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-h-0">
        <div className="rounded-xl border border-border-gray bg-[#F7FBFA] overflow-hidden flex flex-col h-full min-h-0">
          <div className="px-3.5 pt-3.5 pb-2.5 flex items-start gap-3 shrink-0">
            <span className="w-8 h-8 rounded-lg bg-teal-light text-teal flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-body-gray">Clinic</p>
              <p className="text-sm font-semibold text-navy mt-0.5 leading-snug">{appointment.address}</p>
              <p className="text-sm font-semibold text-teal mt-1">{appointment.room}</p>
              {appointment.landmark ? (
                <p className="text-xs text-body-gray mt-1 leading-relaxed">{appointment.landmark}</p>
              ) : null}
            </div>
          </div>
          <div className="flex-1 min-h-[7.5rem] mx-3.5 mb-2.5 rounded-lg overflow-hidden bg-teal-light">
            <img
              src={appointment.clinicImage || appointment.heroImage || appointment.doctorPhoto}
              alt={appointment.clinic}
              className="w-full h-full object-cover"
            />
          </div>
          {appointment.phone ? (
            <p className="px-3.5 pb-3 flex items-center gap-2 text-sm font-medium text-navy shrink-0">
              <Phone className="w-3.5 h-3.5 text-teal shrink-0" strokeWidth={1.75} />
              {appointment.phone}
            </p>
          ) : null}
        </div>

        <div className="rounded-xl border border-amber/20 bg-amber-light/70 px-3.5 py-3.5 flex flex-col h-full min-h-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-body-gray shrink-0">Visit prep</p>
          {appointment.prepNote ? (
            <p className="text-sm font-medium text-navy mt-2 leading-snug">{appointment.prepNote}</p>
          ) : null}
          <ul className="mt-3 flex flex-col gap-2">
            {prepItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-navy">
                <Check className="w-3.5 h-3.5 text-amber shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {visitSignals ? (
            <div className="mt-auto pt-3 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-navy">
                {visitSignals.reminderOn
                  ? `Reminder · ${visitSignals.reminderTiming}`
                  : 'Reminders off'}
              </span>
              <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-navy">
                {visitSignals.shareRecords ? 'Records shared' : 'Records private'}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
        <button
          type="button"
          onClick={onReschedule}
          className="flex-1 min-h-11 rounded-xl border border-border-gray bg-white text-navy text-sm font-semibold cursor-pointer hover:bg-bg-gray"
        >
          Reschedule
        </button>
        <button
          type="button"
          onClick={onJoinDetails}
          className="flex-[1.2] min-h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-2"
        >
          {isVideo ? (
            <Video className="w-4 h-4" strokeWidth={1.75} />
          ) : (
            <CalendarDays className="w-4 h-4" strokeWidth={1.75} />
          )}
          {isVideo ? 'Join video call' : 'View details'}
        </button>
      </div>
    </section>
  )
}
