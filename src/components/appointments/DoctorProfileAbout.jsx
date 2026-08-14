import { MapPin } from 'lucide-react'
import ExpertiseChips from './ExpertiseChips'
import ProfileInfoCards from './ProfileInfoCards'

export default function DoctorProfileAbout({ profile }) {
  return (
    <div className="flex flex-col gap-4">
      <section>
        <h4 className="mb-2.5 text-[15px] font-bold text-[#1E2124]">Expertise</h4>
        <ExpertiseChips chips={profile.expertise} />
      </section>
      <ProfileInfoCards cards={profile.infoCards} />
      {profile.visitNote ? (
        <p className="rounded-xl border border-[#E6E8EC] bg-[#F8FAFC] px-4 py-3 text-[13px] text-[#4B5563] inline-flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2F80ED]" strokeWidth={1.8} />
          <span>{profile.visitNote}</span>
        </p>
      ) : null}
    </div>
  )
}
