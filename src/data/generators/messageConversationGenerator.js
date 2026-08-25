import { doctorChatPreviews, extraChatTimeLabels } from '../mocks/messageDoctorPreviews'

export function generateConversationFromDoctor(doctor, index) {
  const preview = doctorChatPreviews[doctor.specialty] || doctorChatPreviews.default
  const timeLabel = extraChatTimeLabels[index % extraChatTimeLabels.length]

  return {
    id: `msg-${doctor.id}`,
    doctorId: doctor.id,
    doctorName: doctor.name,
    specialty: doctor.specialty,
    clinic: doctor.hospital,
    phone: doctor.phone || '',
    avatar: doctor.avatar,
    lastMessage: preview,
    timeLabel,
    unread: false,
    unreadCount: 0,
    online: index % 3 === 0,
    messages: [
      {
        id: `t-${doctor.id}-1`,
        from: 'them',
        text: preview,
        time: timeLabel,
      },
    ],
  }
}

export function mergeDoctorConversations(seedConversations = [], doctors = []) {
  const existingIds = new Set(seedConversations.map((item) => item.doctorId).filter(Boolean))
  const extra = []

  doctors.forEach((doctor) => {
    if (!doctor?.id || existingIds.has(doctor.id)) return
    existingIds.add(doctor.id)
    extra.push(generateConversationFromDoctor(doctor, extra.length))
  })

  return [...seedConversations, ...extra]
}
