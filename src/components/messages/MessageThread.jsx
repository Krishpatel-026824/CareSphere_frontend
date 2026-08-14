import { useEffect, useRef, useState } from 'react'
import { MessageSquareText } from 'lucide-react'
import ChatComposer from './ChatComposer'
import ChatHeader from './ChatHeader'
import MessageActionsMenu from './MessageActionsMenu'
import MessageBubble from './MessageBubble'
import MessageInfoSheet from './MessageInfoSheet'

export default function MessageThread({
  conversation,
  onBack,
  draft,
  onDraftChange,
  onSend,
  onAttach,
  onDeleteChat,
  onInfo,
  onDeleteForMe,
  onDeleteForEveryone,
  isTyping = false,
  composerRef,
}) {
  const messagesEndRef = useRef(null)
  const boardRef = useRef(null)
  const [picked, setPicked] = useState(null)
  const [sheet, setSheet] = useState(null)
  const [menuPos, setMenuPos] = useState(null)

  function openMessageMenu(message, event) {
    const board = boardRef.current?.getBoundingClientRect()
    const bubble = event?.currentTarget?.getBoundingClientRect()
    if (board && bubble) {
      const menuHeight = 148
      let top = bubble.bottom - board.top + 8
      if (top + menuHeight > board.height - 8) {
        top = Math.max(8, bubble.top - board.top - menuHeight - 8)
      }
      const isMine = message.from === 'me'
      setMenuPos(
        isMine
          ? { top, right: Math.max(8, board.right - bubble.right), left: 'auto' }
          : { top, left: Math.max(8, bubble.left - board.left), right: 'auto' },
      )
    } else {
      setMenuPos({ top: 72, right: 16, left: 'auto' })
    }
    setPicked(message)
    setSheet('actions')
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation?.messages, isTyping])

  if (!conversation) {
    return (
      <div className="chat-panel h-full min-h-[280px] lg:min-h-0 flex-1 rounded-2xl border border-border-gray bg-white shadow-sm flex flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-teal-light text-teal flex items-center justify-center">
          <MessageSquareText className="w-6 h-6" strokeWidth={1.75} />
        </div>
        <div>
          <p className="text-[15px] font-semibold text-navy tracking-tight">Select a conversation</p>
          <p className="text-sm text-body-gray mt-1 leading-relaxed">
            Open a chat from the left to read and reply.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-panel h-full min-h-0 flex-1 rounded-2xl border border-border-gray bg-white shadow-sm flex flex-col overflow-hidden">
      <ChatHeader
        conversation={conversation}
        isTyping={isTyping}
        onBack={onBack}
        onDeleteChat={onDeleteChat}
        onInfo={onInfo}
      />

      <div ref={boardRef} className="relative flex-1 min-h-0 flex flex-col">
        <div className="chat-wallpaper absolute inset-0 pointer-events-none" />
        <div className="relative z-[1] flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-5 py-4 flex flex-col gap-3 overscroll-y-contain">
          {conversation.messages.filter((message) => !message.removed).length === 0 && !isTyping ? (
            <div className="flex-1 flex items-center justify-center px-4">
              <p className="text-sm text-body-gray text-center">No messages yet. Send a message to start.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-center">
                <span className="rounded-full bg-white/90 border border-border-gray px-3 py-1 text-[11px] font-medium text-body-gray shadow-sm">
                  Today
                </span>
              </div>
              {conversation.messages
                .filter((message) => !message.removed)
                .map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    selected={picked?.id === message.id}
                    onSelect={openMessageMenu}
                  />
                ))}
              {isTyping ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-white border border-black/5 shadow-sm px-4 py-2.5 text-body-gray chat-message-text">
                    Typing...
                  </div>
                </div>
              ) : null}
              <div ref={messagesEndRef} aria-hidden="true" />
            </>
          )}
        </div>

        {sheet === 'actions' && picked ? (
          <MessageActionsMenu
            message={picked}
            position={menuPos}
            onClose={() => {
              setSheet(null)
              setPicked(null)
            }}
            onAction={(action) => {
              if (action === 'info') {
                setSheet('info')
                return
              }
              if (action === 'deleteForMe') onDeleteForMe?.(picked.id)
              if (action === 'deleteForEveryone') onDeleteForEveryone?.(picked.id)
              setSheet(null)
              setPicked(null)
            }}
          />
        ) : null}
      </div>

      <ChatComposer
        draft={draft}
        onDraftChange={onDraftChange}
        onSend={onSend}
        onAttach={onAttach}
        inputRef={composerRef}
      />

      {sheet && sheet !== 'actions' && picked ? (
        <MessageInfoSheet
          message={picked}
          senderName={picked.from === 'me' ? 'You' : conversation.doctorName}
          onClose={() => {
            setSheet(null)
            setPicked(null)
          }}
        />
      ) : null}
    </div>
  )
}
