import { ArrowLeft, CalendarDays, Clock, MapPin, Phone } from 'lucide-react'
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
  onBack,
}) {
  if (!visit) return null

  const details = [
    { icon: CalendarDays, label: 'Date', value: visit.dateLabel },
    { icon: Clock, label: 'Time', value: visit.timeLabel },
    { icon: MapPin, label: 'Room', value: `${visit.room} · ${visit.location}` },
    { icon: Phone, label: 'Phone', value: visit.phone },
  ]

  return (
    <section className="bg-white rounded-2xl border border-border-gray shadow-sm p-4 sm:p-5 flex flex-col gap-4 h-full min-h-0">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="w-fit inline-flex items-center gap-2 min-h-9 px-3 rounded-xl border border-border-gray bg-white text-sm font-semibold text-navy cursor-pointer hover:border-teal hover:text-teal shrink-0"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
          Back
        </button>
      ) : null}
      <div className="flex items-start gap-3 shrink-0">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 shrink-0">
        {details.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="rounded-xl bg-[#F4F7FA] p-3 flex items-start gap-2.5 min-w-0">
              <Icon className="w-4 h-4 text-teal shrink-0 mt-0.5" strokeWidth={1.75} />
              <div className="min-w-0">
                <p className="text-[11px] text-body-gray">{item.label}</p>
                <p className="text-sm font-bold text-navy leading-snug">{item.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex-1 min-h-0 rounded-xl bg-[#F4F7FA] p-4 flex flex-col gap-3 overflow-y-auto">
        <div>
          <h3 className="text-sm font-semibold text-navy">Visit note</h3>
          <p className="text-sm text-body-gray mt-1 leading-relaxed">{visit.prepNote}</p>
        </div>
        {visit.prepItems?.length ? (
          <ul className="flex flex-wrap gap-2">
            {visit.prepItems.map((item) => (
              <li key={item} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white text-teal">
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="shrink-0 flex flex-col gap-2">
        {canAccept ? <Button onClick={() => onAccept?.(visit)}>Accept visit</Button> : null}
        {canComplete ? <Button onClick={() => onComplete?.(visit)}>Mark completed</Button> : null}
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
