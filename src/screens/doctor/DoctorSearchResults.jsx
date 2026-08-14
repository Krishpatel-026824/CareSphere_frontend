import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react'
import DoctorFilterMenu from '../../components/doctor/DoctorFilterMenu'
import DoctorRatingInline from '../../components/doctor/DoctorRatingInline'
import { useDoctorSearchFilter } from '../../hooks/useDoctorSearchFilter'

export default function DoctorSearchResults({ category, doctors, onBack, onSelectDoctor }) {
  const { listFilter, setListFilter, filterOpen, setFilterOpen, filtered, filterActive } =
    useDoctorSearchFilter(doctors)

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
          <div className="relative rounded-xl border border-border-gray px-3 sm:px-4 py-3 bg-white flex items-center gap-2 max-w-2xl">
            <Search className="w-4 h-4 text-body-gray shrink-0" />
            <input
              value={`${category} in Ahmedabad`}
              readOnly
              className="w-full min-w-0 text-sm lg:text-base text-navy outline-none bg-transparent"
            />
            <button
              type="button"
              aria-label="Filters"
              aria-expanded={filterOpen}
              onClick={() => setFilterOpen((open) => !open)}
              className={`relative w-8 h-8 rounded-lg flex items-center justify-center shrink-0 cursor-pointer ${
                filterActive || filterOpen ? 'bg-teal-light text-teal' : 'text-body-gray hover:bg-bg-gray'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={1.75} />
              {filterActive ? (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-teal" />
              ) : null}
            </button>
            <DoctorFilterMenu
              open={filterOpen}
              listFilter={listFilter}
              onSelect={setListFilter}
              onClose={() => setFilterOpen(false)}
            />
          </div>
        </header>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border-gray bg-white p-8 text-center">
            <p className="text-base font-semibold text-navy">
              {filterActive ? 'No doctors match this filter' : `No ${category} doctors found`}
            </p>
            <p className="text-sm text-body-gray mt-1">
              {filterActive
                ? 'Try another filter or show all doctors.'
                : 'Try another specialty from the categories list.'}
            </p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {filtered.map((doctor) => (
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
        )}
      </div>
    </div>
  )
}
