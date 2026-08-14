import { useCallback, useEffect, useRef } from 'react'
import { getAutoReply } from '../data/generators/messageReply'
import { sortConversationsByPin } from '../data/generators/messagePinGenerator'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  addReply,
  autoSelectFirst as autoSelectFirstAction,
  clearPinNotice as clearPinNoticeAction,
  closeConversation as closeConversationAction,
  confirmDeleteChat as confirmDeleteChatAction,
  deleteForEveryone as deleteForEveryoneAction,
  deleteForMe as deleteForMeAction,
  markOutgoingRead,
  openConversation as openConversationAction,
  pinConversation as pinConversationAction,
  sendOutgoing as sendOutgoingAction,
  setDraft as setDraftAction,
  setIsTyping,
  setListFilter as setListFilterAction,
  setQuery as setQueryAction,
  setShowChatInfo as setShowChatInfoAction,
  setShowDeleteConfirm as setShowDeleteConfirmAction,
  unpinConversation as unpinConversationAction,
} from '../store/slices/messagesSlice'
import { formatChatTimestamp } from '../utils/chatTime'

export function useMessages() {
  const dispatch = useAppDispatch()
  const {
    conversations,
    selectedId,
    draft,
    query,
    listFilter,
    isTyping,
    showDeleteConfirm,
    showChatInfo,
    pinNotice,
  } = useAppSelector((state) => state.messages)

  const replyTimer = useRef(null)
  const readTimer = useRef(null)
  const composerRef = useRef(null)
  const hasAutoSelected = useRef(false)

  const unreadCount = conversations.filter((item) => item.unread).length
  const selected = conversations.find((item) => item.id === selectedId) || null

  const filtered = sortConversationsByPin(
    conversations.filter((item) => {
      if (listFilter === 'unread' && !item.unread) return false
      if (listFilter === 'online' && !item.online) return false
      const q = query.trim().toLowerCase()
      if (!q) return true
      return (
        item.doctorName.toLowerCase().includes(q) ||
        item.specialty.toLowerCase().includes(q) ||
        item.lastMessage.toLowerCase().includes(q)
      )
    }),
  )

  useEffect(() => {
    return () => {
      if (replyTimer.current) clearTimeout(replyTimer.current)
      if (readTimer.current) clearTimeout(readTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!pinNotice) return undefined
    const timer = setTimeout(() => dispatch(clearPinNoticeAction()), 2400)
    return () => clearTimeout(timer)
  }, [pinNotice, dispatch])

  function clearChatTimers() {
    if (replyTimer.current) {
      clearTimeout(replyTimer.current)
      replyTimer.current = null
    }
    if (readTimer.current) {
      clearTimeout(readTimer.current)
      readTimer.current = null
    }
  }

  function openConversation(id) {
    clearChatTimers()
    dispatch(openConversationAction(id))
  }

  const autoSelectFirst = useCallback(() => {
    if (!hasAutoSelected.current && conversations.length > 0) {
      dispatch(autoSelectFirstAction())
      hasAutoSelected.current = true
    }
  }, [conversations.length, dispatch])

  function closeConversation() {
    clearChatTimers()
    dispatch(closeConversationAction())
  }

  function startNewMessage() {
    const target = selectedId || conversations[0]?.id
    if (target) openConversation(target)
    requestAnimationFrame(() => composerRef.current?.focus())
  }

  function confirmDeleteChat() {
    clearChatTimers()
    dispatch(confirmDeleteChatAction())
  }

  function togglePin(id) {
    const chat = conversations.find((item) => item.id === id)
    if (!chat || chat.pinLocked) return
    if (chat.pinnedAt) dispatch(unpinConversationAction(id))
    else dispatch(pinConversationAction(id))
  }

  function queueReply(chatId, conversation, userText) {
    if (!conversation.online) return
    if (readTimer.current) clearTimeout(readTimer.current)
    readTimer.current = setTimeout(() => {
      dispatch(markOutgoingRead({ chatId, readAt: formatChatTimestamp() }))
      readTimer.current = null
    }, 450)

    dispatch(setIsTyping(true))
    if (replyTimer.current) clearTimeout(replyTimer.current)
    replyTimer.current = setTimeout(() => {
      const replyText = getAutoReply(userText, conversation)
      const replyStamp = formatChatTimestamp()
      dispatch(
        addReply({
          chatId,
          reply: { id: `reply-${Date.now()}`, from: 'them', text: replyText, time: replyStamp },
        }),
      )
      replyTimer.current = null
    }, 900)
  }

  function sendOutgoing(chatId, message, previewText, replyHint) {
    const conversation = conversations.find((item) => item.id === chatId)
    if (!conversation) return
    const status = conversation.online ? 'delivered' : 'sent'
    dispatch(sendOutgoingAction({ chatId, message, previewText, status }))
    queueReply(chatId, conversation, replyHint)
  }

  function sendMessage() {
    const text = draft.trim()
    if (!text || !selectedId || isTyping) return
    const stamp = formatChatTimestamp()
    sendOutgoing(
      selectedId,
      { id: `local-${Date.now()}`, from: 'me', text, time: stamp },
      text,
      text,
    )
  }

  function sendAttachment(file) {
    if (!file || !selectedId || isTyping) return
    const stamp = formatChatTimestamp()
    const isImage = file.type.startsWith('image/')
    const caption = draft.trim()
    const previewText = caption || (isImage ? 'Photo' : file.name)
    sendOutgoing(
      selectedId,
      {
        id: `local-${Date.now()}`,
        from: 'me',
        text: caption,
        time: stamp,
        attachment: {
          kind: isImage ? 'image' : 'file',
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
        },
      },
      previewText,
      isImage ? 'photo attachment' : 'shared a file report',
    )
  }

  return {
    conversations,
    selected,
    selectedId,
    draft,
    setDraft: (value) => dispatch(setDraftAction(value)),
    query,
    setQuery: (value) => dispatch(setQueryAction(value)),
    listFilter,
    setListFilter: (value) => dispatch(setListFilterAction(value)),
    isTyping,
    showDeleteConfirm,
    setShowDeleteConfirm: (value) => dispatch(setShowDeleteConfirmAction(value)),
    showChatInfo,
    setShowChatInfo: (value) => dispatch(setShowChatInfoAction(value)),
    pinNotice,
    composerRef,
    unreadCount,
    filtered,
    openConversation,
    autoSelectFirst,
    closeConversation,
    startNewMessage,
    confirmDeleteChat,
    togglePin,
    sendMessage,
    sendAttachment,
    deleteForMe: (messageId) => dispatch(deleteForMeAction(messageId)),
    deleteForEveryone: (messageId) => dispatch(deleteForEveryoneAction(messageId)),
  }
}
