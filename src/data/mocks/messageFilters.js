export const messageActionOptions = [
  { id: 'info', label: 'Info', ownOnly: true },
  { id: 'deleteForMe', label: 'Delete for me', danger: true },
  { id: 'deleteForEveryone', label: 'Delete for everyone', danger: true, ownOnly: true },
]

export const messageFilterOptions = [
  { id: 'all', label: 'All messages', chip: 'All', hint: 'Every conversation' },
  { id: 'unread', label: 'Unread', chip: 'Unread', hint: 'New or unanswered chats' },
  { id: 'starred', label: 'Starred', chip: 'Starred', hint: 'Pinned conversations' },
]
