import { pharmacyBillingMock } from '../mocks/pharmacyBilling'

function startOfDay(date) {
  const next = new Date(date)
  next.setHours(0, 0, 0, 0)
  return next
}

function roundUpToHour(date) {
  const next = new Date(date)
  if (next.getMinutes() > 0 || next.getSeconds() > 0 || next.getMilliseconds() > 0) {
    next.setHours(next.getHours() + 1)
  }
  next.setMinutes(0, 0, 0)
  return next
}

function formatHour(date) {
  return date.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).replace(/am|pm/i, (match) => match.toUpperCase())
}

function formatSlot(start, end) {
  const startLabel = formatHour(start)
  const endLabel = formatHour(end)
  const startPeriod = startLabel.slice(-2)
  const endPeriod = endLabel.slice(-2)

  if (startPeriod === endPeriod) {
    return `${startLabel.replace(` ${startPeriod}`, '')} – ${endLabel}`
  }

  return `${startLabel} – ${endLabel}`
}

function formatDayLabel(now, deliveryAt) {
  const today = startOfDay(now).getTime()
  const deliveryDay = startOfDay(deliveryAt).getTime()
  const dayDiff = Math.round((deliveryDay - today) / 86400000)

  if (dayDiff === 0) return 'Today'
  if (dayDiff === 1) return 'Tomorrow'

  return deliveryAt.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export function generatePharmacyDeliveryEstimate(now = new Date()) {
  const leadStart = roundUpToHour(
    new Date(now.getTime() + pharmacyBillingMock.leadMinutes * 60 * 1000)
  )
  const cutoff = new Date(now)
  cutoff.setHours(pharmacyBillingMock.cutoffHour, 0, 0, 0)

  let slotStart = leadStart
  if (now.getHours() >= pharmacyBillingMock.cutoffHour || leadStart > cutoff) {
    slotStart = new Date(now)
    slotStart.setDate(slotStart.getDate() + 1)
    slotStart.setHours(pharmacyBillingMock.nextDayHour, 0, 0, 0)
  }

  const slotEnd = new Date(slotStart.getTime() + pharmacyBillingMock.windowMinutes * 60 * 1000)
  return `${formatDayLabel(now, slotStart)}, ${formatSlot(slotStart, slotEnd)}`
}
