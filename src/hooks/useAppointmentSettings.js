import { useMemo } from 'react'
import { useAppStore } from '../store/useAppStore'
import {
  buildToggleDefaults,
  generateAppointmentSettings,
} from '../data/generators/appointmentSettingsGenerator'

export function useAppointmentSettings(appointment, doctor) {
  const { appointmentPrefs, updateAppointmentPrefs } = useAppStore()
  const settings = useMemo(
    () => generateAppointmentSettings(appointment, doctor),
    [appointment, doctor],
  )

  const stored = appointmentPrefs[appointment?.id]
  const toggles = { ...buildToggleDefaults(settings), ...stored?.toggles }
  const reminderTiming = stored?.reminderTiming || settings.reminderTiming

  function persist(nextToggles, nextTiming) {
    if (!appointment?.id) return
    updateAppointmentPrefs(appointment.id, {
      toggles: nextToggles,
      reminderTiming: nextTiming,
    })
  }

  function toggle(id) {
    if (settings.completed) return
    persist({ ...toggles, [id]: !toggles[id] }, reminderTiming)
  }

  function setReminderTiming(option) {
    if (settings.completed) return
    persist(toggles, option)
  }

  return { settings, toggles, toggle, reminderTiming, setReminderTiming }
}
