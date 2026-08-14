import { notificationsMock } from '../mocks/notifications'
import { doctorNotificationsMock } from '../mocks/doctorNotifications'

export function generateNotificationsData() {
  return notificationsMock.map((item) => ({ ...item }))
}

export function generateDoctorNotificationsData() {
  return doctorNotificationsMock.map((item) => ({ ...item }))
}
