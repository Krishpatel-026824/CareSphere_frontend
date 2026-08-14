import DoctorRatingInline from '../doctor/DoctorRatingInline'

export default function NewAppointmentDoctorCard({ doctor, onSelect }) {
  return (
    <article className="rounded-2xl border border-border-gray bg-white p-4 shadow-sm flex items-center gap-3">
      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-teal-light">
        {doctor.avatar ? (
          <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover object-[center_18%]" />
        ) : (
          <span className="w-full h-full flex items-center justify-center text-teal font-semibold">
            {doctor.name.split(' ')[1]?.[0] || 'D'}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-bold text-navy truncate">{doctor.name}</h2>
        <p className="text-[12px] text-body-gray truncate">
          {doctor.specialty} • {doctor.hospital}
        </p>
        <DoctorRatingInline rating={doctor.rating} reviewCount={doctor.reviewCount} className="mt-1 text-[11px]" />
      </div>
      <button
        type="button"
        onClick={() => onSelect(doctor)}
        className="min-h-10 px-3.5 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark shrink-0"
      >
        Book
      </button>
    </article>
  )
}
