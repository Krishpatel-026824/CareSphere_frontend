function clockNow() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
}

function describeChanges(previous = {}, next = {}) {
  const changes = []
  if (previous.dateLabel !== next.dateLabel) {
    changes.push(`date from ${previous.dateLabel || '—'} to ${next.dateLabel || '—'}`)
  }
  if (previous.timeLabel !== next.timeLabel) {
    changes.push(`slot from ${previous.timeLabel || '—'} to ${next.timeLabel || '—'}`)
  }
  if (previous.visitType !== next.visitType) {
    changes.push(`visit type to ${next.visitType || '—'}`)
  }
  if (previous.clinic !== next.clinic && next.clinic) {
    changes.push(`clinic to ${next.clinic}`)
  }
  return changes
}

export function generateAppointmentUpdateNotice({ previous, next, patientName = 'Krish' }) {
  if (!next?.id) return null

  const doctorName = next.doctorName || 'your doctor'
  const date = next.dateLabel || previous?.dateLabel || ''
  const time = next.timeLabel || previous?.timeLabel || ''
  const visitType = next.visitType || previous?.visitType || 'In-clinic'
  const changes = describeChanges(previous, next)
  const changeText = changes.length
    ? changes.join(', ')
    : `your visit details with ${doctorName}`

  return {
    notification: {
      id: `notif-appt-update-${next.id}-${Date.now()}`,
      type: 'appointment',
      title: 'Appointment updated',
      message: `Your appointment with ${doctorName} is now ${date} at ${time} (${visitType}).`,
      details: {
        kind: 'appointmentUpdate',
        doctorName,
        date,
        time,
        visitType,
        clinic: next.clinic || '',
        changeText,
      },
      timeLabel: 'Just now',
      unread: true,
    },
    chat: next.doctorId
      ? {
          doctorId: next.doctorId,
          doctorName,
          avatar: next.doctorPhoto || next.photo || '',
          message: {
            id: `msg-appt-update-${Date.now()}`,
            from: 'them',
            text: `Hello ${patientName}, I have updated your appointment slot. Your visit is now on ${date} at ${time} (${visitType}). Please arrive 10 minutes early. See you then.`,
            time: clockNow(),
          },
        }
      : null,
  }
}
