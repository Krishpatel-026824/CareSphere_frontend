import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const TEAL = [14, 165, 160]
const NAVY = [15, 23, 42]
const GRAY = [100, 116, 139]
const LIGHT_BG = [248, 250, 252]

export function toPdfFileName(title, fallback = 'caresphere-document') {
  const slug = `${title || fallback}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `${slug}.pdf`
}

function savePdfBlob(blob, name) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = name.endsWith('.pdf') ? name : toPdfFileName(name)
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function drawPdfHeader(doc, title, subtitle) {
  const pageWidth = doc.internal.pageSize.getWidth()
  doc.setFillColor(...TEAL)
  doc.rect(0, 0, pageWidth, 8, 'F')

  let y = 18
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(...NAVY)
  doc.text(title || 'CareSphere Document', 14, y)

  if (subtitle) {
    y += 7
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(...GRAY)
    doc.text(subtitle, 14, y)
  }

  return y + 10
}

function drawPdfFooter(doc, text = 'CareSphere · Confidential medical document') {
  const pageWidth = doc.internal.pageSize.getWidth()
  const footerY = doc.internal.pageSize.getHeight() - 10
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...GRAY)
  doc.text(text, pageWidth / 2, footerY, { align: 'center' })
}

export function downloadTextDocumentPdf({
  title,
  lines = [],
  fileName,
  footer = 'CareSphere · Confidential medical document',
}) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  let y = drawPdfHeader(doc, title)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...NAVY)

  lines.forEach((line) => {
    if (!line) {
      y += 4
      return
    }
    const wrapped = doc.splitTextToSize(String(line), pageWidth - 28)
    if (y + wrapped.length * 5 > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage()
      y = 20
    }
    doc.text(wrapped, 14, y)
    y += wrapped.length * 5 + 2
  })

  drawPdfFooter(doc, footer)
  savePdfBlob(doc.output('blob'), fileName || toPdfFileName(title))
}

export function downloadKeyValueReportPdf({
  title,
  entries = [],
  interpretation,
  fileName,
  subtitle,
}) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  let y = drawPdfHeader(doc, title, subtitle)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...NAVY)
  doc.text('Report details', 14, y)
  y += 4

  autoTable(doc, {
    startY: y,
    head: [['Field', 'Value']],
    body: entries.map((entry) => [entry.key, entry.value]),
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
    columnStyles: {
      0: { cellWidth: 58 },
      1: { fontStyle: 'bold' },
    },
  })

  y = (doc.lastAutoTable?.finalY || y) + 8

  if (interpretation) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(...NAVY)
    doc.text('Interpretation', 14, y)
    y += 6

    doc.setFillColor(...LIGHT_BG)
    doc.setDrawColor(230, 235, 241)
    const lines = doc.splitTextToSize(interpretation, pageWidth - 32)
    const boxHeight = lines.length * 5 + 10
    doc.roundedRect(14, y, pageWidth - 28, boxHeight, 2, 2, 'FD')

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(...GRAY)
    doc.text(lines, 18, y + 7)
  }

  drawPdfFooter(doc, 'CareSphere Diagnostics · Confidential medical report')
  savePdfBlob(doc.output('blob'), fileName || toPdfFileName(title))
}

export async function downloadImageDocumentPdf({ title, imageUrl, caption, fileName }) {
  if (!imageUrl) return

  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  let y = drawPdfHeader(doc, title || 'CareSphere Image Report')

  try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })

    const maxWidth = pageWidth - 28
    const maxHeight = 160
    doc.addImage(dataUrl, 'JPEG', 14, y, maxWidth, maxHeight, undefined, 'FAST')
    y += maxHeight + 8
  } catch {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(...GRAY)
    doc.text('Image preview unavailable in PDF export.', 14, y)
    y += 10
  }

  if (caption) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(...NAVY)
    const lines = doc.splitTextToSize(caption, pageWidth - 28)
    doc.text(lines, 14, y)
  }

  drawPdfFooter(doc)
  savePdfBlob(doc.output('blob'), fileName || toPdfFileName(title))
}

export function downloadExistingPdfUrl(url, fileName) {
  if (!url) return

  const link = document.createElement('a')
  link.href = url
  link.download = fileName?.endsWith('.pdf') ? fileName : toPdfFileName(fileName)
  link.rel = 'noreferrer'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

function parseReportText(text = '') {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const entries = lines
    .map((line) => {
      const idx = line.indexOf(':')
      if (idx === -1) return null
      const key = line.slice(0, idx).trim()
      const value = line.slice(idx + 1).trim()
      if (!key || !value) return null
      return { key, value }
    })
    .filter(Boolean)

  const title =
    lines[0] && /report/i.test(lines[0]) ? lines[0] : 'Laboratory Report'
  const interpretationEntry = entries.find((entry) => /interpretation/i.test(entry.key))
  const detailEntries = entries.filter((entry) => entry !== interpretationEntry)

  return {
    title,
    entries: detailEntries,
    interpretation: interpretationEntry?.value || '',
  }
}

export function downloadParsedTextReportPdf({ text, fileName, subtitle }) {
  const parsed = parseReportText(text)
  downloadKeyValueReportPdf({
    title: parsed.title,
    entries: parsed.entries,
    interpretation: parsed.interpretation,
    fileName,
    subtitle,
  })
}

export async function downloadUrlAsPdf(url, fileName) {
  if (!url) return

  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const header = await blob.slice(0, 4).text()
    const isPdf = blob.type === 'application/pdf' || header.startsWith('%PDF')

    if (isPdf) {
      savePdfBlob(blob, fileName || toPdfFileName('document'))
      return
    }

    if (blob.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(blob)
      await downloadImageDocumentPdf({
        title: fileName?.replace(/\.[^.]+$/, '') || 'CareSphere Image',
        imageUrl: objectUrl,
        fileName,
      })
      URL.revokeObjectURL(objectUrl)
      return
    }

    const text = await blob.text()
    if (text.trim()) {
      downloadParsedTextReportPdf({ text, fileName })
    }
  } catch {
    downloadExistingPdfUrl(url, fileName)
  }
}
