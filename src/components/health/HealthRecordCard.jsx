import { useRef } from 'react'
import { ChevronRight, FileText } from 'lucide-react'
import {
  recordBadgeTones,
  recordCardSurfaces,
  recordTypeIcons,
  recordTypeTones,
} from './healthIcons'
import { isLabHealthRecord } from '../../data/generators/healthRecordsGenerator'

export default function HealthRecordCard({ record, onSelect, onOpenMenu }) {
  const holdTimer = useRef(null)
  const didHold = useRef(false)
  const iconKey = record.icon || 'lab'
  const Icon = recordTypeIcons[iconKey] || FileText
  const tone = recordTypeTones[iconKey] || recordTypeTones.lab
  const surface = recordCardSurfaces[iconKey] || recordCardSurfaces.lab
  const badge = recordBadgeTones[iconKey] || recordBadgeTones.lab
  const kindLabel = isLabHealthRecord(record) ? 'Lab' : record.type || 'Record'
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
      className={`w-full flex items-center gap-3.5 px-4 py-3.5 text-left cursor-pointer rounded-2xl border transition-all hover:shadow-md ${surface}`}
    >
      <span className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${tone}`}>
        <Icon className="w-5 h-5" strokeWidth={1.9} />
      </span>
      <span className="flex-1 min-w-0 flex items-center justify-between gap-3">
        <span className="min-w-0">
          <span className="flex items-center gap-2 min-w-0">
            <span className="text-[15px] font-semibold text-navy truncate leading-tight">
              {record.title}
            </span>
            <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${badge}`}>
              {kindLabel}
            </span>
          </span>
          <span className="block text-[13px] text-body-gray truncate mt-1">{provider}</span>
        </span>
        <span className="shrink-0 flex items-center gap-1.5">
          <span className="text-[12px] font-semibold text-navy/70 tabular-nums whitespace-nowrap">
            {record.dateLabel}
          </span>
          <ChevronRight className="w-4 h-4 text-teal" strokeWidth={2} />
        </span>
      </span>
    </button>
  )
}
