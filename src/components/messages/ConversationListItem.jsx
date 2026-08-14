import { useRef } from 'react'
import { Headphones, Pin } from 'lucide-react'

export default function ConversationListItem({ item, isActive, onSelect, onOpenMenu }) {
  const holdTimer = useRef(null)
  const didHold = useRef(false)

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
      className={`w-full text-left rounded-2xl p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
        isActive
          ? 'bg-teal-light/80 border border-teal shadow-none'
          : 'bg-white border border-transparent shadow-sm hover:bg-bg-gray'
      }`}
    >
      <div className="relative shrink-0">
        <div className="w-12 h-12 rounded-full bg-teal-light overflow-hidden flex items-center justify-center text-teal">
          {item.avatar ? (
            <img
              src={item.avatar}
              alt={item.doctorName}
              className="w-full h-full object-cover object-[center_18%]"
            />
          ) : (
            <Headphones className="w-5 h-5" strokeWidth={1.75} />
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-sm font-semibold text-navy truncate">{item.doctorName}</h2>
          <span className="flex items-center gap-1 shrink-0">
            {item.pinnedAt ? <Pin className="w-3 h-3 text-body-gray fill-body-gray" strokeWidth={1.75} /> : null}
            {item.timeLabel ? (
              <span className="text-[11px] text-body-gray tabular-nums">{item.timeLabel}</span>
            ) : null}
          </span>
        </div>
        <p className="text-xs text-body-gray mt-0.5 truncate">{item.specialty}</p>
        <div className="mt-1 flex items-center gap-2">
          <p
            className={`text-[13px] truncate flex-1 min-w-0 ${
              item.lastMessage === 'No messages yet' ? 'text-body-gray/70 italic' : 'text-body-gray'
            }`}
          >
            {item.lastMessage}
          </p>
          {item.unread && item.unreadCount > 0 ? (
            <span className="min-w-5 h-5 px-1 rounded-full bg-teal text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              {item.unreadCount}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  )
}
