import { appointmentNotesMock } from '../mocks/appointmentNotes'

const fallback = {
  placeholder: 'Write private notes for this visit…',
  prompts: [],
  draft: '',
}

export function generateAppointmentNotes(appointment) {
  const config = appointmentNotesMock[appointment?.id] || fallback

  return {
    title: 'Notes',
    subtitle: `Private notes for your visit with ${appointment.doctorName}.`,
    photo: appointment.doctorPhoto,
    doctorName: appointment.doctorName,
    specialty: appointment.specialty,
    clinic: appointment.clinicDetail || appointment.clinic,
    dateLabel: appointment.dateLabel,
    timeLabel: appointment.timeLabel,
    completed: appointment.status === 'Completed',
    placeholder: config.placeholder,
    prompts: config.prompts,
    draft: config.draft,
  }
}

export function getAppointmentNoteDraft(appointmentId) {
  return appointmentNotesMock[appointmentId]?.draft || ''
}
