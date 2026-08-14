import { Download, Eye, File, FileText, FlaskConical, Image, Pill } from 'lucide-react'

const typeIcons = {
  Lab: FlaskConical,
  Rx: Pill,
  Image: Image,
  Note: FileText,
  File: File,
}

export default function RecordFileCard({ record, onView, onDownload }) {
  const Icon = typeIcons[record.type] || File

  return (
    <article className="flex items-center gap-3 rounded-xl border border-[#E6E8EC] bg-white px-3.5 py-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EBF5FF] text-[#2F80ED]">
        <Icon className="h-4 w-4" strokeWidth={1.8} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#1E2124]">{record.title}</p>
        <p className="mt-0.5 truncate text-[12px] text-[#6B7280]">
          {record.date}
          {record.size ? ` · ${record.size}` : ''}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onView?.(record)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E6E8EC] text-[#1E2124] cursor-pointer hover:bg-[#EBF5FF]"
        aria-label={`View ${record.title}`}
      >
        <Eye className="h-4 w-4" strokeWidth={1.8} />
      </button>
      <button
        type="button"
        onClick={() => onDownload?.(record)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E6E8EC] text-[#1E2124] cursor-pointer hover:bg-[#EBF5FF]"
        aria-label={`Download ${record.title}`}
      >
        <Download className="h-4 w-4" strokeWidth={1.8} />
      </button>
    </article>
  )
}
