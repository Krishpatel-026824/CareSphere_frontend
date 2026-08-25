export function generateDoctorVisitActionNotice(type, visit) {
  if (!visit?.id) return null
  if (type !== 'complete' && type !== 'decline' && type !== 'accept') return null

  const name = visit.patientName || 'Patient'
  const date = visit.dateLabel || ''
  const time = visit.timeLabel || ''
  const room = visit.room || ''
  const when = [date, time].filter(Boolean).join(' at ')
  const place = room ? ` · ${room}` : ''

  if (type === 'accept') {
    return {
      id: `dnotif-accept-${visit.id}-${Date.now()}`,
      type: 'booking',
      title: 'Visit accepted',
      message: when
        ? `You accepted ${name}'s request for ${when}${place}.`
        : `You accepted ${name}'s visit request.`,
      timeLabel: 'Just now',
      unread: true,
    }
  }

  if (type === 'complete') {
    return {
      id: `dnotif-done-${visit.id}-${Date.now()}`,
      type: 'completed',
      title: 'Visit marked Done',
      message: when
        ? `${name}'s visit on ${when}${place} is completed and moved to Done.`
        : `${name}'s visit is completed and moved to Done.`,
      timeLabel: 'Just now',
      unread: true,
      details: {
        kind: 'visitCompleted',
        patientName: name,
        date,
        time,
        room,
        visitId: visit.id,
      },
    }
  }

  return {
    id: `dnotif-reject-${visit.id}-${Date.now()}`,
    type: 'cancellation',
    title: 'Visit rejected',
    message: when
      ? `You declined ${name}'s visit on ${when}${place}. That slot is open again.`
      : `You declined ${name}'s visit. That slot is open again.`,
    timeLabel: 'Just now',
    unread: true,
    details: {
      kind: 'visitRejected',
      patientName: name,
      date,
      time,
      room,
      visitId: visit.id,
    },
  }
}
