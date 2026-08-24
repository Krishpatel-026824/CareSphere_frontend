import { patientImages } from './patientImages'

export const doctorClinicDefaultsMock = {
  clinic: 'CareSphere Heart Center',
  clinicDetail: 'CareSphere Heart Center',
  location: 'Ahmedabad',
  visitType: 'In-clinic',
  address: 'SG Highway, Near Iscon Cross Road, Ahmedabad',
  fullAddress: 'CareSphere Heart Center, SG Highway, Near Iscon Cross Road, Ahmedabad 380015',
  phone: '(901) 425-9878',
  room: 'Consultation Room 4',
  landmark: 'Near Iscon Cross Road · Parking available',
}

export const doctorScheduleFilters = [
  { id: 'All', label: 'All' },
  { id: 'Confirmed', label: 'Confirmed' },
  { id: 'Upcoming', label: 'Upcoming' },
  { id: 'Completed', label: 'Done' },
]

export const doctorVisitTimeSlotsMock = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:30 PM',
  '02:30 PM',
  '03:30 PM',
  '04:30 PM',
  '05:30 PM',
]

export const doctorLinkedPatientMock = {
  id: 'pat-krish',
  name: 'Krish Patel',
  avatar: patientImages.krishPatel,
  visitReason: 'Follow-up on heart rate. Review previous ECG.',
}
