import { useRef } from 'react'
import { appointmentStatusLabels, appointmentStatusStyles } from '../../data/mocks/appointmentActions'

function splitTime(label = '') {
  const match = String(label).trim().match(/^(\d{1,2}:\d{2})\s*(AM|PM)?/i)
  return { time: match?.[1] || label, period: (match?.[2] || '').toUpperCase() }
}

export default function DoctorScheduleListCard({ visit, selected, onSelect, onOpenMenu }) {
  const holdTimer = useRef(null)
  const didHold = useRef(false)
  const { time, period } = splitTime(visit.timeLabel)

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
      className={`relative w-full shrink-0 text-left rounded-2xl px-3.5 py-3.5 flex items-center gap-3.5 cursor-pointer transition-all ${
        selected
          ? 'bg-[#E8F7F6] shadow-[inset_0_0_0_1.5px_#0EA5A0]'
          : 'bg-[#F7FAFC] hover:bg-white hover:shadow-[inset_0_0_0_1px_#D0D9E3]'
      }`}
    >
      <div
        className={`w-[68px] shrink-0 rounded-2xl py-2.5 text-center ${
          selected ? 'bg-teal text-white' : 'bg-white text-navy'
        }`}
      >
        <p className="text-sm font-bold leading-none">{time}</p>
        {period ? <p className="text-[10px] font-semibold mt-1.5 tracking-wide">{period}</p> : null}
      </div>
      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[#EEF2F6] ring-2 ring-white">
        <img src={visit.patientPhoto} alt="" className="w-full h-full object-cover object-top" />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-[15px] font-bold text-navy truncate">{visit.patientName}</h2>
        <p className="text-[12px] text-body-gray truncate mt-1">
          {visit.visitType} · {visit.room}
        </p>
      </div>
      <span
        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${
          appointmentStatusStyles[visit.status] || appointmentStatusStyles.Upcoming
        }`}
      >
        {appointmentStatusLabels[visit.status] || visit.status}
      </span>
    </button>
  )
}
