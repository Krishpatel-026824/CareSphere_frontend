import { messagesMock } from '../mocks/messages'

export function generateMessagesData() {
  const unreadCount = messagesMock.filter((item) => item.unread).length
  return {
    conversations: messagesMock,
    unreadCount,
  }
}
