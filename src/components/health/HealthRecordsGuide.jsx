import { Sparkles } from 'lucide-react'
import { healthRecordsGuideMock, healthRecordsTipsMock } from '../../data/mocks/healthRecords'
import { tipIcons } from './healthIcons'

const accentStyles = {
  emerald: {
    card: 'from-emerald-50 via-white to-teal-50 border-emerald-200/80 hover:border-emerald-400 hover:shadow-emerald-100/80',
    icon: 'bg-gradient-to-br from-emerald-500 to-teal text-white shadow-emerald-200/70',
    step: 'bg-emerald-500 text-white',
    glow: 'bg-emerald-300/40',
    bar: 'from-emerald-400 to-teal',
  },
  sky: {
    card: 'from-sky-50 via-white to-cyan-50 border-sky-200/80 hover:border-sky-400 hover:shadow-sky-100/80',
    icon: 'bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-sky-200/70',
    step: 'bg-sky-500 text-white',
    glow: 'bg-sky-300/40',
    bar: 'from-sky-400 to-cyan-400',
  },
  amber: {
    card: 'from-amber-50 via-white to-orange-50 border-amber-200/80 hover:border-amber-400 hover:shadow-amber-100/80',
    icon: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-amber-200/70',
    step: 'bg-amber-500 text-white',
    glow: 'bg-amber-300/40',
    bar: 'from-amber-400 to-orange-400',
  },
}

export default function HealthRecordsGuide() {
  return (
    <section className="w-full rounded-3xl border border-teal/20 bg-white overflow-hidden shadow-[0_12px_40px_rgba(7,26,47,0.06)]">
      <div className="relative px-5 sm:px-7 pt-6 sm:pt-7 pb-6 overflow-hidden bg-[linear-gradient(120deg,#ECFDF5_0%,#E0F2FE_45%,#FFF7ED_100%)]">
        <div className="pointer-events-none absolute -top-8 right-8 w-28 h-28 rounded-full bg-teal/20 blur-2xl" aria-hidden />
        <div className="pointer-events-none absolute bottom-0 left-1/3 w-24 h-24 rounded-full bg-amber-300/30 blur-2xl" aria-hidden />

        <div className="relative flex items-start gap-3">
          <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal to-sky-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-teal/25">
            <Sparkles className="w-5 h-5" strokeWidth={1.8} />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-teal">Quick guide</p>
            <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-navy tracking-tight">
              {healthRecordsGuideMock.title}
            </h2>
            <p className="mt-1.5 text-sm text-body-gray max-w-2xl leading-relaxed">
              {healthRecordsGuideMock.subtitle}
            </p>
          </div>
        </div>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-5 bg-bg-gray/40">
        {healthRecordsTipsMock.map((tip) => {
          const Icon = tipIcons[tip.icon]
          const tone = accentStyles[tip.accent] || accentStyles.emerald
          return (
            <li key={tip.id}>
              <article
                className={`relative h-full overflow-hidden rounded-2xl border bg-gradient-to-br p-4 sm:p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${tone.card}`}
              >
                <div className={`pointer-events-none absolute -right-6 -top-6 w-20 h-20 rounded-full blur-xl ${tone.glow}`} aria-hidden />
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone.bar}`} aria-hidden />

                <div className="relative flex items-center justify-between gap-3 mb-3.5">
                  <span
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${tone.icon}`}
                  >
                    {Icon ? <Icon className="w-5 h-5" strokeWidth={1.85} /> : null}
                  </span>
                  <span
                    className={`inline-flex items-center justify-center min-w-8 h-8 rounded-full text-[13px] font-bold shadow-sm ${tone.step}`}
                  >
                    {tip.step}
                  </span>
                </div>

                <h3 className="relative text-[15px] sm:text-base font-bold text-navy leading-snug">
                  {tip.title}
                </h3>
                <p className="relative mt-2 text-sm text-body-gray leading-relaxed">{tip.text}</p>
              </article>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
