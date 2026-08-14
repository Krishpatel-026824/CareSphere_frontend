import { FileText } from 'lucide-react'
import { normalizeChatTimeLabel } from '../../utils/chatTime'
import { formatFileSize } from '../../utils/fileSize'
import { getOutgoingStatus } from '../../utils/messageStatus'
import MessageTicks from './MessageTicks'

function MessageMeta({ time, showTicks, status, isMe }) {
  return (
    <span className={`chat-meta ${isMe ? 'chat-meta-me' : ''}`}>
      <span className="chat-time-label">{normalizeChatTimeLabel(time)}</span>
      {showTicks ? <MessageTicks status={status} /> : null}
    </span>
  )
}

export default function MessageBubble({ message, selected = false, onSelect }) {
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
          onSelect?.(message, event)
        }}
        className={`max-w-[min(100%,42rem)] text-left rounded-2xl px-2.5 pt-1.5 pb-1 break-words shadow-sm cursor-pointer ${
          isMe
            ? 'bg-teal text-white rounded-br-sm'
            : 'bg-white text-navy rounded-bl-sm border border-black/5'
        } ${selected ? 'ring-2 ring-navy/40' : ''}`}
      >
        {deleted ? (
          <p className={`chat-message-text italic after:clear-both after:table after:content-[''] ${isMe ? 'text-white/90' : 'text-body-gray'}`}>
            This message was deleted
            <MessageMeta time={message.time} showTicks={isMe} status={status} isMe={isMe} />
          </p>
        ) : null}
        {!deleted && isImage ? (
          <a href={attachment.url} target="_blank" rel="noreferrer" className="block mb-1" onClick={(event) => event.preventDefault()}>
            <img
              src={attachment.url}
              alt={attachment.name || 'Attachment'}
              className="max-h-52 w-full max-w-[18rem] rounded-xl object-cover"
            />
          </a>
        ) : null}
        {!deleted && attachment && !isImage ? (
          <a
            href={attachment.url}
            download={attachment.name}
            className="flex items-center gap-2.5 min-w-[12rem] mb-1"
          >
            <span className="w-10 h-10 rounded-xl bg-white/80 text-teal flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" strokeWidth={1.75} />
            </span>
            <span className="min-w-0">
              <span className={`block text-sm font-semibold truncate ${isMe ? 'text-white' : 'text-navy'}`}>
                {attachment.name}
              </span>
              <span className={`block text-[11px] mt-0.5 ${isMe ? 'text-white/75' : 'text-body-gray'}`}>
                {formatFileSize(attachment.size)}
              </span>
            </span>
          </a>
        ) : null}
        {!deleted ? (
          <p className={`chat-message-text after:clear-both after:table after:content-[''] ${isMe ? 'text-white' : 'text-navy'}`}>
            {message.text}
            <MessageMeta time={message.time} showTicks={isMe} status={status} isMe={isMe} />
          </p>
        ) : null}
      </div>
    </div>
  )
}
