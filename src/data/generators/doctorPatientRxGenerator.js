export const rxFrequencyOptions = [
  'Once daily',
  'Twice daily',
  'Three times daily',
  'Once daily at night',
  'Once daily in the morning',
  'As needed',
  'As directed',
]

export const rxDurationOptions = [
  '5 days',
  '7 days',
  '10 days',
  '14 days',
  '30 days',
  '90 days',
  'Ongoing',
  'As advised',
]

export const rxDoseOptions = [
  '1 tablet',
  '2 tablets',
  '1/2 tablet',
  '5 ml',
  '10 ml',
  '1 capsule',
  '2 capsules',
  'As directed',
]

export function generateRxScheduleDefaults(medicine = {}) {
  const fromName = String(medicine.dose || '').trim()
  return {
    dose: fromName && fromName !== '—' ? fromName : '1 tablet',
    frequency: medicine.frequency || 'Once daily',
    duration: '7 days',
  }
}
