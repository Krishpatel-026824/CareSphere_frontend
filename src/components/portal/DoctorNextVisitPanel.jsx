import { CalendarPlus, Check, MapPin, Phone, Video } from 'lucide-react'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'

export default function DoctorNextVisitPanel({ visit, onOpen, onAccept }) {
  if (!visit) {
    return (
      <section className="bg-white rounded-2xl border border-border-gray shadow-sm p-5 sm:p-6 flex flex-col items-start justify-center gap-3 h-full">
        <span className="w-12 h-12 rounded-2xl bg-teal-light text-teal flex items-center justify-center">
          <CalendarPlus className="w-6 h-6" strokeWidth={1.75} />
        </span>
        <h2 className="text-base font-semibold text-navy">No upcoming patients</h2>
        <p className="text-sm text-body-gray max-w-md">
          New bookings from patients will show up in your clinic queue.
        </p>
      </section>
    )
  }

  const isVideo = String(visit.visitType || '').toLowerCase().includes('video')

  return (
    <section className="bg-white rounded-2xl border border-border-gray shadow-sm p-4 sm:p-5 flex flex-col gap-3.5 h-full">
      <div className="flex items-start justify-between gap-3 shrink-0">
        <h2 className="text-sm sm:text-base font-semibold text-navy">Next patient</h2>
        <span
          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${
            appointmentStatusStyles[visit.status] || appointmentStatusStyles.Upcoming
          }`}
        >
          {visit.status}
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-teal-light shadow-sm shrink-0 bg-teal-light">
          <img src={visit.patientPhoto} alt={visit.patientName} className="w-full h-full object-cover object-top" />
        </div>
        <div className="min-w-0">
          <p className="text-base sm:text-lg font-bold text-navy leading-tight truncate">{visit.patientName}</p>
          <p className="text-sm text-body-gray truncate mt-0.5">
            {visit.visitType} • {visit.clinic}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 rounded-xl bg-bg-gray p-3 shrink-0">
        {[
          { label: 'Date', value: visit.dateLabel },
          { label: 'Time', value: visit.timeLabel },
          { label: 'Type', value: visit.visitType },
          { label: 'Room', value: visit.room },
        ].map((item) => (
          <div key={item.label} className="min-w-0">
            <p className="text-[11px] font-medium text-body-gray">{item.label}</p>
            <p className="text-sm font-semibold text-navy mt-0.5 truncate">{item.value}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-body-gray leading-relaxed">{visit.prepNote}</p>

      <div className="flex flex-wrap gap-2 mt-auto">
        <span className="inline-flex items-center gap-1 text-xs text-body-gray">
          {isVideo ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
          {isVideo ? 'Video consult' : visit.location}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-body-gray">
          <Phone className="w-3.5 h-3.5" />
          {visit.phone}
        </span>
      </div>

      <div className="flex gap-2.5">
        {visit.status === 'Upcoming' ? (
          <button
            type="button"
            onClick={() => onAccept?.(visit)}
            className="flex-1 min-h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" strokeWidth={2} />
            Accept
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => onOpen?.(visit)}
          className="flex-1 min-h-11 rounded-xl border border-border-gray bg-white text-navy text-sm font-semibold cursor-pointer hover:bg-bg-gray"
        >
          View details
        </button>
      </div>
    </section>
  )
}
