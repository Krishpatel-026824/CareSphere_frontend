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
      <section className="bg-white rounded-2xl border border-border-gray shadow-sm p-5 flex flex-col items-start justify-center gap-3 h-full">
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
          className="min-h-10 px-4 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark"
        >
          Book appointment
        </button>
      </section>
    )
  }

  const isVideo = String(appointment.visitType || '').toLowerCase().includes('video')
  const prepItems = [...(appointment.prepItems || []), ...(visitSignals?.prepLabels || [])]

  return (
    <section className="bg-white rounded-2xl border border-border-gray shadow-sm px-5 py-4 flex flex-col gap-3 h-full justify-between">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-navy">Upcoming appointment</h2>
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
          <img
            src={appointment.doctorPhoto}
            alt={appointment.doctorName}
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[17px] font-bold text-navy leading-tight truncate">{appointment.doctorName}</p>
          <p className="text-[14px] text-body-gray truncate mt-0.5">{appointment.specialty} • {appointment.clinic}</p>
        </div>
      </div>

      <div className="text-[15px] text-[#1E293B] space-y-2">
        <p className="flex items-center gap-2.5 font-semibold">
          <CalendarDays className="w-[18px] h-[18px] text-[#0EA5A0]" strokeWidth={1.75} />
          {appointment.dateLabel} • {appointment.timeLabel} • {appointment.visitType}
        </p>
        <p className="flex items-center gap-2.5">
          <MapPin className="w-[18px] h-[18px] text-[#0EA5A0]" strokeWidth={1.75} />
          <span className="truncate">{appointment.address}, {appointment.location}</span>
        </p>
        {appointment.room ? (
          <p className="flex items-center gap-2.5">
            <Clock className="w-[18px] h-[18px] text-[#0EA5A0]" strokeWidth={1.75} />
            {appointment.room}
          </p>
        ) : null}
        {appointment.phone ? (
          <p className="flex items-center gap-2.5 font-semibold">
            <Phone className="w-[18px] h-[18px] text-[#0EA5A0]" strokeWidth={1.75} />
            {appointment.phone}
          </p>
        ) : null}
      </div>

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
          {isVideo ? <Video className="w-3.5 h-3.5" strokeWidth={1.75} /> : <CalendarDays className="w-3.5 h-3.5" strokeWidth={1.75} />}
          {isVideo ? 'Join video call' : 'View details'}
        </button>
      </div>
    </section>
  )
}
