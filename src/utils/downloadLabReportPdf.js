import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const TEAL = [14, 165, 160]
const NAVY = [15, 23, 42]
const GRAY = [100, 116, 139]
const LIGHT_BG = [248, 250, 252]

function fileName(title) {
  const slug = `${title || 'caresphere-lab-report'}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `${slug}.pdf`
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

export function normalizeLabReport(record = {}) {
  const parameters = (record.parameters || record.findings || []).map((row) => ({
    name: row.name || row.label || '—',
    value: row.value ?? '—',
    unit: row.unit || '—',
    reference: row.reference || '—',
    status: row.status || '—',
  }))

  const patient = record.patient || {}
  const lab = record.lab || {}
  const sample = record.sample || {}

  return {
    testName: record.testName || record.title || 'Lab report',
    reportId: record.reportId || record.bookingRef || record.testCode || 'CS-RPT',
    status: record.status || 'Verified',
    testCode: record.testCode || '',
    patient: {
      name: patient.name || '—',
      age: patient.age ?? '—',
      gender: patient.gender || '—',
      patientId: patient.patientId || '—',
      phone: patient.phone || '—',
    },
    lab: {
      name: lab.name || record.hospital || 'CareSphere Diagnostics',
      accreditation: lab.accreditation || 'NABL Accredited · ISO 15189',
    },
    sample: {
      collectionDate: sample.collectionDate || record.dateLabel || '—',
      collectionTime: sample.collectionTime || record.timeLabel || '—',
      reportDate: sample.reportDate || record.dateLabel || '—',
      reportTime: sample.reportTime || record.timeLabel || '—',
    },
    parameters,
    interpretation: record.interpretation || 'Report reviewed and verified.',
    recommendations: record.recommendations || [],
    verifiedBy: record.verifiedBy || record.doctorName || 'CareSphere Diagnostics',
  }
}

function drawSectionTitle(doc, title, y) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...NAVY)
  doc.text(title, 14, y)
  return y + 6
}

function drawKeyValueBlock(doc, rows, startX, startY, width) {
  let y = startY
  const labelWidth = 34

  rows.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...GRAY)
    doc.text(label.toUpperCase(), startX, y)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...NAVY)
    const lines = doc.splitTextToSize(String(value), width - labelWidth - 2)
    doc.text(lines, startX + labelWidth, y)
    y += Math.max(12, lines.length * 5)
  })

  return y
}

export function generateLabReportPdf(record) {
  const data = normalizeLabReport(record)
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  let y = 14

  doc.setFillColor(...TEAL)
  doc.rect(0, 0, pageWidth, 8, 'F')

  y = 18
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...TEAL)
  doc.text(data.lab.name, 14, y)

  y += 7
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(...NAVY)
  doc.text(data.testName, 14, y)

  y += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...GRAY)
  doc.text(
    `${data.sample.reportDate}${data.sample.reportTime ? ` · ${data.sample.reportTime}` : ''} · ${data.status}`,
    14,
    y,
  )

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...GRAY)
  doc.text('REPORT NO.', pageWidth - 14, 24, { align: 'right' })
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...NAVY)
  doc.text(data.reportId, pageWidth - 14, 29, { align: 'right' })
  if (data.testCode) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...GRAY)
    doc.text(`Code · ${data.testCode}`, pageWidth - 14, 34, { align: 'right' })
  }

  y += 8
  doc.setDrawColor(230, 235, 241)
  doc.line(14, y, pageWidth - 14, y)
  y += 8

  const columnGap = 6
  const cardWidth = (pageWidth - 28 - columnGap) / 2
  const cardStartY = y
  const cardPadding = 4
  const leftRows = [
    ['Name', data.patient.name],
    ['Age / Gender', `${data.patient.age} yrs · ${data.patient.gender}`],
    ['Patient ID', data.patient.patientId],
    ['Phone', data.patient.phone],
  ]
  const rightRows = [
    ['Lab', data.lab.name],
    ['Accreditation', data.lab.accreditation],
    ['Collection', `${data.sample.collectionDate} · ${data.sample.collectionTime}`],
    ['Report date', `${data.sample.reportDate} · ${data.sample.reportTime}`],
  ]

  const cardHeight = Math.max(leftRows.length, rightRows.length) * 12 + 14

  doc.setFillColor(...LIGHT_BG)
  doc.setDrawColor(230, 235, 241)
  doc.roundedRect(14, cardStartY, cardWidth, cardHeight, 2, 2, 'FD')
  doc.roundedRect(14 + cardWidth + columnGap, cardStartY, cardWidth, cardHeight, 2, 2, 'FD')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(...NAVY)
  doc.text('Patient details', 14 + cardPadding, cardStartY + 6)
  doc.text('Lab & sample', 14 + cardWidth + columnGap + cardPadding, cardStartY + 6)

  drawKeyValueBlock(doc, leftRows, 14 + cardPadding, cardStartY + 10, cardWidth - cardPadding * 2)
  drawKeyValueBlock(
    doc,
    rightRows,
    14 + cardWidth + columnGap + cardPadding,
    cardStartY + 10,
    cardWidth - cardPadding * 2,
  )

  y = cardStartY + cardHeight + 10
  y = drawSectionTitle(doc, 'Test results', y)

  autoTable(doc, {
    startY: y,
    head: [['Parameter', 'Result', 'Unit', 'Reference', 'Status']],
    body: data.parameters.map((row) => [
      row.name,
      row.value,
      row.unit,
      row.reference,
      row.status,
    ]),
    margin: { left: 14, right: 14 },
    styles: {
      fontSize: 9,
      cellPadding: 3,
      textColor: NAVY,
      lineColor: [230, 235, 241],
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: [224, 242, 254],
      textColor: NAVY,
      fontStyle: 'bold',
      fontSize: 8,
    },
    alternateRowStyles: { fillColor: [255, 255, 255] },
    columnStyles: {
      1: { fontStyle: 'bold' },
      4: { halign: 'center' },
    },
  })

  y = (doc.lastAutoTable?.finalY || y) + 10
  y = drawSectionTitle(doc, 'Clinical interpretation', y)

  doc.setFillColor(...LIGHT_BG)
  doc.setDrawColor(230, 235, 241)
  const interpretationLines = doc.splitTextToSize(data.interpretation, pageWidth - 32)
  const interpretationHeight = interpretationLines.length * 5 + 10
  doc.roundedRect(14, y, pageWidth - 28, interpretationHeight, 2, 2, 'FD')

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...GRAY)
  doc.text(interpretationLines, 18, y + 7)

  y += interpretationHeight + 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...GRAY)
  doc.text(`Verified by: ${data.verifiedBy}`, 14, y)

  if (data.recommendations.length) {
    y += 8
    y = drawSectionTitle(doc, 'Recommendations', y)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(...GRAY)
    data.recommendations.forEach((item) => {
      const lines = doc.splitTextToSize(`• ${item}`, pageWidth - 32)
      doc.text(lines, 14, y)
      y += lines.length * 5 + 2
    })
  }

  const footerY = doc.internal.pageSize.getHeight() - 10
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...GRAY)
  doc.text('CareSphere Diagnostics · Confidential medical report', pageWidth / 2, footerY, {
    align: 'center',
  })

  return doc
}

export function downloadLabReportPdf(record) {
  if (!record) return
  const data = normalizeLabReport(record)
  const doc = generateLabReportPdf(record)
  const blob = doc.output('blob')
  saveBlob(blob, fileName(data.testName))
}
