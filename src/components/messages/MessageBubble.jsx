import { FileText } from 'lucide-react'
import { normalizeChatTimeLabel } from '../../utils/chatTime'
import { formatFileSize } from '../../utils/fileSize'
import { getOutgoingStatus } from '../../utils/messageStatus'
import MessageTicks from './MessageTicks'

function fileExtension(name = '') {
  const parts = String(name).split('.')
  return parts.length > 1 ? parts.pop().toUpperCase() : 'FILE'
}

function MessageMeta({ time, showTicks, status }) {
  return (
    <span className="chat-meta">
      <span className="chat-time-label">{normalizeChatTimeLabel(time)}</span>
      {showTicks ? <MessageTicks status={status} variant="light" /> : null}
    </span>
  )
}

function DocumentAttachment({ attachment, onOpen }) {
  const ext = fileExtension(attachment.name)

  return (
    <button
      type="button"
      onClick={onOpen}
      className="wa-doc-card cursor-pointer text-left w-full min-w-[14rem] max-w-[18rem]"
    >
      <span className="wa-doc-accent" aria-hidden="true" />
      <span className="wa-doc-icon">
        <FileText className="w-5 h-5" strokeWidth={1.75} />
      </span>
      <span className="wa-doc-body min-w-0">
        <span className="wa-doc-name">{attachment.name}</span>
        <span className="wa-doc-meta">
          {formatFileSize(attachment.size)}
          {ext ? ` · ${ext}` : ''}
        </span>
      </span>
    </button>
  )
}

export default function MessageBubble({ message, selected = false, onSelect, onOpenMenu, onOpenAttachment }) {
  const isMe = message.from === 'me'
  const attachment = message.attachment
  const isImage = attachment?.kind === 'image' && attachment.url
  const status = getOutgoingStatus(message)
  const deleted = Boolean(message.deleted)
  const hasCaption = Boolean(message.text?.trim())

  function openAttachment(event) {
    event.stopPropagation()
    onOpenAttachment?.(attachment, message.from)
  }

  return (
    <div className={`flex w-full px-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
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
        } ${attachment && !isImage ? 'wa-bubble-doc' : ''}`}
      >
        {deleted ? (
          <p className="chat-message-text italic text-[#667781] after:clear-both after:table after:content-['']">
            This message was deleted
            <MessageMeta time={message.time} showTicks={isMe} status={status} />
          </p>
        ) : null}

        {!deleted && attachment && isImage ? (
          <div className="wa-image-wrap">
            <button type="button" onClick={openAttachment} className="block cursor-pointer text-left w-full">
              <img
                src={attachment.url}
                alt={attachment.name || 'Attachment'}
                className="wa-image-preview"
              />
            </button>
            {hasCaption ? (
              <p className="chat-message-text wa-caption after:clear-both after:table after:content-['']">
                {message.text}
                <MessageMeta time={message.time} showTicks={isMe} status={status} />
              </p>
            ) : (
              <span className="wa-image-meta">
                <MessageMeta time={message.time} showTicks={isMe} status={status} />
              </span>
            )}
          </div>
        ) : null}

        {!deleted && attachment && !isImage ? (
          <>
            <DocumentAttachment attachment={attachment} onOpen={openAttachment} />
            {hasCaption ? (
              <p className="chat-message-text wa-caption after:clear-both after:table after:content-['']">
                {message.text}
                <MessageMeta time={message.time} showTicks={isMe} status={status} />
              </p>
            ) : (
              <p className="chat-message-text after:clear-both after:table after:content-['']">
                <MessageMeta time={message.time} showTicks={isMe} status={status} />
              </p>
            )}
          </>
        ) : null}

        {!deleted && !attachment ? (
          <p className="chat-message-text after:clear-both after:table after:content-['']">
            {message.text}
            <MessageMeta time={message.time} showTicks={isMe} status={status} />
          </p>
        ) : null}
      </div>
    </div>
  )
}
