import { doctorHomeStatPagesMock } from '../mocks/doctorHome'
import { countUpcomingAppointments, isActiveUpcoming, sortAppointmentsForList } from '../../utils/appointmentFormat'

export function generateDoctorHomeData(visits = [], nextVisit = null) {
  const upcomingCount = countUpcomingAppointments(visits)
  const completedCount = visits.filter((item) => item.status === 'Completed').length
  const waitingCount = visits.filter((item) => item.status === 'Upcoming').length
  const queue = sortAppointmentsForList(visits.filter((item) => isActiveUpcoming(item)))

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
  }
}

export function filterDoctorHomeQueue(visits = [], status) {
  const queue = sortAppointmentsForList(
    visits.filter((item) => isActiveUpcoming(item) || item.status === 'Completed'),
  )
  if (!status) return queue
  if (status === 'active') return queue.filter((item) => isActiveUpcoming(item))
  return queue.filter((item) => item.status === status)
}

export const doctorHomeStatFilters = {
  waiting: 'Upcoming',
  upcoming: 'active',
  done: 'Completed',
}

export function generateDoctorHomeStatPage(statId, visits = []) {
  const page = doctorHomeStatPagesMock[statId]
  if (!page) return null

  return {
    id: statId,
    title: page.title,
    subtitle: page.subtitle,
    empty: page.empty,
    visits: filterDoctorHomeQueue(visits, doctorHomeStatFilters[statId]),
  }
}
