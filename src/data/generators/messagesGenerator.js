import { messagesMock } from '../mocks/messages'
import { generateDoctorBookingData } from './doctorBookingGenerator'
import { mergeDoctorConversations } from './messageConversationGenerator'

export function generateMessagesData() {
  const doctors = generateDoctorBookingData().doctors
  const conversations = mergeDoctorConversations(messagesMock, doctors)
  const unreadCount = conversations.filter((item) => item.unread).length
  return {
    conversations,
    unreadCount,
  }
}
