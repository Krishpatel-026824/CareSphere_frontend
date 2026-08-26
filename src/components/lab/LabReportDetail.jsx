import { Download } from 'lucide-react'
import { downloadHealthReport } from '../../utils/downloadRecord'

function statusTone(status) {
  if (status === 'High' || status === 'Low') return 'text-rose-700 bg-rose-50'
  return 'text-emerald-700 bg-emerald-50'
}

function reportStatusTone(status) {
  if (status === 'Ready for review') return 'bg-amber-400/20 text-amber-50'
  return 'bg-white/15 text-emerald-100'
}

function InfoCard({ title, children }) {
  return (
    <div className="rounded-xl border border-border-gray bg-[#F8FBFC] p-4 sm:p-5">
      <p className="font-display text-[15px] font-bold text-navy mb-3">{title}</p>
      <dl className="flex flex-col divide-y divide-border-gray/80">{children}</dl>
    </div>
  )
}

function InfoRow({ label, value, tone = 'text' }) {
  const valueClass =
    tone === 'id'
      ? 'font-mono text-[13px] font-semibold tabular-nums tracking-wide text-navy'
      : tone === 'name'
        ? 'font-display text-[15px] font-bold text-navy'
        : 'font-sans text-sm font-semibold text-navy'

  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
      <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-body-gray/80 shrink-0">
        {label}
      </dt>
      <dd className={`${valueClass} text-right`}>{value}</dd>
    </div>
  )
}

function reportNumber(report) {
  if (report.bookingRef) return report.bookingRef
  if (report.testCode && report.sample?.reportDate) {
    return `${report.testCode}-${String(report.sample.reportDate).replace(/\s+/g, '')}`
  }
  return report.testCode || 'CS-RPT'
}

export default function LabReportDetail({ report, hideDownload = false }) {
  if (!report) return null

  function handleDownload() {
    downloadHealthReport({
      title: report.testName,
      reportId: reportNumber(report),
      dateLabel: report.sample?.reportDate,
      timeLabel: report.sample?.reportTime,
      doctorName: report.doctorName,
      hospital: report.lab?.name,
      interpretation: report.interpretation,
      parameters: report.parameters,
      verifiedBy: report.doctorName,
    })
  }

  return (
    <article className="rounded-2xl border border-border-gray bg-white shadow-sm overflow-hidden">
      <header className="bg-gradient-to-r from-[#0F766E] to-[#0D9488] px-4 sm:px-6 py-4 sm:py-5 text-white">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
              {report.lab?.name || 'CareSphere Diagnostics'}
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold mt-1 leading-tight">{report.testName}</h3>
            <p className="text-xs text-white/75 mt-1.5">
              {report.lab?.accreditation || 'NABL Accredited · ISO 15189'}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${reportStatusTone(report.status)}`}
            >
              {report.status}
            </span>
            <p className="text-[10px] text-white/70 mt-2">Report No.</p>
            <p className="font-mono text-xs font-semibold tabular-nums tracking-wide">{reportNumber(report)}</p>
            {report.testCode ? (
              <p className="font-mono text-[10px] text-white/70 mt-1 tracking-wide">Code · {report.testCode}</p>
            ) : null}
          </div>
        </div>
      </header>

      <div className="p-4 sm:p-6 flex flex-col gap-5">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard title="Patient details">
            <InfoRow label="Name" value={report.patient.name} tone="name" />
            <InfoRow label="Age / Gender" value={`${report.patient.age} yrs · ${report.patient.gender}`} />
            <InfoRow label="Patient ID" value={report.patient.patientId} tone="id" />
            <InfoRow label="Phone" value={report.patient.phone} tone="id" />
          </InfoCard>

          <InfoCard title="Lab & sample">
            <InfoRow label="Lab" value={report.lab.name} />
            <InfoRow label="Accreditation" value={report.lab.accreditation} />
            <InfoRow
              label="Collection"
              value={`${report.sample.collectionDate} · ${report.sample.collectionTime}`}
            />
            <InfoRow
              label="Report date"
              value={`${report.sample.reportDate} · ${report.sample.reportTime}`}
            />
          </InfoCard>
        </section>

        <section>
          <p className="font-display text-[15px] font-bold text-navy mb-3">Test results</p>
          <div className="overflow-x-auto rounded-xl border border-border-gray">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="bg-[#E0F2FE] text-left">
                  <th className="px-3 py-2.5 font-semibold text-navy">Parameter</th>
                  <th className="px-3 py-2.5 font-semibold text-navy">Result</th>
                  <th className="px-3 py-2.5 font-semibold text-navy">Unit</th>
                  <th className="px-3 py-2.5 font-semibold text-navy">Reference</th>
                  <th className="px-3 py-2.5 font-semibold text-navy">Status</th>
                </tr>
              </thead>
              <tbody>
                {report.parameters.map((row) => {
                  const abnormal = row.status === 'High' || row.status === 'Low'
                  return (
                    <tr
                      key={row.name}
                      className={`border-t border-border-gray ${abnormal ? 'bg-rose-50/40' : ''}`}
                    >
                      <td className="px-3 py-2.5 text-body-gray">{row.name}</td>
                      <td className="px-3 py-2.5 font-mono text-sm font-semibold tabular-nums text-navy">
                        {row.value}
                      </td>
                      <td className="px-3 py-2.5 text-body-gray">{row.unit}</td>
                      <td className="px-3 py-2.5 text-body-gray">{row.reference}</td>
                      <td className="px-3 py-2.5">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${statusTone(row.status)}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-border-gray bg-bg-gray/30 p-4">
          <p className="font-display text-[15px] font-bold text-navy mb-1.5">Clinical interpretation</p>
          <p className="font-sans text-sm text-body-gray leading-relaxed">{report.interpretation}</p>
        </section>

        {report.recommendations?.length ? (
          <section className="rounded-xl border border-border-gray p-4">
            <p className="font-display text-[15px] font-bold text-navy mb-2">Recommendations</p>
            <ul className="list-disc pl-5 text-sm text-body-gray space-y-1">
              {report.recommendations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {hideDownload ? null : (
          <button
            type="button"
            onClick={handleDownload}
            className="w-full min-h-12 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" strokeWidth={1.8} />
            Download report
          </button>
        )}
      </div>
    </article>
  )
}
