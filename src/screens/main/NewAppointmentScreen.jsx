import { CalendarPlus } from 'lucide-react'
import BackHomeButton from '../../components/BackHomeButton'
import NewAppointmentDoctorCard from '../../components/appointments/NewAppointmentDoctorCard'

export default function NewAppointmentScreen({
  categories = [],
  doctors = [],
  specialty = 'All',
  onSpecialtyChange,
  onBack,
  onSelectDoctor,
}) {
  const chips = ['All', ...categories]

  return (
    <div className="w-full min-h-full bg-[#E8F1F2]">
      <div className="w-full max-w-[1100px] mx-auto page-pad py-4 sm:py-5 flex flex-col gap-4">
        <header>
          <BackHomeButton onClick={onBack} iconOnly />
          <div className="mt-3 flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-teal text-white flex items-center justify-center shrink-0">
              <CalendarPlus className="w-6 h-6" strokeWidth={1.75} />
            </div>
            <div>
              <h1 className="text-[24px] sm:text-[28px] font-bold text-navy tracking-tight leading-none">
                New appointment
              </h1>
              <p className="text-sm text-body-gray mt-1">Choose a doctor, then pick a date and time</p>
            </div>
          </div>
        </header>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {chips.map((chip) => {
            const active = specialty === chip
            return (
              <button
                key={chip}
                type="button"
                onClick={() => onSpecialtyChange(chip)}
                className={`shrink-0 min-h-9 px-3.5 rounded-full text-sm font-semibold cursor-pointer ${
                  active ? 'bg-teal text-white' : 'bg-white text-navy border border-border-gray'
                }`}
              >
                {chip}
              </button>
            )
          })}
        </div>

        {doctors.length ? (
          <ul className="flex flex-col gap-2.5">
            {doctors.map((doctor) => (
              <li key={doctor.id}>
                <NewAppointmentDoctorCard doctor={doctor} onSelect={onSelectDoctor} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-body-gray bg-white rounded-2xl border border-border-gray p-6 text-center">
            No doctors in this specialty.
          </p>
        )}
      </div>
    </div>
  )
}
