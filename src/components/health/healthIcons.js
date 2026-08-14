import {
  Activity,
  BookOpen,
  CalendarDays,
  ClipboardList,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  FlaskConical,
  FolderOpen,
  Lightbulb,
  Lock,
  Pill,
  RefreshCw,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react'

export const recordTypeIcons = {
  ecg: Activity,
  allergy: ClipboardList,
  checkup: Stethoscope,
  pharmacy: Pill,
  lab: FlaskConical,
}

export const recordTypeTones = {
  ecg: 'bg-emerald-50 text-emerald-600',
  allergy: 'bg-violet-50 text-violet-600',
  checkup: 'bg-sky-50 text-sky-600',
  pharmacy: 'bg-amber-50 text-amber-600',
  lab: 'bg-teal-light text-teal',
}

export const recordViewTones = {
  ecg: 'border-emerald-600 text-emerald-700 hover:bg-emerald-50',
  allergy: 'border-violet-600 text-violet-700 hover:bg-violet-50',
  checkup: 'border-sky-600 text-sky-700 hover:bg-sky-50',
  pharmacy: 'border-blue-600 text-blue-700 hover:bg-blue-50',
  lab: 'border-teal text-teal hover:bg-teal-light',
}

export const recordBgPositions = {
  ecg: 'object-[72%_45%]',
  allergy: 'object-[70%_center]',
  checkup: 'object-[65%_center]',
  pharmacy: 'object-[75%_center]',
  lab: 'object-center',
}

export const summaryIcons = {
  file: FileText,
  calendar: CalendarDays,
  ready: FileCheck2,
}

export const tipIcons = {
  folder: FolderOpen,
  share: Download,
  refresh: RefreshCw,
}

export const tipNoteIcons = {
  bulb: Lightbulb,
  lock: Lock,
  clock: Clock3,
}

export const guideHeaderIcon = BookOpen
export const safetyIcon = ShieldCheck
