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
    listBg: 'bg-emerald-50',
    listIcon: 'text-emerald-600',
    gradient: 'from-[#059669] via-[#10B981] to-[#047857]',
    panel: 'from-[#ECFDF5] to-white',
    border: 'border-emerald-200/70',
    shadow: 'shadow-[0_12px_28px_rgba(16,185,129,0.14)]',
    chip: 'bg-[#D1FAE5] text-[#065F46]',
    badge: 'Confirmed',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    listBg: 'bg-teal-50',
    listIcon: 'text-teal',
    gradient: 'from-[#0D9488] via-[#0EA5A0] to-[#0F766E]',
    panel: 'from-[#F0FDFA] to-white',
    border: 'border-teal/30',
    shadow: 'shadow-[0_12px_28px_rgba(14,165,160,0.14)]',
    chip: 'bg-[#CCFBF1] text-[#115E59]',
    badge: 'Done',
  },
  medicine: {
    label: 'Medicine',
    icon: Pill,
    listBg: 'bg-sky-50',
    listIcon: 'text-sky-600',
    gradient: 'from-[#0284C7] via-[#0EA5E9] to-[#0369A1]',
    panel: 'from-[#F0F9FF] to-white',
    border: 'border-sky-200/70',
    shadow: 'shadow-[0_12px_28px_rgba(14,165,233,0.14)]',
    chip: 'bg-[#E0F2FE] text-[#075985]',
    badge: 'Reminder',
  },
  lab: {
    label: 'Lab',
    icon: FlaskConical,
    listBg: 'bg-violet-50',
    listIcon: 'text-violet-600',
    gradient: 'from-[#0EA5A0] via-[#14B8A6] to-[#0D9488]',
    panel: 'from-[#F0FDFA] to-white',
    border: 'border-teal/20',
    shadow: 'shadow-[0_12px_28px_rgba(14,165,160,0.12)]',
    chip: 'bg-[#CCFBF1] text-[#0F766E]',
    badge: 'Lab update',
  },
  message: {
    label: 'Message',
    icon: MessageSquare,
    listBg: 'bg-amber-50',
    listIcon: 'text-amber-600',
    gradient: 'from-[#D97706] via-[#F59E0B] to-[#B45309]',
    panel: 'from-[#FFFBEB] to-white',
    border: 'border-amber-200/70',
    shadow: 'shadow-[0_12px_28px_rgba(245,158,11,0.14)]',
    chip: 'bg-[#FEF3C7] text-[#92400E]',
    badge: 'Inbox',
  },
  offer: {
    label: 'Offer',
    icon: Tag,
    listBg: 'bg-rose-50',
    listIcon: 'text-rose-600',
    gradient: 'from-[#E11D48] via-[#F43F5E] to-[#BE123C]',
    panel: 'from-[#FFF1F2] to-white',
    border: 'border-rose-200/70',
    shadow: 'shadow-[0_12px_28px_rgba(244,63,94,0.14)]',
    chip: 'bg-[#FFE4E6] text-[#9F1239]',
    badge: 'Special offer',
  },
  security: {
    label: 'Security',
    icon: ShieldAlert,
    listBg: 'bg-cyan-50',
    listIcon: 'text-cyan-600',
    gradient: 'from-[#0891B2] via-[#06B6D4] to-[#0E7490]',
    panel: 'from-[#ECFEFF] to-white',
    border: 'border-cyan-200/70',
    shadow: 'shadow-[0_12px_28px_rgba(6,182,212,0.14)]',
    chip: 'bg-[#CFFAFE] text-[#155E75]',
    badge: 'Alert',
  },
  booking: {
    label: 'Booking',
    icon: CalendarPlus,
    listBg: 'bg-emerald-50',
    listIcon: 'text-emerald-600',
    gradient: 'from-[#059669] via-[#10B981] to-[#047857]',
    panel: 'from-[#ECFDF5] to-white',
    border: 'border-emerald-200/70',
    shadow: 'shadow-[0_12px_28px_rgba(16,185,129,0.14)]',
    chip: 'bg-[#D1FAE5] text-[#065F46]',
    badge: 'Booked',
  },
  cancellation: {
    label: 'Cancellation',
    icon: CalendarX2,
    listBg: 'bg-rose-50',
    listIcon: 'text-rose-600',
    gradient: 'from-[#E11D48] via-[#F43F5E] to-[#BE123C]',
    panel: 'from-[#FFF1F2] to-white',
    border: 'border-rose-200/70',
    shadow: 'shadow-[0_12px_28px_rgba(244,63,94,0.14)]',
    chip: 'bg-[#FFE4E6] text-[#9F1239]',
    badge: 'Cancelled',
  },
  report: {
    label: 'Report',
    icon: FileText,
    listBg: 'bg-violet-50',
    listIcon: 'text-violet-600',
    gradient: 'from-[#7C3AED] via-[#8B5CF6] to-[#6D28D9]',
    panel: 'from-[#F5F3FF] to-white',
    border: 'border-violet-200/70',
    shadow: 'shadow-[0_12px_28px_rgba(139,92,246,0.14)]',
    chip: 'bg-[#EDE9FE] text-[#5B21B6]',
    badge: 'Report ready',
  },
  video: {
    label: 'Video',
    icon: Video,
    listBg: 'bg-sky-50',
    listIcon: 'text-sky-600',
    gradient: 'from-[#0284C7] via-[#0EA5E9] to-[#0369A1]',
    panel: 'from-[#F0F9FF] to-white',
    border: 'border-sky-200/70',
    shadow: 'shadow-[0_12px_28px_rgba(14,165,233,0.14)]',
    chip: 'bg-[#E0F2FE] text-[#075985]',
    badge: 'Video visit',
  },
  reminder: {
    label: 'Reminder',
    icon: Bell,
    listBg: 'bg-amber-50',
    listIcon: 'text-amber-600',
    gradient: 'from-[#D97706] via-[#F59E0B] to-[#B45309]',
    panel: 'from-[#FFFBEB] to-white',
    border: 'border-amber-200/70',
    shadow: 'shadow-[0_12px_28px_rgba(245,158,11,0.14)]',
    chip: 'bg-[#FEF3C7] text-[#92400E]',
    badge: 'Reminder',
  },
  slot: {
    label: 'Slot',
    icon: Clock,
    listBg: 'bg-cyan-50',
    listIcon: 'text-cyan-600',
    gradient: 'from-[#0891B2] via-[#06B6D4] to-[#0E7490]',
    panel: 'from-[#ECFEFF] to-white',
    border: 'border-cyan-200/70',
    shadow: 'shadow-[0_12px_28px_rgba(6,182,212,0.14)]',
    chip: 'bg-[#CFFAFE] text-[#155E75]',
    badge: 'Slot update',
  },
}

const fallbackTheme = {
  label: 'Update',
  icon: Bell,
  listBg: 'bg-gray-50',
  listIcon: 'text-gray-600',
  gradient: 'from-[#475569] via-[#64748B] to-[#334155]',
  panel: 'from-[#F8FAFC] to-white',
  border: 'border-slate-200',
  shadow: 'shadow-[0_12px_28px_rgba(71,85,105,0.12)]',
  chip: 'bg-[#E2E8F0] text-[#334155]',
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
