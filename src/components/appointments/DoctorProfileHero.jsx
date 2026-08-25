import { BadgeCheck, Building2, Star } from 'lucide-react'

const badgeStyles = {
  rating: 'bg-[#FFF7E8] text-[#1E2124]',
  available: 'bg-[#E8F7EE] text-[#16794A]',
  booked: 'bg-[#F3F4F6] text-[#6B7280]',
  clinic: 'bg-[#EEF2F6] text-[#374151]',
}

export default function DoctorProfileHero({ profile }) {
  return (
    <section className="rounded-2xl border border-[#E6E8EC] bg-white px-4 py-4 sm:px-5 sm:py-5">
      <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
        <div className="relative h-[80px] w-[80px] sm:h-[92px] sm:w-[92px] shrink-0 overflow-hidden rounded-full border-[3px] border-[#E8F4FF] bg-[#EEF2F6]">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt={profile.name}
              className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
            />
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-1.5 text-[18px] font-bold leading-tight text-[#1E2124] sm:text-[20px]">
            <span className="truncate">{profile.name}</span>
            <BadgeCheck className="h-4 w-4 shrink-0 fill-[#2F80ED] text-white" strokeWidth={1.6} />
          </h3>
          <p className="mt-0.5 truncate text-[13px] leading-snug text-[#6B7280]">
            {profile.specialty} • {profile.clinic}
          </p>
          {profile.qualification ? (
            <p className="mt-0.5 truncate text-[12px] text-[#8A8F98]">{profile.qualification}</p>
          ) : null}

          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            {profile.badges.map((badge) => (
              <span
                key={badge.id}
                className={`inline-flex h-6 items-center gap-1 rounded-full px-2.5 text-[11px] font-semibold ${
                  badgeStyles[badge.kind] || badgeStyles.clinic
                }`}
              >
                {badge.kind === 'rating' ? (
                  <Star className="h-3 w-3 fill-amber text-amber" strokeWidth={1.5} />
                ) : null}
                {badge.kind === 'clinic' ? <Building2 className="h-3 w-3" strokeWidth={1.7} /> : null}
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
