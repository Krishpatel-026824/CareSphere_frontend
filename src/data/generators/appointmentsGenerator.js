import { appointmentsMock } from '../mocks/appointments'

export function generateAppointmentsData() {
  return {
    upcoming: appointmentsMock.filter((item) => item.status !== 'Completed'),
    all: appointmentsMock,
  }
}
