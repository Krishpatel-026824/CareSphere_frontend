import { CalendarDays, CalendarPlus, Clock, MapPin, Phone, Video } from 'lucide-react'
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
      <section className="bg-white rounded-2xl border border-border-gray shadow-sm p-5 sm:p-6 flex flex-col h-full">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="font-display text-lg font-bold text-navy">Upcoming appointment</h2>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
            None yet
          </span>
        </div>

        <div className="flex-1 flex flex-col items-start justify-center gap-3 py-2">
          <span className="w-12 h-12 rounded-2xl bg-teal-light text-teal flex items-center justify-center">
            <CalendarPlus className="w-6 h-6" strokeWidth={1.75} />
          </span>
          <h3 className="font-display text-base font-bold text-navy">No booked visits</h3>
          <p className="text-sm text-body-gray max-w-md leading-relaxed">
            When you book a doctor appointment, your next visit will appear here with date, time, and clinic details.
          </p>
          <button
            type="button"
            onClick={onBook}
            className="mt-1 min-h-11 px-4 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center gap-2"
          >
            <CalendarPlus className="w-4 h-4" strokeWidth={1.75} />
            Book appointment
          </button>
        </div>
      </section>
    )
  }

  const isVideo = String(appointment.visitType || '').toLowerCase().includes('video')
  const photo = appointment.doctorPhoto || appointment.photo
  const dateLabel = appointment.dateLabel || appointment.date || ''
  const timeLabel = appointment.timeLabel || appointment.time || ''
  const clinic = appointment.clinic || appointment.hospital || ''
  const address = appointment.address || clinic
  const location = appointment.location || ''
  const placeLine = [address, location].filter(Boolean).join(', ')
  const prepLabels = visitSignals?.prepLabels || []

  return (
    <section className="bg-white rounded-2xl border border-border-gray shadow-sm px-5 py-4 flex flex-col gap-3.5 h-full justify-between">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-bold text-navy">Upcoming appointment</h2>
        <span
          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${
            appointmentStatusStyles[appointment.status] || appointmentStatusStyles.Upcoming
          }`}
        >
          {appointment.status}
        </span>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-xl overflow-hidden ring-2 ring-teal-light shadow-sm shrink-0 bg-teal-light">
          {photo ? (
            <img src={photo} alt={appointment.doctorName} className="w-full h-full object-cover object-top" />
          ) : null}
        </div>
        <div className="min-w-0">
          <p className="font-display text-[17px] font-bold text-navy leading-tight truncate">
            {appointment.doctorName}
          </p>
          <p className="text-[14px] text-body-gray truncate mt-0.5">
            {appointment.specialty}
            {clinic ? ` • ${clinic}` : ''}
          </p>
        </div>
      </div>

      <div className="text-[15px] text-navy space-y-2">
        <p className="flex items-center gap-2.5 font-semibold">
          <CalendarDays className="w-[18px] h-[18px] text-teal shrink-0" strokeWidth={1.75} />
          <span className="min-w-0 truncate">
            {[dateLabel, timeLabel, appointment.visitType].filter(Boolean).join(' • ')}
          </span>
        </p>
        {placeLine ? (
          <p className="flex items-start gap-2.5">
            <MapPin className="w-[18px] h-[18px] text-teal shrink-0 mt-0.5" strokeWidth={1.75} />
            <span className="min-w-0 leading-snug">{placeLine}</span>
          </p>
        ) : null}
        {appointment.room ? (
          <p className="flex items-center gap-2.5">
            <Clock className="w-[18px] h-[18px] text-teal shrink-0" strokeWidth={1.75} />
            {appointment.room}
          </p>
        ) : null}
        {appointment.phone ? (
          <p className="flex items-center gap-2.5 font-semibold">
            <Phone className="w-[18px] h-[18px] text-teal shrink-0" strokeWidth={1.75} />
            {appointment.phone}
          </p>
        ) : null}
      </div>

      {prepLabels.length ? (
        <p className="text-xs text-body-gray">Prep: {prepLabels.slice(0, 2).join(' · ')}</p>
      ) : null}

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onReschedule}
          className="flex-1 h-11 rounded-xl border border-border-gray bg-white text-navy text-sm font-semibold cursor-pointer hover:bg-bg-gray"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onJoinDetails}
          className="flex-[1.2] h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-2"
        >
          {isVideo ? (
            <Video className="w-3.5 h-3.5" strokeWidth={1.75} />
          ) : (
            <CalendarDays className="w-3.5 h-3.5" strokeWidth={1.75} />
          )}
          {isVideo ? 'Join video call' : 'View details'}
        </button>
      </div>
    </section>
  )
}
