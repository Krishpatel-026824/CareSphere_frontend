import { Headphones, MapPin, Phone, Stethoscope, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { doctorProfilePath, PATHS } from '../../routes/paths'

export default function ChatInfoPanel({ conversation, onClose }) {
  const navigate = useNavigate()
  if (!conversation) return null

  const messageCount = conversation.messages?.length || 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-info-title"
        className="w-full max-w-sm rounded-2xl bg-white shadow-xl border border-border-gray overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 px-5 pt-5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-full bg-teal-light overflow-hidden flex items-center justify-center text-teal shrink-0">
              {conversation.avatar ? (
                <img
                  src={conversation.avatar}
                  alt={conversation.doctorName}
                  className="w-full h-full object-cover object-[center_18%]"
                />
              ) : (
                <Headphones className="w-6 h-6" strokeWidth={1.75} />
              )}
            </div>
            <div className="min-w-0">
              <h2 id="chat-info-title" className="text-lg font-bold text-navy truncate">
                {conversation.doctorName}
              </h2>
              <p className="text-sm text-body-gray truncate">{conversation.specialty}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-lg border border-border-gray flex items-center justify-center cursor-pointer hover:bg-bg-gray shrink-0"
          >
            <X className="w-4 h-4 text-body-gray" strokeWidth={1.75} />
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col gap-3">
          <div className="rounded-xl bg-bg-gray px-3.5 py-3 flex items-center gap-3">
            <Stethoscope className="w-4 h-4 text-teal shrink-0" strokeWidth={1.75} />
            <div className="min-w-0">
              <p className="text-[11px] text-body-gray">Specialty</p>
              <p className="text-sm font-semibold text-navy">{conversation.specialty}</p>
            </div>
          </div>
          {conversation.clinic ? (
            <div className="rounded-xl bg-bg-gray px-3.5 py-3 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-teal shrink-0" strokeWidth={1.75} />
              <div className="min-w-0">
                <p className="text-[11px] text-body-gray">Clinic</p>
                <p className="text-sm font-semibold text-navy">{conversation.clinic}</p>
              </div>
            </div>
          ) : null}
          <div className="rounded-xl bg-bg-gray px-3.5 py-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] text-body-gray">Status</p>
              <p className={`text-sm font-semibold ${conversation.online ? 'text-teal' : 'text-navy'}`}>
                {conversation.online ? 'Online' : 'Offline'}
              </p>
            </div>
            <p className="text-xs text-body-gray">{messageCount} messages</p>
          </div>
        </div>

        <div className="px-5 pb-5 flex flex-col gap-2">
          {conversation.phone ? (
            <a
              href={`tel:${conversation.phone}`}
              className="min-h-11 rounded-xl border border-border-gray bg-white text-sm font-semibold text-navy inline-flex items-center justify-center gap-2 hover:bg-bg-gray"
            >
              <Phone className="w-4 h-4" strokeWidth={1.75} />
              Call {conversation.phone}
            </a>
          ) : null}
          {conversation.doctorId ? (
            <button
              type="button"
              onClick={() =>
                navigate(doctorProfilePath(conversation.doctorId), { state: { from: PATHS.messages } })
              }
              className="min-h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark"
            >
              View doctor profile
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
