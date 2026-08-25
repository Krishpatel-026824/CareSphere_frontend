import { useState } from 'react'
import { CalendarDays, Clock, DoorOpen, MapPin, Phone, X } from 'lucide-react'
import { getPatientAppointmentStatusLabel, getPatientAppointmentStatusStyle } from '../../data/mocks/appointmentActions'

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
  const [showPhoto, setShowPhoto] = useState(false)
  const photo = appointment.doctorPhoto || appointment.clinicImage
  const clinic = appointment.clinicDetail || appointment.clinic

  return (
    <div className="rounded-xl bg-gradient-to-br from-[#F3FBFA] via-white to-[#EEF6F8] border border-teal/15 p-3 sm:p-4">
      <div className="flex gap-3 sm:gap-4 items-start">
        <div className="relative shrink-0">
          <div
            className="w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] rounded-xl overflow-hidden ring-2 ring-white shadow-md bg-[#EEF2F6] cursor-pointer"
            onClick={() => photo && setShowPhoto(true)}
          >
            {photo ? (
              <img src={photo} alt={appointment.doctorName} className="w-full h-full object-cover object-top" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lg font-bold text-teal bg-teal-light">
                {doctorInitials(appointment.doctorName)}
              </div>
            )}
          </div>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-px rounded-full bg-teal text-white text-[9px] font-semibold shadow-sm whitespace-nowrap">
            {appointment.visitType || 'In-clinic'}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-navy leading-tight">{appointment.doctorName}</h3>
            {appointment.status ? (
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getPatientAppointmentStatusStyle(appointment.status)}`}>
                {getPatientAppointmentStatusLabel(appointment.status)}
              </span>
            ) : null}
          </div>
          <p className="text-xs text-body-gray mt-0.5">
            {appointment.specialty}{clinic ? ` • ${clinic}` : ''}
          </p>

          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <InfoItem icon={MapPin} text={appointment.fullAddress || appointment.address} className="col-span-2" />
            <InfoItem icon={Phone} text={appointment.phone} />
            <InfoItem icon={DoorOpen} text={appointment.room} />
            <InfoItem icon={CalendarDays} text={appointment.dateLabel} />
            <InfoItem icon={Clock} text={appointment.timeLabel} />
          </div>
        </div>
      </div>

      {showPhoto && (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center" onClick={() => setShowPhoto(false)}>
          <button
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/40"
            onClick={() => setShowPhoto(false)}
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <img src={photo} alt={appointment.doctorName} className="w-[380px] h-[380px] sm:w-[450px] sm:h-[450px] rounded-2xl shadow-2xl object-cover" />
        </div>
      )}
    </div>
  )
}

function InfoItem({ icon: Icon, text, className = '' }) {
  if (!text) return null
  return (
    <div className={`flex items-center gap-1.5 rounded-lg bg-white/70 border border-white/80 px-2 py-1.5 ${className}`}>
      <span className="w-6 h-6 rounded-md bg-teal-light text-teal flex items-center justify-center shrink-0">
        <Icon className="w-3 h-3" strokeWidth={1.75} />
      </span>
      <p className="text-[11px] sm:text-xs text-navy leading-tight break-words">{text}</p>
    </div>
  )
}
