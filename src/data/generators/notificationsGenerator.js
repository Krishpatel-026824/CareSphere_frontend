import { notificationsMock } from '../mocks/notifications'

export function generateNotificationsData() {
  return notificationsMock.map((item) => ({ ...item }))
}
