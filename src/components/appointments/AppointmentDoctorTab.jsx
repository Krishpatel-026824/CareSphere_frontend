import { generateDoctorProfile } from '../../data/generators/doctorProfileGenerator'
import DoctorProfileAbout from './DoctorProfileAbout'
import DoctorProfileHero from './DoctorProfileHero'
import DoctorProfileStats from './DoctorProfileStats'

export default function AppointmentDoctorTab({ appointment, doctor }) {
  const profile = generateDoctorProfile(appointment, doctor)

  return (
    <div className="flex-1 min-h-0 min-w-0 overflow-y-auto p-4 sm:p-5 lg:p-6">
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-[20px] font-bold tracking-tight text-[#1E2124] shrink-0">Doctor Profile</h2>
        <DoctorProfileHero profile={profile} />
        <p className="text-[13px] leading-relaxed text-[#6B7280] shrink-0">{profile.bio}</p>
        <DoctorProfileStats profile={profile} />
        <DoctorProfileAbout profile={profile} />
      </div>
    </div>
  )
}
