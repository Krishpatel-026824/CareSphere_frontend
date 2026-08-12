import { useEffect, useRef, useState } from 'react'
import DeleteChatConfirm from '../../components/DeleteChatConfirm'
import MessageThread from '../../components/MessageThread'
import ConversationList from '../../components/messages/ConversationList'
import { generateMessagesData } from '../../data/generators/messagesGenerator'
import { getAutoReply } from '../../data/generators/messageReply'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { formatChatTimestamp } from '../../utils/chatTime'

const EMPTY_CHAT_PREVIEW = 'No messages yet'

function nowStamp() {
  return formatChatTimestamp()
}

export default function MessagesScreen({ onUnreadChange }) {
  const { lg: isDesktop } = useBreakpoint()
  const initial = generateMessagesData()
  const [conversations, setConversations] = useState(initial.conversations)
  const [selectedId, setSelectedId] = useState(null)
  const [draft, setDraft] = useState('')
  const [query, setQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const replyTimer = useRef(null)
  const hasAutoSelected = useRef(false)

  const unreadCount = conversations.filter((item) => item.unread).length
  const selected = conversations.find((item) => item.id === selectedId) || null
  const showChatPanel = Boolean(selectedId)
  const showListPanel = !selectedId || isDesktop

  const filtered = conversations.filter((item) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      item.doctorName.toLowerCase().includes(q) ||
      item.specialty.toLowerCase().includes(q) ||
      item.lastMessage.toLowerCase().includes(q)
    )
  })

  useEffect(() => {
    onUnreadChange?.(unreadCount)
  }, [unreadCount, onUnreadChange])

  useEffect(() => {
    if (isDesktop && !hasAutoSelected.current && conversations.length > 0) {
      setSelectedId(conversations[0].id)
      hasAutoSelected.current = true
    }
  }, [isDesktop, conversations])

  useEffect(() => {
    return () => {
      if (replyTimer.current) clearTimeout(replyTimer.current)
    }
  }, [])

  function syncUnread(next) {
    onUnreadChange?.(next.filter((item) => item.unread).length)
  }

  function openConversation(id) {
    if (replyTimer.current) {
      clearTimeout(replyTimer.current)
      replyTimer.current = null
    }
    setIsTyping(false)
    setSelectedId(id)
    setDraft('')
    setConversations((prev) => {
      const next = prev.map((item) =>
        item.id === id ? { ...item, unread: false, unreadCount: 0 } : item,
      )
      syncUnread(next)
      return next
    })
  }

  function closeConversation() {
    setSelectedId(null)
    setDraft('')
    setIsTyping(false)
    if (replyTimer.current) {
      clearTimeout(replyTimer.current)
      replyTimer.current = null
    }
  }

  function requestDeleteChat() {
    if (!selectedId) return
    setShowDeleteConfirm(true)
  }

  function cancelDeleteChat() {
    setShowDeleteConfirm(false)
  }

  function confirmDeleteChat() {
    if (!selectedId) return

    if (replyTimer.current) {
      clearTimeout(replyTimer.current)
      replyTimer.current = null
    }
    setIsTyping(false)
    setDraft('')

    const chatId = selectedId
    setConversations((prev) => {
      const next = prev.map((item) => {
        if (item.id !== chatId) return item
        return {
          ...item,
          messages: [],
          lastMessage: EMPTY_CHAT_PREVIEW,
          timeLabel: '',
          unread: false,
          unreadCount: 0,
        }
      })
      syncUnread(next)
      return next
    })
    setShowDeleteConfirm(false)
  }

  function sendMessage() {
    const text = draft.trim()
    if (!text || !selectedId || isTyping) return

    const chatId = selectedId
    const stamp = nowStamp()
    const conversation = conversations.find((item) => item.id === chatId)
    if (!conversation) return

    setConversations((prev) =>
      prev.map((item) => {
        if (item.id !== chatId) return item
        return {
          ...item,
          lastMessage: text,
          timeLabel: stamp,
          messages: [...item.messages, { id: `local-${Date.now()}`, from: 'me', text, time: stamp }],
        }
      }),
    )
    setDraft('')
    setIsTyping(true)

    if (replyTimer.current) clearTimeout(replyTimer.current)
    replyTimer.current = setTimeout(() => {
      const replyText = getAutoReply(text, conversation)
      const replyStamp = nowStamp()
      setConversations((prev) =>
        prev.map((item) => {
          if (item.id !== chatId) return item
          return {
            ...item,
            lastMessage: replyText,
            timeLabel: replyStamp,
            messages: [
              ...item.messages,
              { id: `reply-${Date.now()}`, from: 'them', text: replyText, time: replyStamp },
            ],
          }
        }),
      )
      setIsTyping(false)
      replyTimer.current = null
    }, 900)
  }

  return (
    <div
      className={`messages-screen w-full bg-bg-gray ${
        showChatPanel && !isDesktop
          ? 'fixed inset-x-0 top-0 z-20 bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] overflow-hidden lg:static lg:inset-auto lg:bottom-auto lg:z-auto lg:overflow-visible lg:h-full'
          : 'min-h-full lg:h-full'
      }`}
    >
      <div
        className={`w-full max-w-[1400px] mx-auto page-pad flex flex-col h-full min-h-0 ${
          isDesktop ? 'py-4 sm:py-5 lg:py-6 gap-4 lg:gap-5' : showChatPanel ? 'py-0 gap-0' : 'py-4 gap-4'
        }`}
      >
        {showListPanel ? (
          <header className="shrink-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy tracking-tight">Messages</h1>
            <p className="text-sm text-body-gray mt-1">
              {unreadCount} unread message{unreadCount === 1 ? '' : 's'}
            </p>
          </header>
        ) : null}

        <div
          className={`grid min-h-0 flex-1 ${
            isDesktop
              ? 'grid-cols-1 lg:grid-cols-[minmax(260px,2fr)_minmax(0,3.5fr)] gap-4 lg:gap-5 h-full'
              : 'grid-cols-1 h-full'
          }`}
        >
          {showListPanel ? (
            <ConversationList
              items={filtered}
              selectedId={selectedId}
              query={query}
              onQueryChange={setQuery}
              onSelect={openConversation}
            />
          ) : null}

          {showChatPanel || isDesktop ? (
            <section className={`min-h-0 flex flex-col ${isDesktop ? 'h-full' : 'h-full flex-1'}`}>
              <MessageThread
                conversation={selected}
                onBack={isDesktop ? undefined : closeConversation}
                draft={draft}
                onDraftChange={setDraft}
                onSend={sendMessage}
                onDeleteChat={requestDeleteChat}
                isTyping={isTyping}
              />
            </section>
          ) : null}
        </div>
      </div>

      {showDeleteConfirm && selected ? (
        <DeleteChatConfirm
          doctorName={selected.doctorName}
          onCancel={cancelDeleteChat}
          onConfirm={confirmDeleteChat}
        />
      ) : null}
    </div>
  )
}
