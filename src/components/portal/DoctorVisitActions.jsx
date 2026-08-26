import { CheckCircle2, MessageSquare, X } from 'lucide-react'

export default function DoctorVisitActions({
  visit,
  canAccept,
  canDecline,
  canComplete,
  showMessage,
  onAccept,
  onDecline,
  onComplete,
  onMessage,
  stacked = false,
  compact = false,
}) {
  const hasActions = canAccept || canDecline || canComplete || showMessage
  if (!hasActions) return null

  const base = `${
    compact ? 'min-h-11 text-[14px]' : 'min-h-11 text-[14px]'
  } w-full rounded-xl font-semibold tracking-tight cursor-pointer inline-flex items-center justify-center gap-2 transition-colors`

  return (
    <div
      className={`shrink-0 ${compact ? 'gap-1.5' : 'gap-2.5'} pt-0 ${
        stacked ? 'flex flex-col' : 'grid grid-cols-1 sm:grid-cols-3'
      }`}
    >
      {canAccept ? (
        <button
          type="button"
          onClick={() => onAccept?.(visit)}
          className={`${base} bg-teal text-white hover:bg-teal-dark`}
        >
          Accept visit
        </button>
      ) : null}
      {canComplete ? (
        <button
          type="button"
          onClick={() => onComplete?.(visit)}
          className={`${base} bg-teal text-white hover:bg-teal-dark`}
        >
          <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
          Mark completed
        </button>
      ) : null}
      {showMessage ? (
        <button
          type="button"
          onClick={() => onMessage?.(visit)}
          className={`${base} bg-[#E8F7F6] text-teal border border-teal/40 hover:bg-teal-light hover:border-teal`}
        >
          <MessageSquare className="w-4 h-4" strokeWidth={2} />
          Message patient
        </button>
      ) : null}
      {canDecline ? (
        <button
          type="button"
          onClick={() => onDecline?.(visit)}
          className={`${base} bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 hover:border-rose-300`}
        >
          <X className="w-4 h-4" strokeWidth={2} />
          Decline visit
        </button>
      ) : null}
    </div>
  )
}
