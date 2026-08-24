import { healthRecordDetailsMock } from '../mocks/healthRecordDetails'
import {
  healthRecordConfirmMock,
  healthRecordsMock,
  healthRecordsSummaryMetaMock,
} from '../mocks/healthRecords'
import { healthRecordsExtraMock } from '../mocks/healthRecordsExtra'
import { buildHealthRecordReport, getHealthRecordImage } from './healthRecordReportGenerator'
import { buildLabReportFromHealthRecord } from './labReportGenerator'

function parseRecordDate(dateLabel = '') {
  const parsed = Date.parse(dateLabel)
  return Number.isNaN(parsed) ? null : new Date(parsed)
}

export function generateHealthRecordsData() {
  const records = [...healthRecordsMock, ...healthRecordsExtraMock]
    .map((record) => {
      const report = record.type === 'Lab' ? buildLabReportFromHealthRecord(record) : null
      return {
        ...record,
        preview: record.preview || getHealthRecordImage(record),
        detail: healthRecordDetailsMock[record.id] || null,
        report: report || record.report || null,
      }
    })
    .sort((a, b) => {
      const left = parseRecordDate(a.dateLabel)?.getTime() || 0
      const right = parseRecordDate(b.dateLabel)?.getTime() || 0
      return right - left
    })

  return { records }
}

export function filterHealthRecords(records = [], query = '') {
  const needle = query.trim().toLowerCase()
  if (!needle) return records

  return records.filter((record) =>
    [record.title, record.doctorName, record.specialty, record.type, record.dateLabel]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(needle),
  )
}

export function isLabHealthRecord(record = {}) {
  return record.type === 'Lab' || record.icon === 'lab' || Boolean(record.report?.parameters?.length)
}

export function filterHealthRecordsByKind(records = [], kind = 'all') {
  if (kind === 'lab') return records.filter(isLabHealthRecord)
  if (kind === 'other') return records.filter((record) => !isLabHealthRecord(record))
  return records
}

export function getHealthRecordDetail(record) {
  if (!record) return { kind: 'basic', data: {} }

  if (record.parameters) {
    return { kind: 'lab', data: record }
  }

  if (record.report?.parameters) {
    return { kind: 'lab', data: record.report }
  }

  if (record.type === 'Lab') {
    const labReport = buildLabReportFromHealthRecord(record)
    if (labReport) return { kind: 'lab', data: labReport }
  }

  const data = buildHealthRecordReport(record)
  if (data?.findings) {
    return { kind: 'record', data }
  }

  return { kind: 'basic', data: record }
}

function formatTrend(current, previous) {
  if (current === previous) {
    return { label: '− No change', up: false }
  }
  if (previous <= 0) {
    return { label: '↑ 100% vs last 30 days', up: true }
  }

  const delta = ((current - previous) / previous) * 100
  const abs = Math.abs(delta)
  const value = abs % 1 === 0 ? String(abs) : abs.toFixed(1)

  if (delta > 0) return { label: `↑ ${value}% vs last 30 days`, up: true }
  return { label: `↓ ${value}% vs last 30 days`, up: false }
}

export function generateHealthRecordsSummary(records = []) {
  const now = new Date()
  const thisMonth = records.filter((record) => {
    const date = parseRecordDate(record.dateLabel)
    if (!date) return false
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length

  const values = {
    total: records.length,
    month: thisMonth,
    ready: records.length,
  }

  return healthRecordsSummaryMetaMock.map((item) => {
    const current = values[item.id] ?? 0
    return {
      ...item,
      value: String(current),
      trend: formatTrend(current, item.previous ?? 0),
    }
  })
}

export function getHealthRecordConfirm(type, record) {
  const copy = healthRecordConfirmMock[type] || healthRecordConfirmMock.remove
  return {
    ...copy,
    body: copy.body.replace('{title}', record?.title || 'This record'),
  }
}
