import { Bell, RefreshCw } from 'lucide-react'

export default function NotificationHeader({ unreadCount, onMarkAllRead, onRefresh, subtitle }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-12 h-12 rounded-full bg-teal text-white flex items-center justify-center shrink-0 shadow-sm">
          <Bell className="w-5 h-5" strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
          <h1 className="font-display text-[26px] sm:text-[32px] font-bold text-navy tracking-tight leading-none">
            Notifications
          </h1>
          <p className="text-sm text-body-gray mt-1.5">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <button
          type="button"
          onClick={onRefresh}
          className="h-10 px-4 rounded-full border border-[#E6EBF1] bg-white text-navy text-[13px] font-semibold cursor-pointer hover:bg-white hover:border-teal/40 transition-colors inline-flex items-center gap-2 shadow-sm"
        >
          <RefreshCw className="w-4 h-4" strokeWidth={2} />
          Refresh
        </button>
        <button
          type="button"
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          className="h-10 px-5 rounded-full bg-teal text-white text-[13px] font-semibold cursor-pointer hover:bg-teal-dark disabled:opacity-45 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center shadow-sm"
        >
          Mark all read
        </button>
      </div>
    </header>
  )
}
