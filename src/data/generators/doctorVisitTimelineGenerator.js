export function generateDoctorVisitTimeline(visit, tasks = []) {
  if (!visit) return []

  const status = visit.status || 'Upcoming'
  const isCompleted = status === 'Completed'
  const isCancelled = status === 'Cancelled'
  const isConfirmed = status === 'Confirmed' || isCompleted
  const isUpcoming = status === 'Upcoming'
  const allTasksDone = tasks.length > 0 && tasks.every((task) => task.done)

  if (isCancelled) {
    return [
      { id: 'booked', label: 'Booked', state: 'done' },
      { id: 'confirmed', label: 'Cancelled', state: 'cancelled' },
      { id: 'checkin', label: 'Check-in', state: 'upcoming' },
      { id: 'done', label: 'Completed', state: 'upcoming' },
    ]
  }

  const checkInDone = isCompleted || (isConfirmed && allTasksDone)
  const checkInCurrent = isConfirmed && !isCompleted && !allTasksDone
  const completeCurrent = isConfirmed && allTasksDone && !isCompleted

  return [
    { id: 'booked', label: 'Booked', state: 'done' },
    {
      id: 'confirmed',
      label: 'Confirmed',
      state: isUpcoming ? 'current' : 'done',
    },
    {
      id: 'checkin',
      label: isCompleted ? 'Checked in' : 'Check-in',
      state: checkInDone ? 'done' : checkInCurrent ? 'current' : 'upcoming',
    },
    {
      id: 'done',
      label: 'Completed',
      state: isCompleted ? 'done' : completeCurrent ? 'current' : 'upcoming',
    },
  ]
}

export function getDoctorVisitTimelineHint(steps = []) {
  const current = steps.find((step) => step.state === 'current')
  if (!current) {
    return steps.every((step) => step.state === 'done')
      ? 'Visit journey complete'
      : 'Track visit progress below'
  }

  if (current.id === 'confirmed') return 'Accept the visit to confirm the appointment'
  if (current.id === 'checkin') return 'Finish the visit checklist to mark check-in'
  if (current.id === 'done') return 'All prep done — mark visit completed when finished'
  return ''
}
