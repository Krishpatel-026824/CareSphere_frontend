import { ArrowLeft, Building2, CalendarDays, Clock, MapPin, Phone } from 'lucide-react'
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
    { icon: MapPin, label: 'Room', value: visit.room },
    { icon: Phone, label: 'Phone', value: visit.phone },
    { icon: Building2, label: 'Clinic', value: visit.clinic },
    { icon: MapPin, label: 'City', value: visit.location },
  ]

  return (
    <section className="bg-white rounded-2xl border border-[#E6EBF1] shadow-sm p-4 sm:p-5 flex flex-col gap-3">
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

      <div className="flex items-center gap-3 shrink-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-teal-light shrink-0">
          <img src={visit.patientPhoto} alt="" className="w-full h-full object-cover object-top" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-navy truncate">{visit.patientName}</h2>
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${
                appointmentStatusStyles[visit.status] || appointmentStatusStyles.Upcoming
              }`}
            >
              {visit.status}
            </span>
          </div>
          <p className="text-sm text-body-gray mt-0.5 truncate">
            {visit.visitType} • {visit.clinic}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 shrink-0">
        {details.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="rounded-xl bg-[#F3F4F6] px-3 py-2 flex items-start gap-2 min-w-0">
              <Icon className="w-4 h-4 text-teal shrink-0 mt-0.5" strokeWidth={1.75} />
              <div className="min-w-0">
                <p className="text-[11px] text-body-gray">{item.label}</p>
                <p className="text-xs sm:text-sm font-bold text-navy leading-snug">{item.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 shrink-0">
        <div className="rounded-xl bg-[#E8F7F6] px-3.5 py-3">
          <h3 className="text-xs font-bold text-teal">Visit note</h3>
          <p className="text-sm text-navy mt-1 leading-relaxed">{visit.prepNote}</p>
        </div>

        {visit.prepItems?.length ? (
          <div className="rounded-xl bg-[#F3F4F6] px-3.5 py-3">
            <p className="text-[11px] font-semibold text-body-gray uppercase tracking-wide">Bring today</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {visit.prepItems.map((item) => (
                <li
                  key={item}
                  className="rounded-xl bg-white border border-[#E6EBF1] px-3 py-2 text-sm font-semibold text-navy leading-snug"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {(visit.fullAddress || visit.landmark) ? (
        <div className="rounded-xl bg-[#F3F4F6] px-3.5 py-3 shrink-0">
          {visit.fullAddress ? (
            <p className="text-sm font-semibold text-navy leading-snug">{visit.fullAddress}</p>
          ) : null}
          {visit.landmark ? (
            <p className="text-xs text-body-gray mt-1">{visit.landmark}</p>
          ) : null}
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
