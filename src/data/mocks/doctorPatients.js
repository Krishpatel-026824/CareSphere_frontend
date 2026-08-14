import { extraDoctorAvatars } from './doctorAvatars'
import { pharmacyImages } from './pharmacyImages'

export const krishPatientMock = {
  id: 'pat-krish',
  name: 'Krish Patel',
  role: 'Care member',
  ageLabel: '30 yrs',
  gender: 'Male',
  city: 'Ahmedabad',
  phone: '+91 98765 43210',
  avatar: pharmacyImages.krishPatel,
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
    avatar: extraDoctorAvatars['doc-108'],
  },
  {
    id: 'pat-rohan',
    name: 'Rohan Mehta',
    role: 'Care member',
    ageLabel: '41 yrs',
    gender: 'Male',
    city: 'Ahmedabad',
    phone: '+91 98980 22011',
    avatar: extraDoctorAvatars['doc-110'],
  },
  {
    id: 'pat-priya',
    name: 'Priya Nair',
    role: 'Care member',
    ageLabel: '29 yrs',
    gender: 'Female',
    city: 'Ahmedabad',
    phone: '+91 97654 33880',
    avatar: extraDoctorAvatars['doc-111'],
  },
]
