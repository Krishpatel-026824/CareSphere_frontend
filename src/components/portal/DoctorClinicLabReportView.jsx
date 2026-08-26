import { ArrowLeft } from 'lucide-react'
import LabReportDetail from '../lab/LabReportDetail'

export default function DoctorClinicLabReportView({
  report,
  backLabel,
  onBack,
  showBack = true,
  hideDownload = false,
  headerSlot = null,
  footerSlot = null,
}) {
  if (!report) return null

  return (
    <section className="bg-white rounded-[24px] border border-border-gray shadow-[0_8px_24px_rgba(15,23,42,0.06)] flex flex-col h-full min-h-0 overflow-hidden">
      {showBack ? (
        <div className="shrink-0 px-4 sm:px-5 py-3 border-b border-border-gray bg-[#F7FAFC]">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal cursor-pointer hover:opacity-70"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            {backLabel}
          </button>
        </div>
      ) : null}
      {headerSlot}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5">
        <LabReportDetail report={report} hideDownload={hideDownload} />
      </div>
      {footerSlot}
    </section>
  )
}
