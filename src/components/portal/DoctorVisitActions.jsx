import { CheckCircle2, MessageSquare, X } from 'lucide-react'
import Button from '../Button'

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
}) {
  const hasActions = canAccept || canDecline || canComplete || showMessage
  if (!hasActions) return null

  return (
    <div className="shrink-0 grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
      {canAccept ? (
        <Button onClick={() => onAccept?.(visit)}>Accept visit</Button>
      ) : null}
      {canComplete ? (
        <Button onClick={() => onComplete?.(visit)}>
          <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
          Mark completed
        </Button>
      ) : null}
      {showMessage ? (
        <Button variant="secondary" onClick={() => onMessage?.(visit)}>
          <MessageSquare className="w-4 h-4" strokeWidth={2} />
          Message patient
        </Button>
      ) : null}
      {canDecline ? (
        <button
          type="button"
          onClick={() => onDecline?.(visit)}
          className="min-h-11 rounded-xl border border-rose-200 bg-white text-rose-500 text-sm font-semibold cursor-pointer hover:bg-rose-50 inline-flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" strokeWidth={2} />
          Decline visit
        </button>
      ) : null}
    </div>
  )
}
