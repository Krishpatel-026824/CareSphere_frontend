export function formatChatTimestamp(date = new Date()) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function normalizeChatTimeLabel(label = '') {
  if (!label) return ''
  return label.replace(/\b(am|pm)\b/gi, (match) => match.toUpperCase())
}
