function mapsQuery(appointment) {
  if (!appointment) return ''

  const { lat, lng } = appointment.mapCoords || {}
  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    return `${lat},${lng}`
  }

  return appointment.fullAddress || appointment.address || ''
}

export function getClinicMapsUrl(appointment) {
  const query = mapsQuery(appointment)
  if (!query) return '#'

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function getClinicMapEmbedUrl(appointment) {
  const query = mapsQuery(appointment)
  if (!query) return ''

  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=en&z=16&output=embed`
}
