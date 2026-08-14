import { Heart } from 'lucide-react'

export default function AuthBrandMark({ compact = false }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`rounded-full bg-teal flex items-center justify-center shadow-[0_8px_24px_rgba(14,165,160,0.35)] ${
          compact ? 'w-11 h-11' : 'w-[52px] h-[52px]'
        }`}
      >
        <Heart className={compact ? 'w-5 h-5 text-white' : 'w-[22px] h-[22px] text-white'} strokeWidth={1.6} />
      </div>
      <p className="font-display mt-3.5 text-[22px] font-bold text-navy tracking-tight">CareSphere</p>
      <p className="mt-1.5 text-[10px] tracking-[0.22em] uppercase text-teal font-semibold">Health Dashboard</p>
    </div>
  )
}
