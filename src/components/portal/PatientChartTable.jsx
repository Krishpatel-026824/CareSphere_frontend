import { Plus, Search } from 'lucide-react'

export function PatientChartTable({
  children,
  minWidth = '720px',
  fill = false,
  fixed = false,
  className = '',
}) {
  return (
    <div
      className={`overflow-auto ${fill ? 'flex-1 min-h-0 bg-[#FAFCFD]' : 'max-h-[min(420px,calc(100dvh-300px))]'}`}
    >
      <table
        className={`w-full border-collapse text-left text-[14px] ${fixed ? 'table-fixed' : ''} ${className}`}
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
      className={`px-3 sm:px-4 py-3 text-[11px] font-bold uppercase tracking-[0.07em] text-teal-dark border-b border-teal/20 whitespace-nowrap ${
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
      className={`px-3 sm:px-4 py-3 border-b border-[#EEF2F6] align-middle ${
        center ? 'text-center' : 'text-left'
      } ${className}`}
    >
      {children}
    </td>
  )
}

export function PatientChartEmpty({ text }) {
  return (
    <div className="flex-1 min-h-[180px] flex items-center justify-center p-6 bg-[#FAFCFD]">
      <p className="max-w-md rounded-2xl border border-dashed border-[#D0D9E3] bg-white px-6 py-5 text-sm text-body-gray text-center leading-relaxed">
        {text}
      </p>
    </div>
  )
}

export function PatientChartFooter({ showing, total, label = 'records', extra = null }) {
  if (showing == null || total == null) return null

  return (
    <footer className="shrink-0 px-4 sm:px-5 py-2.5 border-t border-[#E6EBF1] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-2">
      <p className="text-[12px] sm:text-[13px] text-body-gray">
        Showing <span className="font-semibold text-navy">{showing}</span> of{' '}
        <span className="font-semibold text-navy">{total}</span> {label}
      </p>
      {extra ? (
        <p className="text-[12px] font-semibold text-teal-dark">{extra}</p>
      ) : null}
    </footer>
  )
}

export function PatientChartAddButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 min-h-9 px-3.5 rounded-xl bg-teal text-white text-[12px] sm:text-[13px] font-semibold cursor-pointer hover:bg-teal-dark inline-flex items-center gap-1.5 shadow-sm transition-colors"
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
    <label className="shrink-0 flex items-center gap-3 rounded-xl bg-white border border-[#E6EBF1] px-3.5 min-h-11 shadow-sm focus-within:border-teal/40 focus-within:ring-2 focus-within:ring-teal/10 transition-shadow">
      <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={2} />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-[14px] sm:text-[15px] text-navy outline-none placeholder:text-body-gray/60"
        aria-label={ariaLabel || placeholder}
      />
    </label>
  )
}

export function PatientChartToolbar({ children, compact = false }) {
  return (
    <div
      className={`shrink-0 px-4 sm:px-5 border-b border-[#E6EBF1] bg-gradient-to-b from-[#F8FAFC] to-white ${
        compact ? 'py-2' : 'py-3'
      }`}
    >
      {children}
    </div>
  )
}

export function PatientChartPanel({
  title,
  subtitle,
  count,
  action = null,
  children,
  fill = false,
}) {
  return (
    <section
      className={`rounded-2xl border border-[#E6EBF1] bg-white shadow-sm overflow-hidden flex flex-col ${
        fill ? 'flex-1 min-h-0' : ''
      }`}
    >
      <div className="shrink-0 h-1 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark" />

      <div className="shrink-0 px-4 sm:px-5 py-3.5 border-b border-[#E6EBF1] bg-gradient-to-b from-[#F8FAFC] to-white flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-navy tracking-tight truncate">
              {title}
            </h3>
            {count != null ? (
              <span className="shrink-0 text-[12px] font-bold text-teal bg-[#E8F7F6] border border-teal/15 px-2.5 py-1 rounded-full tabular-nums">
                {count}
              </span>
            ) : null}
          </div>
          {subtitle ? (
            <p className="text-[12px] sm:text-[13px] text-body-gray mt-1 truncate">{subtitle}</p>
          ) : null}
        </div>
        {action}
      </div>

      <div className={`flex flex-col ${fill ? 'flex-1 min-h-0' : ''}`}>{children}</div>
    </section>
  )
}
