import { appointmentSettingsMock, reminderTimingOptions } from '../mocks/appointmentSettings'

const fallback = {
  defaults: {
    visitReminders: true,
    emailUpdates: false,
    whatsappAlerts: false,
    shareRecords: true,
  },
  reminderTiming: '1 day before',
  extras: [],
}

export function generateAppointmentSettings(appointment, doctor) {
  const config = appointmentSettingsMock[appointment?.id] || fallback
  const defaults = config.defaults

  return {
    subtitle: `Preferences for your ${appointment.dateLabel} visit with ${appointment.doctorName}.`,
    photo: appointment.doctorPhoto,
    doctorName: appointment.doctorName,
    specialty: appointment.specialty,
    clinic: appointment.clinicDetail || appointment.clinic,
    dateLabel: appointment.dateLabel,
    timeLabel: appointment.timeLabel,
    completed: appointment.status === 'Completed',
    reminderTiming: config.reminderTiming,
    reminderOptions: reminderTimingOptions,
    notifications: [
      {
        id: 'visitReminders',
        label: 'Visit reminders',
        hint: 'Push alert before you leave for the clinic',
        defaultOn: defaults.visitReminders,
      },
      {
        id: 'emailUpdates',
        label: 'Email updates',
        hint: 'Schedule changes and visit summaries',
        defaultOn: defaults.emailUpdates,
      },
      {
        id: 'whatsappAlerts',
        label: 'WhatsApp alerts',
        hint: 'Quick reminders on WhatsApp',
        defaultOn: defaults.whatsappAlerts,
      },
      ...(doctor?.videoConsult
        ? [
            {
              id: 'videoUpdates',
              label: 'Video consult updates',
              hint: 'Notify if this visit can switch to video',
              defaultOn: true,
            },
          ]
        : []),
    ],
    extras: config.extras,
    privacy: [
      {
        id: 'shareRecords',
        label: 'Share records with doctor',
        hint: `Allow ${appointment.doctorName} to view attached files`,
        defaultOn: defaults.shareRecords,
      },
    ],
  }
}

export function buildToggleDefaults(settings) {
  const next = {}
  ;[...(settings.notifications || []), ...(settings.extras || []), ...(settings.privacy || [])].forEach(
    (item) => {
      next[item.id] = item.defaultOn
    },
  )
  return next
}

export function generateHomeVisitSignals(appointment, doctor, stored) {
  if (!appointment) return null

  const settings = generateAppointmentSettings(appointment, doctor)
  const toggles = { ...buildToggleDefaults(settings), ...stored?.toggles }
  const reminderTiming = stored?.reminderTiming || settings.reminderTiming

  return {
    reminderOn: Boolean(toggles.visitReminders),
    reminderTiming,
    videoUpdates: Boolean(toggles.videoUpdates),
    shareRecords: Boolean(toggles.shareRecords),
    prepLabels: settings.extras.filter((item) => toggles[item.id]).map((item) => item.label),
  }
}
