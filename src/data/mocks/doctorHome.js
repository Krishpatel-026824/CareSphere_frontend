import { CalendarDays, FileText, FlaskConical, Stethoscope } from 'lucide-react'

export const doctorQuickActionsMock = [
  {
    id: 'schedule',
    key: 'schedule',
    label: 'Open schedule',
    hint: 'Today’s clinic visits',
    icon: CalendarDays,
    tone: 'bg-teal-light text-teal-dark',
  },
  {
    id: 'pharmacy',
    key: 'prescribe',
    label: 'Write Rx',
    hint: 'Pending prescriptions',
    icon: FileText,
    tone: 'bg-orange-100 text-orange-600',
  },
  {
    id: 'lab',
    key: 'labs',
    label: 'Order labs',
    hint: 'Tests awaiting sign-off',
    icon: FlaskConical,
    tone: 'bg-amber-100 text-amber-600',
  },
  {
    id: 'records',
    key: 'notes',
    label: 'Add note',
    hint: 'Unsigned clinic notes',
    icon: Stethoscope,
    tone: 'bg-sky-100 text-sky-600',
  },
]

export const doctorHomeStatPagesMock = {
  waiting: {
    title: 'Waiting',
    subtitle: 'Visits that still need your accept',
    empty: 'No visits are waiting right now.',
  },
  upcoming: {
    title: 'Upcoming',
    subtitle: 'Appointments currently in your clinic queue',
    empty: 'No upcoming visits in the queue.',
  },
  done: {
    title: 'Completed',
    subtitle: 'Visits you have already wrapped up',
    empty: 'No completed visits yet.',
  },
}
