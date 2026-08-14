import BackHomeButton from '../../components/BackHomeButton'
import RescheduleCurrentVisit from '../../components/reschedule/RescheduleCurrentVisit'
import RescheduleDoctorCard from '../../components/reschedule/RescheduleDoctorCard'

const steps = ['Choose a doctor', 'Pick a new slot', 'Confirm visit']

export default function RescheduleDoctorScreen({ doctors, appointment, onBack, onSelectDoctor }) {
  const count = doctors.length

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full min-h-full max-w-[1440px] mx-auto page-pad py-5 sm:py-6 lg:py-8 flex flex-col gap-5 sm:gap-6">
        <header className="shrink-0">
          <BackHomeButton onClick={onBack} iconOnly />
          <div className="mt-3 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-[28px] sm:text-[32px] font-bold text-navy tracking-tight">Reschedule</h1>
              <p className="text-sm text-body-gray mt-1">
                Choose any of your {count} doctors, then pick a new date and time.
              </p>
            </div>
            <ol className="flex flex-wrap items-center gap-2">
              {steps.map((step, index) => (
                <li key={step} className="inline-flex items-center gap-2 text-xs sm:text-sm">
                  <span
                    className={`w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center ${
                      index === 0
                        ? 'bg-navy text-white'
                        : 'border border-navy/30 text-navy bg-white'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className={index === 0 ? 'font-semibold text-navy' : 'font-medium text-body-gray'}>
                    {step}
                  </span>
                  {index < steps.length - 1 ? <span className="text-border-gray px-0.5">→</span> : null}
                </li>
              ))}
            </ol>
          </div>
        </header>

        <RescheduleCurrentVisit appointment={appointment} />

        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-3 sm:gap-4 flex-1 items-stretch">
          {doctors.map((doctor, index) => (
            <RescheduleDoctorCard
              key={doctor.id}
              doctor={doctor}
              current={doctor.id === appointment?.doctorId}
              onSelect={onSelectDoctor}
              className={
                index === 3
                  ? 'xl:col-span-2 xl:col-start-2'
                  : index === 4
                    ? 'sm:col-span-2 xl:col-span-2'
                    : 'xl:col-span-2'
              }
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
