import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import LabBookingNotificationDetail, { parseLabBookingDetails } from './LabBookingNotificationDetail'
import NotificationDetailPanel, {
  getNotificationIcon,
  getNotificationTheme,
} from './NotificationDetailPanel'

export default function NotificationCard({ item, onRead, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const theme = getNotificationTheme(item.type)
  const Icon = getNotificationIcon(item)
  const labDetails = parseLabBookingDetails(item)
  const statusLabel = `${item.unread ? 'Marked as read' : 'Read'} · ${item.timeLabel}`

  function handleClick() {
    if (item.unread) onRead(item.id)
    setExpanded((prev) => !prev)
  }

  function handleDelete(e) {
    e.stopPropagation()
    onDelete(item.id)
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      className={`group rounded-2xl border bg-white shadow-sm transition-all cursor-pointer ${
        item.unread
          ? 'border-teal/25 hover:border-teal/45'
          : 'border-[#E6EBF1] hover:border-[#CBD5E1]'
      } ${expanded ? 'shadow-md' : ''}`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {item.unread ? (
          <span className="w-2 h-2 rounded-full bg-teal shrink-0" />
        ) : (
          <span className="w-2 h-2 shrink-0" />
        )}

        <div className={`w-9 h-9 rounded-lg ${theme.listBg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-[17px] h-[17px] ${theme.listIcon}`} strokeWidth={1.75} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-[13px] font-bold text-navy truncate">{item.title}</h3>
            {item.unread ? (
              <span className="text-[9px] font-bold uppercase tracking-wide text-teal bg-teal-light px-1.5 py-0.5 rounded-full shrink-0">
                New
              </span>
            ) : null}
          </div>
          {!expanded ? (
            <p className="text-[12px] text-body-gray truncate mt-0.5">{item.message}</p>
          ) : null}
        </div>

        <span className="text-[11px] text-body-gray/70 whitespace-nowrap shrink-0">{item.timeLabel}</span>

        <button
          type="button"
          onClick={handleDelete}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 cursor-pointer transition-all shrink-0"
          aria-label="Delete notification"
        >
          <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>

      {expanded ? (
        <div className="px-4 pb-3.5 pl-4 sm:pl-[4.25rem]">
          {labDetails ? (
            <LabBookingNotificationDetail details={labDetails} statusLabel={statusLabel} />
          ) : (
            <NotificationDetailPanel item={item} statusLabel={statusLabel} />
          )}
        </div>
      ) : null}
    </article>
  )
}
