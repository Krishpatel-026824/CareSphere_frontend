import { useRef } from 'react'
import { FileText, Headphones, Pin } from 'lucide-react'

function fileExtension(name = '') {
  const parts = String(name).split('.')
  return parts.length > 1 ? parts.pop().toUpperCase() : 'FILE'
}

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
      className={`w-full text-left px-3 py-3 flex items-center gap-3 cursor-pointer transition-colors border-b border-[#E9EDEF] ${
        isActive ? 'bg-[#F0F2F5]' : 'bg-white hover:bg-[#F5F6F6]'
      }`}
    >
      <div className="w-12 h-12 rounded-full bg-[#DFE5E7] overflow-hidden flex items-center justify-center shrink-0">
        {item.avatar ? (
          <img
            src={item.avatar}
            alt={item.doctorName}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <Headphones className="w-5 h-5 text-[#54656F]" strokeWidth={1.75} />
        )}
      </div>

      <div className="flex-1 min-w-0 border-b border-transparent">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-[17px] font-normal text-[#111b21] truncate leading-tight">
            {item.doctorName}
          </h2>
          <span className="flex items-center gap-1 shrink-0">
            {item.pinnedAt ? (
              <Pin className="w-3 h-3 text-[#8696A0] fill-[#8696A0]" strokeWidth={1.75} />
            ) : null}
            {item.timeLabel ? (
              <span
                className={`text-[12px] tabular-nums ${
                  item.unread && item.unreadCount > 0 ? 'text-[#25D366] font-medium' : 'text-[#667781]'
                }`}
              >
                {item.timeLabel}
              </span>
            ) : null}
          </span>
        </div>
        <div className="mt-0.5 flex items-center gap-2 min-h-[20px]">
          <p
            className={`text-[14px] truncate flex-1 min-w-0 leading-tight ${
              item.lastMessage === 'No messages yet'
                ? 'text-[#667781] italic'
                : item.unread && item.unreadCount > 0
                  ? 'text-[#111b21] font-medium'
                  : 'text-[#667781]'
            }`}
          >
            {item.lastMessage}
          </p>
          {item.unread && item.unreadCount > 0 ? (
            <span className="min-w-[20px] h-[20px] px-1.5 rounded-full bg-[#25D366] text-white text-[12px] font-medium flex items-center justify-center shrink-0">
              {item.unreadCount}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  )
}
