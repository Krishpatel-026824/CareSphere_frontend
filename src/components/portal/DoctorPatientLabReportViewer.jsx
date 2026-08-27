import { X } from 'lucide-react'
import LabReportDetail from '../lab/LabReportDetail'

export default function DoctorPatientLabReportViewer({ report, onClose }) {
  if (!report) return null

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-navy/35 cursor-pointer"
        aria-label="Close report"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl max-h-[min(88dvh,760px)] rounded-2xl border border-[#E6EBF1] bg-white shadow-xl overflow-hidden flex flex-col">
        <div className="shrink-0 px-4 py-3 border-b border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[16px] font-bold text-navy truncate">
              {report.testName || report.title || 'Lab report'}
            </h3>
            <p className="text-[13px] text-body-gray mt-0.5 truncate">
              {[report.dateLabel, report.status].filter(Boolean).join(' · ')}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl border border-[#E6EBF1] bg-white text-navy inline-flex items-center justify-center cursor-pointer hover:border-teal hover:text-teal shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5">
          <LabReportDetail report={report} />
        </div>
      </div>
    </div>
  )
}
