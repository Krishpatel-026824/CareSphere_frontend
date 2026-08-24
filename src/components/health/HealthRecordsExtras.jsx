import { generateHealthRecordsSummary } from '../../data/generators/healthRecordsGenerator'
import HealthRecordsGuide from './HealthRecordsGuide'
import HealthRecordsSafetyBanner from './HealthRecordsSafetyBanner'
import HealthSummaryCard from './HealthSummaryCard'

export default function HealthRecordsExtras({ records = [] }) {
  const summary = generateHealthRecordsSummary(records)

  return (
    <div className="flex flex-col gap-5">
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 xl:gap-5">
        {summary.map((item) => (
          <HealthSummaryCard key={item.id} item={item} />
        ))}
      </section>

      <HealthRecordsGuide />
      <HealthRecordsSafetyBanner />
    </div>
  )
}
