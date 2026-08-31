import { Download, X } from 'lucide-react'
import { downloadHealthReport } from '../../utils/downloadRecord'
import LabReportDetail from '../lab/LabReportDetail'

export default function DoctorPatientLabReportViewer({ report, onClose }) {
  if (!report) return null

  function handleDownload() {
    downloadHealthReport(report)
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-navy/40 cursor-pointer"
        aria-label="Close report"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl max-h-[min(90dvh,820px)] rounded-2xl border border-[#E6EBF1] bg-white shadow-xl overflow-hidden flex flex-col">
        <div className="shrink-0 px-4 sm:px-5 py-3.5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-navy leading-tight truncate">
              {report.testName || report.title || 'Lab report'}
            </h3>
            <p className="text-[13px] sm:text-sm text-body-gray mt-1 truncate">
              {[report.dateLabel || report.sample?.reportDate, report.status]
                .filter(Boolean)
                .join(' · ')}
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

        <div className="h-1 shrink-0 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark" />

        <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-5 py-4 sm:py-5">
          <LabReportDetail report={report} embedded hideDownload />
        </div>

        <div className="shrink-0 px-4 sm:px-5 py-3 border-t border-[#E6EBF1] bg-[#F8FAFC]">
          <button
            type="button"
            onClick={handleDownload}
            className="w-full min-h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-2 shadow-sm"
          >
            <Download className="w-5 h-5" strokeWidth={1.8} />
            Download report
          </button>
        </div>
      </div>
    </div>
  )
}
