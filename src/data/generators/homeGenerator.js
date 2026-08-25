import { getUpcomingAppointment } from '../../utils/appointmentFormat'
import { appointmentsMock } from '../mocks/appointments'
import { doctorsMock } from '../mocks/doctors'
import { quickActionsMock, userProfileMock } from '../mocks/home'
import { notificationsMock } from '../mocks/notifications'
import { generateHealthTipsData } from './healthTipsGenerator'
import { generateMedicineRemindersData } from './medicineRemindersGenerator'

export function generateHomeData() {
  const healthTips = generateHealthTipsData()
  const medicineReminders = generateMedicineRemindersData()

  return {
    greetingName: 'Krish',
    userProfile: userProfileMock,
    upcomingAppointment: getUpcomingAppointment(appointmentsMock),
    medicineReminders: medicineReminders.medicines,
    medicineReminderStartIndex: medicineReminders.startIndex,
    quickActions: quickActionsMock,
    healthTips: healthTips.tips,
    healthTipLoopMs: healthTips.loopMs,
    recommendedDoctors: doctorsMock,
    notifications: notificationsMock,
  }
}
