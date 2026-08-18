import { doctorPatientsMock } from '../mocks/doctorPatients'

export function conversationIdForPatient(patientId) {
  return `dmsg-${patientId}`
}

export function generateEmptyPatientConversation(patient) {
  return {
    id: conversationIdForPatient(patient.id),
    doctorId: patient.id,
    patientId: patient.id,
    doctorName: patient.name,
    specialty: patient.role || 'Care member',
    clinic: patient.city,
    phone: patient.phone || '',
    avatar: patient.avatar,
    lastMessage: 'No messages yet',
    timeLabel: '',
    unread: false,
    unreadCount: 0,
    online: true,
    messages: [],
  }
}

export function getDoctorPatientById(patientId) {
  return doctorPatientsMock.find((patient) => patient.id === patientId) || null
}

function matchesPatientQuery(patient, query) {
  return (
    patient.name.toLowerCase().includes(query) ||
    patient.city.toLowerCase().includes(query) ||
    (patient.phone || '').toLowerCase().includes(query)
  )
}

function isSamePatientChat(item, patientId) {
  return item.patientId === patientId || item.doctorId === patientId || item.id === conversationIdForPatient(patientId)
}

export function findDoctorPatientsForChat(query, existingConversations = []) {
  const q = query.trim().toLowerCase()
  if (!q) return []

  return doctorPatientsMock.filter((patient) => {
    if (!matchesPatientQuery(patient, q)) return false
    return !existingConversations.some((item) => isSamePatientChat(item, patient.id))
  })
}

export function findDoctorChatForPatient(conversations = [], patientId) {
  return conversations.find((item) => isSamePatientChat(item, patientId)) || null
}
