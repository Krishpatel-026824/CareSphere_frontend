import { Download } from 'lucide-react'
import { downloadHealthReport } from '../../utils/downloadRecord'

function statusTone(status) {
  if (status === 'High' || status === 'Low') return 'text-rose-600 bg-rose-50'
  return 'text-emerald-700 bg-emerald-50'
}

export default function HealthRecordDetail({ record }) {
  if (!record) return null

  return (
    <article className="rounded-2xl border border-border-gray bg-white shadow-sm overflow-hidden">
      <div className="px-4 sm:px-5 py-4 border-b border-border-gray bg-bg-gray/30">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal">{record.type} report</p>
            <h3 className="text-lg font-bold text-navy mt-1">{record.title}</h3>
            <p className="text-xs text-body-gray mt-1">
              Report ID: {record.reportId} · {record.dateLabel}
              {record.timeLabel ? ` · ${record.timeLabel}` : ''}
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold">
            {record.status}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-5 lg:gap-6">
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl border border-border-gray p-3.5">
            <p className="text-xs font-semibold text-navy mb-2">Patient details</p>
            <dl className="flex flex-col gap-1.5 text-body-gray">
              <div className="flex justify-between gap-3">
                <dt>Name</dt>
                <dd className="text-navy font-medium">{record.patient.name}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Age / Gender</dt>
                <dd className="text-navy font-medium">
                  {record.patient.age} yrs · {record.patient.gender}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Patient ID</dt>
                <dd className="text-navy font-medium">{record.patient.patientId}</dd>
              </div>
              {record.patient.phone ? (
                <div className="flex justify-between gap-3">
                  <dt>Phone</dt>
                  <dd className="text-navy font-medium">{record.patient.phone}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className="rounded-xl border border-border-gray p-3.5">
            <p className="text-xs font-semibold text-navy mb-2">Provider details</p>
            <dl className="flex flex-col gap-1.5 text-body-gray">
              <div className="flex justify-between gap-3">
                <dt>Doctor</dt>
                <dd className="text-navy font-medium text-right">{record.doctorName}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Specialty</dt>
                <dd className="text-navy font-medium text-right">{record.specialty}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Facility</dt>
                <dd className="text-navy font-medium text-right">{record.hospital}</dd>
              </div>
            </dl>
          </div>
        </section>

        {record.visit ? (
          <section className="rounded-xl border border-border-gray bg-bg-gray/30 p-3.5 text-sm">
            <p className="text-xs font-semibold text-navy mb-2">Visit information</p>
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-4 text-body-gray">
              <div>
                <dt className="text-xs">Mode</dt>
                <dd className="text-navy font-medium mt-0.5">{record.visit.mode}</dd>
              </div>
              <div>
                <dt className="text-xs">Reason</dt>
                <dd className="text-navy font-medium mt-0.5">{record.visit.reason}</dd>
              </div>
              <div>
                <dt className="text-xs">Referred by</dt>
                <dd className="text-navy font-medium mt-0.5">{record.visit.referredBy}</dd>
              </div>
            </dl>
          </section>
        ) : null}

        <section>
          <p className="text-sm font-bold text-navy mb-3">Report findings</p>
          <div className="overflow-x-auto rounded-xl border border-border-gray">
            <table className="w-full text-sm">
              <thead className="bg-bg-gray/50 text-left">
                <tr>
                  <th className="px-3 py-2.5 font-semibold text-navy">Parameter</th>
                  <th className="px-3 py-2.5 font-semibold text-navy">Result</th>
                  <th className="px-3 py-2.5 font-semibold text-navy">Unit</th>
                  <th className="px-3 py-2.5 font-semibold text-navy">Reference</th>
                  <th className="px-3 py-2.5 font-semibold text-navy">Status</th>
                </tr>
              </thead>
              <tbody>
                {record.findings.map((row) => (
                  <tr key={row.label} className="border-t border-border-gray">
                    <td className="px-3 py-2.5 text-body-gray">{row.label}</td>
                    <td className="px-3 py-2.5 font-semibold text-navy">{row.value}</td>
                    <td className="px-3 py-2.5 text-body-gray">{row.unit || '—'}</td>
                    <td className="px-3 py-2.5 text-body-gray">{row.reference || '—'}</td>
                    <td className="px-3 py-2.5">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${statusTone(row.status)}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-border-gray bg-bg-gray/30 p-3.5">
          <p className="text-xs font-semibold text-navy mb-1.5">Clinical interpretation</p>
          <p className="text-sm text-body-gray leading-relaxed">{record.interpretation}</p>
        </section>

        <section className="rounded-xl border border-border-gray p-3.5">
          <p className="text-xs font-semibold text-navy mb-2">Recommendations</p>
          <ul className="flex flex-col gap-2">
            {(record.recommendations || []).map((item) => (
              <li key={item} className="text-sm text-body-gray flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1 border-t border-border-gray">
          <p className="text-xs text-body-gray">
            Verified by: <span className="font-medium text-navy">{record.verifiedBy}</span>
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => downloadHealthReport(record)}
              className="min-h-10 px-4 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" strokeWidth={1.75} />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
