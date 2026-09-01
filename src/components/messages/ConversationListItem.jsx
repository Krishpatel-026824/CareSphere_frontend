import { useRef } from 'react'
import { Headphones, Pin } from 'lucide-react'

export default function ConversationListItem({ item, isActive, onSelect, onOpenMenu }) {
  const holdTimer = useRef(null)
  const didHold = useRef(false)
  const unread = item.unread && item.unreadCount > 0

  function startHold(event) {
    didHold.current = false
    const x = event.clientX
    const y = event.clientY
    holdTimer.current = setTimeout(() => {
      didHold.current = true
      onOpenMenu?.(item, { clientX: x, clientY: y })
    }, 500)
  }

  function endHold() {
    clearTimeout(holdTimer.current)
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (!didHold.current) onSelect(item.id)
      }}
      onContextMenu={(event) => {
        event.preventDefault()
        onOpenMenu?.(item, event)
      }}
      onPointerDown={startHold}
      onPointerUp={endHold}
      onPointerLeave={endHold}
      onPointerCancel={endHold}
      className={`w-full text-left px-3 py-3 flex items-center gap-3 cursor-pointer transition-colors rounded-2xl ${
        isActive ? 'bg-[#E8F7F6]' : 'hover:bg-[#F8FAFC]'
      }`}
    >
      <div className="relative shrink-0">
        <div className="w-[46px] h-[46px] rounded-full bg-teal-light overflow-hidden flex items-center justify-center">
          {item.avatar ? (
            <img src={item.avatar} alt="" className="w-full h-full object-cover object-top" />
          ) : (
            <Headphones className="w-5 h-5 text-teal" strokeWidth={1.75} />
          )}
        </div>
        {item.online ? (
          <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
        ) : null}
      </div>

      <div className="flex-1 min-w-0 flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <h2
            className={`text-[14px] truncate leading-snug ${
              unread ? 'font-bold text-navy' : 'font-semibold text-navy'
            }`}
          >
            {item.doctorName}
          </h2>
          <p
            className={`text-[13px] truncate mt-1 leading-snug ${
              item.lastMessage === 'No messages yet'
                ? 'text-body-gray italic'
                : unread
                  ? 'text-navy font-medium'
                  : 'text-body-gray'
            }`}
          >
            {item.lastMessage}
          </p>
        </div>

        <div className="shrink-0 flex flex-col items-end gap-1.5 min-w-[3.25rem]">
          <span className="inline-flex items-center gap-1">
            {item.pinnedAt ? (
              <Pin className="w-3 h-3 text-teal fill-teal" strokeWidth={1.75} />
            ) : null}
            {item.timeLabel ? (
              <span
                className={`text-[11px] tabular-nums whitespace-nowrap ${
                  unread ? 'text-teal font-bold' : 'text-body-gray'
                }`}
              >
                {item.timeLabel}
              </span>
            ) : null}
          </span>
          {unread ? (
            <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-teal text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
              {item.unreadCount}
            </span>
          ) : (
            <span className="h-5" aria-hidden="true" />
          )}
        </div>
      </div>
    </button>
  )
}
