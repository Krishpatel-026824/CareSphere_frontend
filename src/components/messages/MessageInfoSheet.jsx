import { ArrowLeft } from 'lucide-react'
import { getMessageReceipts } from '../../utils/messageStatus'
import MessageTicks from './MessageTicks'

export default function MessageInfoSheet({ message, onClose }) {
  if (!message) return null
  const receipts = getMessageReceipts(message)
  const preview = message.deleted
    ? 'This message was deleted'
    : message.text || message.attachment?.name || 'Attachment'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="message-info-title"
        className="w-full max-w-sm rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col max-h-[min(36rem,calc(100dvh-2rem))]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="h-1 bg-gradient-to-r from-teal via-[#14B8A6] to-[#0D9488]" />
        <div className="px-3 py-3 bg-white border-b border-[#E6EBF1] flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="Back"
            className="w-9 h-9 rounded-full flex items-center justify-center text-navy hover:bg-[#F4F7FA] cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.75} />
          </button>
          <h2 id="message-info-title" className="text-[16px] font-bold text-navy">
            Message info
          </h2>
        </div>

        <div className="chat-wallpaper px-4 py-5 min-h-[7.5rem] flex items-end justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[#E8F7F6] px-3.5 py-2.5 shadow-sm">
            <p className="text-[14px] leading-snug text-navy">{preview}</p>
            <span className="flex items-center justify-end gap-1 mt-1.5">
              <span className="text-[11px] tabular-nums text-body-gray">
                {receipts.sent || message.time}
              </span>
              <MessageTicks status={receipts.status} variant="onTeal" />
            </span>
          </div>
        </div>

        <div className="bg-white">
          <ReceiptRow
            label="Read"
            status="read"
            time={receipts.read}
            empty="Waiting for this message to be read"
          />
          <div className="mx-5 border-t border-[#E6EBF1]" />
          <ReceiptRow
            label="Delivered"
            status="delivered"
            time={receipts.delivered}
            empty="Waiting for this message to be delivered"
          />
        </div>
      </div>
    </div>
  )
}

function ReceiptRow({ label, status, time, empty }) {
  return (
    <div className="px-5 py-3.5 flex items-start gap-3">
      <div className="mt-1">
        <MessageTicks status={status} variant="onTeal" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-medium text-navy">{label}</p>
        <p className="text-[13px] text-body-gray mt-0.5">{time || empty}</p>
      </div>
    </div>
  )
}
