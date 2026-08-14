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

const categoryMeta = {
  'General Physician': { icon: Stethoscope, card: 'bg-teal-light/50 border-teal/20', iconWrap: 'bg-white text-teal' },
  Cardiologist: { icon: HeartPulse, card: 'bg-rose-50 border-rose-100', iconWrap: 'bg-white text-rose-500' },
  Dermatologist: { icon: Sparkles, card: 'bg-violet-50 border-violet-100', iconWrap: 'bg-white text-violet-500' },
  Pediatrician: { icon: Baby, card: 'bg-sky-50 border-sky-100', iconWrap: 'bg-white text-sky-600' },
  Gynecologist: { icon: Venus, card: 'bg-pink-50 border-pink-100', iconWrap: 'bg-white text-pink-500' },
  Neurologist: { icon: Brain, card: 'bg-indigo-50 border-indigo-100', iconWrap: 'bg-white text-indigo-500' },
  Orthopedic: { icon: Bone, card: 'bg-amber-50 border-amber-100', iconWrap: 'bg-white text-amber-600' },
}

export default function DoctorCategoryGrid({ categories = [], onSelectCategory }) {
  const [showAll, setShowAll] = useState(false)
  const visibleCategories = showAll ? categories : categories.slice(0, 4)
  const canExpand = categories.length > 4

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-navy">Categories</h2>
        {canExpand ? (
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
            className="text-sm text-teal font-semibold cursor-pointer hover:underline"
          >
            {showAll ? 'Show less' : 'View all'}
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-3">
        {visibleCategories.map((category) => {
          const meta = categoryMeta[category] || {
            icon: UserRound,
            card: 'bg-teal-light/40 border-teal/20',
            iconWrap: 'bg-white text-teal',
          }
          const Icon = meta.icon

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`group rounded-2xl border px-3 py-5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-h-[128px] flex flex-col items-center justify-center gap-3 text-center ${meta.card}`}
            >
              <span className={`w-12 h-12 rounded-xl flex items-center justify-center ${meta.iconWrap}`}>
                <Icon className="w-6 h-6" strokeWidth={1.6} />
              </span>
              <span className="text-[13px] font-semibold text-navy leading-snug">{category}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
