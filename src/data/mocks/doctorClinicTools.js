export const doctorClinicToolPagesMock = {
  prescribe: {
    title: 'Write Rx',
    subtitle: 'Pending prescriptions for today’s visits',
  },
  labs: {
    title: 'Order labs',
    subtitle: 'Tests waiting for your sign-off',
  },
  notes: {
    title: 'Add note',
    subtitle: 'Unsigned notes from today’s clinic',
  },
}

export const doctorPrescribeTasksMock = [
  {
    id: 'rx-1',
    patientId: 'pat-krish',
    title: 'Atorvastatin 20 mg',
    subtitle: 'Refill due after today’s consult',
    badge: 'Refill',
  },
  {
    id: 'rx-2',
    patientId: 'pat-ananya',
    title: 'Metoprolol 50 mg',
    subtitle: 'Adjust dose after BP review',
    badge: 'Update',
  },
  {
    id: 'rx-3',
    patientId: 'pat-rohan',
    title: 'Aspirin 75 mg',
    subtitle: 'Continue as daily cardiac care',
    badge: 'New',
  },
]

export const doctorLabTasksMock = [
  {
    id: 'lab-1',
    patientId: 'pat-priya',
    title: 'Lipid panel',
    subtitle: 'Fasting labs before next visit',
    badge: 'Order',
  },
  {
    id: 'lab-2',
    patientId: 'pat-krish',
    title: 'ECG + troponin',
    subtitle: 'Follow-up after chest discomfort',
    badge: 'Urgent',
  },
  {
    id: 'lab-3',
    patientId: 'pat-ananya',
    title: 'CBC and TSH',
    subtitle: 'Fatigue workup from last visit',
    badge: 'Review',
  },
]

export const doctorNoteTasksMock = [
  {
    id: 'note-1',
    patientId: 'pat-krish',
    title: 'Consult note',
    subtitle: 'Chest pain follow-up — unsigned',
    badge: 'Due',
  },
  {
    id: 'note-2',
    patientId: 'pat-rohan',
    title: 'Progress note',
    subtitle: 'Hypertension check — draft saved',
    badge: 'Draft',
  },
  {
    id: 'note-3',
    patientId: 'pat-priya',
    title: 'Visit summary',
    subtitle: 'Palpitations consult — add plan',
    badge: 'Open',
  },
]
