import { chatAttachmentReports } from '../data/mocks/chatAttachmentReports'
import {
  downloadImageDocumentPdf,
  downloadParsedTextReportPdf,
  downloadUrlAsPdf,
  toPdfFileName,
} from './downloadSimplePdf'

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

export function isEmptyDataUrl(url) {
  if (!url || typeof url !== 'string') return true
  if (!url.startsWith('data:')) return false
  const comma = url.indexOf(',')
  if (comma === -1) return true
  return url.slice(comma + 1).trim().length === 0
}

export function getMockReportText(attachment) {
  const key = attachment?.reportKey || attachment?.name
  const report = chatAttachmentReports[key]
  return report?.text || null
}

export async function loadAttachmentPreview(attachment) {
  const mockText = getMockReportText(attachment)

  if (!attachment?.url && !mockText) return { kind: 'unsupported' }

  if (attachment.kind === 'image' || attachment.type?.startsWith('image/')) {
    if (attachment.url) return { kind: 'image', url: attachment.url }
    return { kind: 'unsupported' }
  }

  if (isPdfAttachment(attachment)) {
    if (!attachment.url || isEmptyDataUrl(attachment.url)) {
      if (mockText) return { kind: 'text', text: mockText }
      return { kind: 'unsupported' }
    }
    return { kind: 'pdf', url: attachment.url }
  }

  if (isTextAttachment(attachment) || attachment.kind === 'file') {
    try {
      if (attachment.url?.startsWith('data:text/')) {
        return { kind: 'text', text: readDataTextUrl(attachment.url) }
      }

      if (attachment.url) {
        const response = await fetch(attachment.url)
        const text = await response.text()
        if (text.trim()) return { kind: 'text', text }
      }

      if (mockText) return { kind: 'text', text: mockText }
    } catch {
      if (mockText) return { kind: 'text', text: mockText }
    }
  }

  if (mockText) return { kind: 'text', text: mockText }

  return { kind: 'unsupported', url: attachment.url }
}

export async function downloadChatAttachment(attachment, preview) {
  if (!attachment) return

  const pdfName =
    attachment.name?.toLowerCase().endsWith('.pdf')
      ? attachment.name
      : toPdfFileName(attachment.name?.replace(/\.[^.]+$/, '') || 'caresphere-report')

  if (preview?.kind === 'pdf' && attachment.url && !isEmptyDataUrl(attachment.url)) {
    await downloadUrlAsPdf(attachment.url, pdfName)
    return
  }

  if (preview?.kind === 'image' && preview.url) {
    await downloadImageDocumentPdf({
      title: attachment.name?.replace(/\.[^.]+$/, '') || 'CareSphere Image',
      imageUrl: preview.url,
      caption: attachment.caption,
      fileName: toPdfFileName(attachment.name?.replace(/\.[^.]+$/, '') || 'image-report'),
    })
    return
  }

  const text =
    preview?.kind === 'text'
      ? preview.text
      : getMockReportText(attachment)

  if (text) {
    downloadParsedTextReportPdf({ text, fileName: pdfName })
    return
  }

  if (attachment.url && !isEmptyDataUrl(attachment.url)) {
    await downloadUrlAsPdf(attachment.url, pdfName)
  }
}
