export function getOutgoingStatus(message) {
  if (message.status === 'sent' || message.status === 'delivered' || message.status === 'read') {
    return message.status
  }
  if (message.read) return 'read'
  return 'sent'
}

export function getMessageReceipts(message) {
  const status = getOutgoingStatus(message)
  const sent = message.sentAt || message.time || ''
  const delivered =
    status === 'delivered' || status === 'read' ? message.deliveredAt || message.time || '' : ''
  const read = status === 'read' ? message.readAt || message.time || '' : ''
  return { sent, delivered, read, status }
}

export function conversationPreview(messages, emptyLabel) {
  const visible = messages.filter((item) => !item.removed)
  const last = visible[visible.length - 1]
  if (!last) return emptyLabel
  if (last.deleted) return 'This message was deleted'
  return last.text || last.attachment?.name || 'Photo'
}
