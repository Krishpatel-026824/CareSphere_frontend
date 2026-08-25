import DoctorPatientHeader from '../../components/portal/DoctorPatientHeader'
import DoctorPatientInfoCard from '../../components/portal/DoctorPatientInfoCard'
import DoctorPatientVisitList from '../../components/portal/DoctorPatientVisitList'
import { useDoctorPatientChart } from '../../hooks/useDoctorPatientChart'

export default function DoctorPatientDetailScreen({
  patient,
  visits = [],
  onBack,
  onMessage,
}) {
  const chart = useDoctorPatientChart(visits)
  if (!patient) return null

  return (
    <div className="w-full h-full min-h-full bg-transparent flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 page-pad py-3 sm:py-4 flex flex-col gap-3 max-w-[1440px] mx-auto w-full">
        <DoctorPatientHeader
          patient={patient}
          visitCount={chart.list.length}
          onBack={onBack}
          onMessage={onMessage}
        />

        <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-hidden scroll-y">
          <div className="min-h-full lg:h-full grid grid-cols-1 xl:grid-cols-2 gap-3 items-stretch lg:overflow-hidden pb-2 lg:pb-0">
            <DoctorPatientInfoCard patient={patient} visitCount={chart.list.length} />
            <DoctorPatientVisitList
              upcoming={chart.upcoming}
              history={chart.history}
              displayOnly
              fill
            />
          </div>
        </div>
      </div>
    </div>
  )
}
