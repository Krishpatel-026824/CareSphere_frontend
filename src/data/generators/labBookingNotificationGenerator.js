export function formatLabBookingDate(isoDate = '') {
  if (!isoDate) return ''
  const [year, month, day] = String(isoDate).split('-')
  if (!year || !month || !day) return isoDate
  return `${day}/${month}/${year}`
}

export function generateLabBookingNotification(booking) {
  const test = booking?.test
  if (!test?.id) return null

  const dateLabel = formatLabBookingDate(booking.date)
  const details = {
    kind: 'labBooking',
    testName: test.name,
    description: test.description,
    price: `₹${test.price}`,
    turnaround: test.turnaround,
    patient: booking.name || '—',
    mobile: booking.mobile || '—',
    date: dateLabel || '—',
    time: booking.timeSlot || '—',
    collection: booking.collectionType || '—',
    address:
      booking.collectionType === 'Home Collection' && booking.address
        ? booking.address
        : '',
  }

  return {
    id: `notif-lab-${test.id}-${Date.now()}`,
    type: 'lab',
    title: `Lab Booking: ${test.name}`,
    message: `${test.name} • ${details.price} • ${details.date} • ${details.time}`,
    details,
    timeLabel: 'Just now',
    unread: true,
  }
}
