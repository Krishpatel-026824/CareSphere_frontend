import { Bell, RefreshCw } from 'lucide-react'

export default function NotificationHeader({ unreadCount, onMarkAllRead, onRefresh, subtitle }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-teal text-white flex items-center justify-center shrink-0">
          <Bell className="w-5 h-5" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <h1 className="text-[22px] sm:text-[26px] font-bold text-navy tracking-tight leading-none">
            Notifications
          </h1>
          <p className="text-[12px] text-body-gray mt-1">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <button
          type="button"
          onClick={onRefresh}
          className="h-10 px-4 rounded-full border border-[#E6EBF1] bg-white text-[#475569] text-[13px] font-semibold cursor-pointer hover:bg-gray-50 hover:border-[#CBD5E1] transition-colors inline-flex items-center gap-2 shadow-sm"
        >
          <RefreshCw className="w-4 h-4" strokeWidth={2} />
          Refresh
        </button>
        <button
          type="button"
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          className="h-10 px-5 rounded-full bg-teal text-white text-[13px] font-semibold cursor-pointer hover:bg-teal-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center shadow-sm"
        >
          Mark all read
        </button>
      </div>
    </header>
  )
}
