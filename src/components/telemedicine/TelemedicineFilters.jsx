import { CalendarDays, MapPin, Star, Stethoscope, Building2 } from 'lucide-react'
import { telemedicineFiltersMock } from '../../data/mocks/telemedicine'
import FilterToggle from './FilterToggle'

function SectionTitle({ icon: Icon, children }) {
  return (
    <h3 className="flex items-center gap-2 text-sm font-semibold text-navy mb-3">
      <Icon className="w-4 h-4 text-body-gray" strokeWidth={1.75} />
      {children}
    </h3>
  )
}

export default function TelemedicineFilters({
  filters,
  onSpecialty,
  onClinic,
  onLocation,
  onHighRated,
  onAvailable,
}) {
  return (
    <aside className="w-full lg:w-[280px] shrink-0 rounded-xl border border-border-gray bg-white p-5">
      <div className="pb-5 mb-5 border-b border-border-gray">
        <SectionTitle icon={Stethoscope}>Specialty</SectionTitle>
        <ul className="flex flex-col gap-2.5">
          {telemedicineFiltersMock.specialties.map((item) => (
            <li key={item.id}>
              <label className="flex items-center gap-2.5 text-sm text-body-gray cursor-pointer">
                <input
                  type="radio"
                  name="telemed-specialty"
                  checked={filters.specialty === item.id}
                  onClick={() => onSpecialty(item.id)}
                  onChange={() => {}}
                  className="accent-teal w-4 h-4"
                />
                {item.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="pb-5 mb-5 border-b border-border-gray">
        <SectionTitle icon={Building2}>Clinic</SectionTitle>
        <ul className="flex flex-col gap-3">
          {telemedicineFiltersMock.clinics.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3">
              <label className="flex items-center gap-2.5 text-sm text-body-gray cursor-pointer min-w-0">
                <input
                  type="checkbox"
                  checked={filters.clinics.includes(item.id)}
                  onChange={() => onClinic(item.id)}
                  className="accent-teal w-4 h-4"
                />
                {item.label}
              </label>
              <FilterToggle
                checked={filters.clinics.includes(item.id)}
                onChange={() => onClinic(item.id)}
                label={`Toggle ${item.label}`}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="pb-5 mb-5 border-b border-border-gray">
        <SectionTitle icon={MapPin}>Location</SectionTitle>
        <ul className="flex flex-col gap-3">
          {telemedicineFiltersMock.locations.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3">
              <label className="flex items-center gap-2.5 text-sm text-body-gray cursor-pointer min-w-0">
                <input
                  type="checkbox"
                  checked={filters.locations.includes(item.id)}
                  onChange={() => onLocation(item.id)}
                  className="accent-teal w-4 h-4"
                />
                {item.label}
              </label>
              <FilterToggle
                checked={filters.locations.includes(item.id)}
                onChange={() => onLocation(item.id)}
                label={`Toggle ${item.label}`}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="pb-5 mb-5 border-b border-border-gray">
        <SectionTitle icon={Star}>Ratings</SectionTitle>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${star <= 4 ? 'text-amber fill-amber' : 'text-border-gray'}`}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <FilterToggle checked={filters.highRated} onChange={onHighRated} label="Filter 4 star and up" />
        </div>
      </div>

      <div>
        <SectionTitle icon={CalendarDays}>Availability</SectionTitle>
        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2.5 text-sm text-body-gray cursor-pointer">
            <input
              type="checkbox"
              checked={filters.available}
              onChange={onAvailable}
              className="accent-teal w-4 h-4"
            />
            Available today
          </label>
          <FilterToggle checked={filters.available} onChange={onAvailable} label="Toggle available today" />
        </div>
      </div>
    </aside>
  )
}
