export function generateLabBookingFromForm(data = {}) {
  const test = data.test
  if (!test?.id) return null

  return {
    id: `lab-booking-${test.id}-${Date.now()}`,
    status: 'Requested',
    createdAt: new Date().toISOString(),
    name: data.name?.trim() || 'Patient',
    mobile: data.mobile?.trim() || '',
    date: data.date || '',
    timeSlot: data.timeSlot || '',
    collectionType: data.collectionType || 'Home Collection',
    address: data.address?.trim() || '',
    test: {
      id: test.id,
      name: test.name,
      description: test.description,
      price: test.price,
      turnaround: test.turnaround,
      thumbnail: test.thumbnail || test.image || test.background || '',
      image: test.thumbnail || test.image || test.background || '',
    },
  }
}

export function normalizeLabBooking(raw = {}) {
  if (!raw || typeof raw !== 'object') return null
  const test = raw.test
  if (!test?.id && !test?.name) return null

  const image = test.thumbnail || test.image || test.background || ''

  return {
    id: raw.id || `lab-booking-${test.id || 'legacy'}-${raw.date || Date.now()}`,
    status: raw.status || 'Requested',
    createdAt: raw.createdAt || new Date().toISOString(),
    name: raw.name || 'Patient',
    mobile: raw.mobile || '',
    date: raw.date || '',
    timeSlot: raw.timeSlot || '',
    collectionType: raw.collectionType || 'Home Collection',
    address: raw.address || '',
    test: {
      id: test.id,
      name: test.name,
      description: test.description,
      price: test.price,
      turnaround: test.turnaround,
      thumbnail: image,
      image,
    },
  }
}
