import {
  CalendarDays,
  CircleUserRound,
  FlaskConical,
  HeartPulse,
  House,
  MessageCircleMore,
  Pill,
} from 'lucide-react'

export const mainNavTabs = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'appointments', label: 'Appointments', icon: CalendarDays },
  { id: 'pharmacy', label: 'Pharmacy', icon: Pill },
  { id: 'labTests', label: 'Lab Tests', icon: FlaskConical },
  { id: 'health', label: 'Health', icon: HeartPulse },
  { id: 'messages', label: 'Messages', icon: MessageCircleMore },
]

export const profileNavTab = { id: 'profile', label: 'Profile', icon: CircleUserRound }

export const bottomNavTabs = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'appointments', label: 'Appts', icon: CalendarDays },
  { id: 'health', label: 'Health', icon: HeartPulse },
  { id: 'messages', label: 'Messages', icon: MessageCircleMore },
  { id: 'profile', label: 'Profile', icon: CircleUserRound },
]
