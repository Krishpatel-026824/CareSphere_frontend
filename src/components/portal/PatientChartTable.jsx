import { Plus, Search } from 'lucide-react'

export function PatientChartTable({
  children,
  minWidth = '720px',
  fill = false,
  fixed = false,
}) {
  return (
    <div
      className={`overflow-auto ${fill ? 'flex-1 min-h-0 bg-[#FAFCFD]' : 'max-h-[min(420px,calc(100dvh-300px))]'}`}
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
      className={`px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-teal-dark border-b border-teal/20 whitespace-nowrap ${
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
      className={`px-4 py-3.5 border-b border-[#E6EBF1] align-middle ${
        center ? 'text-center' : 'text-left'
      } ${className}`}
    >
      {children}
    </td>
  )
}

export function PatientChartEmpty({ text }) {
  return (
    <div className="flex-1 min-h-[200px] flex items-center justify-center p-6 bg-[#FAFCFD]">
      <p className="max-w-md rounded-2xl border border-dashed border-[#D0D9E3] bg-white px-6 py-5 text-sm text-body-gray text-center leading-relaxed">
        {text}
      </p>
    </div>
  )
}

export function PatientChartAddButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 min-h-10 px-4 rounded-xl bg-teal text-white text-[13px] font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center gap-1.5 shadow-sm transition-colors"
    >
      <Plus className="w-4 h-4" strokeWidth={2.25} />
      {label}
    </button>
  )
}

export function PatientChartSearch({
  value,
  onChange,
  placeholder,
  'aria-label': ariaLabel,
}) {
  return (
    <label className="shrink-0 flex items-center gap-2.5 rounded-xl bg-white border border-[#E6EBF1] px-3.5 min-h-11 shadow-sm">
      <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.85} />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-[14px] text-navy outline-none placeholder:text-body-gray/65"
        aria-label={ariaLabel || placeholder}
      />
    </label>
  )
}

export function PatientChartPanel({ title, count, action = null, children, fill = false }) {
  return (
    <section
      className={`rounded-2xl border border-[#E6EBF1] bg-white shadow-sm overflow-hidden flex flex-col ${
        fill ? 'flex-1 min-h-0' : ''
      }`}
    >
      <div className="shrink-0 h-1 bg-gradient-to-r from-teal/80 to-[#14B8A6]/60" />

      <div className="shrink-0 px-4 sm:px-5 py-3.5 border-b border-[#E6EBF1] bg-[#F8FAFC] flex items-center justify-between gap-3">
        <div className="min-w-0 flex items-center gap-2.5">
          <h3 className="text-[17px] sm:text-lg font-bold text-navy tracking-tight truncate">
            {title}
          </h3>
          {count != null ? (
            <span className="text-[12px] font-bold text-teal bg-[#E8F7F6] border border-teal/15 px-2.5 py-0.5 rounded-full tabular-nums">
              {count}
            </span>
          ) : null}
        </div>
        {action}
      </div>

      <div className={`flex flex-col ${fill ? 'flex-1 min-h-0' : ''}`}>{children}</div>
    </section>
  )
}
