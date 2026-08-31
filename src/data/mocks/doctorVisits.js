import { BadgeCheck, CheckCircle2, Clock3, LayoutGrid, XCircle } from 'lucide-react'
import { patientImages } from './patientImages'

export const doctorDefaultPrepItems = [
  'Valid photo ID',
  'Previous prescriptions',
  'Current medication list',
]

export const doctorClinicDefaultsMock = {
  clinic: 'CareSphere Heart Center',
  clinicDetail: 'CareSphere Heart Center',
  location: 'Ahmedabad',
  visitType: 'In-clinic',
  address: 'SG Highway, Near Iscon Cross Road, Ahmedabad',
  fullAddress: 'CareSphere Heart Center, SG Highway, Near Iscon Cross Road, Ahmedabad 380015',
  phone: '(901) 425-9878',
  room: 'Consultation Room 4',
  landmark: 'Near Iscon Cross Road · Parking available',
}

export const doctorScheduleFilters = [
  {
    id: 'All',
    label: 'All',
    icon: LayoutGrid,
    active: 'bg-navy text-white',
    idle: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
  },
  {
    id: 'Confirmed',
    label: 'Confirmed',
    icon: CheckCircle2,
    active: 'bg-emerald-600 text-white',
    idle: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
  },
  {
    id: 'Upcoming',
    label: 'Pending',
    icon: Clock3,
    active: 'bg-amber-500 text-white',
    idle: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
  },
  {
    id: 'Completed',
    label: 'Done',
    icon: BadgeCheck,
    active: 'bg-sky-600 text-white',
    idle: 'bg-sky-100 text-sky-800 hover:bg-sky-200',
  },
  {
    id: 'Cancelled',
    label: 'Reject',
    icon: XCircle,
    active: 'bg-rose-600 text-white',
    idle: 'bg-rose-100 text-rose-800 hover:bg-rose-200',
  },
]

export const doctorVisitTimeSlotsMock = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:30 PM',
  '02:30 PM',
  '03:30 PM',
  '04:30 PM',
  '05:30 PM',
]

export const doctorLinkedPatientMock = {
  id: 'pat-krish',
  name: 'Krish Patel',
  avatar: patientImages.krishPatel,
  visitReason: 'Follow-up on heart rate. Review previous ECG.',
}
