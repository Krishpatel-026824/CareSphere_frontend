import { IndianRupee, Star, Stethoscope, Users } from 'lucide-react'

const tiles = [
  { key: 'experience', label: 'Experience', icon: Stethoscope },
  { key: 'patients', label: 'Patients', icon: Users },
  { key: 'ratingLabel', label: 'Rating', icon: Star },
  { key: 'fee', label: 'Fee', icon: IndianRupee },
]

export default function DoctorProfileStats({ profile }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 shrink-0">
      {tiles.map(({ key, label, icon: Icon }) => (
        <div
          key={key}
          className="rounded-xl border border-[#E6E8EC] bg-white px-3.5 py-3.5"
        >
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F4FF]">
            <Icon className="h-4 w-4 text-[#2F80ED]" strokeWidth={1.8} />
          </div>
          <p className="text-[11px] font-medium uppercase tracking-[0.04em] text-[#8A8F98]">
            {label}
          </p>
          <p className="mt-0.5 text-[17px] font-bold leading-tight text-[#1E2124]">
            {profile[key]}
          </p>
        </div>
      ))}
    </div>
  )
}
