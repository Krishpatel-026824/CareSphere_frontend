import { MessageSquareText } from 'lucide-react'

export default function ConversationListItem({ item, isActive, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className={`w-full text-left border rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 sm:gap-3.5 cursor-pointer transition-all duration-200 ${
        isActive
          ? 'bg-teal-light/70 border-2 border-teal shadow-sm'
          : 'bg-white border-border-gray shadow-sm hover:shadow-md hover:border-teal/30'
      }`}
    >
      <div className="relative shrink-0">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-teal-light overflow-hidden flex items-center justify-center text-teal">
          {item.avatar ? (
            <img src={item.avatar} alt={item.doctorName} className="w-full h-full object-cover" />
          ) : (
            <MessageSquareText className="w-5 h-5" strokeWidth={1.75} />
          )}
        </div>
        {item.unread ? (
          <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
            {item.unreadCount}
          </span>
        ) : null}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className="text-[14px] sm:text-sm font-semibold text-navy truncate tracking-tight">
              {item.doctorName}
            </h2>
            <p className="text-[11px] sm:text-xs text-body-gray mt-0.5 truncate">{item.specialty}</p>
          </div>
          {item.timeLabel ? (
            <span className="text-[10px] sm:text-[11px] text-body-gray shrink-0 pt-0.5 tabular-nums">
              {item.timeLabel}
            </span>
          ) : null}
        </div>
        <p
          className={`text-[13px] sm:text-sm mt-1.5 line-clamp-1 ${
            item.lastMessage === 'No messages yet' ? 'text-body-gray/70 italic' : 'text-body-gray'
          }`}
        >
          {item.lastMessage}
        </p>
      </div>
    </button>
  )
}
