import { useState } from 'react'
import HealthOverviewCard from './HealthOverviewCard'

export default function HealthOverviewGrid({ cards = [], gaugeSize = 100, visibleCount = 4 }) {
  const [showAll, setShowAll] = useState(false)
  const visibleCards = showAll ? cards : cards.slice(0, visibleCount)
  const canExpand = cards.length > visibleCount

  return (
    <section className="shrink-0">
      <div className="flex items-center justify-between mb-2.5 sm:mb-3">
        <h2 className="text-sm sm:text-base font-semibold text-navy">Health overview</h2>
        {canExpand ? (
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
            className="text-sm font-semibold text-teal cursor-pointer hover:opacity-70 transition-opacity"
          >
            {showAll ? 'Show less ←' : 'View all →'}
          </button>
        ) : null}
      </div>

      <div
        className={`grid gap-2.5 sm:gap-3 lg:gap-4 ${
          showAll ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-4'
        }`}
      >
        {visibleCards.map((card) => (
          <HealthOverviewCard key={card.id} card={card} gaugeSize={gaugeSize} />
        ))}
      </div>
    </section>
  )
}
