import { useState } from 'react'
import { CalendarDays, Clock, DoorOpen, MapPin, Phone } from 'lucide-react'
import { getPatientAppointmentStatusLabel, getPatientAppointmentStatusStyle } from '../../data/mocks/appointmentActions'
import ProfilePhotoLightbox from './ProfilePhotoLightbox'

function doctorInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default function AppointmentDetailHero({ appointment, showPhoto = true }) {
  const [photoPreviewOpen, setPhotoPreviewOpen] = useState(false)
  const photo = appointment.doctorPhoto || appointment.clinicImage
  const clinic = appointment.clinicDetail || appointment.clinic
  const visitType = appointment.visitType || 'In-clinic'

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#F3FBFA] via-white to-[#EEF6F8] border border-teal/15 p-4 sm:p-5">
      <div className="flex gap-4 items-start">
        {showPhoto ? (
          <div className="relative shrink-0">
            <div
              className="w-[88px] h-[88px] sm:w-[100px] sm:h-[100px] rounded-2xl overflow-hidden ring-2 ring-white shadow-md bg-[#EEF2F6] cursor-pointer"
              onClick={() => photo && setPhotoPreviewOpen(true)}
            >
              {photo ? (
                <img src={photo} alt={appointment.doctorName} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl font-bold text-teal bg-teal-light">
                  {doctorInitials(appointment.doctorName)}
                </div>
              )}
            </div>
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-teal text-white text-[10px] sm:text-[11px] font-bold shadow-sm whitespace-nowrap">
              {visitType}
            </span>
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-navy leading-tight">{appointment.doctorName}</h3>
            {!showPhoto ? (
              <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal text-white whitespace-nowrap">
                {visitType}
              </span>
            ) : null}
            {appointment.status ? (
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getPatientAppointmentStatusStyle(appointment.status)}`}
              >
                {getPatientAppointmentStatusLabel(appointment.status)}
              </span>
            ) : null}
          </div>
          <p className="text-sm sm:text-[15px] text-body-gray mt-1 leading-snug">
            {appointment.specialty}
            {clinic ? ` · ${clinic}` : ''}
          </p>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <InfoItem icon={MapPin} text={appointment.fullAddress || appointment.address} className="sm:col-span-2" />
            <InfoItem icon={Phone} text={appointment.phone} />
            <InfoItem icon={DoorOpen} text={appointment.room} />
            <InfoItem icon={CalendarDays} text={appointment.dateLabel} />
            <InfoItem icon={Clock} text={appointment.timeLabel} />
          </div>
        </div>
      </div>

      {showPhoto ? (
        <ProfilePhotoLightbox
          open={photoPreviewOpen}
          src={photo}
          alt={appointment.doctorName}
          onClose={() => setPhotoPreviewOpen(false)}
        />
      ) : null}
    </div>
  )
}

function InfoItem({ icon: Icon, text, className = '' }) {
  if (!text) return null

  return (
    <div
      className={`flex items-start gap-2.5 rounded-xl bg-white/80 border border-white px-3 py-2.5 ${className}`}
    >
      <span className="w-8 h-8 rounded-lg bg-teal-light text-teal flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" strokeWidth={1.85} />
      </span>
      <p className="text-[14px] sm:text-[15px] font-medium text-navy leading-snug break-words pt-0.5">{text}</p>
    </div>
  )
}
