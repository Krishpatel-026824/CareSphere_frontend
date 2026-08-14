import { MapPin, Video } from 'lucide-react'
import BackHomeButton from '../../components/BackHomeButton'
import TelemedicineDoctorCard from '../../components/telemedicine/TelemedicineDoctorCard'
import TelemedicineFilters from '../../components/telemedicine/TelemedicineFilters'
import { useTelemedicine } from '../../hooks/useTelemedicine'

export default function TelemedicineScreen({ doctors = [], onBack, onSelectDoctor }) {
  const {
    filters,
    items,
    setSpecialty,
    toggleClinic,
    toggleLocation,
    toggleHighRated,
    toggleAvailable,
  } = useTelemedicine(doctors)

  return (
    <div className="w-full min-h-full bg-white">
      <div className="w-full page-pad py-5 sm:py-6 lg:py-8 flex flex-col gap-6">
        <header className="flex flex-col gap-5">
          <BackHomeButton onClick={onBack} />

          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 rounded-2xl bg-teal-light flex items-center justify-center shrink-0">
              <span className="absolute inset-0 rounded-2xl bg-teal/10" aria-hidden="true" />
              <Video className="relative w-7 h-7 text-teal" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <h1 className="text-[32px] sm:text-[36px] font-bold text-navy tracking-tight leading-none">
                Telemedicine
              </h1>
              <p className="text-sm text-body-gray mt-2 inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500" strokeWidth={1.75} />
                Ahmedabad
              </p>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-6">
          <TelemedicineFilters
            filters={filters}
            onSpecialty={setSpecialty}
            onClinic={toggleClinic}
            onLocation={toggleLocation}
            onHighRated={toggleHighRated}
            onAvailable={toggleAvailable}
          />

          <div className="flex-1 min-w-0 w-full flex flex-col gap-4">
            {items.length === 0 ? (
              <div className="rounded-xl border border-border-gray bg-white p-8 text-center">
                <p className="text-sm font-semibold text-navy">No video doctors match these filters</p>
              </div>
            ) : (
              items.map((doctor) => (
                <TelemedicineDoctorCard key={doctor.id} doctor={doctor} onSelect={onSelectDoctor} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
