import { healthRecordsFooterMock } from '../../data/mocks/healthRecords'
import { safetyIcon } from './healthIcons'

export default function HealthRecordsSafetyBanner() {
  const Icon = safetyIcon

  return (
    <footer className="rounded-2xl border border-emerald-100 bg-[#EAF8F2] px-5 py-4 flex items-center gap-4">
      <span className="w-11 h-11 rounded-full bg-white text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
        <Icon className="w-5 h-5" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-navy">{healthRecordsFooterMock.title}</p>
        <p className="text-xs sm:text-sm text-body-gray mt-1 leading-relaxed">{healthRecordsFooterMock.body}</p>
      </div>
      <span className="hidden sm:flex w-12 h-12 rounded-2xl bg-white/80 text-emerald-600 items-center justify-center shrink-0">
        <Icon className="w-6 h-6" strokeWidth={1.6} />
      </span>
    </footer>
  )
}
