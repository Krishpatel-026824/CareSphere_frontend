import { useRef } from 'react'
import { FileText } from 'lucide-react'
import { recordTypeIcons, recordTypeTones } from './healthIcons'

export default function HealthRecordCard({ record, showDivider = true, onSelect, onOpenMenu }) {
  const holdTimer = useRef(null)
  const didHold = useRef(false)
  const Icon = recordTypeIcons[record.icon] || FileText
  const tone = recordTypeTones[record.icon] || 'bg-teal-light text-teal'
  const provider = [record.doctorName, record.specialty].filter(Boolean).join(' • ')

  function startHold(event) {
    didHold.current = false
    const x = event.clientX
    const y = event.clientY
    holdTimer.current = setTimeout(() => {
      didHold.current = true
      onOpenMenu?.(record, { clientX: x, clientY: y })
    }, 500)
  }

  function endHold() {
    clearTimeout(holdTimer.current)
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (!didHold.current) onSelect?.(record)
      }}
      onContextMenu={(event) => {
        event.preventDefault()
        onOpenMenu?.(record, event)
      }}
      onPointerDown={startHold}
      onPointerUp={endHold}
      onPointerLeave={endHold}
      onPointerCancel={endHold}
      className="w-full flex items-center gap-3 pl-3 pr-4 py-0 text-left cursor-pointer hover:bg-[#F5F6F6]"
    >
      <span className={`w-[49px] h-[49px] rounded-full flex items-center justify-center shrink-0 ${tone}`}>
        <Icon className="w-5 h-5" strokeWidth={1.75} />
      </span>
      <span
        className={`flex-1 min-w-0 flex items-start justify-between gap-3 py-3 ${
          showDivider ? 'border-b border-[#E9EDEF]' : ''
        }`}
      >
        <span className="min-w-0">
          <span className="block text-[16px] font-medium text-[#111b21] truncate leading-tight">
            {record.title}
          </span>
          <span className="block text-[14px] text-[#667781] truncate mt-0.5">{provider}</span>
        </span>
        <span className="shrink-0 text-[12px] text-[#667781] tabular-nums pt-0.5">
          {record.dateLabel}
        </span>
      </span>
    </button>
  )
}
