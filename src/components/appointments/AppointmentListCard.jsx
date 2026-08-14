import { useRef } from 'react'
import { CalendarDays, ChevronRight, Clock } from 'lucide-react'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'

export default function AppointmentListCard({ appointment, selected, onSelect, onOpenMenu }) {
  const holdTimer = useRef(null)
  const didHold = useRef(false)

  function startHold(event) {
    didHold.current = false
    const point = { clientX: event.clientX, clientY: event.clientY }
    holdTimer.current = setTimeout(() => {
      didHold.current = true
      onOpenMenu?.(appointment, point)
    }, 450)
  }

  function endHold() {
    clearTimeout(holdTimer.current)
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (!didHold.current) onSelect?.(appointment)
      }}
      onContextMenu={(event) => {
        event.preventDefault()
        onOpenMenu?.(appointment, event)
      }}
      onPointerDown={startHold}
      onPointerUp={endHold}
      onPointerLeave={endHold}
      onPointerCancel={endHold}
      className={`relative w-full text-left rounded-xl border p-2.5 pl-3.5 flex items-center gap-2.5 cursor-pointer transition-all overflow-hidden ${
        selected
          ? 'bg-teal-light border-teal/25 shadow-sm'
          : 'bg-white border-border-gray hover:border-teal/30 hover:shadow-sm'
      }`}
    >
      {selected ? <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-teal" /> : null}
      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-border-gray bg-[#EEF2F6]">
        <img
          src={appointment.doctorPhoto}
          alt={appointment.doctorName}
          className="absolute inset-0 w-full h-full object-cover object-[center_18%]"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <h2 className="text-[13px] font-bold text-navy truncate">{appointment.doctorName}</h2>
          <span
            className={`text-[9px] font-semibold px-1.5 py-px rounded-full shrink-0 ${
              appointmentStatusStyles[appointment.status] || appointmentStatusStyles.Upcoming
            }`}
          >
            {appointment.status}
          </span>
        </div>
        <p className="text-[11px] text-body-gray truncate leading-tight mt-0.5">
          {appointment.specialty} • {appointment.clinic}
        </p>
        <p className="text-[11px] text-body-gray mt-0.5 flex items-center gap-2.5 leading-tight">
          <span className="inline-flex items-center gap-1 min-w-0">
            <CalendarDays className="w-3 h-3 shrink-0" strokeWidth={1.75} />
            <span className="truncate">{appointment.dateLabel}</span>
          </span>
          <span className="inline-flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" strokeWidth={1.75} />
            {appointment.timeLabel}
          </span>
        </p>
      </div>
      <ChevronRight className="w-3.5 h-3.5 text-body-gray shrink-0" strokeWidth={1.75} />
    </button>
  )
}
