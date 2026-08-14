import { CalendarDays, Clock, DoorOpen, MapPin, Phone } from 'lucide-react'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'

function doctorInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default function AppointmentDetailHero({ appointment }) {
  const photo = appointment.doctorPhoto || appointment.clinicImage
  const clinic = appointment.clinicDetail || appointment.clinic

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#F3FBFA] via-white to-[#EEF6F8] border border-teal/15 p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
        <div className="relative shrink-0">
          <div className="w-[132px] h-[132px] sm:w-[148px] sm:h-[148px] rounded-2xl overflow-hidden ring-4 ring-white shadow-[0_10px_28px_rgba(14,165,160,0.18)] bg-[#EEF2F6]">
            {photo ? (
              <img
                src={photo}
                alt={appointment.doctorName}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-teal bg-teal-light">
                {doctorInitials(appointment.doctorName)}
              </div>
            )}
          </div>
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-teal text-white text-[10px] font-semibold shadow-sm whitespace-nowrap">
            {appointment.visitType || 'In-clinic'}
          </span>
        </div>

        <div className="min-w-0 flex-1 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl sm:text-[22px] font-bold text-navy tracking-tight leading-tight">
              {appointment.doctorName}
            </h3>
            {appointment.status ? (
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                  appointmentStatusStyles[appointment.status] || appointmentStatusStyles.Upcoming
                }`}
              >
                {appointment.status}
              </span>
            ) : null}
          </div>
          <p className="text-sm text-body-gray mt-1">
            {appointment.specialty}
            {clinic ? ` • ${clinic}` : ''}
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <MetaTile
              icon={MapPin}
              text={appointment.fullAddress || appointment.address}
              className="sm:col-span-2"
            />
            <MetaTile icon={Phone} text={appointment.phone} />
            <MetaTile icon={DoorOpen} text={appointment.room} />
            <MetaTile icon={CalendarDays} text={appointment.dateLabel} />
            <MetaTile icon={Clock} text={appointment.timeLabel} />
          </div>
        </div>
      </div>
    </div>
  )
}

function MetaTile({ icon: Icon, text, className = '' }) {
  if (!text) return null

  return (
    <div className={`flex items-start gap-2.5 rounded-xl bg-white/80 border border-white px-3 py-2.5 ${className}`}>
      <span className="w-8 h-8 rounded-lg bg-teal-light text-teal flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" strokeWidth={1.75} />
      </span>
      <p className="text-[13px] text-navy leading-snug pt-1 break-words">{text}</p>
    </div>
  )
}
