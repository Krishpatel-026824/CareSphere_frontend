import { appointmentsMock } from '../mocks/appointments'
import { doctorsMock } from '../mocks/doctors'
import { healthOverviewCardsMock, quickActionsMock, userProfileMock } from '../mocks/home'
import { notificationsMock } from '../mocks/notifications'

export function generateHomeData() {
  return {
    greetingName: 'Krish',
    userProfile: userProfileMock,
    healthOverview: healthOverviewCardsMock,
    upcomingAppointment: appointmentsMock[0],
    medicineReminder: {
      id: 'med-1',
      medicineName: 'Metformin 500mg',
      dosage: '1 tablet',
      timing: 'After dinner',
      timeLabel: '08:00 PM',
      remaining: '12 left',
      remainingCount: 12,
      remainingTotal: 30,
      schedule: 'Daily • After dinner',
    },
    quickActions: quickActionsMock,
    healthTip: 'Drink at least 8 glasses of water daily to stay healthy and hydrated.',
    healthTipSubtitle: 'Care with clarity — small habits build better health.',
    recommendedDoctors: doctorsMock,
    notifications: notificationsMock,
  }
}
