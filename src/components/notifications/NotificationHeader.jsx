import { Bell, MailOpen, RefreshCw } from 'lucide-react'

export default function NotificationHeader({ unreadCount, onMarkAllRead, onRefresh, subtitle }) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-3.5 min-w-0">
        <div className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-2xl bg-teal text-white flex items-center justify-center shrink-0 shadow-[0_8px_20px_rgba(14,165,160,0.32)]">
          <Bell className="w-5 h-5 sm:w-[22px] sm:h-[22px]" strokeWidth={1.8} />
        </div>
        <div className="min-w-0 pt-0.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-display text-[26px] sm:text-[30px] font-bold text-navy tracking-tight leading-none">
              Notifications
            </h1>
            {unreadCount > 0 ? (
              <span className="inline-flex items-center h-6 px-2 rounded-md bg-teal text-white text-[11px] font-bold tabular-nums">
                {unreadCount} new
              </span>
            ) : null}
          </div>
          <p className="text-sm text-body-gray mt-1.5 leading-snug">{subtitle}</p>
        </div>
      </div>

      <div className="inline-flex items-center shrink-0 self-start sm:self-auto rounded-xl border border-teal/25 bg-white p-1 shadow-[0_2px_8px_rgba(14,165,160,0.08)]">
        <button
          type="button"
          onClick={onRefresh}
          className="h-9 px-3.5 rounded-lg text-[12px] font-semibold text-teal-dark cursor-pointer hover:bg-teal-light transition-colors inline-flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" strokeWidth={2.2} />
          Refresh
        </button>
        <button
          type="button"
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          className="h-9 px-3.5 rounded-lg bg-teal text-white text-[12px] font-semibold cursor-pointer hover:bg-teal-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-1.5"
        >
          <MailOpen className="w-3.5 h-3.5" strokeWidth={2.2} />
          Mark all read
        </button>
      </div>
    </header>
  )
}
