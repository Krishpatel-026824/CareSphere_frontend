import { BadgeCheck, Building2, Star } from 'lucide-react'
import { getProfilePhotoDisplayUrl } from '../../utils/profilePhotoUrl'

const badgeStyles = {
  rating: 'bg-[#FFF7E8] text-[#1E2124]',
  available: 'bg-[#E8F7EE] text-[#16794A]',
  booked: 'bg-[#F3F4F6] text-[#6B7280]',
  clinic: 'bg-[#EEF2F6] text-[#374151]',
}

const PROFILE_PHOTO_SIZE = {
  compact: 'h-[72px] w-[72px]',
  default: 'h-[88px] w-[88px] sm:h-[100px] sm:w-[100px]',
}

export default function DoctorProfileHero({ profile, compact = false }) {
  const photoSrc = profile.photo ? getProfilePhotoDisplayUrl(profile.photo) : ''

  return (
    <section
      className={`rounded-2xl border border-[#E6E8EC] bg-white ${
        compact ? 'px-3.5 py-3' : 'px-4 py-4 sm:px-5 sm:py-5'
      }`}
    >
      <div className={`flex items-start gap-3 ${compact ? '' : 'sm:items-center sm:gap-4'}`}>
        <div
          className={`relative shrink-0 overflow-hidden rounded-full border-[3px] border-[#E8F4FF] bg-[#EEF2F6] ${
            compact ? PROFILE_PHOTO_SIZE.compact : PROFILE_PHOTO_SIZE.default
          }`}
        >
          {photoSrc ? (
            <img
              src={photoSrc}
              alt={profile.name}
              width={100}
              height={100}
              className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
              decoding="async"
            />
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <h3
            className={`flex items-center gap-1.5 font-bold leading-tight text-navy ${
              compact ? 'text-lg' : 'text-xl sm:text-2xl'
            }`}
          >
            <span className="truncate">{profile.name}</span>
            <BadgeCheck className={`shrink-0 fill-[#2F80ED] text-white ${compact ? 'h-4 w-4' : 'h-5 w-5'}`} strokeWidth={1.6} />
          </h3>
          <p className={`mt-0.5 truncate leading-snug text-body-gray ${compact ? 'text-sm' : 'text-sm sm:text-[15px]'}`}>
            {profile.specialty} · {profile.clinic}
          </p>
          {profile.qualification ? (
            <p className={`mt-0.5 truncate text-body-gray/80 ${compact ? 'text-[13px]' : 'text-sm'}`}>
              {profile.qualification}
            </p>
          ) : null}

          <div className={`flex flex-wrap items-center ${compact ? 'mt-2 gap-1.5' : 'mt-3 gap-2'}`}>
            {profile.badges.map((badge) => (
              <span
                key={badge.id}
                className={`inline-flex items-center gap-1 rounded-full font-semibold ${
                  compact ? 'min-h-6 px-2.5 text-[11px]' : 'min-h-7 px-3 text-xs sm:text-[13px]'
                } ${badgeStyles[badge.kind] || badgeStyles.clinic}`}
              >
                {badge.kind === 'rating' ? (
                  <Star className={`fill-amber text-amber ${compact ? 'h-3 w-3' : 'h-3.5 w-3.5'}`} strokeWidth={1.5} />
                ) : null}
                {badge.kind === 'clinic' ? (
                  <Building2 className={compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} strokeWidth={1.7} />
                ) : null}
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
