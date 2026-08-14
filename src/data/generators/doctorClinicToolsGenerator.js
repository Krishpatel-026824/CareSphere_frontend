import {
  doctorClinicToolPagesMock,
  doctorLabTasksMock,
  doctorNoteTasksMock,
  doctorPrescribeTasksMock,
} from '../mocks/doctorClinicTools'
import { doctorPatientsMock } from '../mocks/doctorPatients'

const taskLists = {
  prescribe: doctorPrescribeTasksMock,
  labs: doctorLabTasksMock,
  notes: doctorNoteTasksMock,
}

function withPatient(task) {
  const patient = doctorPatientsMock.find((item) => item.id === task.patientId)
  return {
    ...task,
    patientName: patient?.name || 'Patient',
    avatar: patient?.avatar || '',
  }
}

export function generateDoctorClinicTool(tool) {
  const page = doctorClinicToolPagesMock[tool]
  const tasks = taskLists[tool]
  if (!page || !tasks) return null

  return {
    tool,
    title: page.title,
    subtitle: page.subtitle,
    tasks: tasks.map(withPatient),
  }
}
