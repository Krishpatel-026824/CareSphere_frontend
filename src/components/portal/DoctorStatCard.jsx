import { BadgeCheck, Bell, CalendarClock, ChevronRight, Hourglass, UsersRound, BarChart3 } from 'lucide-react'
import {
  CompletedIllustration,
  UpcomingIllustration,
  WaitingIllustration,
} from './DoctorStatIllustrations'

const statLook = {
  waiting: {
    icon: Hourglass,
    footerIcon: Bell,
    Illustration: WaitingIllustration,
    stripe: 'bg-[#F59E0B]',
    iconWrap: 'bg-[#FFF4E5] text-[#F59E0B]',
    value: 'text-[#F59E0B]',
    footer: 'bg-[#FFF6EB] text-[#D97706]',
  },
  upcoming: {
    icon: CalendarClock,
    footerIcon: UsersRound,
    Illustration: UpcomingIllustration,
    stripe: 'bg-teal',
    iconWrap: 'bg-teal-light text-teal',
    value: 'text-teal',
    footer: 'bg-[#E8F7F6] text-navy',
  },
  done: {
    icon: BadgeCheck,
    footerIcon: BarChart3,
    Illustration: CompletedIllustration,
    stripe: 'bg-[#22C55E]',
    iconWrap: 'bg-[#ECFDF5] text-[#16A34A]',
    value: 'text-[#16A34A]',
    footer: 'bg-[#F0FDF4] text-navy',
  },
}

export default function DoctorStatCard({ item, onSelect }) {
  const look = statLook[item.id] || statLook.upcoming
  const Icon = look.icon
  const FooterIcon = look.footerIcon
  const Illustration = look.Illustration

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item.id)}
      className="relative overflow-hidden rounded-2xl border border-border-gray bg-white text-left shadow-[0_8px_24px_rgba(15,23,42,0.06)] cursor-pointer hover:shadow-md transition-shadow"
    >
      <span className={`absolute left-0 top-0 bottom-0 w-[5px] ${look.stripe}`} aria-hidden="true" />

      <div className="flex items-start gap-3 pl-5 pr-4 pt-4 pb-3">
        <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${look.iconWrap}`}>
          <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
        </span>
        <div className="min-w-0 pt-0.5">
          <p className="text-[15px] font-bold text-navy leading-none">{item.label}</p>
          <p className={`mt-2 text-[40px] font-bold tabular-nums leading-none tracking-tight ${look.value}`}>
            {item.value}
          </p>
          <p className="text-[12px] text-body-gray mt-2 leading-snug">{item.hint}</p>
        </div>
        <div className="ml-auto shrink-0 self-center">
          <Illustration />
        </div>
      </div>

      <div className={`mx-3 mb-3 rounded-xl px-3 py-2.5 flex items-center gap-2 ${look.footer}`}>
        <FooterIcon className="w-4 h-4 shrink-0" strokeWidth={1.8} />
        <p className="flex-1 min-w-0 text-[12px] font-semibold truncate">{item.footer}</p>
        <ChevronRight className="w-4 h-4 shrink-0" strokeWidth={2} />
      </div>
    </button>
  )
}
