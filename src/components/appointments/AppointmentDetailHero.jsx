import { CalendarDays, Clock, DoorOpen, MapPin, Phone } from 'lucide-react'

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
    <div className="grid grid-cols-1 sm:grid-cols-[168px_minmax(0,1fr)] gap-5 lg:gap-6 items-start">
      <div className="w-[148px] h-[148px] sm:w-[168px] sm:h-[168px] rounded-xl overflow-hidden border border-[#D7DEE7] bg-[#EEF2F6] shrink-0">
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

      <div className="min-w-0 flex flex-col gap-3.5 pt-0.5">
        <div>
          <h3 className="text-xl font-bold text-navy tracking-tight leading-tight">{appointment.doctorName}</h3>
          <p className="text-sm text-body-gray mt-1">
            {appointment.specialty}
            {clinic ? ` • ${clinic}` : ''}
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <InfoRow icon={MapPin} text={appointment.fullAddress || appointment.address} />
          {appointment.phone ? <InfoRow icon={Phone} text={appointment.phone} /> : null}
          <div className="flex flex-wrap items-start gap-x-6 gap-y-2.5">
            <InfoRow icon={CalendarDays} text={appointment.dateLabel} />
            <InfoRow icon={Clock} text={appointment.timeLabel} />
          </div>
          {appointment.room ? <InfoRow icon={DoorOpen} text={appointment.room} /> : null}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ icon: Icon, text }) {
  if (!text) return null

  return (
    <p className="text-sm text-body-gray flex items-start gap-2.5 min-w-0 leading-snug">
      <Icon className="w-4 h-4 text-teal shrink-0 mt-0.5" strokeWidth={1.75} />
      <span className="break-words">{text}</span>
    </p>
  )
}
