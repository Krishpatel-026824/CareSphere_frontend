import { BadgeCheck, CalendarDays, Users } from 'lucide-react'

const statConfig = {
  Today: {
    icon: CalendarDays,
    card: 'bg-gradient-to-br from-[#E8F7F6] to-white border-[#B8EBE8]/80',
    iconWrap: 'bg-teal text-white shadow-[0_4px_12px_-4px_rgba(14,165,160,0.55)]',
  },
  Confirmed: {
    icon: BadgeCheck,
    card: 'bg-gradient-to-br from-[#F0FDF4] to-white border-[#BBF7D0]/80',
    iconWrap: 'bg-[#16A34A] text-white shadow-[0_4px_12px_-4px_rgba(22,163,74,0.45)]',
  },
  Queue: {
    icon: Users,
    card: 'bg-gradient-to-br from-[#FFF6EB] to-white border-[#FDE68A]/80',
    iconWrap: 'bg-[#D97706] text-white shadow-[0_4px_12px_-4px_rgba(217,119,6,0.45)]',
  },
}

export default function DoctorScheduleStatStrip({ stats = [] }) {
  return (
    <div className="shrink-0 w-full sm:w-auto overflow-x-auto scroll-x">
      <div className="flex items-stretch gap-2 sm:gap-2.5 min-w-max sm:min-w-0">
        {stats.map((stat) => {
          const config = statConfig[stat.label] || statConfig.Today
          const Icon = config.icon

          return (
            <div
              key={stat.label}
              className={`flex items-center gap-2 sm:gap-2.5 rounded-2xl border px-2.5 sm:px-3 py-2 sm:py-2.5 min-w-[96px] sm:min-w-[118px] shadow-sm ${config.card}`}
            >
              <span
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${config.iconWrap}`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.1} />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-[11px] font-semibold text-body-gray leading-none truncate">
                  {stat.label}
                </p>
                <p className="font-display text-lg sm:text-[22px] font-bold text-navy leading-none mt-1 tabular-nums">
                  {stat.value}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
