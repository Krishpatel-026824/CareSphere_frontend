import { doctorLabFacilityMock, doctorLabReportTemplatesMock } from '../mocks/doctorLabReports'

function parseAge(ageLabel = '') {
  const match = String(ageLabel).match(/\d+/)
  return match ? Number(match[0]) : ''
}

export function generateDoctorLabReport(task, patient) {
  const template = doctorLabReportTemplatesMock[task.id]
  if (!template || !task || !patient) return null

  const reportDate = task.visitLabel?.includes('·')
    ? task.visitLabel.split('·')[0].trim()
    : '18 Aug 2026'

  return {
    id: `DLR-${task.id}`,
    bookingRef: `CS-LAB-${task.id.toUpperCase()}`,
    title: `${task.title} Report`,
    testName: task.title,
    testCode: template.testCode,
    status: task.badge === 'Review' ? 'Ready for review' : 'Verified',
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
