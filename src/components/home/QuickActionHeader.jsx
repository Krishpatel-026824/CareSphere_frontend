import { ArrowLeft } from 'lucide-react'

export default function QuickActionHeader({ title, subtitle, onBack }) {
  return (
    <header className="shrink-0">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-teal cursor-pointer hover:opacity-70 mb-3"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
        Back to Home
      </button>
      <h1 className="text-xl sm:text-2xl font-bold text-navy tracking-tight">{title}</h1>
      {subtitle ? <p className="text-sm text-body-gray mt-1">{subtitle}</p> : null}
    </header>
  )
}
