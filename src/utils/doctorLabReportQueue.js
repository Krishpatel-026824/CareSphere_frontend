export function matchesLabReportQuery(item, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [item.patientName, item.title, item.status, item.dateLabel, item.badge]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(q))
}

export function matchesLabReportFilter(item, filter) {
  if (filter === 'needs') return item.status === 'Ready for review'
  if (filter === 'urgent') return item.badge === 'Urgent' && item.status === 'Ready for review'
  if (filter === 'verified') return item.status === 'Verified'
  return true
}

export function sortLabReportQueue(items) {
  return [...items].sort((a, b) => {
    const urgentA = a.badge === 'Urgent' && a.status === 'Ready for review' ? 0 : 1
    const urgentB = b.badge === 'Urgent' && b.status === 'Ready for review' ? 0 : 1
    if (urgentA !== urgentB) return urgentA - urgentB
    const reviewA = a.status === 'Ready for review' ? 0 : 1
    const reviewB = b.status === 'Ready for review' ? 0 : 1
    return reviewA - reviewB
  })
}

export function labReportFilterCounts(items) {
  return {
    needs: items.filter((item) => item.status === 'Ready for review').length,
    urgent: items.filter(
      (item) => item.badge === 'Urgent' && item.status === 'Ready for review',
    ).length,
    verified: items.filter((item) => item.status === 'Verified').length,
    all: items.length,
  }
}

export function nextLabReportAfterVerify(items, verifiedId) {
  const remaining = sortLabReportQueue(
    items.filter((item) => item.id !== verifiedId && item.status === 'Ready for review'),
  )
  return remaining[0]?.id || null
}
