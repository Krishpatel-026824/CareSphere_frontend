import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeDashboard from '../../screens/main/HomeDashboard'
import EditAppointmentModal from '../../components/home/EditAppointmentModal'
import { useAppSelector } from '../../store/hooks'
import { useAppStore } from '../../store/useAppStore'
import { generateHomeVisitSignals } from '../../data/generators/appointmentSettingsGenerator'
import { selectLabBookings } from '../../store/slices/labSlice'
import { PATHS, appointmentDetailsPath } from '../paths'

export default function HomePage() {
  const navigate = useNavigate()
  const { upcomingAppointment, appointmentPrefs, findDoctorById, updateAppointment } = useAppStore()
  const labBookings = useAppSelector(selectLabBookings)
  const labTests = useAppSelector((state) => state.lab.tests) ?? []
  const latestLabBooking = (() => {
    const booking = labBookings[0]
    if (!booking) return null
    if (booking.test?.thumbnail || booking.test?.image) return booking
    const match = labTests.find((item) => item.id === booking.test?.id)
    if (!match) return booking
    return {
      ...booking,
      test: {
        ...booking.test,
        thumbnail: match.thumbnail,
        image: match.thumbnail,
      },
    }
  })()
  const upcomingDoctor = findDoctorById?.(upcomingAppointment?.doctorId)
  const visitSignals = generateHomeVisitSignals(
    upcomingAppointment,
    upcomingDoctor,
    appointmentPrefs[upcomingAppointment?.id],
  )
  const [editOpen, setEditOpen] = useState(false)

  return (
    <>
      <HomeDashboard
        upcomingAppointment={upcomingAppointment}
        latestLabBooking={latestLabBooking}
        visitSignals={visitSignals}
        onBellClick={() => navigate(PATHS.notifications)}
        onActionClick={(key) => {
          const routes = {
            bookAppointment: PATHS.newAppointment,
            pharmacy: PATHS.pharmacy,
            labTests: PATHS.labTests,
            healthRecords: PATHS.healthRecords,
          }
          if (routes[key]) navigate(routes[key])
        }}
        onRescheduleAppointment={() => setEditOpen(true)}
        onBookAppointment={() => navigate(PATHS.newAppointment)}
        onBookLabTest={() => navigate(PATHS.labTests)}
        onViewLabBookings={() => navigate(PATHS.labTests)}
        onAppointmentDetails={(appointment) => {
          if (appointment?.id) navigate(appointmentDetailsPath(appointment.id))
        }}
      />
      <EditAppointmentModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        appointment={upcomingAppointment}
        onSave={(updated) => updateAppointment?.(updated)}
      />
    </>
  )
}
