import { Download } from 'lucide-react'
import { downloadHealthReport } from '../../utils/downloadRecord'

function statusTone(status) {
  if (status === 'High' || status === 'Low') return 'text-white bg-rose-600'
  return 'text-white bg-teal'
}

function reportStatusTone(status) {
  if (status === 'Ready for review') return 'bg-amber text-white'
  if (status === 'Ready') return 'bg-teal text-white'
  return 'bg-teal text-white'
}

function reportNumber(report) {
  if (report.bookingRef) return report.bookingRef
  if (report.testCode && report.sample?.reportDate) {
    return `${report.testCode}-${String(report.sample.reportDate).replace(/\s+/g, '')}`
  }
  return report.testCode || 'CS-RPT'
}

function InfoCard({ title, children }) {
  return (
    <div className="rounded-xl border border-border-gray bg-white overflow-hidden shadow-sm">
      <div className="px-4 py-2.5 bg-navy">
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-white">{title}</p>
      </div>
      <dl className="flex flex-col divide-y divide-border-gray px-4 py-1">{children}</dl>
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
    <div className="flex items-baseline justify-between gap-4 py-2.5 first:pt-3 last:pb-3">
      <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-body-gray shrink-0">
        {label}
      </dt>
      <dd className={`${valueClass} text-right`}>{value}</dd>
    </div>
  )
}

export default function LabReportDetail({ report, hideDownload = false, embedded = false }) {
  if (!report) return null

  function handleDownload() {
    downloadHealthReport(report)
  }

  const body = (
    <>
      {!embedded ? (
        <header className="px-4 sm:px-6 pt-4 sm:pt-5 pb-4 border-b border-border-gray bg-navy text-white">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight">
                {report.testName}
              </h3>
              <p className="text-[13px] text-teal-light mt-1.5 font-medium">
                {[report.dateLabel || report.sample?.reportDate, report.status]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${reportStatusTone(report.status)}`}
              >
                {report.status}
              </span>
              <p className="text-[10px] text-white/70 mt-2 uppercase tracking-wide font-semibold">
                Report No.
              </p>
              <p className="font-mono text-xs font-semibold tabular-nums tracking-wide text-teal-light">
                {reportNumber(report)}
              </p>
            </div>
          </div>
        </header>
      ) : null}

      {!embedded ? <div className="h-1.5 shrink-0 bg-teal" /> : null}

      <div className={`flex flex-col gap-5 ${embedded ? '' : 'p-4 sm:p-6 bg-[#F3F6F9]'}`}>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard title="Patient details">
            <InfoRow label="Name" value={report.patient.name} tone="name" />
            <InfoRow
              label="Age / Gender"
              value={`${report.patient.age} yrs · ${report.patient.gender}`}
            />
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

        <section className="rounded-xl border border-border-gray bg-white overflow-hidden shadow-sm">
          <div className="px-4 py-2.5 bg-navy">
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-white">Test results</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm border-collapse">
              <thead>
                <tr className="bg-teal-light text-left">
                  <th className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.06em] text-navy border-b border-teal/30">
                    Parameter
                  </th>
                  <th className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.06em] text-navy border-b border-teal/30">
                    Result
                  </th>
                  <th className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.06em] text-navy border-b border-teal/30">
                    Unit
                  </th>
                  <th className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.06em] text-navy border-b border-teal/30">
                    Reference
                  </th>
                  <th className="px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.06em] text-navy border-b border-teal/30">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {report.parameters.map((row, index) => {
                  const abnormal = row.status === 'High' || row.status === 'Low'
                  return (
                    <tr
                      key={row.name}
                      className={`border-t border-border-gray ${
                        abnormal ? 'bg-rose-50' : index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'
                      }`}
                    >
                      <td className="px-3 py-2.5 font-medium text-navy">{row.name}</td>
                      <td className="px-3 py-2.5 font-mono text-sm font-bold tabular-nums text-navy">
                        {row.value}
                      </td>
                      <td className="px-3 py-2.5 text-body-gray font-medium">{row.unit || '—'}</td>
                      <td className="px-3 py-2.5 text-body-gray font-medium">{row.reference}</td>
                      <td className="px-3 py-2.5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${statusTone(row.status)}`}
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

        <section className="rounded-xl border border-teal/30 bg-white p-4 shadow-sm">
          <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-teal mb-2">
            Clinical interpretation
          </p>
          <p className="font-sans text-sm text-navy leading-relaxed">{report.interpretation}</p>
          {report.verifiedBy || report.doctorName ? (
            <p className="text-[12px] text-body-gray mt-3 pt-3 border-t border-border-gray">
              Verified by{' '}
              <span className="font-bold text-navy">
                {report.verifiedBy || report.doctorName}
              </span>
            </p>
          ) : null}
        </section>

        {report.recommendations?.length ? (
          <section className="rounded-xl border border-border-gray bg-white p-4 shadow-sm">
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-navy mb-2">
              Recommendations
            </p>
            <ul className="list-disc pl-5 text-sm text-navy space-y-1.5 font-medium">
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
            className="w-full min-h-12 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-2 shadow-sm"
          >
            <Download className="w-5 h-5" strokeWidth={1.8} />
            Download PDF
          </button>
        )}
      </div>
    </>
  )

  if (embedded) return body

  return (
    <article className="rounded-2xl border border-border-gray bg-white shadow-[0_4px_18px_rgba(7,26,47,0.08)] overflow-hidden">
      {body}
    </article>
  )
}
