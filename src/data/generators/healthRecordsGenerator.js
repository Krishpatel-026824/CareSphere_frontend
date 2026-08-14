import { healthRecordDetailsMock } from '../mocks/healthRecordDetails'
import {
  healthRecordConfirmMock,
  healthRecordsMock,
  healthRecordsSummaryMetaMock,
} from '../mocks/healthRecords'

function parseRecordDate(dateLabel = '') {
  const parsed = Date.parse(dateLabel)
  return Number.isNaN(parsed) ? null : new Date(parsed)
}

export function generateHealthRecordsData() {
  return {
    records: healthRecordsMock.map((record) => ({
      ...record,
      detail: healthRecordDetailsMock[record.id] || null,
    })),
  }
}

export function getHealthRecordDetail(record) {
  if (!record) return { kind: 'basic', data: {} }

  if (record.parameters) {
    return { kind: 'lab', data: record }
  }

  if (record.report?.parameters) {
    return { kind: 'lab', data: record.report }
  }

  const detail = record.detail || healthRecordDetailsMock[record.id]
  if (detail) {
    return { kind: 'record', data: detail }
  }

  if (record.findings) {
    return { kind: 'record', data: record }
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
