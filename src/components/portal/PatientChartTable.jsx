import { Plus } from 'lucide-react'

export function PatientChartTable({
  children,
  minWidth = '720px',
  fill = false,
  fixed = false,
}) {
  return (
    <div
      className={`overflow-auto ${fill ? 'flex-1 min-h-0' : 'max-h-[min(420px,calc(100dvh-300px))]'}`}
    >
      <table
        className={`w-full border-collapse text-left text-[14px] ${fixed ? 'table-fixed' : ''}`}
        style={{ minWidth }}
      >
        {children}
      </table>
    </div>
  )
}

export function PatientChartTh({ children, center = false, className = '' }) {
  return (
    <th
      className={`px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-teal-dark border-b border-teal/20 ${
        center ? 'text-center' : 'text-left'
      } ${className}`}
    >
      {children}
    </th>
  )
}

export function PatientChartTd({ children, center = false, className = '' }) {
  return (
    <td
      className={`px-3 py-2.5 border-b border-[#E6EBF1] align-middle ${
        center ? 'text-center' : 'text-left'
      } ${className}`}
    >
      {children}
    </td>
  )
}

export function PatientChartEmpty({ text }) {
  return (
    <p className="m-4 rounded-xl border border-dashed border-[#D0D9E3] bg-[#F8FAFC] p-5 text-sm text-body-gray text-center">
      {text}
    </p>
  )
}

export function PatientChartAddButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 min-h-9 px-3 rounded-xl bg-teal text-white text-[12px] font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center gap-1.5 shadow-sm"
    >
      <Plus className="w-3.5 h-3.5" strokeWidth={2.25} />
      {label}
    </button>
  )
}

export function PatientChartPanel({ title, count, action = null, children, fill = false }) {
  return (
    <section
      className={`rounded-2xl border border-[#E6EBF1] bg-white shadow-sm overflow-hidden flex flex-col ${
        fill ? 'flex-1 min-h-0' : ''
      }`}
    >
      <div className="shrink-0 px-4 py-2.5 border-b border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-between gap-2">
        <div className="min-w-0 flex items-center gap-2">
          <h3 className="text-[15px] font-bold text-navy truncate">{title}</h3>
          {count != null ? (
            <span className="text-[11px] font-semibold text-body-gray bg-white border border-[#E6EBF1] px-2 py-0.5 rounded-full tabular-nums">
              {count}
            </span>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
