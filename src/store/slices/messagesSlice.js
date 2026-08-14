import { createSlice } from '@reduxjs/toolkit'
import { generateMessagesData } from '../../data/generators/messagesGenerator'
import { countPinnedChats } from '../../data/generators/messagePinGenerator'
import { MAX_PINNED_CHATS } from '../../data/mocks/messagePins'
import { conversationPreview } from '../../utils/messageStatus'

const EMPTY_CHAT_PREVIEW = 'No messages yet'
const initial = generateMessagesData()
const initialConversations = initial.conversations.map((item) => ({
  ...item,
  messages: item.messages.map((message) => ({ ...message })),
}))

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    conversations: initialConversations,
    selectedId: null,
    draft: '',
    query: '',
    listFilter: 'all',
    isTyping: false,
    showDeleteConfirm: false,
    showChatInfo: false,
    pinNotice: false,
  },
  reducers: {
    setSelectedId(state, action) {
      state.selectedId = action.payload
    },
    setDraft(state, action) {
      state.draft = action.payload
    },
    setQuery(state, action) {
      state.query = action.payload
    },
    setListFilter(state, action) {
      state.listFilter = action.payload
    },
    setIsTyping(state, action) {
      state.isTyping = action.payload
    },
    setShowDeleteConfirm(state, action) {
      state.showDeleteConfirm = action.payload
    },
    setShowChatInfo(state, action) {
      state.showChatInfo = action.payload
    },
    openConversation(state, action) {
      const id = action.payload
      state.selectedId = id
      state.draft = ''
      state.isTyping = false
      state.showChatInfo = false
      state.conversations = state.conversations.map((item) =>
        item.id === id ? { ...item, unread: false, unreadCount: 0 } : item,
      )
    },
    closeConversation(state) {
      state.selectedId = null
      state.draft = ''
      state.isTyping = false
      state.showChatInfo = false
    },
    autoSelectFirst(state) {
      if (!state.selectedId && state.conversations.length > 0) {
        state.selectedId = state.conversations[0].id
      }
    },
    confirmDeleteChat(state) {
      if (!state.selectedId) return
      const chatId = state.selectedId
      state.conversations = state.conversations.map((item) =>
        item.id === chatId
          ? {
              ...item,
              messages: [],
              lastMessage: EMPTY_CHAT_PREVIEW,
              timeLabel: '',
              unread: false,
              unreadCount: 0,
            }
          : item,
      )
      state.draft = ''
      state.isTyping = false
      state.showDeleteConfirm = false
    },
    sendOutgoing(state, action) {
      const { chatId, message, previewText, status } = action.payload
      state.conversations = state.conversations.map((item) => {
        if (item.id !== chatId) return item
        return {
          ...item,
          lastMessage: previewText,
          timeLabel: message.time,
          messages: [
            ...item.messages,
            {
              ...message,
              status,
              read: false,
              sentAt: message.time,
              deliveredAt: status === 'delivered' || status === 'read' ? message.time : null,
              readAt: null,
            },
          ],
        }
      })
      state.draft = ''
    },
    markOutgoingRead(state, action) {
      const { chatId, readAt } = action.payload
      state.conversations = state.conversations.map((item) => {
        if (item.id !== chatId) return item
        return {
          ...item,
          messages: item.messages.map((message) =>
            message.from === 'me' && message.status !== 'read'
              ? { ...message, status: 'read', read: true, readAt }
              : message,
          ),
        }
      })
    },
    addReply(state, action) {
      const { chatId, reply } = action.payload
      state.conversations = state.conversations.map((item) => {
        if (item.id !== chatId) return item
        return {
          ...item,
          lastMessage: reply.text,
          timeLabel: reply.time,
          messages: [...item.messages, reply],
        }
      })
      state.isTyping = false
    },
    deleteForMe(state, action) {
      const messageId = action.payload
      const chatId = state.selectedId
      if (!chatId) return
      state.conversations = state.conversations.map((item) => {
        if (item.id !== chatId) return item
        const messages = item.messages.map((msg) =>
          msg.id === messageId ? { ...msg, removed: true } : msg,
        )
        return { ...item, messages, lastMessage: conversationPreview(messages, EMPTY_CHAT_PREVIEW) }
      })
    },
    deleteForEveryone(state, action) {
      const messageId = action.payload
      const chatId = state.selectedId
      if (!chatId) return
      state.conversations = state.conversations.map((item) => {
        if (item.id !== chatId) return item
        const messages = item.messages.map((msg) =>
          msg.id === messageId && msg.from === 'me'
            ? { ...msg, deleted: true, text: '', attachment: null }
            : msg,
        )
        return { ...item, messages, lastMessage: conversationPreview(messages, EMPTY_CHAT_PREVIEW) }
      })
    },
    pinConversation(state, action) {
      const id = action.payload
      const target = state.conversations.find((item) => item.id === id)
      if (!target || target.pinnedAt) return
      if (countPinnedChats(state.conversations) >= MAX_PINNED_CHATS) {
        state.pinNotice = true
        return
      }
      state.pinNotice = false
      state.conversations = state.conversations.map((item) =>
        item.id === id ? { ...item, pinnedAt: Date.now() } : item,
      )
    },
    unpinConversation(state, action) {
      const id = action.payload
      const target = state.conversations.find((item) => item.id === id)
      if (!target || target.pinLocked) return
      state.pinNotice = false
      state.conversations = state.conversations.map((item) =>
        item.id === id ? { ...item, pinnedAt: null } : item,
      )
    },
    clearPinNotice(state) {
      state.pinNotice = false
    },
  },
})

export const {
  setSelectedId,
  setDraft,
  setQuery,
  setListFilter,
  setIsTyping,
  setShowDeleteConfirm,
  setShowChatInfo,
  openConversation,
  closeConversation,
  autoSelectFirst,
  confirmDeleteChat,
  sendOutgoing,
  markOutgoingRead,
  addReply,
  deleteForMe,
  deleteForEveryone,
  pinConversation,
  unpinConversation,
  clearPinNotice,
} = messagesSlice.actions

export function selectMessagesState(state) {
  return state.messages
}

export function selectMessagesBadge(state) {
  return state.messages.conversations.filter((item) => item.unread).length
}

export default messagesSlice.reducer
