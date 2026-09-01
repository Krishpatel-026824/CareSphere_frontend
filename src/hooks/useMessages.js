import { useCallback, useEffect, useRef } from 'react'
import { getAutoReply } from '../data/generators/messageReply'
import { sortConversationsByPin } from '../data/generators/messagePinGenerator'
import { findDoctorPatientsForChat } from '../data/generators/doctorPatientChatGenerator'
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
  ensureAndOpenPatientChat as ensureAndOpenPatientChatAction,
  openConversation as openConversationAction,
  pinConversation as pinConversationAction,
  selectActiveConversations,
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
    selectedId,
    draft,
    query,
    listFilter,
    isTyping,
    showDeleteConfirm,
    showChatInfo,
    pinNotice,
  } = useAppSelector((state) => state.messages)
  const workspace = useAppSelector((state) => state.messages.workspace)
  const conversations = useAppSelector(selectActiveConversations)
  const isDoctor = workspace === 'doctor'

  const replyTimer = useRef(null)
  const readTimer = useRef(null)
  const composerRef = useRef(null)
  const hasAutoSelected = useRef(false)

  const unreadCount = conversations.filter((item) => item.unread).length
  const selected = conversations.find((item) => item.id === selectedId) || null

  const filtered = sortConversationsByPin(
    conversations.filter((item) => {
      if (listFilter === 'unread' && !item.unread) return false
      if (listFilter === 'starred' && !item.pinnedAt) return false
      const q = query.trim().toLowerCase()
      if (!q) return true
      return (
        item.doctorName.toLowerCase().includes(q) ||
        item.specialty.toLowerCase().includes(q) ||
        (item.clinic || '').toLowerCase().includes(q) ||
        (item.lastMessage || '').toLowerCase().includes(q)
      )
    }),
  )

  const patientMatches = isDoctor ? findDoctorPatientsForChat(query, conversations) : []

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

  const startPatientChat = useCallback(
    (patient) => {
      dispatch(ensureAndOpenPatientChatAction(patient))
    },
    [dispatch],
  )

  function closeConversation() {
    clearChatTimers()
    dispatch(closeConversationAction())
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

  function buildAutoAttachment(replyHint = '') {
    const text = replyHint.toLowerCase()
    const wantsLab = text.includes('lab') || text.includes('report') || text.includes('ecg')
    const wantsPhoto = text.includes('photo') || text.includes('image') || text.includes('scan')
    if (!wantsLab && !wantsPhoto) return null

    if (wantsLab) {
      const labSummary = [
        'CareSphere Lab Summary',
        'Patient: Krish Patel',
        'Test: Lipid Profile',
        'Total Cholesterol: 182 mg/dL',
        'HDL: 52 mg/dL',
        'LDL: 109 mg/dL',
      ].join('\n')
      const blob = new Blob([labSummary], { type: 'text/plain' })
      return {
        kind: 'file',
        name: 'lab-report-summary.pdf',
        size: blob.size,
        type: 'application/pdf',
        url: URL.createObjectURL(blob),
      }
    }

    const photoSvg = encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="560" viewBox="0 0 900 560"><rect width="900" height="560" fill="#e6f7f5"/><rect x="56" y="56" width="788" height="448" rx="28" fill="#d5f2ee"/><circle cx="238" cy="212" r="74" fill="#8dd9cf"/><path d="M132 420l160-152 114 112 96-84 168 124H132z" fill="#3bb4a0"/><rect x="108" y="96" width="266" height="44" rx="10" fill="#0f766e"/><text x="128" y="125" font-family="Arial, sans-serif" font-size="24" fill="#ffffff">Shared medical photo</text></svg>`,
    )
    return {
      kind: 'image',
      name: 'shared-photo.jpg',
      size: 0,
      type: 'image/jpeg',
      url: `data:image/svg+xml;charset=utf-8,${photoSvg}`,
    }
  }

  function queueReply(chatId, conversation, userText) {
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
      const replyAttachment = buildAutoAttachment(userText)
      dispatch(
        addReply({
          chatId,
          reply: {
            id: `reply-${Date.now()}`,
            from: 'them',
            text: replyText,
            time: replyStamp,
            attachment: replyAttachment,
          },
        }),
      )
      replyTimer.current = null
    }, 900)
  }

  function sendOutgoing(chatId, message, previewText, replyHint) {
    const conversation = conversations.find((item) => item.id === chatId)
    if (!conversation) return
    const status = 'delivered'
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
    const isLabFile = /pdf|csv|xls|xlsx|txt|doc|docx/i.test(file.name) || /pdf|text|spreadsheet|msword/i.test(file.type)
    const previewText = caption || (isImage ? 'Photo shared' : isLabFile ? 'Lab report shared' : file.name)
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
      isImage ? 'photo attachment' : isLabFile ? 'lab report attachment' : 'shared a file report',
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
    patientMatches,
    isDoctor,
    openConversation,
    startPatientChat,
    autoSelectFirst,
    closeConversation,
    confirmDeleteChat,
    togglePin,
    sendMessage,
    sendAttachment,
    deleteForMe: (messageId) => dispatch(deleteForMeAction(messageId)),
    deleteForEveryone: (messageId) => dispatch(deleteForEveryoneAction(messageId)),
  }
}
