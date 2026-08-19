import { useState } from 'react'
import { FlaskConical } from 'lucide-react'
import BackHomeButton from '../../components/BackHomeButton'
import ServicePageHeading from '../../components/ServicePageHeading'
import LabMyBookings from '../../components/lab/LabMyBookings'

export default function LabBookingsScreen({ onBack }) {
  const [bookings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('labBookings') || '[]') } catch { return [] }
  })

  return (
    <div className="w-full min-h-full bg-[#F4F7F8]">
      <div className="w-full page-pad py-5 sm:py-6 lg:py-7 flex flex-col gap-5">
        <header>
          <BackHomeButton onClick={onBack} />
          <ServicePageHeading
            icon={FlaskConical}
            tone="bg-amber-100 text-amber-600"
            title="My Lab Bookings"
            subtitle="All your booked lab tests"
          />
        </header>

        {bookings.length ? (
          <LabMyBookings bookings={bookings} />
        ) : (
          <div className="bg-white rounded-xl border border-border-gray p-8 text-center">
            <p className="text-[15px] text-gray-500">No bookings yet. Book a lab test to see it here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
