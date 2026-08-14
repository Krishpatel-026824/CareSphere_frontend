import { careSupportConversationId, messagesMock } from '../mocks/messages'
import { PERMANENT_PIN_AT } from '../mocks/messagePins'
import { generateDoctorBookingData } from './doctorBookingGenerator'
import { mergeDoctorConversations } from './messageConversationGenerator'
import { applyPermanentPins } from './messagePinGenerator'

export function generateMessagesData() {
  const doctors = generateDoctorBookingData().doctors
  const merged = mergeDoctorConversations(messagesMock, doctors)
  const conversations = applyPermanentPins(merged, careSupportConversationId, PERMANENT_PIN_AT)
  const unreadCount = conversations.filter((item) => item.unread).length
  return {
    conversations,
    unreadCount,
  }
}
