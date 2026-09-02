import { generateDoctorProfile } from '../../data/generators/doctorProfileGenerator'
import DoctorProfileAbout from './DoctorProfileAbout'
import DoctorProfileHero from './DoctorProfileHero'
import DoctorProfileStats from './DoctorProfileStats'

export default function AppointmentDoctorTab({ appointment, doctor, embedded = false }) {
  const profile = generateDoctorProfile(appointment, doctor)

  const content = (
    <div className={`w-full flex flex-col ${embedded ? 'gap-3' : 'gap-4'}`}>
      {!embedded ? (
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-navy shrink-0">Doctor Profile</h2>
      ) : null}
      <DoctorProfileHero profile={profile} compact={embedded} />
      <DoctorProfileStats profile={profile} compact={embedded} />
      <DoctorProfileAbout profile={profile} compact={embedded} />
    </div>
  )

  if (embedded) return content

  return (
    <div className="p-4 sm:p-5 lg:p-6 overflow-y-auto flex-1 min-h-0 min-w-0">
      {content}
    </div>
  )
}
