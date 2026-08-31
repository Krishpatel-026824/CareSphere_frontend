import { downloadLabReportPdf } from './downloadLabReportPdf'

function fileName(title, ext = 'txt') {
  const slug = `${title || 'caresphere-record'}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `${slug}.${ext}`
}

function recordText(record) {
  return [
    record.title,
    `Doctor: ${record.doctorName || ''}`,
    `Type: ${record.type}`,
    `Date: ${record.date}`,
    record.size ? `Size: ${record.size}` : '',
    '',
    record.summary || 'No summary available.',
    '',
    'CareSphere health record',
  ]
    .filter((line) => line !== '')
    .join('\n')
}

function saveBlob(blob, name) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = name
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function saveTextFile(name, text) {
  saveBlob(new Blob([text], { type: 'text/plain;charset=utf-8' }), name)
}

function isLabReportPayload(record = {}) {
  return Boolean(
    record.parameters?.length ||
      record.findings?.length ||
      record.testName ||
      record.patient ||
      record.sample ||
      record.type === 'Lab',
  )
}

export async function downloadReportImage(url, title) {
  if (!url) return

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('image fetch failed')
    const blob = await response.blob()
    const subtype = blob.type.split('/')[1] || 'jpg'
    const ext = subtype === 'jpeg' ? 'jpg' : subtype
    saveBlob(blob, fileName(title, ext))
  } catch {
    const link = document.createElement('a')
    link.href = url
    link.download = fileName(title, 'jpg')
    link.rel = 'noreferrer'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}

export function downloadHealthReport(record) {
  if (!record) return

  if (isLabReportPayload(record)) {
    downloadLabReportPdf(record)
    return
  }

  const text = [
    'CareSphere health report',
    record.title,
    `Report ID: ${record.reportId || ''}`,
    `Date: ${record.dateLabel || record.date || ''} ${record.timeLabel || ''}`.trim(),
    `Doctor: ${record.doctorName || ''}`,
    `Facility: ${record.hospital || ''}`,
    '',
    'Interpretation',
    record.interpretation || '—',
    '',
    `Verified by: ${record.verifiedBy || ''}`,
  ].join('\n')

  saveTextFile(fileName(record.title, 'txt'), text)
}

export function downloadRecordFile(record) {
  saveTextFile(fileName(record.title), recordText(record))
}

export function downloadRecordFiles(records, doctorName) {
  if (!records?.length) return

  if (records.length === 1) {
    downloadRecordFile(records[0])
    return
  }

  const text = records.map((record) => recordText(record)).join('\n\n-----\n\n')
  const name = fileName(`${doctorName || 'caresphere'}-records`)
  saveTextFile(name, text)
}

export { downloadLabReportPdf } from './downloadLabReportPdf'
