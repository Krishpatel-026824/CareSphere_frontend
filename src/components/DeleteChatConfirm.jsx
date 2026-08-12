import { Trash2, X } from 'lucide-react'

export default function DeleteChatConfirm({ doctorName, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-chat-title"
        className="w-full max-w-sm rounded-2xl bg-white shadow-xl border border-border-gray p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="w-8 h-8 rounded-lg border border-border-gray flex items-center justify-center cursor-pointer hover:bg-bg-gray"
          >
            <X className="w-4 h-4 text-body-gray" strokeWidth={1.75} />
          </button>
        </div>

        <h2 id="delete-chat-title" className="text-lg font-bold text-navy mt-4">
          Delete chat history?
        </h2>
        <p className="text-sm text-body-gray mt-2 leading-relaxed">
          All messages with <span className="font-semibold text-navy">{doctorName}</span> will be
          removed. The contact will stay in your list and you can message them again.
        </p>

        <div className="flex gap-3 mt-5">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 min-h-11 rounded-xl border border-border-gray bg-white text-sm font-semibold text-navy cursor-pointer hover:bg-bg-gray"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 min-h-11 rounded-xl bg-red-500 text-white text-sm font-semibold cursor-pointer hover:bg-red-600"
          >
            Delete chat
          </button>
        </div>
      </div>
    </div>
  )
}
