import { Search } from 'lucide-react'
import DoctorRatingInline from '../../components/doctor/DoctorRatingInline'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { clearRecentSearches, setQuery } from '../../store/slices/searchSlice'

export default function SearchScreen() {
  const dispatch = useAppDispatch()
  const searchData = useAppSelector((state) => state.search)
  const query = searchData.query

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-[1400px] mx-auto page-pad py-4 sm:py-5 lg:py-8">
        <header className="mb-5 sm:mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy mb-3 sm:mb-4">Search</h1>
          <div className="rounded-xl border border-border-gray px-3 sm:px-4 py-3 bg-white flex items-center gap-2 max-w-2xl">
            <Search className="w-4 h-4 text-body-gray shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => dispatch(setQuery(e.target.value))}
              placeholder="Search doctors, specialties, hospitals..."
              className="w-full min-w-0 text-sm lg:text-base text-navy outline-none bg-transparent"
            />
          </div>
        </header>

        <section className="mb-5 sm:mb-6">
          <div className="flex items-center justify-between mb-3 gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-navy">Recent Searches</h2>
            <button
              type="button"
              onClick={() => dispatch(clearRecentSearches())}
              className="text-sm text-teal font-medium cursor-pointer shrink-0"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchData.recentSearches.map((item) => (
              <span key={item} className="text-sm px-3 sm:px-4 py-2 rounded-full border border-border-gray bg-white text-navy">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-5 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-navy mb-3">Popular Searches</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {searchData.popularSpecialties.map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-2xl border border-border-gray bg-white py-3 px-2 text-xs sm:text-sm text-navy cursor-pointer hover:border-teal hover:bg-teal-light"
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3 gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-navy">Recommended for You</h2>
            <button type="button" className="text-sm text-teal font-medium cursor-pointer shrink-0">
              View all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            {searchData.recommendedDoctors.map((doctor) => (
              <article
                key={doctor.id}
                className="bg-white border border-border-gray rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
              >
                <div className="flex items-center gap-3 sm:gap-4 w-full min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-light flex items-center justify-center font-semibold text-teal text-lg shrink-0">
                    {doctor.name.split(' ').slice(1, 2).join('').slice(0, 1)}
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
                      className="mt-2 min-h-9 bg-teal text-white text-sm px-3 sm:px-4 rounded-lg cursor-pointer"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
