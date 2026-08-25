import { labPatientMock, labReportTemplatesMock } from '../mocks/labReportTemplates'
import { healthRecordDetailsMock } from '../mocks/healthRecordDetails'
import { healthRecordImages } from '../mocks/healthRecordImages'
import { healthRecordReportsMock } from '../mocks/healthRecordReports'

function mapLabFindings(parameters = []) {
  return parameters.map((row) => ({
    label: row.name,
    value: row.value,
    unit: row.unit || '—',
    reference: row.reference || '—',
    status: row.status,
  }))
}

export function getHealthRecordImage(record, imageKey) {
  if (imageKey && healthRecordImages[imageKey]) return healthRecordImages[imageKey]
  if (record?.preview) return record.preview
  if (record?.background) return record.background
  if (record?.icon && healthRecordImages[record.icon]) return healthRecordImages[record.icon]
  return healthRecordImages.lab
}

function fallbackReport(record) {
  return {
    findings: [
      { label: 'Document', value: record.title, unit: '—', reference: 'On file', status: 'Normal' },
      { label: 'Type', value: record.type || 'Clinical', unit: '—', reference: '—', status: 'Normal' },
      { label: 'Date', value: record.dateLabel, unit: '—', reference: '—', status: 'Normal' },
      { label: 'Time', value: record.timeLabel || '—', unit: '—', reference: '—', status: 'Normal' },
      { label: 'Status', value: 'Complete', unit: '—', reference: 'Reviewed', status: 'Normal' },
    ],
    interpretation: `${record.title} is on file from ${record.dateLabel}. Review the findings with your care team as needed.`,
    recommendations: [
      'Download this report for your personal records.',
      'Share this report at your next clinic visit.',
    ],
    visit: {
      mode: 'In-clinic',
      reason: record.title,
      referredBy: record.doctorName,
    },
    hospital: 'CareSphere Clinic',
  }
}

export function buildHealthRecordReport(record) {
  if (!record) return null

  const existing = record.detail || healthRecordDetailsMock[record.id]
  if (existing?.findings) {
    return { ...existing, preview: undefined }
  }

  const template = healthRecordReportsMock[record.id] || {}
  const lab = template.labTemplate ? labReportTemplatesMock[template.labTemplate] : null
  const fallback = fallbackReport(record)

  return {
    id: record.id,
    reportId: template.reportId || `CS-${String(record.id).toUpperCase()}`,
    title: record.title,
    type: record.type,
    status: template.status || 'Reviewed',
    dateLabel: record.dateLabel,
    timeLabel: record.timeLabel,
    doctorName: record.doctorName,
    specialty: record.specialty,
    hospital: template.hospital || fallback.hospital,
    visit: template.visit || fallback.visit,
    patient: labPatientMock,
    findings: template.findings || (lab ? mapLabFindings(lab.parameters) : fallback.findings),
    interpretation: template.interpretation || lab?.interpretation || fallback.interpretation,
    recommendations: template.recommendations || fallback.recommendations,
    verifiedBy: template.verifiedBy || `${record.doctorName} · ${record.specialty}`,
  }
}
