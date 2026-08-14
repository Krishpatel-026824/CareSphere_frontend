import { CalendarDays, Clock, MapPin, Phone } from 'lucide-react'
import Button from '../Button'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'

export default function DoctorVisitPanel({
  visit,
  canAccept,
  canDecline,
  canComplete,
  onAccept,
  onDecline,
  onComplete,
  onMessage,
}) {
  if (!visit) return null

  return (
    <section className="bg-white rounded-2xl border border-border-gray shadow-sm p-4 sm:p-5 flex flex-col gap-4 h-full">
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-teal-light shrink-0">
          <img src={visit.patientPhoto} alt="" className="w-full h-full object-cover object-top" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-navy truncate">{visit.patientName}</h2>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                appointmentStatusStyles[visit.status] || appointmentStatusStyles.Upcoming
              }`}
            >
              {visit.status}
            </span>
          </div>
          <p className="text-sm text-body-gray mt-0.5">
            {visit.visitType} • {visit.clinic}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 rounded-xl bg-bg-gray p-3">
        <p className="text-sm text-navy inline-flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-teal" />
          {visit.dateLabel}
        </p>
        <p className="text-sm text-navy inline-flex items-center gap-2">
          <Clock className="w-4 h-4 text-teal" />
          {visit.timeLabel}
        </p>
        <p className="text-sm text-navy inline-flex items-center gap-2 col-span-2">
          <MapPin className="w-4 h-4 text-teal" />
          {visit.room} · {visit.location}
        </p>
        <p className="text-sm text-navy inline-flex items-center gap-2 col-span-2">
          <Phone className="w-4 h-4 text-teal" />
          {visit.phone}
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-navy">Visit note</h3>
        <p className="text-sm text-body-gray mt-1 leading-relaxed">{visit.prepNote}</p>
      </div>

      {visit.prepItems?.length ? (
        <ul className="flex flex-wrap gap-2">
          {visit.prepItems.map((item) => (
            <li key={item} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-teal-light text-teal">
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto flex flex-col gap-2">
        {canAccept ? (
          <Button onClick={() => onAccept?.(visit)}>Accept visit</Button>
        ) : null}
        {canComplete ? (
          <Button onClick={() => onComplete?.(visit)}>Mark completed</Button>
        ) : null}
        <Button variant="secondary" onClick={() => onMessage?.(visit)}>
          Message patient
        </Button>
        {canDecline ? (
          <button
            type="button"
            onClick={() => onDecline?.(visit)}
            className="min-h-11 rounded-xl border border-rose-200 bg-white text-rose-500 text-sm font-semibold cursor-pointer hover:bg-rose-50"
          >
            Decline visit
          </button>
        ) : null}
      </div>
    </section>
  )
}
