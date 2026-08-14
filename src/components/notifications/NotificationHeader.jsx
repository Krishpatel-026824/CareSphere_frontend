import { Bell, CheckCheck } from 'lucide-react'
import BackHomeButton from '../BackHomeButton'

export default function NotificationHeader({ unreadCount, onMarkAllRead, subtitle, homePath }) {
  return (
    <header className="flex flex-col gap-3">
      <BackHomeButton to={homePath} />
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <Bell className="w-7 h-7 sm:w-8 sm:h-8 text-navy mt-0.5 shrink-0" strokeWidth={1.75} />
          <div className="min-w-0">
            <h1 className="text-[26px] sm:text-[30px] lg:text-[32px] font-bold text-navy tracking-tight leading-none">
              Notifications
            </h1>
            <p className="text-sm text-body-gray mt-2">{subtitle}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          className="inline-flex items-center justify-center gap-2 self-start min-h-11 px-5 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shrink-0"
        >
          <CheckCheck className="w-4 h-4" strokeWidth={2} />
          Mark all as read
        </button>
      </div>
    </header>
  )
}
