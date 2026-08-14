import { CalendarDays, Clock, MapPin, Phone, Video } from 'lucide-react'

export default function DoctorConsultReadyCard({ visit, joinLabel, onJoin }) {
  if (!visit) return null

  const details = [
    { icon: CalendarDays, label: 'Date', value: visit.dateLabel },
    { icon: Clock, label: 'Time', value: visit.timeLabel },
    { icon: MapPin, label: 'Room', value: visit.room },
    { icon: Phone, label: 'Phone', value: visit.phone },
  ]

  return (
    <section className="bg-white rounded-2xl border border-border-gray shadow-[0_8px_24px_rgba(15,23,42,0.06)] p-5 sm:p-6 flex flex-col gap-4 h-full min-h-0">
      <div className="flex items-center gap-3.5 shrink-0">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 bg-teal-light">
          <img src={visit.patientPhoto} alt="" className="w-full h-full object-cover object-top" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-navy truncate">{visit.patientName}</h2>
          <p className="text-sm text-body-gray mt-0.5 truncate">
            {visit.visitType} · {visit.clinic}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 shrink-0">
        {details.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="rounded-xl bg-[#F4F7FA] p-3 flex items-start gap-2.5 min-w-0">
              <Icon className="w-4 h-4 text-teal shrink-0 mt-0.5" strokeWidth={1.75} />
              <div className="min-w-0">
                <p className="text-[11px] text-body-gray">{item.label}</p>
                <p className="text-sm font-bold text-navy truncate">{item.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-3">
        {visit.prepNote ? (
          <div className="rounded-xl bg-[#E7F6F5] px-3.5 py-3">
            <p className="text-xs font-semibold text-teal">Visit reason</p>
            <p className="text-sm text-navy mt-1 leading-relaxed">{visit.prepNote}</p>
          </div>
        ) : null}

        {visit.prepItems?.length ? (
          <ul className="flex flex-wrap gap-2">
            {visit.prepItems.map((item) => (
              <li key={item} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-teal-light text-teal">
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onJoin}
        className="shrink-0 min-h-12 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-2"
      >
        <Video className="w-5 h-5" strokeWidth={1.8} />
        {joinLabel}
      </button>
    </section>
  )
}
