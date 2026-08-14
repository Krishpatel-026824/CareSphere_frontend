import { ArrowLeft, Headphones, Info, Phone, Trash2 } from 'lucide-react'

export default function ChatHeader({ conversation, isTyping, onBack, onDeleteChat, onInfo }) {
  return (
    <div className="px-4 sm:px-5 py-3 border-b border-black/5 bg-white flex items-center gap-3 shrink-0">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="lg:hidden w-9 h-9 rounded-full border border-border-gray bg-white flex items-center justify-center cursor-pointer shrink-0"
          aria-label="Back to conversations"
        >
          <ArrowLeft className="w-4 h-4 text-navy" strokeWidth={1.75} />
        </button>
      ) : null}

      <div className="relative shrink-0">
        <div className="w-11 h-11 rounded-full bg-teal-light overflow-hidden flex items-center justify-center text-teal">
          {conversation.avatar ? (
            <img
              src={conversation.avatar}
              alt={conversation.doctorName}
              className="w-full h-full object-cover object-[center_18%]"
            />
          ) : (
            <Headphones className="w-5 h-5" strokeWidth={1.75} />
          )}
        </div>
        {conversation.online ? (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold text-navy truncate">{conversation.doctorName}</p>
        <p className="text-xs text-body-gray truncate mt-0.5">
          {conversation.specialty}
          {conversation.clinic ? ` • ${conversation.clinic}` : ''}
        </p>
        <p
          className={`text-[11px] mt-0.5 inline-flex items-center gap-1.5 ${
            isTyping || conversation.online ? 'text-teal font-medium' : 'text-body-gray'
          }`}
        >
          {conversation.online || isTyping ? (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          ) : null}
          {isTyping ? 'Typing...' : conversation.online ? 'Online' : 'Offline'}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {conversation.phone ? (
          <a
            href={`tel:${conversation.phone}`}
            className="w-9 h-9 rounded-full border border-border-gray flex items-center justify-center text-navy hover:bg-bg-gray"
            aria-label="Call"
          >
            <Phone className="w-4 h-4" strokeWidth={1.75} />
          </a>
        ) : (
          <button
            type="button"
            className="w-9 h-9 rounded-full border border-border-gray flex items-center justify-center text-navy"
            aria-label="Call"
          >
            <Phone className="w-4 h-4" strokeWidth={1.75} />
          </button>
        )}
        <button
          type="button"
          onClick={onInfo}
          className="w-9 h-9 rounded-full border border-border-gray flex items-center justify-center text-navy hover:bg-bg-gray cursor-pointer"
          aria-label="Chat info"
        >
          <Info className="w-4 h-4" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={onDeleteChat}
          className="inline-flex items-center gap-1.5 min-h-9 px-3 rounded-xl border border-red-300 bg-white text-red-500 text-[12px] font-semibold cursor-pointer hover:bg-red-50"
        >
          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
          <span className="hidden sm:inline">Delete chat</span>
        </button>
      </div>
    </div>
  )
}
