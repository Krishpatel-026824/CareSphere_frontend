import { CalendarDays, Check, Clock, MapPin, Phone, Video } from 'lucide-react'
import Button from '../Button'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 min-w-0">
      <span className="w-9 h-9 rounded-xl bg-[#E7F6F5] text-teal flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 pt-0.5">
        <p className="text-[11px] text-body-gray">{label}</p>
        <p className="text-sm font-bold text-navy leading-snug">{value}</p>
      </div>
    </div>
  )
}

export default function DoctorConsultReadyCard({
  visit,
  joinLabel,
  reasonLabel,
  prepLabel,
  bringLabel,
  detailsTitle,
  onJoin,
}) {
  if (!visit) return null

  const details = [
    { icon: CalendarDays, label: 'Date', value: visit.dateLabel },
    { icon: Clock, label: 'Time', value: visit.timeLabel },
    { icon: MapPin, label: 'Room', value: visit.room },
    { icon: Phone, label: 'Phone', value: visit.phone },
  ]

  return (
    <section className="bg-white rounded-[28px] border border-border-gray shadow-[0_8px_24px_rgba(15,23,42,0.06)] p-5 sm:p-6 flex flex-col gap-4 h-full min-h-0">
      <div className="flex items-center gap-3.5 shrink-0">
        <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-teal-light">
          <img src={visit.patientPhoto} alt="" className="w-full h-full object-cover object-top" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-lg font-bold text-navy truncate">{visit.patientName}</h2>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                appointmentStatusStyles[visit.status] || appointmentStatusStyles.Upcoming
              }`}
            >
              {visit.status}
            </span>
          </div>
          <p className="text-sm text-body-gray mt-0.5 truncate">
            {visit.visitType} · {visit.clinic}
          </p>
        </div>
      </div>

      {visit.visitReason ? (
        <div className="rounded-2xl bg-[#E7F6F5] px-4 py-3 shrink-0">
          <p className="text-xs font-semibold text-teal">{reasonLabel}</p>
          <p className="text-sm font-semibold text-navy mt-1 leading-relaxed">{visit.visitReason}</p>
        </div>
      ) : null}

      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold text-body-gray uppercase tracking-wide mb-3">{detailsTitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {details.map((item) => (
              <DetailRow key={item.label} {...item} />
            ))}
          </div>
        </div>

        {visit.prepNote ? (
          <div className="rounded-2xl bg-[#F4F7FA] px-4 py-3">
            <p className="text-xs font-semibold text-body-gray">{prepLabel}</p>
            <p className="text-sm text-navy mt-1 leading-relaxed">{visit.prepNote}</p>
          </div>
        ) : null}

        {visit.prepItems?.length ? (
          <div>
            <p className="text-xs font-semibold text-body-gray uppercase tracking-wide mb-2">{bringLabel}</p>
            <ul className="flex flex-col gap-1.5">
              {visit.prepItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-navy">
                  <span className="w-5 h-5 rounded-full bg-[#E7F6F5] text-teal inline-flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" strokeWidth={2.4} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <Button onClick={onJoin} className="shrink-0">
        <Video className="w-5 h-5" strokeWidth={1.8} />
        {joinLabel}
      </Button>
    </section>
  )
}
