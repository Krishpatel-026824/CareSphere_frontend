import { useRef } from 'react'
import { ChevronRight, FileText } from 'lucide-react'
import { recordTypeIcons, recordTypeTones } from './healthIcons'
import { isLabHealthRecord } from '../../data/generators/healthRecordsGenerator'

export default function HealthRecordCard({ record, onSelect, onOpenMenu }) {
  const holdTimer = useRef(null)
  const didHold = useRef(false)
  const Icon = recordTypeIcons[record.icon] || FileText
  const tone = recordTypeTones[record.icon] || 'bg-teal-light text-teal'
  const kindLabel = isLabHealthRecord(record) ? 'Lab' : record.type || 'Record'
  const provider = [record.doctorName, record.specialty, kindLabel].filter(Boolean).join(' • ')

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
      className="w-full flex items-center gap-3.5 px-4 sm:px-5 py-0 text-left cursor-pointer hover:bg-[#F7F9FA] transition-colors border-b border-[#EEF1F4] xl:odd:border-r"
    >
      <span className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${tone}`}>
        <Icon className="w-5 h-5" strokeWidth={1.75} />
      </span>
      <span className="flex-1 min-w-0 flex items-center justify-between gap-3 py-3.5">
        <span className="min-w-0">
          <span className="block text-[15px] font-semibold text-navy truncate leading-tight">
            {record.title}
          </span>
          <span className="block text-[13px] text-body-gray truncate mt-1">{provider}</span>
        </span>
        <span className="shrink-0 flex items-center gap-1.5">
          <span className="text-[12px] text-body-gray tabular-nums whitespace-nowrap">
            {record.dateLabel}
          </span>
          <ChevronRight className="w-4 h-4 text-[#C5CDD6]" strokeWidth={1.75} />
        </span>
      </span>
    </button>
  )
}
