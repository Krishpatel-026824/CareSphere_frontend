import DoctorCategoryGrid from '../../components/doctor/DoctorCategoryGrid'
import DoctorDiscoveryHeader from '../../components/doctor/DoctorDiscoveryHeader'
import DoctorInfoBanners from '../../components/doctor/DoctorInfoBanners'
import DoctorListCard from '../../components/doctor/DoctorListCard'
import { useDoctorDiscovery } from '../../hooks/useDoctorDiscovery'

export default function DoctorCategories({ data, onSelectCategory, onSelectDoctor, onOpenNotifications, onBack }) {
  const {
    query,
    setQuery,
    listFilter,
    filteredDoctors,
    resultsTitle,
    resultsHint,
    location,
  } = useDoctorDiscovery(data)

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-[1400px] mx-auto page-pad py-5 sm:py-6 lg:py-8 flex flex-col gap-6 lg:gap-7">
        <DoctorDiscoveryHeader
          location={location}
          query={query}
          onQueryChange={setQuery}
          onBack={onBack}
          onOpenNotifications={onOpenNotifications}
        />

        <DoctorCategoryGrid categories={data.categories} onSelectCategory={onSelectCategory} />

        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-navy">{resultsTitle}</h2>
            <p className="text-sm text-body-gray mt-1">
              {filteredDoctors.length} doctors - {resultsHint}
            </p>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="rounded-2xl bg-white border border-border-gray p-8 text-center">
              <p className="text-base font-semibold text-navy">No doctors found</p>
              <p className="text-sm text-body-gray mt-1">Try clearing your search or pick a specialty above.</p>
            </div>
          ) : (
            <div key={listFilter} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredDoctors.map((doctor) => (
                <DoctorListCard
                  key={`${listFilter}-${doctor.id}`}
                  doctor={doctor}
                  onSelect={(item) => (onSelectDoctor ? onSelectDoctor(item) : onSelectCategory(item.specialty))}
                />
              ))}
            </div>
          )}
        </section>

        <DoctorInfoBanners />
      </div>
    </div>
  )
}
