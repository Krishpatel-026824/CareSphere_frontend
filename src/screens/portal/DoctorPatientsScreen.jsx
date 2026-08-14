import AppointmentPageHeader from '../../components/appointments/AppointmentPageHeader'
import DoctorPatientCard from '../../components/portal/DoctorPatientCard'

export default function DoctorPatientsScreen({ patients = [], onSelectPatient }) {
  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-[1100px] mx-auto page-pad py-4 sm:py-6 flex flex-col gap-4">
        <AppointmentPageHeader
          title="Patients"
          subtitle={`${patients.length} in your clinic queue`}
          count={patients.length}
          upcomingCount={patients.length}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {patients.map((patient) => (
            <DoctorPatientCard key={patient.id} patient={patient} onSelect={onSelectPatient} />
          ))}
        </div>
      </div>
    </div>
  )
}
