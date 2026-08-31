import { pharmacyImages } from '../mocks/pharmacyImages'
import { pharmacyItemsMock } from '../mocks/quickActions'

function normalizeName(value = '') {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const MEDICINE_IMAGE_ALIASES = {
  metoprolol: pharmacyImages.losartan,
  propranolol: pharmacyImages.losartan,
  carvedilol: pharmacyImages.losartan,
  bisoprolol: pharmacyImages.losartan,
  nebivolol: pharmacyImages.losartan,
  rosuvastatin: pharmacyImages.atorvastatin,
  simvastatin: pharmacyImages.atorvastatin,
  pravastatin: pharmacyImages.atorvastatin,
  aspirin: pharmacyImages.ecosprin,
  clopidogrel: pharmacyImages.ecosprin,
  telmisartan: pharmacyImages.telma,
  ramipril: pharmacyImages.lisinopril,
  enalapril: pharmacyImages.lisinopril,
  warfarin: pharmacyImages.ecosprin,
}

export function getPharmacyMedicineOptions() {
  return pharmacyItemsMock.map((item) => ({
    id: item.id,
    name: item.name,
    subtitle: item.subtitle,
    image: item.image,
    price: item.price,
  }))
}

export function resolveMedicineImage(medicineName = '', pharmacyId) {
  if (pharmacyId) {
    const byId = pharmacyItemsMock.find((item) => item.id === pharmacyId)
    if (byId?.image) return byId.image
  }

  const target = normalizeName(medicineName)
  if (!target) return ''

  const exact = pharmacyItemsMock.find((item) => normalizeName(item.name) === target)
  if (exact?.image) return exact.image

  const startsWith = pharmacyItemsMock.find((item) => {
    const name = normalizeName(item.name)
    return name.startsWith(target) || target.startsWith(name.split(' ')[0])
  })
  if (startsWith?.image) return startsWith.image

  const partial = pharmacyItemsMock.find((item) => {
    const name = normalizeName(item.name)
    const firstWord = target.split(' ')[0]
    return firstWord.length >= 3 && (name.includes(firstWord) || target.includes(name.split(' ')[0]))
  })
  if (partial?.image) return partial.image

  const alias = MEDICINE_IMAGE_ALIASES[target.split(' ')[0]]
  return alias || ''
}

export function withPharmacyMedicineImage(medicine = {}) {
  const resolved = resolveMedicineImage(medicine.medicineName || medicine.name, medicine.pharmacyId)
  return {
    ...medicine,
    image: resolved || medicine.image || null,
  }
}
