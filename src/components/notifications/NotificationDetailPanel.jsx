import {
  Bell,
  CalendarCheck2,
  CalendarPlus,
  CalendarX2,
  CheckCircle2,
  Clock,
  FileText,
  FlaskConical,
  MessageSquare,
  Pill,
  ShieldAlert,
  Tag,
  UserRound,
  Video,
} from 'lucide-react'

const iconStroke = 1.75

export const notificationTypeThemes = {
  appointment: {
    label: 'Appointment',
    icon: CalendarCheck2,
    listBg: 'bg-teal',
    listIcon: 'text-white',
    accent: 'bg-teal',
    gradient: 'from-teal-dark via-teal to-[#0F766E]',
    panel: 'from-teal-light to-white',
    border: 'border-teal/35',
    shadow: 'shadow-[0_12px_28px_rgba(14,165,160,0.16)]',
    chip: 'bg-teal-light text-teal-dark',
    badge: 'Confirmed',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    listBg: 'bg-teal-dark',
    listIcon: 'text-white',
    accent: 'bg-teal-dark',
    gradient: 'from-teal-dark via-teal to-[#0F766E]',
    panel: 'from-teal-light to-white',
    border: 'border-teal/35',
    shadow: 'shadow-[0_12px_28px_rgba(14,165,160,0.16)]',
    chip: 'bg-teal-light text-teal-dark',
    badge: 'Done',
  },
  medicine: {
    label: 'Medicine',
    icon: Pill,
    listBg: 'bg-navy',
    listIcon: 'text-white',
    accent: 'bg-navy',
    gradient: 'from-navy via-navy-light to-[#163A5F]',
    panel: 'from-[#E8EEF4] to-white',
    border: 'border-navy/25',
    shadow: 'shadow-[0_12px_28px_rgba(7,26,47,0.12)]',
    chip: 'bg-[#E8EEF4] text-navy',
    badge: 'Reminder',
  },
  lab: {
    label: 'Lab',
    icon: FlaskConical,
    listBg: 'bg-teal-dark',
    listIcon: 'text-white',
    accent: 'bg-teal-dark',
    gradient: 'from-teal via-teal-dark to-[#0F766E]',
    panel: 'from-teal-light to-white',
    border: 'border-teal/35',
    shadow: 'shadow-[0_12px_28px_rgba(11,133,124,0.14)]',
    chip: 'bg-teal-light text-teal-dark',
    badge: 'Lab update',
  },
  message: {
    label: 'Message',
    icon: MessageSquare,
    listBg: 'bg-amber',
    listIcon: 'text-white',
    accent: 'bg-amber',
    gradient: 'from-[#D97706] via-amber to-[#B45309]',
    panel: 'from-amber-light to-white',
    border: 'border-amber/40',
    shadow: 'shadow-[0_12px_28px_rgba(245,158,11,0.16)]',
    chip: 'bg-amber-light text-[#92400E]',
    badge: 'Inbox',
  },
  offer: {
    label: 'Offer',
    icon: Tag,
    listBg: 'bg-teal',
    listIcon: 'text-white',
    accent: 'bg-teal',
    gradient: 'from-teal-dark via-teal to-[#0B857C]',
    panel: 'from-teal-light to-white',
    border: 'border-teal/35',
    shadow: 'shadow-[0_12px_28px_rgba(14,165,160,0.14)]',
    chip: 'bg-teal-light text-teal-dark',
    badge: 'Special offer',
  },
  security: {
    label: 'Security',
    icon: ShieldAlert,
    listBg: 'bg-navy-light',
    listIcon: 'text-white',
    accent: 'bg-navy-light',
    gradient: 'from-navy via-navy-light to-[#1A4A6E]',
    panel: 'from-[#E8EEF4] to-white',
    border: 'border-navy/30',
    shadow: 'shadow-[0_12px_28px_rgba(7,26,47,0.14)]',
    chip: 'bg-[#E8EEF4] text-navy',
    badge: 'Alert',
  },
  booking: {
    label: 'Booking',
    icon: CalendarPlus,
    listBg: 'bg-teal',
    listIcon: 'text-white',
    accent: 'bg-teal',
    gradient: 'from-teal-dark via-teal to-[#0F766E]',
    panel: 'from-teal-light to-white',
    border: 'border-teal/35',
    shadow: 'shadow-[0_12px_28px_rgba(14,165,160,0.16)]',
    chip: 'bg-teal-light text-teal-dark',
    badge: 'Booked',
  },
  cancellation: {
    label: 'Cancellation',
    icon: CalendarX2,
    listBg: 'bg-[#DC2626]',
    listIcon: 'text-white',
    accent: 'bg-[#DC2626]',
    gradient: 'from-[#B91C1C] via-[#DC2626] to-[#991B1B]',
    panel: 'from-[#FEE2E2] to-white',
    border: 'border-red-300/70',
    shadow: 'shadow-[0_12px_28px_rgba(220,38,38,0.14)]',
    chip: 'bg-[#FEE2E2] text-[#991B1B]',
    badge: 'Cancelled',
  },
  report: {
    label: 'Report',
    icon: FileText,
    listBg: 'bg-teal-dark',
    listIcon: 'text-white',
    accent: 'bg-teal-dark',
    gradient: 'from-teal via-teal-dark to-[#0F766E]',
    panel: 'from-teal-light to-white',
    border: 'border-teal/35',
    shadow: 'shadow-[0_12px_28px_rgba(11,133,124,0.14)]',
    chip: 'bg-teal-light text-teal-dark',
    badge: 'Report ready',
  },
  video: {
    label: 'Video',
    icon: Video,
    listBg: 'bg-navy',
    listIcon: 'text-white',
    accent: 'bg-navy',
    gradient: 'from-navy via-navy-light to-[#163A5F]',
    panel: 'from-[#E8EEF4] to-white',
    border: 'border-navy/25',
    shadow: 'shadow-[0_12px_28px_rgba(7,26,47,0.12)]',
    chip: 'bg-[#E8EEF4] text-navy',
    badge: 'Video visit',
  },
  reminder: {
    label: 'Reminder',
    icon: Bell,
    listBg: 'bg-amber',
    listIcon: 'text-white',
    accent: 'bg-amber',
    gradient: 'from-[#D97706] via-amber to-[#B45309]',
    panel: 'from-amber-light to-white',
    border: 'border-amber/40',
    shadow: 'shadow-[0_12px_28px_rgba(245,158,11,0.16)]',
    chip: 'bg-amber-light text-[#92400E]',
    badge: 'Reminder',
  },
  slot: {
    label: 'Slot',
    icon: Clock,
    listBg: 'bg-teal',
    listIcon: 'text-white',
    accent: 'bg-teal',
    gradient: 'from-teal-dark via-teal to-[#0F766E]',
    panel: 'from-teal-light to-white',
    border: 'border-teal/35',
    shadow: 'shadow-[0_12px_28px_rgba(14,165,160,0.14)]',
    chip: 'bg-teal-light text-teal-dark',
    badge: 'Slot update',
  },
}

const fallbackTheme = {
  label: 'Update',
  icon: Bell,
  listBg: 'bg-navy',
  listIcon: 'text-white',
  accent: 'bg-navy',
  gradient: 'from-navy via-navy-light to-[#163A5F]',
  panel: 'from-[#E8EEF4] to-white',
  border: 'border-border-gray',
  shadow: 'shadow-[0_12px_28px_rgba(7,26,47,0.12)]',
  chip: 'bg-[#E8EEF4] text-navy',
  badge: 'Update',
}

export function getNotificationTheme(type) {
  return notificationTypeThemes[type] || fallbackTheme
}

export function getNotificationIcon(item) {
  if (item?.type === 'lab' && String(item?.title || '').includes('Sample')) return UserRound
  return getNotificationTheme(item?.type).icon
}

export default function NotificationDetailPanel({ item, statusLabel }) {
  const theme = getNotificationTheme(item.type)
  const Icon = getNotificationIcon(item)

  return (
    <div className={`mt-1 overflow-hidden rounded-2xl border ${theme.border} ${theme.shadow}`}>
      <div className={`relative px-4 py-3.5 bg-gradient-to-r ${theme.gradient} text-white`}>
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle at 88% 20%, rgba(255,255,255,0.35) 0%, transparent 42%), radial-gradient(circle at 12% 80%, rgba(255,255,255,0.16) 0%, transparent 40%)',
          }}
        />
        <div className="relative flex items-start gap-3">
          <span className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 ring-1 ring-white/30">
            <Icon className="w-5 h-5 text-white" strokeWidth={iconStroke} />
          </span>
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
              <CheckCircle2 className="w-3 h-3" strokeWidth={2.25} />
              {theme.badge}
            </span>
            <h4 className="text-[16px] font-bold leading-snug mt-1.5">{item.title}</h4>
          </div>
        </div>
      </div>

      <div className={`bg-gradient-to-b ${theme.panel} p-3.5 sm:p-4`}>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${theme.chip}`}>
            {theme.label}
          </span>
          <span className="inline-flex items-center rounded-full bg-white border border-[#E6EBF1] px-2.5 py-1 text-[11px] font-semibold text-navy">
            {item.timeLabel}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${
              item.unread ? 'bg-teal-light text-teal' : 'bg-[#F1F5F9] text-[#64748B]'
            }`}
          >
            {item.unread ? 'New' : 'Read'}
          </span>
        </div>

        <div className="rounded-xl bg-white border border-[#E6EBF1] px-3.5 py-3">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#94A3B8] mb-1.5">Details</p>
          <p className="text-[13px] sm:text-[14px] font-medium text-navy leading-relaxed whitespace-pre-line">
            {item.message}
          </p>
        </div>

        <p className="text-[11px] text-body-gray/70 mt-3">{statusLabel}</p>
      </div>
    </div>
  )
}
