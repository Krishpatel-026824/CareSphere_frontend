import { FileText } from 'lucide-react'
import { normalizeChatTimeLabel } from '../../utils/chatTime'
import { formatFileSize } from '../../utils/fileSize'
import { getOutgoingStatus } from '../../utils/messageStatus'
import EcgPreviewCard from './EcgPreviewCard'
import MessageTicks from './MessageTicks'

function fileExtension(name = '') {
  const parts = String(name).split('.')
  return parts.length > 1 ? parts.pop().toUpperCase() : 'FILE'
}

function isEcgAttachment(attachment) {
  const label = `${attachment?.name || ''} ${attachment?.url || ''}`.toLowerCase()
  return label.includes('ecg')
}

function MessageMeta({ time, showTicks, status }) {
  return (
    <span className="flex items-center justify-end gap-1 mt-1.5">
      <span className="text-[11px] tabular-nums text-body-gray/80">
        {normalizeChatTimeLabel(time)}
      </span>
      {showTicks ? <MessageTicks status={status} variant="onTeal" /> : null}
    </span>
  )
}

function DocumentAttachment({ attachment, onOpen }) {
  const ext = fileExtension(attachment.name)

  return (
    <button
      type="button"
      onClick={onOpen}
      className="cursor-pointer text-left w-full min-w-[14rem] max-w-[18rem] flex items-center gap-3 rounded-xl bg-white border border-[#E6EBF1] px-3 py-2.5 shadow-sm hover:bg-[#FAFCFD]"
    >
      <span className="w-10 h-10 rounded-lg bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0">
        <FileText className="w-5 h-5" strokeWidth={1.75} />
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold text-navy truncate">{attachment.name}</span>
        <span className="block text-[11px] text-body-gray mt-0.5">
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
  const isEcg = isImage && isEcgAttachment(attachment)
  const status = getOutgoingStatus(message)
  const deleted = Boolean(message.deleted)
  const hasCaption = Boolean(message.text?.trim())

  function openAttachment(event) {
    event.stopPropagation()
    onOpenAttachment?.(attachment, message.from)
  }

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
        className={`max-w-[min(78%,32rem)] rounded-[18px] px-3.5 py-2.5 cursor-pointer text-left break-words shadow-sm ${
          isMe
            ? 'bg-[#C5EBE6] text-navy border border-teal/20'
            : 'bg-white border border-teal/15 shadow-sm'
        } ${selected ? 'ring-2 ring-teal/30' : ''}`}
      >
        {deleted ? (
          <p className="text-[14px] leading-snug italic text-body-gray">This message was deleted</p>
        ) : null}

        {!deleted && attachment && isEcg ? (
          <div>
            <EcgPreviewCard
              url={attachment.url}
              name={attachment.name}
              onOpen={openAttachment}
            />
            {hasCaption ? (
              <p className="text-[14px] leading-snug text-navy mt-2.5">{message.text}</p>
            ) : null}
          </div>
        ) : null}

        {!deleted && attachment && isImage && !isEcg ? (
          <div>
            <button type="button" onClick={openAttachment} className="block cursor-pointer text-left w-full">
              <img
                src={attachment.url}
                alt={attachment.name || 'Attachment'}
                className="block max-h-[280px] w-full max-w-[18rem] rounded-xl object-cover bg-white"
              />
            </button>
            {hasCaption ? (
              <p className="text-[14px] leading-snug text-navy mt-2">{message.text}</p>
            ) : null}
          </div>
        ) : null}

        {!deleted && attachment && !isImage ? (
          <>
            <DocumentAttachment attachment={attachment} onOpen={openAttachment} />
            {hasCaption ? (
              <p className="text-[14px] leading-snug text-navy mt-2.5">{message.text}</p>
            ) : null}
          </>
        ) : null}

        {!deleted && !attachment ? (
          <p className="text-[14px] leading-snug text-navy">{message.text}</p>
        ) : null}

        <MessageMeta time={message.time} showTicks={isMe} status={status} />
      </div>
    </div>
  )
}
