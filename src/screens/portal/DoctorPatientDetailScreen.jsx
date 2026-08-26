import DoctorPatientHeader from '../../components/portal/DoctorPatientHeader'
import DoctorPatientInfoCard from '../../components/portal/DoctorPatientInfoCard'
import DoctorPatientVisitList from '../../components/portal/DoctorPatientVisitList'
import { useDoctorPatientChart } from '../../hooks/useDoctorPatientChart'

export default function DoctorPatientDetailScreen({
  patient,
  visits = [],
  onBack,
}) {
  const chart = useDoctorPatientChart(visits)
  if (!patient) return null

  return (
    <div className="w-full h-full min-h-full bg-transparent flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 page-pad py-3 sm:py-4 flex flex-col gap-3 max-w-[1440px] mx-auto w-full overflow-y-auto scroll-y">
        <DoctorPatientHeader patient={patient} onBack={onBack} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 items-start">
          <DoctorPatientInfoCard patient={patient} visitCount={chart.list.length} />
          <DoctorPatientVisitList
            upcoming={chart.upcoming}
            history={chart.history}
            displayOnly
          />
        </div>
      </div>
    </div>
  )
}
