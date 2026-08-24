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
  ecg: 'bg-emerald-500 text-white shadow-sm shadow-emerald-200',
  allergy: 'bg-violet-500 text-white shadow-sm shadow-violet-200',
  checkup: 'bg-sky-500 text-white shadow-sm shadow-sky-200',
  pharmacy: 'bg-amber-500 text-white shadow-sm shadow-amber-200',
  lab: 'bg-teal text-white shadow-sm shadow-teal/30',
}

export const recordCardSurfaces = {
  ecg: 'bg-gradient-to-r from-emerald-50 to-white border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-100',
  allergy: 'bg-gradient-to-r from-violet-50 to-white border-violet-200 hover:border-violet-400 hover:shadow-violet-100',
  checkup: 'bg-gradient-to-r from-sky-50 to-white border-sky-200 hover:border-sky-400 hover:shadow-sky-100',
  pharmacy: 'bg-gradient-to-r from-amber-50 to-white border-amber-200 hover:border-amber-400 hover:shadow-amber-100',
  lab: 'bg-gradient-to-r from-[#D8F4F1] to-white border-teal/30 hover:border-teal hover:shadow-teal/10',
}

export const recordBadgeTones = {
  ecg: 'bg-emerald-100 text-emerald-700',
  allergy: 'bg-violet-100 text-violet-700',
  checkup: 'bg-sky-100 text-sky-700',
  pharmacy: 'bg-amber-100 text-amber-800',
  lab: 'bg-teal-light text-teal',
}

export const healthRecordFilterStyles = {
  all: {
    active: 'bg-indigo-500 text-white shadow-md shadow-indigo-200',
    idle: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
    countIdle: 'bg-white text-indigo-600',
  },
  lab: {
    active: 'bg-teal text-white shadow-md shadow-teal/25',
    idle: 'bg-teal-light text-teal hover:bg-[#C5EFEB]',
    countIdle: 'bg-white text-teal',
  },
  other: {
    active: 'bg-amber-500 text-white shadow-md shadow-amber-200',
    idle: 'bg-amber-50 text-amber-800 hover:bg-amber-100',
    countIdle: 'bg-white text-amber-700',
  },
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
