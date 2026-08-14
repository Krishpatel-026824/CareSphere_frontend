import { doctorQuickActionsMock } from '../mocks/doctorHome'
import { countUpcomingAppointments, isActiveUpcoming, sortAppointmentsForList } from '../../utils/appointmentFormat'

export function generateDoctorHomeData(visits = [], nextVisit = null) {
  const upcomingCount = countUpcomingAppointments(visits)
  const completedCount = visits.filter((item) => item.status === 'Completed').length
  const waitingCount = visits.filter((item) => item.status === 'Upcoming').length
  const queue = sortAppointmentsForList(visits.filter((item) => isActiveUpcoming(item) || item.status === 'Completed'))

  return {
    greetingName: 'Dr. Carter',
    subtitle: "Here's today's clinic queue",
    stats: [
      {
        id: 'waiting',
        label: 'Waiting',
        value: String(waitingCount),
        hint: 'Need your accept',
        footer:
          waitingCount === 1
            ? '1 visit is waiting for your action'
            : `${waitingCount} visits are waiting for your action`,
      },
      {
        id: 'upcoming',
        label: 'Upcoming',
        value: String(upcomingCount),
        hint: 'In the clinic queue',
        footer: `${upcomingCount} appointments scheduled`,
      },
      {
        id: 'done',
        label: 'Completed',
        value: String(completedCount),
        hint: 'Visits wrapped up',
        footer:
          completedCount === 1
            ? '1 visit completed successfully'
            : `${completedCount} visits completed successfully`,
      },
    ],
    nextVisit,
    queue,
    quickActions: doctorQuickActionsMock,
  }
}
