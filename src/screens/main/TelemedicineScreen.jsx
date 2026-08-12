import { Video } from 'lucide-react'
import DoctorRatingInline from '../../components/doctor/DoctorRatingInline'
import QuickActionHeader from '../../components/home/QuickActionHeader'
import { getVideoConsultDoctors } from '../../data/generators/quickActionsGenerator'

export default function TelemedicineScreen({ doctors = [], onBack, onSelectDoctor }) {
  const videoDoctors = getVideoConsultDoctors(doctors)

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-3xl mx-auto page-pad py-4 sm:py-6 flex flex-col gap-4">
        <QuickActionHeader
          title="Telemedicine"
          subtitle="Doctors available for video consultation"
          onBack={onBack}
        />

        <div className="flex flex-col gap-3">
          {videoDoctors.length === 0 ? (
            <div className="rounded-2xl border border-border-gray bg-white p-6 text-center shadow-sm">
              <p className="text-sm font-semibold text-navy">No video doctors available</p>
            </div>
          ) : (
            videoDoctors.map((doctor) => (
              <button
                key={doctor.id}
                type="button"
                onClick={() => onSelectDoctor?.(doctor)}
                className="w-full text-left bg-white border border-border-gray rounded-2xl p-4 shadow-sm flex items-center gap-3.5 cursor-pointer hover:border-teal/40 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-teal-light overflow-hidden shrink-0 ring-2 ring-teal/15">
                  <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-semibold text-navy truncate">{doctor.name}</h2>
                  <p className="text-xs text-body-gray mt-0.5 truncate">
                    {doctor.specialty} • {doctor.hospital}
                  </p>
                  <DoctorRatingInline rating={doctor.rating} reviewCount={doctor.reviewCount} className="mt-1 text-xs" />
                </div>
                <span className="inline-flex items-center gap-1.5 shrink-0 text-teal text-xs font-semibold bg-teal-light px-2.5 py-1.5 rounded-full">
                  <Video className="w-3.5 h-3.5" strokeWidth={1.75} />
                  Video
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
