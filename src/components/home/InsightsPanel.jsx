import HealthTipCard from './HealthTipCard'
import MedicineReminderCard from './MedicineReminderCard'

export default function InsightsPanel({ medicine, tip, tipSubtitle }) {
  return (
    <div className="flex flex-col gap-4 h-full xl:min-h-0">
      <MedicineReminderCard medicine={medicine} />
      <HealthTipCard tip={tip} subtitle={tipSubtitle} />
    </div>
  )
}
