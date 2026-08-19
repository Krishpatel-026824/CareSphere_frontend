import { Lightbulb } from 'lucide-react'
import { useHealthTipCarousel } from '../../hooks/useHealthTipCarousel'
import { TipIllustration } from './TipIllustrations'

const iconStroke = 1.75

export default function HealthTipCard({ tips = [], loopMs = 4000 }) {
  const { tip, index } = useHealthTipCarousel(tips, loopMs)
  if (!tip) return null

  return (
    <section className="relative overflow-hidden rounded-[20px] w-full shrink-0 shadow-[0_8px_30px_rgba(7,26,47,0.08)] bg-gradient-to-r from-[#0EA5A0] via-[#0B948F] to-[#0B857C] text-white">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 88% 50%, rgba(255,255,255,0.22) 0%, transparent 46%), radial-gradient(circle at 12% 20%, rgba(255,255,255,0.08) 0%, transparent 35%)',
        }}
      />

      <div
        key={tip.id}
        className="relative z-10 h-full px-5 py-5 sm:px-6 sm:py-5 flex items-stretch gap-5 animate-[fadeIn_400ms_ease]"
      >
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Lightbulb className="w-[16px] h-[16px] text-white" strokeWidth={iconStroke} />
            </div>
            <h2 className="text-[15px] sm:text-[16px] font-semibold tracking-tight">Health tip of the day</h2>
          </div>

          <span className="w-10 h-px bg-white/40 mt-3" aria-hidden="true" />

          <p className="text-[18px] sm:text-[20px] text-white font-bold leading-snug mt-auto">{tip.tip}</p>
          <p className="text-[14px] sm:text-[15px] text-white/85 font-medium italic leading-snug mt-2.5">{tip.subtitle}</p>
          {tip.extra ? <p className="text-[13px] sm:text-[14px] text-white/70 font-semibold leading-snug mt-2">💡 {tip.extra}</p> : null}

          <div className="flex items-center gap-1.5 mt-auto pt-4">
            {tips.map((item, dotIndex) => (
              <span
                key={item.id}
                className={`h-1.5 rounded-full ${dotIndex === index ? 'w-5 bg-white' : 'w-1.5 bg-white/45'}`}
              />
            ))}
          </div>
        </div>

        <div className="hidden sm:flex w-[110px] sm:w-[120px] items-center justify-center shrink-0">
          <TipIllustration type={tip.illustration} />
        </div>
      </div>
    </section>
  )
}
