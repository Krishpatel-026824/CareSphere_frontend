import {
  CalendarDays,
  CircleUserRound,
  FileText,
  FlaskConical,
  House,
  MessageCircleMore,
  Users,
} from 'lucide-react'

export const doctorMainNavTabs = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'schedule', label: 'Schedule', icon: CalendarDays },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'messages', label: 'Messages', icon: MessageCircleMore },
]

export const doctorProfileNavTab = { id: 'profile', label: 'Profile', icon: CircleUserRound }

export const doctorSidebarQuickActions = [
  { id: 'pharmacy', key: 'prescribe', label: 'Write Rx', icon: FileText },
  { id: 'labReports', key: 'labReports', label: 'Lab reports', icon: FlaskConical },
]

export const doctorBottomNavTabs = [
  { id: 'home', label: 'Home', icon: House },
  { id: 'schedule', label: 'Schedule', icon: CalendarDays },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'messages', label: 'Messages', icon: MessageCircleMore },
  { id: 'profile', label: 'Profile', icon: CircleUserRound },
]
