import { CheckCircle2 } from 'lucide-react'
import Button from '../../components/Button'

export default function AppointmentConfirmation({ booking, onBackHome, actionLabel = 'Back to Home' }) {
  return (
    <div className="w-full min-h-full page-pad py-4 sm:py-6 lg:py-8 xl:py-10 flex items-center justify-center">
      <div className="bg-white border border-border-gray rounded-2xl p-5 sm:p-8 shadow-sm w-full max-w-xl text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal-light flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-teal" />
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy mb-2">
          {booking.isReschedule ? 'Your appointment is rescheduled!' : 'Your appointment is confirmed!'}
        </h1>
        <p className="text-sm text-body-gray mb-5">
          {booking.isReschedule
            ? 'Your upcoming appointment on the home page has been updated.'
            : 'Your new visit is saved with the same details as your other appointments.'}
        </p>

        <div className="rounded-xl border border-border-gray bg-bg-gray p-4 text-left mb-5">
          <p className="text-sm text-body-gray">Doctor</p>
          <p className="text-base font-semibold text-navy mb-2">{booking.doctor.name}</p>
          <p className="text-sm text-body-gray">Date & Time</p>
          <p className="text-base font-semibold text-navy mb-2">{booking.selectedDate} • {booking.selectedTime}</p>
          <p className="text-sm text-body-gray">Consultation Fee</p>
          <p className="text-base font-semibold text-navy mb-2">₹{booking.doctor.fee}</p>
          <p className="text-sm text-body-gray">Appointment ID</p>
          <p className="text-base font-semibold text-teal">{booking.appointmentId}</p>
        </div>

        <Button onClick={onBackHome}>{actionLabel}</Button>
      </div>
    </div>
  )
}
