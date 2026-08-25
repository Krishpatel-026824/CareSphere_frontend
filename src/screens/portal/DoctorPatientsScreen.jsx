import { useMemo } from 'react'
import AppointmentPageHeader from '../../components/appointments/AppointmentPageHeader'
import DoctorPatientCard from '../../components/portal/DoctorPatientCard'
import DoctorPatientQueueStats from '../../components/portal/DoctorPatientQueueStats'

function isActivePatient(patient) {
  const status = patient.nextVisit?.status
  return status === 'Upcoming' || status === 'Confirmed'
}

export default function DoctorPatientsScreen({ patients = [], onSelectPatient, onMessagePatient }) {
  const allWorkDone = useMemo(
    () => patients.length > 0 && patients.every((patient) => !isActivePatient(patient)),
    [patients],
  )

  const panelTitle = allWorkDone ? 'Patients' : 'Clinic queue'

  return (
    <div className="w-full h-full min-h-full bg-transparent flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-3">
        <AppointmentPageHeader title="Patients" />

        <section className="flex-1 min-h-0 bg-white rounded-2xl border border-[#E6EBF1] shadow-sm flex flex-col overflow-hidden">
          {patients.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <p className="text-sm text-body-gray">No patients in your clinic queue yet.</p>
            </div>
          ) : (
            <>
              <div className="shrink-0 px-4 sm:px-5 pt-4 pb-3.5 border-b border-[#E6EBF1] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-navy tracking-tight leading-none">
                  {panelTitle}
                </h2>
                <DoctorPatientQueueStats patients={patients} />
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto scroll-y px-4 sm:px-5 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {patients.map((patient) => (
                    <DoctorPatientCard
                      key={patient.id}
                      patient={patient}
                      onSelect={onSelectPatient}
                      onMessage={onMessagePatient}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
