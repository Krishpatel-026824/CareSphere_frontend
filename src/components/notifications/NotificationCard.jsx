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
    const opening = !expanded
    if (opening && item.unread) onRead(item.id)
    setExpanded(opening)
  }

  function handleDelete(e) {
    e.stopPropagation()
    onDelete?.(item)
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
      className={`group relative cursor-pointer transition-colors ${
        item.unread ? 'bg-teal-light/55' : 'bg-white'
      } ${expanded ? 'bg-teal-light/40' : 'hover:bg-[#F0F7F6]'}`}
    >
      <span
        className={`absolute left-0 top-0 bottom-0 w-1 ${item.unread ? 'bg-teal' : theme.accent || 'bg-border-gray'}`}
        aria-hidden="true"
      />

      <div className="flex items-start gap-3.5 pl-4 sm:pl-5 pr-4 sm:pr-5 py-3.5">
        <div
          className={`w-10 h-10 rounded-xl ${theme.listBg} flex items-center justify-center shrink-0 mt-0.5 shadow-sm`}
        >
          <Icon className={`w-[18px] h-[18px] ${theme.listIcon}`} strokeWidth={1.85} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex items-center gap-2">
              <h3
                className={`text-[13px] sm:text-[14px] truncate ${
                  item.unread ? 'font-bold text-navy' : 'font-semibold text-navy'
                }`}
              >
                {item.title}
              </h3>
              {item.unread ? (
                <span className="text-[9px] font-bold uppercase tracking-wide text-white bg-teal px-1.5 py-0.5 rounded shrink-0">
                  New
                </span>
              ) : null}
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[11px] font-semibold text-body-gray whitespace-nowrap">
                {item.timeLabel}
              </span>
              <button
                type="button"
                onClick={handleDelete}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-body-gray/50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 cursor-pointer transition-all"
                aria-label="Delete notification"
              >
                <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            </div>
          </div>

          {!expanded ? (
            <p className="text-[12px] sm:text-[13px] text-body-gray leading-snug mt-1 line-clamp-2">
              {item.message}
            </p>
          ) : (
            <div className="mt-3" onClick={(e) => e.stopPropagation()}>
              {labDetails ? (
                <LabBookingNotificationDetail details={labDetails} statusLabel={statusLabel} />
              ) : (
                <NotificationDetailPanel item={item} statusLabel={statusLabel} />
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
