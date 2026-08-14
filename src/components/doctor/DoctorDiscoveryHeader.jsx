import { Bell, MapPin, Search, Stethoscope } from 'lucide-react'
import BackHomeButton from '../BackHomeButton'

export default function DoctorDiscoveryHeader({
  location,
  query,
  onQueryChange,
  onBack,
  onOpenNotifications,
}) {
  return (
    <header className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        {onBack ? <BackHomeButton onClick={onBack} /> : <span />}
        <button
          type="button"
          onClick={onOpenNotifications}
          aria-label="Notifications"
          className="relative w-11 h-11 rounded-full bg-teal-light flex items-center justify-center cursor-pointer hover:bg-teal/20"
        >
          <Bell className="w-5 h-5 text-navy" strokeWidth={1.75} />
          <span className="absolute -top-0.5 -right-0.5 bg-teal text-white text-[10px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center font-bold">
            2
          </span>
        </button>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="relative w-14 h-14 rounded-2xl bg-teal-light flex items-center justify-center shrink-0">
          <span className="absolute inset-0 rounded-2xl bg-teal/10" aria-hidden="true" />
          <Stethoscope className="relative w-7 h-7 text-teal" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <h1 className="text-[32px] sm:text-[36px] font-bold text-navy tracking-tight leading-none">Doctors</h1>
          <p className="text-sm text-body-gray mt-2 inline-flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-rose-500" strokeWidth={1.75} />
            {location}
          </p>
        </div>
      </div>

      <div className="rounded-full bg-teal-light/70 px-5 py-3.5 flex items-center gap-3 w-full">
        <Search className="w-5 h-5 text-teal shrink-0" strokeWidth={1.75} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search doctors, specialties..."
          className="w-full text-sm lg:text-base text-navy outline-none bg-transparent placeholder:text-body-gray/60"
        />
      </div>
    </header>
  )
}
