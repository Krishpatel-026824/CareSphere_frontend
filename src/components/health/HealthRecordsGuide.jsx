import { healthRecordsGuideMock, healthRecordsTipsMock } from '../../data/mocks/healthRecords'
import { guideHeaderIcon } from './healthIcons'
import HealthTipCard from './HealthTipCard'

export default function HealthRecordsGuide() {
  const HeaderIcon = guideHeaderIcon

  return (
    <section className="w-full rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-5 sm:p-6 shadow-lg shadow-indigo-100/40">
      <div className="flex items-start gap-3">
        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
          <HeaderIcon className="w-5 h-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-bold text-navy">{healthRecordsGuideMock.title}</h2>
          <p className="text-sm text-body-gray mt-1">{healthRecordsGuideMock.subtitle}</p>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-3">
        {healthRecordsTipsMock.map((tip) => (
          <li key={tip.id} className="min-w-0">
            <HealthTipCard tip={tip} />
          </li>
        ))}
      </ul>
    </section>
  )
}
