import { IndianRupee, Star, Stethoscope, Users } from 'lucide-react'

const tiles = [
  { key: 'experience', label: 'Experience', icon: Stethoscope },
  { key: 'patients', label: 'Patients', icon: Users },
  { key: 'ratingLabel', label: 'Rating', icon: Star },
  { key: 'fee', label: 'Fee', icon: IndianRupee },
]

export default function DoctorProfileStats({ profile, compact = false }) {
  return (
    <div className={`grid grid-cols-4 shrink-0 ${compact ? 'gap-2' : 'gap-2.5 sm:gap-3'}`}>
      {tiles.map(({ key, label, icon: Icon }) => (
        <div
          key={key}
          className={`rounded-xl border border-[#E6EBF1] bg-white ${compact ? 'px-2.5 py-2.5' : 'px-4 py-4'}`}
        >
          <div
            className={`mb-1.5 flex items-center justify-center rounded-lg bg-teal-light ${
              compact ? 'h-7 w-7' : 'h-9 w-9'
            }`}
          >
            <Icon className={`text-teal ${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} strokeWidth={1.85} />
          </div>
          <p className={`font-bold uppercase tracking-[0.06em] text-body-gray ${compact ? 'text-[9px]' : 'text-[11px] sm:text-xs'}`}>
            {label}
          </p>
          <p className={`mt-0.5 font-bold leading-tight text-navy ${compact ? 'text-sm' : 'text-lg sm:text-xl'}`}>
            {profile[key]}
          </p>
        </div>
      ))}
    </div>
  )
}
