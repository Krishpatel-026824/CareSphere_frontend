import { Lightbulb } from 'lucide-react'
import { useHealthTipCarousel } from '../../hooks/useHealthTipCarousel'
import { TipIllustration } from './TipIllustrations'

export default function HealthTipCard({ tips = [], loopMs = 4000 }) {
  const { tip, index } = useHealthTipCarousel(tips, loopMs)
  if (!tip) return null

  return (
    <section className="relative overflow-hidden rounded-2xl h-full min-h-[280px] shadow-sm bg-gradient-to-br from-[#0EA5A0] via-[#0B948F] to-[#0B857C] text-white">
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
        className="relative z-10 h-full px-5 py-5 sm:px-6 sm:py-5 flex gap-4 animate-[fadeIn_400ms_ease]"
      >
        <div className="flex-1 min-w-0 flex flex-col justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Lightbulb className="w-4 h-4 text-white" strokeWidth={1.75} />
            </div>
            <h2 className="font-display text-[15px] sm:text-base font-bold tracking-tight">
              Health tip of the day
            </h2>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="font-display text-[17px] sm:text-[19px] font-bold leading-snug tracking-tight">
              {tip.tip}
            </p>
            <p className="font-sans text-[13px] sm:text-[14px] text-white/88 leading-relaxed">
              {tip.subtitle}
            </p>
            {tip.extra ? (
              <p className="font-sans text-[12px] sm:text-[13px] text-white/75 font-medium leading-snug rounded-xl bg-white/10 px-3 py-2">
                {tip.extra}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-1.5">
            {tips.map((item, dotIndex) => (
              <span
                key={item.id}
                className={`h-1.5 rounded-full ${dotIndex === index ? 'w-5 bg-white' : 'w-1.5 bg-white/45'}`}
              />
            ))}
          </div>
        </div>

        <div className="hidden sm:flex w-[100px] lg:w-[112px] items-center justify-center shrink-0 self-center">
          <TipIllustration type={tip.illustration} />
        </div>
      </div>
    </section>
  )
}
