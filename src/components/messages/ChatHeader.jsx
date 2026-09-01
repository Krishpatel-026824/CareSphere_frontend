import { useState } from 'react'
import {
  ArrowLeft,
  Headphones,
  Info,
  MoreHorizontal,
  Trash2,
  UserRound,
} from 'lucide-react'

function HeaderAction({ label, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="w-10 h-10 rounded-xl border border-teal/20 bg-teal-light/50 text-teal-dark flex items-center justify-center cursor-pointer hover:bg-teal-light hover:text-teal transition-colors shrink-0"
    >
      {children}
    </button>
  )
}

export default function ChatHeader({ conversation, isTyping, onBack, onDeleteChat, onInfo }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const statusLabel = isTyping
    ? 'Typing…'
    : conversation.online
      ? 'Online'
      : conversation.clinic || conversation.specialty || ''

  return (
    <header className="h-[68px] px-4 flex items-center gap-3 shrink-0 bg-gradient-to-r from-white via-[#F3FBFA] to-[#EAF7F5] border-b border-teal/15">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="lg:hidden w-10 h-10 flex items-center justify-center cursor-pointer shrink-0 rounded-xl hover:bg-[#F4F7FA] text-navy"
          aria-label="Back to conversations"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2} />
        </button>
      ) : null}

      <button
        type="button"
        onClick={onInfo}
        className="flex items-center gap-3 min-w-0 flex-1 text-left cursor-pointer rounded-xl py-1 pr-2 hover:bg-[#F8FAFC]"
        aria-label={`${conversation.doctorName} info`}
      >
        <div className="relative shrink-0">
          <div className="w-11 h-11 rounded-full bg-teal-light overflow-hidden flex items-center justify-center">
            {conversation.avatar ? (
              <img
                src={conversation.avatar}
                alt=""
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <Headphones className="w-5 h-5 text-teal" strokeWidth={1.75} />
            )}
          </div>
          {conversation.online && !isTyping ? (
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
          ) : null}
        </div>
        <div className="min-w-0">
          <p className="text-[16px] font-bold text-navy leading-tight truncate">
            {conversation.doctorName}
          </p>
          {statusLabel ? (
            <p
              className={`text-[13px] leading-tight truncate mt-0.5 ${
                isTyping || conversation.online ? 'text-teal font-medium' : 'text-body-gray'
              }`}
            >
              {statusLabel}
            </p>
          ) : null}
        </div>
      </button>

      <div className="flex items-center gap-2 shrink-0">
        <HeaderAction label="Contact info" onClick={onInfo}>
          <Info className="w-[18px] h-[18px]" strokeWidth={1.85} />
        </HeaderAction>

        <div className="relative">
          <HeaderAction label="More options" onClick={() => setMenuOpen((open) => !open)}>
            <MoreHorizontal className="w-[18px] h-[18px]" strokeWidth={2} />
          </HeaderAction>
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
                className="absolute right-0 top-full mt-1.5 z-40 w-48 rounded-2xl border border-[#E6EBF1] bg-white shadow-lg p-1.5"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false)
                    onInfo?.()
                  }}
                  className="w-full px-3 py-2.5 flex items-center gap-2.5 text-left rounded-xl text-[13px] font-semibold text-navy hover:bg-[#F7FAFC] cursor-pointer"
                >
                  <UserRound className="w-4 h-4 shrink-0 text-teal" strokeWidth={1.75} />
                  Contact info
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false)
                    onDeleteChat?.()
                  }}
                  className="w-full px-3 py-2.5 flex items-center gap-2.5 text-left rounded-xl text-[13px] font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer"
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
