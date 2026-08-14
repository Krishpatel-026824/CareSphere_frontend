import { careSupportConversationId, messagesMock } from '../mocks/messages'
import { doctorMessagesMock } from '../mocks/doctorMessages'
import { PERMANENT_PIN_AT } from '../mocks/messagePins'
import { applyPermanentPins } from './messagePinGenerator'

export function generateDoctorMessagesData() {
  const support = messagesMock.find((item) => item.id === careSupportConversationId)
  const conversations = applyPermanentPins(
    [
      ...doctorMessagesMock.map((item) => ({
        ...item,
        messages: item.messages.map((message) => ({ ...message })),
      })),
      support
        ? {
            ...support,
            messages: support.messages.map((message) => ({ ...message })),
          }
        : null,
    ].filter(Boolean),
    careSupportConversationId,
    PERMANENT_PIN_AT,
  )

  return {
    conversations,
    unreadCount: conversations.filter((item) => item.unread).length,
  }
}
