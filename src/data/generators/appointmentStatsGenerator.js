import { appointmentTrendMock } from '../mocks/appointmentStats'

export function generateAppointmentHeader(count = 0) {
  return {
    total: count,
    trend: appointmentTrendMock,
  }
}
