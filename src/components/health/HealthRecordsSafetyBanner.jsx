import { healthRecordsFooterMock } from '../../data/mocks/healthRecords'
import { safetyIcon } from './healthIcons'

export default function HealthRecordsSafetyBanner() {
  const Icon = safetyIcon

  return (
    <footer className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-100 via-[#D1FAE5] to-teal-light px-5 py-4 flex items-center gap-4 shadow-lg shadow-emerald-100/40">
      <span className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-teal text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
        <Icon className="w-5 h-5" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-navy">{healthRecordsFooterMock.title}</p>
        <p className="text-xs sm:text-sm text-body-gray mt-1 leading-relaxed">{healthRecordsFooterMock.body}</p>
      </div>
      <span className="hidden sm:flex w-12 h-12 rounded-2xl bg-white/60 text-emerald-600 items-center justify-center shrink-0 border border-emerald-200">
        <Icon className="w-6 h-6" strokeWidth={1.6} />
      </span>
    </footer>
  )
}
