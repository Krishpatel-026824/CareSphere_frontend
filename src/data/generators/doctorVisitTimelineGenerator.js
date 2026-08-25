export function generateDoctorVisitTimeline(visit, tasks = []) {
  if (!visit) return []

  const status = visit.status || 'Upcoming'
  const isCompleted = status === 'Completed'
  const isCancelled = status === 'Cancelled'
  const isConfirmed = status === 'Confirmed' || isCompleted
  const isUpcoming = status === 'Upcoming'
  const hasTasks = tasks.length > 0
  const doneCount = tasks.filter((task) => task.done).length
  const allTasksDone = hasTasks && doneCount === tasks.length

  if (isCancelled) {
    return [
      { id: 'booked', label: 'Booked', state: 'done' },
      { id: 'confirmed', label: 'Cancelled', state: 'cancelled' },
      { id: 'checkin', label: 'Check-in', state: 'upcoming' },
      { id: 'done', label: 'Completed', state: 'upcoming' },
    ]
  }

  // Booked → Confirmed → Check-in (via checklist) → Completed
  let confirmedState = 'upcoming'
  let checkInState = 'upcoming'
  let doneState = 'upcoming'

  if (isUpcoming) {
    confirmedState = 'current'
  } else if (isConfirmed) {
    confirmedState = 'done'

    if (isCompleted) {
      checkInState = 'done'
      doneState = 'done'
    } else if (!hasTasks || allTasksDone) {
      // Checklist finished (or no checklist) → check-in done, ready to complete
      checkInState = 'done'
      doneState = 'current'
    } else {
      // Still ticking checklist items
      checkInState = 'current'
      doneState = 'upcoming'
    }
  }

  return [
    { id: 'booked', label: 'Booked', state: 'done' },
    { id: 'confirmed', label: 'Confirmed', state: confirmedState },
    {
      id: 'checkin',
      label: checkInState === 'done' ? 'Checked in' : 'Check-in',
      state: checkInState,
    },
    { id: 'done', label: 'Completed', state: doneState },
  ]
}

export function getDoctorVisitTimelineHint(steps = [], tasks = []) {
  const current = steps.find((step) => step.state === 'current')
  if (!current) {
    return steps.every((step) => step.state === 'done')
      ? 'Visit journey complete'
      : 'Track visit progress below'
  }

  if (current.id === 'confirmed') return 'Accept the visit to confirm the appointment'
  if (current.id === 'checkin') {
    const total = tasks.length
    const done = tasks.filter((task) => task.done).length
    if (total > 0) return `Tick checklist items to finish check-in (${done}/${total})`
    return 'Finish the visit checklist to mark check-in'
  }
  if (current.id === 'done') return 'Check-in done — tap Mark completed to finish'
  return ''
}
