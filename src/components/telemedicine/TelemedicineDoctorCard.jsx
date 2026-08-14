import { Video } from 'lucide-react'
import DoctorRatingInline from '../doctor/DoctorRatingInline'

export default function TelemedicineDoctorCard({ doctor, onSelect }) {
  return (
    <article className="bg-white border border-border-gray rounded-xl p-4 sm:p-5 flex items-center gap-4 shadow-sm">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-teal-light overflow-hidden shrink-0">
        {doctor.avatar ? (
          <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-teal font-semibold">
            {doctor.name.split(' ')[1]?.[0] || 'D'}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="text-base font-bold text-navy truncate">{doctor.name}</h2>
        <p className="text-sm text-body-gray mt-0.5 truncate">
          {doctor.specialty} • {doctor.hospital}
        </p>
        <DoctorRatingInline rating={doctor.rating} reviewCount={doctor.reviewCount} className="mt-1.5" />
      </div>

      <button
        type="button"
        onClick={() => onSelect?.(doctor)}
        className="inline-flex items-center gap-2 shrink-0 min-h-10 px-4 rounded-lg bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark"
      >
        <Video className="w-4 h-4" strokeWidth={1.75} />
        Video
      </button>
    </article>
  )
}
