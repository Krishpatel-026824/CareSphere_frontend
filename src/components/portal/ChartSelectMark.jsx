import { Check } from 'lucide-react'

export default function ChartSelectMark({ selected = false, locked = false }) {
  if (locked) {
    return (
      <span
        className="inline-flex w-7 h-7 rounded-full items-center justify-center bg-emerald-100 text-emerald-700 border border-emerald-200"
        aria-hidden
      >
        <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
      </span>
    )
  }

  return (
    <span
      className={`inline-flex w-7 h-7 rounded-full items-center justify-center border-2 transition-colors ${
        selected
          ? 'bg-teal border-teal text-white shadow-sm'
          : 'bg-white border-[#C9D4E0] text-transparent'
      }`}
      aria-hidden
    >
      <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
    </span>
  )
}
