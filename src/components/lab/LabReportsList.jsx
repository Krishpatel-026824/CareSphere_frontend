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
              className="w-full rounded-2xl border border-border-gray bg-white p-4 shadow-sm text-left cursor-pointer hover:border-teal/40"
            >
              <div className="flex items-center gap-3.5">
                <span className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-border-gray bg-bg-gray">
                  {report.preview ? (
                    <img
                      src={report.preview}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="w-full h-full flex items-center justify-center bg-violet-50 text-violet-600">
                      <FlaskConical className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-navy truncate">{report.title}</h3>
                  <p className="text-xs text-body-gray mt-0.5 truncate">{report.doctorName}</p>
                  <p className="text-xs text-body-gray mt-1">
                    {report.dateLabel} · {report.parameters.length} parameters · {report.status}
                  </p>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-body-gray shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-body-gray shrink-0" />
                )}
              </div>
            </button>

            {isOpen ? <LabReportDetail report={report} /> : null}
          </div>
        )
      })}
    </section>
  )
}
