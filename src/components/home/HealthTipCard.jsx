import { Lightbulb } from 'lucide-react'
import { useHealthTipCarousel } from '../../hooks/useHealthTipCarousel'
import { TipIllustration } from './TipIllustrations'

export default function HealthTipCard({ tips = [], loopMs = 4000 }) {
  const { tip, index } = useHealthTipCarousel(tips, loopMs)
  if (!tip) return null

  return (
    <section className="relative overflow-hidden rounded-2xl h-full min-h-0 shadow-sm bg-gradient-to-br from-[#0EA5A0] via-[#0B948F] to-[#0B857C] text-white flex flex-col">
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 90% 55%, rgba(255,255,255,0.2) 0%, transparent 42%), radial-gradient(circle at 8% 15%, rgba(255,255,255,0.1) 0%, transparent 32%)',
        }}
      />

      <div
        key={tip.id}
        className="relative z-10 flex-1 min-h-0 px-3.5 py-3.5 sm:px-4 sm:py-4 flex gap-3 animate-[fadeIn_400ms_ease]"
      >
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Lightbulb className="w-3.5 h-3.5 text-white" strokeWidth={1.75} />
            </div>
            <h2 className="font-display text-[14px] sm:text-[15px] font-bold tracking-tight">
              Health tip of the day
            </h2>
          </div>

          <div className="flex flex-col gap-1.5 flex-1 justify-center min-h-0 py-2">
            <p className="font-display text-[15px] sm:text-[16px] font-bold leading-snug tracking-tight">
              {tip.tip}
            </p>
            <p className="font-sans text-[12px] sm:text-[13px] text-white/88 leading-snug">
              {tip.subtitle}
            </p>
            {tip.extra ? (
              <p className="font-sans text-[11px] sm:text-[12px] text-white/75 font-medium leading-snug rounded-lg bg-white/10 px-2.5 py-1.5">
                {tip.extra}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-1.5 mt-auto shrink-0">
            {tips.map((item, dotIndex) => (
              <span
                key={item.id}
                className={`h-1.5 rounded-full ${dotIndex === index ? 'w-4 bg-white' : 'w-1.5 bg-white/45'}`}
              />
            ))}
          </div>
        </div>

        <div className="hidden sm:flex w-[72px] lg:w-[84px] items-center justify-center shrink-0 self-center">
          <TipIllustration type={tip.illustration} />
        </div>
      </div>
    </section>
  )
}
