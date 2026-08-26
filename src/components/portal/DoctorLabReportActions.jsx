import { CheckCircle2, Download } from 'lucide-react'

export default function DoctorLabReportActions({
  status,
  feedback = '',
  onVerify,
  onDownload,
}) {
  const canVerify = status === 'Ready for review'

  return (
    <div className="shrink-0 border-t border-[#E6EBF1] bg-white">
      {feedback ? (
        <div className="px-4 py-2 bg-[#E8F7F6] border-b border-teal/20">
          <p className="text-[12px] font-semibold text-teal">{feedback}</p>
        </div>
      ) : null}

      <div className="px-4 sm:px-5 py-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onVerify}
          disabled={!canVerify}
          className={`inline-flex items-center justify-center gap-2 min-h-10 px-4 rounded-xl text-[13px] font-semibold cursor-pointer transition-colors ${
            canVerify
              ? 'bg-teal text-white hover:bg-teal-dark'
              : 'bg-[#E8F0EE] text-body-gray cursor-not-allowed'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
          {canVerify ? 'Mark verified' : 'Verified'}
        </button>

        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center justify-center gap-2 min-h-10 px-3.5 rounded-xl text-[13px] font-semibold cursor-pointer bg-white border border-[#D5DEE8] text-navy hover:border-teal/40"
        >
          <Download className="w-4 h-4" strokeWidth={2} />
          Download
        </button>
      </div>
    </div>
  )
}
