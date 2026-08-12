import { useEffect, useRef } from 'react'
import { ArrowLeft, MessageSquareText, SendHorizontal, Trash2 } from 'lucide-react'
import { normalizeChatTimeLabel } from '../utils/chatTime'

export default function MessageThread({
  conversation,
  onBack,
  draft,
  onDraftChange,
  onSend,
  onDeleteChat,
  isTyping = false,
}) {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation?.messages, isTyping])

  if (!conversation) {
    return (
      <div className="chat-panel h-full min-h-[280px] lg:min-h-0 flex-1 rounded-2xl border border-border-gray bg-white shadow-md flex flex-col items-center justify-center gap-3 px-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-teal-light text-teal flex items-center justify-center">
          <MessageSquareText className="w-6 h-6" strokeWidth={1.75} />
        </div>
        <div>
          <p className="text-[15px] font-semibold text-navy tracking-tight">Select a conversation</p>
          <p className="text-sm text-body-gray mt-1 leading-relaxed">Open a chat from the left to read and reply.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-panel h-full min-h-0 flex-1 rounded-2xl border border-border-gray bg-white shadow-md flex flex-col overflow-hidden">
      <div className="px-4 sm:px-5 lg:px-6 py-3.5 sm:py-4 border-b border-teal/20 bg-teal-light/40 flex items-center gap-2.5 sm:gap-3 shrink-0">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="lg:hidden w-9 h-9 rounded-xl border border-border-gray bg-white flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Back to conversations"
          >
            <ArrowLeft className="w-4 h-4 text-navy" strokeWidth={1.75} />
          </button>
        ) : null}
        <div className="relative shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-teal-light overflow-hidden flex items-center justify-center text-teal ring-2 ring-white">
            {conversation.avatar ? (
              <img src={conversation.avatar} alt={conversation.doctorName} className="w-full h-full object-cover" />
            ) : (
              <MessageSquareText className="w-5 h-5" strokeWidth={1.75} />
            )}
          </div>
          {conversation.online ? (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] sm:text-[15px] font-semibold text-navy truncate tracking-tight leading-tight">
            {conversation.doctorName}
          </p>
          <p
            className={`text-[11px] sm:text-[12px] mt-0.5 truncate leading-tight ${
              isTyping || conversation.online ? 'text-emerald-600 font-medium' : 'text-body-gray font-normal'
            }`}
          >
            {isTyping ? 'Typing...' : conversation.online ? 'Online' : conversation.specialty}
          </p>
        </div>
        <button
          type="button"
          onClick={onDeleteChat}
          className="inline-flex items-center gap-1.5 min-h-9 px-3 sm:px-4 rounded-full bg-red-500 text-white text-[12px] sm:text-[13px] font-semibold cursor-pointer hover:bg-red-600 shrink-0 shadow-sm tracking-tight"
        >
          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.75} />
          <span className="hidden sm:inline">Delete chat</span>
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-5 lg:px-6 py-4 sm:py-5 flex flex-col gap-3.5 sm:gap-4 bg-white overscroll-y-contain">
        {conversation.messages.length === 0 && !isTyping ? (
          <div className="flex-1 flex items-center justify-center px-4">
            <p className="text-sm text-body-gray text-center leading-relaxed">
              No messages yet. Send a message to start.
            </p>
          </div>
        ) : (
          <>
            {conversation.messages.map((message) => {
              const isMe = message.from === 'me'
              return (
                <div key={message.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex flex-col max-w-[min(100%,85%)] sm:max-w-[min(100%,30rem)] ${isMe ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`rounded-2xl px-3.5 sm:px-4 py-2.5 break-words ${
                        isMe
                          ? 'bg-teal-light text-navy rounded-br-md'
                          : 'bg-[#F0F2F5] text-navy rounded-bl-md'
                      }`}
                    >
                      <p className="chat-message-text text-navy">{message.text}</p>
                    </div>
                    <p className="chat-time-label text-body-gray/75 mt-1.5 px-1">
                      {normalizeChatTimeLabel(message.time)}
                    </p>
                  </div>
                </div>
              )
            })}
            {isTyping ? (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-[#F0F2F5] px-4 py-2.5 text-body-gray chat-message-text">
                  Typing...
                </div>
              </div>
            ) : null}
            <div ref={messagesEndRef} aria-hidden="true" />
          </>
        )}
      </div>

      <form
        className="px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 lg:py-4 border-t border-border-gray shrink-0 bg-white safe-bottom"
        onSubmit={(event) => {
          event.preventDefault()
          onSend()
        }}
      >
        <div className="flex items-center gap-2 rounded-full border border-border-gray bg-white px-3.5 sm:px-4 py-1.5 shadow-sm">
          <input
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder="Type a message..."
            className="flex-1 min-w-0 min-h-10 bg-transparent text-navy outline-none placeholder:text-body-gray/60 placeholder:font-normal"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            className="w-9 h-9 rounded-full text-teal flex items-center justify-center cursor-pointer hover:bg-teal-light/60 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <SendHorizontal className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>
      </form>
    </div>
  )
}
