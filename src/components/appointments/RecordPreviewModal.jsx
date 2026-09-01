import { Download, File, FileText, FlaskConical, Image, Pill, X } from 'lucide-react'

const typeIcons = {
  Lab: FlaskConical,
  Rx: Pill,
  Image: Image,
  Note: FileText,
  File: File,
}

export default function RecordPreviewModal({ record, onClose, onDownload }) {
  if (!record) return null

  const Icon = typeIcons[record.type] || File

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E2124]/40">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="record-preview-title"
        className="w-full max-w-lg rounded-2xl border border-[#E6E8EC] bg-white shadow-lg overflow-hidden"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#E6E8EC] px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EBF5FF] text-[#2F80ED]">
              <Icon className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <div className="min-w-0">
              <h3 id="record-preview-title" className="truncate text-[16px] font-bold text-[#1E2124]">
                {record.title}
              </h3>
              <p className="text-[12px] text-[#6B7280]">
                {record.doctorName} · {record.date}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg cursor-pointer hover:bg-[#F3F4F6]"
            aria-label="Close preview"
          >
            <X className="h-4 w-4 text-[#1E2124]" strokeWidth={1.8} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-4 py-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#E8F2F9] px-2.5 py-1 text-[11px] font-semibold text-[#1E2124]">
              {record.type}
            </span>
            {record.size ? (
              <span className="rounded-full bg-[#F3F4F6] px-2.5 py-1 text-[11px] font-medium text-[#6B7280]">
                {record.size}
              </span>
            ) : null}
            {record.clinic ? (
              <span className="rounded-full bg-[#F3F4F6] px-2.5 py-1 text-[11px] font-medium text-[#6B7280]">
                {record.clinic}
              </span>
            ) : null}
          </div>

          {record.previewImage ? (
            <div className="overflow-hidden rounded-xl border border-[#E6E8EC]">
              <img src={record.previewImage} alt={record.title} className="w-full h-48 object-cover" />
            </div>
          ) : null}

          <div className="rounded-xl bg-[#F8FAFC] px-3.5 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.04em] text-[#8A8F98] mb-1.5">
              Summary
            </p>
            <p className="text-sm leading-relaxed text-[#1E2124]">{record.summary}</p>
          </div>
        </div>

        <div className="flex gap-2 border-t border-[#E6E8EC] px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 min-h-10 rounded-xl border border-[#1E2124] text-sm font-semibold text-[#1E2124] cursor-pointer hover:bg-[#F3F4F6]"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onDownload?.(record)}
            className="flex-1 min-h-10 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#1E2124] text-sm font-semibold text-white cursor-pointer hover:bg-[#36393F]"
          >
            <Download className="h-4 w-4" strokeWidth={1.8} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}
