import { useState } from 'react'
import LabBookButton from './LabBookButton'

export default function LabTestCard({ test, quantity = 0, booked = false, onBook, onRemove }) {
  const [thumbError, setThumbError] = useState(false)
  const [bgError, setBgError] = useState(false)
  const showThumb = test.thumbnail && !thumbError
  const showBg = test.background && !bgError
  const isBooked = booked || quantity > 0

  return (
    <article className="relative overflow-hidden bg-white border border-border-gray rounded-[14px] min-h-[132px]">
      {showBg ? (
        <>
          <img
            src={test.background}
            alt=""
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-[50%] h-full object-cover pointer-events-none"
            onError={() => setBgError(true)}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white from-[42%] via-white/94 via-[68%] to-white/55"
          />
        </>
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-white" />
      )}

      <div className="relative z-10 min-h-[132px] flex items-center gap-3 px-3.5 py-3 sm:gap-3.5 sm:px-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[10px] overflow-hidden shrink-0 bg-bg-gray border border-border-gray/50">
          {showThumb ? (
            <img
              src={test.thumbnail}
              alt={test.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setThumbError(true)}
            />
          ) : (
            <div className="w-full h-full bg-teal-light" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-sm sm:text-[15px] font-bold text-navy leading-snug break-words">
            {test.name}
          </h2>
          <p className="text-[13px] text-body-gray mt-0.5 leading-snug break-words">{test.description}</p>
          <p className="mt-1.5 text-[13px] leading-snug">
            <span className="font-bold text-navy">₹{test.price}</span>
            <span className="text-body-gray"> · Results in {test.turnaround}</span>
          </p>
        </div>

        <div className="shrink-0 self-center">
          <LabBookButton
            booked={isBooked}
            testName={test.name}
            onBook={() => onBook?.(test.id)}
            onRemove={() => onRemove?.(test.id)}
          />
        </div>
      </div>
    </article>
  )
}
