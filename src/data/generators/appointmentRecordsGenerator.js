import { appointmentRecordsMock, recordTypeFilters } from '../mocks/appointmentRecords'

export function generateAppointmentRecords(appointment) {
  const records = (appointmentRecordsMock[appointment?.id] || []).map((record) => ({
    ...record,
    appointmentId: appointment.id,
    doctorId: appointment.doctorId,
    doctorName: appointment.doctorName,
    doctorPhoto: appointment.doctorPhoto,
    specialty: appointment.specialty,
    clinic: appointment.clinicDetail || appointment.clinic,
    previewImage: record.type === 'Image' ? appointment.heroImage || appointment.clinicImage : '',
  }))

  const typeCounts = { 'All types': records.length }
  records.forEach((record) => {
    typeCounts[record.type] = (typeCounts[record.type] || 0) + 1
  })

  return {
    title: 'Records',
    subtitle: `${records.length} files for ${appointment.doctorName}`,
    photo: appointment.doctorPhoto,
    doctorName: appointment.doctorName,
    specialty: appointment.specialty,
    clinic: appointment.clinicDetail || appointment.clinic,
    typeFilters: recordTypeFilters.map((label) => ({
      label,
      count: typeCounts[label] || 0,
    })),
    records,
  }
}

export function filterAppointmentRecords(view, type) {
  if (!type || type === 'All types') return view.records
  return view.records.filter((record) => record.type === type)
}
