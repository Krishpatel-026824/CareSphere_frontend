import { Download, ImageDown } from 'lucide-react'
import { downloadHealthReport, downloadReportImage } from '../../utils/downloadRecord'

function statusTone(status) {
  if (status === 'High' || status === 'Low') return 'text-rose-600 bg-rose-50'
  return 'text-emerald-700 bg-emerald-50'
}

export default function LabReportDetail({ report }) {
  if (!report) return null

  return (
    <article className="rounded-2xl border border-border-gray bg-white shadow-sm overflow-hidden">
      <div className="px-4 sm:px-5 py-4 border-b border-border-gray bg-bg-gray/30">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-teal">Lab Report</p>
            <h3 className="text-lg font-bold text-navy mt-1">{report.testName}</h3>
            <p className="text-xs text-body-gray mt-1">Report ID: {report.id}</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold">
            {report.status}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col gap-5">
        {report.preview ? (
          <div className="relative rounded-xl overflow-hidden border border-border-gray h-40 sm:h-48 bg-bg-gray">
            <img
              src={report.preview}
              alt={`${report.testName} lab photo`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => downloadReportImage(report.preview, report.testName)}
              className="absolute bottom-3 right-3 min-h-9 px-3 rounded-lg bg-white/95 text-navy text-xs font-semibold cursor-pointer hover:bg-white inline-flex items-center gap-1.5 shadow-sm"
            >
              <ImageDown className="w-3.5 h-3.5" strokeWidth={1.75} />
              Download image
            </button>
          </div>
        ) : null}

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl border border-border-gray p-3.5">
            <p className="text-xs font-semibold text-navy mb-2">Patient details</p>
            <dl className="flex flex-col gap-1.5 text-body-gray">
              <div className="flex justify-between gap-3"><dt>Name</dt><dd className="text-navy font-medium">{report.patient.name}</dd></div>
              <div className="flex justify-between gap-3"><dt>Age / Gender</dt><dd className="text-navy font-medium">{report.patient.age} yrs · {report.patient.gender}</dd></div>
              <div className="flex justify-between gap-3"><dt>Patient ID</dt><dd className="text-navy font-medium">{report.patient.patientId}</dd></div>
              <div className="flex justify-between gap-3"><dt>Phone</dt><dd className="text-navy font-medium">{report.patient.phone}</dd></div>
            </dl>
          </div>

          <div className="rounded-xl border border-border-gray p-3.5">
            <p className="text-xs font-semibold text-navy mb-2">Lab & sample</p>
            <dl className="flex flex-col gap-1.5 text-body-gray">
              <div className="flex justify-between gap-3"><dt>Lab</dt><dd className="text-navy font-medium text-right">{report.lab.name}</dd></div>
              <div className="flex justify-between gap-3"><dt>Accreditation</dt><dd className="text-navy font-medium text-right">{report.lab.accreditation}</dd></div>
              <div className="flex justify-between gap-3"><dt>Collection</dt><dd className="text-navy font-medium text-right">{report.sample.collectionDate} · {report.sample.collectionTime}</dd></div>
              <div className="flex justify-between gap-3"><dt>Report date</dt><dd className="text-navy font-medium text-right">{report.sample.reportDate} · {report.sample.reportTime}</dd></div>
            </dl>
          </div>
        </section>

        <section>
          <p className="text-sm font-bold text-navy mb-3">Test results</p>
          <div className="overflow-x-auto rounded-xl border border-border-gray">
            <table className="w-full min-w-[560px] text-sm">
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
                {report.parameters.map((row) => (
                  <tr key={row.name} className="border-t border-border-gray">
                    <td className="px-3 py-2.5 text-body-gray">{row.name}</td>
                    <td className="px-3 py-2.5 font-semibold text-navy">{row.value}</td>
                    <td className="px-3 py-2.5 text-body-gray">{row.unit}</td>
                    <td className="px-3 py-2.5 text-body-gray">{row.reference}</td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${statusTone(row.status)}`}>
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
          <p className="text-sm text-body-gray leading-relaxed">{report.interpretation}</p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-border-gray p-3.5">
            <p className="text-xs font-semibold text-navy mb-2">Booking & payment</p>
            <dl className="flex flex-col gap-1.5 text-body-gray">
              <div className="flex justify-between gap-3"><dt>Booking ref</dt><dd className="text-navy font-medium">{report.bookingRef}</dd></div>
              <div className="flex justify-between gap-3"><dt>Test code</dt><dd className="text-navy font-medium">{report.testCode}</dd></div>
              <div className="flex justify-between gap-3"><dt>Test fee</dt><dd className="text-navy font-medium">₹{report.payment.testFee}</dd></div>
              <div className="flex justify-between gap-3"><dt>Payment</dt><dd className="text-navy font-medium capitalize">{report.payment.method}</dd></div>
              <div className="flex justify-between gap-3"><dt>Paid on</dt><dd className="text-navy font-medium">{report.payment.paidOn}</dd></div>
            </dl>
          </div>
          <div className="rounded-xl border border-border-gray p-3.5">
            <p className="text-xs font-semibold text-navy mb-2">Verified by</p>
            <p className="text-sm text-body-gray">{report.doctorName}</p>
            <p className="text-xs text-body-gray mt-2">{report.lab.address}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {report.preview ? (
                <button
                  type="button"
                  onClick={() => downloadReportImage(report.preview, report.testName)}
                  className="min-h-9 px-3 rounded-lg border border-border-gray bg-white text-navy text-xs font-semibold cursor-pointer hover:bg-bg-gray inline-flex items-center gap-1.5"
                >
                  <ImageDown className="w-3.5 h-3.5" strokeWidth={1.75} />
                  Download image
                </button>
              ) : null}
              <button
                type="button"
                onClick={() =>
                  downloadHealthReport({
                    title: report.testName,
                    reportId: report.id,
                    dateLabel: report.sample?.reportDate,
                    timeLabel: report.sample?.reportTime,
                    doctorName: report.doctorName,
                    hospital: report.lab?.name,
                    interpretation: report.interpretation,
                    parameters: report.parameters,
                    verifiedBy: report.doctorName,
                  })
                }
                className="min-h-9 px-3 rounded-lg bg-teal text-white text-xs font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" strokeWidth={1.75} />
                Download report
              </button>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}
