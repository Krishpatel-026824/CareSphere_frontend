import { doctorLabFacilityMock, doctorLabReportTemplatesMock, doctorLabReportsPageMock } from '../mocks/doctorLabReports'
import { doctorLabTasksMock } from '../mocks/doctorClinicTools'
import { doctorPatientsMock } from '../mocks/doctorPatients'
import { getLabReportTemplate } from '../mocks/labReportTemplates'

function parseAge(ageLabel = '') {
  const match = String(ageLabel).match(/\d+/)
  return match ? Number(match[0]) : ''
}

function formatPatientId(patientId = '') {
  return String(patientId).replace(/^pat-/, 'CS-PAT-').toUpperCase()
}

function countAbnormal(parameters = []) {
  return parameters.filter((row) => row.status === 'High' || row.status === 'Low').length
}

function reportStatusForBadge(badge) {
  if (badge === 'Review' || badge === 'Urgent') return 'Ready for review'
  return 'Verified'
}

function resolveReportTemplate(test, options = {}) {
  if (options.parameters?.length) {
    return {
      testCode: options.testCode || 'LAB-GEN',
      parameters: options.parameters,
      interpretation: options.interpretation || 'Report reviewed and verified.',
    }
  }

  const catalogTemplate = test?.id ? getLabReportTemplate(test.id) : null
  const doctorTemplate = test?.id ? doctorLabReportTemplatesMock[test.id] : null
  const template = catalogTemplate || doctorTemplate

  return {
    testCode: options.testCode || template?.testCode || String(test?.id || 'LAB').toUpperCase(),
    parameters: template?.parameters || [],
    interpretation:
      options.interpretation ||
      template?.interpretation ||
      `${test?.name || 'Lab test'} completed. Review with current clinical findings at the next visit.`,
    preview: template?.preview || test?.thumbnail || test?.image || null,
  }
}

function buildSampleBlock(dateLabel, options = {}) {
  return {
    type: options.specimen || 'Blood',
    collectionMode: options.collectionMode || 'Clinic collection',
    collectionDate: dateLabel,
    collectionTime: options.collectionTime || '08:30 AM',
    reportDate: dateLabel,
    reportTime: options.reportTime || '11:15 AM',
  }
}

export function generateCatalogLabReport(test, patient, options = {}) {
  if (!test || !patient) return null

  const dateLabel = options.dateLabel || '12 Mar 2026'
  const status = options.status || 'Verified'
  const template = resolveReportTemplate(test, options)

  return {
    id: options.id || `CLR-${patient.id}-${test.id}`,
    bookingRef: options.bookingRef || `CS-LAB-${template.testCode}`,
    title: `${test.name} Report`,
    testName: test.name,
    testCode: template.testCode,
    status,
    type: 'Lab',
    dateLabel,
    doctorName: doctorLabFacilityMock.pathologist,
    verifiedBy: doctorLabFacilityMock.pathologist,
    patient: {
      name: patient.name,
      age: parseAge(patient.ageLabel),
      gender: patient.gender,
      patientId: formatPatientId(patient.id),
      phone: patient.phone,
    },
    lab: { ...doctorLabFacilityMock },
    sample: buildSampleBlock(dateLabel, options),
    parameters: template.parameters,
    interpretation: template.interpretation,
    payment: {
      method: options.paymentMethod || 'self-pay',
      testFee: test.price || 800,
      totalPaid: test.price || 800,
      paidOn: `${dateLabel} · 08:45 AM`,
    },
    preview: template.preview,
  }
}

export function generateDoctorLabReport(task, patient) {
  if (!task || !patient) return null

  const doctorTemplate = doctorLabReportTemplatesMock[task.id]
  const catalogTemplate = getLabReportTemplate(task.id)
  const template = doctorTemplate || catalogTemplate

  const reportDate = task.visitLabel?.includes('·')
    ? task.visitLabel.split('·')[0].trim()
    : '18 Aug 2026'
  const status = reportStatusForBadge(task.badge)

  const parameters = template?.parameters || []
  if (!parameters.length) return null

  return {
    id: `DLR-${task.id}`,
    bookingRef: `CS-LAB-${template?.testCode || task.id.toUpperCase()}`,
    title: `${task.title} Report`,
    testName: task.title,
    testCode: template?.testCode || task.id.toUpperCase(),
    status,
    type: 'Lab',
    dateLabel: reportDate,
    doctorName: doctorLabFacilityMock.pathologist,
    verifiedBy: doctorLabFacilityMock.pathologist,
    patient: {
      name: patient.name,
      age: parseAge(patient.ageLabel),
      gender: patient.gender,
      patientId: formatPatientId(patient.id),
      phone: patient.phone,
    },
    lab: { ...doctorLabFacilityMock },
    sample: buildSampleBlock(reportDate, { specimen: task.specimen || 'Blood' }),
    parameters,
    interpretation:
      template?.interpretation ||
      `${task.title} completed. Review with current clinical findings at the next visit.`,
    payment: {
      method: 'insurance',
      testFee: task.badge === 'Urgent' ? 2400 : 1800,
      totalPaid: task.badge === 'Urgent' ? 2400 : 1800,
      paidOn: `${reportDate} · 08:45 AM`,
    },
    preview: template?.preview,
  }
}

export function generateDoctorPatientLabReports() {
  const reports = doctorLabTasksMock
    .map((task) => {
      const patient = doctorPatientsMock.find((item) => item.id === task.patientId)
      const report = generateDoctorLabReport(task, patient)
      if (!report) return null

      return {
        id: report.id,
        taskId: task.id,
        patientId: task.patientId,
        patientName: patient?.name || 'Patient',
        avatar: patient?.avatar || '',
        badge: task.badge,
        title: task.title,
        subtitle: task.subtitle,
        dateLabel: report.dateLabel,
        status: report.status,
        abnormalCount: countAbnormal(report.parameters),
        doctorNote: '',
        report,
      }
    })
    .filter(Boolean)

  return {
    ...doctorLabReportsPageMock,
    reports,
  }
}
