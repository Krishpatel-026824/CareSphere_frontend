import {
  Activity,
  Apple,
  Baby,
  CircleDot,
  Droplet,
  Droplets,
  Dumbbell,
  Flower2,
  Gauge,
  Heart,
  HeartPulse,
  Leaf,
  Scissors,
  ShieldAlert,
  ShieldCheck,
  ShieldPlus,
  Sparkles,
  Stethoscope,
  Sun,
  Syringe,
  Thermometer,
  TrendingUp,
} from 'lucide-react'

const icons = {
  activity: Activity,
  apple: Apple,
  baby: Baby,
  'circle-dot': CircleDot,
  droplet: Droplet,
  droplets: Droplets,
  dumbbell: Dumbbell,
  flower: Flower2,
  gauge: Gauge,
  heart: Heart,
  'heart-pulse': HeartPulse,
  leaf: Leaf,
  scissors: Scissors,
  'shield-alert': ShieldAlert,
  'shield-check': ShieldCheck,
  'shield-plus': ShieldPlus,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  sun: Sun,
  syringe: Syringe,
  thermometer: Thermometer,
  'trending-up': TrendingUp,
}

export default function ExpertiseChips({ chips = [], compact = false }) {
  return (
    <div className={`grid ${compact ? 'grid-cols-2 gap-1.5' : 'grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(148px,1fr))] gap-2'}`}>
      {chips.map((chip) => {
        const Icon = icons[chip.icon] || Stethoscope
        return (
          <span
            key={chip.label}
            className={`inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-teal-light/70 font-semibold text-navy ${
              compact ? 'min-h-8 px-2.5 py-1.5 text-[12px]' : 'min-h-[44px] px-3.5 py-2.5 text-[13px] sm:text-sm'
            }`}
          >
            <Icon className={`shrink-0 text-teal ${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} strokeWidth={1.9} />
            <span className="truncate">{chip.label}</span>
          </span>
        )
      })}
    </div>
  )
}
