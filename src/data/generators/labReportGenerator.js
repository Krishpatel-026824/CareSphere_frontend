import {
  getLabReportTemplate,
  labFacilityMock,
  labPatientMock,
} from '../mocks/labReportTemplates'
import { healthRecordReportsMock } from '../mocks/healthRecordReports'
import { labTestsMock } from '../mocks/labTests'
import { labTitleToTestId } from '../mocks/labTitleMap'

function formatReportDate(date = new Date()) {
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatReportTime(date = new Date()) {
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

function buildBookingRef() {
  return `CS-LAB-${Date.now().toString().slice(-8)}`
}

export function buildLabReportId(booking = {}) {
  const testId = booking?.test?.id || 'test'
  const date = booking?.date || 'na'
  const slot = String(booking?.timeSlot || 'na').replace(/\s+/g, '-')
  return `lab-${testId}-${date}-${slot}`
}

function buildLabReport({
  test,
  reportId,
  bookingRef,
  collectionDate,
  collectionTime,
  reportDate,
  reportTime,
  collectionMode,
  patientName,
  paymentMethod = 'upi',
  testFee,
  totalPaid,
}) {
  const template = getLabReportTemplate(test.id)

  return {
    id: reportId,
    bookingRef,
    testId: test.id,
    title: `${test.name} Report`,
    testName: test.name,
    testCode: template?.testCode || 'LAB-GEN',
    description: test.description,
    turnaround: test.turnaround,
    status: 'Ready',
    type: 'Lab',
    dateLabel: reportDate,
    doctorName: labFacilityMock.pathologist,
    verifiedBy: labFacilityMock.pathologist,
    patient: {
      ...labPatientMock,
      name: patientName || labPatientMock.name,
    },
    lab: { ...labFacilityMock },
    sample: {
      type: 'Blood',
      collectionMode,
      collectionDate,
      collectionTime,
      reportDate,
      reportTime,
    },
    parameters: template?.parameters || [],
    interpretation: template?.interpretation || 'Report reviewed and verified.',
    payment: {
      method: paymentMethod,
      testFee: testFee ?? test.price,
      totalPaid: totalPaid ?? test.price,
      paidOn: `${reportDate} · ${collectionTime}`,
    },
  }
}

function resolveTestId(record = {}, meta = {}) {
  if (record.report?.testId) return record.report.testId
  if (meta.labTemplate) return meta.labTemplate
  if (record.testId) return record.testId
  return labTitleToTestId[record.title] || null
}

export function buildLabReportFromHealthRecord(record) {
  if (!record) return null
  if (record.report?.parameters?.length) return record.report

  const meta = healthRecordReportsMock[record.id] || {}
  const testId = resolveTestId(record, meta)
  if (!testId) return null

  const test = labTestsMock.find((item) => item.id === testId)
  const template = getLabReportTemplate(testId)
  if (!test || !template) return null

  const reportId = meta.reportId || record.id
  const bookingRef = meta.reportId || `CS-${testId.toUpperCase()}`

  return {
    id: reportId,
    bookingRef,
    testId,
    title: record.title.includes('Report') ? record.title : `${record.title} Report`,
    testName: test.name,
    testCode: template.testCode,
    description: test.description,
    turnaround: test.turnaround,
    status: meta.status || 'Ready',
    type: 'Lab',
    dateLabel: record.dateLabel,
    doctorName: labFacilityMock.pathologist,
    verifiedBy: labFacilityMock.pathologist,
    patient: {
      ...labPatientMock,
    },
    lab: {
      ...labFacilityMock,
      name: meta.hospital || labFacilityMock.name,
    },
    sample: {
      type: testId === 'lab-11' || testId === 'lab-21' ? 'Urine/Stool' : testId === 'lab-22' ? 'ECG' : 'Blood',
      collectionMode: meta.visit?.mode || 'Lab draw',
      collectionDate: record.dateLabel,
      collectionTime: record.timeLabel || '09:00 AM',
      reportDate: record.dateLabel,
      reportTime: record.timeLabel || '11:30 AM',
    },
    parameters: template.parameters,
    interpretation: template.interpretation,
    recommendations: meta.recommendations || [],
    payment: {
      method: 'UPI',
      testFee: test.price,
      totalPaid: test.price,
      paidOn: `${record.dateLabel} · ${record.timeLabel || 'Paid'}`,
    },
  }
}

export function generateLabReportFromBooking(booking = {}) {
  const test = booking?.test
  if (!test?.id) return null

  const bookingDate = booking.date ? new Date(`${booking.date}T12:00:00`) : new Date()
  const reportId = buildLabReportId(booking)
  const bookingRef = buildBookingRef()
  const collectionDate = formatReportDate(bookingDate)
  const collectionTime = booking.timeSlot || formatReportTime(bookingDate)
  const reportDate = collectionDate
  const reportTime = formatReportTime(new Date(bookingDate.getTime() + 2 * 60 * 60 * 1000))

  return buildLabReport({
    test,
    reportId,
    bookingRef,
    collectionDate,
    collectionTime,
    reportDate,
    reportTime,
    collectionMode: booking.collectionType || 'Home Collection',
    patientName: booking.name,
    testFee: test.price,
    totalPaid: test.price,
  })
}

export function generateLabReportsFromBookings(bookings = []) {
  return bookings.map(generateLabReportFromBooking).filter(Boolean)
}

export function generateLabReports({ tests = [], cart = {}, bill = {}, paymentMethod = 'upi' }) {
  const bookedTests = tests.filter((test) => cart[test.id])
  if (bookedTests.length === 0) return []

  const now = new Date()
  const bookingRef = buildBookingRef()
  const collectionDate = formatReportDate(now)
  const collectionTime = formatReportTime(now)
  const reportDate = formatReportDate(now)
  const reportTime = formatReportTime(new Date(now.getTime() + 2 * 60 * 60 * 1000))

  return bookedTests.map((test, index) => {
    const reportId = `${bookingRef}-${index + 1}`

    return buildLabReport({
      test,
      reportId,
      bookingRef,
      collectionDate,
      collectionTime,
      reportDate,
      reportTime,
      collectionMode: 'Home collection',
      paymentMethod,
      testFee: test.price,
      totalPaid: bill.total,
    })
  })
}

export function labReportToHealthRecord(report) {
  return {
    id: report.id,
    title: report.title,
    doctorName: report.doctorName,
    specialty: report.type || 'Lab',
    dateLabel: report.dateLabel,
    timeLabel: report.sample?.reportTime || '',
    type: report.type,
    icon: 'lab',
    report,
  }
}
