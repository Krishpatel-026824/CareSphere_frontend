import { generateExpertiseChips } from './expertiseChipGenerator'

export function generateDoctorProfile(appointment, doctor) {
  const nextDate = appointment?.dateLabel || doctor?.slots?.dates?.[0]
  const nextTime = appointment?.timeLabel || doctor?.slots?.times?.[0]

  return {
    name: doctor?.name || appointment?.doctorName || '',
    photo: appointment?.doctorPhoto || doctor?.avatar || '',
    specialty: appointment?.specialty || doctor?.specialty || '',
    clinic: appointment?.clinic || doctor?.hospital || '',
    bio: doctor?.bio || '',
    qualification: doctor?.qualification || '',
    education: doctor?.education || '',
    experience: doctor?.experience ? `${doctor.experience} years` : '—',
    patients: doctor?.patientsCount || '—',
    rating: doctor?.rating || appointment?.rating || 0,
    reviewCount: doctor?.reviewCount || 0,
    ratingLabel: `${doctor?.rating || appointment?.rating || 0} (${doctor?.reviewCount || 0})`,
    fee: doctor?.fee ? `₹${doctor.fee}` : '—',
    expertise: generateExpertiseChips(doctor?.expertise || []),
    languages: doctor?.languages || [],
    availableToday: Boolean(doctor?.availableToday),
    visitType: appointment?.visitType || 'In-clinic',
    location: appointment?.location || '',
    badges: [
      {
        id: 'rating',
        kind: 'rating',
        label: `${doctor?.rating || appointment?.rating || 0} (${doctor?.reviewCount || 0})`,
      },
      {
        id: 'availability',
        kind: doctor?.availableToday ? 'available' : 'booked',
        label: doctor?.availableToday ? 'Available today' : 'Next visit booked',
      },
      {
        id: 'visit',
        kind: 'clinic',
        label: 'In-clinic',
      },
    ],
    nextVisit: nextDate && nextTime ? `${nextDate} · ${nextTime}` : '',
    visitNote: appointment?.prepNote || appointment?.landmark || '',
    infoCards: [
      {
        id: 'languages',
        icon: 'languages',
        label: 'Languages',
        value: (doctor?.languages || []).join(', '),
        tags: doctor?.languages || [],
      },
      nextDate && nextTime
        ? { id: 'nextVisit', icon: 'calendar', label: 'Next visit', value: `${nextDate} · ${nextTime}` }
        : null,
      doctor?.qualification
        ? { id: 'qualification', icon: 'graduation', label: 'Qualification', value: doctor.qualification }
        : null,
      doctor?.education
        ? { id: 'education', icon: 'school', label: 'Education', value: doctor.education }
        : null,
      appointment?.clinic || doctor?.hospital
        ? {
            id: 'clinic',
            icon: 'clinic',
            label: 'Clinic',
            value: appointment?.clinic || doctor?.hospital,
          }
        : null,
      appointment?.room
        ? { id: 'room', icon: 'room', label: 'Room', value: appointment.room }
        : null,
      {
        id: 'consult',
        icon: 'clinic',
        label: 'Consult',
        value: 'In-clinic',
      },
      appointment?.phone
        ? { id: 'phone', icon: 'phone', label: 'Contact', value: appointment.phone }
        : null,
    ].filter(Boolean),
  }
}
