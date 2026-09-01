export function parseVisitLabel(visitLabel = '') {
  const raw = String(visitLabel).trim()
  if (!raw) return { dateLabel: '', timeLabel: '' }

  const parts = raw.split('·').map((part) => part.trim()).filter(Boolean)
  if (parts.length >= 2) {
    return { dateLabel: parts[0], timeLabel: parts.slice(1).join(' · ') }
  }

  return { dateLabel: raw, timeLabel: '' }
}

export function formatPrescriptionTime(date = new Date()) {
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export function buildVisitSummary(note) {
  const parts = [note?.visitType, note?.visitReason].filter(Boolean)
  return parts.join(' · ') || note?.visitLabel || 'Clinic visit'
}

export function normalizePrescriptionNote(note) {
  if (!note) return null

  const parsed = parseVisitLabel(note.visitLabel)
  return {
    ...note,
    dateLabel: note.dateLabel || parsed.dateLabel || '—',
    timeLabel: note.timeLabel || parsed.timeLabel || '—',
    visitType: note.visitType || 'In-clinic',
    visitReason: note.visitReason || note.visitLabel || 'Clinic visit',
    clinic: note.clinic || 'CareSphere Clinic',
    medicines: note.medicines || [],
    doctor: note.doctor || 'Dr. James Carter',
  }
}

export function formatMedicineFormText(medicine) {
  if (!medicine) return ''

  const schedule = [medicine.dose, medicine.frequency, medicine.duration].filter(Boolean).join(' · ')
  const lines = [medicine.name, schedule, medicine.useFor ? `For ${medicine.useFor}` : '']
    .filter(Boolean)

  return lines.join('\n')
}

export function prescriptionMatchesQuery(note, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true

  const normalized = normalizePrescriptionNote(note)
  const haystack = [
    normalized.dateLabel,
    normalized.timeLabel,
    normalized.visitType,
    normalized.visitReason,
    normalized.clinic,
    normalized.note,
    normalized.doctor,
    ...(normalized.medicines || []).flatMap((med) => [
      med.name,
      med.dose,
      med.frequency,
      med.duration,
      med.useFor,
    ]),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return haystack.includes(q)
}
