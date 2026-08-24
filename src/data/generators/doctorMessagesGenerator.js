import { doctorMessagesMock } from '../mocks/doctorMessages'

export function generateDoctorMessagesData() {
  const conversations = doctorMessagesMock.map((item) => ({
    ...item,
    messages: item.messages.map((message) => ({ ...message })),
  }))

  return {
    conversations,
    unreadCount: conversations.filter((item) => item.unread).length,
  }
}
