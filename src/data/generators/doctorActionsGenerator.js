const ACTIVE = new Set(['Upcoming', 'Confirmed'])

export function canAcceptVisit(visit) {
  return visit?.status === 'Upcoming'
}

export function canDeclineVisit(visit) {
  return ACTIVE.has(visit?.status)
}

export function canCompleteVisit(visit) {
  return visit?.status === 'Confirmed'
}

export function doctorVisitMenuOptions(visit) {
  const options = []
  if (canAcceptVisit(visit)) {
    options.push({ id: 'accept', label: 'Accept visit', danger: false })
  }
  if (canCompleteVisit(visit)) {
    options.push({ id: 'complete', label: 'Mark completed', danger: false })
  }
  if (canDeclineVisit(visit)) {
    options.push({ id: 'decline', label: 'Decline visit', danger: true })
  }
  return options
}

export function doctorVisitDialogCopy(type, visit) {
  const name = visit?.patientName || 'this patient'
  const date = visit?.dateLabel || ''
  const time = visit?.timeLabel || ''

  if (type === 'accept') {
    return {
      title: 'Accept this visit?',
      body: `${name} will be marked as confirmed.`,
      confirm: 'Accept',
      danger: false,
    }
  }

  if (type === 'complete') {
    return {
      title: 'Mark visit completed?',
      body: `This consult with ${name} will move to completed.`,
      confirm: 'Complete',
      danger: false,
    }
  }

  return {
    title: 'Decline this visit?',
    body: `${name} on ${date} at ${time} will be cancelled.`,
    confirm: 'Decline',
    danger: true,
  }
}
