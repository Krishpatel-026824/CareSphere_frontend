import { Activity, Droplets, Flame, Footprints, Heart, Moon, Wind } from 'lucide-react'
import SemiGauge from '../SemiGauge'
import Sparkline from './Sparkline'

const icons = {
  'heart-rate': Heart,
  bp: Activity,
  sleep: Moon,
  steps: Footprints,
  calories: Flame,
  water: Droplets,
  spo2: Wind,
}

const iconStyles = {
  'heart-rate': 'bg-rose-100 text-rose-500',
  bp: 'bg-teal-light text-teal',
  sleep: 'bg-indigo-100 text-indigo-500',
  steps: 'bg-amber-100 text-amber-600',
  calories: 'bg-orange-100 text-orange-500',
  water: 'bg-sky-100 text-sky-600',
  spo2: 'bg-emerald-100 text-emerald-600',
}

export default function HealthOverviewCard({ card, gaugeSize = 100 }) {
  const Icon = icons[card.id] || Heart
  const valueTextClass =
    gaugeSize <= 80
      ? 'text-sm sm:text-base font-bold text-navy tracking-tight leading-none'
      : 'text-base sm:text-lg xl:text-xl font-bold text-navy tracking-tight leading-none'

  return (
    <article className="bg-white rounded-2xl border border-border-gray shadow-sm px-3 py-3.5 sm:px-4 sm:py-4 flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-[11px] sm:text-xs font-medium text-body-gray">{card.label}</p>
        <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 ${iconStyles[card.id]}`}>
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.75} />
        </span>
      </div>

      <div className="flex flex-col items-center">
        <SemiGauge percent={card.percent} color={card.gaugeColor} size={gaugeSize} strokeWidth={8}>
          <p className={`whitespace-nowrap text-center tabular-nums ${valueTextClass}`}>{card.value}</p>
        </SemiGauge>
        <span className={`mt-1.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${card.statusTone}`}>
          {card.status}
        </span>
      </div>

      <div className="mt-2.5 flex justify-center">
        <Sparkline points={card.sparkline} color={card.sparkColor} width={110} height={28} />
      </div>
    </article>
  )
}
