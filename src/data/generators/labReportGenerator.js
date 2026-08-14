import {
  labFacilityMock,
  labPatientMock,
  labReportTemplatesMock,
} from '../mocks/labReportTemplates'

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
    const template = labReportTemplatesMock[test.id]
    const reportId = `${bookingRef}-${index + 1}`

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
      patient: { ...labPatientMock },
      lab: { ...labFacilityMock },
      sample: {
        type: 'Blood',
        collectionMode: 'Home collection',
        collectionDate,
        collectionTime,
        reportDate,
        reportTime,
      },
      parameters: template?.parameters || [],
      interpretation: template?.interpretation || 'Report reviewed and verified.',
      payment: {
        method: paymentMethod,
        testFee: test.price,
        totalPaid: bill.total,
        paidOn: `${reportDate} · ${collectionTime}`,
      },
      preview: test.reportImage || test.thumbnail,
    }
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
    preview: report.preview,
    background: report.preview,
    report,
  }
}
