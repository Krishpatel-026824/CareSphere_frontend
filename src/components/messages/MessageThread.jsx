import { useEffect, useRef, useState } from 'react'
import { MessageSquareText, Trash2, X } from 'lucide-react'
import ChatComposer from './ChatComposer'
import ChatHeader from './ChatHeader'
import MessageActionsMenu from './MessageActionsMenu'
import MessageAttachmentViewer from './MessageAttachmentViewer'
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
  const [viewerAttachment, setViewerAttachment] = useState(null)
  const [viewerSender, setViewerSender] = useState('')

  function toggleMessageSelection(message) {
    if (!message) return
    if (picked?.id === message.id) {
      setPicked(null)
      setSheet(null)
      return
    }
    setPicked(message)
    setSheet(null)
  }

  function handleDeleteSelected() {
    if (!picked) return
    if (picked.from === 'me' && !picked.deleted) onDeleteForEveryone?.(picked.id)
    else onDeleteForMe?.(picked.id)
    setPicked(null)
    setSheet(null)
  }

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
      <div className="chat-panel h-full min-h-0 flex flex-col items-center justify-center gap-3 px-6 text-center bg-[#F4F7FA]">
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
    <div className="chat-panel h-full min-h-0 flex flex-col overflow-hidden bg-[#EFF9F8]">
      {picked ? (
        <div className="shrink-0 h-14 px-3 sm:px-4 bg-white border-b border-[#E6EBF1] text-navy flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setPicked(null)
                setSheet(null)
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#F4F7FA]"
              aria-label="Clear selection"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
            <p className="text-sm font-semibold">1 selected</p>
          </div>
          <button
            type="button"
            onClick={handleDeleteSelected}
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-rose-50 text-rose-600"
            aria-label="Delete selected message"
          >
            <Trash2 className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      ) : (
        <ChatHeader
          conversation={conversation}
          isTyping={isTyping}
          onBack={onBack}
          onDeleteChat={onDeleteChat}
          onInfo={onInfo}
        />
      )}

      <div ref={boardRef} className="relative flex-1 min-h-0 overflow-hidden">
        <div className="chat-wallpaper absolute inset-0 pointer-events-none" />
        <div className="relative z-[1] h-full overflow-y-auto overflow-x-hidden px-4 sm:px-6 overscroll-y-contain">
          {conversation.messages.filter((message) => !message.removed).length === 0 && !isTyping ? (
            <div className="min-h-full flex items-center justify-center px-4">
              <p className="text-sm text-body-gray text-center">No messages yet. Send a message to start.</p>
            </div>
          ) : (
            <div className="pt-4 pb-6 flex flex-col gap-2.5">
              <div className="flex justify-center pb-1">
                <span className="text-[12px] font-semibold text-teal-dark bg-teal-light/70 border border-teal/20 px-4 py-1.5 rounded-full shadow-sm">
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
                    onSelect={toggleMessageSelection}
                    onOpenMenu={openMessageMenu}
                    onOpenAttachment={(attachment, from) => {
                      setViewerAttachment(attachment)
                      setViewerSender(from === 'me' ? 'You' : conversation.doctorName)
                    }}
                  />
                ))}
              {isTyping ? (
                <div className="flex justify-start">
                  <div className="chat-typing rounded-2xl rounded-bl-md bg-white border border-teal/20 shadow-sm">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              ) : null}
              <div ref={messagesEndRef} aria-hidden="true" />
            </div>
          )}
        </div>

        {viewerAttachment ? (
          <MessageAttachmentViewer
            attachment={viewerAttachment}
            senderName={viewerSender}
            onClose={() => {
              setViewerAttachment(null)
              setViewerSender('')
            }}
          />
        ) : null}

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
