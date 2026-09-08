import { Download } from 'lucide-react'
import { downloadHealthReport } from '../../utils/downloadRecord'

function statusTone(status) {
  if (status === 'High' || status === 'Low') return 'text-white bg-rose-600'
  return 'text-white bg-teal'
}

function reportStatusTone(status) {
  if (status === 'Ready for review') return 'bg-amber text-white'
  if (status === 'Delivered' || status === 'Ready' || status === 'Completed') return 'bg-teal text-white'
  return 'bg-teal text-white'
}

function isPrescription(record) {
  return (
    record.type === 'Pharmacy' ||
    String(record.title || '')
      .toLowerCase()
      .includes('prescription')
  )
}

function reportKindLabel(record) {
  if (isPrescription(record)) return 'Prescription'
  return `${record.type} report`
}

function findingsRows(record) {
  return (record.findings || []).filter((row) => {
    const label = String(row.label || '').toLowerCase()
    return label !== 'subtotal' && label !== 'total' && !label.includes('₹')
  })
}

function InfoCard({ title, children }) {
  return (
    <div className="rounded-xl border border-border-gray bg-white overflow-hidden shadow-sm h-full">
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

export default function HealthRecordDetail({ record }) {
  if (!record) return null

  const rows = findingsRows(record)
  const findingsTitle = isPrescription(record) ? 'Medicines' : 'Report findings'

  return (
    <article className="rounded-2xl border border-border-gray bg-white shadow-[0_4px_18px_rgba(7,26,47,0.08)] overflow-hidden">
      <header className="px-4 sm:px-6 pt-4 sm:pt-5 pb-4 border-b border-border-gray bg-navy text-white">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal-light mb-1">
              {reportKindLabel(record)}
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight">{record.title}</h3>
            <p className="text-[13px] text-teal-light mt-1.5 font-medium">
              {[record.dateLabel, record.timeLabel, record.status].filter(Boolean).join(' · ')}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${reportStatusTone(record.status)}`}
            >
              {record.status}
            </span>
            <p className="text-[10px] text-white/70 mt-2 uppercase tracking-wide font-semibold">
              Report No.
            </p>
            <p className="font-mono text-xs font-semibold tabular-nums tracking-wide text-teal-light">
              {record.reportId || 'CS-RPT'}
            </p>
          </div>
        </div>
      </header>

      <div className="h-1.5 shrink-0 bg-teal" />

      <div className="flex flex-col gap-5 p-4 sm:p-6 bg-[#F3F6F9]">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
          <InfoCard title="Patient details">
            <InfoRow label="Name" value={record.patient.name} tone="name" />
            <InfoRow
              label="Age / Gender"
              value={`${record.patient.age} yrs · ${record.patient.gender}`}
            />
            <InfoRow label="Patient ID" value={record.patient.patientId} tone="id" />
            {record.patient.phone ? (
              <InfoRow label="Phone" value={record.patient.phone} tone="id" />
            ) : null}
          </InfoCard>

          <InfoCard title="Provider details">
            <InfoRow label="Doctor" value={record.doctorName} />
            <InfoRow label="Specialty" value={record.specialty} />
            <InfoRow label="Facility" value={record.hospital} />
          </InfoCard>
        </section>

        {record.visit ? (
          <section className="rounded-xl border border-border-gray bg-white overflow-hidden shadow-sm">
            <div className="px-4 py-2.5 bg-navy">
              <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-white">
                Visit information
              </p>
            </div>
            <dl className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-gray">
              <div className="px-4 py-3">
                <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-body-gray">
                  Mode
                </dt>
                <dd className="font-sans text-sm font-semibold text-navy mt-1">{record.visit.mode}</dd>
              </div>
              <div className="px-4 py-3">
                <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-body-gray">
                  Reason
                </dt>
                <dd className="font-sans text-sm font-semibold text-navy mt-1">{record.visit.reason}</dd>
              </div>
              <div className="px-4 py-3">
                <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-body-gray">
                  Referred by
                </dt>
                <dd className="font-sans text-sm font-semibold text-navy mt-1">
                  {record.visit.referredBy}
                </dd>
              </div>
            </dl>
          </section>
        ) : null}

        <section className="rounded-xl border border-border-gray bg-white overflow-hidden shadow-sm">
          <div className="px-4 py-2.5 bg-navy">
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-white">{findingsTitle}</p>
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
                {rows.map((row, index) => {
                  const abnormal = row.status === 'High' || row.status === 'Low'
                  return (
                    <tr
                      key={row.label}
                      className={`border-t border-border-gray ${
                        abnormal ? 'bg-rose-50' : index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'
                      }`}
                    >
                      <td className="px-3 py-2.5 font-medium text-navy">{row.label}</td>
                      <td className="px-3 py-2.5 font-mono text-sm font-bold tabular-nums text-navy">
                        {row.value}
                      </td>
                      <td className="px-3 py-2.5 text-body-gray font-medium">{row.unit || '—'}</td>
                      <td className="px-3 py-2.5 text-body-gray font-medium">{row.reference || '—'}</td>
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

        {record.interpretation ? (
          <section className="rounded-xl border border-teal/30 bg-white p-4 shadow-sm">
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-teal mb-2">
              Clinical interpretation
            </p>
            <p className="font-sans text-sm text-navy leading-relaxed">{record.interpretation}</p>
            {record.verifiedBy ? (
              <p className="text-[12px] text-body-gray mt-3 pt-3 border-t border-border-gray">
                Verified by <span className="font-bold text-navy">{record.verifiedBy}</span>
              </p>
            ) : null}
          </section>
        ) : null}

        {record.recommendations?.length ? (
          <section className="rounded-xl border border-border-gray bg-white p-4 shadow-sm">
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-navy mb-2">
              Recommendations
            </p>
            <ul className="list-disc pl-5 text-sm text-navy space-y-1.5 font-medium">
              {record.recommendations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <button
          type="button"
          onClick={() => downloadHealthReport(record)}
          className="w-full min-h-12 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-2 shadow-sm"
        >
          <Download className="w-5 h-5" strokeWidth={1.8} />
          Download PDF
        </button>
      </div>
    </article>
  )
}
