import { patientImages } from './patientImages'

export const quickActionsMock = [
  { id: 'book', key: 'bookAppointment', label: 'Book appointment', tone: 'bg-violet-100 text-violet-600' },
  { id: 'pharmacy', key: 'pharmacy', label: 'Pharmacy', tone: 'bg-orange-100 text-orange-600' },
  { id: 'lab', key: 'labTests', label: 'Lab tests', tone: 'bg-amber-100 text-amber-600' },
  { id: 'records', key: 'healthRecords', label: 'Health records', tone: 'bg-sky-100 text-sky-600' },
]

export const userProfileMock = {
  name: 'Krish Patel',
  role: 'Care member',
  avatar: patientImages.krishPatel,
  initials: 'KP',
}
