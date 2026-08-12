import { Star } from 'lucide-react'

export default function StarRating({ rating = 0, size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  }

  const starSize = sizes[size] || sizes.md

  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1
        const filled = rating >= starValue
        const partial = !filled && rating > index

        return (
          <span key={starValue} className="relative inline-flex">
            <Star className={`${starSize} text-amber/25`} strokeWidth={1.5} />
            {filled || partial ? (
              <Star
                className={`${starSize} text-amber fill-amber absolute inset-0`}
                strokeWidth={1.5}
                style={partial ? { clipPath: `inset(0 ${100 - (rating - index) * 100}% 0 0)` } : undefined}
              />
            ) : null}
          </span>
        )
      })}
    </div>
  )
}
