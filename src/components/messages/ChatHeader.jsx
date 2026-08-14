import { useState } from 'react'
import { ChevronLeft, Headphones, MoreVertical, Phone, Trash2, UserRound, Video } from 'lucide-react'

export default function ChatHeader({ conversation, isTyping, onBack, onDeleteChat, onInfo }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const statusLabel = isTyping ? 'typing...' : conversation.online ? 'online' : 'offline'

  return (
    <header className="h-[58px] pl-1 pr-1.5 flex items-center gap-0.5 shrink-0 bg-[#008069] text-white">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="lg:hidden w-10 h-10 flex items-center justify-center cursor-pointer shrink-0 rounded-full hover:bg-white/10"
          aria-label="Back to conversations"
        >
          <ChevronLeft className="w-6 h-6" strokeWidth={2.2} />
        </button>
      ) : null}

      <button
        type="button"
        onClick={onInfo}
        className="flex items-center gap-2.5 min-w-0 flex-1 text-left cursor-pointer rounded-lg py-1 pr-2 hover:bg-white/5"
        aria-label={`${conversation.doctorName} info`}
      >
        <div className="w-10 h-10 rounded-full bg-white/15 overflow-hidden flex items-center justify-center shrink-0">
          {conversation.avatar ? (
            <img
              src={conversation.avatar}
              alt=""
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <Headphones className="w-5 h-5 text-white" strokeWidth={1.75} />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[16px] font-medium leading-tight truncate">{conversation.doctorName}</p>
          <p
            className={`text-[12.5px] leading-tight truncate mt-px ${
              isTyping ? 'italic text-[#B6F7C8]' : conversation.online ? 'text-[#B6F7C8]' : 'text-white/75'
            }`}
          >
            {statusLabel}
          </p>
        </div>
      </button>

      <div className="flex items-center shrink-0">
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer"
          aria-label="Video call"
        >
          <Video className="w-[22px] h-[22px]" strokeWidth={1.7} />
        </button>
        {conversation.phone ? (
          <a
            href={`tel:${conversation.phone}`}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
            aria-label="Voice call"
          >
            <Phone className="w-[20px] h-[20px]" strokeWidth={1.7} />
          </a>
        ) : (
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer"
            aria-label="Voice call"
          >
            <Phone className="w-[20px] h-[20px]" strokeWidth={1.7} />
          </button>
        )}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer"
            aria-label="More options"
            aria-expanded={menuOpen}
          >
            <MoreVertical className="w-[22px] h-[22px]" strokeWidth={1.7} />
          </button>
          {menuOpen ? (
            <>
              <button
                type="button"
                className="fixed inset-0 z-30 cursor-default"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              />
              <div
                role="menu"
                className="absolute right-0 top-full mt-1 z-40 w-48 rounded-md bg-white shadow-[0_2px_10px_rgba(11,20,26,0.26)] py-1 overflow-hidden"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false)
                    onInfo?.()
                  }}
                  className="w-full px-4 py-2.5 flex items-center gap-3 text-left text-[14.5px] text-[#3B4A54] hover:bg-[#F5F6F6] cursor-pointer"
                >
                  <UserRound className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                  Contact info
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false)
                    onDeleteChat?.()
                  }}
                  className="w-full px-4 py-2.5 flex items-center gap-3 text-left text-[14.5px] text-[#EA0038] hover:bg-[#F5F6F6] cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                  Delete chat
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </header>
  )
}
