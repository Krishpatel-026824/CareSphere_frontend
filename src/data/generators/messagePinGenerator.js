export function sortConversationsByPin(conversations = []) {
  return [...conversations].sort((a, b) => {
    if (a.pinLocked && !b.pinLocked) return -1
    if (!a.pinLocked && b.pinLocked) return 1
    const aPinned = a.pinnedAt || 0
    const bPinned = b.pinnedAt || 0
    if (aPinned && bPinned) return bPinned - aPinned
    if (aPinned) return -1
    if (bPinned) return 1
    const aTime = a.lastMessageAt || 0
    const bTime = b.lastMessageAt || 0
    return bTime - aTime
  })
}

export function countPinnedChats(conversations = []) {
  return conversations.filter((item) => item.pinnedAt && !item.pinLocked).length
}

export function applyPermanentPins(conversations = [], supportId, pinnedAt) {
  return conversations.map((item) =>
    item.id === supportId || item.pinLocked
      ? { ...item, pinLocked: true, pinnedAt: item.pinnedAt || pinnedAt }
      : item,
  )
}
