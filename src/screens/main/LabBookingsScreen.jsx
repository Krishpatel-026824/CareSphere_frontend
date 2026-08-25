import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useAppStore } from '../../store/useAppStore'
import LabBookingFormModal from '../../components/lab/LabBookingFormModal'
import LabMyBookings from '../../components/lab/LabMyBookings'
import { addLabReportFromBooking } from '../../store/slices/healthSlice'
import { addLabBooking, removeLabBooking, selectLabBookings } from '../../store/slices/labSlice'

export default function LabBookingsScreen() {
  const dispatch = useAppDispatch()
  const { notifyLabBooking } = useAppStore()
  const bookings = useAppSelector(selectLabBookings) ?? []
  const tests = useAppSelector((state) => state.lab.tests) ?? []
  const [showBookingForm, setShowBookingForm] = useState(false)

  function handleBookSubmit(data) {
    dispatch(addLabBooking(data))
    dispatch(addLabReportFromBooking(data))
    notifyLabBooking?.(data)
    setShowBookingForm(false)
  }

  return (
    <>
      <LabMyBookings
        bookings={bookings}
        tests={tests}
        onBookNew={() => setShowBookingForm(true)}
        onRemove={(id) => dispatch(removeLabBooking(id))}
      />

      <LabBookingFormModal
        open={showBookingForm}
        onClose={() => setShowBookingForm(false)}
        tests={tests}
        onSubmit={handleBookSubmit}
      />
    </>
  )
}
