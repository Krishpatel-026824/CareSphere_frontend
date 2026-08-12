import { Star } from 'lucide-react'
import Button from '../Button'
import StarRating from './StarRating'
import { formatReviewCount, getDoctorRatingBreakdown } from '../../data/generators/doctorRating'

function RatingBar({ level, percent }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span className="w-6 shrink-0 inline-flex items-center gap-0.5 text-sm font-medium text-navy tabular-nums">
        {level}
        <Star className="w-3 h-3 text-navy fill-navy" strokeWidth={1.5} />
      </span>
      <div className="flex-1 h-2 rounded-full bg-bg-gray overflow-hidden">
        <div
          className="h-full rounded-full bg-teal transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-9 shrink-0 text-right text-xs sm:text-sm font-medium text-body-gray tabular-nums">
        {percent}%
      </span>
    </div>
  )
}

export default function PatientReviewsPanel({ doctor, onBook, onSeeAllReviews }) {
  const breakdown = getDoctorRatingBreakdown(doctor)
  const reviewLabel = formatReviewCount(doctor.reviewCount)

  return (
    <section className="bg-white border border-border-gray rounded-2xl p-4 sm:p-5 shadow-sm w-full">
      <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
        <h2 className="text-base sm:text-lg font-semibold text-navy">Patient Reviews</h2>
        <button
          type="button"
          onClick={onSeeAllReviews}
          className="text-sm font-semibold text-teal cursor-pointer hover:opacity-70 transition-opacity shrink-0"
        >
          See all reviews &gt;
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[minmax(120px,140px)_1fr] gap-5 sm:gap-6 lg:gap-8 items-center">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <p className="text-4xl sm:text-[42px] font-bold text-navy leading-none tabular-nums">
            {doctor.rating}
          </p>
          <StarRating rating={doctor.rating} size="lg" className="mt-2.5" />
          <p className="text-sm text-body-gray mt-2">({reviewLabel} reviews)</p>
        </div>

        <div className="flex flex-col gap-2 sm:gap-2.5">
          {[5, 4, 3, 2, 1].map((level) => (
            <RatingBar key={level} level={level} percent={breakdown[level]} />
          ))}
        </div>
      </div>

      {onBook ? (
        <div className="mt-5 sm:mt-6 max-w-md">
          <Button onClick={onBook}>Book Appointment</Button>
        </div>
      ) : null}
    </section>
  )
}
