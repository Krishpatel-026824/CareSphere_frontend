import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import DoctorPatientLabBookPanel from '../../components/portal/DoctorPatientLabBookPanel'
import { DoctorPatientDetailBack } from '../../components/portal/DoctorPatientHeader'
import { selectOrderedLabsForPatient } from '../../store/slices/doctorPatientLabsSlice'

export default function DoctorPatientLabBookScreen({
  patient,
  catalog = [],
  patientId,
  onBack,
  onBooked,
}) {
  const ordered = useSelector((state) => selectOrderedLabsForPatient(state, patientId))

  const orderedMap = useMemo(() => {
    const map = new Map()
    ordered.forEach((item) => map.set(item.id, item))
    return map
  }, [ordered])

  return (
    <div className="w-full h-full min-h-0 bg-[#F4F7FA] flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 page-pad py-3 sm:py-4 flex flex-col gap-3 max-w-[720px] mx-auto w-full">
        <DoctorPatientDetailBack onBack={onBack} label="Back to lab reports" />

        <header className="shrink-0">
          <h1 className="text-xl sm:text-2xl font-bold text-navy tracking-tight">New lab report</h1>
          <p className="text-sm text-body-gray mt-1">
            Select tests and book a report for{' '}
            <span className="font-semibold text-navy">{patient?.name}</span>.
          </p>
        </header>

        <section className="flex-1 min-h-0 rounded-2xl border border-[#E6EBF1] bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="shrink-0 h-1 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark" />
          <div className="flex-1 min-h-0 flex flex-col px-4 sm:px-5 py-4">
            <DoctorPatientLabBookPanel
              catalog={catalog}
              orderedMap={orderedMap}
              patientId={patientId}
              onCancel={onBack}
              onBooked={onBooked}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
