import { doctorPatientsMock } from '../mocks/doctorPatients'
import { generateDoctorPatientProfile } from './doctorPatientProfileGenerator'
import { generateDoctorLabReport } from './doctorLabReportsGenerator'
import {
  clinicToolStatCopy,
  doctorClinicToolPagesMock,
  doctorLabTasksMock,
  doctorNoteTasksMock,
  doctorPrescribeTasksMock,
} from '../mocks/doctorClinicTools'

const taskLists = {
  prescribe: doctorPrescribeTasksMock,
  labs: doctorLabTasksMock,
  notes: doctorNoteTasksMock,
}

function withPatient(task, page, tool) {
  const patient = doctorPatientsMock.find((item) => item.id === task.patientId)
  const profile = generateDoctorPatientProfile(patient)
  const medicineDetails = (page.detailKeys || [])
    .map((key) => ({
      label: page.fieldLabels[key],
      value: task[key],
    }))
    .filter((item) => item.label && item.value)

  const details = [
    ...medicineDetails,
    { label: 'Phone', value: patient?.phone },
    { label: 'City', value: patient?.city },
  ].filter((item) => item.label && item.value)

  return {
    ...task,
    patientName: patient?.name || 'Patient',
    avatar: patient?.avatar || '',
    ageLabel: patient?.ageLabel || '',
    gender: patient?.gender || '',
    phone: patient?.phone || '',
    city: patient?.city || '',
    bloodGroup: profile?.bloodGroup || '',
    allergies: profile?.allergies || '',
    primaryConcern: profile?.primaryConcern || '',
    email: profile?.email || '',
    details,
    medicineDetails,
    planItems: task.planItems?.length ? task.planItems : page.defaultPlan || [],
    labReport: tool === 'labs' ? generateDoctorLabReport(task, patient) : null,
  }
}

export function generateDoctorClinicTool(tool) {
  const page = doctorClinicToolPagesMock[tool]
  const tasks = taskLists[tool]
  if (!page || !tasks) return null

  const items = tasks.map((task) => withPatient(task, page, tool))
  const badgeCounts = items.reduce((counts, task) => {
    counts[task.badge] = (counts[task.badge] || 0) + 1
    return counts
  }, {})

  const stats = [
    { id: 'all', label: 'Pending', count: items.length },
    ...Object.entries(badgeCounts).map(([label, count]) => ({
      id: label,
      label,
      count,
    })),
  ].map((item) => {
    const copy = clinicToolStatCopy[item.id] || clinicToolStatCopy.all
    return {
      id: item.id,
      label: item.label,
      value: String(item.count),
      hint: copy.hint,
      footer: `${item.count} ${copy.footer}`,
    }
  })

  return {
    tool,
    title: page.title,
    subtitle: page.subtitle,
    listTitle: page.listTitle,
    actionLabel: page.actionLabel,
    instructionsLabel: page.instructionsLabel,
    planLabel: page.planLabel,
    viewReportLabel: page.viewReportLabel,
    backToOrderLabel: page.backToOrderLabel,
    empty: page.empty,
    stats,
    tasks: items,
  }
}
