import {
  Building2,
  CalendarDays,
  CircleCheck,
  ClipboardList,
  Clock,
  DoorOpen,
  Heart,
  Info,
  MapPin,
  Phone,
  Stethoscope,
  Video,
} from 'lucide-react'
import { generateDoctorNextVisitCard } from '../../data/generators/doctorNextVisitGenerator'

function IconTile({ children }) {
  return (
    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#E7F6F5] text-teal flex items-center justify-center shrink-0">
      {children}
    </span>
  )
}

export default function DoctorNextVisitPanel({ visit, onOpen, onAccept }) {
  if (!visit) {
    return (
      <section className="bg-white rounded-2xl border border-border-gray shadow-[0_8px_24px_rgba(15,23,42,0.06)] p-5 sm:p-6 flex flex-col items-start justify-center gap-3">
        <IconTile>
          <CalendarDays className="w-5 h-5" strokeWidth={1.75} />
        </IconTile>
        <h2 className="text-lg font-bold text-navy">No upcoming patients</h2>
        <p className="text-sm text-body-gray max-w-md">
          New bookings from patients will show up in your clinic queue.
        </p>
      </section>
    )
  }

  const card = generateDoctorNextVisitCard(visit)
  const canAccept = card.status === 'Upcoming'
  const statusTone =
    card.status === 'Confirmed'
      ? 'bg-emerald-50 text-emerald-700'
      : 'bg-[#E7F6F5] text-teal'

  const details = [
    { icon: CalendarDays, label: 'Date', value: card.dateLabel, hint: card.weekday },
    { icon: Clock, label: 'Time', value: card.timeLabel, hint: card.timeZone },
    { icon: Stethoscope, label: 'Type', value: card.visitType, hint: card.typeHint },
    { icon: DoorOpen, label: 'Room', value: card.room, hint: card.roomHint },
  ]

  return (
    <section className="bg-white rounded-2xl border border-border-gray shadow-[0_8px_24px_rgba(15,23,42,0.06)] p-4 sm:p-5 flex flex-col gap-3 sm:gap-4">
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <IconTile>
            <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.75} />
          </IconTile>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-navy leading-tight">Next patient</h2>
            <p className="text-xs sm:text-sm text-body-gray mt-0.5">Your upcoming appointment</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold shrink-0 ${statusTone}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {card.status}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 bg-teal-light">
          <img src={card.patientPhoto} alt={card.patientName} className="w-full h-full object-cover object-top" />
        </div>
        <div className="min-w-0">
          <p className="text-base sm:text-lg lg:text-xl font-bold text-navy leading-tight">{card.patientName}</p>
          <p className="text-xs sm:text-sm text-body-gray mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              {card.isVideo ? <Video className="w-3.5 h-3.5 text-teal" /> : <Building2 className="w-3.5 h-3.5 text-teal" />}
              {card.visitType}
            </span>
            <span className="w-1 h-1 rounded-full bg-body-gray/50" />
            <span className="inline-flex items-center gap-1.5 min-w-0">
              <Heart className="w-3.5 h-3.5 text-teal shrink-0" />
              <span>{card.clinic}</span>
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4 gap-2">
        {details.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="rounded-xl bg-[#F4F7FA] p-2.5 sm:p-3 flex items-start gap-2 min-w-0">
              <IconTile>
                <Icon className="w-4 h-4" strokeWidth={1.75} />
              </IconTile>
              <div className="min-w-0">
                <p className="text-[11px] text-body-gray">{item.label}</p>
                <p className="text-xs sm:text-sm font-bold text-navy mt-0.5 leading-snug">{item.value}</p>
                <p className="text-[11px] text-body-gray mt-0.5 leading-snug">{item.hint}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl bg-[#E7F6F5] px-3 py-2.5 sm:px-3.5 sm:py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <div className="inline-flex items-center gap-2 shrink-0">
          <IconTile>
            <ClipboardList className="w-4 h-4" strokeWidth={1.75} />
          </IconTile>
          <p className="text-sm font-bold text-teal">Visit reason</p>
        </div>
        <p className="text-sm text-navy leading-relaxed min-w-0">{card.prepNote}</p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 text-sm text-body-gray pt-1 border-t border-dashed border-border-gray">
        <span className="inline-flex items-center gap-2 min-w-0">
          <MapPin className="w-4 h-4 text-teal shrink-0" />
          <span>{card.cityLine}</span>
        </span>
        <span className="hidden sm:block w-px h-4 bg-border-gray shrink-0" />
        <span className="inline-flex items-center gap-2">
          <Phone className="w-4 h-4 text-teal shrink-0" />
          {card.phone}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        {canAccept ? (
          <button
            type="button"
            onClick={() => onAccept?.(visit)}
            className="flex-1 min-h-12 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-2"
          >
            <CircleCheck className="w-5 h-5" strokeWidth={1.9} />
            Accept Appointment
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => onOpen?.(visit)}
          className="flex-1 min-h-12 rounded-xl border border-teal bg-white text-teal text-sm font-semibold cursor-pointer hover:bg-teal-light inline-flex items-center justify-center gap-2"
        >
          <Info className="w-5 h-5" strokeWidth={1.9} />
          View Details
        </button>
      </div>
    </section>
  )
}
