function statusClass(status) {
  if (status === 'High' || status === 'Low') return 'text-rose-700 bg-rose-50'
  return 'text-emerald-800 bg-emerald-50'
}

/** Compact printable-style preview for thumbnails and notifications. */
export default function LabReportDocumentPreview({ report, compact = false }) {
  if (!report) return null

  const rows = compact ? report.parameters.slice(0, 4) : report.parameters
  const hiddenCount = compact ? Math.max(report.parameters.length - rows.length, 0) : 0

  return (
    <div className="rounded-xl border border-[#E6EBF1] bg-white shadow-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark" />
      <div className="px-4 py-3 border-b border-[#E6EBF1] bg-[#F8FAFC]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-body-gray">
              {report.lab?.name || 'CareSphere Diagnostics'}
            </p>
            <h4 className="font-display text-[15px] font-bold text-navy leading-tight mt-0.5 truncate">
              {report.testName}
            </h4>
            <p className="text-[10px] text-body-gray mt-1">
              {report.lab?.accreditation || 'NABL Accredited · ISO 15189'}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-semibold">
            {report.status}
          </span>
        </div>
      </div>

      <div className="px-4 py-3 grid grid-cols-2 gap-3 text-[11px] border-b border-[#E6EBF1] bg-white">
        <div>
          <p className="font-bold text-navy mb-1">Patient</p>
          <p className="text-body-gray">{report.patient?.name}</p>
          <p className="text-body-gray">
            {report.patient?.age} yrs · {report.patient?.gender}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-navy mb-1">Reported</p>
          <p className="text-body-gray">{report.sample?.reportDate}</p>
          <p className="text-body-gray">{report.sample?.reportTime}</p>
        </div>
      </div>

      <div className="px-3 py-3">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="bg-[#E0F2FE] text-navy">
              <th className="text-left px-2 py-1.5 font-semibold">Parameter</th>
              <th className="text-left px-2 py-1.5 font-semibold">Result</th>
              <th className="text-left px-2 py-1.5 font-semibold hidden sm:table-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-[#E6EBF1]">
                <td className="px-2 py-1.5 text-body-gray">{row.name}</td>
                <td className="px-2 py-1.5 font-bold text-navy">
                  {row.value} <span className="font-normal text-body-gray">{row.unit}</span>
                </td>
                <td className="px-2 py-1.5 hidden sm:table-cell">
                  <span
                    className={`inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${statusClass(row.status)}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {hiddenCount > 0 ? (
          <p className="text-[10px] text-body-gray mt-2 px-1">+ {hiddenCount} more parameters</p>
        ) : null}
      </div>

      <div className="px-4 py-2 border-t border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-between gap-2">
        <p className="text-[10px] text-body-gray truncate">
          Verified by {report.verifiedBy || report.doctorName}
        </p>
        <p className="text-[10px] font-semibold text-teal shrink-0">{report.testCode}</p>
      </div>
    </div>
  )
}
