import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import DoctorPatientAppointmentsTab from '../../components/portal/DoctorPatientAppointmentsTab'
import DoctorPatientAuditTab from '../../components/portal/DoctorPatientAuditTab'
import DoctorPatientChartTabs from '../../components/portal/DoctorPatientChartTabs'
import DoctorPatientHeader from '../../components/portal/DoctorPatientHeader'
import DoctorPatientLabsTab from '../../components/portal/DoctorPatientLabsTab'
import DoctorPatientMedicineTab from '../../components/portal/DoctorPatientMedicineTab'
import DoctorPatientPrescriptionsTab from '../../components/portal/DoctorPatientPrescriptionsTab'
import { generateDoctorPatientChart } from '../../data/generators/doctorPatientChartGenerator'
import { selectPatientAudit } from '../../store/slices/doctorPatientAuditSlice'
import { selectOrderedLabsForPatient } from '../../store/slices/doctorPatientLabsSlice'
import { selectPatientRoutine } from '../../store/slices/doctorPatientRxSlice'

export default function DoctorPatientDetailScreen({ patient, visits = [], onBack }) {
  const [tab, setTab] = useState('prescription')
  const orderedLabs = useSelector((state) => selectOrderedLabsForPatient(state, patient?.id))
  const routine = useSelector((state) => selectPatientRoutine(state, patient?.id))
  const liveAudit = useSelector((state) => selectPatientAudit(state, patient?.id))
  const chart = useMemo(
    () => generateDoctorPatientChart(patient, visits),
    [patient, visits],
  )

  const auditItems = useMemo(() => {
    const base = chart.audit || []
    const liveIds = new Set(liveAudit.map((item) => item.id))
    const merged = [...liveAudit, ...base.filter((item) => !liveIds.has(item.id))]
    return merged
  }, [liveAudit, chart.audit])

  if (!patient) return null

  const prescribedNames = new Set(routine.map((item) => item.name))
  const prescriptionCount =
    routine.length +
    chart.prescriptions.filter((item) => !prescribedNames.has(item.name)).length

  const counts = {
    prescription: prescriptionCount,
    appointments: chart.visits.length,
    labs: orderedLabs.length + chart.labs.length,
    medicine: chart.medicines.length,
    audit: auditItems.length,
  }

  return (
    <div className="w-full h-full min-h-0 bg-[#F4F7FA] flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 page-pad py-3 sm:py-4 flex flex-col gap-3 max-w-[1440px] mx-auto w-full">
        <div className="shrink-0 flex flex-col gap-3">
          <DoctorPatientHeader patient={patient} visitCount={visits.length} onBack={onBack} />
          <DoctorPatientChartTabs value={tab} counts={counts} onChange={setTab} />
        </div>

        <div className="flex-1 min-h-0 flex flex-col">
          {tab === 'prescription' ? (
            <DoctorPatientPrescriptionsTab
              catalog={chart.medicines}
              existing={chart.prescriptions}
              patientId={patient.id}
            />
          ) : null}
          {tab === 'appointments' ? (
            <DoctorPatientAppointmentsTab visits={chart.visits} patient={patient} />
          ) : null}
          {tab === 'labs' ? (
            <DoctorPatientLabsTab
              catalog={chart.labCatalog}
              previousReports={chart.labs}
              patientId={patient.id}
            />
          ) : null}
          {tab === 'medicine' ? <DoctorPatientMedicineTab items={chart.medicines} /> : null}
          {tab === 'audit' ? <DoctorPatientAuditTab items={auditItems} /> : null}
        </div>
      </div>
    </div>
  )
}
