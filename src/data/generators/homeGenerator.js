import { getUpcomingAppointment } from '../../utils/appointmentFormat'
import { appointmentsMock } from '../mocks/appointments'
import { doctorsMock } from '../mocks/doctors'
import { quickActionsMock, userProfileMock } from '../mocks/home'
import { generateHealthOverviewData } from './healthOverviewGenerator'
import { notificationsMock } from '../mocks/notifications'
import { generateHealthTipsData } from './healthTipsGenerator'
import { generateMedicineRemindersData } from './medicineRemindersGenerator'

export function generateHomeData() {
  const healthTips = generateHealthTipsData()
  const medicineReminders = generateMedicineRemindersData()
  const healthOverview = generateHealthOverviewData()

  return {
    greetingName: 'Krish',
    userProfile: userProfileMock,
    healthOverview: healthOverview.cards,
    healthOverviewVisibleCount: healthOverview.visibleCount,
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
