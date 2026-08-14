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

export default function ExpertiseChips({ chips = [] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(148px,1fr))] gap-2">
      {chips.map((chip) => {
        const Icon = icons[chip.icon] || Stethoscope
        return (
          <span
            key={chip.label}
            className="inline-flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-full bg-[#EBF5FF] px-3 py-2 text-[12px] font-medium text-[#1E2124]"
          >
            <Icon className="h-3.5 w-3.5 shrink-0 text-[#2F80ED]" strokeWidth={1.9} />
            <span className="truncate">{chip.label}</span>
          </span>
        )
      })}
    </div>
  )
}
