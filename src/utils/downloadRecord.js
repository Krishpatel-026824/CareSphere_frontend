import { downloadLabReportPdf } from './downloadLabReportPdf'
import {
  downloadImageDocumentPdf,
  downloadTextDocumentPdf,
  toPdfFileName,
} from './downloadSimplePdf'

function recordTextLines(record) {
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
  ].filter((line) => line !== '')
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
  await downloadImageDocumentPdf({
    title: title || 'CareSphere Image Report',
    imageUrl: url,
    fileName: toPdfFileName(title || 'image-report'),
  })
}

export function downloadHealthReport(record) {
  if (!record) return

  if (isLabReportPayload(record)) {
    downloadLabReportPdf(record)
    return
  }

  downloadTextDocumentPdf({
    title: record.title || 'CareSphere health report',
    lines: [
      `Report ID: ${record.reportId || '—'}`,
      `Date: ${record.dateLabel || record.date || '—'} ${record.timeLabel || ''}`.trim(),
      `Doctor: ${record.doctorName || '—'}`,
      `Facility: ${record.hospital || '—'}`,
      '',
      'Interpretation',
      record.interpretation || '—',
      '',
      `Verified by: ${record.verifiedBy || '—'}`,
    ],
    fileName: toPdfFileName(record.title || 'health-report'),
    footer: 'CareSphere · Confidential health report',
  })
}

export function downloadRecordFile(record) {
  downloadTextDocumentPdf({
    title: record.title || 'CareSphere record',
    lines: recordTextLines(record),
    fileName: toPdfFileName(record.title || 'caresphere-record'),
    footer: 'CareSphere · Confidential health record',
  })
}

export function downloadRecordFiles(records, doctorName) {
  if (!records?.length) return

  if (records.length === 1) {
    downloadRecordFile(records[0])
    return
  }

  downloadTextDocumentPdf({
    title: `${doctorName || 'CareSphere'} records`,
    lines: records.flatMap((record, index) => {
      if (index > 0) return ['', '-----', '', ...recordTextLines(record)]
      return recordTextLines(record)
    }),
    fileName: toPdfFileName(`${doctorName || 'caresphere'}-records`),
    footer: 'CareSphere · Confidential health records',
  })
}

export { downloadLabReportPdf } from './downloadLabReportPdf'
