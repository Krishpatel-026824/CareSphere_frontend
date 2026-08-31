import { ChevronDown, ChevronUp, FlaskConical } from 'lucide-react'
import LabReportDetail from './LabReportDetail'

export default function LabReportsList({ reports, expandedId, onToggle }) {
  if (!reports.length) return null

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-bold text-navy">Your lab reports</h2>
        <p className="text-sm text-body-gray mt-1">
          Full reports are ready for your booked tests. Tap a report to view all details.
        </p>
      </div>

      {reports.map((report) => {
        const isOpen = expandedId === report.id

        return (
          <div key={report.id} className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => onToggle?.(isOpen ? null : report.id)}
              className={`w-full rounded-2xl border bg-white p-4 shadow-sm text-left cursor-pointer transition-colors ${
                isOpen ? 'border-teal/50 ring-1 ring-teal/20' : 'border-border-gray hover:border-teal/40'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-teal-light text-teal flex items-center justify-center shrink-0">
                    <FlaskConical className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-navy truncate">{report.testName}</h3>
                      <span className="inline-flex rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-semibold">
                        {report.status}
                      </span>
                    </div>
                    <p className="text-xs text-body-gray mt-1 truncate">{report.doctorName}</p>
                    <p className="text-xs text-body-gray mt-0.5">
                      {report.dateLabel} · {report.parameters.length} parameters
                    </p>
                  </div>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-teal shrink-0 mt-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-body-gray shrink-0 mt-1" />
                )}
              </div>
            </button>

            {isOpen ? <LabReportDetail report={report} embedded /> : null}
          </div>
        )
      })}
    </section>
  )
}
