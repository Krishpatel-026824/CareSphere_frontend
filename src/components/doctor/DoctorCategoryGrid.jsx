import { useState } from 'react'
import {
  Baby,
  Bone,
  Brain,
  HeartPulse,
  Sparkles,
  Stethoscope,
  UserRound,
  Venus,
} from 'lucide-react'

const INITIAL_VISIBLE = 4

const categoryMeta = {
  'General Physician': { icon: Stethoscope, tone: 'bg-teal-light text-teal-dark' },
  Cardiologist: { icon: HeartPulse, tone: 'bg-rose-100 text-rose-600' },
  Dermatologist: { icon: Sparkles, tone: 'bg-violet-100 text-violet-600' },
  Pediatrician: { icon: Baby, tone: 'bg-sky-100 text-sky-600' },
  Gynecologist: { icon: Venus, tone: 'bg-pink-100 text-pink-600' },
  Neurologist: { icon: Brain, tone: 'bg-indigo-100 text-indigo-600' },
  Orthopedic: { icon: Bone, tone: 'bg-amber-100 text-amber-700' },
}

export default function DoctorCategoryGrid({ categories = [], onSelectCategory }) {
  const [showAll, setShowAll] = useState(false)

  const visibleCategories = showAll ? categories : categories.slice(0, INITIAL_VISIBLE)
  const canExpand = categories.length > INITIAL_VISIBLE

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-navy">Categories</h2>
        {canExpand ? (
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
            className="text-sm text-teal font-semibold cursor-pointer hover:opacity-70 transition-opacity"
          >
            {showAll ? 'Show less' : 'View all'}
          </button>
        ) : null}
      </div>

      <div
        className={`grid gap-3 ${
          showAll
            ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7'
            : 'grid-cols-2 sm:grid-cols-4'
        }`}
      >
        {visibleCategories.map((category) => {
          const meta = categoryMeta[category] || { icon: UserRound, tone: 'bg-teal-light text-teal' }
          const Icon = meta.icon

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className="rounded-2xl border border-border-gray bg-white px-2.5 sm:px-3 py-4 sm:py-5 cursor-pointer transition-all duration-200 hover:border-teal hover:bg-teal-light/40 hover:shadow-md hover:-translate-y-0.5 min-h-[112px] sm:min-h-[132px] flex flex-col items-center justify-center gap-2.5 sm:gap-3 text-center"
            >
              <span className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ${meta.tone}`}>
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.6} />
              </span>
              <span className="text-[12px] sm:text-[13px] font-semibold text-navy leading-snug px-0.5">
                {category}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
