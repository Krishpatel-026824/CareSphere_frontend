import { healthRecordImages } from './healthRecordImages'

export const healthRecordsMock = [
  {
    id: 'rec-1',
    title: 'ECG Report',
    doctorName: 'Dr. James Carter',
    specialty: 'Cardiology',
    dateLabel: '12 May 2025',
    timeLabel: '10:30 AM',
    type: 'Cardiology',
    icon: 'ecg',
    preview: healthRecordImages.ecg,
    background: healthRecordImages.ecg,
  },
  {
    id: 'rec-2',
    title: 'Skin Allergy Panel',
    doctorName: 'Dr. Sophia Bennett',
    specialty: 'Dermatology',
    dateLabel: '28 Apr 2025',
    timeLabel: '11:15 AM',
    type: 'Dermatology',
    icon: 'allergy',
    preview: healthRecordImages.allergy,
    background: healthRecordImages.allergy,
  },
  {
    id: 'rec-3',
    title: 'Annual Health Checkup',
    doctorName: 'Dr. Olivia Hart',
    specialty: 'General',
    dateLabel: '15 Mar 2025',
    timeLabel: '09:20 AM',
    type: 'General',
    icon: 'checkup',
    preview: healthRecordImages.checkup,
    background: healthRecordImages.checkup,
  },
  {
    id: 'rec-4',
    title: 'Prescription History',
    doctorName: 'CareSphere Pharmacy',
    specialty: 'Pharmacy',
    dateLabel: '02 Jun 2025',
    timeLabel: '04:45 PM',
    type: 'Pharmacy',
    icon: 'pharmacy',
    preview: healthRecordImages.prescription,
    background: healthRecordImages.prescription,
  },
]

export const healthRecordsTipsMock = [
  {
    id: 'handy',
    step: '01',
    title: 'Handy reports',
    text: 'Keep your reports handy before doctor visits for faster consultations.',
    icon: 'folder',
    tipIcon: 'bulb',
    tip: 'Stay organized and never miss important details.',
    stepTone: 'bg-emerald-50 text-emerald-700',
    labelTone: 'text-emerald-700',
    iconTone: 'bg-emerald-100 text-emerald-600',
    tipTone: 'bg-emerald-50 text-emerald-800',
    cardTone: 'bg-emerald-50/50 border-emerald-100',
  },
  {
    id: 'share',
    step: '02',
    title: 'Download and share',
    text: 'Download and share reports securely from CareSphere Health Records.',
    icon: 'share',
    tipIcon: 'lock',
    tip: 'Your data is private and always protected.',
    stepTone: 'bg-sky-50 text-sky-700',
    labelTone: 'text-sky-700',
    iconTone: 'bg-sky-100 text-sky-600',
    tipTone: 'bg-sky-50 text-sky-800',
    cardTone: 'bg-sky-50/50 border-sky-100',
  },
  {
    id: 'auto',
    step: '03',
    title: 'Automatic appearance',
    text: 'Lab reports booked on CareSphere appear here automatically after payment.',
    icon: 'refresh',
    tipIcon: 'clock',
    tip: 'No extra steps. We keep it updated for you.',
    stepTone: 'bg-violet-50 text-violet-700',
    labelTone: 'text-violet-700',
    iconTone: 'bg-violet-100 text-violet-600',
    tipTone: 'bg-violet-50 text-violet-800',
    cardTone: 'bg-violet-50/50 border-violet-100',
  },
]

export const healthRecordsGuideMock = {
  title: 'How to use Health records',
  subtitle: 'Simple steps to manage your reports with ease.',
}

export const healthRecordsSummaryMetaMock = [
  {
    id: 'total',
    label: 'Total records',
    hint: 'All time',
    valueTone: 'text-emerald-600',
    pillTone: 'bg-emerald-50 text-emerald-700',
    previous: 3,
  },
  {
    id: 'month',
    label: 'This month',
    hint: 'Reports added',
    valueTone: 'text-violet-600',
    pillTone: 'bg-violet-50 text-violet-700',
    previous: 0,
  },
  {
    id: 'ready',
    label: 'Ready to view',
    hint: 'Available to download',
    valueTone: 'text-sky-600',
    pillTone: 'bg-sky-50 text-sky-700',
    previous: 2,
  },
]

export const healthRecordsFooterMock = {
  title: 'Your data is safe with us',
  body: 'Your reports are securely stored in CareSphere. Tap View anytime to open full details.',
}

export const healthRecordRowActionsMock = {
  list: [{ id: 'remove', label: 'Remove', danger: true, icon: 'trash' }],
  bin: [
    { id: 'restore', label: 'Restore', icon: 'restore' },
    { id: 'destroy', label: 'Delete forever', danger: true, icon: 'trash' },
  ],
}

export const healthRecordConfirmMock = {
  remove: {
    title: 'Move to Recycle Bin?',
    body: '{title} will be moved to Recycle Bin. You can restore it later.',
    confirm: 'Move to bin',
  },
  destroy: {
    title: 'Delete permanently?',
    body: '{title} will be deleted forever and cannot be restored.',
    confirm: 'Delete forever',
  },
}
