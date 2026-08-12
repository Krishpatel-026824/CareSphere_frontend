import { Lightbulb } from 'lucide-react'
import { WaterGlassIllustration } from './WaterGlassIllustration'

const iconStroke = 1.75

export default function HealthTipCard({ tip, subtitle }) {
  return (
    <section className="relative overflow-hidden rounded-[24px] min-h-[190px] flex-1 shadow-[0_8px_30px_rgba(7,26,47,0.08)] bg-gradient-to-r from-[#0EA5A0] via-[#0B948F] to-[#0B857C] text-white">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 78% 72%, rgba(255,255,255,0.22) 0%, transparent 42%), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 35%)',
        }}
      />

      <div className="relative z-10 h-full p-5 sm:p-6 flex items-stretch gap-3">
        <div className="flex-1 min-w-0 flex flex-col gap-3 pr-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Lightbulb className="w-[18px] h-[18px] text-white" strokeWidth={iconStroke} />
            </div>
            <h2 className="text-[15px] sm:text-base font-semibold tracking-tight">Health tip of the day</h2>
          </div>

          <span className="w-10 h-0.5 rounded-full bg-white/35" aria-hidden="true" />

          <div className="flex flex-col gap-2 mt-auto">
            <p className="text-[13px] sm:text-sm text-white leading-relaxed max-w-[280px]">{tip}</p>
            <p className="text-xs text-white/75 italic leading-relaxed max-w-[260px]">{subtitle}</p>
          </div>
        </div>

        <div className="hidden sm:flex items-end justify-end shrink-0 self-end pb-1">
          <WaterGlassIllustration />
        </div>
      </div>

      <div className="sm:hidden absolute right-3 bottom-2 opacity-80 pointer-events-none">
        <WaterGlassIllustration />
      </div>
    </section>
  )
}
