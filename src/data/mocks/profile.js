import { userProfileMock } from './home'

export const profileDetailsMock = {
  name: userProfileMock.name,
  role: userProfileMock.role,
  initials: userProfileMock.initials,
  avatar: userProfileMock.avatar,
  email: 'krish.patel@email.com',
  phone: '+91 98765 43210',
  dob: '14 Mar 1996',
  gender: 'Male',
  bloodGroup: 'O+',
  city: 'Ahmedabad',
  memberSince: 'Member since Jan 2024',
}

export const profileStatsMock = [
  { id: 'visits', label: 'Visits', value: '8' },
  { id: 'records', label: 'Records', value: '4' },
  { id: 'reminders', label: 'Reminders', value: '3' },
]

export const profileFieldsMock = [
  { id: 'name', label: 'Full name', type: 'text' },
  { id: 'email', label: 'Email', type: 'email' },
  { id: 'phone', label: 'Phone', type: 'tel' },
  { id: 'city', label: 'City', type: 'text' },
  { id: 'bloodGroup', label: 'Blood group', type: 'text' },
]

export const profileInfoRowsMock = [
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
  { id: 'dob', label: 'Date of birth' },
  { id: 'gender', label: 'Gender' },
  { id: 'bloodGroup', label: 'Blood group' },
  { id: 'city', label: 'City' },
]

export const profileMenuMock = [
  {
    id: 'appointments',
    label: 'Appointments',
    hint: 'Upcoming visits',
    icon: 'calendar',
    pathKey: 'appointments',
    tone: 'bg-violet-50 text-violet-600',
  },
  {
    id: 'records',
    label: 'Health records',
    hint: 'Reports and downloads',
    icon: 'file',
    pathKey: 'healthRecords',
    tone: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 'messages',
    label: 'Messages',
    hint: 'Chat with doctors',
    icon: 'message',
    pathKey: 'messages',
    tone: 'bg-sky-50 text-sky-600',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    hint: 'Alerts and reminders',
    icon: 'bell',
    pathKey: 'notifications',
    tone: 'bg-amber-50 text-amber-600',
  },
]

export const profilePrefsMock = [
  { id: 'reminders', label: 'Appointment reminders', hint: 'Get notified before visits', on: true },
  { id: 'email', label: 'Email updates', hint: 'Reports and booking emails', on: true },
  { id: 'sms', label: 'SMS alerts', hint: 'OTP and visit alerts', on: false },
]
