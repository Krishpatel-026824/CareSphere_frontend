import { createSlice } from '@reduxjs/toolkit'
import { generateDoctorMessagesData } from '../../data/generators/doctorMessagesGenerator'
import { generateMessagesData } from '../../data/generators/messagesGenerator'
import { countPinnedChats } from '../../data/generators/messagePinGenerator'
import { MAX_PINNED_CHATS } from '../../data/mocks/messagePins'
import { conversationPreview } from '../../utils/messageStatus'
import { loadAuthWorkspace } from '../../utils/authStorage'
import {
  findDoctorChatForPatient,
  generateEmptyPatientConversation,
} from '../../data/generators/doctorPatientChatGenerator'

const EMPTY_CHAT_PREVIEW = 'No messages yet'
const initial = generateMessagesData()
const doctorInitial = generateDoctorMessagesData()
const initialConversations = initial.conversations.map((item) => ({
  ...item,
  messages: item.messages.map((message) => ({ ...message })),
}))
const initialDoctorConversations = doctorInitial.conversations.map((item) => ({
  ...item,
  messages: item.messages.map((message) => ({ ...message })),
}))

function listKey(state) {
  return state.workspace === 'doctor' ? 'doctorConversations' : 'conversations'
}

function mapList(state, mapper) {
  const key = listKey(state)
  state[key] = state[key].map(mapper)
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    conversations: initialConversations,
    doctorConversations: initialDoctorConversations,
    workspace: loadAuthWorkspace(),
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
    setWorkspace(state, action) {
      state.workspace = action.payload === 'doctor' ? 'doctor' : 'patient'
      state.selectedId = null
      state.draft = ''
      state.query = ''
      state.listFilter = 'all'
      state.isTyping = false
      state.showDeleteConfirm = false
      state.showChatInfo = false
      state.pinNotice = false
    },
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
      mapList(state, (item) => (item.id === id ? { ...item, unread: false, unreadCount: 0 } : item))
    },
    ensureAndOpenPatientChat(state, action) {
      const patient = action.payload
      if (state.workspace !== 'doctor' || !patient?.id) return
      const existing = findDoctorChatForPatient(state.doctorConversations, patient.id)
      if (!existing) {
        state.doctorConversations = [
          generateEmptyPatientConversation(patient),
          ...state.doctorConversations,
        ]
      }
      const chat = findDoctorChatForPatient(state.doctorConversations, patient.id)
      if (!chat) return
      state.selectedId = chat.id
      state.query = ''
      state.draft = ''
      state.isTyping = false
      state.showChatInfo = false
      mapList(state, (item) =>
        item.id === chat.id ? { ...item, unread: false, unreadCount: 0 } : item,
      )
    },
    closeConversation(state) {
      state.selectedId = null
      state.draft = ''
      state.isTyping = false
      state.showChatInfo = false
    },
    autoSelectFirst(state) {
      const list = state[listKey(state)]
      if (!state.selectedId && list.length > 0) {
        state.selectedId = list[0].id
      }
    },
    confirmDeleteChat(state) {
      if (!state.selectedId) return
      const chatId = state.selectedId
      mapList(state, (item) =>
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
      mapList(state, (item) => {
        if (item.id !== chatId) return item
        return {
          ...item,
          lastMessage: previewText,
          timeLabel: message.time,
          lastMessageAt: Date.now(),
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
      mapList(state, (item) => {
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
      mapList(state, (item) => {
        if (item.id !== chatId) return item
        return {
          ...item,
          lastMessage: reply.text,
          timeLabel: reply.time,
          lastMessageAt: Date.now(),
          messages: [...item.messages, reply],
        }
      })
      state.isTyping = false
    },
    deleteForMe(state, action) {
      const messageId = action.payload
      const chatId = state.selectedId
      if (!chatId) return
      mapList(state, (item) => {
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
      mapList(state, (item) => {
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
      const list = state[listKey(state)]
      const target = list.find((item) => item.id === id)
      if (!target || target.pinnedAt) return
      if (countPinnedChats(list) >= MAX_PINNED_CHATS) {
        state.pinNotice = true
        return
      }
      state.pinNotice = false
      mapList(state, (item) => (item.id === id ? { ...item, pinnedAt: Date.now() } : item))
    },
    unpinConversation(state, action) {
      const id = action.payload
      const list = state[listKey(state)]
      const target = list.find((item) => item.id === id)
      if (!target || target.pinLocked) return
      state.pinNotice = false
      mapList(state, (item) => (item.id === id ? { ...item, pinnedAt: null } : item))
    },
    clearPinNotice(state) {
      state.pinNotice = false
    },
    addIncomingMessage(state, action) {
      const { doctorId, doctorName, message, avatar, specialty, clinic } = action.payload
      if (!doctorId || !message) return
      if (state._lastIncomingMsgText === message.text && state._lastIncomingDoctorId === doctorId) return
      state._lastIncomingMsgText = message.text
      state._lastIncomingDoctorId = doctorId
      const key = listKey(state)
      const index = state[key].findIndex((c) => c.doctorId === doctorId)
      const now = Date.now()
      if (index >= 0) {
        const current = state[key][index]
        state[key][index] = {
          ...current,
          doctorName: doctorName || current.doctorName,
          specialty: specialty || current.specialty,
          clinic: clinic || current.clinic,
          avatar: avatar || current.avatar,
          lastMessage: message.text,
          timeLabel: message.time,
          lastMessageAt: now,
          unread: true,
          unreadCount: (current.unreadCount || 0) + 1,
          messages: [...current.messages, message],
        }
      } else {
        const newConversation = {
          id: `conv-${doctorId}-${now}`,
          doctorId,
          doctorName: doctorName || 'Doctor',
          avatar: avatar || '',
          specialty: specialty || '',
          clinic: clinic || '',
          online: false,
          unread: true,
          unreadCount: 1,
          lastMessage: message.text,
          timeLabel: message.time,
          lastMessageAt: now,
          messages: [message],
        }
        state[key] = [newConversation, ...state[key]]
      }
    },
  },
})

export const {
  setWorkspace,
  setSelectedId,
  setDraft,
  setQuery,
  setListFilter,
  setIsTyping,
  setShowDeleteConfirm,
  setShowChatInfo,
  openConversation,
  ensureAndOpenPatientChat,
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
  addIncomingMessage,
} = messagesSlice.actions

export function selectMessagesState(state) {
  return state.messages
}

export function selectActiveConversations(state) {
  return state.messages.workspace === 'doctor'
    ? state.messages.doctorConversations
    : state.messages.conversations
}

export function selectMessagesBadge(state) {
  return selectActiveConversations(state).filter((item) => item.unread).length
}

export default messagesSlice.reducer
