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
  { id: 'visits', label: 'Visits', hint: 'Total visits', value: '8', icon: 'calendar' },
  { id: 'records', label: 'Records', hint: 'Medical records', value: '4', icon: 'file' },
  { id: 'reminders', label: 'Reminders', hint: 'Upcoming reminders', value: '4', icon: 'bell' },
]

export const profileFieldsMock = [
  { id: 'name', label: 'Full name', type: 'text' },
  { id: 'email', label: 'Email', type: 'email' },
  { id: 'phone', label: 'Phone', type: 'tel' },
  { id: 'city', label: 'City', type: 'text' },
  { id: 'bloodGroup', label: 'Blood group', type: 'text' },
]

export const profileInfoRowsMock = [
  { id: 'email', label: 'Email', icon: 'mail' },
  { id: 'phone', label: 'Phone', icon: 'phone' },
  { id: 'dob', label: 'Date of birth', icon: 'cake' },
  { id: 'gender', label: 'Gender', icon: 'user' },
  { id: 'bloodGroup', label: 'Blood group', icon: 'droplet' },
  { id: 'city', label: 'City', icon: 'map' },
]

export const profileMenuMock = [
  {
    id: 'appointments',
    label: 'Appointments',
    hint: 'Upcoming and past visits',
    icon: 'calendar',
    pathKey: 'appointments',
    tone: 'bg-violet-50 text-violet-600',
  },
  {
    id: 'records',
    label: 'Health records',
    hint: 'Reports and documents',
    icon: 'file',
    pathKey: 'health',
    tone: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 'messages',
    label: 'Messages',
    hint: 'Chat with your care team',
    icon: 'message',
    pathKey: 'messages',
    tone: 'bg-sky-50 text-sky-600',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    hint: 'Reminders and updates',
    icon: 'bell',
    pathKey: 'notifications',
    tone: 'bg-amber-50 text-amber-600',
  },
]

export const profilePrefsMock = [
  {
    id: 'reminders',
    label: 'Appointment reminders',
    hint: 'Get notified before visits',
    icon: 'calendar',
    on: true,
  },
  {
    id: 'email',
    label: 'Email updates',
    hint: 'Reports and booking emails',
    icon: 'mail',
    on: true,
  },
  {
    id: 'sms',
    label: 'SMS alerts',
    hint: 'OTP and visit alerts',
    icon: 'message',
    on: true,
  },
  {
    id: 'promotions',
    label: 'Promotions & offers',
    hint: 'Health tips and special deals',
    icon: 'bell',
    on: true,
  },
]
