export const doctorPatientProfilesMock = {
  'pat-krish': {
    email: 'krish.patel@email.com',
    bloodGroup: 'O+',
    allergies: 'None known',
    insurance: 'Star Health · Family floater',
    primaryConcern: 'Heart-rate follow-up',
    careNote: 'Follow-up on heart rate. Review previous ECG and continue current beta-blocker plan.',
    lastCheckup: '10 May 2026',
    preferredLanguage: 'English · Gujarati',
  },
  'pat-ananya': {
    email: 'ananya.shah@email.com',
    bloodGroup: 'B+',
    allergies: 'Penicillin',
    insurance: 'HDFC Ergo',
    primaryConcern: 'Chest discomfort review',
    careNote: 'Monitor BP trends. Bring prior lipid panel to next consult.',
    lastCheckup: '02 Apr 2026',
    preferredLanguage: 'English · Hindi',
  },
  'pat-rohan': {
    email: 'rohan.mehta@email.com',
    bloodGroup: 'A+',
    allergies: 'Dust mite',
    insurance: 'ICICI Lombard',
    primaryConcern: 'Cardiac risk screening',
    careNote: 'Lifestyle plan shared. Reassess after next fasting labs.',
    lastCheckup: '18 Mar 2026',
    preferredLanguage: 'English',
  },
}

export const doctorPatientProfileDefaults = {
  email: 'patient@caresphere.in',
  bloodGroup: 'Unknown',
  allergies: 'Not on file',
  insurance: 'Self-pay',
  primaryConcern: 'General cardiology',
  careNote: 'Review latest vitals and notes before the next consult.',
  lastCheckup: '—',
  preferredLanguage: 'English',
}
