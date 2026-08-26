import { CalendarX2, CircleCheck, X } from 'lucide-react'
import { appointmentActionCopy } from '../../data/mocks/appointmentActions'

export default function AppointmentActionDialog({ open, copy, onClose, onConfirm }) {
  if (!open || !copy) return null

  return (
    <div className="fixed inset-0 z-[1600] flex items-center justify-center p-4 bg-navy/40">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-action-title"
        className="w-full max-w-sm rounded-2xl bg-white shadow-xl border border-border-gray p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              copy.danger ? 'bg-rose-50 text-rose-500' : 'bg-teal-light text-teal'
            }`}
          >
            {copy.danger ? (
              <CalendarX2 className="w-5 h-5" strokeWidth={1.75} />
            ) : (
              <CircleCheck className="w-5 h-5" strokeWidth={1.75} />
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-lg border border-border-gray flex items-center justify-center cursor-pointer hover:bg-bg-gray"
          >
            <X className="w-4 h-4 text-body-gray" strokeWidth={1.75} />
          </button>
        </div>

        <h2 id="appointment-action-title" className="text-lg font-bold text-navy mt-4">
          {copy.title}
        </h2>
        <p className="text-sm text-body-gray mt-2 leading-relaxed">{copy.body}</p>

        <div className="flex gap-3 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 min-h-11 rounded-xl border border-border-gray bg-white text-sm font-semibold text-navy cursor-pointer hover:bg-bg-gray"
          >
            {appointmentActionCopy.keep}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 min-h-11 rounded-xl text-white text-sm font-semibold cursor-pointer ${
              copy.danger ? 'bg-rose-500 hover:bg-rose-600' : 'bg-teal hover:bg-teal-dark'
            }`}
          >
            {copy.confirm}
          </button>
        </div>
      </div>
    </div>
  )
}
