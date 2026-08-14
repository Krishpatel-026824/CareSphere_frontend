import { useEffect, useMemo, useState } from 'react'
import BackHomeButton from '../../components/BackHomeButton'
import Button from '../../components/Button'

export default function AppointmentBooking({ doctor, onBack, onContinue, variant = 'appointments' }) {
  const dates = doctor.slots?.dates || []
  const times = doctor.slots?.times || []
  const [selectedDate, setSelectedDate] = useState(dates[0] || '')
  const [selectedTime, setSelectedTime] = useState(times[0] || '')
  const appointmentId = useMemo(() => `CSAP${Date.now().toString().slice(-8)}`, [])
  const canContinue = Boolean(selectedDate && selectedTime)

  useEffect(() => {
    setSelectedDate(doctor.slots?.dates?.[0] || '')
    setSelectedTime(doctor.slots?.times?.[0] || '')
  }, [doctor.id])

  return (
    <div className={`w-full min-h-full ${variant === 'appointments' ? 'bg-[#E8F1F2]' : 'bg-bg-gray'}`}>
      <div className="w-full max-w-3xl mx-auto page-pad py-4 sm:py-6">
        <BackHomeButton onClick={onBack} iconOnly />

        <section className="mt-4 bg-white border border-border-gray rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-teal-light shrink-0">
            {doctor.avatar ? (
              <img src={doctor.avatar} alt="" className="w-full h-full object-cover object-top" />
            ) : null}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-navy truncate">{doctor.name}</h1>
            <p className="text-sm text-body-gray truncate">
              {doctor.specialty} • {doctor.hospital}
            </p>
          </div>
          <p className="text-lg font-bold text-navy shrink-0">₹{doctor.fee}</p>
        </section>

        <section className="mt-3 bg-white border border-border-gray rounded-2xl p-4 sm:p-5 shadow-sm">
          <h2 className="text-base font-semibold text-navy mb-3">Select date</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {dates.map((date) => (
              <button
                key={date}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`rounded-xl border px-2 py-3 text-xs sm:text-sm font-semibold cursor-pointer ${
                  selectedDate === date
                    ? 'bg-teal text-white border-teal'
                    : 'bg-white text-navy border-border-gray hover:border-teal/40'
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-3 bg-white border border-border-gray rounded-2xl p-4 sm:p-5 shadow-sm">
          <h2 className="text-base font-semibold text-navy mb-3">Select time</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {times.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`rounded-xl border px-2 py-3 text-xs sm:text-sm font-semibold cursor-pointer ${
                  selectedTime === time
                    ? 'bg-teal text-white border-teal'
                    : 'bg-white text-navy border-border-gray hover:border-teal/40'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </section>

        <div className="mt-4 w-full max-w-sm">
          <Button
            disabled={!canContinue}
            onClick={() => onContinue({ doctor, selectedDate, selectedTime, appointmentId })}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
