import DoctorScheduleSummary from './DoctorScheduleSummary'

export default function DoctorScheduleVisitModal({
  open,
  visit,
  canAccept,
  canDecline,
  canComplete,
  onAccept,
  onDecline,
  onComplete,
  onClose,
}) {
  if (!open || !visit) return null

  return (
    <div className="fixed inset-0 z-[1300] flex items-center justify-center p-3 sm:p-5">
      <button
        type="button"
        className="absolute inset-0 bg-navy/45 cursor-pointer"
        aria-label="Close visit"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-[760px] max-h-[min(92dvh,820px)] rounded-3xl overflow-hidden bg-white shadow-[0_24px_64px_-20px_rgba(7,26,47,0.45)] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        <DoctorScheduleSummary
          visit={visit}
          canAccept={canAccept}
          canDecline={canDecline}
          canComplete={canComplete}
          onAccept={onAccept}
          onDecline={onDecline}
          onComplete={onComplete}
          onClose={onClose}
          asModal
        />
      </div>
    </div>
  )
}
