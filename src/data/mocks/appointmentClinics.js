export const newAppointmentTasksMock = [
  { id: 't1', label: 'Prepare medical history notes', done: true },
  { id: 't2', label: 'Arrive 15 minutes early', done: false },
  { id: 't3', label: 'Bring insurance card', done: false },
]

export const appointmentClinicDefaultsMock = {
  'doc-103': {
    clinic: 'Shalby Hospital',
    clinicDetail: 'Shalby Hospital',
    location: 'Ahmedabad',
    visitType: 'In-clinic',
    address: 'Shalby Hospital, SG Highway, Ahmedabad',
    fullAddress: 'Shalby Hospital, SG Highway, Near Karnavati Club, Ahmedabad 380015',
    mapCoords: { lat: 23.0118, lng: 72.5074 },
    phone: '(901) 425-3300',
    room: 'Consultation Room 2',
    landmark: 'Near Karnavati Club · Valet parking',
    prepNote: 'Arrive 15 minutes early. Bring your ID and previous ECG reports.',
    prepItems: ['Valid photo ID', 'Previous ECG reports', 'Insurance card'],
  },
}
