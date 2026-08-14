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
  'heart-rate': 'bg-[#FDECEC] text-[#EF4444]',
  bp: 'bg-[#E6F7F6] text-teal',
  sleep: 'bg-[#EEEBFF] text-[#6366F1]',
  steps: 'bg-[#FFF4E5] text-[#F59E0B]',
  calories: 'bg-[#FFEDD5] text-[#F97316]',
  water: 'bg-[#E0F2FE] text-[#0EA5E9]',
  spo2: 'bg-[#D1FAE5] text-[#10B981]',
}

export default function HealthOverviewCard({ card, gaugeSize = 100 }) {
  const Icon = icons[card.id] || Heart
  const filled = card.id === 'heart-rate'
  const valueTextClass =
    gaugeSize <= 80
      ? 'text-sm sm:text-base font-bold text-navy tracking-tight leading-none'
      : 'text-base sm:text-lg xl:text-xl font-bold text-navy tracking-tight leading-none'

  return (
    <article className="h-full bg-white rounded-2xl border border-[#E8EEF4] shadow-[0_4px_18px_rgba(7,26,47,0.04)] px-3 py-3.5 sm:px-4 sm:py-4 flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <p className="text-[11px] sm:text-xs font-medium text-[#8B97A8]">{card.label}</p>
        <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 ${iconStyles[card.id]}`}>
          <Icon
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            strokeWidth={1.75}
            fill={filled ? 'currentColor' : 'none'}
          />
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <SemiGauge percent={card.percent} color={card.gaugeColor} size={gaugeSize} strokeWidth={8}>
          <p className={`whitespace-nowrap text-center tabular-nums ${valueTextClass}`}>{card.value}</p>
        </SemiGauge>
        <span className={`mt-1.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${card.statusTone}`}>
          {card.status}
        </span>
      </div>

      <div className="mt-3 w-full">
        <Sparkline points={card.sparkline} color={card.sparkColor} width={140} height={26} />
      </div>
    </article>
  )
}
