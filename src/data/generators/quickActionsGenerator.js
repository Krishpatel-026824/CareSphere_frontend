import {
  healthRecordsMock,
  labTestsMock,
  pharmacyItemsMock,
} from '../mocks/quickActions'

export function generatePharmacyData() {
  return { items: pharmacyItemsMock }
}

export function generateLabTestsData() {
  return { tests: labTestsMock }
}

export function generateHealthRecordsData() {
  return { records: healthRecordsMock }
}

export function getVideoConsultDoctors(doctors = []) {
  return doctors.filter((doctor) => doctor.videoConsult === true)
}
