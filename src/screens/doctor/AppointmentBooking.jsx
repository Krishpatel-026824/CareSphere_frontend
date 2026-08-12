import { useMemo, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Button from '../../components/Button'

export default function AppointmentBooking({ doctor, onBack, onContinue }) {
  const [selectedDate, setSelectedDate] = useState(doctor.slots.dates[1] || doctor.slots.dates[0])
  const [selectedTime, setSelectedTime] = useState(doctor.slots.times[2] || doctor.slots.times[0])
  const appointmentId = useMemo(() => `CSAP${Date.now().toString().slice(-8)}`, [])

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-4xl mx-auto page-pad py-4 sm:py-6 lg:py-8">
        <button
          type="button"
          onClick={onBack}
          className="mb-4 cursor-pointer p-2 rounded-xl border border-border-gray bg-white"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-navy" />
        </button>

        <section className="bg-white border border-border-gray rounded-2xl p-4 sm:p-5 shadow-sm mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-navy truncate">{doctor.name}</h1>
            <p className="text-sm text-body-gray">{doctor.specialty}</p>
            <p className="text-sm text-body-gray truncate">{doctor.hospital}</p>
          </div>
          <p className="text-lg font-bold text-navy shrink-0">₹{doctor.fee}</p>
        </section>

        <section className="bg-white border border-border-gray rounded-2xl p-4 sm:p-5 shadow-sm mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-navy mb-3">Select Date</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
            {doctor.slots.dates.map((date) => (
              <button
                key={date}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`rounded-xl border px-2 sm:px-3 py-3 text-xs sm:text-sm cursor-pointer ${
                  selectedDate === date ? 'bg-teal text-white border-teal' : 'bg-white text-navy border-border-gray'
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white border border-border-gray rounded-2xl p-4 sm:p-5 shadow-sm mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-navy mb-3">Select Time</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {doctor.slots.times.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`rounded-xl border px-2 sm:px-3 py-3 text-xs sm:text-sm cursor-pointer ${
                  selectedTime === time ? 'bg-teal text-white border-teal' : 'bg-white text-navy border-border-gray'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </section>

        <div className="w-full max-w-sm">
          <Button onClick={() => onContinue({ doctor, selectedDate, selectedTime, appointmentId })}>Continue</Button>
        </div>
      </div>
    </div>
  )
}
