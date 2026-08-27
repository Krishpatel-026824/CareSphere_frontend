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

export function generateRxScheduleDefaults(medicine = {}) {
  return {
    frequency: medicine.frequency || 'Once daily',
    duration: '7 days',
  }
}
