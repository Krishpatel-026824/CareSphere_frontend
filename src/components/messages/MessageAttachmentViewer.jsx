import { useEffect, useState } from 'react'
import { Download, FileText, X } from 'lucide-react'
import { formatFileSize } from '../../utils/fileSize'
import { downloadChatAttachment, loadAttachmentPreview } from '../../utils/messageAttachment'

function parseLabReport(text = '') {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length === 0) return null

  const entries = lines
    .map((line) => {
      const idx = line.indexOf(':')
      if (idx === -1) return null
      const key = line.slice(0, idx).trim()
      const value = line.slice(idx + 1).trim()
      if (!key || !value) return null
      return { key, value }
    })
    .filter(Boolean)

  if (entries.length < 2) return null
  const reportTitle = lines[0].toLowerCase().includes('report') ? lines[0] : 'Lab Report'
  return { title: reportTitle, entries }
}

export default function MessageAttachmentViewer({ attachment, senderName, onClose }) {
  const [preview, setPreview] = useState({ kind: 'loading' })
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    if (!attachment) return undefined
    let active = true
    setPreview({ kind: 'loading' })

    loadAttachmentPreview(attachment).then((result) => {
      if (active) setPreview(result)
    })

    return () => {
      active = false
    }
  }, [attachment])

  async function handleDownload() {
    if (downloading) return
    setDownloading(true)
    try {
      await downloadChatAttachment(attachment, preview)
    } finally {
      setDownloading(false)
    }
  }

  if (!attachment) return null
  const parsedReport = preview.kind === 'text' ? parseLabReport(preview.text) : null
  const canDownload = preview.kind !== 'loading' && preview.kind !== 'unsupported'

  return (
    <div
      className="absolute inset-0 z-[60] flex items-center justify-center bg-[#1E2124]/55 p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="attachment-viewer-title"
        className="w-full max-w-2xl max-h-[min(92%,calc(100%-1rem))] rounded-2xl border border-[#E6E8EC] bg-white shadow-xl overflow-hidden flex flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#E6E8EC] px-4 py-3 shrink-0">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-light text-teal">
              <FileText className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <div className="min-w-0">
              <h3 id="attachment-viewer-title" className="truncate text-base font-bold text-navy">
                {attachment.name || 'Attachment'}
              </h3>
              <p className="text-xs text-body-gray mt-0.5">
                {senderName ? `${senderName} · ` : ''}
                {formatFileSize(attachment.size)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg cursor-pointer hover:bg-[#F3F4F6]"
            aria-label="Close attachment"
          >
            <X className="h-4 w-4 text-navy" strokeWidth={1.8} />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-auto px-4 py-4">
          {preview.kind === 'loading' ? (
            <p className="text-sm text-body-gray">Loading report...</p>
          ) : null}

          {preview.kind === 'image' ? (
            <img
              src={preview.url}
              alt={attachment.name || 'Attachment'}
              className="w-full max-h-[60vh] rounded-xl object-contain bg-[#F8FAFC]"
            />
          ) : null}

          {preview.kind === 'pdf' ? (
            <iframe
              title={attachment.name || 'Lab report'}
              src={preview.url}
              className="w-full h-[min(60vh,520px)] rounded-xl border border-[#E6E8EC] bg-[#F8FAFC]"
            />
          ) : null}

          {preview.kind === 'text' && parsedReport ? (
            <div className="rounded-xl border border-[#DCE6E5] bg-white overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E6E8EC] bg-[#F6FAFA]">
                <p className="text-[11px] font-semibold tracking-[0.04em] text-[#667781] uppercase">
                  Laboratory Report
                </p>
                <h4 className="text-base font-bold text-navy mt-1">{parsedReport.title}</h4>
              </div>
              <div className="px-4 py-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {parsedReport.entries.map((entry) => (
                    <div key={`${entry.key}-${entry.value}`} className="rounded-lg border border-[#E6E8EC] bg-[#FAFCFD] px-3 py-2">
                      <p className="text-[11px] uppercase tracking-[0.03em] text-[#7A8794]">{entry.key}</p>
                      <p className="text-sm font-semibold text-navy mt-0.5">{entry.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {preview.kind === 'text' && !parsedReport ? (
            <pre className="whitespace-pre-wrap rounded-xl border border-[#E6E8EC] bg-[#F8FAFC] px-4 py-3 text-sm leading-relaxed text-navy font-sans">
              {preview.text}
            </pre>
          ) : null}

          {preview.kind === 'unsupported' ? (
            <div className="rounded-xl border border-[#E6E8EC] bg-[#F8FAFC] px-4 py-6 text-center">
              <p className="text-sm text-body-gray">
                This file type cannot be previewed here. Download to open it on your device.
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex gap-2 border-t border-[#E6E8EC] px-4 py-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 min-h-10 rounded-xl border border-navy text-sm font-semibold text-navy cursor-pointer hover:bg-[#F3F4F6]"
          >
            Close
          </button>
          {canDownload ? (
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 min-h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-navy text-sm font-semibold text-white hover:bg-[#36393F] disabled:opacity-60 cursor-pointer"
            >
              <Download className="h-4 w-4" strokeWidth={1.8} />
              {downloading ? 'Preparing PDF…' : 'Download PDF'}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
