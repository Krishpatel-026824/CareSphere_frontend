import { Clock3, DoorOpen, Info } from 'lucide-react'
import { generateDoctorNextVisitCard } from '../../data/generators/doctorNextVisitGenerator'
import {
  appointmentStatusLabels,
  appointmentStatusStyles,
} from '../../data/mocks/appointmentActions'

export default function DoctorNextVisitPanel({ visit, onOpen }) {
  if (!visit) {
    return (
      <section className="rounded-2xl bg-white border border-[#E6EBF1] shadow-sm p-4 sm:p-5 flex flex-col gap-2">
        <span className="w-10 h-10 rounded-xl bg-teal-light text-teal flex items-center justify-center">
          <Clock3 className="w-5 h-5" strokeWidth={1.75} />
        </span>
        <h2 className="font-display text-xl font-bold text-navy">No confirmed next visit</h2>
        <p className="text-sm text-body-gray max-w-md">
          Accept an upcoming booking above, or check Schedule for your day.
        </p>
      </section>
    )
  }

  const card = generateDoctorNextVisitCard(visit)
  const statusStyle =
    appointmentStatusStyles[card.status] || appointmentStatusStyles.Confirmed
  const statusLabel = appointmentStatusLabels[card.status] || card.status

  return (
    <section className="rounded-2xl bg-white border border-[#E6EBF1] shadow-sm overflow-hidden flex flex-col">
      <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-body-gray">
            Confirmed next
          </p>
          <h2 className="text-lg sm:text-xl font-bold text-navy tracking-tight mt-1 leading-none">
            Ready to see
          </h2>
        </div>
        <span className={`inline-flex text-xs font-semibold px-3 py-1 rounded-full ${statusStyle}`}>
          {statusLabel}
        </span>
      </div>

      <div className="px-4 sm:px-5 py-4 flex flex-col gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-teal-light ring-2 ring-[#E8F7F6] shrink-0">
            <img
              src={card.patientPhoto}
              alt=""
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-xl sm:text-[22px] font-bold text-navy truncate leading-tight">
              {card.patientName}
            </p>
            <p className="text-sm text-body-gray mt-1 truncate">
              {card.timeLabel} · {card.dateLabel}
            </p>
          </div>
          <div className="shrink-0 text-right hidden sm:block">
            <p className="font-display text-2xl font-bold text-navy leading-none tabular-nums">
              {card.timeLabel}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-navy">
          <span className="inline-flex items-center gap-1.5 min-w-0">
            <DoorOpen className="w-4 h-4 text-teal shrink-0" strokeWidth={1.85} />
            <span className="font-semibold truncate">{card.room || '—'}</span>
          </span>
          {card.visitType ? (
            <span className="text-body-gray font-medium truncate">{card.visitType}</span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => onOpen?.(visit)}
          className="w-full min-h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-2 transition-colors"
        >
          <Info className="w-4 h-4" strokeWidth={1.9} />
          Open visit
        </button>
      </div>
    </section>
  )
}
