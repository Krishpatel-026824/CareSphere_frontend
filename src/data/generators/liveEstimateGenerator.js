function pad(value) {
  return String(value).padStart(2, '0')
}

export function createEstimateAt(offsetMinutes = 25) {
  return Date.now() + offsetMinutes * 60 * 1000
}

export function formatLiveEstimate(etaAt, now = Date.now(), arrivingLabel = 'Arriving in') {
  const eta = new Date(etaAt)
  const remainingMs = Math.max(0, etaAt - now)
  const totalSeconds = Math.floor(remainingMs / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const today = new Date(now)
  const isToday = eta.toDateString() === today.toDateString()
  const clock = eta.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  })

  let countdown = 'Arriving now'
  if (totalSeconds > 0) {
    if (hours > 0) {
      countdown = `${arrivingLabel} ${hours} hr ${pad(minutes)} min`
    } else {
      countdown = `${arrivingLabel} ${minutes} min ${pad(seconds)} sec`
    }
  }

  return {
    timeLabel: `${isToday ? 'Today' : 'Tomorrow'}, ${clock}`,
    countdown,
  }
}
