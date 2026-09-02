import { MapPin } from 'lucide-react'
import ExpertiseChips from './ExpertiseChips'
import ProfileInfoCards from './ProfileInfoCards'

const COMPACT_CARD_IDS = new Set(['languages', 'distance', 'nextVisit'])

export default function DoctorProfileAbout({ profile, compact = false }) {
  const infoCards = compact
    ? profile.infoCards.filter((card) => COMPACT_CARD_IDS.has(card.id))
    : profile.infoCards

  return (
    <div className={`flex flex-col ${compact ? 'gap-2.5' : 'gap-4'}`}>
      {profile.bio ? (
        <section className={`rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] ${compact ? 'px-3.5 py-2.5' : 'px-4 py-3.5'}`}>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.08em] text-body-gray">About</h4>
          <p className={`mt-1.5 text-navy leading-snug ${compact ? 'text-[14px] line-clamp-2' : 'text-[15px] sm:text-base leading-relaxed'}`}>
            {profile.bio}
          </p>
        </section>
      ) : null}

      <div className={compact ? 'grid grid-cols-1 sm:grid-cols-[1fr_1.1fr] gap-2.5 items-start' : ''}>
        <section className={compact ? 'min-w-0' : ''}>
          <h4 className={`font-bold text-navy ${compact ? 'mb-2 text-sm' : 'mb-3 text-base sm:text-lg'}`}>
            Expertise
          </h4>
          <ExpertiseChips chips={profile.expertise} compact={compact} />
        </section>

        {infoCards.length ? (
          <ProfileInfoCards cards={infoCards} compact={compact} />
        ) : null}
      </div>

      {!compact && profile.visitNote ? (
        <p className="rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] px-4 py-3.5 text-[15px] text-body-gray inline-flex items-start gap-2.5">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" strokeWidth={1.85} />
          <span>{profile.visitNote}</span>
        </p>
      ) : null}
    </div>
  )
}
