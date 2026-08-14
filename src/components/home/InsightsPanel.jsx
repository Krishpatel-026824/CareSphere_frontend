import HealthTipCard from './HealthTipCard'
import MedicineReminderCard from './MedicineReminderCard'

export default function InsightsPanel({ tips, loopMs }) {
  return (
    <div className="flex flex-col gap-4 h-full xl:min-h-0 justify-start">
      <MedicineReminderCard />
      <HealthTipCard tips={tips} loopMs={loopMs} />
    </div>
  )
}
