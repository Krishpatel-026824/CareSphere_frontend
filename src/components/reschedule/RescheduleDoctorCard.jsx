import { CalendarDays, ChevronRight, Stethoscope } from 'lucide-react'
import DoctorRatingInline from '../doctor/DoctorRatingInline'

export default function RescheduleDoctorCard({ doctor, current, onSelect, className = '' }) {
  return (
    <li className={`h-full min-h-0 ${className}`}>
      <button
        type="button"
        onClick={() => onSelect(doctor)}
        className={`w-full h-full text-left rounded-2xl border bg-white p-5 sm:p-6 flex flex-col gap-4 cursor-pointer transition-all ${
          current
            ? 'border-teal shadow-[0_10px_28px_rgba(14,165,160,0.12)]'
            : 'border-border-gray hover:border-teal/40 hover:shadow-[0_8px_24px_rgba(7,26,47,0.06)]'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden shrink-0 ring-2 ring-violet-200/80 bg-violet-100">
            <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover" />
          </div>
          {current ? (
            <span className="text-[11px] font-semibold text-teal bg-teal-light px-2.5 py-1 rounded-full">
              This visit
            </span>
          ) : (
            <span className="text-[11px] font-semibold text-body-gray bg-bg-gray px-2.5 py-1 rounded-full">
              {doctor.status}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <p className="text-lg font-bold text-navy truncate">{doctor.name}</p>
          <p className="text-sm text-body-gray mt-1 truncate">
            {doctor.specialty} • {doctor.clinic}
          </p>
          <DoctorRatingInline rating={doctor.rating} reviewCount={doctor.reviewCount} className="mt-2" />
        </div>

        <div className="rounded-xl bg-bg-gray p-3.5 flex flex-col gap-2.5">
          <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-body-gray">
            <CalendarDays className="w-3.5 h-3.5 text-teal" strokeWidth={1.75} />
            Booked slot
          </p>
          <p className="text-sm font-semibold text-navy">
            {doctor.dateLabel} • {doctor.timeLabel}
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-body-gray">
            <Stethoscope className="w-3.5 h-3.5 text-teal" strokeWidth={1.75} />
            {doctor.experience}+ years • {doctor.visitType}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <p className="text-base font-bold text-teal">₹{doctor.fee}</p>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy">
            Choose new slot
            <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
          </span>
        </div>
      </button>
    </li>
  )
}
