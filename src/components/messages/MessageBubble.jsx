import { FileText } from 'lucide-react'
import { normalizeChatTimeLabel } from '../../utils/chatTime'
import { formatFileSize } from '../../utils/fileSize'
import { getOutgoingStatus } from '../../utils/messageStatus'
import MessageTicks from './MessageTicks'

function MessageMeta({ time, showTicks, status }) {
  return (
    <span className="chat-meta">
      <span className="chat-time-label">{normalizeChatTimeLabel(time)}</span>
      {showTicks ? <MessageTicks status={status} variant="light" /> : null}
    </span>
  )
}

export default function MessageBubble({ message, selected = false, onSelect, onOpenMenu, onOpenAttachment }) {
  const isMe = message.from === 'me'
  const attachment = message.attachment
  const isImage = attachment?.kind === 'image' && attachment.url
  const status = getOutgoingStatus(message)
  const deleted = Boolean(message.deleted)

  return (
    <div className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        role="button"
        tabIndex={0}
        onClick={(event) => onSelect?.(message, event)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onSelect?.(message, event)
          }
        }}
        onContextMenu={(event) => {
          event.preventDefault()
          onOpenMenu?.(message, event)
        }}
        className={`wa-bubble cursor-pointer ${isMe ? 'wa-bubble-out' : 'wa-bubble-in'} ${
          selected ? 'wa-bubble-selected' : ''
        }`}
      >
        {deleted ? (
          <p className="chat-message-text italic text-[#667781] after:clear-both after:table after:content-['']">
            This message was deleted
            <MessageMeta time={message.time} showTicks={isMe} status={status} />
          </p>
        ) : null}
        {!deleted && attachment ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onOpenAttachment?.(attachment, message.from)
            }}
            className={`mb-1 cursor-pointer text-left ${isImage ? 'block' : 'flex items-center gap-2.5 min-w-[12rem]'}`}
          >
            {isImage ? (
              <img
                src={attachment.url}
                alt={attachment.name || 'Attachment'}
                className="max-h-52 w-full max-w-[18rem] rounded-[6px] object-cover"
              />
            ) : (
              <>
                <span className="w-10 h-10 rounded-xl bg-white/80 text-[#00A884] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" strokeWidth={1.75} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold truncate text-[#111b21]">
                    {attachment.name}
                  </span>
                  <span className="block text-[11px] mt-0.5 text-[#667781]">
                    {formatFileSize(attachment.size)}
                  </span>
                </span>
              </>
            )}
          </button>
        ) : null}
        {!deleted ? (
          <p className="chat-message-text after:clear-both after:table after:content-['']">
            {message.text}
            <MessageMeta time={message.time} showTicks={isMe} status={status} />
          </p>
        ) : null}
      </div>
    </div>
  )
}
