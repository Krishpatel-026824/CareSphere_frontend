import { doctorLabFacilityMock, doctorLabReportTemplatesMock, doctorLabReportsPageMock } from '../mocks/doctorLabReports'
import { doctorLabTasksMock } from '../mocks/doctorClinicTools'
import { doctorPatientsMock } from '../mocks/doctorPatients'

function parseAge(ageLabel = '') {
  const match = String(ageLabel).match(/\d+/)
  return match ? Number(match[0]) : ''
}

function countAbnormal(parameters = []) {
  return parameters.filter((row) => row.status === 'High' || row.status === 'Low').length
}

function reportStatusForBadge(badge) {
  if (badge === 'Review' || badge === 'Urgent') return 'Ready for review'
  return 'Verified'
}

export function generateDoctorLabReport(task, patient) {
  const template = doctorLabReportTemplatesMock[task.id]
  if (!template || !task || !patient) return null

  const reportDate = task.visitLabel?.includes('·')
    ? task.visitLabel.split('·')[0].trim()
    : '18 Aug 2026'
  const status = reportStatusForBadge(task.badge)

  return {
    id: `DLR-${task.id}`,
    bookingRef: `CS-LAB-${task.id.toUpperCase()}`,
    title: `${task.title} Report`,
    testName: task.title,
    testCode: template.testCode,
    status,
    type: 'Lab',
    dateLabel: reportDate,
    doctorName: doctorLabFacilityMock.pathologist,
    patient: {
      name: patient.name,
      age: parseAge(patient.ageLabel),
      gender: patient.gender,
      patientId: patient.id.replace('pat-', 'CS-PAT-').toUpperCase(),
      phone: patient.phone,
    },
    lab: { ...doctorLabFacilityMock },
    sample: {
      type: task.specimen || 'Blood',
      collectionMode: 'Clinic collection',
      collectionDate: reportDate,
      collectionTime: '08:30 AM',
      reportDate,
      reportTime: '11:15 AM',
    },
    parameters: template.parameters,
    interpretation: template.interpretation,
    payment: {
      method: 'insurance',
      testFee: task.badge === 'Urgent' ? 2400 : 1800,
      totalPaid: task.badge === 'Urgent' ? 2400 : 1800,
      paidOn: `${reportDate} · 08:45 AM`,
    },
    preview: template.preview,
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
