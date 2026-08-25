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
    step: '1',
    title: 'Keep reports ready',
    text: 'Open past labs and visit notes before your appointment so your doctor has full context.',
    icon: 'folder',
    accent: 'emerald',
  },
  {
    id: 'share',
    step: '2',
    title: 'Download securely',
    text: 'Save or share a report in one tap — only from your CareSphere Health Records.',
    icon: 'share',
    accent: 'sky',
  },
  {
    id: 'auto',
    step: '3',
    title: 'Labs sync for you',
    text: 'Tests you book and pay for on CareSphere land here automatically when ready.',
    icon: 'refresh',
    accent: 'amber',
  },
]

export const healthRecordsGuideMock = {
  title: 'Your records, simplified',
  subtitle: 'Three colorful shortcuts to keep every report ready, shareable, and automatically up to date.',
}

export const healthRecordsFooterMock = {
  title: 'Private by design',
  body: 'Reports stay encrypted in CareSphere. Tap to open · Press & hold to manage.',
  points: ['Encrypted storage', 'Only you can open', 'Hold to manage'],
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
