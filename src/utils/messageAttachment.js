export function isPdfAttachment(attachment) {
  const type = attachment?.type || ''
  const name = attachment?.name || ''
  return type === 'application/pdf' || /\.pdf$/i.test(name)
}

export function isTextAttachment(attachment) {
  const type = attachment?.type || ''
  const name = attachment?.name || ''
  return type.startsWith('text/') || /\.(txt|csv|log|md)$/i.test(name)
}

function readDataTextUrl(url) {
  const comma = url.indexOf(',')
  if (comma === -1) return ''
  const meta = url.slice(0, comma)
  const data = url.slice(comma + 1)
  return meta.includes(';base64') ? atob(data) : decodeURIComponent(data)
}

export async function loadAttachmentPreview(attachment) {
  if (!attachment?.url) return { kind: 'unsupported' }

  if (attachment.kind === 'image' || attachment.type?.startsWith('image/')) {
    return { kind: 'image', url: attachment.url }
  }

  if (isPdfAttachment(attachment)) {
    return { kind: 'pdf', url: attachment.url }
  }

  if (isTextAttachment(attachment) || attachment.kind === 'file') {
    try {
      if (attachment.url.startsWith('data:text/')) {
        return { kind: 'text', text: readDataTextUrl(attachment.url) }
      }

      const response = await fetch(attachment.url)
      const text = await response.text()
      if (text.trim()) return { kind: 'text', text }
    } catch {
      // fall through
    }
  }

  return { kind: 'unsupported', url: attachment.url }
}
