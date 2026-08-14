import { medicineRemindersMock } from '../mocks/medicineReminders'

function timeLabelToMinutes(label = '') {
  const match = label.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return 0

  let hours = Number(match[1])
  const minutes = Number(match[2])
  const period = match[3].toUpperCase()

  if (period === 'AM' && hours === 12) hours = 0
  if (period === 'PM' && hours !== 12) hours += 12

  return hours * 60 + minutes
}

export function getUpcomingMedicineIndex(medicines = [], now = new Date()) {
  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  const nextIndex = medicines.findIndex((item) => timeLabelToMinutes(item.timeLabel) >= nowMinutes)
  return nextIndex === -1 ? 0 : nextIndex
}

export function generateMedicineRemindersData() {
  return {
    medicines: medicineRemindersMock.map((item) => ({
      ...item,
      remaining: `${item.remainingCount} left`,
    })),
    startIndex: getUpcomingMedicineIndex(medicineRemindersMock),
  }
}

export function countPendingReminders(medicines = [], takenById = {}) {
  return medicines.filter((item) => !takenById[item.id] && (item.remainingCount ?? 0) > 0).length
}
