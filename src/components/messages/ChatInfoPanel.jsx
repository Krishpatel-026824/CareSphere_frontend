import { BadgeCheck, MapPin, MessageCircle, UserRound, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { doctorPortalPatientPath, doctorProfilePath, PATHS } from '../../routes/paths'

function InfoRow({ icon: Icon, label, value, valueClassName = 'text-navy' }) {
  if (!value) return null

  return (
    <div className="flex items-center gap-3 px-3.5 py-3 border-b border-[#E6EBF1] last:border-b-0">
      <span className="w-8 h-8 rounded-lg bg-[#E8F7F6] text-teal inline-flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" strokeWidth={1.85} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-body-gray">{label}</p>
        <p className={`text-sm font-semibold leading-snug truncate ${valueClassName}`}>{value}</p>
      </div>
    </div>
  )
}

export default function ChatInfoPanel({ conversation, onClose, isDoctor = false }) {
  const navigate = useNavigate()
  if (!conversation) return null

  const messageCount = conversation.messages?.length || 0
  const profileLabel = isDoctor ? 'View patient profile' : 'View doctor profile'

  function openProfile() {
    if (!conversation.doctorId) return
    if (isDoctor) {
      navigate(doctorPortalPatientPath(conversation.doctorId), { state: { from: PATHS.messages } })
      return
    }
    navigate(doctorProfilePath(conversation.doctorId), { state: { from: PATHS.messages } })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-info-title"
        className="w-full max-w-sm rounded-2xl bg-white shadow-xl border border-[#E6EBF1] overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="h-1 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark" />

        <div className="px-5 pt-4 pb-3 bg-gradient-to-b from-[#E8F7F6]/80 to-white border-b border-[#E6EBF1]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full bg-teal-light overflow-hidden ring-2 ring-white shadow-sm">
                  {conversation.avatar ? (
                    <img
                      src={conversation.avatar}
                      alt={conversation.doctorName}
                      className="w-full h-full object-cover object-[center_18%]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-teal">
                      <UserRound className="w-6 h-6" strokeWidth={1.75} />
                    </div>
                  )}
                </div>
                {conversation.online ? (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                ) : null}
              </div>
              <div className="min-w-0">
                <h2 id="chat-info-title" className="text-lg font-bold text-navy truncate">
                  {conversation.doctorName}
                </h2>
                <p className="text-sm text-body-gray truncate mt-0.5">{conversation.specialty}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 rounded-lg border border-[#E6EBF1] flex items-center justify-center cursor-pointer hover:bg-[#F4FAF9] shrink-0"
            >
              <X className="w-4 h-4 text-body-gray" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="rounded-xl border border-[#E6EBF1] bg-[#FAFCFD] overflow-hidden">
            <InfoRow icon={UserRound} label="Role" value={conversation.specialty} />
            {conversation.clinic ? (
              <InfoRow icon={MapPin} label="Clinic" value={conversation.clinic} />
            ) : null}
            <InfoRow
              icon={MessageCircle}
              label="Messages"
              value={`${messageCount} in this chat`}
            />
            <InfoRow
              icon={BadgeCheck}
              label="Status"
              value={conversation.online ? 'Available' : 'Offline'}
              valueClassName="text-teal"
            />
          </div>
        </div>

        {conversation.doctorId ? (
          <div className="px-5 pb-5">
            <button
              type="button"
              onClick={openProfile}
              className="w-full min-h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark transition-colors shadow-sm"
            >
              {profileLabel}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
