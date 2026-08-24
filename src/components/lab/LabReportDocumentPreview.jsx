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
    <div className="rounded-xl border border-[#CBD5E1] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)] overflow-hidden">
      <div className="bg-gradient-to-r from-[#0F766E] to-[#0EA5A0] px-4 py-3 text-white">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
              CareSphere Diagnostics
            </p>
            <h4 className="text-[15px] font-bold leading-tight mt-0.5 truncate">{report.testName}</h4>
            <p className="text-[10px] text-white/75 mt-1">{report.lab?.accreditation || 'NABL Accredited · ISO 15189'}</p>
          </div>
          <span className="shrink-0 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-100">
            {report.status}
          </span>
        </div>
      </div>

      <div className="px-4 py-3 grid grid-cols-2 gap-3 text-[11px] border-b border-[#E2E8F0] bg-[#F8FAFC]">
        <div>
          <p className="font-bold text-[#0F172A] mb-1">Patient</p>
          <p className="text-[#475569]">{report.patient?.name}</p>
          <p className="text-[#475569]">{report.patient?.age} yrs · {report.patient?.gender}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-[#0F172A] mb-1">Reported</p>
          <p className="text-[#475569]">{report.sample?.reportDate}</p>
          <p className="text-[#475569]">{report.sample?.reportTime}</p>
        </div>
      </div>

      <div className="px-3 py-3">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="bg-[#E0F2FE] text-[#0F172A]">
              <th className="text-left px-2 py-1.5 font-semibold">Parameter</th>
              <th className="text-left px-2 py-1.5 font-semibold">Result</th>
              <th className="text-left px-2 py-1.5 font-semibold hidden sm:table-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-[#E2E8F0]">
                <td className="px-2 py-1.5 text-[#475569]">{row.name}</td>
                <td className="px-2 py-1.5 font-bold text-[#0F172A]">
                  {row.value} <span className="font-normal text-[#64748B]">{row.unit}</span>
                </td>
                <td className="px-2 py-1.5 hidden sm:table-cell">
                  <span className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-semibold ${statusClass(row.status)}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {hiddenCount > 0 ? (
          <p className="text-[10px] text-[#64748B] mt-2 px-1">+ {hiddenCount} more parameters</p>
        ) : null}
      </div>

      <div className="px-4 py-2 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between gap-2">
        <p className="text-[10px] text-[#64748B] truncate">Verified by {report.doctorName}</p>
        <p className="text-[10px] font-semibold text-[#0F766E] shrink-0">{report.testCode}</p>
      </div>
    </div>
  )
}
