import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react'
import DoctorRatingInline from '../../components/doctor/DoctorRatingInline'

export default function DoctorSearchResults({ category, doctors, onBack, onSelectDoctor }) {
  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-[1400px] mx-auto page-pad py-4 sm:py-6 lg:py-8">
        <header className="mb-5 sm:mb-6">
          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              onClick={onBack}
              className="cursor-pointer p-2 rounded-xl border border-border-gray bg-white shrink-0"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 text-navy" />
            </button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy truncate">Search Results</h1>
          </div>
          <div className="rounded-xl border border-border-gray px-3 sm:px-4 py-3 bg-white flex items-center gap-2 mb-3 max-w-2xl">
            <Search className="w-4 h-4 text-body-gray shrink-0" />
            <input
              value={`${category} in Ahmedabad`}
              readOnly
              className="w-full min-w-0 text-sm lg:text-base text-navy outline-none bg-transparent"
            />
            <button type="button" aria-label="Filters" className="shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-body-gray" />
            </button>
          </div>
          <div className="scroll-x sm:flex-wrap">
            {['Available Today', 'Top Rated', 'Near Me'].map((chip) => (
              <span
                key={chip}
                className="text-sm px-3 sm:px-4 py-2 rounded-full border border-border-gray bg-white text-navy shrink-0"
              >
                {chip}
              </span>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {doctors.map((doctor) => (
            <article
              key={doctor.id}
              className="bg-white border border-border-gray rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-3 sm:gap-4"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-light overflow-hidden flex items-center justify-center text-teal text-lg font-semibold shrink-0">
                {doctor.avatar ? (
                  <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover" />
                ) : (
                  doctor.name.split(' ')[1]?.[0] || doctor.name[0]
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-navy truncate">{doctor.name}</h3>
                <p className="text-xs sm:text-sm text-body-gray truncate">
                  {doctor.specialty} • {doctor.experience}+ years
                </p>
                <DoctorRatingInline
                  rating={doctor.rating}
                  reviewCount={doctor.reviewCount}
                  className="mt-1 text-xs sm:text-sm"
                />
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm sm:text-base font-bold text-navy">₹{doctor.fee}</p>
                <button
                  type="button"
                  onClick={() => onSelectDoctor(doctor)}
                  className="text-sm text-teal font-semibold cursor-pointer mt-2"
                >
                  Book
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
