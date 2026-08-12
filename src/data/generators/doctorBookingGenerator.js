import { doctorBookingMock, doctorCategoriesMock } from '../mocks/doctorBooking'

export function generateDoctorBookingData() {
  return {
    location: 'Ahmedabad',
    categories: doctorCategoriesMock,
    doctors: doctorBookingMock,
  }
}
