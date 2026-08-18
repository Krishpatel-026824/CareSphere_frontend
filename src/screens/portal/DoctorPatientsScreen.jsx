import AppointmentPageHeader from '../../components/appointments/AppointmentPageHeader'
import DoctorPatientCard from '../../components/portal/DoctorPatientCard'

export default function DoctorPatientsScreen({ patients = [], onSelectPatient, onMessagePatient }) {
  return (
    <div className="w-full min-h-full bg-bg-gray flex flex-col">
      <div className="w-full flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-3">
        <AppointmentPageHeader
          title="Patients"
          subtitle={`${patients.length} in your clinic queue`}
        />
        <div className="w-full grid gap-3 grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(340px,1fr))]">
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
    </div>
  )
}
