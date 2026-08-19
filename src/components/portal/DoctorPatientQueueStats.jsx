import { useMemo } from 'react'
import { BadgeCheck, CalendarClock, CircleCheckBig } from 'lucide-react'

const statItems = [
  {
    key: 'upcoming',
    label: 'Upcoming',
    icon: CalendarClock,
    card: 'bg-sky-50/90 border-sky-100',
    iconWrap: 'bg-sky-500 text-white shadow-[0_4px_12px_rgba(14,165,233,0.28)]',
    value: 'text-sky-800',
    labelTone: 'text-sky-600',
  },
  {
    key: 'confirmed',
    label: 'Confirmed',
    icon: CircleCheckBig,
    card: 'bg-emerald-50/90 border-emerald-100',
    iconWrap: 'bg-emerald-500 text-white shadow-[0_4px_12px_rgba(16,185,129,0.28)]',
    value: 'text-emerald-800',
    labelTone: 'text-emerald-600',
  },
  {
    key: 'completed',
    label: 'Completed',
    icon: BadgeCheck,
    card: 'bg-slate-50 border-slate-200',
    iconWrap: 'bg-slate-500 text-white shadow-[0_4px_12px_rgba(100,116,139,0.24)]',
    value: 'text-slate-800',
    labelTone: 'text-slate-500',
  },
]

export default function DoctorPatientQueueStats({ patients = [] }) {
  const counts = useMemo(() => {
    const totals = { upcoming: 0, confirmed: 0, completed: 0 }
    patients.forEach((patient) => {
      const status = patient.nextVisit?.status
      if (status === 'Upcoming') totals.upcoming += 1
      else if (status === 'Confirmed') totals.confirmed += 1
      else if (status === 'Completed') totals.completed += 1
    })
    return totals
  }, [patients])

  return (
    <div className="shrink-0 flex flex-wrap items-stretch justify-end gap-2.5">
      {statItems.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.key}
            className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 min-w-[124px] ${item.card}`}
          >
            <span
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.iconWrap}`}
            >
              <Icon className="w-[18px] h-[18px]" strokeWidth={2.25} />
            </span>
            <div className="min-w-0 flex flex-col">
              <span className={`text-lg font-bold leading-none tabular-nums ${item.value}`}>
                {counts[item.key]}
              </span>
              <span className={`text-xs font-semibold leading-snug mt-1 ${item.labelTone}`}>
                {item.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
