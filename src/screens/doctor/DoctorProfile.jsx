import { ArrowLeft, CalendarDays, Globe, Stethoscope, Users } from 'lucide-react'
import ExpertiseChips from '../../components/appointments/ExpertiseChips'
import PatientReviewsPanel from '../../components/doctor/PatientReviewsPanel'
import { generateExpertiseChips } from '../../data/generators/expertiseChipGenerator'

export default function DoctorProfile({ doctor, onBack, onBook }) {
  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-[1100px] mx-auto page-pad py-4 sm:py-6 lg:py-8">
        <button
          type="button"
          onClick={onBack}
          className="mb-4 cursor-pointer p-2 rounded-xl border border-border-gray bg-white"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-navy" />
        </button>

        <section className="bg-white border border-border-gray rounded-2xl p-4 sm:p-6 shadow-sm mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal-light overflow-hidden shrink-0 ring-2 ring-teal/20 flex items-center justify-center text-teal text-2xl font-semibold">
              {doctor.avatar ? (
                <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover" />
              ) : (
                doctor.name.split(' ')[1]?.[0] || doctor.name[0]
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-navy">{doctor.name}</h1>
              <p className="text-sm sm:text-base text-body-gray">
                {doctor.specialty} • {doctor.experience}+ years experience
              </p>
              <p className="text-sm text-body-gray mt-1">{doctor.hospital}</p>
            </div>
            <span className="text-lg sm:text-xl font-bold text-navy shrink-0">₹{doctor.fee}</span>
          </div>
        </section>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
          {[
            { icon: Users, label: 'Patients', value: doctor.patientsCount },
            { icon: Stethoscope, label: 'Experience', value: `${doctor.experience}+ yrs` },
            { icon: CalendarDays, label: 'Consultation', value: `₹${doctor.fee}` },
            { icon: Globe, label: 'Languages', value: doctor.languages.join(', ') },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="bg-white border border-border-gray rounded-2xl p-3 sm:p-4 shadow-sm min-w-0">
                <Icon className="w-5 h-5 text-teal mb-2" />
                <p className="text-xs sm:text-sm text-body-gray">{item.label}</p>
                <p className="text-sm sm:text-base font-semibold text-navy break-words">{item.value}</p>
              </div>
            )
          })}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4">
          <section className="bg-white border border-border-gray rounded-2xl p-4 sm:p-5 shadow-sm">
            <h2 className="text-base sm:text-lg font-semibold text-navy mb-2">About Doctor</h2>
            <p className="text-sm text-body-gray leading-relaxed">{doctor.bio}</p>
          </section>
          <section className="bg-white border border-border-gray rounded-2xl p-4 sm:p-5 shadow-sm">
            <h2 className="text-base sm:text-lg font-semibold text-navy mb-2">Expertise</h2>
            <ExpertiseChips chips={generateExpertiseChips(doctor.expertise)} />
          </section>
        </div>

        <PatientReviewsPanel doctor={doctor} onBook={onBook} />
      </div>
    </div>
  )
}
