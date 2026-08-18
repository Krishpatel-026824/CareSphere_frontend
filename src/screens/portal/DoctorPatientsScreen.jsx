import AppointmentPageHeader from '../../components/appointments/AppointmentPageHeader'
import DoctorPatientCard from '../../components/portal/DoctorPatientCard'

export default function DoctorPatientsScreen({ patients = [], onSelectPatient }) {
  return (
    <div className="w-full h-full min-h-full bg-bg-gray flex flex-col">
      <div className="w-full flex-1 min-h-0 px-4 sm:px-5 py-4 flex flex-col gap-3">
        <AppointmentPageHeader
          title="Patients"
          subtitle={`${patients.length} in your clinic queue`}
        />
        <div className="w-full flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
          <div className="w-full min-h-full lg:h-full grid gap-2.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:auto-rows-fr">
            {patients.map((patient) => (
              <DoctorPatientCard key={patient.id} patient={patient} onSelect={onSelectPatient} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
