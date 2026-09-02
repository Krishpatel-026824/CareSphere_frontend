import MedicineThumb from './MedicineThumb'

export const MEDICINE_CATALOG_COLUMNS = [
  { key: 'no', label: 'No.', center: true, width: '52px' },
  { key: 'medicine', label: 'Medicine', center: false, width: '30%' },
  { key: 'pack', label: 'Pack', center: true, width: '12%' },
  { key: 'dose', label: 'Dose', center: true, width: '10%' },
  { key: 'schedule', label: 'Schedule', center: true, width: '14%' },
  { key: 'useFor', label: 'Use for', center: false, width: '24%' },
]

export function CatalogMedicineCell({ item }) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <MedicineThumb src={item.image} size="sm" />
      <p className="text-[14px] font-semibold text-navy leading-snug truncate">{item.name}</p>
    </div>
  )
}
