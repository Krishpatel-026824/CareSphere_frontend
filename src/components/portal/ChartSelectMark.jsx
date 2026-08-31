export function ChartRowStatusBadge({ children, tone = 'muted' }) {
  const tones = {
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    muted: 'bg-[#F1F5F9] text-body-gray border-[#E2E8F0]',
  }

  return (
    <span
      className={`inline-flex shrink-0 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export default function ChartSelectMark({
  locked = false,
  lockedLabel = 'Added',
  label = 'Select',
  selectedLabel = 'Selected',
  selected = false,
  onToggle,
  onAction,
  className = '',
}) {
  if (locked) {
    return (
      <span
        className={`inline-flex min-w-[84px] justify-center text-[13px] font-semibold px-3 py-1.5 rounded-lg bg-[#F1F5F9] text-body-gray border border-[#E2E8F0] cursor-default ${className}`}
      >
        {lockedLabel}
      </span>
    )
  }

  const isToggle = typeof onToggle === 'function'

  return (
    <button
      type="button"
      aria-pressed={isToggle ? selected : undefined}
      onClick={(event) => {
        event.stopPropagation()
        if (isToggle) onToggle()
        else onAction?.()
      }}
        className={`inline-flex min-w-[84px] justify-center text-[13px] font-semibold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/30 ${
        isToggle && selected
          ? 'bg-teal text-white border-teal shadow-sm hover:bg-teal-dark'
          : 'bg-white text-teal-dark border-teal/30 hover:border-teal hover:bg-[#F0FAF9]'
      } ${className}`}
    >
      {isToggle ? (selected ? selectedLabel : label) : label}
    </button>
  )
}
