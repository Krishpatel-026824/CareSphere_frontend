import { patientImages } from './patientImages'

export const krishPatientMock = {
  id: 'pat-krish',
  name: 'Krish Patel',
  role: 'Care member',
  ageLabel: '30 yrs',
  gender: 'Male',
  city: 'Ahmedabad',
  phone: '+91 98765 43210',
  avatar: patientImages.krishPatel,
}

export const doctorPatientsMock = [
  krishPatientMock,
  {
    id: 'pat-ananya',
    name: 'Ananya Shah',
    role: 'Care member',
    ageLabel: '34 yrs',
    gender: 'Female',
    city: 'Ahmedabad',
    phone: '+91 98250 11420',
    avatar: patientImages.ananyaShah,
  },
  {
    id: 'pat-rohan',
    name: 'Rohan Mehta',
    role: 'Care member',
    ageLabel: '41 yrs',
    gender: 'Male',
    city: 'Ahmedabad',
    phone: '+91 98980 22011',
    avatar: patientImages.rohanMehta,
  },
  {
    id: 'pat-priya',
    name: 'Priya Nair',
    role: 'Care member',
    ageLabel: '29 yrs',
    gender: 'Female',
    city: 'Ahmedabad',
    phone: '+91 97654 33880',
    avatar: patientImages.priyaNair,
  },
]
