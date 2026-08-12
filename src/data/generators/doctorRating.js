export function getDoctorRatingBreakdown(doctor) {
  if (doctor?.ratingBreakdown) return doctor.ratingBreakdown

  const rating = Number(doctor?.rating) || 4.5

  if (rating >= 4.8) {
    return { 5: 75, 4: 18, 3: 5, 2: 1, 1: 1 }
  }
  if (rating >= 4.6) {
    return { 5: 62, 4: 24, 3: 9, 2: 3, 1: 2 }
  }
  if (rating >= 4.4) {
    return { 5: 48, 4: 32, 3: 14, 2: 4, 1: 2 }
  }

  return { 5: 35, 4: 30, 3: 20, 2: 10, 1: 5 }
}

export function formatReviewCount(count) {
  return Number(count).toLocaleString('en-IN')
}
