import { CalendarDays } from 'lucide-react'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'
import DoctorRatingInline from '../doctor/DoctorRatingInline'

export default function RescheduleDoctorCard({ doctor, current, onSelect }) {
  const hasBooking = Boolean(doctor.dateLabel && doctor.timeLabel)
  const slotLabel = hasBooking
    ? `${doctor.dateLabel} • ${doctor.timeLabel}`
    : [doctor.nextDate, doctor.nextTime].filter(Boolean).join(' • ') || 'Pick a slot'

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(doctor)}
        className={`w-full text-left rounded-xl border p-3 flex flex-col gap-2.5 cursor-pointer transition-colors duration-150 ${
          current
            ? 'border-teal bg-[#F7FBFA] shadow-[0_6px_16px_rgba(14,165,160,0.12)] hover:bg-[#F3FAF9]'
            : 'border-border-gray bg-white hover:border-teal hover:bg-[#F7FBFA] hover:shadow-[0_4px_12px_rgba(14,165,160,0.10)]'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 bg-teal-light">
            <img src={doctor.photo} alt="" className="w-full h-full object-cover object-top" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-navy truncate">{doctor.name}</p>
            <p className="text-[12px] text-body-gray truncate">
              {doctor.specialty} • {doctor.clinic}
            </p>
          </div>
          {current ? (
            <span className="text-[10px] font-semibold text-teal bg-teal-light px-2 py-0.5 rounded-full shrink-0">
              This visit
            </span>
          ) : (
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                appointmentStatusStyles[doctor.status] || 'text-body-gray bg-bg-gray'
              }`}
            >
              {doctor.status}
            </span>
          )}
        </div>

        <DoctorRatingInline rating={doctor.rating} reviewCount={doctor.reviewCount} />

        <div className="rounded-lg bg-bg-gray px-2.5 py-2 flex items-center justify-between gap-2">
          <p className="inline-flex items-center gap-1.5 text-[11px] text-body-gray min-w-0">
            <CalendarDays className="w-3.5 h-3.5 text-teal shrink-0" strokeWidth={1.75} />
            <span className="truncate font-semibold text-navy">{slotLabel}</span>
          </p>
          <p className="text-[11px] text-body-gray shrink-0">{doctor.experience}+ yrs</p>
        </div>

        <p className="text-sm font-bold text-teal">₹{doctor.fee}</p>
      </button>
    </li>
  )
}
