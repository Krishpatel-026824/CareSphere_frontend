import { patientImages } from './patientImages'

const clinic = {
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

export const doctorExtraVisitsMock = [
  {
    id: 'dvis-1',
    doctorId: 'doc-101',
    patientId: 'pat-ananya',
    patientName: 'Ananya Shah',
    patientPhoto: patientImages.ananyaShah,
    dateLabel: '16 Aug 2026',
    timeLabel: '11:00 AM',
    status: 'Upcoming',
    ...clinic,
    visitType: 'In-clinic',
    prepNote: 'First cardiology consult. Review chest discomfort history.',
    prepItems: ['Valid photo ID', 'Previous prescriptions'],
  },
  {
    id: 'dvis-2',
    doctorId: 'doc-101',
    patientId: 'pat-rohan',
    patientName: 'Rohan Mehta',
    patientPhoto: patientImages.rohanMehta,
    dateLabel: '20 Aug 2026',
    timeLabel: '09:00 AM',
    status: 'Confirmed',
    ...clinic,
    visitType: 'Video',
    room: 'Video consult',
    prepNote: 'Follow-up after lipid profile. Discuss medication change.',
    prepItems: ['Latest lipid report', 'Current medication list'],
  },
  {
    id: 'dvis-3',
    doctorId: 'doc-101',
    patientId: 'pat-priya',
    patientName: 'Priya Nair',
    patientPhoto: patientImages.priyaNair,
    dateLabel: '10 Aug 2026',
    timeLabel: '03:00 PM',
    status: 'Completed',
    ...clinic,
    prepNote: 'ECG review completed. Continue current plan.',
    prepItems: ['ECG report', 'Insurance card'],
  },
]

export const doctorLinkedPatientMock = {
  id: 'pat-krish',
  name: 'Krish Patel',
  avatar: patientImages.krishPatel,
}
