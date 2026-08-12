import { useState } from 'react'
import { ArrowLeft, Bell, Calendar, MapPin, Search, Star } from 'lucide-react'
import DoctorRatingInline from '../../components/doctor/DoctorRatingInline'
import {
  doctorFilterHints,
  doctorFilterTitles,
  filterDoctorsByQuickFilter,
} from '../../data/generators/doctorFilter'
import DoctorInfoBanners from '../../components/doctor/DoctorInfoBanners'
import DoctorCategoryGrid from '../../components/doctor/DoctorCategoryGrid'

export default function DoctorCategories({ data, onSelectCategory, onSelectDoctor, onOpenNotifications, onBack }) {
  const [listFilter, setListFilter] = useState('rated')
  const [query, setQuery] = useState('')

  const doctors = data?.doctors || []
  const filteredDoctors = filterDoctorsByQuickFilter(doctors, listFilter).filter((doctor) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      doctor.name.toLowerCase().includes(q) ||
      doctor.specialty.toLowerCase().includes(q) ||
      doctor.hospital.toLowerCase().includes(q)
    )
  })

  const resultsTitle = doctorFilterTitles[listFilter]
  const resultsHint = doctorFilterHints[listFilter]

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-[1400px] mx-auto page-pad py-4 sm:py-5 lg:py-7 flex flex-col gap-5 lg:gap-6">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal cursor-pointer hover:opacity-70 w-fit -mb-1"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            Back to Home
          </button>
        ) : null}
        <header className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy tracking-tight">Doctors</h1>
              <p className="text-sm text-body-gray mt-1.5 inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500" strokeWidth={1.75} />
                {data.location}
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenNotifications}
              aria-label="Notifications"
              className="relative w-11 h-11 rounded-full border border-border-gray bg-white flex items-center justify-center cursor-pointer shadow-sm transition-all duration-200 hover:border-teal hover:bg-teal-light"
            >
              <Bell className="w-5 h-5 text-navy" strokeWidth={1.75} />
              <span className="absolute -top-0.5 -right-0.5 bg-teal text-white text-[10px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center font-bold">
                2
              </span>
            </button>
          </div>

          <div className="rounded-full border border-border-gray px-4 py-3.5 bg-white flex items-center gap-3 shadow-sm w-full">
            <Search className="w-5 h-5 text-body-gray shrink-0" strokeWidth={1.75} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search doctors, specialties..."
              className="w-full text-sm lg:text-base text-navy outline-none bg-transparent placeholder:text-body-gray/70"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 pt-0.5">
            <button
              type="button"
              aria-pressed={listFilter === 'rated'}
              onClick={() => setListFilter('rated')}
              className={`inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-all duration-200 ${
                listFilter === 'rated'
                  ? 'border-teal bg-teal-light/50 text-teal font-semibold shadow-sm'
                  : 'border-border-gray bg-white text-navy shadow-sm hover:border-teal/40'
              }`}
            >
              <Star className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              Top Rated
            </button>
            <button
              type="button"
              aria-pressed={listFilter === 'available'}
              onClick={() => setListFilter('available')}
              className={`inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-all duration-200 ${
                listFilter === 'available'
                  ? 'border-teal bg-teal-light/50 text-teal font-semibold shadow-sm'
                  : 'border-border-gray bg-white text-navy shadow-sm hover:border-teal/40'
              }`}
            >
              <Calendar className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              Available Today
            </button>
          </div>
        </header>

        <DoctorCategoryGrid categories={data.categories} onSelectCategory={onSelectCategory} />

        <section>
          <div className="flex items-end justify-between gap-3 mb-3">
            <div>
              <h2 className="text-lg font-semibold text-navy">{resultsTitle}</h2>
              <p className="text-xs text-body-gray mt-0.5">
                {filteredDoctors.length} doctors · {resultsHint}
              </p>
            </div>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="rounded-2xl border border-border-gray bg-white p-8 text-center shadow-sm">
              <p className="text-base font-semibold text-navy">No doctors found</p>
              <p className="text-sm text-body-gray mt-1">Try clearing your search or switch the filter above.</p>
            </div>
          ) : (
            <div key={listFilter} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredDoctors.map((doctor) => (
                <article
                  key={`${listFilter}-${doctor.id}`}
                  className="bg-white border border-border-gray rounded-2xl p-5 shadow-sm flex flex-col gap-4 transition-all duration-200 hover:shadow-md hover:border-teal/30"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-full bg-teal-light overflow-hidden shrink-0 ring-2 ring-teal/15">
                      {doctor.avatar ? (
                        <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-teal text-lg font-semibold">
                          {doctor.name.split(' ')[1]?.[0] || 'D'}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-navy truncate">{doctor.name}</h3>
                      <p className="text-sm text-body-gray mt-0.5 truncate">
                        {doctor.specialty} • {doctor.experience}+ years
                      </p>
                      <DoctorRatingInline
                        rating={doctor.rating}
                        reviewCount={doctor.reviewCount}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-1 border-t border-border-gray">
                    <div>
                      <p className="text-[11px] text-body-gray">Consultation</p>
                      <p className="text-sm font-bold text-navy">₹{doctor.fee}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => (onSelectDoctor ? onSelectDoctor(doctor) : onSelectCategory(doctor.specialty))}
                      className="min-h-10 px-4 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-teal-dark"
                    >
                      View Profile
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <DoctorInfoBanners />
      </div>
    </div>
  )
}
