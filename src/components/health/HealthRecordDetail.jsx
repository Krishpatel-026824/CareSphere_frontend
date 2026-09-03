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
            <p className="text-[13px] font-bold uppercase tracking-wide text-teal-dark">
              {record.type === 'Pharmacy' || String(record.title || '').toLowerCase().includes('prescription')
                ? 'Prescription'
                : `${record.type} report`}
            </p>
            <h3 className="text-xl font-bold text-navy mt-1">{record.title}</h3>
            <p className="text-sm font-medium text-navy-light/80 mt-1.5">
              Report ID: {record.reportId} · {record.dateLabel}
              {record.timeLabel ? ` · ${record.timeLabel}` : ''}
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 px-3 py-1 text-sm font-semibold">
            {record.status}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-5 lg:gap-6">
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 text-[15px]">
          <div className="rounded-xl border border-border-gray p-3.5 sm:p-4">
            <p className="text-sm font-bold text-navy mb-2.5">Patient details</p>
            <dl className="flex flex-col gap-2">
              <div className="flex justify-between gap-3">
                <dt className="text-[#4B5568] font-medium">Name</dt>
                <dd className="text-navy font-semibold">{record.patient.name}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#4B5568] font-medium">Age / Gender</dt>
                <dd className="text-navy font-semibold">
                  {record.patient.age} yrs · {record.patient.gender}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#4B5568] font-medium">Patient ID</dt>
                <dd className="text-navy font-semibold">{record.patient.patientId}</dd>
              </div>
              {record.patient.phone ? (
                <div className="flex justify-between gap-3">
                  <dt className="text-[#4B5568] font-medium">Phone</dt>
                  <dd className="text-navy font-semibold">{record.patient.phone}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className="rounded-xl border border-border-gray p-3.5 sm:p-4">
            <p className="text-sm font-bold text-navy mb-2.5">Provider details</p>
            <dl className="flex flex-col gap-2">
              <div className="flex justify-between gap-3">
                <dt className="text-[#4B5568] font-medium">Doctor</dt>
                <dd className="text-navy font-semibold text-right">{record.doctorName}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#4B5568] font-medium">Specialty</dt>
                <dd className="text-navy font-semibold text-right">{record.specialty}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[#4B5568] font-medium">Facility</dt>
                <dd className="text-navy font-semibold text-right">{record.hospital}</dd>
              </div>
            </dl>
          </div>
        </section>

        {record.visit ? (
          <section className="rounded-xl border border-border-gray bg-bg-gray/30 p-3.5 sm:p-4 text-[15px]">
            <p className="text-sm font-bold text-navy mb-2.5">Visit information</p>
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <dt className="text-sm font-medium text-[#4B5568]">Mode</dt>
                <dd className="text-navy font-semibold mt-0.5">{record.visit.mode}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-[#4B5568]">Reason</dt>
                <dd className="text-navy font-semibold mt-0.5">{record.visit.reason}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-[#4B5568]">Referred by</dt>
                <dd className="text-navy font-semibold mt-0.5">{record.visit.referredBy}</dd>
              </div>
            </dl>
          </section>
        ) : null}

        <section>
          <p className="text-[15px] font-bold text-navy mb-3">Report findings</p>
          <div className="overflow-x-auto rounded-xl border border-border-gray">
            <table className="w-full text-[15px]">
              <thead className="bg-bg-gray/50 text-left">
                <tr>
                  <th className="px-3 py-3 font-bold text-navy">Parameter</th>
                  <th className="px-3 py-3 font-bold text-navy">Result</th>
                  <th className="px-3 py-3 font-bold text-navy">Unit</th>
                  <th className="px-3 py-3 font-bold text-navy">Reference</th>
                  <th className="px-3 py-3 font-bold text-navy">Status</th>
                </tr>
              </thead>
              <tbody>
                {record.findings.map((row) => (
                  <tr key={row.label} className="border-t border-border-gray">
                    <td className="px-3 py-3 text-navy/80 font-medium">{row.label}</td>
                    <td className="px-3 py-3 font-bold text-navy">{row.value}</td>
                    <td className="px-3 py-3 text-navy/80 font-medium">{row.unit || '—'}</td>
                    <td className="px-3 py-3 text-navy/80 font-medium">{row.reference || '—'}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-sm font-semibold ${statusTone(row.status)}`}
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

        <section className="rounded-xl border border-border-gray bg-bg-gray/30 p-3.5 sm:p-4">
          <p className="text-sm font-bold text-navy mb-2">Clinical interpretation</p>
          <p className="text-[15px] text-navy/85 leading-relaxed">{record.interpretation}</p>
        </section>

        <section className="rounded-xl border border-border-gray p-3.5 sm:p-4">
          <p className="text-sm font-bold text-navy mb-2.5">Recommendations</p>
          <ul className="flex flex-col gap-2.5">
            {(record.recommendations || []).map((item) => (
              <li key={item} className="text-[15px] text-navy/85 flex items-start gap-2.5">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1 border-t border-border-gray">
          <p className="text-sm text-navy/75">
            Verified by: <span className="font-semibold text-navy">{record.verifiedBy}</span>
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
