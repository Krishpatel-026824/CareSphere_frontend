import { useNavigate } from 'react-router-dom'
import HomeDashboard from '../../screens/main/HomeDashboard'
import { useAppStore } from '../../store/useAppStore'
import { generateHomeVisitSignals } from '../../data/generators/appointmentSettingsGenerator'
import { PATHS, appointmentDetailsPath } from '../paths'

export default function HomePage() {
  const navigate = useNavigate()
  const { upcomingAppointment, appointmentPrefs, findDoctorById } = useAppStore()
  const upcomingDoctor = findDoctorById?.(upcomingAppointment?.doctorId)
  const visitSignals = generateHomeVisitSignals(
    upcomingAppointment,
    upcomingDoctor,
    appointmentPrefs[upcomingAppointment?.id],
  )

  return (
    <HomeDashboard
      upcomingAppointment={upcomingAppointment}
      visitSignals={visitSignals}
      onBellClick={() => navigate(PATHS.notifications)}
      onActionClick={(key) => {
        const routes = {
          bookAppointment: PATHS.newAppointment,
          telemedicine: PATHS.telemedicine,
          pharmacy: PATHS.pharmacy,
          labTests: PATHS.labTests,
          healthRecords: PATHS.healthRecords,
        }
        if (routes[key]) navigate(routes[key])
      }}
      onRescheduleAppointment={(appointment) => {
        navigate(PATHS.reschedule, { state: { appointment, returnTo: PATHS.home } })
      }}
      onBookAppointment={() => navigate(PATHS.newAppointment)}
      onAppointmentDetails={(appointment) => {
        if (appointment?.id) navigate(appointmentDetailsPath(appointment.id))
      }}
    />
  )
}
