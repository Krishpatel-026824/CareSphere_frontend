import { useMemo, useState } from 'react'
import {
  Bell,
  CalendarCheck2,
  CheckCheck,
  CheckCircle2,
  Eye,
  FlaskConical,
  LayoutList,
  Mail,
  MessageSquare,
  Pill,
  RefreshCw,
  ShieldAlert,
  Tag,
  UserRound,
} from 'lucide-react'
import { notificationsMock } from '../../data/mocks/notifications'

const typeStyles = {
  appointment: { icon: CalendarCheck2, bg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  medicine: { icon: Pill, bg: 'bg-sky-50', iconColor: 'text-sky-600' },
  lab: { icon: FlaskConical, bg: 'bg-violet-50', iconColor: 'text-violet-600' },
  message: { icon: MessageSquare, bg: 'bg-amber-50', iconColor: 'text-amber-600' },
  offer: { icon: Tag, bg: 'bg-rose-50', iconColor: 'text-rose-600' },
  security: { icon: ShieldAlert, bg: 'bg-cyan-50', iconColor: 'text-cyan-600' },
}

const filters = [
  { id: 'all', label: 'All', icon: LayoutList },
  { id: 'unread', label: 'Unread', icon: Mail },
  { id: 'viewed', label: 'Viewed', icon: Eye },
]

function StatCard({ label, count, sublabel, icon: Icon, tone, active, onClick }) {
  const tones = {
    teal: {
      border: 'border-teal/30',
      active: 'ring-2 ring-teal/20 border-teal/50',
      iconWrap: 'bg-teal-light text-teal',
      count: 'text-teal',
    },
    amber: {
      border: 'border-amber/30',
      active: 'ring-2 ring-amber/20 border-amber/50',
      iconWrap: 'bg-amber-100 text-amber-600',
      count: 'text-amber-600',
    },
    violet: {
      border: 'border-violet-300/60',
      active: 'ring-2 ring-violet/20 border-violet-400/50',
      iconWrap: 'bg-violet-100 text-violet-600',
      count: 'text-violet-600',
    },
  }
  const t = tones[tone]

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl bg-white border ${t.border} ${active ? t.active : ''} shadow-sm px-4 py-4 sm:px-5 sm:py-5 flex items-center gap-3 sm:gap-4 text-left cursor-pointer transition-all hover:shadow-md w-full`}
    >
      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${t.iconWrap} flex items-center justify-center shrink-0`}>
        <Icon className="w-5 h-5 sm:w-[22px] sm:h-[22px]" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1 overflow-hidden">
        <p className="text-xs sm:text-sm font-medium text-body-gray truncate">{label}</p>
        <p className={`text-2xl sm:text-3xl font-bold ${t.count} leading-tight mt-0.5`}>{count}</p>
        <p className="text-[11px] sm:text-xs text-body-gray/80 mt-0.5 truncate">{sublabel}</p>
      </div>
    </button>
  )
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(notificationsMock)
  const [activeFilter, setActiveFilter] = useState('all')

  const unreadCount = notifications.filter((item) => item.unread).length
  const viewedCount = notifications.filter((item) => !item.unread).length

  const filtered = useMemo(() => {
    if (activeFilter === 'unread') return notifications.filter((item) => item.unread)
    if (activeFilter === 'viewed') return notifications.filter((item) => !item.unread)
    return notifications
  }, [activeFilter, notifications])

  function markAsRead(id) {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, unread: false } : item)))
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })))
  }

  function handleRefresh() {
    setNotifications([...notificationsMock])
    setActiveFilter('all')
  }

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-[1400px] mx-auto page-pad py-5 sm:py-6 lg:py-8 flex flex-col gap-5 sm:gap-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-violet-600" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-navy tracking-tight leading-tight">
                Notifications
              </h1>
              <p className="text-sm text-body-gray mt-1">All your updates and alerts in one place</p>
            </div>
          </div>
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center justify-center gap-2 self-start min-h-11 px-5 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shrink-0"
          >
            <CheckCheck className="w-4 h-4" strokeWidth={1.75} />
            Mark all as read
          </button>
        </header>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <StatCard
            label="Unread"
            count={unreadCount}
            sublabel="New notifications"
            icon={Mail}
            tone="teal"
            active={activeFilter === 'unread'}
            onClick={() => setActiveFilter('unread')}
          />
          <StatCard
            label="Viewed"
            count={viewedCount}
            sublabel="Already read"
            icon={Eye}
            tone="amber"
            active={activeFilter === 'viewed'}
            onClick={() => setActiveFilter('viewed')}
          />
          <StatCard
            label="All"
            count={notifications.length}
            sublabel="Total notifications"
            icon={CheckCircle2}
            tone="violet"
            active={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          />
        </div>

        {/* Filter tabs */}
        <div className="w-full overflow-x-auto">
          <div className="inline-flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-border-gray shadow-sm">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id
              const Icon = filter.icon
              const count =
                filter.id === 'all' ? notifications.length : filter.id === 'unread' ? unreadCount : viewedCount

              const inactiveIconWrap = {
                all: 'bg-violet-50 text-violet-600',
                unread: 'bg-teal-light text-teal',
                viewed: 'bg-amber-50 text-amber-600',
              }[filter.id]

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`inline-flex items-center gap-2.5 shrink-0 min-h-[44px] pl-2 pr-4 sm:pr-5 rounded-xl cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0A7A75] to-[#0EA5A0] text-white shadow-sm'
                      : 'text-body-gray hover:bg-bg-gray/80 hover:text-navy'
                  }`}
                >
                  <span
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : inactiveIconWrap
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                  </span>
                  <span className={`text-sm whitespace-nowrap ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {filter.label}
                  </span>
                  <span
                    className={`min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-white/25 text-white' : 'bg-bg-gray text-body-gray'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Notification grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border-gray bg-white px-6 py-16 text-center">
            <Bell className="w-9 h-9 text-body-gray/35 mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-sm font-medium text-navy">No notifications in this view.</p>
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className="mt-3 text-sm font-semibold text-teal cursor-pointer hover:opacity-80"
            >
              View all notifications
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map((item) => {
              const style = typeStyles[item.type] || { icon: Bell, bg: 'bg-gray-50', iconColor: 'text-gray-600' }
              const Icon = item.type === 'lab' && item.title.includes('Sample') ? UserRound : style.icon

              return (
                <article
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${item.title}. ${item.unread ? 'Unread. ' : 'Read. '}${item.message}`}
                  onClick={() => markAsRead(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      markAsRead(item.id)
                    }
                  }}
                  className={`relative overflow-hidden rounded-2xl border p-4 sm:p-5 shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[108px] ${
                    item.unread
                      ? 'border-teal/35 bg-teal-light/20'
                      : 'border-border-gray bg-white'
                  }`}
                >
                  {item.unread ? (
                    <span
                      className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-teal"
                      aria-hidden="true"
                    />
                  ) : null}

                  <div className="flex items-start gap-3 pl-1">
                    <div className={`w-11 h-11 rounded-xl ${style.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${style.iconColor}`} strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0 flex flex-wrap items-center gap-2">
                          <h2
                            className={`text-[14px] sm:text-[15px] leading-snug line-clamp-2 ${
                              item.unread ? 'font-bold text-navy' : 'font-semibold text-navy/90'
                            }`}
                          >
                            {item.title}
                          </h2>
                          {item.unread ? (
                            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-teal bg-white px-2 py-0.5 rounded-full border border-teal/25">
                              New
                            </span>
                          ) : null}
                        </div>
                        <span className="text-[11px] text-body-gray leading-none shrink-0 pt-0.5 whitespace-nowrap">
                          {item.timeLabel}
                        </span>
                      </div>
                      <p
                        className={`text-xs sm:text-[13px] mt-2 leading-relaxed line-clamp-2 break-words ${
                          item.unread ? 'text-body-gray' : 'text-body-gray/85'
                        }`}
                      >
                        {item.message}
                      </p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* Refresh */}
        <div className="flex justify-center pt-2 pb-4">
          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 min-h-11 px-6 rounded-xl border border-border-gray bg-white text-sm font-semibold text-teal cursor-pointer hover:border-teal/40 hover:bg-teal-light/30 transition-all shadow-sm"
          >
            <RefreshCw className="w-4 h-4" strokeWidth={1.75} />
            Refresh
          </button>
        </div>
      </div>
    </div>
  )
}
