import { pharmacyItemsMock } from '../mocks/quickActions'
import { labTestsMock } from '../mocks/labTests'
export { generateHealthRecordsData } from './healthRecordsGenerator'

export function generatePharmacyData() {
  return { items: pharmacyItemsMock.map((item) => ({ ...item })) }
}

export function generateLabTestsData() {
  return { tests: labTestsMock.map((test) => ({ ...test })) }
}

export function getVideoConsultDoctors(doctors = []) {
  return doctors.filter((doctor) => doctor.videoConsult === true)
}
