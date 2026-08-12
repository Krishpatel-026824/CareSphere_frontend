import { Star } from 'lucide-react'

export default function DoctorRatingInline({ rating, reviewCount, className = '' }) {
  const countLabel = Number(reviewCount).toLocaleString('en-IN')

  return (
    <p className={`inline-flex items-center gap-1.5 text-sm text-body-gray ${className}`}>
      <Star className="w-3.5 h-3.5 text-amber fill-amber shrink-0" strokeWidth={1.5} />
      <span className="font-semibold text-teal tabular-nums">{rating}</span>
      <span className="tabular-nums">({countLabel})</span>
    </p>
  )
}
