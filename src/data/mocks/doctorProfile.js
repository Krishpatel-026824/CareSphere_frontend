import { extraDoctorAvatars } from './doctorAvatars'
const doctorRohan = 'https://randomuser.me/api/portraits/men/32.jpg'

export const doctorProfileDetailsMock = {
  name: 'Dr. James Carter',
  role: 'Cardiologist',
  initials: 'JC',
  avatar: doctorRohan,
  email: 'james.carter@caresphere.com',
  phone: '(901) 425-9878',
  qualification: 'MD, DM Cardiology',
  hospital: 'CareSphere Heart Center',
  city: 'Ahmedabad',
  languages: 'English, Spanish',
  memberSince: 'On CareSphere since Jan 2024',
}

export const doctorProfileStatsMock = [
  { id: 'patients', label: 'Patients', hint: 'Active patients', value: '4', icon: 'file' },
  { id: 'visits', label: 'Upcoming', hint: 'Scheduled visits', value: '3', icon: 'calendar' },
  { id: 'messages', label: 'Chats', hint: 'Open conversations', value: '4', icon: 'bell' },
]

export const doctorProfileFieldsMock = [
  { id: 'name', label: 'Full name', type: 'text' },
  { id: 'email', label: 'Email', type: 'email' },
  { id: 'phone', label: 'Phone', type: 'tel' },
  { id: 'hospital', label: 'Hospital', type: 'text' },
  { id: 'city', label: 'City', type: 'text' },
  { id: 'qualification', label: 'Qualification', type: 'text' },
]

export const doctorProfileInfoRowsMock = [
  { id: 'email', label: 'Email', icon: 'mail' },
  { id: 'phone', label: 'Phone', icon: 'phone' },
  { id: 'qualification', label: 'Qualification', icon: 'award' },
  { id: 'hospital', label: 'Hospital', icon: 'building' },
  { id: 'city', label: 'City', icon: 'map' },
  { id: 'languages', label: 'Languages', icon: 'languages' },
]

export const doctorProfileMenuMock = [
  {
    id: 'schedule',
    label: 'Schedule',
    hint: 'Today and upcoming visits',
    icon: 'calendar',
    pathKey: 'schedule',
    tone: 'bg-violet-50 text-violet-600',
  },
  {
    id: 'patients',
    label: 'Patients',
    hint: 'People in your clinic queue',
    icon: 'file',
    pathKey: 'patients',
    tone: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 'messages',
    label: 'Messages',
    hint: 'Chat with patients',
    icon: 'message',
    pathKey: 'messages',
    tone: 'bg-sky-50 text-sky-600',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    hint: 'New bookings and alerts',
    icon: 'bell',
    pathKey: 'notifications',
    tone: 'bg-amber-50 text-amber-600',
  },
]

export const doctorProfilePrefsMock = [
  { id: 'reminders', label: 'Visit reminders', hint: 'Alert before each consult', icon: 'calendar', on: true },
  { id: 'email', label: 'Email updates', hint: 'New bookings and reports', icon: 'mail', on: true },
  { id: 'sms', label: 'SMS alerts', hint: 'Cancellations and running late', icon: 'message', on: false },
  { id: 'promotions', label: 'Promotions & offers', hint: 'Clinic tips and special deals', icon: 'bell', on: true },
]

export const doctorClinicTeamMock = [
  { id: 'team-1', role: 'Clinic nurse', name: 'Neha Kapoor', avatar: extraDoctorAvatars['doc-103'] },
  { id: 'team-2', role: 'Front desk', name: 'Anita Desai', avatar: extraDoctorAvatars['doc-109'] },
  { id: 'team-3', role: 'Technician', name: 'Vivek Shah', avatar: extraDoctorAvatars['doc-116'] },
]
