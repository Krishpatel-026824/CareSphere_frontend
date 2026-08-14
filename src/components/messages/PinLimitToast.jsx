import { Pin } from 'lucide-react'
import { chatPinCopy } from '../../data/mocks/messagePins'

export default function PinLimitToast({ open }) {
  if (!open) return null

  return (
    <div className="pointer-events-none absolute inset-x-3 bottom-3 z-30">
      <div className="rounded-xl bg-navy text-white shadow-lg px-3.5 py-3 flex items-start gap-2.5">
        <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
          <Pin className="w-4 h-4" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold leading-tight">{chatPinCopy.limitTitle}</p>
          <p className="text-[12px] text-white/70 mt-0.5 leading-snug">{chatPinCopy.limitBody}</p>
        </div>
      </div>
    </div>
  )
}
