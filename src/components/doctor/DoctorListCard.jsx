import DoctorRatingInline from './DoctorRatingInline'

export default function DoctorListCard({ doctor, onSelect }) {
  const initial = doctor.name.split(' ')[1]?.[0] || 'D'

  return (
    <article className="bg-[#F7FBFA] rounded-2xl border border-teal/15 p-5 shadow-sm flex flex-col gap-4">
      <div className="flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-full bg-teal-light overflow-hidden shrink-0 ring-2 ring-teal/15">
          {doctor.avatar ? (
            <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-teal text-lg font-semibold">
              {initial}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-navy truncate">{doctor.name}</h3>
          <p className="text-sm text-body-gray mt-0.5 truncate">
            {doctor.specialty} • {doctor.experience}+ years
          </p>
          <DoctorRatingInline rating={doctor.rating} reviewCount={doctor.reviewCount} className="mt-1" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-3 border-t border-teal/10">
        <div>
          <p className="text-[11px] text-body-gray">Consultation</p>
          <p className="text-sm font-bold text-teal mt-0.5">₹{doctor.fee}</p>
        </div>
        <button
          type="button"
          onClick={() => onSelect(doctor)}
          className="min-h-10 px-4 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark"
        >
          View Profile
        </button>
      </div>
    </article>
  )
}
