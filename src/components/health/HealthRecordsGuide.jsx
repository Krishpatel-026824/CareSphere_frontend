import { BookOpen } from 'lucide-react'
import { healthRecordsGuideMock, healthRecordsTipsMock } from '../../data/mocks/healthRecords'
import { tipIcons } from './healthIcons'

export default function HealthRecordsGuide() {
  return (
    <section className="w-full rounded-2xl border border-[#E6EBF1] bg-white overflow-hidden shadow-sm">
      <div className="px-5 sm:px-7 pt-6 sm:pt-7 pb-5 border-b border-[#E6EBF1] bg-[#F8FAFC]">
        <div className="flex items-start gap-3">
          <span className="w-11 h-11 rounded-xl bg-navy text-white flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" strokeWidth={1.8} />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-body-gray">Quick guide</p>
            <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-navy tracking-tight">
              {healthRecordsGuideMock.title}
            </h2>
            <p className="mt-1.5 text-sm text-body-gray max-w-2xl leading-relaxed">
              {healthRecordsGuideMock.subtitle}
            </p>
          </div>
        </div>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E6EBF1]">
        {healthRecordsTipsMock.map((tip) => {
          const Icon = tipIcons[tip.icon]
          return (
            <li key={tip.id} className="p-4 sm:p-5">
              <article className="h-full">
                <div className="flex items-center justify-between gap-3 mb-3.5">
                  <span className="w-11 h-11 rounded-xl bg-[#EEF2F6] text-navy flex items-center justify-center">
                    {Icon ? <Icon className="w-5 h-5" strokeWidth={1.85} /> : null}
                  </span>
                  <span className="inline-flex items-center justify-center min-w-8 h-8 rounded-full text-[13px] font-bold bg-[#E2E8F0] text-navy">
                    {tip.step}
                  </span>
                </div>

                <h3 className="text-[15px] sm:text-base font-bold text-navy leading-snug">{tip.title}</h3>
                <p className="mt-2 text-sm text-body-gray leading-relaxed">{tip.text}</p>
              </article>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
