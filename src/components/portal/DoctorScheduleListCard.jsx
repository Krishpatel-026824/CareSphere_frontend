import { useRef } from 'react'
import { CalendarDays, ChevronRight, Clock } from 'lucide-react'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'

export default function DoctorScheduleListCard({ visit, selected, onSelect, onOpenMenu }) {
  const holdTimer = useRef(null)
  const didHold = useRef(false)

  function startHold(event) {
    didHold.current = false
    const point = { clientX: event.clientX, clientY: event.clientY }
    holdTimer.current = setTimeout(() => {
      didHold.current = true
      onOpenMenu?.(visit, point)
    }, 450)
  }

  function endHold() {
    clearTimeout(holdTimer.current)
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (!didHold.current) onSelect?.(visit)
      }}
      onContextMenu={(event) => {
        event.preventDefault()
        onOpenMenu?.(visit, event)
      }}
      onPointerDown={startHold}
      onPointerUp={endHold}
      onPointerLeave={endHold}
      onPointerCancel={endHold}
      className={`relative w-full shrink-0 text-left rounded-xl border px-2.5 py-2 flex items-center gap-2.5 cursor-pointer transition-all ${
        selected
          ? 'bg-[#E8F7F6] border-teal shadow-sm'
          : 'bg-white border-[#E6EBF1] hover:border-teal/30'
      }`}
    >
      {selected ? <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-teal" /> : null}
      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-[#EEF2F6]">
        <img src={visit.patientPhoto} alt="" className="w-full h-full object-cover object-top" />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-[13px] font-bold text-navy truncate">{visit.patientName}</h2>
        <p className="text-[11px] text-body-gray truncate leading-tight mt-0.5">
          {visit.visitType} • {visit.clinic}
        </p>
        <p className="text-[11px] text-body-gray mt-0.5 flex items-center gap-2.5 leading-tight">
          <span className="inline-flex items-center gap-1 min-w-0">
            <CalendarDays className="w-3 h-3 shrink-0" strokeWidth={1.75} />
            <span className="truncate">{visit.dateLabel}</span>
          </span>
          <span className="inline-flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" strokeWidth={1.75} />
            {visit.timeLabel}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span
          className={`text-[9px] font-semibold px-1.5 py-px rounded-full ${
            appointmentStatusStyles[visit.status] || appointmentStatusStyles.Upcoming
          }`}
        >
          {visit.status}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-body-gray" strokeWidth={1.75} />
      </div>
    </button>
  )
}
